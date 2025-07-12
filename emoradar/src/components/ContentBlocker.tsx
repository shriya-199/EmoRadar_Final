import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, CheckCircle, Globe } from 'lucide-react';
import type { Mood } from '@/types'; // ✅ Correct import

interface ContentBlockerProps {
  currentMood: Mood;
}

const blockingRules: Record<Exclude<Mood, ''>, { blocked: string[]; reason: string; color: string }> = {
  angry: {
    blocked: ['twitter.com', 'facebook.com', 'reddit.com', 'youtube.com/trending'],
    reason: 'Avoiding inflammatory content that might increase anger',
    color: 'red'
  },
  sad: {
    blocked: ['news.com', 'cnn.com', 'bbc.com/news', 'twitter.com', 'instagram.com'],
    reason: 'Blocking potentially depressing news and social comparison triggers',
    color: 'blue'
  },
  anxious: {
    blocked: ['news.com', 'twitter.com', 'reddit.com', 'facebook.com', 'linkedin.com/feed'],
    reason: 'Reducing anxiety-inducing content and information overload',
    color: 'yellow'
  },
  happy: {
    blocked: [],
    reason: 'No restrictions - enjoy browsing freely!',
    color: 'green'
  },
  focused: {
    blocked: ['twitter.com', 'facebook.com', 'instagram.com', 'youtube.com', 'tiktok.com'],
    reason: 'Blocking distracting social media and entertainment sites',
    color: 'purple'
  }
};

const colorClasses = {
  red: {
    bg: 'bg-red-100',
    text: 'text-red-600',
    border: 'border-red-200',
    cardBg: 'bg-red-50',
    contentText: 'text-red-800',
    badgeBg: 'bg-red-50',
    badgeBorder: 'border-red-200',
    badgeText: 'text-red-800'
  },
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    border: 'border-blue-200',
    cardBg: 'bg-blue-50',
    contentText: 'text-blue-800',
    badgeBg: 'bg-blue-50',
    badgeBorder: 'border-blue-200',
    badgeText: 'text-blue-800'
  },
  yellow: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-600',
    border: 'border-yellow-200',
    cardBg: 'bg-yellow-50',
    contentText: 'text-yellow-800',
    badgeBg: 'bg-yellow-50',
    badgeBorder: 'border-yellow-200',
    badgeText: 'text-yellow-800'
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    border: 'border-green-200',
    cardBg: 'bg-green-50',
    contentText: 'text-green-800',
    badgeBg: 'bg-green-50',
    badgeBorder: 'border-green-200',
    badgeText: 'text-green-800'
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    border: 'border-purple-200',
    cardBg: 'bg-purple-50',
    contentText: 'text-purple-800',
    badgeBg: 'bg-purple-50',
    badgeBorder: 'border-purple-200',
    badgeText: 'text-purple-800'
  },
  gray: {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    border: 'border-gray-200',
    cardBg: 'bg-gray-50',
    contentText: 'text-gray-800',
    badgeBg: 'bg-gray-50',
    badgeBorder: 'border-gray-200',
    badgeText: 'text-gray-800'
  }
};

const ContentBlocker: React.FC<ContentBlockerProps> = ({ currentMood }) => {
  const isValidMood = (mood: Mood): mood is Exclude<Mood, ''> => {
  return mood !== '' && mood in blockingRules;
};

const currentRules = isValidMood(currentMood)
  ? blockingRules[currentMood]
  : {
      blocked: [],
      reason: 'Set your mood to see content filtering rules',
      color: 'gray'
    };


  const color = colorClasses[currentRules.color as keyof typeof colorClasses];

  const allowedSites = [
    'google.com',
    'wikipedia.org',
    'stackoverflow.com',
    'github.com',
    'medium.com',
    'coursera.org',
    'udemy.com',
    'spotify.com'
  ];

  return (
    <div className="space-y-6">
      {/* Mood Status */}
      <Card className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`p-3 rounded-full ${color.bg}`}>
            <Shield className={`h-6 w-6 ${color.text}`} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Content Filter Status</h2>
            <p className="text-gray-600">
              {currentMood ? `Active for ${currentMood} mood` : 'Inactive - Set your mood first'}
            </p>
          </div>
        </div>
        <div className={`p-4 rounded-lg ${color.cardBg} border ${color.border}`}>
          <p className={`${color.contentText} font-medium`}>{currentRules.reason}</p>
        </div>
      </Card>

      {/* Blocked Sites */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-semibold text-gray-900">Blocked Sites</h3>
          <Badge variant="destructive">{currentRules.blocked.length}</Badge>
        </div>

        {currentRules.blocked.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentRules.blocked.map((site) => (
              <div
                key={site}
                className={`flex items-center space-x-3 p-3 ${color.badgeBg} rounded-lg border ${color.badgeBorder}`}
              >
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span className={`text-sm font-medium ${color.badgeText}`}>{site}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <p className="text-green-700 font-medium">No sites are blocked for your current mood!</p>
            <p className="text-green-600 text-sm">Feel free to browse normally.</p>
          </div>
        )}
      </Card>

      {/* Allowed Sites */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-900">Always Allowed</h3>
          <Badge variant="secondary">{allowedSites.length}</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {allowedSites.map((site) => (
            <div
              key={site}
              className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm font-medium text-green-800">{site}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* How It Works */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Globe className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">How Content Filtering Works</h3>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((step, i) => {
            const steps = [
              {
                title: 'Mood Detection',
                text: 'You select your current emotional state from our mood tracker.'
              },
              {
                title: 'Rule Activation',
                text: 'Personalized blocking rules activate based on your mood to protect your wellbeing.'
              },
              {
                title: 'Smart Filtering',
                text: 'Potentially harmful content is blocked while productive and safe sites remain accessible.'
              }
            ];
            return (
              <div key={i} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-semibold">{step}</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{steps[i].title}</h4>
                  <p className="text-gray-600 text-sm">{steps[i].text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default ContentBlocker;
