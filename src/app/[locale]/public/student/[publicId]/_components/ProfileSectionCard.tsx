
'use client';

import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfileSectionCardProps {
  icon: React.ElementType;
  title: string;
  children: ReactNode;
}

const ProfileSectionCard: React.FC<ProfileSectionCardProps> = ({ icon: Icon, title, children }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <Icon className="text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
};

export default ProfileSectionCard;
