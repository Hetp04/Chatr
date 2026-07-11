package com.fahd.chatterLink.repository;

import com.fahd.chatterLink.model.Contacts.ContactList;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface ContactsRepository extends MongoRepository<ContactList, String> {
    Optional<ContactList> findByUserId(String userId);
}
