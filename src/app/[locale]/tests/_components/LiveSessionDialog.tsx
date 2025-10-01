
'use client';

import React from 'react';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { TestDTO } from '@/modules/test/application/dtos/test.dto';
import { useQuery } from '@tanstack/react-query';
import QRCode from 'qrcode.react';
import { Input } from '@/components/ui/input';
import { Copy, Users, CheckCircle, LineChart, StopCircle, Loader2, RotateCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { UseMutationResult } from '@tanstack/react-query';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';

interface LiveSessionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  sessionData: { testId: string; liveId: string } | null;
  stopSessionMutation: UseMutationResult<TestDTO | null, Error, string, unknown>;
  students: StudentDTO[];
}

const LiveSessionDialog: React.FC<LiveSessionDialogProps> = ({
  isOpen,
  onClose,
  sessionData,
  stopSessionMutation,
  students,
}) => {
  const t = useScopedI18n('tests.liveSession');
  const tCommon = useScopedI18n('common');
  const locale = useCurrentLocale();
  const { toast } = useToast();
  const router = useRouter();

  const { data: test, isLoading, isRefetching, refetch } = useQuery<TestDTO>({
    queryKey: ['testDetails', sessionData?.testId],
    queryFn: async () => {
      if (!sessionData?.testId) return null;
      const res = await fetch(`/api/tests/${sessionData.testId}`);
      if (!res.ok) throw new Error('Failed to fetch test details');
      return res.json();
    },
    enabled: !!sessionData?.testId && isOpen,
    refetchInterval: 5000, 
  });

  const sessionUrl =
    typeof window !== 'undefined' && sessionData
      ? `${window.location.origin}/${locale}/public/test-session/${sessionData.liveId}`
      : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(sessionUrl);
    toast({
      title: t('copied'),
    });
  };

  const handleStopSession = () => {
    if (sessionData?.testId) {
      stopSessionMutation.mutate(sessionData.testId, {
        onSuccess: () => {
          onClose();
        }
      });
    }
  }
  
  const studentMap = new Map(students.map(s => [s.id, s.name]));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        {isLoading || !sessionUrl ? (
          <Skeleton className="h-64 w-full" />
        ) : (
          <div className="grid md:grid-cols-2 gap-6 py-4">
            <div className="flex flex-col items-center justify-center gap-4 p-4 border rounded-md">
              <h3 className="font-semibold">{t('qrCode')}</h3>
              <div className="p-2 bg-white rounded-md">
                <QRCode value={sessionUrl} size={160} />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">{t('link')}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Input value={sessionUrl} readOnly />
                  <Button variant="outline" size="icon" onClick={handleCopy}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="border p-4 rounded-md h-40">
                <h3 className="font-semibold mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {t('studentsConnected')} ({test?.activeStudentIds?.length || 0})
                    </span>
                     <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => refetch()} disabled={isRefetching}>
                        <RotateCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
                    </Button>
                </h3>
                <ScrollArea className="h-28">
                    {test?.activeStudentIds && test.activeStudentIds.length > 0 ? (
                        <ul className="space-y-2">
                            {test.activeStudentIds.map(id => {
                                const studentName = studentMap.get(id) || `ID: ${id.substring(0,8)}...`;
                                return <li key={id} className="flex items-center gap-2 text-sm"><CheckCircle className="h-4 w-4 text-green-500" />{studentName}</li>
                            })}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground">{t('noStudentsYet')}</p>
                    )}
                </ScrollArea>
              </div>
            </div>
          </div>
        )}
        <DialogFooter className="sm:justify-between">
            <div>
                 <Button variant="secondary" onClick={() => router.push(`/${locale}/tests/${sessionData?.testId}/results`)}>
                    <LineChart className="mr-2 h-4 w-4"/>
                    {t('viewResults')}
                </Button>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" onClick={onClose}>
                    {tCommon('close')}
                </Button>
                <Button variant="destructive" onClick={handleStopSession} disabled={stopSessionMutation.isPending}>
                    {stopSessionMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <StopCircle className="mr-2 h-4 w-4"/>}
                    {t('closeSession')}
                </Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LiveSessionDialog;
