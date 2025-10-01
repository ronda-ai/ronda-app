

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, ShieldQuestion, Trash2, FileDown, Expand } from 'lucide-react';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { useEducationalSafety } from '../_hooks/useEducationalSafety';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { formatDistanceToNow } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import RiskMapDetailsDialog from './RiskMapDetailsDialog';

interface RiskDiagnosticTabProps {
    hooks: ReturnType<typeof useEducationalSafety>;
}

const RiskDiagnosticTab: React.FC<RiskDiagnosticTabProps> = ({ hooks }) => {
  const t = useScopedI18n('safetyLab');
  const tRiskMap = useScopedI18n('safetyLab.riskMap');
  const locale = useCurrentLocale();
  
  const {
      locationContext, setLocationContext,
      infrastructureContext, setInfrastructureContext,
      socialContext, setSocialContext,
      analysisDepth, setAnalysisDepth,
      riskMaps, isLoadingRiskMaps,
      generateRiskMapMutation,
      handleGenerateRiskMap,
      deleteRiskMapMutation,
      handleDownloadRiskMap,
      viewingRiskMap,
      setViewingRiskMap,
  } = hooks;

  const renderRiskTable = (title: string, risks: { risk: string; priority: string; justification: string; }[]) => {
    if (!risks || risks.length === 0) return null;
    return (
      <div className="mt-4">
        <h4 className="font-semibold text-lg mb-2">{title}</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20%]">{tRiskMap('risk')}</TableHead>
              <TableHead className="w-[15%]">{tRiskMap('priority')}</TableHead>
              <TableHead>{tRiskMap('justification')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {risks.map((riskItem, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{riskItem.risk}</TableCell>
                <TableCell>{riskItem.priority}</TableCell>
                <TableCell>{riskItem.justification}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };


  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('diagnosis.title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerateRiskMap} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location-context">{t('form.locationLabel')}</Label>
                <Textarea
                  id="location-context"
                  value={locationContext}
                  onChange={(e) => setLocationContext(e.target.value)}
                  placeholder={t('form.locationPlaceholder')}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="infrastructure-context">{t('form.infrastructureLabel')}</Label>
                <Textarea
                  id="infrastructure-context"
                  value={infrastructureContext}
                  onChange={(e) => setInfrastructureContext(e.target.value)}
                  placeholder={t('form.infrastructurePlaceholder')}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social-context">{t('form.socialLabel')}</Label>
                <Textarea
                  id="social-context"
                  value={socialContext}
                  onChange={(e) => setSocialContext(e.target.value)}
                  placeholder={t('form.socialPlaceholder')}
                  rows={4}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                     <Label htmlFor="analysis-depth">{t('form.analysisDepthLabel')}</Label>
                    <Select value={analysisDepth} onValueChange={(v) => setAnalysisDepth(v as any)}>
                        <SelectTrigger id="analysis-depth">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="concise">{t('form.analysisDepth.concise')}</SelectItem>
                            <SelectItem value="moderate">{t('form.analysisDepth.moderate')}</SelectItem>
                            <SelectItem value="exhaustive">{t('form.analysisDepth.exhaustive')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="flex items-end">
                    <Button type="submit" disabled={generateRiskMapMutation.isPending || !locationContext.trim()} className="w-full">
                        {generateRiskMapMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        {t('form.generateButton')}
                    </Button>
                 </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div>
        <h3 className="text-xl font-semibold mb-4">{t('results.title')}</h3>
         <div className="mt-4 border rounded-lg p-4 bg-card">
          <ScrollArea className="h-96">
            {isLoadingRiskMaps ? (
              <div className="space-y-4 pr-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : riskMaps.length > 0 ? (
              <Accordion type="single" collapsible className="w-full space-y-4 pr-4">
                {riskMaps.map((map) => (
                  <AccordionItem key={map.id} value={map.id} className="border rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between p-4">
                        <AccordionTrigger className="flex-1 text-left hover:no-underline p-0">
                            <div>
                                <h4 className="font-semibold">{map.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1">{formatDistanceToNow(new Date(map.createdAt), { addSuffix: true, locale: locale === 'es' ? es : undefined })}</p>
                            </div>
                        </AccordionTrigger>
                        <div className="flex items-center ml-2">
                             <Button variant="ghost" size="icon" className="h-7 w-7 text-primary/70 hover:text-primary" onClick={() => setViewingRiskMap(map)}>
                                <Expand className="h-4 w-4"/>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-primary/70 hover:text-primary" onClick={() => handleDownloadRiskMap(map, locale, t('riskCategories.natural'), t('riskCategories.social'), t('riskCategories.infrastructure'), tRiskMap('risk'), tRiskMap('priority'), tRiskMap('justification'))}>
                                <FileDown className="h-4 w-4"/>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive/70 hover:text-destructive shrink-0" onClick={() => deleteRiskMapMutation.mutate(map.id)}>
                                {deleteRiskMapMutation.isPending && deleteRiskMapMutation.variables === map.id ? <Loader2 className="h-4 w-4 animate-spin"/> : <Trash2 className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                    <AccordionContent className="px-4 pb-4">
                        <div className="space-y-4 pt-4 border-t">
                            <p className="text-sm italic text-muted-foreground">{map.riskMap.introduction}</p>
                            {renderRiskTable(t('riskCategories.natural'), map.riskMap.naturalRisks)}
                            {renderRiskTable(t('riskCategories.social'), map.riskMap.socialRisks)}
                            {renderRiskTable(t('riskCategories.infrastructure'), map.riskMap.infrastructureRisks)}
                        </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-12">
                  <ShieldQuestion className="mx-auto h-12 w-12 text-gray-400" />
                  <h4 className="mt-4 text-lg font-semibold">{t('results.noResults.title')}</h4>
                  <p className="mt-2 text-sm">{t('results.noResults.description')}</p>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
       <RiskMapDetailsDialog
        riskMap={viewingRiskMap}
        isOpen={!!viewingRiskMap}
        onClose={() => setViewingRiskMap(null)}
      />
    </div>
  );
};

export default RiskDiagnosticTab;

