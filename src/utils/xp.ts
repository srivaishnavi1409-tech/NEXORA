export const XP_REWARDS = {
  VIDEO_COMPLETE: 10,
  NOTES_COMPLETE: 5,
  PRACTICE_COMPLETE: 15,
  QUIZ_COMPLETE: 10,
  QUIZ_PERFECT_SCORE: 20,
};

export const calculateXPReward = (type: string, isPerfect?: boolean): number => {
  let xp = 0;
  
  switch (type) {
    case 'video':
      xp = XP_REWARDS.VIDEO_COMPLETE;
      break;
    case 'notes':
      xp = XP_REWARDS.NOTES_COMPLETE;
      break;
    case 'practice':
      xp = XP_REWARDS.PRACTICE_COMPLETE;
      break;
    case 'quiz':
      xp = XP_REWARDS.QUIZ_COMPLETE;
      if (isPerfect) xp += XP_REWARDS.QUIZ_PERFECT_SCORE;
      break;
    default:
      xp = 0;
  }
  
  return xp;
};
