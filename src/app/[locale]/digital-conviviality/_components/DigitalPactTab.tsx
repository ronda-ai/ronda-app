
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  Sparkles,
  FileText,
  Trash2,
  Download,
  Upload,
  Save,
} from 'lucide-react';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useDigitalConviviality } from '../_hooks/useDigitalConviviality';
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
import { format } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { DigitalPactDTO } from '@/modules/digital-conviviality/application/dtos/digital-pact.dto';
import { encode } from 'html-entities';
import { Badge } from '@/components/ui/badge';

const DigitalPactTab: React.FC = () => {
  const t = useScopedI18n('playground.digitalConviviality.pact');
  const tRelations = useScopedI18n('relations');
  const locale = useCurrentLocale();

  const {
    studentCount,
    setStudentCount,
    mainConcerns,
    setMainConcerns,
    pactToDelete,
    setPactToDelete,
    pacts,
    isLoadingPacts,
    generatePactMutation,
    deletePactMutation,
    handleGeneratePact,
    updatePactMutation,
    publishPactMutation,
  } = useDigitalConviviality();

  const [editingPacts, setEditingPacts] = useState<Record<string, Partial<DigitalPactDTO>>>({});

  const isGenerating = generatePactMutation.isPending;

  const handleFieldChange = (id: string, field: 'principles' | 'norms' | 'consequences', value: string) => {
      const parseValue = (field: string, text: string) => {
          if (field === 'principles') {
              return text.split('\n').map(line => ({ title: line.split(':')[0]?.trim() || '', description: line.split(':')[1]?.trim() || '' }));
          }
          if (field === 'norms') {
              return text.split('\n').map(line => ({ principle: line.split(':')[0]?.trim() || '', norm: line.split(':')[1]?.trim() || '' }));
          }
           if (field === 'consequences') {
              return text.split('\n\n').map(block => {
                  const lines = block.split('\n');
                  const levelLine = lines[0] || '';
                  const actionLine = lines[1] || '';
                  const levelMatch = levelLine.match(/(\d+):\s*(.*)/);
                  const actionMatch = actionLine.match(/:\s*(.*)/);
                  return {
                      level: levelMatch ? parseInt(levelMatch[1], 10) : 0,
                      description: levelMatch ? levelMatch[2]?.trim() : '',
                      restorativeAction: actionMatch ? actionMatch[1]?.trim() : ''
                  };
              });
          }
          return [];
      };

      setEditingPacts(prev => ({
          ...prev,
          [id]: {
              ...prev[id],
              [field]: parseValue(field, value),
          }
      }));
  };

  const handleSave = (id: string) => {
      if (editingPacts[id]) {
          updatePactMutation.mutate({ id, data: editingPacts[id] });
      }
  };
  
  const formatForEditing = (field: 'principles' | 'norms' | 'consequences', data: any[]) => {
      if (field === 'principles') {
        return data.map(p => `${p.title}: ${p.description}`).join('\n');
      }
      if (field === 'norms') {
          return data.map(n => `${n.principle}: ${n.norm}`).join('\n');
      }
      if (field === 'consequences') {
          return data.sort((a,b) => a.level - b.level).map(c => `Nivel ${c.level}: ${c.description}\nAcción Restaurativa: ${c.restorativeAction}`).join('\n\n');
      }
      return '';
  };

  const handleDownloadPact = (pact: DigitalPactDTO) => {
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="${locale}">
        <head>
            <meta charset="UTF-8">
            <title>${encode(pact.title)}</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
                h1, h2, h3 { color: #222; }
                h1 { font-size: 2rem; text-align: center; border-bottom: 2px solid #eee; padding-bottom: 0.5rem; margin-bottom: 1.5rem; }
                h2 { font-size: 1.5rem; color: #333; margin-top: 2rem; border-bottom: 1px solid #ddd; padding-bottom: 0.3rem; }
                h3 { font-size: 1.2rem; color: #444; }
                ul { padding-left: 20px; }
                li { margin-bottom: 0.5rem; }
                .pact-meta { text-align: center; color: #777; margin-bottom: 2rem; font-size: 0.9rem; }
            </style>
        </head>
        <body>
            <h1>${encode(pact.title)}</h1>
            ${pact.publishedAt ? `<div class="pact-meta">Publicado el: ${format(new Date(pact.publishedAt), 'PPP', { locale: locale === 'es' ? es : enUS })} | Versión: ${pact.version}</div>` : ''}

            <h2>${t('history.principles')}</h2>
            ${pact.principles.map(p => `
                <div>
                    <h3>${encode(p.title)}</h3>
                    <p>${encode(p.description)}</p>
                </div>
            `).join('')}

            <h2>${t('history.norms')}</h2>
            <ul>
                ${pact.norms.map(n => `<li><strong>${encode(n.principle)}:</strong> ${encode(n.norm)}</li>`).join('')}
            </ul>

            <h2>${t('history.consequences')}</h2>
            <ul>
                ${pact.consequences.sort((a,b) => a.level - b.level).map(c => `
                    <li>
                        <strong>Nivel ${c.level}:</strong> ${encode(c.description)}<br>
                        <em><strong>Acción Restaurativa:</strong> ${encode(c.restorativeAction)}</em>
                    </li>
                `).join('')}
            </ul>
        </body>
        </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `pacto_digital.html`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText /> {t('title')}
                    </CardTitle>
                    <CardDescription>{t('description')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleGeneratePact} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="student-count">{t('studentCountLabel')}</Label>
                                <Input 
                                    id="student-count"
                                    type="number"
                                    value={studentCount}
                                    onChange={e => setStudentCount(Number(e.target.value))}
                                    min="1"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="main-concerns">{t('mainConcernsLabel')}</Label>
                                <Input 
                                    id="main-concerns"
                                    value={mainConcerns}
                                    onChange={e => setMainConcerns(e.target.value)}
                                    placeholder={t('mainConcernsPlaceholder')}
                                />
                            </div>
                        </div>
                        <Button type="submit" disabled={isGenerating || studentCount < 1}>
                            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            {t('button')}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="mt-8">
                <h3 className="text-2xl font-semibold tracking-tight mb-6">{t('history.title')}</h3>
                {isLoadingPacts ? (
                    <Skeleton className="h-96 w-full" />
                ) : pacts.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {pacts.map((item) => (
                           <AccordionItem value={item.id} key={item.id} className="border rounded-lg bg-muted/30">
                                <div className="flex justify-between items-center p-4">
                                     <AccordionTrigger className="flex-1 p-0 hover:no-underline text-left">
                                         <div>
                                            <p className="font-semibold text-lg text-foreground line-clamp-1">{item.title}</p>
                                            <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                                                <span>
                                                    {format(new Date(item.createdAt), 'PP', { locale: locale === 'es' ? es : enUS })}
                                                </span>
                                                {item.publishedAt && <Badge variant="secondary" className="ml-2">v{item.version}</Badge>}
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <div className="flex items-center gap-1">
                                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDownloadPact(item)}>
                                          <Download className="h-4 w-4 text-primary" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive/70 hover:text-destructive" onClick={(e) => {e.stopPropagation(); setPactToDelete(item.id)}}>
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <AccordionContent className="px-4 pb-4 pt-0">
                                     <div className="space-y-6 border-t pt-4">
                                        <div className="space-y-2">
                                            <Label htmlFor={`principles-${item.id}`}>{t('history.principles')}</Label>
                                            <Textarea id={`principles-${item.id}`} defaultValue={formatForEditing('principles', item.principles)} onChange={e => handleFieldChange(item.id, 'principles', e.target.value)} rows={4}/>
                                        </div>
                                         <div className="space-y-2">
                                            <Label htmlFor={`norms-${item.id}`}>{t('history.norms')}</Label>
                                            <Textarea id={`norms-${item.id}`} defaultValue={formatForEditing('norms', item.norms)} onChange={e => handleFieldChange(item.id, 'norms', e.target.value)} rows={6}/>
                                        </div>
                                         <div className="space-y-2">
                                            <Label htmlFor={`consequences-${item.id}`}>{t('history.consequences')}</Label>
                                            <Textarea id={`consequences-${item.id}`} defaultValue={formatForEditing('consequences', item.consequences)} onChange={e => handleFieldChange(item.id, 'consequences', e.target.value)} rows={8}/>
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" onClick={() => handleSave(item.id)} disabled={updatePactMutation.isPending && updatePactMutation.variables?.id === item.id}>
                                              {updatePactMutation.isPending && updatePactMutation.variables?.id === item.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Save className="mr-2 h-4 w-4"/>}
                                              {t('saveDraftButton')}
                                            </Button>
                                            <Button onClick={() => publishPactMutation.mutate(item.id)} disabled={publishPactMutation.isPending && publishPactMutation.variables === item.id}>
                                              {publishPactMutation.isPending && publishPactMutation.variables === item.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Upload className="mr-2 h-4 w-4"/>}
                                              {item.publishedAt ? t('republishButton') : t('publishButton')}
                                            </Button>
                                        </div>
                                        {item.publishedAt && <p className="text-xs text-muted-foreground text-right">{t('publishedAt', { date: format(new Date(item.publishedAt), 'PPp', { locale: locale === 'es' ? es : enUS }), version: item.version })}</p>}
                                     </div>
                                </AccordionContent>
                           </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                        <h4 className="mt-4 text-lg font-semibold">{t('noPacts.title')}</h4>
                        <p className="mt-2 text-sm">{t('noPacts.description')}</p>
                    </div>
                )}
            </div>
             <AlertDialog open={!!pactToDelete} onOpenChange={(open) => !open && setPactToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('deleteDialog.title')}</AlertDialogTitle>
                        <AlertDialogDescription>{t('deleteDialog.description')}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setPactToDelete(null)}>{tRelations('cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {if(pactToDelete) deletePactMutation.mutate(pactToDelete)}} disabled={deletePactMutation.isPending} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            {deletePactMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : t('deleteDialog.confirm')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default DigitalPactTab;
