
'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { useScopedI18n } from '@/locales/client';
import { BrainCircuit, Loader2, Sparkles } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import { Skeleton } from '@/components/ui/skeleton';

interface AskAIExpertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentDTO | null;
  question: string;
  setQuestion: (question: string) => void;
  answer: string;
  isLoading: boolean;
  onAsk: () => void;
}

const AskAIExpertDialog: React.FC<AskAIExpertDialogProps> = ({
  isOpen,
  onClose,
  student,
  question,
  setQuestion,
  answer,
  isLoading,
  onAsk,
}) => {
  const t = useScopedI18n('classroom.aiExpertDialog');
  const tCommon = useScopedI18n('common');

  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BrainCircuit className="text-primary" />
            {t('title', { name: student.name })}
          </DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6 py-4 flex-grow overflow-hidden">
          <div className="flex flex-col space-y-4 overflow-hidden">
            <h4 className="font-semibold">{t('studentProfile')}</h4>
            <ScrollArea className="flex-grow border rounded-md p-4">
                <div className="space-y-3 text-sm">
                    {student.qualities.length > 0 && <div><strong>{t('qualities')}:</strong> <div className="flex flex-wrap gap-1 mt-1">{student.qualities.map(q => <Badge key={q} variant="secondary">{q}</Badge>)}</div></div>}
                    {student.fears && student.fears.length > 0 && <div><strong>{t('fears')}:</strong> <div className="flex flex-wrap gap-1 mt-1">{student.fears.map(f => <Badge key={f} variant="destructive">{f}</Badge>)}</div></div>}
                    {student.notes && <div><strong>{t('notes')}:</strong> <p className="italic text-muted-foreground">{`"${student.notes}"`}</p></div>}
                    {student.disability && <div><strong>{t('disability')}:</strong> {student.disability}</div>}
                    {student.neurodiversity && <div><strong>{t('neurodiversity')}:</strong> {student.neurodiversity}</div>}
                </div>
            </ScrollArea>
          </div>
          <div className="flex flex-col space-y-4 overflow-hidden">
            <div className="space-y-2">
              <Label htmlFor="ai-question">{t('questionLabel')}</Label>
              <Textarea
                id="ai-question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={t('questionPlaceholder')}
                rows={3}
              />
            </div>
             <Button onClick={onAsk} disabled={isLoading || !question.trim()} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              {t('askButton')}
            </Button>
            <div className="flex-grow flex flex-col mt-4 overflow-hidden">
              <h4 className="font-semibold mb-2 flex-shrink-0">{t('answerTitle')}</h4>
              {isLoading && !answer ? (
                <div className="space-y-2 border rounded-md p-4 bg-muted/50 flex-grow">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ) : answer ? (
                  <ScrollArea className="h-full border rounded-md p-4 bg-muted/50 flex-grow">
                      <div className="prose prose-sm max-w-none">
                          <ReactMarkdown>{answer}</ReactMarkdown>
                      </div>
                  </ScrollArea>
              ) : <div className="h-full border rounded-md border-dashed"/>}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {tCommon('back')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AskAIExpertDialog;
