package com.fahd.chatterLink.service;

import com.fahd.chatterLink.model.chat.ChatList;
import com.fahd.chatterLink.model.chat.ChatMessage;
import com.fahd.chatterLink.repository.ChatRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ChatService {

    private final ChatRepository chatRepository;

    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    /*
     * getting the users chat
     * checking if it exists if not then make a new chat and save the current message
     * ELSE get the current chat and add the current message to the map
     */
    public void saveMessage(ChatMessage chatMessage) {
        List<String> userIdList = List.of(chatMessage.getSenderId(), chatMessage.getReceiverId());
        Optional<ChatList> chatList = chatRepository.findChatBetweenUser(userIdList);
        if (chatList.isEmpty()) {
            ChatList newChatList = ChatList.builder()
                    .userIdList(userIdList)
                    .chatMessages(List.of(chatMessage))
                    .build();
            chatRepository.save(newChatList);
        } else {
            chatList.get()
                    .getChatMessages()
                    .add(chatMessage);
            chatRepository.save(chatList.get());
        }
    }

    public Optional<ChatList> getChatByUserId(String senderId, String receiverId) {
        return chatRepository.findChatBetweenUser(List.of(senderId, receiverId).stream().sorted().toList());
    }
}
