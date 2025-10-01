
'use client';

import React from 'react';
import {
  UserCheck,
  UserX,
  Clock,
  FileCheck,
  Save,
  Loader2,
} from 'lucide-react';
import {useScopedI18n, useCurrentLocale} from '@/locales/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {Skeleton} from '@/components/ui/skeleton';
import {format} from 'date-fns';
import {enUS, es} from 'date-fns/locale';
import {Calendar, DayContentProps} from '@/components/ui/calendar';
import {
  AttendanceStatus,
} from '@/modules/attendance/application/dtos/attendance.dto';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {cn} from '@/lib/utils';
import withAuth from '@/components/withAuth';
import DashboardLayout from '@/components/DashboardLayout';
import { useAttendance, AttendanceByDate } from './_hooks/useAttendance';
import { Badge } from '@/components/ui/badge';
import { useStudentData } from '../_hooks/useStudentData';
import { Button } from '@/components/ui/button';


const statusMap: {
  [key in AttendanceStatus]: {
    icon: React.ElementType;
    color: string;
    labelKey: string;
  };
} = {
  present: {icon: UserCheck, color: 'text-green-600', labelKey: 'present'},
  absent: {icon: UserX, color: 'text-red-600', labelKey: 'absent'},
  late: {icon: Clock, color: 'text-yellow-600', labelKey: 'late'},
  justified: {
    icon: FileCheck,
    color: 'text-blue-600',
    labelKey: 'justified',
  },
};

const CustomDay: React.FC<DayContentProps & { attendanceByDate: AttendanceByDate }> = ({ attendanceByDate, ...props }) => {
    const dateKey = format(props.date, 'yyyy-MM-dd');
    const dayData = attendanceByDate[dateKey];
    return (
      <div className="relative h-full w-full flex items-center justify-center">
        <span>{props.date.getDate()}</span>
        {dayData && dayData.present > 0 && (
          <Badge
            variant="secondary"
            className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs bg-green-200 text-green-800"
          >
            {dayData.present}
          </Badge>
        )}
      </div>
    );
};


function AttendancePage() {
  const tAttendance = useScopedI18n('attendance');
  const tAttendanceStatus = useScopedI18n('attendance.status');
  const locale = useCurrentLocale();
  
  const { students, isLoadingStudents } = useStudentData();

  const {
      selectedDate,
      setSelectedDate,
      currentMonth,
      setCurrentMonth,
      isLoadingDailyAttendance,
      handleStatusChange,
      localAttendance,
      attendanceByDate,
      handleSaveAll,
      isSaving,
  } = useAttendance(students, locale);

  return (
    <DashboardLayout>
      <main className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-8 grid md:grid-cols-2 gap-8">
          <div className="flex justify-center items-start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="rounded-md border"
              locale={locale === 'es' ? es : enUS}
              components={{DayContent: (props) => <CustomDay {...props} attendanceByDate={attendanceByDate} />}}
            />
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate
                    ? tAttendance('attendanceFor', {
                        date: format(selectedDate, 'PPP', {
                          locale: locale === 'es' ? es : enUS,
                        }),
                      })
                    : tAttendance('selectDate')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoadingStudents ||
                (isLoadingDailyAttendance && !!selectedDate) ? (
                  <div className="space-y-3">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : students.length > 0 && selectedDate ? (
                  students.map(student => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-accent"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>
                            {student.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{student.name}</span>
                      </div>
                      <Select
                        value={localAttendance[student.id] || 'present'}
                        onValueChange={(status: AttendanceStatus) =>
                          handleStatusChange(student.id, status)
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(statusMap).map(key => {
                            const status = key as AttendanceStatus;
                            const Icon = statusMap[status].icon;
                            return (
                              <SelectItem key={status} value={status}>
                                <div className="flex items-center gap-2">
                                  <Icon
                                    className={cn(
                                      'h-4 w-4',
                                      statusMap[status].color
                                    )}
                                  />
                                  <span>
                                    {tAttendanceStatus(
                                      statusMap[status].labelKey as any
                                    )}
                                  </span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    {selectedDate
                      ? tAttendance('noStudents')
                      : tAttendance('selectDate')}
                  </p>
                )}
              </CardContent>
              {students.length > 0 && selectedDate && (
                <CardFooter>
                    <Button onClick={handleSaveAll} disabled={isSaving} className='w-full'>
                        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4"/>}
                        {tAttendance('saveButton')}
                    </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}

export default withAuth(AttendancePage, ['teacher']);
