
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, FileCheck2 } from 'lucide-react';
import { useScopedI18n } from '@/locales/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePbl } from '../_hooks/usePbl';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { RubricCriterion } from '@/modules/rubric-suggestion/application/dtos/rubric-suggestion.dto';

interface ProjectEvaluatorProps {
    hooks: ReturnType<typeof usePbl>;
}

const ProjectEvaluator: React.FC<ProjectEvaluatorProps> = ({ hooks }) => {
    const tPbl = useScopedI18n('pbl');
    const tTools = useScopedI18n('tools');

    const {
        selectedProjectForEval,
        setSelectedProjectForEval,
        handlePhase4Submit,
        generateRubricMutation,
        projectOptions,
        generatedRubric,
    } = hooks;

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>{tPbl('phase4.title')}</CardTitle>
                        <CardDescription>{tPbl('phase4.description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handlePhase4Submit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="project-eval-select">{tPbl('phase2.selectProject')}</Label>
                                <Select onValueChange={setSelectedProjectForEval} value={selectedProjectForEval || ''}>
                                    <SelectTrigger id="project-eval-select">
                                        <SelectValue placeholder={tPbl('phase2.selectProjectPlaceholder')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {projectOptions.map(opt => (
                                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" className="w-full" disabled={!selectedProjectForEval || generateRubricMutation.isPending}>
                                {generateRubricMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <FileCheck2 className="mr-2 h-4 w-4"/>}
                                {tPbl('phase4.generateButton')}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <div>
               <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{tPbl('phase4.rubricTitle')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {generateRubricMutation.isPending ? (
                      <div className="space-y-4">
                        <Skeleton className="h-40 w-full" />
                      </div>
                    ) : generatedRubric ? (
                      <div className="space-y-4">
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
                              {generatedRubric.criteria.map((criterion: RubricCriterion, index: number) => (
                                  <TableRow key={index}>
                                      <TableCell className="font-semibold">{criterion.criterion}</TableCell>
                                      <TableCell>{criterion.excellent}</TableCell>
                                      <TableCell>{criterion.satisfactory}</TableCell>
                                      <TableCell>{criterion.needsImprovement}</TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                        <FileCheck2 className="mx-auto h-12 w-12 text-gray-400" />
                        <h4 className="mt-4 text-lg font-semibold">{tPbl('phase4.noRubric')}</h4>
                      </div>
                    )}
                  </CardContent>
               </Card>
            </div>
        </div>
    );
};

export default ProjectEvaluator;
