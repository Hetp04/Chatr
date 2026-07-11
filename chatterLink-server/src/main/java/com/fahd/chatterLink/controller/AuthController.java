package com.fahd.chatterLink.controller;

import com.fahd.chatterLink.model.Authentication.AuthRequest;
import com.fahd.chatterLink.model.Authentication.AuthResponse;
import com.fahd.chatterLink.model.Authentication.RegisterRequest;
import com.fahd.chatterLink.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import static com.fahd.chatterLink.ChatterLinkServerConstants.*;

@RestController
@RequestMapping(AUTH_API)
@CrossOrigin
public class AuthController {

    private final AuthenticationService authenticationService;

    @Autowired
    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping(LOGIN_API)
    public ResponseEntity<AuthResponse> login(@RequestBody final AuthRequest authRequest) {
        try {
            return ResponseEntity.ok(authenticationService.authenticate(authRequest));
        } catch (ResponseStatusException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new AuthResponse(null,null,null, ex.getReason()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new AuthResponse(null,null,null, "Something went wrong"));
        }
    }

    @PostMapping(SIGN_UP_API)
    public ResponseEntity<AuthResponse> signIn(@RequestBody final RegisterRequest request) {
        try{
            return ResponseEntity.ok(authenticationService.registerUser(request));
        } catch (ResponseStatusException responseStatusException) {
            return ResponseEntity.status(responseStatusException.getStatusCode()).body(new AuthResponse(null,null,null,responseStatusException.getReason()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new AuthResponse(null,null,null, "Something went wrong"));
        }
    }

}
