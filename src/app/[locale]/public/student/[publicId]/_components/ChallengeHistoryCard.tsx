
'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useScopedI18n } from '@/locales/client';
import {
  Smile,
  Frown,
  Meh,
  Rocket,
  Drama,
  Bot,
  Repeat
} from 'lucide-react';
import { ChallengeHistoryDTO } from '@/modules/challenge/application/dtos/challenge-history.dto';

interface ChallengeHistoryCardProps {
  challengeItem: ChallengeHistoryDTO;
}
/*  */
const ChallengeHistoryCard: React.FC<ChallengeHistoryCardProps> = ({ challengeItem }) => {
  const tRatings = useScopedI18n('evaluations.ratings');
  const tMoods = useScopedI18n('evaluations.moods');
  const tDialog = useScopedI18n('dialog');

  const ratingMap: {
    [key: string]: { icon: React.ElementType; color: string; label: string };
  } = {
    'needs-support': { icon: Frown, color: 'text-red-600', label: tRatings('needsSupport') },
    'met-expectations': { icon: Meh, color: 'text-yellow-600', label: tRatings('metExpectations') },
    'exceeded-expectations': { icon: Smile, color: 'text-green-600', label: tRatings('exceededExpectations') },
  };

  const moodMap: {
    [key: string]: { icon: React.ElementType; color: string; label: string };
  } = {
    enthusiastic: { icon: Rocket, color: 'text-orange-600', label: tMoods('enthusiastic') },
    focused: { icon: Bot, color: 'text-blue-600', label: tMoods('focused') },
    nervous: { icon: Drama, color: 'text-purple-600', label: tMoods('nervous') },
    frustrated: { icon: Frown, color: 'text-red-600', label: tMoods('frustrated') },
    happy: { icon: Smile, color: 'text-green-600', label: tMoods('happy') },
    tired: { icon: Meh, color: 'text-gray-600', label: tMoods('tired') },
  };

  const ratingInfo = challengeItem.rating ? ratingMap[challengeItem.rating] : null;
  const RatingIcon = ratingInfo ? ratingInfo.icon : null;
  const moodInfo = challengeItem.mood ? moodMap[challengeItem.mood] : null;
  const MoodIcon = moodInfo ? moodInfo.icon : null;

  return (
    <div className="p-4 border rounded-md bg-white">
      <p className="font-semibold text-gray-700">"{challengeItem.challenge.challenge}"</p>
      <p className="text-sm text-gray-500 mt-1 italic">Tip: "{challengeItem.challenge.tip}"</p>
      <div className="mt-3 flex flex-wrap items-center gap-4">
        {ratingInfo && RatingIcon && (
          <Badge variant="outline" className={`${ratingInfo.color} border-current`}>
            <RatingIcon className="h-4 w-4 mr-1.5" />
            {ratingInfo.label}
          </Badge>
        )}
        {moodInfo && MoodIcon && (
          <Badge variant="outline" className={`${moodInfo.color} border-current`}>
            <MoodIcon className="h-4 w-4 mr-1.5" />
            {moodInfo.label}
          </Badge>
        )}
        {challengeItem.attempts && challengeItem.attempts > 0 && (
          <Badge variant="outline" className="text-gray-600 border-current">
            <Repeat className="h-4 w-4 mr-1.5" />
            {challengeItem.attempts} {tDialog('attemptsLeft')}
          </Badge>
        )}
      </div>
      {challengeItem.feedback && (
        <blockquote className="mt-3 border-l-4 pl-4 text-sm italic text-gray-600">
          "{challengeItem.feedback}"
        </blockquote>
      )}
    </div>
  );
};
/*  */
export default ChallengeHistoryCard;
