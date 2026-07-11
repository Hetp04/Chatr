package com.fahd.chatterLink.controller;

import com.fahd.chatterLink.model.Contacts.ContactList;
import com.fahd.chatterLink.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

import static com.fahd.chatterLink.ChatterLinkServerConstants.CONTACT_PATH;

@Controller
@RequestMapping(CONTACT_PATH)
@CrossOrigin
public class ContractsController {

    private final ContactService contactService;

    @Autowired
    public ContractsController(final ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addContact(@RequestBody Map<String, String> addContactPayload) {
        String currentUserId = addContactPayload.get("userId");
        String targetUserContact = addContactPayload.get("targetUserContact");
        try {
            return ResponseEntity.ok(contactService.addContact(currentUserId, targetUserContact));
        } catch (ResponseStatusException responseStatusException) {
            return ResponseEntity.status(responseStatusException.getStatusCode()).body(responseStatusException.getReason());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }

    @GetMapping("/get")
    public ResponseEntity<Object> getCurrentUserContacts(@Param("userId") String userId) {
        try {
            return ResponseEntity.ok(contactService.getCurrentUserContactList(userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }
}
