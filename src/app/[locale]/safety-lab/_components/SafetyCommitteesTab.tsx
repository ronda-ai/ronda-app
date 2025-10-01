
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  Trash2,
  UserPlus,
  Users,
  Sparkles,
  CheckCircle,
  Circle,
} from 'lucide-react';
import { useScopedI18n } from '@/locales/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEducationalSafety } from '../_hooks/useEducationalSafety';
import { Skeleton } from '@/components/ui/skeleton';
import Select from 'react-select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { Textarea } from '@/components/ui/textarea';

interface SafetyCommitteesTabProps {
    hooks: ReturnType<typeof useEducationalSafety>;
}

const SafetyCommitteesTab: React.FC<SafetyCommitteesTabProps> = ({ hooks }) => {
    const t = useScopedI18n('safetyLab.committees');
    const {
        students,
        newCommitteeName, setNewCommitteeName,
        committees, isLoadingCommittees,
        createCommitteeMutation,
        handleCreateCommittee,
        deleteCommitteeMutation,
        addMemberMutation,
        removeMemberMutation,
        suggestRoleMutation,
        addMissionMutation,
        toggleMissionStatusMutation,
    } = hooks;

    const [committeeToDelete, setCommitteeToDelete] = React.useState<string | null>(null);
    const [newMissions, setNewMissions] = React.useState<Record<string, string>>({});
    const [suggestingFor, setSuggestingFor] = React.useState<{committeeId: string, studentId: string} | null>(null);

    const studentOptions = students.map(s => ({ value: s.id, label: s.name }));

    const handleAddMember = (committeeId: string, studentOption: {value: string, label: string} | null) => {
        if (studentOption) {
            setSuggestingFor({ committeeId, studentId: studentOption.value });
            suggestRoleMutation.mutate({ committeeId, studentId: studentOption.value });
        }
    }
    
    React.useEffect(() => {
        if (suggestRoleMutation.isSuccess && suggestRoleMutation.data && suggestingFor) {
            const { role } = suggestRoleMutation.data;
            addMemberMutation.mutate({ committeeId: suggestingFor.committeeId, studentId: suggestingFor.studentId, role });
            setSuggestingFor(null);
        }
    }, [suggestRoleMutation.isSuccess, suggestRoleMutation.data, suggestingFor, addMemberMutation]);


    const handleRemoveMember = (committeeId: string, studentId: string) => {
        removeMemberMutation.mutate({ committeeId, studentId });
    }

    const handleAddMission = (committeeId: string) => {
        const missionText = newMissions[committeeId];
        if (missionText && missionText.trim()) {
            addMissionMutation.mutate({ committeeId, missionText: missionText.trim() });
            setNewMissions(prev => ({...prev, [committeeId]: ''}));
        }
    }

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>{t('createTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCreateCommittee} className="flex items-end gap-4">
                        <div className="flex-grow space-y-2">
                            <Label htmlFor="committee-name">{t('nameLabel')}</Label>
                            <Input
                                id="committee-name"
                                value={newCommitteeName}
                                onChange={e => setNewCommitteeName(e.target.value)}
                                placeholder={t('namePlaceholder')}
                            />
                        </div>
                        <Button type="submit" disabled={createCommitteeMutation.isPending || !newCommitteeName.trim()}>
                            {createCommitteeMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <UserPlus className="mr-2 h-4 w-4" />}
                            {t('createButton')}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoadingCommittees ? (
                    Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-96 w-full" />)
                ) : committees.length > 0 ? (
                    committees.map(committee => (
                        <Card key={committee.id} className="flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle>{committee.name}</CardTitle>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive/70 hover:text-destructive shrink-0" onClick={() => setCommitteeToDelete(committee.id)}>
                                        <Trash2 className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow space-y-4">
                                <div>
                                    <Label>{t('members')}</Label>
                                    <div className="space-y-2 mt-2">
                                        {committee.members.map(member => (
                                            <div key={member.student.id} className="flex items-center justify-between p-2 rounded-md bg-muted">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarFallback>{member.student.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="text-sm font-medium">{member.student.name}</p>
                                                        <p className="text-xs text-muted-foreground">{member.role}</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveMember(committee.id, member.student.id)}>
                                                    <Trash2 className="h-3 w-3 text-muted-foreground"/>
                                                </Button>
                                            </div>
                                        ))}
                                        {(addMemberMutation.isPending && addMemberMutation.variables?.committeeId === committee.id) || (suggestingFor?.committeeId === committee.id) && (
                                            <div className="flex items-center gap-2 p-2">
                                                <Skeleton className="h-6 w-6 rounded-full" />
                                                <Skeleton className="h-4 w-24" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>{t('addMember')}</Label>
                                    <Select
                                        options={studentOptions.filter(opt => !committee.members.some(m => m.student.id === opt.value))}
                                        onChange={(opt) => handleAddMember(committee.id, opt as any)}
                                        placeholder={t('selectStudentPlaceholder')}
                                        isClearable
                                        value={null}
                                        isDisabled={addMemberMutation.isPending || suggestRoleMutation.isPending}
                                    />
                                </div>
                                <div className="space-y-2 border-t pt-4">
                                     <Label>{t('missions.title')}</Label>
                                     <div className="space-y-2">
                                        {(committee.missions || []).map((mission, index) => (
                                            <div key={index} className="flex items-center gap-2 p-2 rounded-md border bg-background">
                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toggleMissionStatusMutation.mutate({ committeeId: committee.id, missionIndex: index, newStatus: mission.status === 'completed' ? 'pending' : 'completed'})}>
                                                    {mission.status === 'completed' ? <CheckCircle className="h-4 w-4 text-green-500"/> : <Circle className="h-4 w-4 text-muted-foreground"/>}
                                                </Button>
                                                <p className="text-sm flex-1">{mission.text}</p>
                                            </div>
                                        ))}
                                     </div>
                                     <div className="flex items-center gap-2">
                                        <Textarea 
                                            placeholder={t('missions.addPlaceholder')}
                                            rows={1}
                                            value={newMissions[committee.id] || ''}
                                            onChange={e => setNewMissions(prev => ({...prev, [committee.id]: e.target.value}))}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleAddMission(committee.id);
                                                }
                                            }}
                                        />
                                        <Button size="sm" onClick={() => handleAddMission(committee.id)} disabled={addMissionMutation.isPending}>
                                            {t('missions.addButton')}
                                        </Button>
                                     </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 border-2 border-dashed rounded-lg">
                        <Users className="mx-auto h-12 w-12 text-gray-400" />
                        <h4 className="mt-4 text-lg font-semibold text-muted-foreground">{t('noCommittees')}</h4>
                    </div>
                )}
            </div>

            <AlertDialog open={!!committeeToDelete} onOpenChange={() => setCommitteeToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('deleteDialog.title')}</AlertDialogTitle>
                        <AlertDialogDescription>{t('deleteDialog.description')}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                            if (committeeToDelete) {
                                deleteCommitteeMutation.mutate(committeeToDelete);
                                setCommitteeToDelete(null);
                            }
                        }} className="bg-destructive hover:bg-destructive/90">
                           {deleteCommitteeMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                           Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default SafetyCommitteesTab;
