//CORE REACT IMPORTS
import { useState, type JSX, type ReactNode } from 'react';

//INTERFACES
import { FormContext } from './FormContext';

interface FormProviderProps {
    children: ReactNode;
}

export default function FormProvider ({children}: FormProviderProps): JSX.Element {

    const [currentForm, setCurrentForm] = useState<string>('general');

    return (
        <FormContext.Provider value={{currentForm, setCurrentForm}}>
            {children}
        </FormContext.Provider>
    )

}