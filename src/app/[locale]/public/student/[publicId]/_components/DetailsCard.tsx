
'use client';

import React from 'react';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { Info, PersonStanding, BrainCircuit } from 'lucide-react';
import { useScopedI18n } from '@/locales/client';

interface DetailsCardProps {
  student: StudentDTO | null;
}

const DetailsCard: React.FC<DetailsCardProps> = ({ student }) => {
  const t = useScopedI18n('publicProfile');
  
  if (!student) {
    return null;
  }

  const hasDetails = student.disability || student.neurodiversity || student.notes;

  if (!hasDetails) {
    return null;
  }

  return (
    <div className="space-y-4">
      {student.disability && (
        <div className="flex items-start gap-3 text-sm">
          <PersonStanding className="h-4 w-4 mt-1 flex-shrink-0 text-blue-500" />
          <div>
            <h4 className="font-semibold text-blue-600">{t('disability')}</h4>
            <p className="text-muted-foreground">{student.disability}</p>
          </div>
        </div>
      )}
      {student.neurodiversity && (
        <div className="flex items-start gap-3 text-sm">
          <BrainCircuit className="h-4 w-4 mt-1 flex-shrink-0 text-purple-500" />
          <div>
            <h4 className="font-semibold text-purple-600">{t('neurodiversity')}</h4>
            <p className="text-muted-foreground">{student.neurodiversity}</p>
          </div>
        </div>
      )}
      {student.notes && (
        <div className="flex items-start gap-3 text-sm mt-4">
          <Info className="h-4 w-4 mt-1 flex-shrink-0 text-gray-500" />
          <div>
            <h4 className="font-semibold">{t('notes')}</h4>
            <p className="italic text-muted-foreground">"{student.notes}"</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsCard;
