'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useScopedI18n } from '@/locales/client';
import { useParams } from 'next/navigation';
import { usePublicDebateSession } from './_hooks/usePublicDebateSession';
import PublicLayout from '@/components/PublicLayout';
import { Loader2, LogOut, Timer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';


const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const DebateSessionPage = () => {
  const params = useParams();
  const liveId = params.liveId as string;
  const t = useScopedI18n('publicDebateSession');
  const tDebateLiveSession = useScopedI18n('playground.debateGenerator.liveSession');
  const tDebateGenerator = useScopedI18n('playground.debateGenerator');
  
  const {
    debate,
    isLoading,
    isError,
    setSelectedStudent,
    students,
    joinTeam,
    isJoining,
    joinedTeam,
    timeLeft,
    currentTurn,
    selectedStudent,
    handleLeaveTeam,
    isLeaving,
  } = usePublicDebateSession(liveId);


  if (isLoading) {
    return (
      <PublicLayout>
        <Skeleton className="h-64 w-full max-w-lg" />
      </PublicLayout>
    );
  }

  if (isError || !debate || debate.status !== 'live') {
    return (
      <PublicLayout>
        <Card className="w-full max-w-md text-center">
            <CardHeader>
                <CardTitle>{t('notFound.title')}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{t('notFound.description')}</p>
            </CardContent>
        </Card>
      </PublicLayout>
    );
  }
  
  if (!joinedTeam) {
    return (
      <PublicLayout>
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>{t('welcome')}</CardTitle>
            <CardDescription>{students.length > 0 ? t('selectYourName') : t('noStudentsAvailable')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select onValueChange={(studentId) => setSelectedStudent(students.find(s => s.id === studentId) || null)} value={selectedStudent?.id || ''}>
              <SelectTrigger>
                <SelectValue placeholder={t('selectYourName')} />
              </SelectTrigger>
              <SelectContent>
                {students.map(s => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedStudent && (
                 <div className="grid grid-cols-2 gap-4">
                    <Button onClick={() => joinTeam('affirmative')} disabled={isJoining === 'affirmative'} className="bg-green-600 hover:bg-green-700">
                        {isJoining === 'affirmative' ? <Loader2 className="animate-spin" /> : tDebateLiveSession('affirmative')}
                    </Button>
                    <Button onClick={() => joinTeam('negative')} disabled={isJoining === 'negative'} className="bg-red-600 hover:bg-red-700">
                         {isJoining === 'negative' ? <Loader2 className="animate-spin" /> : tDebateLiveSession('negative')}
                    </Button>
                </div>
            )}
          </CardContent>
        </Card>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
       <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle>{debate.topic}</CardTitle>
             <CardDescription>{t('hello')} {selectedStudent?.name}! {t('goodLuck')}</CardDescription>
             <Badge className={cn("mx-auto", joinedTeam === 'affirmative' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')}>
                {tDebateLiveSession(joinedTeam)}
             </Badge>
          </CardHeader>
           <CardContent className="space-y-6">
            {currentTurn ? (
                <div className="p-4 border rounded-lg text-center space-y-2">
                    <p className="text-lg font-semibold">{`Turno Actual: ${currentTurn.type}`}</p>
                    <p className="text-6xl font-bold font-mono text-primary">{formatTime(timeLeft)}</p>
                    {debate.isPaused && <p className="text-sm font-semibold text-yellow-600 animate-pulse">DEBATE EN PAUSA</p>}
                </div>
            ) : (
                 <p className="text-center text-muted-foreground py-8">{t('waitingForTeacher')}</p>
            )}
            <div className="space-y-2">
                <h3 className="font-semibold text-center">{tDebateGenerator('turnStructureTitle')}</h3>
                <div className="space-y-2">
                {debate.turnStructure.map((turn, index) => (
                    <div key={index} className={cn("p-3 rounded-md border flex items-center justify-between",
                        debate.currentTurnIndex === index ? "bg-primary/10 border-primary" : "bg-muted/50"
                    )}>
                        <div className="flex items-center gap-3">
                            <Badge variant={turn.team === 'affirmative' ? 'default' : turn.team === 'negative' ? 'destructive' : 'secondary'}>
                                {tDebateLiveSession(turn.team as any)}
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
            </div>
           </CardContent>
            <CardFooter>
                <Button variant="ghost" onClick={handleLeaveTeam} disabled={isLeaving}>
                    {isLeaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
                    {t('leaveSession')}
                </Button>
            </CardFooter>
       </Card>
    </PublicLayout>
  )
};

export default DebateSessionPage;