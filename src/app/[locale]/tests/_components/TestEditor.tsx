

'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TestDTO, TestBlock, Question, TestBlockType, MultipleChoiceOption } from '@/modules/test/application/dtos/test.dto';
import { ArrowLeft, PlusCircle, Sparkles, Trash2, Save } from 'lucide-react';
import { useScopedI18n } from '@/locales/client';
import { produce } from 'immer';
import { nanoid } from 'nanoid';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import ReactMarkdown from 'react-markdown';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


interface TestEditorProps {
    test: TestDTO;
    onTestChange: (updatedTest: TestDTO) => void;
    onBack: () => void;
}

const TestEditor: React.FC<TestEditorProps> = ({ test, onTestChange, onBack }) => {
    const t = useScopedI18n('tests');
    const tTools = useScopedI18n('tools');
    const tPublicTest = useScopedI18n('publicTestSession');
    const [initialTestState, setInitialTestState] = useState(JSON.stringify(test));

    const isDirty = JSON.stringify(test) !== initialTestState;

    const handleBlockChange = (blockIndex: number, newBlock: Partial<TestBlock>) => {
        const nextState = produce(test, draft => {
            draft.blocks[blockIndex] = { ...draft.blocks[blockIndex], ...newBlock };
        });
        onTestChange(nextState);
    };
    
    const handleQuestionChange = (blockIndex: number, questionIndex: number, newQuestion: Partial<Question>) => {
        const nextState = produce(test, draft => {
            draft.blocks[blockIndex].questions[questionIndex] = { ...draft.blocks[blockIndex].questions[questionIndex], ...newQuestion };
        });
        onTestChange(nextState);
    };

    const handleOptionChange = (blockIndex: number, questionIndex: number, optionIndex: number, newText: string) => {
        const nextState = produce(test, draft => {
            if (draft.blocks[blockIndex].questions[questionIndex].options) {
                draft.blocks[blockIndex].questions[questionIndex].options![optionIndex].text = newText;
            }
        });
        onTestChange(nextState);
    };
    
    const addQuestion = (blockIndex: number) => {
        const blockType = test.blocks[blockIndex].type;
        let newQuestion: Question;
        
        switch(blockType) {
            case 'multiple-choice':
                newQuestion = { id: nanoid(), text: '', type: 'multiple-choice', options: [{text: ''}, {text: ''}], answer: 0 };
                break;
            case 'true-false':
                newQuestion = { id: nanoid(), text: '', type: 'true-false', answer: true };
                break;
            case 'open-ended':
            default:
                newQuestion = { id: nanoid(), text: '', type: 'open-ended', answer: '' };
                break;
        }

        const nextState = produce(test, draft => {
            draft.blocks[blockIndex].questions.push(newQuestion);
        });
        onTestChange(nextState);
    };

    const addOption = (blockIndex: number, questionIndex: number) => {
        const nextState = produce(test, draft => {
            draft.blocks[blockIndex].questions[questionIndex].options?.push({ text: '' });
        });
        onTestChange(nextState);
    };

    const addBlock = (type: TestBlockType) => {
        let defaultQuestion: Question;
        switch(type) {
            case 'multiple-choice':
                defaultQuestion = { id: nanoid(), text: '', type: 'multiple-choice', options: [{text: ''}, {text: ''}], answer: 0 };
                break;
            case 'true-false':
                defaultQuestion = { id: nanoid(), text: '', type: 'true-false', answer: true };
                break;
            case 'open-ended':
            default:
                defaultQuestion = { id: nanoid(), text: '', type: 'open-ended', answer: '' };
                break;
        }

        const newBlock: TestBlock = {
            id: nanoid(),
            type: type,
            title: t(`editor.blockTypes.${type}`),
            questions: [defaultQuestion]
        };

        const nextState = produce(test, draft => {
            if (!draft.blocks) {
                draft.blocks = [];
            }
            draft.blocks.push(newBlock);
        });
        onTestChange(nextState);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <Button variant="ghost" onClick={onBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t('editor.backToTests')}
                </Button>
                <Button onClick={onBack} disabled={!isDirty}>
                    <Save className="mr-2 h-4 w-4" />
                    {useScopedI18n('common')('save')}
                </Button>
            </div>
            <div className="space-y-6">
                <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <h3 className="text-lg font-semibold">{t('editor.testDetails')}</h3>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 pt-2">
                                <div className="space-y-2">
                                    <Label htmlFor="test-title">{t('editor.testTitle')}</Label>
                                    <Input id="test-title" value={test.title} onChange={e => onTestChange({ ...test, title: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="test-rubric">{t('editor.rubric')}</Label>
                                    {test.rubric ? (
                                        <div className="space-y-4 rounded-md border p-4">
                                             <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="w-1/4">{tTools('history.criterion')}</TableHead>
                                                        <TableHead>{tTools('history.excellent')}</TableHead>
                                                        <TableHead>{tTools('history.satisfactory')}</TableHead>
                                                        <TableHead>{tTools('history.needsImprovement')}</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {test.rubric.criteria.map((criterion, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell className="font-semibold">{criterion.criterion}</TableCell>
                                                            <TableCell>{criterion.excellent}</TableCell>
                                                            <TableCell>{criterion.satisfactory}</TableCell>
                                                            <TableCell>{criterion.needsImprovement}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                            {test.rubric.suggestedScoring && test.rubric.suggestedScoring.length > 0 && (
                                                <>
                                                    <Separator />
                                                     <div>
                                                        <h4 className="font-semibold mb-2">{tTools('history.scoringGuide')}</h4>
                                                        <Table>
                                                            <TableHeader>
                                                                <TableRow>
                                                                    <TableHead>{t('editor.blockTypes.title')}</TableHead>
                                                                    <TableHead>{t('editor.points')}</TableHead>
                                                                    <TableHead>{t('editor.description')}</TableHead>
                                                                </TableRow>
                                                            </TableHeader>
                                                            <TableBody>
                                                                {test.rubric.suggestedScoring.map((scoring, index) => (
                                                                    <TableRow key={index}>
                                                                        <TableCell className="font-medium">{scoring.section}</TableCell>
                                                                        <TableCell>{scoring.points}</TableCell>
                                                                        <TableCell>{scoring.description}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">{t('editor.noRubric')}</p>
                                    )}
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>


                {(test.blocks || []).map((block, blockIndex) => (
                    <Card key={block.id}>
                        <CardHeader>
                            <CardTitle>{block.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {block.questions.map((q, qIndex) => (
                                <div key={q.id} className="p-4 border rounded-md space-y-3">
                                    <Label>{t('editor.questionLabel', { number: qIndex + 1})}</Label>
                                    <Textarea value={q.text} onChange={(e) => handleQuestionChange(blockIndex, qIndex, { text: e.target.value })} />

                                    {block.type === 'multiple-choice' && q.options && (
                                        <div className="space-y-2 pl-4">
                                            <Label>{t('editor.answer')}</Label>
                                            <RadioGroup
                                                value={String(q.answer)}
                                                onValueChange={(value) => handleQuestionChange(blockIndex, qIndex, { answer: Number(value) })}
                                            >
                                            {q.options.map((opt, optIndex) => (
                                                <div key={optIndex} className="flex items-center gap-2">
                                                     <RadioGroupItem value={String(optIndex)} id={`${q.id}-opt-${optIndex}`} />
                                                    <Input value={opt.text} onChange={(e) => handleOptionChange(blockIndex, qIndex, optIndex, e.target.value)} />
                                                </div>
                                            ))}
                                            </RadioGroup>
                                            <Button variant="outline" size="sm" onClick={() => addOption(blockIndex, qIndex)}><PlusCircle className="mr-2 h-3 w-3" />{t('editor.addOption')}</Button>
                                        </div>
                                    )}

                                    {block.type === 'true-false' && (
                                        <div className="pl-4">
                                            <Label>{t('editor.answer')}</Label>
                                             <RadioGroup
                                                value={String(q.answer)}
                                                onValueChange={(value) => handleQuestionChange(blockIndex, qIndex, { answer: value === 'true' })}
                                                className="flex gap-4 mt-2"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="true" id={`${q.id}-true`} />
                                                    <Label htmlFor={`${q.id}-true`}>{tPublicTest('true')}</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="false" id={`${q.id}-false`} />
                                                    <Label htmlFor={`${q.id}-false`}>{tPublicTest('false')}</Label>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                    )}

                                    {block.type === 'open-ended' && (
                                        <div className="pl-4">
                                            <Label>{t('editor.answer')}</Label>
                                            <Textarea value={String(q.answer || '')} onChange={(e) => handleQuestionChange(blockIndex, qIndex, { answer: e.target.value })} />
                                        </div>
                                    )}

                                </div>
                            ))}
                             <CardFooter className="p-0 pt-4">
                                <Button variant="secondary" onClick={() => addQuestion(blockIndex)}>
                                    <PlusCircle className="mr-2 h-4 w-4" /> {t('editor.addQuestion')}
                                </Button>
                            </CardFooter>
                        </CardContent>
                    </Card>
                ))}
                
                <Card>
                    <CardHeader>
                        <CardTitle>{t('editor.addBlock')}</CardTitle>
                    </CardHeader>
                     <CardContent className="flex gap-2">
                        <Button variant="outline" onClick={() => addBlock('multiple-choice')}>{t('editor.blockTypes.multiple-choice')}</Button>
                        <Button variant="outline" onClick={() => addBlock('true-false')}>{t('editor.blockTypes.true-false')}</Button>
                        <Button variant="outline" onClick={() => addBlock('open-ended')}>{t('editor.blockTypes.open-ended')}</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TestEditor;
