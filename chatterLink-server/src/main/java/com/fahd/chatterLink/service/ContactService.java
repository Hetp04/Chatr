package com.fahd.chatterLink.service;

import com.fahd.chatterLink.model.Contacts.Contact;
import com.fahd.chatterLink.model.Contacts.ContactList;
import com.fahd.chatterLink.model.User;
import com.fahd.chatterLink.repository.ContactsRepository;
import com.fahd.chatterLink.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    private final ContactsRepository contactsRepository;
    private final UserRepository userRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(ContactService.class);

    @Autowired
    public ContactService(ContactsRepository contactsRepository, final UserRepository userRepository) {
        this.contactsRepository = contactsRepository;
        this.userRepository = userRepository;
    }

    public ContactList addContact(String currentUserId, String targetUserContact) {
        Optional<User> targetUser = userRepository.findByEmail(targetUserContact);

        if (targetUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User doesn't exist");
        }

        Optional<ContactList> currentUserContactList = contactsRepository.findByUserId(currentUserId);
        if (currentUserContactList.isEmpty()) {
            Contact contact = Contact.builder()
                    .username(targetUser.get().getUsername())
                    .userId(targetUser.get().getId())
                    .build();

            ContactList contactList = ContactList.builder()
                    .userId(currentUserId)
                    .contactList(List.of(contact))
                    .build();
            LOGGER.info("Current user contact list does not exist, creating a new one");
            contactsRepository.save(contactList);
        } else {
            Contact newContact = Contact
                    .builder()
                    .username(targetUser.get().getUsername())
                    .userId(targetUser.get().getId())
                    .build();
            if (currentUserContactList.get().getContactList().contains(newContact)) {
                LOGGER.error("User already exist in {}, contact list", "userId: " + currentUserId);
                throw new  ResponseStatusException(HttpStatus.BAD_REQUEST, "User is already in your contact list");
            }

            currentUserContactList.get().getContactList().add(newContact);
            contactsRepository.save(currentUserContactList.get());
        }

        Optional<ContactList> targetUserContactList = contactsRepository.findByUserId(targetUser.get().getId());
        Optional<User> currentUser = userRepository.findById(currentUserId);

        if(targetUserContactList.isEmpty()) {
            Contact newContact = Contact.builder()
                    .userId(currentUserId)
                    .username(currentUser.get().getUsername())
                    .build();

            ContactList contactList = ContactList.builder()
                    .contactList(List.of(newContact))
                    .userId(targetUser.get().getId())
                    .build();

            LOGGER.info("Target user contact list does not exist, creating a new one");
            contactsRepository.save(contactList);
        } else {

            Contact newContact = Contact.builder()
                    .userId(currentUserId)
                    .username(currentUser.get().getUsername())
                    .build();

            if (!targetUserContactList.get().getContactList().contains(newContact)) {
                targetUserContactList.get().getContactList().add(newContact);
                contactsRepository.save(targetUserContactList.get());
            }
        }

        return contactsRepository.findByUserId(currentUserId).get();
    }

    public Object getCurrentUserContactList(String userId) {
        Optional<ContactList> contactList = contactsRepository.findByUserId(userId);
        if (contactList.isPresent()) {
            return contactList;
        }
        return null;
    }
}
