//CORE REACT IMPORTS
import { type JSX, useContext, useState } from 'react';

//THIRD PARTY IMPORTS
import { toast } from 'sonner';

//COMPONENT
import InputBuilder from './InputBuilder.tsx';

//CONTEXTS
import { UserContext, type WorkDataType } from '../../contexts/UserContext.ts';
import { FormContext } from '../../contexts/FormContext.ts';

//UTILITIES
import { MAX_WORK_RESPONSIBILITIES } from '../../utils/DefaultValues.ts';
import { getNextForm, getPrevForm } from '../../utils/UpdateForms.ts';
import { forms } from '../../utils/FormList.ts';
import { getInputFeedbackStyles, getInputStyles, validateWork, validateWorkEndDate, validateWorkLocation, validateWorkPosition, validateWorkStartDate } from '../../utils/Validators.ts';
import { responsibilitiesSchema } from '../../utils/Schema.ts';

export default function Work(): JSX.Element {

    const [, setValidationErrors] = useState({});
    const [responsibilitiesError,] = useState<Record<string, string>>({});

    const [workFormErrors, setWorkFormErrors] = useState<WorkDataType>({
        work: '',
        workLocation: '',
        workPosition: '',
        workStartDate: '',
        workEndDate: ''
    })

    const WorkContext = useContext(UserContext)?.WorkContextType;
    const currentForm = useContext(FormContext)?.currentForm + '';
    const setCurrentForm = useContext(FormContext)?.setCurrentForm;
    const isFinalForm = forms.indexOf(currentForm) === forms.length - 1;


    if (WorkContext === undefined) {
        return (
            <p>Loading....</p>
        )
    }

    function handleChange(field: string, value: string): void {

        let errorMessage: string = '';

        setWorkFormErrors(prevGeneralFormErrors => ({
            ...prevGeneralFormErrors,
            [field]: errorMessage
        }));

        switch (field) {
            case 'work':
                errorMessage = validateWork(value);
                break;
            case 'workLocation':
                errorMessage = validateWorkLocation(value);
                break;
            case 'workPosition':
                errorMessage = validateWorkPosition(value);
                break;
            case 'workStartDate':
                errorMessage = validateWorkStartDate(value);
                break;
            case 'workEndDate':
                errorMessage = validateWorkEndDate(value);
                break;
            default:
                break;
        }

        setWorkFormErrors(prevGeneralFormErrors => ({
            ...prevGeneralFormErrors,
            [field]: errorMessage
        }));

    }

    function updateWorkData(formData: FormData): boolean {

        const work: string = formData.get('work') as string;
        const workLocation: string = formData.get('work-location') as string;
        const workPosition: string = formData.get('work-position') as string;
        const workStartDate: string = formData.get('work-start-date') as string;
        const workEndDate: string = formData.get('work-end-date') as string;

        WorkContext?.setWork(work);
        WorkContext?.setWorkLocation(workLocation);
        WorkContext?.setWorkPosition(workPosition);
        WorkContext?.setWorkStartDate(workStartDate);
        WorkContext?.setWorkEndDate(workEndDate);

        const newErrors = {
            work: validateWork(work),
            workLocation: validateWorkLocation(workLocation),
            workPosition: validateWorkPosition(workPosition),
            workStartDate: validateWorkStartDate(workStartDate),
            workEndDate: validateWorkEndDate(workEndDate)
        }
        setWorkFormErrors(newErrors);

        // Validate all fields including relevant courses
        const allFieldsValid = Object.values(newErrors).every(error => error.startsWith('✓'));

        // Check if relevant courses are valid
        const allCoursesValid = Object.values(responsibilitiesError).every(error => error === '');
        const hasAtLeastOneCourse = WorkContext && WorkContext?.responsibilities.length > 0 &&
            WorkContext?.responsibilities.every(c => c.value.trim() !== '');

        if (allFieldsValid && allCoursesValid && hasAtLeastOneCourse) {
            return true;
        }

        if (!hasAtLeastOneCourse) {
            toast.error('Please add at least one responsibility.');
        }

        return false;

    }

    function handlePreviousForm(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();
        getPrevForm(setCurrentForm, currentForm, forms);
    }

    function handleNextForm(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (updateWorkData(formData)) {
            getNextForm(setCurrentForm, currentForm, forms);
        }
    }

    return (
        <>
            <h2 className="form__heading">
                Work Information
            </h2>
            <form onSubmit={handleNextForm}>
                <div className="builder__form">
                    <div className="builder__container--main">
                        <div className="builder__container">
                            <label htmlFor="work" className="builder__label">Enter your previous relevant employment company name</label>
                            <input
                                className='builder__input'
                                id='work'
                                name='work'
                                type="text"
                                placeholder='JP Morgan'
                                onChange={(e) => handleChange('work', e.target.value)}
                                style={{
                                    border: getInputStyles(workFormErrors.work)
                                }}
                                defaultValue={WorkContext.work}
                            />
                            <p
                                className='builder__info'
                                style={{
                                    color: getInputFeedbackStyles(workFormErrors.work)
                                }}
                            >
                                {workFormErrors.work}
                            </p>
                        </div>
                    </div>
                    <div className="builder__container--main">
                        <div className="builder__container">
                            <label htmlFor="work-location" className="builder__label">Enter your previous employment location</label>
                            <input
                                className='builder__input'
                                id='work-location'
                                name='work-location'
                                type="text"
                                placeholder='New York, United States'
                                onChange={(e) => handleChange('workLocation', e.target.value)}
                                style={{
                                    border: getInputStyles(workFormErrors.workLocation)
                                }}
                                defaultValue={WorkContext.workLocation}
                            />
                            <p
                                className='builder__info'
                                style={{
                                    color: getInputFeedbackStyles(workFormErrors.workLocation)
                                }}
                            >
                                {workFormErrors.workLocation}
                            </p>
                        </div>
                    </div>

                    <div className="builder__container--main">
                        <div className="builder__container">
                            <label htmlFor="work-position" className="builder__label">Enter your previous employment position</label>
                            <input
                                className='builder__input'
                                id='work-position'
                                name='work-position'
                                type="text"
                                placeholder='Web Developer Intern'
                                onChange={(e) => handleChange('workPosition', e.target.value)}
                                style={{
                                    border: getInputStyles(workFormErrors.workPosition)
                                }}
                                defaultValue={WorkContext.workPosition}
                            />
                            <p
                                className='builder__info'
                                style={{
                                    color: getInputFeedbackStyles(workFormErrors.workPosition)
                                }}
                            >
                                {workFormErrors.workPosition}
                            </p>
                        </div>
                    </div>
                    <div className="builder__container--main">
                        <div className="builder__container">
                            <label htmlFor="work-start-date" className="builder__label">Enter your previous employement start date</label>
                            <input
                                className='builder__input'
                                id='work-start-date'
                                name='work-start-date'
                                type="date"
                                onChange={(e) => handleChange('workStartDate', e.target.value)}
                                style={{
                                    border: getInputStyles(workFormErrors.workStartDate)
                                }}
                                defaultValue={WorkContext.workStartDate}
                            />
                            <p
                                className='builder__info'
                                style={{
                                    color: getInputFeedbackStyles(workFormErrors.workStartDate)
                                }}
                            >
                                {workFormErrors.workStartDate}
                            </p>
                        </div>
                    </div>
                    <div className="builder__container--main">
                        <div className="builder__container">
                            <label htmlFor="work-end-date" className="builder__label">Enter your previous employement end date</label>
                            <input
                                className='builder__input'
                                id='work-end-date'
                                name='work-end-date'
                                type="date"
                                onChange={(e) => handleChange('workEndDate', e.target.value)}
                                style={{
                                    border: getInputStyles(workFormErrors.workEndDate)
                                }}
                                defaultValue={WorkContext.workEndDate}
                            />
                            <p
                                className='builder__info'
                                style={{
                                    color: getInputFeedbackStyles(workFormErrors.workEndDate)
                                }}
                            >
                                {workFormErrors.workEndDate}
                            </p>
                        </div>
                    </div>
                    <div className="builder__container--main">
                        <div className="builder__container">
                            <InputBuilder
                                title='Job Responsibilities'
                                inputType='text'
                                inputPlaceholder='Led development of customer dashboard feature'
                                inputLabel='Your key responsibilities and achievements'
                                dynamicList={WorkContext?.responsibilities}
                                setDynamicList={WorkContext?.setResponsibilities}
                                maxSize={MAX_WORK_RESPONSIBILITIES}
                                validationSchema={responsibilitiesSchema}
                                onValidationChange={setValidationErrors}
                            />
                        </div>
                    </div>
                </div>
                <div className="button__container">
                    <button
                        type='button'
                        onClick={handlePreviousForm}
                        disabled={forms.indexOf(currentForm) === 0}
                        className='builder__btn builder__btn--prev'>
                        Back
                    </button>
                    {
                        (
                            <button
                                type='submit'
                                className='builder__btn builder__btn--next'>
                                {isFinalForm ? 'Create My Resume' : 'Next'}
                            </button>
                        )
                    }
                </div>
            </form>
        </>
    )

}