
'use client';

import React, { useEffect, useState } from 'react';
import type { SelectionMode } from '@/modules/student/domain/student.entity';
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { RotateCw, Dices, Users, Zap, Award, Loader2, Sparkles, User, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useScopedI18n } from '@/locales/client';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import ChallengeConfigDialog from './ChallengeConfigDialog';
import { motion, AnimatePresence } from 'framer-motion';

interface ClassroomWheelProps {
  students: StudentDTO[];
  mode: SelectionMode;
  onModeChange: (mode: SelectionMode) => void;
  isSpinning: boolean;
  onSpin: () => void;
  onSelect: () => void;
}

const ClassroomWheel: React.FC<ClassroomWheelProps> = ({
  students,
  mode,
  onModeChange,
  isSpinning,
  onSpin,
  onSelect,
}) => {
  const t = useScopedI18n('wheel');
  const tModes = useScopedI18n('wheel.modes');
  const tModeDescriptions = useScopedI18n('wheel.modeDescriptions');
  
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const modeOptions: { value: SelectionMode; label: string; icon: React.ElementType, description: string }[] = [
    { value: 'random', label: tModes('random'), icon: Award, description: tModeDescriptions('random') },
    { value: 'weighted', label: tModes('weighted'), icon: Sparkles, description: tModeDescriptions('weighted') },
    { value: 'pair', label: tModes('pair'), icon: Users, description: tModeDescriptions('pair') },
    { value: 'lightning', label: tModes('lightning'), icon: Zap, description: tModeDescriptions('lightning') },
    { value: 'personalized-individual', label: tModes('personalizedIndividual'), icon: User, description: tModeDescriptions('personalizedIndividual') },
    { value: 'personalized-multiple', label: tModes('personalizedMultiple'), icon: Users, description: tModeDescriptions('personalizedMultiple') },
  ];

  const isSpinMode = !['personalized-individual', 'personalized-multiple'].includes(mode);
  const IconForMode = modeOptions.find(m => m.value === mode)?.icon || Dices;

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full p-4 md:p-8 space-y-8">
        <Card className="w-full max-w-4xl">
          <CardHeader>
              <div className="flex justify-center items-center relative">
                  <CardTitle className="text-center">{t('selectionMode')}</CardTitle>
                   <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setIsConfigOpen(true)}>
                      <Settings />
                   </Button>
              </div>
          </CardHeader>
          <CardContent>
            <TooltipProvider>
              <RadioGroup
                value={mode}
                onValueChange={(value) => onModeChange(value as SelectionMode)}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
              >
                {modeOptions.map((option) => (
                  <Tooltip key={option.value}>
                    <TooltipTrigger asChild>
                      <Label
                        htmlFor={option.value}
                        className={cn(
                          "flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors h-full",
                          mode === option.value && "border-primary bg-primary/10"
                        )}
                      >
                        <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                        <option.icon className="h-8 w-8 text-primary" />
                        <span className="font-semibold text-center">{option.label}</span>
                      </Label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{option.description}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </RadioGroup>
            </TooltipProvider>
          </CardContent>
        </Card>
        
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            <motion.div 
                className="absolute inset-0 bg-primary/10 rounded-full" 
                animate={{ scale: isSpinning ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.8, repeat: Infinity }}
            />
            <motion.div 
                className="absolute inset-2 bg-primary/20 rounded-full" 
                animate={{ scale: isSpinning ? [1, 0.95, 1] : 1 }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
            />

            <motion.div 
                className="absolute inset-4 flex items-center justify-center bg-card rounded-full shadow-inner"
                animate={{ rotate: isSpinning ? 360 : 0 }}
                transition={{ duration: 1, ease: 'linear', repeat: isSpinning ? Infinity : 0 }}
            >
                <div className="text-center">
                <AnimatePresence mode="wait">
                    {isSpinning ? (
                        <motion.div
                            key="loader"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Loader2 className="h-20 w-20 text-primary animate-spin mx-auto" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="icon"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                          <div className="text-5xl font-bold text-primary font-headline">
                              <IconForMode className="w-24 h-24 mx-auto" />
                          </div>
                           <p className="text-xl font-semibold mt-4 text-muted-foreground">
                            {isSpinMode ? t('readyToSpin') : t('selectStudent')}
                          </p>
                        </motion.div>
                    )}
                </AnimatePresence>
                </div>
            </motion.div>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={isSpinMode ? onSpin : onSelect}
              disabled={isSpinning || students.length < (mode === 'pair' ? 2 : (mode === 'personalized-multiple' ? 1 : 1))}
              className="w-64 h-16 text-xl rounded-full shadow-lg transition-transform duration-150 active:scale-95 flex items-center justify-center gap-3 font-bold"
            >
              {isSpinning ? (
                t('spinning')
              ) : (
                <>
                  {isSpinMode ? <RotateCw className="mr-3 h-7 w-7" /> : <User className="h-7 w-7" />}
                  <span>{isSpinMode ? t('spinTheWheel') : t('selectStudent')}</span>
                </>
              )}
            </Button>
        </motion.div>
      </div>
      <ChallengeConfigDialog isOpen={isConfigOpen} onClose={() => setIsConfigOpen(false)} />
    </>
  );
};

export default ClassroomWheel;
