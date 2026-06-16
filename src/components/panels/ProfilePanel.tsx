import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { User, Mail, Award, TrendingUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface ProfilePanelProps {
  userName: string;
  email: string;
  totalXP: number;
  currentLevel: number;
  streak: number;
  profileImage?: string;
}

const ProfilePanel: React.FC<ProfilePanelProps> = ({
  userName,
  email,
  totalXP,
  currentLevel,
  streak,
  profileImage,
}) => {
  const nextLevelXP = (currentLevel + 1) * 1000;
  const progressPercentage = (totalXP / nextLevelXP) * 100;

  return (
    <Card hoverable className="space-y-6">
      {/* User Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-2xl font-bold">
          {userName.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="text-xl font-bold">{userName}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1">
            <Mail size={14} /> {email}
          </p>
        </div>
      </div>

      {/* Level Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold flex items-center gap-2">
            <Award size={18} /> Level {currentLevel}
          </span>
          <Badge variant="primary">{totalXP} XP</Badge>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-full"
          />
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {totalXP} / {nextLevelXP} XP to next level
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400">Current Streak</p>
          <p className="text-2xl font-bold text-primary-600">{streak} 🔥</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400">Courses</p>
          <p className="text-2xl font-bold text-green-600">4</p>
        </div>
      </div>
    </Card>
  );
};

export default ProfilePanel;
