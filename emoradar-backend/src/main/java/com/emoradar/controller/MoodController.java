package com.emoradar.controller;

import com.emoradar.model.MoodEntry;
import com.emoradar.repository.MoodEntryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = { "http://localhost:3000", "https://emoradar.netlify.app" })
@RestController
@RequestMapping("/api/mood")
public class MoodController {

    private final MoodEntryRepository moodRepo;

    public MoodController(MoodEntryRepository moodRepo) {
        this.moodRepo = moodRepo;
    }

    @PostMapping("/submit")
    public MoodEntry submitMood(@RequestBody MoodEntry moodEntry) {
        return moodRepo.save(moodEntry);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllMoods() {
        try {
            List<MoodEntry> moods = moodRepo.findAll();
            return ResponseEntity.ok(moods);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }
}
