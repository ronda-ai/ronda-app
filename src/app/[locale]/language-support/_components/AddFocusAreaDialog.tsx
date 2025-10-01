
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
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface AddFocusAreaDialogProps {
    isOpen: boolean;
    onClose: () => void;
    existingFocusAreas: string[];
}

const AddFocusAreaDialog: React.FC<AddFocusAreaDialogProps> = ({ isOpen, onClose, existingFocusAreas }) => {
    const t = useScopedI18n('languageSupport.addFocusAreaDialog');
    const tCommon = useScopedI18n('common');
    const locale = useCurrentLocale();
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [selectedAreas, setSelectedAreas] = useState<Set<string>>(new Set());
    const [customPrompt, setCustomPrompt] = useState('');
    const [manualArea, setManualArea] = useState('');
    const [cooldown, setCooldown] = useState(0);

    const suggestionMutation = useMutation({
        mutationFn: (areasToAvoid: string[]) => 
            fetch('/api/focus-areas/suggest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    existingFocusAreas: areasToAvoid,
                    language: locale,
                    customPrompt: customPrompt
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
    
    const addFocusAreasMutation = useMutation({
        mutationFn: (areasToAdd: string[]) =>
            fetch('/api/focus-areas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ names: areasToAdd }),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['focusAreas'] });
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
            setSelectedAreas(new Set());
            setCustomPrompt('');
            setManualArea('');
            setCooldown(0);
            suggestionMutation.mutate(existingFocusAreas || []);
        }
    }, [isOpen]);

    const handleSelectArea = (area: string) => {
        setSelectedAreas(prev => {
            const newSelection = new Set(prev);
            if (newSelection.has(area)) {
                newSelection.delete(area);
            } else {
                newSelection.add(area);
            }
            return newSelection;
        })
    }

    const handleConfirm = () => {
        if (selectedAreas.size > 0) {
            addFocusAreasMutation.mutate(Array.from(selectedAreas));
        }
    }
    
    const handleRefresh = () => {
        if (cooldown === 0) {
            const areasToAvoid = [...(existingFocusAreas || []), ...suggestions];
            suggestionMutation.mutate(areasToAvoid);
        }
    }
    
    const handleAddManualArea = () => {
        const areaToAdd = manualArea.trim();
        if (areaToAdd && !selectedAreas.has(areaToAdd)) {
            handleSelectArea(areaToAdd);
            setManualArea('');
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
                        <Label htmlFor="custom-prompt-focus-area">{t('customPromptLabel')}</Label>
                        <div className="flex gap-2">
                            <Input
                                id="custom-prompt-focus-area"
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
                        <Label htmlFor="manual-area">{t('manualAreaLabel')}</Label>
                        <div className="flex gap-2">
                            <Input
                                id="manual-area"
                                value={manualArea}
                                onChange={(e) => setManualArea(e.target.value)}
                                placeholder={t('manualAreaPlaceholder')}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddManualArea(); } }}
                            />
                            <Button variant="outline" size="icon" type="button" onClick={handleAddManualArea}>
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
                                 {suggestions.map(area => (
                                    <div key={area} className="flex items-center space-x-3 p-2 border rounded-md has-[:checked]:bg-accent">
                                        <Checkbox 
                                            id={area}
                                            checked={selectedAreas.has(area)}
                                            onCheckedChange={() => handleSelectArea(area)}
                                        />
                                        <Label htmlFor={area} className="flex-1 cursor-pointer">{area}</Label>
                                    </div>
                                 ))}
                             </div>
                        ) : (
                            <p className="text-sm text-muted-foreground text-center py-4">{t('noSuggestions')}</p>
                        )}
                    </div>
                     {selectedAreas.size > 0 && (
                        <div className="space-y-2 pt-4 border-t">
                            <Label>{t('add')}</Label>
                            <div className="flex flex-wrap gap-2">
                                {Array.from(selectedAreas).map(area => (
                                    <Badge key={area} variant="secondary">
                                        {area}
                                        <button onClick={() => handleSelectArea(area)} className="ml-1.5 rounded-full hover:bg-black/10 p-0.5">
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
                    <Button onClick={handleConfirm} disabled={selectedAreas.size === 0 || addFocusAreasMutation.isPending}>
                        {addFocusAreasMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                        {t('addSelected')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddFocusAreaDialog;
