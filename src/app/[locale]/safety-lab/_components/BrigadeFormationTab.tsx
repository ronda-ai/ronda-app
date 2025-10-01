
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Group, Users } from 'lucide-react';
import { useScopedI18n } from '@/locales/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEducationalSafety } from '../_hooks/useEducationalSafety';

interface BrigadeFormationTabProps {
    hooks: ReturnType<typeof useEducationalSafety>;
}

const BrigadeFormationTab: React.FC<BrigadeFormationTabProps> = ({ hooks }) => {
    const t = useScopedI18n('safetyLab.brigadeFormation');
    const {
        brigadeObjective, setBrigadeObjective,
        brigadeCriteria, setBrigadeCriteria,
        generatedBrigade,
        generateBrigadeMutation,
        handleGenerateBrigade,
        createCommitteeMutation,
    } = hooks;

    const handleCreateBrigade = () => {
        if (!generatedBrigade) return;
        const members = generatedBrigade.brigade.members.map(m => ({
            studentId: m.studentId,
            role: m.role,
        }));
        createCommitteeMutation.mutate({
            name: generatedBrigade.brigade.name,
            members,
        })
    }

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>{t('title')}</CardTitle>
                        <CardDescription>{t('description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleGenerateBrigade} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="brigade-objective">{t('objectiveLabel')}</Label>
                                <Textarea
                                    id="brigade-objective"
                                    value={brigadeObjective}
                                    onChange={(e) => setBrigadeObjective(e.target.value)}
                                    placeholder={t('objectivePlaceholder')}
                                    required
                                    rows={3}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="brigade-criteria">{t('criteriaLabel')}</Label>
                                <Select value={brigadeCriteria} onValueChange={v => setBrigadeCriteria(v as any)}>
                                    <SelectTrigger id="brigade-criteria">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="calm-under-pressure">{t('criteria.calm')}</SelectItem>
                                        <SelectItem value="leadership-potential">{t('criteria.leadership')}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" className="w-full" disabled={!brigadeObjective.trim() || generateBrigadeMutation.isPending}>
                                {generateBrigadeMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4"/>}
                                {t('generateButton')}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <div>
               <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{t('suggestionTitle')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {generateBrigadeMutation.isPending ? (
                      <div className="space-y-4">
                        <Skeleton className="h-40 w-full" />
                      </div>
                    ) : generatedBrigade ? (
                      <div className="space-y-4">
                        <h3 className="font-bold text-xl text-primary">{generatedBrigade.brigade.name}</h3>
                        <p className="text-sm italic text-muted-foreground">{generatedBrigade.brigade.rationale}</p>
                        <table className="w-full text-sm">
                            <thead className="text-left">
                                <tr className="border-b">
                                    <th className="p-2">{t('table.student')}</th>
                                    <th className="p-2">{t('table.role')}</th>
                                    <th className="p-2">{t('table.justification')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {generatedBrigade.brigade.members.map((member, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-2 font-medium">{member.studentName}</td>
                                        <td className="p-2 text-primary">{member.role}</td>
                                        <td className="p-2 text-muted-foreground">{member.justification}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Button className="w-full mt-4" onClick={handleCreateBrigade} disabled={createCommitteeMutation.isPending}>
                            {createCommitteeMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Users className="mr-2 h-4 w-4" />}
                            {t('createBrigadeButton')}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                        <Group className="mx-auto h-12 w-12 text-gray-400" />
                        <h4 className="mt-4 text-lg font-semibold">{t('noSuggestion')}</h4>
                      </div>
                    )}
                  </CardContent>
               </Card>
            </div>
        </div>
    );
};

export default BrigadeFormationTab;
