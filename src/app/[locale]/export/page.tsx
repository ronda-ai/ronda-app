
'use client';

import React from 'react';
import {Button} from '@/components/ui/button';
import {Download, Loader2} from 'lucide-react';
import {useScopedI18n} from '@/locales/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import withAuth from '@/components/withAuth';
import DashboardLayout from '@/components/DashboardLayout';
import {DateRangePicker} from '@/components/DateRangePicker';
import ReactSelect from 'react-select';
import { useExport, DataType, ExportFormat } from './_hooks/useExport';

function ExportPage() {
  const tExport = useScopedI18n('export');

  const {
    dataType,
    setDataType,
    formatType,
    setFormatType,
    isExporting,
    dateRange,
    setDateRange,
    setSelectedStudentIds,
    studentOptions,
    handleExport,
  } = useExport();
  
  const isDateFilterDisabled = dataType === 'students';

  return (
    <DashboardLayout>
      <main className="flex-1 overflow-y-auto p-8 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>{tExport('exportData')}</CardTitle>
            <CardDescription>{tExport('exportDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="data-type">{tExport('dataType')}</Label>
                  <Select
                    value={dataType}
                    onValueChange={v => setDataType(v as DataType)}
                  >
                    <SelectTrigger id="data-type">
                      <SelectValue placeholder={tExport('dataTypePlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="students">
                        {tExport('dataTypes.students')}
                      </SelectItem>
                      <SelectItem value="attendance">
                        {tExport('dataTypes.attendance')}
                      </SelectItem>
                      <SelectItem value="evaluations">
                        {tExport('dataTypes.evaluations')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="format">{tExport('format')}</Label>
                  <Select
                    value={formatType}
                    onValueChange={v => setFormatType(v as ExportFormat)}
                  >
                    <SelectTrigger id="format">
                      <SelectValue placeholder={tExport('formatPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                      <SelectItem value="docx">Word (DOCX)</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
            </div>
            
            <div className="space-y-2">
                <Label>{tExport('filtersTitle')}</Label>
                <div className="grid md:grid-cols-2 gap-4 p-4 border rounded-md">
                     <div className="space-y-2">
                        <Label htmlFor="student-select">{tExport('studentFilter')}</Label>
                        <ReactSelect
                            isMulti
                            options={studentOptions}
                            onChange={(selected) => setSelectedStudentIds(selected.map(s => s.value))}
                            placeholder={tExport('studentPlaceholder')}
                            noOptionsMessage={() => tExport('noStudents')}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label className={isDateFilterDisabled ? 'text-muted-foreground' : ''}>{tExport('dateFilter')}</Label>
                        <DateRangePicker date={dateRange} onDateChange={setDateRange} disabled={isDateFilterDisabled}/>
                    </div>
                </div>
            </div>
            
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full"
              size="lg"
            >
              {isExporting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              {tExport('exportButton')}
            </Button>
          </CardContent>
        </Card>
      </main>
    </DashboardLayout>
  );
}

export default withAuth(ExportPage, ['teacher']);
