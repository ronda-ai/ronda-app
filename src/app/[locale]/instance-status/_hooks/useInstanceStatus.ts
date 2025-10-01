
'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useScopedI18n } from '@/locales/client';

export interface InstanceFile {
    id: string;
    filename: string;
    length: number;
    uploadDate: string;
}

export interface InstanceStatus {
    totalSize: number;
    totalFiles: number;
    files: InstanceFile[];
}

export function useInstanceStatus() {
  const { toast } = useToast();
  const t = useScopedI18n('instanceStatus');
  const queryClient = useQueryClient();
  const [isCleanupDialogOpen, setIsCleanupDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<InstanceFile | null>(null);

  const { data: status, isLoading, isError } = useQuery<InstanceStatus>({
    queryKey: ['instanceStatus'],
    queryFn: () => fetch('/api/instance/status').then(res => res.json()),
  });

  const deleteFileMutation = useMutation({
    mutationFn: (fileId: string) => fetch(`/api/instance/files/${fileId}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instanceStatus'] });
      toast({ title: t('toastDeleteSuccess') });
      setFileToDelete(null);
    },
    onError: () => {
      toast({ title: t('toastDeleteError'), variant: 'destructive' });
      setFileToDelete(null);
    }
  });

  const cleanupFilesMutation = useMutation({
    mutationFn: () => fetch('/api/instance/cleanup', { method: 'POST' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instanceStatus'] });
      toast({ title: t('toastCleanupSuccess') });
      setIsCleanupDialogOpen(false);
    },
    onError: () => {
      toast({ title: t('toastCleanupError'), variant: 'destructive' });
      setIsCleanupDialogOpen(false);
    }
  });

  const handleDeleteFile = () => {
    if (fileToDelete) {
      deleteFileMutation.mutate(fileToDelete.id);
    }
  };

  const handleCleanupFiles = () => {
    cleanupFilesMutation.mutate();
  };


  return {
    status,
    isLoading,
    isError,
    deleteFileMutation,
    cleanupFilesMutation,
    isCleanupDialogOpen,
    setIsCleanupDialogOpen,
    fileToDelete,
    setFileToDelete,
    handleDeleteFile,
    handleCleanupFiles,
  };
}
