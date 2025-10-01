
'use client';

import React from 'react';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { Badge } from '@/components/ui/badge';
import { Heart, HeartCrack } from 'lucide-react';
import { useScopedI18n } from '@/locales/client';

interface RelationsCardProps {
  student: StudentDTO | null;
}

const RelationsCard: React.FC<RelationsCardProps> = ({ student }) => {
  const t = useScopedI18n('publicProfile');

  if (!student) {
    return null;
  }
  
  const hasGoodRelations = student.goodRelations && student.goodRelations.length > 0;
  const hasBadRelations = student.badRelations && student.badRelations.length > 0;

  if (!hasGoodRelations && !hasBadRelations) {
    return <p className="text-sm text-muted-foreground">{t('noRelations')}</p>;
  }

  return (
    <div className="space-y-4">
      {hasGoodRelations && (
        <div>
          <h4 className="font-semibold flex items-center gap-1.5 text-green-600 mb-2">
            <Heart className="h-4 w-4" />
            {t('goodRelations')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {student.goodRelations!.map((name, i) => (
              <Badge key={i} variant="secondary" className="bg-green-100 text-green-800 border border-green-200">
                {name}
              </Badge>
            ))}
          </div>
        </div>
      )}
      {hasBadRelations && (
        <div>
          <h4 className="font-semibold flex items-center gap-1.5 text-red-600 mb-2">
            <HeartCrack className="h-4 w-4" />
            {t('badRelations')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {student.badRelations!.map((name, i) => (
              <Badge key={i} variant="destructive" className="opacity-80">
                {name}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelationsCard;
