package com.emoradar.repository;

import com.emoradar.model.MoodEntry;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoodEntryRepository extends MongoRepository<MoodEntry, String> {}
