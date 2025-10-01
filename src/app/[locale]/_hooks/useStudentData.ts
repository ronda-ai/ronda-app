
'use client';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateStudentDTO } from "@/modules/student/application/dtos/create-student.dto";
import { UpdateStudentDTO } from "@/modules/student/application/dtos/update-student.dto";
import { StudentDTO } from "@/modules/student/application/dtos/student.dto";

export function useStudentData() {
    const queryClient = useQueryClient();

    const { data: students = [], isLoading: isLoadingStudents } = useQuery<StudentDTO[]>({
        queryKey: ['students'],
        queryFn: () => fetch('/api/students').then(res => res.json()),
        initialData: [],
    });

    const addStudentMutation = useMutation({
        mutationFn: (newStudent: CreateStudentDTO) =>
            fetch('/api/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newStudent),
            }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
    });

    const updateStudentMutation = useMutation<StudentDTO | null, Error, { id: string; data: UpdateStudentDTO }>({
        mutationFn: ({ id, data }: { id: string; data: UpdateStudentDTO }) =>
            fetch(`/api/students/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }).then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] });
            queryClient.invalidateQueries({ queryKey: ['qualitiesSuggestions'] });
        },
    });

    const removeStudentMutation = useMutation({
        mutationFn: (id: string) => fetch(`/api/students/${id}`, { method: 'DELETE' }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
    });

    const updateParticipationMutation = useMutation({
        mutationFn: ({ id, change }: { id: string; change: 1 | -1 }) =>
            fetch(`/api/students/${id}/participation`, {
                method: change === 1 ? 'POST' : 'DELETE',
            }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
    });
    
    const handleAddStudent = async (studentData: CreateStudentDTO) => {
        await addStudentMutation.mutateAsync(studentData);
    };

    return {
        students,
        isLoadingStudents,
        addStudent: handleAddStudent,
        updateStudentMutation,
        removeStudent: removeStudentMutation.mutate,
        updateParticipation: updateParticipationMutation,
    };
}
