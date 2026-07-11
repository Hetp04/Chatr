package com.fahd.chatterLink.model.Contacts;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Document(collection = "contact")
public class ContactList {
    @MongoId(FieldType.OBJECT_ID)
    String mongoID;
    private String userId;
    private List<Contact> contactList;
}
