
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  Trash2,
  Server,
  Database,
  File,
  AlertTriangle,
} from 'lucide-react';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import withAuth from '@/components/withAuth';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import DashboardLayout from '@/components/DashboardLayout';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useInstanceStatus } from './_hooks/useInstanceStatus';


function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


function InstanceStatusPage() {
  const t = useScopedI18n('instanceStatus');
  const tCommon = useScopedI18n('common');
  const locale = useCurrentLocale();

  const {
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
  } = useInstanceStatus();
  
  if (isError) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
            <p>{t('loadError')}</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Database className="text-primary"/>{t('storage.title')}</CardTitle>
                    <CardDescription>{t('storage.description')}</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                    {isLoading ? <Skeleton className="h-20 w-full" /> : (
                        <div className="flex items-center gap-4 p-4 border rounded-lg">
                            <Server className="h-8 w-8 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">{t('storage.totalSize')}</p>
                                <p className="text-2xl font-bold">{formatBytes(status?.totalSize || 0)}</p>
                            </div>
                        </div>
                    )}
                    {isLoading ? <Skeleton className="h-20 w-full" /> : (
                        <div className="flex items-center gap-4 p-4 border rounded-lg">
                            <File className="h-8 w-8 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">{t('storage.totalFiles')}</p>
                                <p className="text-2xl font-bold">{status?.totalFiles || 0}</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>{t('files.title')}</CardTitle>
                        <CardDescription>{t('files.description')}</CardDescription>
                    </div>
                    <Button variant="destructive" onClick={() => setIsCleanupDialogOpen(true)} disabled={cleanupFilesMutation.isPending || isLoading || !status?.files || status.files.length === 0}>
                        {cleanupFilesMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Trash2 className="mr-2 h-4 w-4"/>}
                        {t('files.cleanupButton')}
                    </Button>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[calc(100vh-500px)]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('files.filename')}</TableHead>
                                    <TableHead>{t('files.size')}</TableHead>
                                    <TableHead>{t('files.uploadDate')}</TableHead>
                                    <TableHead className="text-right">{t('files.actions')}</TableHead>
                                </TableRow>
                            </TableHeader>
                             <TableBody>
                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <TableRow key={i}>
                                            <TableCell><Skeleton className="h-5 w-48"/></TableCell>
                                            <TableCell><Skeleton className="h-5 w-20"/></TableCell>
                                            <TableCell><Skeleton className="h-5 w-32"/></TableCell>
                                            <TableCell className="text-right"><Skeleton className="h-8 w-8 inline-block"/></TableCell>
                                        </TableRow>
                                    ))
                                ) : status?.files && status.files.length > 0 ? (
                                    status.files.map(file => (
                                        <TableRow key={file.id}>
                                            <TableCell className="font-mono text-xs">{file.filename}</TableCell>
                                            <TableCell>{formatBytes(file.length)}</TableCell>
                                            <TableCell>{format(new Date(file.uploadDate), 'PPp', { locale: locale === 'es' ? es : enUS })}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" onClick={() => setFileToDelete(file)} disabled={deleteFileMutation.isPending}>
                                                    {deleteFileMutation.isPending && deleteFileMutation.variables === file.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 text-destructive" />}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center h-24">{t('files.noFiles')}</TableCell>
                                    </TableRow>
                                )}
                             </TableBody>
                        </Table>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
      </main>

       <AlertDialog open={isCleanupDialogOpen} onOpenChange={setIsCleanupDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2"><AlertTriangle className="text-destructive"/>{t('cleanupDialog.title')}</AlertDialogTitle>
                <AlertDialogDescription>{t('cleanupDialog.description')}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{tCommon('back')}</AlertDialogCancel>
                <AlertDialogAction onClick={handleCleanupFiles} className="bg-destructive hover:bg-destructive/90">
                    {t('cleanupDialog.confirm')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        <AlertDialog open={!!fileToDelete} onOpenChange={() => setFileToDelete(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('deleteDialog.title')}</AlertDialogTitle>
                <AlertDialogDescription>{t('deleteDialog.description', { filename: fileToDelete?.filename || ''})}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{tCommon('back')}</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteFile} className="bg-destructive hover:bg-destructive/90">
                    {t('deleteDialog.confirm')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </DashboardLayout>
  );
}

export default withAuth(InstanceStatusPage, ['teacher']);
