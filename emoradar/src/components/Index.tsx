import React, { useState, useCallback, useEffect } from 'react';
import { MoodSelector } from '@/components/MoodSelector';
import { Dashboard } from '@/components/Dashboard';
import ContentBlocker from '@/components/ContentBlocker';
import { AlertSystem } from '@/components/AlertSystem';
import { Brain, Shield, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Mood } from '../types';
import axios from 'axios';

interface MoodEntry {
  mood: Mood;
  timestamp: string;
  id: number;
}

const Index: React.FC = () => {
  const [currentMood, setCurrentMood] = useState<Mood>('');
  const [showAlert, setShowAlert] = useState(false);
  const [blockedSites, setBlockedSites] = useState(0);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [activeView, setActiveView] = useState<'mood' | 'dashboard' | 'blocker'>('mood');

  const handleMoodSelect = useCallback(async (mood: Mood) => {
  console.log("🧠 Mood selected:", mood);
  setCurrentMood(mood);

  const blockingRules: Record<Mood, string[]> = {
    angry: ['twitter.com', 'facebook.com', 'reddit.com'],
    sad: ['news.com', 'twitter.com', 'instagram.com'],
    anxious: ['news.com', 'twitter.com', 'reddit.com', 'facebook.com'],
    happy: [],
    focused: ['twitter.com', 'facebook.com', 'instagram.com', 'youtube.com'],
    '': [],
  };

  const shouldBlock = blockingRules[mood]?.length > 0;
  if (shouldBlock) {
    setShowAlert(true);
    setBlockedSites(prev => prev + 1);
  }

  const newEntry: MoodEntry = {
    mood,
    timestamp: new Date().toISOString(),
    id: Date.now(),
  };

  setMoodHistory(prev => [...prev, newEntry].slice(-10)); // Optimistic UI update

  // ✅ Send mood entry to Spring Boot backend
  try {
    await axios.post("https://emoradar-production.up.railway.app/api/mood/submit", newEntry);
    console.log("✅ Mood saved to backend:", newEntry);
  } catch (err) {
    console.error("❌ Backend Error:", err);
  }

  // ✅ Send mood to Chrome Extension via custom event
  try {
    window.dispatchEvent(new CustomEvent("EMO_MOOD_CHANGE", { detail: mood }));
    console.log("📤 Dispatched mood event:", mood);
  } catch (e) {
    console.error("❌ Dispatch failed:", e);
  }
}, []);



  useEffect(() => {
    const fetchMoodHistory = async () => {
      try {
        const res = await axios.get("https://emoradar-production.up.railway.app/api/mood/all");
        setMoodHistory(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch mood history:', err);
      }
    };
    fetchMoodHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EmoRadar
                </h1>
                <p className="text-sm text-gray-600">Emotion-Based Content Protection</p>
              </div>
            </div>
            <nav className="flex space-x-1">
              <Button variant={activeView === 'mood' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveView('mood')}>
                Mood Tracker
              </Button>
              <Button variant={activeView === 'dashboard' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveView('dashboard')}>
                Dashboard
              </Button>
              <Button variant={activeView === 'blocker' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveView('blocker')}>
                Content Filter
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Current Mood</p>
                <h3 className="text-2xl font-bold text-blue-900 capitalize">
                  {currentMood || 'Not Set'}
                </h3>
              </div>
              <Brain className="h-8 w-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Sites Blocked Today</p>
                <h3 className="text-2xl font-bold text-purple-900">{blockedSites}</h3>
              </div>
              <Shield className="h-8 w-8 text-purple-500" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Mood Entries</p>
                <h3 className="text-2xl font-bold text-green-900">{moodHistory.length}</h3>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          {activeView === 'mood' && (
            <MoodSelector onMoodSelect={handleMoodSelect} currentMood={currentMood} />
          )}
          {activeView === 'dashboard' && (
            <Dashboard
              moodHistory={moodHistory}
              blockedSites={blockedSites}
              currentMood={currentMood}
            />
          )}
          {activeView === 'blocker' && <ContentBlocker currentMood={currentMood} />}
        </div>
      </main>

      {['angry', 'sad', 'anxious', 'focused'].includes(currentMood) && (
        <AlertSystem
          show={showAlert}
          mood={currentMood as 'angry' | 'sad' | 'anxious' | 'focused'}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default Index;
