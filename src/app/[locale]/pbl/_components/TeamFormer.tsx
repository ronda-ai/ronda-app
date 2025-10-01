

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  Users,
  Trash2,
} from 'lucide-react';
import { useScopedI18n } from '@/locales/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePbl } from '../_hooks/usePbl';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface TeamFormerProps {
    hooks: ReturnType<typeof usePbl>;
}

const TeamFormer: React.FC<TeamFormerProps> = ({ hooks }) => {
    const tPbl = useScopedI18n('pbl');
    const tRelations = useScopedI18n('relations');

    const {
        selectedProjectId, setSelectedProjectId,
        teamSize, setTeamSize,
        groupingCriteria, setGroupingCriteria,
        generateTeamsMutation,
        handlePhase2Submit,
        teamFormations,
        isLoadingTeamFormations,
        projectOptions,
        teamFormationToDelete,
        setTeamFormationToDelete,
        deleteTeamFormationMutation,
    } = hooks;

    return (
        <>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>{tPbl('phase2.title')}</CardTitle>
                            <CardDescription>{tPbl('phase2.description')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handlePhase2Submit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="project-select">{tPbl('phase2.selectProject')}</Label>
                                    <Select onValueChange={setSelectedProjectId} value={selectedProjectId || ''}>
                                        <SelectTrigger id="project-select">
                                            <SelectValue placeholder={tPbl('phase2.selectProjectPlaceholder')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {projectOptions.map(opt => (
                                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="team-size">{tPbl('phase2.teamSize')}</Label>
                                        <Input id="team-size" type="number" min="2" value={teamSize} onChange={e => setTeamSize(Number(e.target.value))} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="grouping-criteria">{tPbl('phase2.groupingCriteria')}</Label>
                                        <Select value={groupingCriteria} onValueChange={(v) => setGroupingCriteria(v as any)}>
                                            <SelectTrigger id="grouping-criteria">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="balanced">{tPbl('phase2.criteria.balanced')}</SelectItem>
                                                <SelectItem value="social-remediation">{tPbl('phase2.criteria.social-remediation')}</SelectItem>
                                                <SelectItem value="synergy">{tPbl('phase2.criteria.synergy')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <Button type="submit" className="w-full" disabled={!selectedProjectId || generateTeamsMutation.isPending}>
                                    {generateTeamsMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Users className="mr-2 h-4 w-4"/>}
                                    {tPbl('phase2.generateButton')}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>{tPbl('phase2.results.title')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[calc(100vh-350px)] pr-4">
                                {isLoadingTeamFormations || generateTeamsMutation.isPending ? (
                                    <div className="space-y-4">
                                        <Skeleton className="h-24 w-full" />
                                        <Skeleton className="h-24 w-full" />
                                    </div>
                                ) : teamFormations && teamFormations.length > 0 ? (
                                    <Accordion type="multiple" className="w-full space-y-4">
                                        {teamFormations.map((formation, fIndex) => (
                                            <AccordionItem value={`formation-${fIndex}`} key={formation.id}>
                                                <div className="flex items-center">
                                                    <AccordionTrigger className="hover:no-underline flex-1">
                                                        <span className="font-semibold">{tPbl('phase2.results.formation')} {fIndex + 1}</span>
                                                    </AccordionTrigger>
                                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive/70 hover:text-destructive shrink-0" onClick={(e) => {e.stopPropagation(); setTeamFormationToDelete(formation.id)}}>
                                                        {deleteTeamFormationMutation.isPending && deleteTeamFormationMutation.variables === formation.id ? <Loader2 className="h-4 w-4 animate-spin"/> : <Trash2 className="h-4 w-4"/>}
                                                    </Button>
                                                </div>
                                                <AccordionContent>
                                                    {formation.teams.map((team, tIndex) => (
                                                        <div key={tIndex} className="mt-4 border p-4 rounded-md bg-background">
                                                            <h4 className="font-bold text-primary">{team.teamName}</h4>
                                                            <p className="text-xs italic text-muted-foreground mt-1 mb-3">{team.rationale}</p>
                                                            <table className="w-full text-sm">
                                                                <thead className="text-left">
                                                                    <tr className="border-b">
                                                                        <th className="p-2">{tPbl('phase2.table.student')}</th>
                                                                        <th className="p-2">{tPbl('phase2.table.suggestedRole')}</th>
                                                                        <th className="p-2">{tPbl('phase2.table.justification')}</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {team.members.map((member, mIndex) => (
                                                                        <tr key={mIndex} className="border-b">
                                                                            <td className="p-2 font-medium">{member.name}</td>
                                                                            <td className="p-2 text-primary">{member.role}</td>
                                                                            <td className="p-2 text-muted-foreground">{member.justification}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    ))}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground border-2 border-dashed rounded-lg p-12">
                                        <Users className="mx-auto h-12 w-12 text-gray-400" />
                                        <h4 className="mt-4 text-lg font-semibold">{tPbl('phase2.noProjectSelected')}</h4>
                                    </div>
                                )}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </div>
             <AlertDialog open={!!teamFormationToDelete} onOpenChange={() => setTeamFormationToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{tPbl('phase2.results.deleteDialog.title')}</AlertDialogTitle>
                        <AlertDialogDescription>{tPbl('phase2.results.deleteDialog.description')}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setTeamFormationToDelete(null)}>{tRelations('cancel')}</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {if (teamFormationToDelete) deleteTeamFormationMutation.mutate(teamFormationToDelete)}}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            disabled={deleteTeamFormationMutation.isPending}
                        >
                            {deleteTeamFormationMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                            {tRelations('save')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default TeamFormer;
