
'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Crown, Lightbulb, Users, ThumbsDown, ThumbsUp, Loader2, Ban } from 'lucide-react';
import type { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { useScopedI18n } from '@/locales/client';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ScrollArea } from './ui/scroll-area';

interface SelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  onAccept: () => void;
  onReject: () => void;
  isRetrying: boolean;
  isAccepting: boolean;
  isRejecting: boolean;
  selection: {
    students: StudentDTO[];
    challenge: string;
    tip: string;
    attemptsLeft: number;
  } | null;
}

const SelectionDialog: React.FC<SelectionDialogProps> = ({ isOpen, onClose, selection, onRetry, onAccept, onReject, isRetrying, isAccepting, isRejecting }) => {
  const t = useScopedI18n('dialog');
  const [isTipVisible, setIsTipVisible] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      // Reset tip visibility when a new dialog opens
      setIsTipVisible(false);
    }
  }, [isOpen]);

  if (!selection) return null;

  const { students, challenge, tip, attemptsLeft } = selection;
  const isPair = students.length > 1;
  const studentNames = students.map((s) => s.name).join(` ${t('and')} `);


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center p-8 flex flex-col max-h-[90vh]">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-[#98FB98]"></div>
        <DialogHeader className="space-y-4 flex-shrink-0">
          <div className="mx-auto bg-primary/10 rounded-full p-2 w-fit">
            {isPair ? (
              <Users className="w-12 h-12 text-primary" />
            ) : (
              <Crown className="w-12 h-12 text-primary" />
            )}
          </div>
          <DialogTitle className="text-3xl font-bold font-headline">
            {isPair ? t('congratulationsPair') : t('congratulations', { name: studentNames })}
          </DialogTitle>
           {isPair && <p className="text-2xl font-bold text-primary -mt-2">{studentNames}</p>}
          <DialogDescription className="text-lg">
            {t('yourChallenge')}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="my-4 flex-grow">
          <div className="space-y-6 pr-4">
            <div className="p-6 bg-accent rounded-lg shadow-inner text-accent-foreground relative">
              <p className="text-xl font-semibold text-left">"{challenge}"</p>

              <div className='absolute -top-3 -right-3'>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full bg-amber-300/50 hover:bg-amber-300" onClick={() => setIsTipVisible(prev => !prev)}>
                          <Lightbulb className="w-5 h-5 text-amber-500" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t('showHint')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {isTipVisible && (
                <div className="p-4 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 rounded-r-lg text-left">
                    <div className="flex">
                        <div className="py-1"><Lightbulb className="h-5 w-5 text-yellow-400 mr-3"/></div>
                        <div>
                            <p className="font-bold">{t('hintTitle')}</p>
                            <p className="text-sm">"{tip}"</p>
                        </div>
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
        

        <DialogFooter className="flex-col sm:flex-col sm:justify-center gap-2 flex-shrink-0">
            {attemptsLeft > 0 ? (
                <Button type="button" size="lg" variant="destructive" onClick={onRetry} disabled={isRetrying || isAccepting || isRejecting}>
                    {isRetrying ? <Loader2 className="animate-spin" /> : <ThumbsDown />}
                    {t('retryChallenge')} ({attemptsLeft} {t('attemptsLeft')})
                </Button>
            ) : (
                 <Button type="button" size="lg" variant="destructive" onClick={onReject} disabled={isRetrying || isAccepting || isRejecting}>
                    {isRejecting ? <Loader2 className="animate-spin" /> : <Ban />}
                    {t('rejectChallenge')}
                </Button>
            )}
            <Button type="button" size="lg" onClick={onAccept} className='bg-green-500 hover:bg-green-600' disabled={isRetrying || isAccepting || isRejecting}>
                {isAccepting ? <Loader2 className="animate-spin" /> : <ThumbsUp />}
                {t('acceptChallenge')}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SelectionDialog;
