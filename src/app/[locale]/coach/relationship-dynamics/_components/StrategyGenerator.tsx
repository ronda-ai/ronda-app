
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  Sparkles,
  Lightbulb,
} from 'lucide-react';
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
import Select from 'react-select';
import { Input } from '@/components/ui/input';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { UseMutationResult } from '@tanstack/react-query';
import SelectedStudentsProfile from './SelectedStudentsProfile';

interface StrategyGeneratorProps {
    isIndividualMode: boolean;
    isLoadingStudents: boolean;
    selectedStudents: StudentDTO[];
    setSelectedStudents: (students: StudentDTO[]) => void;
    studentOptions: { value: StudentDTO; label: string; }[];
    selectedStudentOptions: { value: StudentDTO; label: string; }[];
    focus: string;
    setFocus: (focus: string) => void;
    customPrompt: string;
    setCustomPrompt: (prompt: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    generateSuggestionMutation: UseMutationResult<any, Error, string, unknown>;
    generateMutation: UseMutationResult<any, Error, any, unknown>;
}

const StrategyGenerator: React.FC<StrategyGeneratorProps> = ({
    isIndividualMode,
    isLoadingStudents,
    selectedStudents,
    setSelectedStudents,
    studentOptions,
    selectedStudentOptions,
    focus,
    setFocus,
    customPrompt,
    setCustomPrompt,
    handleSubmit,
    generateSuggestionMutation,
    generateMutation,
}) => {
    const t = useScopedI18n('coach.relationshipLab');
    const locale = useCurrentLocale();

    const handleGenerateSuggestion = () => {
        generateSuggestionMutation.mutate(locale);
    }

    React.useEffect(() => {
        if(generateSuggestionMutation.data) {
            setFocus(generateSuggestionMutation.data.suggestedFocus);
            setCustomPrompt(generateSuggestionMutation.data.suggestedCustomPrompt);
        }
    }, [generateSuggestionMutation.data, setFocus, setCustomPrompt]);

    const title = isIndividualMode ? t('individual.form.title') : t('form.title');
    const description = isIndividualMode ? t('individual.form.description') : t('form.description');
    const placeholder = isIndividualMode ? t('individual.form.studentsPlaceholder') : t('form.studentsPlaceholder');
    const generateButtonText = isIndividualMode ? t('individual.form.generateButton') : t('form.generateButton');

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>{title}</CardTitle>
                                <CardDescription>{description}</CardDescription>
                            </div>
                            {!isIndividualMode && (
                                <Button type='button' variant="outline" size="sm" onClick={handleGenerateSuggestion} disabled={generateSuggestionMutation.isPending}>
                                    {generateSuggestionMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
                                    {t('suggestions.button')}
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        {isLoadingStudents ? <Skeleton className="h-48 w-full" /> : (
                        <div className="space-y-6">
                            <div className="space-y-2">
                            <Label htmlFor="student-select">{isIndividualMode ? placeholder : t('form.studentsLabel')}</Label>
                                <Select
                                    isMulti={!isIndividualMode}
                                    options={studentOptions}
                                    value={selectedStudentOptions}
                                    onChange={(selected: any) => setSelectedStudents(isIndividualMode ? (selected ? [selected.value] : []) : selected.map((s: any) => s.value))}
                                    placeholder={placeholder}
                                    isOptionDisabled={() => !isIndividualMode && selectedStudents.length >= 4}
                                    isClearable={isIndividualMode}
                                />
                            </div>
                            <div className="space-y-2">
                            <Label htmlFor="focus">{t('form.focusLabel')}</Label>
                            <Input
                                id="focus"
                                value={focus}
                                onChange={(e) => setFocus(e.target.value)}
                                placeholder={t('form.focusPlaceholder')}
                                required
                                disabled={selectedStudents.length === 0}
                            />
                            </div>
                            <div className="space-y-2">
                            <Label htmlFor="custom-prompt">{t('form.customPromptLabel')}</Label>
                            <Textarea
                                id="custom-prompt"
                                value={customPrompt}
                                onChange={(e) => setCustomPrompt(e.target.value)}
                                placeholder={t('form.customPromptPlaceholder')}
                                rows={3}
                                disabled={selectedStudents.length === 0}
                            />
                            </div>
                            <Button
                            type="submit"
                            className="w-full"
                            disabled={generateMutation.isPending || selectedStudents.length === 0 || !focus.trim()}
                            >
                            {generateMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            {generateButtonText}
                            </Button>
                        </div>
                        )}
                    </CardContent>
                    </Card>
                </div>
                <div className="space-y-6">
                    <SelectedStudentsProfile selectedStudents={selectedStudents} />
                </div>
            </div>
        </form>
    );
}

export default StrategyGenerator;
