

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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TestPreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  test: TestDTO | null;
}

const TestPreviewDialog: React.FC<TestPreviewDialogProps> = ({ isOpen, onClose, test }) => {
  const tTests = useScopedI18n('tests');
  const tTools = useScopedI18n('tools');
  const tCommon = useScopedI18n('common');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{tTests('previewDialog.title')}</DialogTitle>
          <DialogDescription>{test?.title}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow my-4 pr-4">
          {test ? (
            <div className="space-y-6">
                <p className="text-sm text-muted-foreground">{tTests('previewDialog.basedOn')} "{test.storyTitle}"</p>
                {test.blocks.map(block => (
                    <div key={block.id}>
                        <h3 className="text-lg font-semibold mt-4 mb-2">{block.title}</h3>
                        <div className="space-y-4">
                            {block.questions.map((q, qIndex) => (
                                <div key={q.id} className="p-4 border rounded-md bg-muted/20">
                                    <p className="font-medium">{qIndex + 1}. {q.text}</p>
                                    {block.type === 'multiple-choice' && q.options && (
                                        <div className="mt-2 space-y-1 pl-4">
                                            {q.options.map((opt, optIndex) => (
                                                <p key={optIndex} className="text-sm text-muted-foreground">
                                                    {String.fromCharCode(97 + optIndex)}) {opt.text}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {test.rubric && (
                     <div>
                        <h3 className="text-lg font-semibold mt-4 mb-2">{tTests('rubricTitle')}</h3>
                        <div className="space-y-4 rounded-md border p-4">
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-1/4">{tTools('history.criterion')}</TableHead>
                                        <TableHead>{tTools('history.excellent')}</TableHead>
                                        <TableHead>{tTools('history.satisfactory')}</TableHead>
                                        <TableHead>{tTools('history.needsImprovement')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {test.rubric.criteria.map((criterion, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-semibold">{criterion.criterion}</TableCell>
                                            <TableCell>{criterion.excellent}</TableCell>
                                            <TableCell>{criterion.satisfactory}</TableCell>
                                            <TableCell>{criterion.needsImprovement}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {test.rubric.suggestedScoring && test.rubric.suggestedScoring.length > 0 && (
                                <>
                                    <Separator />
                                     <div>
                                        <h4 className="font-semibold mb-2">{tTools('history.scoringGuide')}</h4>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>{tTests('editor.blockTypes.title')}</TableHead>
                                                    <TableHead>{tTests('editor.points')}</TableHead>
                                                    <TableHead>{tTests('editor.description')}</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {test.rubric.suggestedScoring.map((scoring, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell className="font-medium">{scoring.section}</TableCell>
                                                        <TableCell>{scoring.points}</TableCell>
                                                        <TableCell>{scoring.description}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
          ) : (
            <Skeleton className="h-64 w-full" />
          )}
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {tCommon('close')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TestPreviewDialog;
