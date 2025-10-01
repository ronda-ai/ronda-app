
'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
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
  LogOut,
  Wrench,
  Languages,
  Swords,
  FlaskConical,
  Server,
  Loader2,
  Search,
  MessageCircleHeart,
  Network,
  ShieldAlert,
  Accessibility,
  ZoomIn,
  ZoomOut,
  RefreshCcw,
  Sun,
  Moon,
  Eye,
  Annoyed,
  GraduationCap
} from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import Link from 'next/link';
import AddStudentButton from '@/components/AddStudentButton';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter, usePathname } from 'next/navigation';
import { ScrollArea } from './ui/scroll-area';
import { useStudentData } from '@/app/[locale]/_hooks/useStudentData';
import Image from 'next/image';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { CommandPalette } from './CommandPalette';
import GlobalLoader from './GlobalLoader';
import { useAccessibilityStore } from '@/stores/accessibility.store';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Switch } from './ui/switch';
import { Label } from './ui/label';


interface DashboardLayoutProps {
    children: ReactNode;
    sidebarContent?: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, sidebarContent }) => {
    const t = useScopedI18n('home');
    const tNav = useScopedI18n('nav');
    const tAccessibility = useScopedI18n('nav.accessibility');
    const logout = useAuthStore(state => state.logout);
    const router = useRouter();
    const pathname = usePathname();
    const { addStudent, isLoadingStudents } = useStudentData();
    const locale = useCurrentLocale();
    const { 
        fontSize, increaseFontSize, decreaseFontSize, resetFontSize,
        isMotionReduced, toggleMotionReduced,
    } = useAccessibilityStore();
    
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);


    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await fetch('/api/auth/logout', {method: 'POST'});
            logout();
            router.push(`/${locale}/login`);
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setIsLoggingOut(false);
            setIsLogoutDialogOpen(false);
        }
    };

    const navLinks = {
        main: [
            { href: '/', label: tNav('main.dashboard'), icon: Home },
        ],
        classroomManagement: [
            { href: '/evaluations', label: tNav('classroomManagement.evaluations'), icon: ClipboardCheck },
            { href: '/observations', label: tNav('classroomManagement.observations'), icon: FileText },
            { href: '/attendance', label: tNav('classroomManagement.attendance'), icon: CheckCircle },
            { href: '/classroom', label: tNav('classroomManagement.classroom'), icon: Users },
        ],
        pedagogicalTools: [
            { href: '/coach', label: tNav('pedagogicalTools.coach'), icon: BrainCircuit },
            { href: '/coach/relationship-dynamics', label: tNav('pedagogicalTools.relationshipLab'), icon: FlaskConical },
            { href: '/pbl', label: tNav('pedagogicalTools.pbl'), icon: Network },
            { href: '/safety-lab', label: tNav('pedagogicalTools.safetyLab'), icon: ShieldAlert },
            { href: '/teacher-lab', label: tNav('pedagogicalTools.teacherLab'), icon: Annoyed },
            { href: '/language-support', label: tNav('pedagogicalTools.languageSupport'), icon: Languages },
            { href: '/digital-conviviality', label: tNav('pedagogicalTools.digitalConviviality'), icon: MessageCircleHeart },
        ],
        generators: [
            { href: '/activity-generator', label: tNav('generators.activityGenerator'), icon: Lightbulb },
            { href: '/individual-activities', label: tNav('generators.individualActivities'), icon: User },
            { href: '/group-activities', label: tNav('generators.groupActivities'), icon: Users },
            { href: '/tests', label: tNav('generators.tests'), icon: FileText },
            { href: '/tools', label: tNav('generators.tools'), icon: Wrench },
            { href: '/playground', label: tNav('generators.playground'), icon: Swords },
        ],
        dataManagement: [
            { href: '/analytics', label: tNav('dataManagement.analytics'), icon: BarChart },
            { href: '/export', label: tNav('dataManagement.export'), icon: Download },
            { href: '/instance-status', label: tNav('dataManagement.instanceStatus'), icon: Server },
        ]
    };
    
    const pageTitles: {[key: string]: string} = {
        '/': 'Ronda AI',
        '/evaluations': tNav('classroomManagement.evaluations'),
        '/observations': tNav('classroomManagement.observations'),
        '/attendance': tNav('classroomManagement.attendance'),
        '/classroom': tNav('classroomManagement.classroom'),
        '/coach': tNav('pedagogicalTools.coach'),
        '/coach/relationship-dynamics': tNav('pedagogicalTools.relationshipLab'),
        '/pbl': tNav('pedagogicalTools.pbl'),
        '/safety-lab': tNav('pedagogicalTools.safetyLab'),
        '/teacher-lab': tNav('pedagogicalTools.teacherLab'),
        '/digital-conviviality': tNav('pedagogicalTools.digitalConviviality'),
        '/language-support': tNav('pedagogicalTools.languageSupport'),
        '/activity-generator': tNav('generators.activityGenerator'),
        '/individual-activities': tNav('generators.individualActivities'),
        '/group-activities': tNav('generators.groupActivities'),
        '/tests': tNav('generators.tests'),
        '/tools': tNav('generators.tools'),
        '/playground': tNav('generators.playground'),
        '/analytics': tNav('dataManagement.analytics'),
        '/export': tNav('dataManagement.export'),
        '/instance-status': tNav('dataManagement.instanceStatus'),
    };
    
    const pageTaglines: {[key: string]: string | undefined} = {
        '/': useScopedI18n('home')('tagline'),
        '/evaluations': useScopedI18n('evaluations')('tagline'),
        '/observations': useScopedI18n('observations')('tagline'),
        '/attendance': useScopedI18n('attendance')('tagline'),
        '/classroom': useScopedI18n('classroom')('tagline'),
        '/coach': useScopedI18n('coach')('tagline'),
        '/coach/relationship-dynamics': useScopedI18n('coach.relationshipLab')('tagline'),
        '/pbl': useScopedI18n('pbl')('tagline'),
        '/safety-lab': useScopedI18n('safetyLab')('tagline'),
        '/teacher-lab': useScopedI18n('teacherLab')('tagline'),
        '/digital-conviviality': useScopedI18n('playground.digitalConviviality')('description'),
        '/language-support': useScopedI18n('languageSupport')('tagline'),
        '/activity-generator': useScopedI18n('activityGenerator')('tagline'),
        '/individual-activities': useScopedI18n('individualActivities')('tagline'),
        '/group-activities': useScopedI18n('groupActivities')('tagline'),
        '/tests': useScopedI18n('tests')('tagline'),
        '/tools': useScopedI18n('tools')('tagline'),
        '/playground': useScopedI18n('playground')('tagline'),
        '/analytics': useScopedI18n('analytics')('tagline'),
        '/export': useScopedI18n('export')('tagline'),
        '/instance-status': useScopedI18n('instanceStatus')('tagline'),
    };

    const basePath = pathname.substring(pathname.indexOf('/', 1));
    const pageTitle = pageTitles[basePath] || 'Ronda AI';
    const pageTagline = pageTaglines[basePath] || '';

    const isActive = (href: string) => {
      if (href === '/coach') {
        return basePath === '/coach' || basePath.startsWith('/coach/');
      }
      return basePath === href;
    };

    const renderNavGroup = (links: { href: string; label: string; icon: React.ElementType }[]) => (
        links.map(({ href, label, icon: Icon }) => (
            <SidebarMenuItem key={href}>
                <SidebarMenuButton asChild variant={isActive(href) ? "outline" : "default"} className="w-full justify-start">
                    <Link href={`/${locale}${href}`}>
                        <Icon />
                        {label}
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        ))
    );

    return (
        <>
            <SidebarProvider>
                <Sidebar side="left" className="bg-card">
                    <SidebarHeader>
                        <div className="flex items-center justify-between p-2">
                            <Button variant="ghost" size="icon" onClick={() => setIsLogoutDialogOpen(true)}>
                                <LogOut />
                            </Button>
                        </div>
                        <div className="p-2">
                          <AddStudentButton onAddStudent={addStudent} />
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <ScrollArea className="h-full">
                            <SidebarMenu>
                                <SidebarGroup>
                                    <SidebarGroupContent>
                                        <SidebarMenu>{renderNavGroup(navLinks.main)}</SidebarMenu>
                                    </SidebarGroupContent>
                                </SidebarGroup>

                                <SidebarSeparator />

                                <SidebarGroup>
                                    <SidebarGroupLabel>{tNav('groups.classroomManagement')}</SidebarGroupLabel>
                                    <SidebarGroupContent>
                                        <SidebarMenu>{renderNavGroup(navLinks.classroomManagement)}</SidebarMenu>
                                    </SidebarGroupContent>
                                </SidebarGroup>

                                <SidebarSeparator />

                                <SidebarGroup>
                                    <SidebarGroupLabel>{tNav('groups.pedagogicalTools')}</SidebarGroupLabel>
                                    <SidebarGroupContent>
                                        <SidebarMenu>{renderNavGroup(navLinks.pedagogicalTools)}</SidebarMenu>
                                    </SidebarGroupContent>
                                </SidebarGroup>

                                 <SidebarSeparator />

                                <SidebarGroup>
                                    <SidebarGroupLabel>{tNav('groups.generators')}</SidebarGroupLabel>
                                    <SidebarGroupContent>
                                        <SidebarMenu>{renderNavGroup(navLinks.generators)}</SidebarMenu>
                                    </SidebarGroupContent>
                                </SidebarGroup>

                                <SidebarSeparator />

                                <SidebarGroup>
                                    <SidebarGroupLabel>{tNav('groups.dataManagement')}</SidebarGroupLabel>
                                    <SidebarGroupContent>
                                        <SidebarMenu>{renderNavGroup(navLinks.dataManagement)}</SidebarMenu>
                                    </SidebarGroupContent>
                                </SidebarGroup>
                                
                                <SidebarSeparator />
                            </SidebarMenu>
                            {sidebarContent && <div className="p-4 pt-4">{sidebarContent}</div>}
                        </ScrollArea>
                    </SidebarContent>
                    <SidebarFooter></SidebarFooter>
                </Sidebar>

                <SidebarInset>
                    <div className="flex flex-col h-screen">
                         {isLoadingStudents && <GlobalLoader />}
                        <header className="flex items-center justify-between p-4 border-b">
                            <div className="flex items-center gap-4">
                                <SidebarTrigger />
                                <h1 className="text-3xl font-bold font-headline text-primary">
                                    {pageTitle}
                                </h1>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="hidden text-muted-foreground md:block">
                                    {pageTagline}
                                </p>
                                <DropdownMenu>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline" size="icon">
                                                        <Accessibility className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{tAccessibility('title')}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <DropdownMenuContent align="end" className="w-64">
                                        <DropdownMenuLabel>{tAccessibility('title')}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="flex items-center justify-between" onSelect={(e) => e.preventDefault()}>
                                            <Label htmlFor="font-size-group" className="flex-1">{tAccessibility('fontSize')}</Label>
                                             <div id="font-size-group" className="flex items-center gap-1">
                                                <Button variant="ghost" size="icon" onClick={decreaseFontSize} disabled={fontSize <= 100}><ZoomOut/></Button>
                                                <span className="font-bold text-sm tabular-nums w-12 text-center">{fontSize}%</span>
                                                <Button variant="ghost" size="icon" onClick={increaseFontSize} disabled={fontSize >= 150}><ZoomIn/></Button>
                                            </div>
                                        </DropdownMenuItem>
                                         <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                            <Label htmlFor="reduce-motion-switch" className="flex items-center justify-between flex-1">
                                                {tAccessibility('reduceMotion')}
                                                <Switch id="reduce-motion-switch" checked={isMotionReduced} onCheckedChange={toggleMotionReduced} />
                                            </Label>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={resetFontSize}>
                                            <RefreshCcw className="mr-2 h-4 w-4" />
                                            <span>{tAccessibility('reset')}</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <Button variant="outline" size="icon" onClick={() => setIsCommandPaletteOpen(true)}>
                                    <Search className="h-4 w-4" />
                                </Button>
                                <LanguageSwitcher />
                            </div>
                        </header>
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
            <CommandPalette open={isCommandPaletteOpen} onOpenChange={setIsCommandPaletteOpen} />
            <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{useScopedI18n('logout')('title')}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {useScopedI18n('logout')('description')}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isLoggingOut}>{useScopedI18n('logout')('cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout} disabled={isLoggingOut} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                             {isLoggingOut ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {useScopedI18n('logout')('confirm')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default DashboardLayout;
    

    
