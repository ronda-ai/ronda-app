
'use client';

import React from 'react';
import { useScopedI18n, useCurrentLocale } from '@/locales/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { DateRangePicker } from '@/components/DateRangePicker';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import withAuth from '@/components/withAuth';
import DashboardLayout from '@/components/DashboardLayout';
import { useAnalytics } from './_hooks/useAnalytics';
import Select from 'react-select';
import { es } from 'date-fns/locale';

function AnalyticsPage() {
  const tAttendance = useScopedI18n('attendance');
  const tAnalytics = useScopedI18n('analytics');
  const locale = useCurrentLocale();

  const {
    dateRange,
    setDateRange,
    setSelectedStudentIds,
    students,
    analyticsData,
    isLoadingAnalytics,
    studentOptions,
    selectedStudentOptions
  } = useAnalytics();

  return (
    <DashboardLayout>
      <main className="flex-1 overflow-y-auto p-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{tAnalytics('filters.title')}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4">
            <DateRangePicker 
              date={dateRange} 
              onDateChange={setDateRange}
              locale={locale === 'es' ? es : undefined}
            />
            <div className="w-full md:w-1/2">
               <Select
                  isMulti
                  options={studentOptions}
                  value={selectedStudentOptions}
                  onChange={(selected) => setSelectedStudentIds(selected.map(s => s.value))}
                  placeholder={tAnalytics('filters.studentPlaceholder')}
                  noOptionsMessage={() => tAnalytics('filters.noStudents')}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>{tAnalytics('charts.attendance.title')}</CardTitle>
              <CardDescription>
                {tAnalytics('charts.attendance.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingAnalytics ? (
                <Skeleton className="h-[300px] w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData?.attendance}>
                    <XAxis
                      dataKey="date"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="present"
                      stroke="#22c55e"
                      name={tAttendance('status.present')}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="absent"
                      stroke="#ef4444"
                      name={tAttendance('status.absent')}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                {tAnalytics('charts.participation.title')}
              </CardTitle>
              <CardDescription>
                {tAnalytics('charts.participation.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingAnalytics ? (
                <Skeleton className="h-[300px] w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        layout="vertical"
                        data={analyticsData?.participation}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" allowDecimals={false}/>
                        <YAxis dataKey="name" type="category" width={80} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                        />
                        <Legend />
                        <Bar 
                            dataKey="count" 
                            name={tAnalytics('charts.participation.legend')} 
                            fill="hsl(var(--primary))" 
                            barSize={20}
                        />
                    </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </DashboardLayout>
  );
}

export default withAuth(AnalyticsPage, ['teacher']);
