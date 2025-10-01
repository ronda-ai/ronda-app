
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, PlusCircle, RotateCw, X } from 'lucide-react';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Skeleton } from './ui/skeleton';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface AddSkillDialogProps {
    isOpen: boolean;
    onClose: () => void;
    existingSkills: string[];
}

const AddSkillDialog: React.FC<AddSkillDialogProps> = ({ isOpen, onClose, existingSkills }) => {
    const t = useScopedI18n('activityGenerator.addSkillDialog');
    const tCommon = useScopedI18n('common');
    const locale = useCurrentLocale();
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());
    const [customPrompt, setCustomPrompt] = useState('');
    const [manualSkill, setManualSkill] = useState('');
    const [cooldown, setCooldown] = useState(0);

    const suggestionMutation = useMutation({
        mutationFn: (prompt?: string) => 
            fetch('/api/skills/suggest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    existingSkills,
                    language: locale,
                    customPrompt: prompt
                }),
            }).then(res => {
                if (!res.ok) throw new Error("Failed to fetch suggestions");
                return res.json();
            }),
        onSuccess: (data) => {
            setSuggestions(data.suggestions);
            setCooldown(5); // Start 5 second cooldown
        },
        onError: () => {
            toast({ title: "Failed to get AI suggestions", variant: 'destructive' });
        }
    });
    
    const addSkillsMutation = useMutation({
        mutationFn: (skillsToAdd: string[]) =>
            fetch('/api/skills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ names: skillsToAdd }),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['skills'] });
            toast({ title: t('toastSuccess') });
            onClose();
        },
        onError: () => {
             toast({ title: t('toastError'), variant: 'destructive' });
        }
    });
    
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (cooldown > 0) {
            timer = setTimeout(() => setCooldown(prev => prev - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [cooldown]);

    useEffect(() => {
        if (isOpen) {
            setSuggestions([]);
            setSelectedSkills(new Set());
            setCustomPrompt('');
            setManualSkill('');
            setCooldown(0);
            suggestionMutation.mutate(undefined);
        }
    }, [isOpen]);

    const handleSelectSkill = (skill: string) => {
        setSelectedSkills(prev => {
            const newSelection = new Set(prev);
            if (newSelection.has(skill)) {
                newSelection.delete(skill);
            } else {
                newSelection.add(skill);
            }
            return newSelection;
        })
    }

    const handleConfirm = () => {
        if (selectedSkills.size > 0) {
            addSkillsMutation.mutate(Array.from(selectedSkills));
        }
    }
    
    const handleRefresh = () => {
        if (cooldown === 0) {
            suggestionMutation.mutate(customPrompt);
        }
    }
    
    const handleAddManualSkill = () => {
        const skillToAdd = manualSkill.trim();
        if (skillToAdd && !selectedSkills.has(skillToAdd)) {
            handleSelectSkill(skillToAdd);
            setManualSkill('');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{t('title')}</DialogTitle>
                    <DialogDescription>{t('description')}</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    <div className="space-y-2">
                        <Label htmlFor="custom-prompt-skill">{t('customPromptLabel')}</Label>
                        <div className="flex gap-2">
                            <Input
                                id="custom-prompt-skill"
                                value={customPrompt}
                                onChange={(e) => setCustomPrompt(e.target.value)}
                                placeholder={t('customPromptPlaceholder')}
                            />
                            <Button variant="outline" size="icon" onClick={handleRefresh} disabled={cooldown > 0 || suggestionMutation.isPending}>
                                {suggestionMutation.isPending && cooldown === 0 ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCw className="h-4 w-4" />}
                                <span className="sr-only">Refresh</span>
                            </Button>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="manual-skill">{t('manualSkillLabel')}</Label>
                        <div className="flex gap-2">
                            <Input
                                id="manual-skill"
                                value={manualSkill}
                                onChange={(e) => setManualSkill(e.target.value)}
                                placeholder={t('manualSkillPlaceholder')}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddManualSkill(); } }}
                            />
                            <Button variant="outline" size="icon" type="button" onClick={handleAddManualSkill}>
                                <PlusCircle className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <Separator />
                    
                    <div className="space-y-2">
                         {suggestionMutation.isPending && suggestions.length === 0 ? (
                            <div className='space-y-2'>
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-8 w-full" />
                            </div>
                        ) : suggestions.length > 0 ? (
                             <div className="space-y-2">
                                 {suggestions.map(skill => (
                                    <div key={skill} className="flex items-center space-x-3 p-2 border rounded-md has-[:checked]:bg-accent">
                                        <Checkbox 
                                            id={skill}
                                            checked={selectedSkills.has(skill)}
                                            onCheckedChange={() => handleSelectSkill(skill)}
                                        />
                                        <Label htmlFor={skill} className="flex-1 cursor-pointer">{skill}</Label>
                                    </div>
                                 ))}
                             </div>
                        ) : (
                            <p className="text-sm text-muted-foreground text-center py-4">{t('noSuggestions')}</p>
                        )}
                    </div>
                     {selectedSkills.size > 0 && (
                        <div className="space-y-2 pt-4 border-t">
                            <Label>Skills to add:</Label>
                            <div className="flex flex-wrap gap-2">
                                {Array.from(selectedSkills).map(skill => (
                                    <Badge key={skill} variant="secondary">
                                        {skill}
                                        <button onClick={() => handleSelectSkill(skill)} className="ml-1.5 rounded-full hover:bg-black/10 p-0.5">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={onClose}>{tCommon('back')}</Button>
                    <Button onClick={handleConfirm} disabled={selectedSkills.size === 0 || addSkillsMutation.isPending}>
                        {addSkillsMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                        {t('addSelected')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddSkillDialog;
