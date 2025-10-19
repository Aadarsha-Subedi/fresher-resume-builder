//CORE REACT IMPORTS
import { createContext, type Dispatch, type SetStateAction } from 'react';

interface FormContextType {
    currentForm: string,
    setCurrentForm: Dispatch<SetStateAction<string>>;
}

export const FormContext = createContext<FormContextType | undefined>(undefined);