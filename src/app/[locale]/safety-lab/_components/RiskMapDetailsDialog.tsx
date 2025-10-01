

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { SafetyRiskMapDTO } from '@/modules/educational-safety/application/dtos/safety-risk-map.dto';
import { useScopedI18n } from '@/locales/client';

interface RiskMapDetailsDialogProps {
    riskMap: SafetyRiskMapDTO | null;
    isOpen: boolean;
    onClose: () => void;
}

const RiskMapDetailsDialog: React.FC<RiskMapDetailsDialogProps> = ({ riskMap, isOpen, onClose }) => {
    const t = useScopedI18n('safetyLab');
    const tRiskMap = useScopedI18n('safetyLab.riskMap');

    const renderRiskTable = (title: string, risks: { risk: string; priority: string; justification: string; }[]) => {
        if (!risks || risks.length === 0) return null;
        return (
          <div className="mt-4">
            <h4 className="font-semibold text-lg mb-2">{title}</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[20%]">{tRiskMap('risk')}</TableHead>
                  <TableHead className="w-[15%]">{tRiskMap('priority')}</TableHead>
                  <TableHead>{tRiskMap('justification')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {risks.map((riskItem, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{riskItem.risk}</TableCell>
                    <TableCell>{riskItem.priority}</TableCell>
                    <TableCell>{riskItem.justification}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
    };

    if (!riskMap) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>{riskMap.title}</DialogTitle>
                    <DialogDescription>{riskMap.riskMap.introduction}</DialogDescription>
                </DialogHeader>
                <div className="flex-grow overflow-y-auto pr-6 my-4">
                    <div className="space-y-6">
                        {renderRiskTable(t('riskCategories.natural'), riskMap.riskMap.naturalRisks)}
                        {renderRiskTable(t('riskCategories.social'), riskMap.riskMap.socialRisks)}
                        {renderRiskTable(t('riskCategories.infrastructure'), riskMap.riskMap.infrastructureRisks)}
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default RiskMapDetailsDialog;
