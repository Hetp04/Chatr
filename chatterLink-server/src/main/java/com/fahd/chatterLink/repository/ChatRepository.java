package com.fahd.chatterLink.repository;

import com.fahd.chatterLink.model.chat.ChatList;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends MongoRepository<ChatList, String> {

    @Query("{ 'userIdList': { $all: ?0 }, 'userIdList.2': { $exists: false } }")
    Optional<ChatList> findChatBetweenUser(List<String> userIdList);
}
