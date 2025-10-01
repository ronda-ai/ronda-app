
'use client';

import React from 'react';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ShieldAlert } from 'lucide-react';
import { useScopedI18n } from '@/locales/client';

interface QualitiesCardProps {
  student: StudentDTO | null;
}

const QualitiesCard: React.FC<QualitiesCardProps> = ({ student }) => {
  const t = useScopedI18n('publicProfile');

  if (!student) {
    return null;
  }
  
  return (
    <div className="space-y-4">
      {student.qualities.length > 0 && (
        <div>
          <h4 className="font-semibold flex items-center gap-1.5 text-green-600 mb-2">
            <Sparkles className="h-4 w-4" />
            {t('qualities')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {student.qualities.map((q, i) => (
              <Badge key={i} variant="secondary" className="bg-green-100 text-green-800 border border-green-200">
                {q}
              </Badge>
            ))}
          </div>
        </div>
      )}
      {student.fears && student.fears.length > 0 && (
        <div>
          <h4 className="font-semibold flex items-center gap-1.5 text-red-600 mb-2">
            <ShieldAlert className="h-4 w-4" />
            {t('fears')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {student.fears.map((f, i) => (
              <Badge key={i} variant="destructive" className="opacity-80">
                {f}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QualitiesCard;
