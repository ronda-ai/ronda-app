
'use client';

import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { useScopedI18n } from '@/locales/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface CoachStudentSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  students: StudentDTO[];
  onSelectStudent: (studentId: string) => void;
}

const chunkArray = (array: any[], size: number) => {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
};

const CoachStudentSelector: React.FC<CoachStudentSelectorProps> = ({
  isOpen,
  onClose,
  students,
  onSelectStudent,
}) => {
  const t = useScopedI18n('coach.noStudentSelected');
  const tStudentList = useScopedI18n('studentList');
  const tClassroom = useScopedI18n('classroom');
  const tHome = useScopedI18n('home');

  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredStudents = useMemo(() => {
    if (!searchTerm) return students;
    return students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [students, searchTerm]);

  const studentPages = useMemo(() => chunkArray(filteredStudents, 4), [filteredStudents]);
  const totalPages = studentPages.length;

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };
  
  // Reset search and page when dialog opens/closes
  React.useEffect(() => {
    if(isOpen) {
        setSearchTerm('');
        setCurrentPage(0);
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        
        <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder={tClassroom('studentList.searchPlaceholder')}
                className="pl-8 w-full"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>

        <div className="relative h-96 overflow-hidden">
          <AnimatePresence initial={false} custom={currentPage}>
            <motion.div
              key={currentPage}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4 p-1"
            >
              {studentPages[currentPage]?.map((student) => (
                <Card 
                    key={student.id} 
                    className="p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => onSelectStudent(student.id)}
                >
                  <Avatar className="h-16 w-16 mb-2">
                    <AvatarFallback className="text-2xl">{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold">{student.name}</p>
                  {student.age && <p className="text-xs text-muted-foreground">{student.age} {tHome('yearsOld')}</p>}
                </Card>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-4">
              <Button variant="outline" size="icon" onClick={handlePrevPage}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage + 1} of {totalPages}
              </span>
              <Button variant="outline" size="icon" onClick={handleNextPage}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CoachStudentSelector;
