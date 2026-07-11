package com.fahd.chatterLink.model.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ChatList {
    @MongoId(FieldType.OBJECT_ID)
    String mongoId;
    List<String> userIdList;
    List<ChatMessage> chatMessages;
}
