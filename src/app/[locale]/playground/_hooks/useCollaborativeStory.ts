

'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { CollaborativeStoryDTO } from '@/modules/collaborative-story/application/dtos/collaborative-story.dto';
import { TestDTO } from '@/modules/test/application/dtos/test.dto';

export type TestType = 'multiple-choice' | 'true-false' | 'open-ended' | 'mixed';
export type ChapterLength = 'short' | 'medium' | 'long';

export function useCollaborativeStory() {
    const tToast = useScopedI18n('toasts');
    const tPlayground = useScopedI18n('playground');
    const locale = useCurrentLocale();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const [activeStory, setActiveStory] = useState<CollaborativeStoryDTO | null>(null);
    const [characters, setCharacters] = useState('');
    const [setting, setSetting] = useState('');
    const [chapterLength, setChapterLength] = useState<ChapterLength>('short');
    const [allowDialogues, setAllowDialogues] = useState(false);
    const [studentContribution, setStudentContribution] = useState('');
    const [currentContributions, setCurrentContributions] = useState<string[]>([]);
    const [storyToDelete, setStoryToDelete] = useState<string | null>(null);
    const [isGeneratingTest, setIsGeneratingTest] = useState(false);
    const [generatedTest, setGeneratedTest] = useState<TestDTO | null>(null);
    const [isTestModalOpen, setIsTestModalOpen] = useState(false);
    const [testType, setTestType] = useState<TestType>('multiple-choice');
    const [illustratingChapter, setIllustratingChapter] = useState<number | null>(null);
    const [playingChapterIndex, setPlayingChapterIndex] = useState<number | null>(null);
    const [narratorVoice, setNarratorVoice] = useState('Algenib');
    const [customPrompt, setCustomPrompt] = useState('');
    const [negativePrompt, setNegativePrompt] = useState('');


    const { data: stories = [], isLoading: isLoadingStories, refetch: refetchStories } = useQuery<CollaborativeStoryDTO[]>({
        queryKey: ['collaborativeStories'],
        queryFn: () => fetch('/api/games/collaborative-story').then(res => res.json()),
    });

    // When the active story is updated (e.g., by a query invalidation after audio generation),
    // update the local state to reflect the new data.
    useEffect(() => {
        if (activeStory) {
            const updatedStory = stories.find(s => s.id === activeStory.id);
            if (updatedStory) {
                // If a new audio URL has arrived, we might want to automatically play it or update UI
                setActiveStory(updatedStory);
            }
        }
    }, [stories, activeStory]);

    const storyMutation = useMutation({
        mutationFn: (data: any) =>
            fetch('/api/games/collaborative-story', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }).then(res => {
                if (!res.ok) throw new Error('Failed to update story');
                return res.json();
            }),
        onSuccess: (data: CollaborativeStoryDTO) => {
            queryClient.invalidateQueries({ queryKey: ['collaborativeStories'] });
            setActiveStory(data);
            setCurrentContributions([]);
            if (!characters) setCharacters(data.characters.join(', '));
            if (!setting) setSetting(data.setting);
        },
        onError: () => toast({ title: tToast('aiError'), variant: 'destructive' }),
    });
    
    const storyStartersMutation = useMutation({
        mutationFn: () => fetch('/api/games/story-starters', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ language: locale }),
        }).then(res => {
            if (!res.ok) throw new Error('Failed to get story starters');
            return res.json();
        }),
        onSuccess: (data) => {
            setCharacters(data.characters);
            setSetting(data.setting);
            toast({ title: tPlayground('collaborativeStory.suggestions.toastSuccess') });
        },
        onError: () => toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' }),
    });

    const contributionSuggestionMutation = useMutation({
        mutationFn: () => {
            if (!activeStory) return Promise.reject('No active story');
            return fetch('/api/games/story-contribution-suggestion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    characters: activeStory.characters,
                    setting: activeStory.setting,
                    previousChapters: activeStory.chapters.map(c => c.text),
                    currentContributions,
                    language: locale,
                }),
            }).then(res => {
                if (!res.ok) throw new Error('Failed to get contribution suggestion');
                return res.json();
            });
        },
        onSuccess: (data) => {
            setStudentContribution(data.suggestion);
            toast({ title: tPlayground('collaborativeStory.suggestions.toastSuccess') });
        },
        onError: () => toast({ title: tToast('aiSuggestionFailed'), variant: 'destructive' }),
    });

    const deleteStoryMutation = useMutation({
        mutationFn: (id: string) => fetch(`/api/games/collaborative-story/${id}`, { method: 'DELETE' }),
        onSuccess: (data, deletedId) => {
            queryClient.invalidateQueries({ queryKey: ['collaborativeStories'] });
            toast({ title: tPlayground('collaborativeStory.toastDeleted') });
            setStoryToDelete(null);
            if (activeStory?.id === deletedId) {
                handleNewStory();
            }
        },
        onError: () => {
            toast({ title: tPlayground('collaborativeStory.toastDeleteFailed'), variant: 'destructive' });
            setStoryToDelete(null);
        }
    });

    const generateTestMutation = useMutation({
        mutationFn: () => {
            if (!activeStory) return Promise.reject("No active story");
            return fetch('/api/tests/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    story: activeStory,
                    testType: testType,
                    language: locale,
                })
            }).then(res => {
                if (!res.ok) throw new Error("Failed to generate test");
                return res.json();
            });
        },
        onSuccess: (data: TestDTO) => {
            setGeneratedTest(data);
            setIsTestModalOpen(true);
            queryClient.invalidateQueries({ queryKey: ['tests'] }); // Invalidate tests list
        },
        onError: () => toast({ title: tPlayground('collaborativeStory.test.generateError'), variant: 'destructive' }),
        onSettled: () => setIsGeneratingTest(false)
    });

    const illustrationMutation = useMutation({
        mutationFn: async ({ chapterIndex, prompt }: { chapterIndex: number, prompt: string }) => {
            if (!activeStory) throw new Error("No active story");
            const res = await fetch('/api/games/story-illustration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, language: locale })
            });
            if (!res.ok) throw new Error('Failed to generate illustration');
            const data = await res.json();
            
            const updateRes = await fetch(`/api/games/collaborative-story/${activeStory.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chapterIndex, illustration: data.imageUrl })
            });
            if (!updateRes.ok) throw new Error('Failed to save illustration');
            return updateRes.json();
        },
        onSuccess: (data: CollaborativeStoryDTO) => {
            queryClient.invalidateQueries({ queryKey: ['collaborativeStories'] });
            setActiveStory(data);
        },
        onError: () => toast({ title: tToast('aiError'), variant: 'destructive' }),
        onSettled: () => setIllustratingChapter(null)
    });
    
    const narrateFullStoryMutation = useMutation({
        mutationFn: (storyId: string) => fetch(`/api/games/collaborative-story/${storyId}/narrate`, {
            method: 'POST'
        }).then(res => {
            if (!res.ok) throw new Error('Failed to generate full story audio');
            return res.json();
        }),
        onSuccess: (data: CollaborativeStoryDTO) => {
            queryClient.invalidateQueries({ queryKey: ['collaborativeStories'] });
            setActiveStory(data);
            toast({ title: tPlayground('collaborativeStory.toastNarrationSuccess') });
        },
        onError: () => {
            toast({ title: tToast('aiError'), variant: 'destructive' });
        }
    });

    const handleStartStory = () => {
        storyMutation.mutate({
            characters: characters.split(',').map(c => c.trim()).filter(Boolean),
            setting,
            language: locale,
            chapterLength,
            allowDialogues,
            customPrompt,
            negativePrompt,
            narratorVoice
        });
    };

    const handleContinueStory = () => {
        if (!activeStory) return;
        storyMutation.mutate({
            storyId: activeStory.id,
            studentContributions: currentContributions,
        });
    };

    const handleAddContribution = () => {
        if (studentContribution.trim()) {
            setCurrentContributions([...currentContributions, studentContribution.trim()]);
            setStudentContribution('');
        }
    };
    
    const handleRemoveContribution = (indexToRemove: number) => {
        setCurrentContributions(currentContributions.filter((_, index) => index !== indexToRemove));
    }
    
    const handleNewStory = () => {
        setActiveStory(null);
        setCharacters('');
        setSetting('');
        setCurrentContributions([]);
        setStudentContribution('');
        setAllowDialogues(false);
    }
    
    const handleFinishStory = () => {
      if (!activeStory) return;
      storyMutation.mutate({
          storyId: activeStory.id,
          finishStory: true,
      });
    }
  
    const handleGenerateTest = () => {
      setIsGeneratingTest(true);
      generateTestMutation.mutate();
    }
    
    const handleGenerateIllustration = (chapterIndex: number) => {
        if (!activeStory) return;
        const chapter = activeStory.chapters[chapterIndex];
        if (!chapter) return;
        setIllustratingChapter(chapterIndex);
        illustrationMutation.mutate({ chapterIndex, prompt: chapter.text });
    }

    const handlePlayChapter = (chapterIndex: number) => {
        if (playingChapterIndex === chapterIndex) {
            setPlayingChapterIndex(null); // Toggle off if already playing
        } else {
            setPlayingChapterIndex(chapterIndex);
        }
    }
    
    return {
        activeStory, setActiveStory,
        characters, setCharacters,
        setting, setSetting,
        chapterLength, setChapterLength,
        allowDialogues, setAllowDialogues,
        studentContribution, setStudentContribution,
        currentContributions,
        storyToDelete, setStoryToDelete,
        isGeneratingTest,
        generatedTest,
        isTestModalOpen, setIsTestModalOpen,
        testType, setTestType,
        stories, isLoadingStories,
        storyMutation,
        storyStartersMutation,
        contributionSuggestionMutation,
        deleteStoryMutation,
        generateTestMutation,
        illustrationMutation,
        narrateFullStoryMutation,
        handleStartStory,
        handleContinueStory,
        handleAddContribution,
        handleRemoveContribution,
        handleNewStory,
        handleFinishStory,
        handleGenerateTest,
        handleGenerateIllustration,
        illustratingChapter,
        handlePlayChapter,
        playingChapterIndex,
        narratorVoice,
        setNarratorVoice,
        customPrompt,
        setCustomPrompt,
        negativePrompt,
        setNegativePrompt,
    };
}

    