// src/lib/moodService.ts
import axios from 'axios';
import type { Mood } from '@/types';

const API_BASE_URL = 'http://localhost:8080/api/moods';

export const saveMood = async (mood: Mood) => {
  const response = await axios.post(API_BASE_URL, {
    mood,
    timestamp: new Date().toISOString(),
  });
  return response.data;
};

export const fetchMoods = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};
