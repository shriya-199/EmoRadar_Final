import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, X, Shield, Heart } from 'lucide-react';

// Define TypeScript props
interface AlertSystemProps {
  show: boolean;
  mood: 'angry' | 'sad' | 'anxious' | 'focused';
  onClose: () => void;
}

const alertMessages = {
  angry: {
    title: "Take a deep breath",
    message: "You're feeling angry. Let's avoid content that might fuel those feelings. Consider some calming activities instead.",
    icon: AlertTriangle,
    color: "red",
    suggestions: ["Try deep breathing exercises", "Listen to calming music", "Go for a walk"]
  },
  sad: {
    title: "We're here for you", 
    message: "You're feeling sad. We've blocked potentially triggering content to protect your emotional wellbeing.",
    icon: Heart,
    color: "blue",
    suggestions: ["Watch uplifting videos", "Call a friend", "Practice gratitude"]
  },
  anxious: {
    title: "Let's find some calm",
    message: "You're feeling anxious. We've limited information overload to help reduce stress.",
    icon: Shield,
    color: "yellow",
    suggestions: ["Try meditation", "Focus on your breathing", "Write in a journal"]
  },
  focused: {
    title: "Stay in the zone",
    message: "Great! You're focused. We've blocked distracting sites to help maintain your productivity.",
    icon: Shield,
    color: "purple",
    suggestions: ["Set a work timer", "Eliminate other distractions", "Take regular breaks"]
  }
} as const;

// Tailwind-safe color classes
const colorClasses = {
  red: {
    border: "border-red-500",
    bg: "bg-red-100",
    text: "text-red-600",
    hover: "hover:bg-red-700",
    button: "bg-red-600"
  },
  blue: {
    border: "border-blue-500",
    bg: "bg-blue-100",
    text: "text-blue-600",
    hover: "hover:bg-blue-700",
    button: "bg-blue-600"
  },
  yellow: {
    border: "border-yellow-500",
    bg: "bg-yellow-100",
    text: "text-yellow-600",
    hover: "hover:bg-yellow-700",
    button: "bg-yellow-600"
  },
  purple: {
    border: "border-purple-500",
    bg: "bg-purple-100",
    text: "text-purple-600",
    hover: "hover:bg-purple-700",
    button: "bg-purple-600"
  }
};

export const AlertSystem: React.FC<AlertSystemProps> = ({ show, mood, onClose }) => {
  const alert = alertMessages[mood];

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 8000); // Auto-close after 8 seconds

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show || !alert) return null;

  const Icon = alert.icon;
  const colors = colorClasses[alert.color];

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className={`max-w-md w-full p-6 bg-white shadow-2xl border-l-4 ${colors.border} animate-scale-in`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 ${colors.bg} rounded-full`}>
              <Icon className={`h-5 w-5 ${colors.text}`} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-gray-700 mb-4">{alert.message}</p>

        <div className="space-y-2 mb-4">
          <h4 className="text-sm font-medium text-gray-900">Helpful suggestions:</h4>
          <ul className="space-y-1">
            {alert.suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Dismiss
          </Button>
          <Button 
          size="sm" 
          onClick={onClose}
          className={`${colors.button} ${colors.hover} text-white`}
        >
          Got it
        </Button>

        </div>
      </Card>
    </div>
  );
};
