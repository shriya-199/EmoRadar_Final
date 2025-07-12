import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle as Angry,
  Frown,
  Zap,
  Smile,
  Focus,
} from 'lucide-react';

type MoodType = 'angry' | 'sad' | 'anxious' | 'happy' | 'focused';

interface Mood {
  name: MoodType;
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  textColor: string;
  description: string;
}

interface MoodSelectorProps {
  onMoodSelect: (mood: MoodType) => void;
  currentMood: MoodType | '';
}

const moods: Mood[] = [
  {
    name: 'angry',
    label: 'Angry',
    icon: Angry,
    color: 'from-red-500 to-red-600',
    bgColor: 'from-red-50 to-red-100',
    textColor: 'text-red-700',
    description: 'Feeling frustrated or irritated',
  },
  {
    name: 'sad',
    label: 'Sad',
    icon: Frown,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-50 to-blue-100',
    textColor: 'text-blue-700',
    description: 'Feeling down or melancholy',
  },
  {
    name: 'anxious',
    label: 'Anxious',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'from-yellow-50 to-orange-100',
    textColor: 'text-orange-700',
    description: 'Feeling worried or stressed',
  },
  {
    name: 'happy',
    label: 'Happy',
    icon: Smile,
    color: 'from-green-500 to-green-600',
    bgColor: 'from-green-50 to-green-100',
    textColor: 'text-green-700',
    description: 'Feeling joyful and positive',
  },
  {
    name: 'focused',
    label: 'Focused',
    icon: Focus,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'from-purple-50 to-purple-100',
    textColor: 'text-purple-700',
    description: 'Ready to concentrate and work',
  },
];

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  onMoodSelect,
  currentMood,
}) => {
  return (
    <Card className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">How are you feeling?</h2>
        <p className="text-gray-600 text-lg">
          Select your current mood to activate personalized content filtering.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {moods.map((mood) => {
          const Icon = mood.icon;
          const isSelected = currentMood === mood.name;

          return (
            <Button
              key={mood.name}
              type="button"
              variant="ghost"
              className={`
                h-auto p-6 flex flex-col items-center space-y-3 transition-all duration-300 hover:scale-105
                ${isSelected
                  ? `bg-gradient-to-br ${mood.bgColor} border-2 border-current ${mood.textColor} shadow-lg`
                  : 'hover:bg-gray-50 border-2 border-transparent'}
              `}
              onClick={() => onMoodSelect(mood.name)}
            >
              <div
                className={`
                  p-4 rounded-full bg-gradient-to-r ${mood.color}
                  ${isSelected ? 'shadow-lg' : 'shadow-md'}
                  transition-shadow duration-300
                `}
              >
                <Icon className="h-8 w-8 text-white" />
              </div>

              <div className="text-center">
                <h3 className={`font-semibold text-lg ${isSelected ? mood.textColor : 'text-gray-900'}`}>
                  {mood.label}
                </h3>
                <p className={`text-sm mt-1 ${isSelected ? mood.textColor : 'text-gray-500'}`}>
                  {mood.description}
                </p>
              </div>

              {isSelected && (
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-50 rounded-full" />
              )}
            </Button>
          );
        })}
      </div>

      {currentMood && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-800 text-center">
            <span className="font-semibold">
              Mood set to {currentMood.charAt(0).toUpperCase() + currentMood.slice(1)}!
            </span>{' '}
            Content filtering is now active to protect your wellbeing.
          </p>
        </div>
      )}
    </Card>
  );
};
export default MoodSelector;