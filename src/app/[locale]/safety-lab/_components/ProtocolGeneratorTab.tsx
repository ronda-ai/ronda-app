
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, BookOpen, Trash2, FileDown } from 'lucide-react';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { useEducationalSafety } from '../_hooks/useEducationalSafety';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { formatDistanceToNow } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ProtocolGeneratorTabProps {
    hooks: ReturnType<typeof useEducationalSafety>;
}

const ProtocolGeneratorTab: React.FC<ProtocolGeneratorTabProps> = ({ hooks }) => {
  const t = useScopedI18n('safetyLab.protocols');
  const tRelations = useScopedI18n('relations');
  const locale = useCurrentLocale();
  const [protocolToDelete, setProtocolToDelete] = React.useState<string | null>(null);
  
  const {
    protocolRisk, setProtocolRisk,
    protocols, isLoadingProtocols,
    generateProtocolMutation,
    handleGenerateProtocol,
    deleteProtocolMutation,
    handleDownloadProtocol,
  } = hooks;

  const isGenerating = generateProtocolMutation.isPending;

  const handleDeleteProtocol = () => {
    if (protocolToDelete) {
        deleteProtocolMutation.mutate(protocolToDelete);
        setProtocolToDelete(null);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerateProtocol} className="flex flex-col md:flex-row items-end gap-4">
            <div className="flex-grow space-y-2">
              <Label htmlFor="risk-input">{t('riskLabel')}</Label>
              <Input
                id="risk-input"
                value={protocolRisk}
                onChange={(e) => setProtocolRisk(e.target.value)}
                placeholder={t('riskPlaceholder')}
                required
              />
            </div>
            <Button type="submit" disabled={isGenerating || !protocolRisk.trim()}>
              {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              {t('generateButton')}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xl font-semibold mb-4">{t('historyTitle')}</h3>
        {isLoadingProtocols ? (
            <div className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : protocols.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-4">
                {protocols.map((protocol) => (
                    <AccordionItem value={protocol.id} key={protocol.id} className="border rounded-lg bg-muted/30">
                       <div className="flex items-center justify-between p-4">
                            <AccordionTrigger className="flex-1 text-left hover:no-underline p-0">
                                <div>
                                    <h4 className="font-semibold">{protocol.title}</h4>
                                    <p className="text-xs text-muted-foreground mt-1">{formatDistanceToNow(new Date(protocol.createdAt), { addSuffix: true, locale: locale === 'es' ? es : undefined })}</p>
                                </div>
                            </AccordionTrigger>
                            <div className="flex items-center ml-2">
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-primary/70 hover:text-primary" onClick={() => handleDownloadProtocol(protocol, locale, t('beforeTitle'), t('duringTitle'), t('afterTitle'))}>
                                    <FileDown className="h-4 w-4"/>
                                </Button>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive/70 hover:text-destructive shrink-0" onClick={() => setProtocolToDelete(protocol.id)}>
                                    {deleteProtocolMutation.isPending && deleteProtocolMutation.variables === protocol.id ? <Loader2 className="h-4 w-4 animate-spin"/> : <Trash2 className="h-4 w-4" />}
                                </Button>
                            </div>
                       </div>
                        <AccordionContent className="px-4 pb-4 pt-0">
                            <div className="space-y-6 pt-4 border-t">
                                <div>
                                    <h5 className="font-semibold text-primary mb-2">{t('beforeTitle')}</h5>
                                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                        {protocol.beforeSteps.map((step, i) => <li key={i}>{step.text}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-primary mb-2">{t('duringTitle')}</h5>
                                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                        {protocol.duringSteps.map((step, i) => <li key={i}>{step.text}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-primary mb-2">{t('afterTitle')}</h5>
                                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                        {protocol.afterSteps.map((step, i) => <li key={i}>{step.text}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
          ) : (
             <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h4 className="mt-4 text-lg font-semibold">{t('noHistory')}</h4>
              </div>
          )
        }
      </div>
       <AlertDialog open={!!protocolToDelete} onOpenChange={() => setProtocolToDelete(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Protocol</AlertDialogTitle>
                    <AlertDialogDescription>Are you sure you want to delete this action protocol? This action is permanent.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setProtocolToDelete(null)}>{tRelations('cancel')}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteProtocol} className="bg-destructive text-destructive-foreground hover:bg-destructive/90" disabled={deleteProtocolMutation.isPending}>
                        {deleteProtocolMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
};

export default ProtocolGeneratorTab;
