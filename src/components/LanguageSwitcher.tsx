
'use client';

import { useChangeLocale, useCurrentLocale } from '@/locales/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  return (
    <Select
      value={locale}
      onValueChange={(newLocale) => {
        changeLocale(newLocale as 'en' | 'es' | 'pt' | 'fr' | 'de' | 'zh-CN' | 'ja' | 'ru' | 'it' | 'pl' | 'nl' | 'ko' | 'hi' | 'id');
      }}
    >
      <SelectTrigger className="w-auto gap-2">
        <Globe className="h-4 w-4" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="es">Español</SelectItem>
        <SelectItem value="pt">Português</SelectItem>
        <SelectItem value="fr">Français</SelectItem>
        <SelectItem value="de">Deutsch</SelectItem>
        <SelectItem value="zh-CN">简体中文</SelectItem>
        <SelectItem value="ja">日本語</SelectItem>
        <SelectItem value="ru">Русский</SelectItem>
        <SelectItem value="it">Italiano</SelectItem>
        <SelectItem value="pl">Polski</SelectItem>
        <SelectItem value="nl">Nederlands</SelectItem>
        <SelectItem value="ko">한국어</SelectItem>
        <SelectItem value="hi">हिन्दी</SelectItem>
        <SelectItem value="id">Bahasa Indonesia</SelectItem>
      </SelectContent>
    </Select>
  );
}
