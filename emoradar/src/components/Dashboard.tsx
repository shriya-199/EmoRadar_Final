import React from 'react';
import { Card } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Clock, Shield, TrendingUp, Calendar } from 'lucide-react';

const MOOD_COLORS: Record<string, string> = {
  angry: '#ef4444',
  sad: '#3b82f6',
  anxious: '#f59e0b',
  happy: '#10b981',
  focused: '#8b5cf6',
};

interface MoodEntry {
  id: string | number;
  mood: keyof typeof MOOD_COLORS;
  timestamp: string | number | Date;
}

interface DashboardProps {
  moodHistory: MoodEntry[];
  blockedSites: number;
  currentMood: keyof typeof MOOD_COLORS | '';
}

export const Dashboard: React.FC<DashboardProps> = ({
  moodHistory,
  blockedSites,
  currentMood,
}) => {
  const moodCounts = moodHistory.reduce<Record<string, number>>((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  const moodChartData = Object.entries(moodCounts).map(([mood, count]) => ({
    mood: mood.charAt(0).toUpperCase() + mood.slice(1),
    count,
    color: MOOD_COLORS[mood],
  }));

  const recentMoods = moodHistory.slice(-7).map((entry) => ({
    time: new Date(entry.timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
    mood: entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1),
    value: 1,
  }));

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Today&apos;s Entries</p>
              <p className="text-2xl font-bold text-gray-900">{moodHistory.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Shield className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Sites Blocked</p>
              <p className="text-2xl font-bold text-gray-900">{blockedSites}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Protection Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {moodHistory.length > 0
                  ? Math.round((blockedSites / moodHistory.length) * 100)
                  : 0}
                %
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Mood</p>
              <p className="text-lg font-bold text-gray-900 capitalize">
                {currentMood || 'Not Set'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mood Distribution Pie */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Mood Distribution
          </h3>
          {moodChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={moodChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="count"
                  label={({ mood, count }) => `${mood}: ${count}`}
                >
                  {moodChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              <p>No mood data available yet. Start tracking your moods!</p>
            </div>
          )}
        </Card>

        {/* Recent Mood Timeline Bar */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Mood Timeline
          </h3>
          {recentMoods.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={recentMoods}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis hide />
                <Tooltip
                  formatter={(value, name, props) => [
                    props.payload.mood,
                    'Mood',
                  ]}
                  labelFormatter={(label) => `Time: ${label}`}
                />
                <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              <p>No recent activity to display.</p>
            </div>
          )}
        </Card>
      </div>

      {/* Recent Mood Entries List */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Mood Entries
        </h3>
        {moodHistory.length > 0 ? (
          <div className="space-y-3">
            {moodHistory
              .slice(-5)
              .reverse()
              .map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: MOOD_COLORS[entry.mood] }}
                    />
                    <span className="font-medium capitalize">
                      {entry.mood}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(entry.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No mood entries yet. Start by selecting your current mood!
          </p>
        )}
      </Card>
    </div>
  );
};
