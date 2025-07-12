package com.emoradar.controller;

import com.emoradar.model.MoodEntry;
import com.emoradar.repository.MoodEntryRepository;
<<<<<<< HEAD
import org.springframework.http.ResponseEntity;
=======
>>>>>>> fe239cd (first commit)
import org.springframework.web.bind.annotation.*;

import java.util.List;

<<<<<<< HEAD
@CrossOrigin(origins = { "http://localhost:3000", "https://emoradar.netlify.app" })
@RestController
@RequestMapping("/api/mood")
public class MoodController {
    
=======
@CrossOrigin(origins = "http://localhost:3000") // allow frontend calls
@RestController
@RequestMapping("/api/mood")
public class MoodController {
>>>>>>> fe239cd (first commit)

    private final MoodEntryRepository moodRepo;

    public MoodController(MoodEntryRepository moodRepo) {
        this.moodRepo = moodRepo;
    }

    @PostMapping("/submit")
    public MoodEntry submitMood(@RequestBody MoodEntry moodEntry) {
        return moodRepo.save(moodEntry);
    }

    @GetMapping("/all")
<<<<<<< HEAD
    public ResponseEntity<?> getAllMoods() {
        try {
            List<MoodEntry> moods = moodRepo.findAll();
            return ResponseEntity.ok(moods);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
=======
    public List<MoodEntry> getAllMoods() {
        return moodRepo.findAll();
>>>>>>> fe239cd (first commit)
    }
}
