package com.fahd.chatterLink.config;


import com.fahd.chatterLink.security.JwtHandShakeInterceptor;
import com.fahd.chatterLink.security.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${client.host}")
    private String clientHost;

    private final JwtHandShakeInterceptor jwtHandShakeInterceptor;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private static Logger LOGGER = LoggerFactory.getLogger(WebSocketConfig.class);

    public WebSocketConfig(final JwtHandShakeInterceptor jwtHandShakeInterceptor,
                           final JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtHandShakeInterceptor = jwtHandShakeInterceptor;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-chatter-link")
                .setAllowedOrigins(clientHost)
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry brokerRegistry) {
        brokerRegistry.setApplicationDestinationPrefixes("/app");
        brokerRegistry.enableSimpleBroker("/topic");
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
                if (StompCommand.CONNECT.equals(accessor.getCommand())) {
                    String authHeader = accessor.getFirstNativeHeader("Authorization");
                    if (authHeader != null && authHeader.startsWith("Bearer ")) {
                        String jwt = authHeader.substring(7);
                        String username = jwtService.extractUsername(jwt);
                        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                        if (jwtService.isTokenValid(jwt, userDetails)) {
                            Authentication authentication = new UsernamePasswordAuthenticationToken(
                                    userDetails, null, userDetails.getAuthorities()
                            );
                            LOGGER.info("User was authenticated successfully, websocket connection is established");
                            accessor.setUser(authentication);
                        } else {
                            LOGGER.error("User was websocket connection failed, authorization token is invalid");
                            throw new IllegalArgumentException("Invalid Token");
                        }
                    } else {
                        LOGGER.error("User was websocket connection failed, authorization token is missing or invalid");
                        throw new IllegalArgumentException("Invalid Token");
                    }
                }
                return message;
            }
        });
    }
}
