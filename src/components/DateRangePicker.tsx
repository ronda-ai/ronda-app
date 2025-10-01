
'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useScopedI18n } from '@/locales/client';
import { Locale } from 'date-fns';

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
    date: DateRange | undefined;
    onDateChange: (date: DateRange | undefined) => void;
    disabled?: boolean;
    locale?: Locale;
}

export function DateRangePicker({
  className,
  date,
  onDateChange,
  disabled = false,
  locale
}: DateRangePickerProps) {
  const t = useScopedI18n('analytics.filters');
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y', { locale })} -{' '}
                  {format(date.to, 'LLL dd, y', { locale })}
                </>
              ) : (
                format(date.from, 'LLL dd, y', { locale })
              )
            ) : (
              <span>{t('dateRange')}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onDateChange}
            numberOfMonths={2}
            disabled={disabled}
            locale={locale}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
