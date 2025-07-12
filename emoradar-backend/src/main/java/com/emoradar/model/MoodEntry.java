package com.emoradar.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "moodlogs") // ✅ Matches your MongoDB Compass collection
public class MoodEntry {

    @Id
    private String id;

    private String mood;
    private String timestamp;

    // Constructors
    public MoodEntry() {
    }

    public MoodEntry(String mood, String timestamp) {
        this.mood = mood;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMood() {
        return mood;
    }

    public void setMood(String mood) {
        this.mood = mood;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
