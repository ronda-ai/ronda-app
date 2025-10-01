

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { useScopedI18n } from '@/locales/client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ManualGroupActivityDTO } from '@/modules/manual-group-activity/application/dtos/manual-group-activity.dto';
import { FileDown, Trash2, Loader2 } from 'lucide-react';

interface GroupActivityDetailsDialogProps {
  group: ManualGroupActivityDTO | null;
  onClose: () => void;
  onDownload: (group: ManualGroupActivityDTO) => void;
  onDelete: (groupId: string) => void;
  isDeleting: boolean;
}

const GroupActivityDetailsDialog: React.FC<GroupActivityDetailsDialogProps> = ({
  group,
  onClose,
  onDownload,
  onDelete,
  isDeleting,
}) => {
  const tGroupActivity = useScopedI18n('groupActivities');
  const tModalities = useScopedI18n('activityGenerator.modalities');
  const tCommon = useScopedI18n('common');

  if (!group || !group.activities || group.activities.length === 0) {
    return null;
  }

  const members = group.members.map(m => m.name).join(', ');

  return (
    <Dialog open={!!group} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{tGroupActivity('details.title')}</DialogTitle>
          <DialogDescription>{tGroupActivity('details.description', { members })}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] my-4 pr-4">
          <div className="space-y-4">
            {group.activities.map((activity, index) => (
              <Card key={index} className="overflow-hidden bg-background">
                <CardHeader className="flex-row items-center justify-between p-4 bg-muted/50 border-b">
                  <CardTitle className="text-lg">{activity.title}</CardTitle>
                  <Badge variant="outline">{tModalities(activity.modality as any)}</Badge>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter className="sm:justify-between">
            <Button variant="destructive" onClick={() => onDelete(group.id)} disabled={isDeleting}>
              {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Trash2 className="mr-2 h-4 w-4"/>}
              {tGroupActivity('details.deleteButton')}
            </Button>
            <div className='flex gap-2'>
              <Button variant="outline" onClick={() => onDownload(group)}>
                  <FileDown className="mr-2 h-4 w-4"/>
                  {tCommon('download')}
              </Button>
              <Button onClick={onClose}>{tCommon('close')}</Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GroupActivityDetailsDialog;
