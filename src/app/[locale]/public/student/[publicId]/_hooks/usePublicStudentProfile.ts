
'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { Theme, themes } from '@/config/themes';

export function usePublicStudentProfile(publicId: string) {
  const [isThemeGalleryOpen, setIsThemeGalleryOpen] = useState(false);
  const [challengesCurrentPage, setChallengesCurrentPage] = useState(0);

  const { data: student, isLoading, error } = useQuery<StudentDTO>({
    queryKey: ['publicStudent', publicId],
    queryFn: () =>
      fetch(`/api/public/student/${publicId}`).then(res => {
        if (!res.ok) {
          throw new Error('Student not found or link expired');
        }
        return res.json();
      }),
    retry: false,
  });

  useEffect(() => {
    // Apply theme from student profile if it exists
    if (student?.publicTheme) {
      const root = document.documentElement;
      const selectedTheme = themes.find(t => t.name === student.publicTheme);
      if (selectedTheme) {
        root.style.setProperty('--primary', selectedTheme.primary);
        root.style.setProperty('--background', selectedTheme.background);
        root.style.setProperty('--accent', selectedTheme.accent);
      }
    }
  }, [student]);

  const handleThemeSelection = (theme: Theme) => {
    if (student) {
        const root = document.documentElement;
        root.style.setProperty('--primary', theme.primary);
        root.style.setProperty('--background', theme.background);
        root.style.setProperty('--accent', theme.accent);
        
        // Asynchronously save the theme preference
        fetch(`/api/public/student/${student.publicId}/theme`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ themeName: theme.name }),
        });
    }
    setIsThemeGalleryOpen(false);
  };

  return {
    student,
    isLoading,
    error,
    isThemeGalleryOpen,
    setIsThemeGalleryOpen,
    handleThemeSelection,
    challengesCurrentPage,
    setChallengesCurrentPage,
  };
}
