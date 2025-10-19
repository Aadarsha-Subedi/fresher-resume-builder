//CORE REACT IMPORTS
import type { JSX } from 'react';
import React, { useState, useEffect } from 'react';
import { z } from 'zod';

//THIRD PARTY IMPORTS

//ASSETS AND STYLES
import addIcon from '../../assets/add.svg';
import subtractIcon from '../../assets/subtract.svg';
import { getInputFeedbackStyles } from '../../utils/Validators';
import { toast } from 'sonner';

//INTERFACES
interface DynamicInputProps {
    title: string;
    inputType: string;
    inputPlaceholder: string;
    inputLabel: string;
    dynamicList: { id: string; value: string }[];
    setDynamicList: React.Dispatch<React.SetStateAction<{ id: string; value: string }[]>>;
    maxSize: number;
    validationSchema?: z.ZodType<string>; // Optional Zod schema for validation
    onValidationChange?: (errors: Record<string, string>) => void; // Callback for parent
}

export default function InputBuilder({
    title,
    inputType,
    inputPlaceholder,
    inputLabel,
    dynamicList,
    setDynamicList,
    maxSize,
    validationSchema,
    onValidationChange
}: DynamicInputProps): JSX.Element {

    // Track errors for each input by ID
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Track which fields have been touched (blurred)
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    function addInputField(): void {
        if (dynamicList.length === maxSize) {
            toast.error(`${title} can only have a maximum of ${maxSize} elements.`)
            return;
        }
        setDynamicList([...dynamicList, { id: crypto.randomUUID(), value: '' }]);
    }

    function removeInputField(id: string): void {
        if (dynamicList.length <= 1) {
            toast.error(`${title} must have atleaset one element.`)
            return;
        }
        setDynamicList(dynamicList.filter((item) => item.id !== id));

        // Clean up errors and touched state for removed field
        const newErrors = { ...errors };
        const newTouched = { ...touched };
        delete newErrors[id];
        delete newTouched[id];
        setErrors(newErrors);
        setTouched(newTouched);
    }

    function validateField(id: string, value: string): string {
        console.log(id);
        if (!validationSchema) return '';

        const result = validationSchema.safeParse(value);

        if (!result.success) {
            return result.error.issues[0].message;
        }

        return ''; // No error
    }

    function updateInputField(id: string, value: string): void {
        // Update the list
        setDynamicList(dynamicList.map((item) =>
            item.id === id ? { ...item, value } : item
        ));

        // Validate if field has been touched
        if (touched[id]) {
            const error = validateField(id, value);
            setErrors(prev => ({ ...prev, [id]: error }));
        }
    }

    function handleBlur(id: string, value: string): void {
        // Mark as touched
        setTouched(prev => ({ ...prev, [id]: true }));

        // Validate
        const error = validateField(id, value);
        setErrors(prev => ({ ...prev, [id]: error }));
    }

    // Notify parent of validation state changes
    useEffect(() => {
        if (onValidationChange) {
            onValidationChange(errors);
        }
    }, [errors, onValidationChange]);

    // Get border color based on validation state
    function getInputStyles(id: string): string {
        if (!touched[id]) return '1px solid #ccc'; // Default - untouched
        if (errors[id] && errors[id] !== '') return '2px solid #ef4444'; // Red for error
        return '2px solid #22c55e'; // Green for valid
    }

    const dynamicListElements: JSX.Element[] = dynamicList.map((item) => (
        <div className='custominput__input' key={item.id}>
            <div style={{ width: '100%' }}>
                <input
                    type={inputType}
                    placeholder={inputPlaceholder}
                    value={item.value}
                    onChange={(e) => updateInputField(item.id, e.target.value)}
                    onBlur={(e) => handleBlur(item.id, e.target.value)}
                    style={{
                        border: getInputStyles(item.id),
                    }}
                />
                {touched[item.id] && errors[item.id] && (
                    <p className='builder__info' style={{
                        color: getInputFeedbackStyles(item.id)
                    }}>
                        {errors[item.id]}
                    </p>
                )}
            </div>
            <img
                src={subtractIcon}
                alt="A remove icon."
                width={24}
                onClick={() => removeInputField(item.id)}
                style={{ cursor: 'pointer', flexShrink: 0 }}
            />
        </div>
    ));

    return (
        <>
            <div className="customlabel__container">
                <p className='customlabel__paragraph'>{inputLabel}</p>
                <img
                    src={addIcon}
                    alt="An add icon."
                    width={24}
                    onClick={addInputField}
                    style={{ cursor: 'pointer' }}
                />
            </div>
            <div className='custominput__container'>
                {dynamicListElements}
            </div>
        </>
    );
}