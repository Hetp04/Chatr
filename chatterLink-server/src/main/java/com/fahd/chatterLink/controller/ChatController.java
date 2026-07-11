package com.fahd.chatterLink.controller;

import com.fahd.chatterLink.model.chat.ChatList;
import com.fahd.chatterLink.model.chat.ChatMessage;
import com.fahd.chatterLink.service.ChatService;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

import static com.fahd.chatterLink.ChatterLinkServerConstants.GET_CHAT_PATH;

@Controller
@CrossOrigin
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(final ChatService chatService,
                          final SimpMessagingTemplate messagingTemplate) {
        this.chatService = chatService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat.send")
    public void processMessage(@Payload ChatMessage chatMessage) {
        // save message
        chatService.saveMessage(chatMessage);
        // route message to /topic/message/{senderId}/{receiverId}
        String destination = String.format("/topic/message/%s/%s", chatMessage.getSenderId(), chatMessage.getReceiverId());
        messagingTemplate.convertAndSend(destination, chatMessage);
    }

    @GetMapping(GET_CHAT_PATH)
    public ResponseEntity<Object> getUserChat(
            @Param("senderId") String senderId,
            @Param("receiverId") String receiverId
    ) {
        try {
            Optional<ChatList> chatList = chatService.getChatByUserId(senderId, receiverId);
            if (chatList.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Chat is empty");
            } else {
                return ResponseEntity.ok(chatList);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }
}
