package com.fahd.chatterLink.model.chat;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ChatMessage {
    String senderId;
    String receiverId;
    String content;
}
