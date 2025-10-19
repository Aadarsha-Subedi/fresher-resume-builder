//CORE REACT IMPORTS
import { type Dispatch, type SetStateAction } from 'react';

export function getPrevForm(setCurrentForm: Dispatch<SetStateAction<string>> | undefined, currentForm: string, forms: string[]): void {
    if (setCurrentForm === undefined) {
        return;
    }
    const index: number = forms.indexOf(currentForm);
    if (index === -1 || index - 1 < 0) {
        return;
    }
    setCurrentForm(forms[index - 1]);
}

export function getNextForm(setCurrentForm: Dispatch<SetStateAction<string>> | undefined, currentForm: string, forms: string[]): void {
    if (setCurrentForm === undefined) {
        return;
    }
    const index: number = forms.indexOf(currentForm);
    if (index === -1 || index + 1 >= forms.length) {
        return;
    }
    setCurrentForm(forms[index + 1]);

}
