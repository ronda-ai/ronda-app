
'use client';

import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useScopedI18n} from '@/locales/client';
import {Loader2, Eye, EyeOff} from 'lucide-react';
import Image from 'next/image';
import { useLogin } from './_hooks/useLogin';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function LoginPage() {
  const t = useScopedI18n('login');
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleLogin,
    showPassword,
    setShowPassword,
  } = useLogin();


  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 bg-background">
        <div className="absolute top-4 right-4">
            <LanguageSwitcher />
        </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--accent)),hsl(var(--background)))]" />
      
      <Card className="w-full max-w-sm border-0 bg-card text-card-foreground shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <Image src="/logo.png" alt="Ronda AI Logo" width={120} height={50} />
          </div>
          <CardDescription className="pt-2 text-muted-foreground">
            {t('description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="teacher@ronda.ai"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">{t('password')}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="pr-10"
                  />
                   <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                    onClick={() => setShowPassword(prev => !prev)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t('loginButton')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
