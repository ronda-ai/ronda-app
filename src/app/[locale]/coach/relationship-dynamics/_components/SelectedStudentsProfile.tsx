
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, Sparkles } from 'lucide-react';
import { useScopedI18n } from '@/locales/client';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';

interface SelectedStudentsProfileProps {
    selectedStudents: StudentDTO[];
}

const SelectedStudentsProfile: React.FC<SelectedStudentsProfileProps> = ({ selectedStudents }) => {
    const t = useScopedI18n('coach.relationshipLab');
    
    if (selectedStudents.length === 0) {
        return null;
    }

    return (
         <Card>
            <CardHeader>
                <CardTitle>{t('studentInfo.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {selectedStudents.map(student => (
                    <div key={student.id} className="p-4 border rounded-lg flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h4 className="font-semibold text-lg">{student.name}</h4>
                            <div className="mt-2">
                                <h5 className="text-sm font-medium flex items-center gap-1.5 text-green-600"><Sparkles className="h-4 w-4" />{t('studentInfo.qualities')}</h5>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {student.qualities.length > 0 ? student.qualities.map((q, i) => (
                                        <Badge key={i} variant="secondary" className='bg-green-100 text-green-800'>{q}</Badge>
                                    )) : <p className='text-xs text-muted-foreground'>{t('studentInfo.none')}</p>}
                                </div>
                            </div>
                            <div className="mt-3">
                                <h5 className="text-sm font-medium flex items-center gap-1.5 text-red-600"><ShieldAlert className="h-4 w-4" />{t('studentInfo.fears')}</h5>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {(student.fears && student.fears.length > 0) ? student.fears.map((f, i) => (
                                        <Badge key={i} variant="destructive" className='opacity-80'>{f}</Badge>
                                    )) : <p className='text-xs text-muted-foreground'>{t('studentInfo.none')}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

export default SelectedStudentsProfile;
