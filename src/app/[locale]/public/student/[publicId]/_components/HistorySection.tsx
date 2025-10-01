
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useScopedI18n } from '@/locales/client';

const ITEMS_PER_PAGE = 3;

interface HistorySectionProps<T> {
  title: string;
  icon: React.ElementType;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  noItemsMessage: string;
}

const HistorySection = <T extends { id?: any; createdAt?: string }>({
  title,
  icon: Icon,
  items = [],
  renderItem,
  noItemsMessage,
}: HistorySectionProps<T>) => {
  const [currentPage, setCurrentPage] = useState(0);
  const t = useScopedI18n('publicProfile');

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const paginatedItems = items.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Icon className="h-6 w-6" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {paginatedItems.length > 0 ? (
          paginatedItems.map((item, index) => (
            <div key={item.id || index} className="mb-4">
              {renderItem(item)}
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-4">{noItemsMessage}</p>
        )}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage + 1} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage >= totalPages - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HistorySection;
