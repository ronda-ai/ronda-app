
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, User, Bot, Download, Send, FileDown } from 'lucide-react';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useTeacherLab } from '../_hooks/useTeacherLab';
import ReactMarkdown from 'react-markdown';
import { ScrollArea } from '@/components/ui/scroll-area';
import { encode } from 'html-entities';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';

interface ProfessionalDevelopmentTabProps {
    hooks: ReturnType<typeof useTeacherLab>;
}

const ProfessionalDevelopmentTab: React.FC<ProfessionalDevelopmentTabProps> = ({ hooks }) => {
    const t = useScopedI18n('teacherLab.reflectionAssistant');
    const tCommon = useScopedI18n('common');
    const tPlanning = useScopedI18n('teacherLab.planningCopilot');
    const tQuestions = useScopedI18n('teacherLab.questionAnalysis');
    const locale = useCurrentLocale();

    const {
        reflectionHistory,
        currentReflection,
        setCurrentReflection,
        generateReflectionGuidanceMutation,
        handleSendReflection,
        latestPedagogicalMenu,
        latestQuestionAnalysis,
        latestReflection,
        isLoadingLatestData,
    } = hooks;

    const isGenerating = generateReflectionGuidanceMutation.isPending;
    
    const handleDownload = (content: string, title: string) => {
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="${locale}">
        <head>
            <meta charset="UTF-8">
            <title>${encode(title)}</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
                h1, h2, h3 { color: #222; }
                h1 { font-size: 1.5rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem; margin-bottom: 1rem; }
                .message { margin-bottom: 1rem; padding: 1rem; border-radius: 8px; }
                .user-message { background-color: #e6e6fa; }
                .model-message { background-color: #f0f8ff; }
                hr { border: 0; border-top: 1px solid #eee; margin: 1rem 0; }
                .prose { max-width: 100%; }
            </style>
        </head>
        <body>
            <h1>${encode(title)}</h1>
            <p>Exported on: ${format(new Date(), 'PPP', { locale: locale === 'es' ? es : enUS })}</p>
            <hr />
            ${content}
        </body>
        </html>
        `;
        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title.replace(/\s+/g, '_')}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const getReflectionHtml = () => {
        return (latestReflection || []).map(msg => 
            `<div class="message ${msg.role === 'user' ? 'user-message' : 'model-message'}">
                <strong>${msg.role === 'user' ? 'Teacher' : 'AI Coach'}:</strong>
                <div>${msg.text.replace(/\n/g, '<br>')}</div>
            </div>`
        ).join('');
    };
    
    const getPlanningMenuHtml = () => {
        if (!latestPedagogicalMenu) return '';
        return latestPedagogicalMenu.approaches.map(a => `
            <h2>${encode(a.title)}</h2>
            <p><strong>${tPlanning('mbeJustification')}:</strong> ${encode(a.mbeJustification)}</p>
            <p><strong>${tPlanning('adaptationSuggestion')}:</strong> ${encode(a.adaptationSuggestion)}</p>
            <hr>
        `).join('');
    };

    const getQuestionAnalysisHtml = () => {
        if (!latestQuestionAnalysis) return '';
        const analysesHtml = latestQuestionAnalysis.analyses.map(a => `
            <div class="message">
                <p><strong>Q:</strong> ${encode(a.question)}</p>
                <p><strong>Bloom:</strong> ${encode(a.bloomLevel)}</p>
                <p><strong>Suggestion:</strong> ${encode(a.suggestion)}</p>
            </div>
        `).join('');
        return `<h2>${tQuestions('summaryTitle')}</h2><p>${encode(latestQuestionAnalysis.summary)}</p><hr>${analysesHtml}`;
    };


    return (
        <div className="grid md:grid-cols-2 gap-8">
             <div>
                <Card className="h-full flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary"/>{t('title')}</CardTitle>
                        <CardDescription>{t('description')}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                        <ScrollArea className="flex-grow -mx-6 px-6 border-y">
                            <div className="py-4 space-y-4">
                            {reflectionHistory.map((message, index) => (
                                <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                                    {message.role === 'model' && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                                    <div className={`p-3 rounded-lg max-w-[80%] ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                        <ReactMarkdown className="prose prose-sm max-w-none">{message.text}</ReactMarkdown>
                                    </div>
                                    {message.role === 'user' && <User className="h-6 w-6 text-muted-foreground flex-shrink-0" />}
                                </div>
                            ))}
                             {isGenerating && <div className="flex items-center gap-3"><Bot className="h-6 w-6 text-primary flex-shrink-0" /><Loader2 className="h-5 w-5 animate-spin"/></div>}
                            </div>
                        </ScrollArea>
                         <form onSubmit={handleSendReflection} className="mt-4 flex gap-2">
                            <Textarea
                                value={currentReflection}
                                onChange={(e) => setCurrentReflection(e.target.value)}
                                placeholder={t('placeholder')}
                                rows={2}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendReflection(e);
                                    }
                                }}
                            />
                            <Button type="submit" size="icon" disabled={isGenerating || !currentReflection.trim()}>
                                <Send />
                            </Button>
                        </form>
                    </CardContent>
                </Card>
             </div>

             <div>
                <Card>
                    <CardHeader>
                        <CardTitle>{useScopedI18n('teacherLab')('collaboration.title')}</CardTitle>
                         <CardDescription>{useScopedI18n('teacherLab')('collaboration.description')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {isLoadingLatestData ? (
                            <>
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </>
                        ) : (
                            <>
                                {latestPedagogicalMenu ? (
                                    <Button variant="outline" className="w-full" onClick={() => handleDownload(getPlanningMenuHtml(), tPlanning('menuTitle'))}>
                                        <FileDown className="mr-2 h-4 w-4"/> {t('exportPlanning')}
                                    </Button>
                                ) : null}
                                {latestQuestionAnalysis ? (
                                    <Button variant="outline" className="w-full" onClick={() => handleDownload(getQuestionAnalysisHtml(), tQuestions('resultsTitle'))}>
                                        <FileDown className="mr-2 h-4 w-4"/> {t('exportQuestions')}
                                    </Button>
                                ) : null}
                                {latestReflection && latestReflection.length > 0 ? (
                                    <Button variant="outline" className="w-full" onClick={() => handleDownload(getReflectionHtml(),t('title'))}>
                                        <FileDown className="mr-2 h-4 w-4"/> {t('exportReflection')}
                                    </Button>
                                ) : null}
                                
                                {!latestPedagogicalMenu && !latestQuestionAnalysis && (!latestReflection || latestReflection.length === 0) && (
                                    <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                                        <p className="text-sm">{t('noExports')}</p>
                                    </div>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>

        </div>
    );
};

export default ProfessionalDevelopmentTab;
