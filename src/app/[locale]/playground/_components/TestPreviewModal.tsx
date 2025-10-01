
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
import { Separator } from '@/components/ui/separator';
import ReactMarkdown from 'react-markdown';
import { useScopedI18n } from '@/locales/client';
import { TestDTO } from '@/modules/test/application/dtos/test.dto';
import { Badge } from '@/components/ui/badge';

interface TestPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  test: TestDTO | null;
}

const TestPreviewModal: React.FC<TestPreviewModalProps> = ({ isOpen, onClose, test }) => {
  const t = useScopedI18n('playground.collaborativeStory.test');
  const tCommon = useScopedI18n('common');

  const getRubricMarkdown = () => {
    if (!test || !test.rubric) return '';
    const criteriaTable = `### Criterios de Evaluación\n\n| Criterio | Excelente | Satisfactorio | Necesita Mejorar |\n| --- | --- | --- | --- |\n${test.rubric.criteria.map(c => `| **${c.criterion}** | ${c.excellent} | ${c.satisfactory} | ${c.needsImprovement} |`).join('\n')}`;
    return `${criteriaTable}\n\n${test.rubric.suggestedScoring}`;
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t('previewTitle')}</DialogTitle>
          <DialogDescription>{t('previewDescription')}</DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto p-1">
          {test ? (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">{test.title}</h2>
                {test.blocks.map(block => (
                    <div key={block.id}>
                        <h3 className="text-lg font-semibold mt-4 mb-2">{block.title}</h3>
                        <div className="space-y-4">
                            {block.questions.map((q, qIndex) => (
                                <div key={q.id} className="p-4 border rounded-md">
                                    <p className="font-medium">{qIndex + 1}. {q.text}</p>
                                    {block.type === 'multiple-choice' && q.options && (
                                        <div className="mt-2 space-y-1 pl-4">
                                            {q.options.map((opt, optIndex) => (
                                                <div key={optIndex} className="flex items-center text-sm text-muted-foreground">
                                                    <span>{String.fromCharCode(97 + optIndex)}) {opt.text}</span>
                                                    {q.answer === optIndex && <Badge variant="secondary" className='ml-2 bg-green-200 text-green-800'>Correct</Badge>}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                     {block.type === 'true-false' && (
                                        <div className="mt-2 pl-4">
                                            <Badge variant="secondary" className={q.answer ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}>
                                                {String(q.answer)}
                                            </Badge>
                                        </div>
                                    )}
                                    {block.type === 'open-ended' && (
                                        <div className="mt-2 pl-4 italic text-sm text-blue-600">
                                            <p><strong>Ideal Answer:</strong> {String(q.answer)}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <Separator className="my-4" />
                <div>
                    <h3 className="text-lg font-semibold mb-2">{t('rubricTitle')}</h3>
                    {test.rubric ? (
                        <div className="prose prose-sm max-w-none">
                            <ReactMarkdown>{getRubricMarkdown()}</ReactMarkdown>
                        </div>
                    ) : <p className="text-sm text-muted-foreground">No rubric generated for this test.</p>}
                </div>
            </div>
          ) : (
            <Skeleton className="h-64 w-full" />
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {tCommon('close')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TestPreviewModal;

    