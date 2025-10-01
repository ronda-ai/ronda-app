

'use client';

import * as React from 'react';
import {
  Home,
  ClipboardCheck,
  BrainCircuit,
  FileText,
  CheckCircle,
  BarChart,
  Download,
  Lightbulb,
  Users,
  User,
  Wrench,
  Languages,
  Swords,
  FlaskConical,
  Server,
  Palette,
  FileCheck2,
  MessageCircleHeart,
  Network,
  ShieldAlert,
  GraduationCap
} from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import { useRouter } from 'next/navigation';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { DialogTitle } from './ui/dialog';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const locale = useCurrentLocale();
  const tNav = useScopedI18n('nav');
  const tTools = useScopedI18n('tools');

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);
  
  const runCommand = (command: () => unknown) => {
    onOpenChange(false);
    command();
  };

  const navLinks = [
    {
        group: tNav('groups.classroomManagement'),
        items: [
            { href: '/', label: tNav('main.dashboard'), icon: Home },
            { href: '/evaluations', label: tNav('classroomManagement.evaluations'), icon: ClipboardCheck },
            { href: '/observations', label: tNav('classroomManagement.observations'), icon: FileText },
            { href: '/attendance', label: tNav('classroomManagement.attendance'), icon: CheckCircle },
            { href: '/classroom', label: tNav('classroomManagement.classroom'), icon: Users },
        ]
    },
    {
        group: tNav('groups.pedagogicalTools'),
        items: [
            { href: '/coach', label: tNav('pedagogicalTools.coach'), icon: BrainCircuit },
            { href: '/coach/relationship-dynamics', label: tNav('pedagogicalTools.relationshipLab'), icon: FlaskConical },
            { href: '/pbl', label: tNav('pedagogicalTools.pbl'), icon: Network },
            { href: '/safety-lab', label: tNav('pedagogicalTools.safetyLab'), icon: ShieldAlert },
            { href: '/teacher-lab', label: tNav('pedagogicalTools.teacherLab'), icon: GraduationCap },
            { href: '/language-support', label: tNav('pedagogicalTools.languageSupport'), icon: Languages },
            { href: '/digital-conviviality', label: tNav('pedagogicalTools.digitalConviviality'), icon: MessageCircleHeart },
        ]
    },
    {
        group: tNav('groups.generators'),
        items: [
            { href: '/activity-generator', label: tNav('generators.activityGenerator'), icon: Lightbulb },
            { href: '/individual-activities', label: tNav('generators.individualActivities'), icon: User },
            { href: '/group-activities', label: tNav('generators.groupActivities'), icon: Users },
            { href: '/tests', label: tNav('generators.tests'), icon: FileText },
            { href: '/tools', label: tNav('generators.tools'), icon: Wrench },
            { href: '/playground', label: tNav('generators.playground'), icon: Swords },
        ]
    },
    {
        group: tTools('title'),
        items: [
             { href: '/tools?tab=adapter', label: tTools('activityAdapter.title'), icon: Palette },
             { href: '/tools?tab=rubric', label: tTools('rubricGenerator.title'), icon: FileCheck2 },
        ]
    },
    {
        group: tNav('groups.dataManagement'),
        items: [
            { href: '/analytics', label: tNav('dataManagement.analytics'), icon: BarChart },
            { href: '/export', label: tNav('dataManagement.export'), icon: Download },
            { href: '/instance-status', label: tNav('dataManagement.instanceStatus'), icon: Server },
        ]
    }
  ];

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
        <VisuallyHidden asChild>
            <DialogTitle>Command Palette</DialogTitle>
        </VisuallyHidden>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {navLinks.map((group) => (
            <CommandGroup key={group.group} heading={group.group}>
                {group.items.map(({ href, label, icon: Icon }) => (
                    <CommandItem
                        key={href}
                        value={`${group.group} ${label}`}
                        onSelect={() => runCommand(() => router.push(`/${locale}${href}`))}
                    >
                        <Icon className="mr-2 h-4 w-4" />
                        <span>{label}</span>
                    </CommandItem>
                ))}
            </CommandGroup>
        ))}
        <CommandSeparator />
      </CommandList>
    </CommandDialog>
  );
}
