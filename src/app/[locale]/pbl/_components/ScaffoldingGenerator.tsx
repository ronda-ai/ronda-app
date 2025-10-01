

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  Lightbulb,
} from 'lucide-react';
import { useScopedI18n } from '@/locales/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import { Separator } from '@/components/ui/separator';
import { usePbl } from '../_hooks/usePbl';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ScaffoldingGeneratorProps {
    hooks: ReturnType<typeof usePbl>;
}

const ScaffoldingGenerator: React.FC<ScaffoldingGeneratorProps> = ({ hooks }) => {
    const tPbl = useScopedI18n('pbl');

    const {
        scaffoldingProblem, setScaffoldingProblem,
        scaffoldingSuggestion,
        generateScaffoldingMutation,
        handlePhase3Submit,
        teamOptions,
        handleTeamSelectionForScaffolding,
        scaffoldingTeamFormationId,
        scaffoldingTeamIndex,
    } = hooks;
    
    const selectedValue = (scaffoldingTeamFormationId && scaffoldingTeamIndex !== null) 
      ? `${scaffoldingTeamFormationId}::${scaffoldingTeamIndex}` 
      : "";

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>{tPbl('phase3.title')}</CardTitle>
                  <CardDescription>{tPbl('phase3.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePhase3Submit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="scaffolding-team-select">{tPbl('phase3.selectTeam')}</Label>
                       <Select onValueChange={handleTeamSelectionForScaffolding} value={selectedValue}>
                            <SelectTrigger id="scaffolding-team-select">
                                <SelectValue placeholder={tPbl('phase3.selectTeamPlaceholder')} />
                            </SelectTrigger>
                            <SelectContent>
                                {teamOptions.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scaffolding-problem">{tPbl('phase3.problemLabel')}</Label>
                      <Textarea
                        id="scaffolding-problem"
                        value={scaffoldingProblem}
                        onChange={(e) => setScaffoldingProblem(e.target.value)}
                        placeholder={tPbl('phase3.problemPlaceholder')}
                        required
                        rows={4}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={!selectedValue || !scaffoldingProblem.trim() || generateScaffoldingMutation.isPending}>
                      {generateScaffoldingMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Lightbulb className="mr-2 h-4 w-4"/>}
                      {tPbl('phase3.generateButton')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            <div>
               <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{tPbl('phase3.suggestionTitle')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {generateScaffoldingMutation.isPending ? (
                      <div className="space-y-4">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                      </div>
                    ) : scaffoldingSuggestion ? (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-primary mb-2">{tPbl('phase3.microActivity')}</h4>
                          <ReactMarkdown className="prose prose-sm max-w-none">{scaffoldingSuggestion.microActivity}</ReactMarkdown>
                        </div>
                        <Separator />
                        <div>
                          <h4 className="font-semibold text-primary mb-2">{tPbl('phase3.guidingQuestions')}</h4>
                          <ReactMarkdown className="prose prose-sm max-w-none">{scaffoldingSuggestion.guidingQuestions}</ReactMarkdown>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                        <Lightbulb className="mx-auto h-12 w-12 text-gray-400" />
                        <h4 className="mt-4 text-lg font-semibold">{tPbl('phase3.noSuggestion')}</h4>
                      </div>
                    )}
                  </CardContent>
               </Card>
            </div>
        </div>
    );
};

export default ScaffoldingGenerator;
