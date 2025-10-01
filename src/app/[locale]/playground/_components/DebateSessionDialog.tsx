
'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { DebateDTO } from '@/modules/debate/application/dtos/debate.dto';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import QRCode from 'qrcode.react';
import { Input } from '@/components/ui/input';
import { Copy, Users, CheckCircle, RotateCw, StopCircle, Loader2, Play, Pause, ChevronsRight, Timer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UseMutationResult } from '@tanstack/react-query';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface DebateSessionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  sessionData: { debateId: string; liveId: string } | null;
  stopSessionMutation: UseMutationResult<DebateDTO | null, Error, string, unknown>;
  students: StudentDTO[];
}

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const DebateSessionDialog: React.FC<DebateSessionDialogProps> = ({
  isOpen,
  onClose,
  sessionData,
  stopSessionMutation,
  students,
}) => {
  const t = useScopedI18n('playground.debateGenerator.liveSession');
  const tCommon = useScopedI18n('common');
  const tTests = useScopedI18n('tests.liveSession');
  const tDebate = useScopedI18n('playground.debateGenerator');
  const locale = useCurrentLocale();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [timeLeft, setTimeLeft] = useState(0);

  const { data: debate, isLoading, isRefetching, refetch } = useQuery<DebateDTO>({
    queryKey: ['debateDetails', sessionData?.debateId],
    queryFn: async () => {
      if (!sessionData?.debateId) return null;
      const res = await fetch(`/api/games/debate/session/${sessionData.liveId}`);
      if (!res.ok) throw new Error('Failed to fetch debate details');
      const data = await res.json();
      return data.debate;
    },
    enabled: !!sessionData?.debateId && isOpen,
    refetchInterval: 5000, 
  });
  
  const nextTurnMutation = useMutation({
    mutationFn: (debateId: string) => fetch(`/api/games/debate/${debateId}/next-turn`, { method: 'POST' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debateDetails', sessionData?.debateId] });
    },
    onError: () => toast({ title: "Error", description: "Failed to advance to next turn", variant: 'destructive'})
  });

  const pauseOrResumeMutation = useMutation({
      mutationFn: (debateId: string) => fetch(`/api/games/debate/${debateId}/pause`, { method: 'POST' }),
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['debateDetails', sessionData?.debateId] });
      },
      onError: () => toast({ title: "Error", description: "Failed to pause/resume debate", variant: 'destructive'})
  });

 useEffect(() => {
    if (!debate || debate.currentTurnIndex === -1 || debate.isPaused) {
        if(debate?.turnStructure && debate.currentTurnIndex > -1){
            const turn = debate.turnStructure[debate.currentTurnIndex];
            // If paused, show the time left at the moment of pausing
            const elapsedSeconds = debate.accumulatedPauseTime / 1000;
            setTimeLeft(turn.durationSeconds - elapsedSeconds);
        } else {
            setTimeLeft(0);
        }
        return;
    }

    const calculateTimeLeft = () => {
        const turn = debate.turnStructure[debate.currentTurnIndex];
        if (!turn || !debate.turnStartedAt) return 0;
        
        const now = new Date().getTime();
        const startTime = new Date(debate.turnStartedAt).getTime();
        const elapsedMilliseconds = now - startTime;
        const activeMilliseconds = elapsedMilliseconds - (debate.accumulatedPauseTime || 0);
        
        return Math.max(0, turn.durationSeconds - Math.floor(activeMilliseconds / 1000));
    }
    
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
        setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [debate]);


  const sessionUrl =
    typeof window !== 'undefined' && sessionData
      ? `${window.location.origin}/${locale}/public/debate-session/${sessionData.liveId}`
      : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(sessionUrl);
    toast({
      title: t('copied'),
    });
  };

  const handleStopSession = () => {
    if (sessionData?.debateId) {
      stopSessionMutation.mutate(sessionData.debateId, {
        onSuccess: () => {
          onClose();
        }
      });
    }
  }
  
  const handleNextTurn = () => {
      if (sessionData?.debateId) {
          nextTurnMutation.mutate(sessionData.debateId);
      }
  }

  const handlePauseResume = () => {
      if (sessionData?.debateId) {
          pauseOrResumeMutation.mutate(sessionData.debateId);
      }
  }
  
  const studentMap = new Map(students.map(s => [s.id, s.name]));
  const currentTurn = debate ? debate.turnStructure[debate.currentTurnIndex] : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{debate?.topic}</DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-3 gap-6 py-4">
           {/* Left Column: QR & Link */}
           <div className="flex flex-col items-center justify-start gap-4 p-4 border rounded-md bg-muted/30">
              <div className="text-center">
                <h3 className="font-semibold">{tTests('qrCode')}</h3>
                <div className="p-2 bg-white rounded-md mt-2 inline-block">
                  <QRCode value={sessionUrl} size={128} />
                </div>
              </div>
               <div>
                <h3 className="font-semibold text-center">{tTests('link')}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Input value={sessionUrl} readOnly className="text-xs h-8" />
                  <Button variant="outline" size="icon" onClick={handleCopy} className="h-8 w-8">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Separator />
               <div className="w-full">
                <h3 className="font-semibold mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {t('studentsConnected')} ({(debate?.teams?.affirmative.length || 0) + (debate?.teams?.negative.length || 0)})
                    </span>
                     <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => refetch()} disabled={isRefetching}>
                        <RotateCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
                    </Button>
                </h3>
                 <ScrollArea className="h-48 border rounded-md p-2">
                    <h4 className="font-medium text-sm text-green-600 px-2">{tDebate('liveSession.affirmative')} ({(debate?.teams?.affirmative || []).length})</h4>
                     <ul className="text-sm text-muted-foreground p-2">
                        {(debate?.teams?.affirmative || []).map(id => <li key={id}>{studentMap.get(id) || '...'}</li>)}
                    </ul>
                    <Separator />
                    <h4 className="font-medium text-sm text-red-600 px-2 mt-2">{tDebate('liveSession.negative')} ({(debate?.teams?.negative || []).length})</h4>
                    <ul className="text-sm text-muted-foreground p-2">
                        {(debate?.teams?.negative || []).map(id => <li key={id}>{studentMap.get(id) || '...'}</li>)}
                    </ul>
                </ScrollArea>
              </div>
            </div>

            {/* Right Column: Turn Structure & Controls */}
            <div className="md:col-span-2 space-y-4">
                 <Card>
                    <CardHeader>
                        <CardTitle>{tDebate('turnStructureTitle')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <ScrollArea className="h-64">
                         <div className="space-y-2 pr-4">
                            {debate?.turnStructure.map((turn, index) => (
                                <div key={index} className={cn("p-3 rounded-md border flex items-center justify-between",
                                    debate.currentTurnIndex === index ? "bg-primary/10 border-primary" : "bg-muted/50"
                                )}>
                                    <div className="flex items-center gap-3">
                                        <Badge variant={turn.team === 'affirmative' ? 'default' : turn.team === 'negative' ? 'destructive' : 'secondary'}>
                                            {tDebate(turn.team as any)}
                                        </Badge>
                                        <p className="font-medium">{turn.type}</p>
                                    </div>
                                     <div className="flex items-center gap-3">
                                        <span className="text-sm font-mono text-muted-foreground">{formatTime(turn.durationSeconds)}</span>
                                        {debate.currentTurnIndex === index && <Timer className="h-5 w-5 text-primary" />}
                                     </div>
                                </div>
                            ))}
                         </div>
                       </ScrollArea>
                    </CardContent>
                 </Card>
                 <div className="p-4 border rounded-lg text-center space-y-2">
                    <p className="text-lg font-semibold">{currentTurn ? `${tDebate('currentTurn')}: ${currentTurn.type}` : tDebate('notStarted')}</p>
                    <p className="text-6xl font-bold font-mono text-primary">{formatTime(timeLeft)}</p>
                    {debate?.isPaused && <p className="text-sm font-semibold text-yellow-600 animate-pulse uppercase">{tDebate('paused')}</p>}
                 </div>
            </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
            <Button variant="destructive" onClick={handleStopSession} disabled={stopSessionMutation.isPending}>
                {stopSessionMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <StopCircle className="mr-2 h-4 w-4"/>}
                {t('closeSession')}
            </Button>
            <div className="flex gap-2">
                {debate?.currentTurnIndex !== -1 && (
                     <Button variant="outline" onClick={handlePauseResume} disabled={pauseOrResumeMutation.isPending}>
                        {pauseOrResumeMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : debate?.isPaused ? <Play className="mr-2 h-4 w-4"/> : <Pause className="mr-2 h-4 w-4"/>}
                        {debate?.isPaused ? tDebate('resume') : tDebate('pause')}
                    </Button>
                )}
                <Button onClick={handleNextTurn} disabled={nextTurnMutation.isPending}>
                    {nextTurnMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <ChevronsRight className="mr-2 h-4 w-4"/>}
                    {debate?.currentTurnIndex === -1 ? tDebate('start') : tDebate('nextTurn')}
                </Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DebateSessionDialog;
