//CORE REACT IMPORTS
import { useContext, useState, type JSX } from 'react';

//THIRD PARTY IMPORTS
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

//COMPONENT
import InputBuilder from './InputBuilder.tsx';

//CONTEXTS
import { UserContext } from '../../contexts/UserContext.ts';
import { FormContext } from '../../contexts/FormContext.ts';

//UTILITIES
import { MAX_SKILLS, MAX_LANGUAGES, MAX_CERTIFICATIONS, MAX_AWARDS } from '../../utils/DefaultValues.ts';
import { getPrevForm, getNextForm } from '../../utils/UpdateForms.ts';
import { forms } from '../../utils/FormList.ts';
import { awardsSchema, certificationsSchema, languagesSchema, skillsSchema } from '../../utils/Schema.ts';

export default function Additional(): JSX.Element {

    const AdditionalContext = useContext(UserContext)?.AdditionalContextType;
    const currentForm = useContext(FormContext)?.currentForm + '';
    const setCurrentForm = useContext(FormContext)?.setCurrentForm;
    const isFinalForm = forms.indexOf(currentForm) === forms.length - 1;
    const navigate = useNavigate();

    const [_, setValidationErrors] = useState({});
    const [skillErrors, ] = useState([]);
    const [languageErrors, ] = useState([]);
    const [certificateErrors, ] = useState([]);
    const [additionalErrors, ] = useState([]);


    if (AdditionalContext === undefined) {
        return (
            <p>Loading....</p>
        )
    }

    function updateAdditionalData(): boolean {

        const allSkillErrorsValid = Object.values(skillErrors).every(error => error === '');
        const allLanguageErrorsValid = Object.values(languageErrors).every(error => error === '');
        const allCertificateErrorsValid = Object.values(certificateErrors).every(error => error === '');
        const allAdditionalErrorsValid = Object.values(additionalErrors).every(error => error === '');

        const atLeastOneInput = AdditionalContext && AdditionalContext.skills.length > 0 && AdditionalContext.languages.length > 0 && 
        AdditionalContext.certifications.length > 0 && AdditionalContext.awards.length > 0 && AdditionalContext?.skills.every(c => c.value.trim() !== '') &&
        AdditionalContext?.languages.every(c => c.value.trim() !== '') && AdditionalContext?.certifications.every(c => c.value.trim() !== '') && 
        AdditionalContext?.awards.every(c => c.value.trim() !== '')

        if(allSkillErrorsValid && allLanguageErrorsValid && allCertificateErrorsValid && allAdditionalErrorsValid && atLeastOneInput) {
            return true;
        }
        else {
            toast.error('Please add at least one additional information point to each list.');
        }

        return false

    }

    function handlePreviousForm(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();
        getPrevForm(setCurrentForm, currentForm, forms);
    }

    function handleNextForm(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (updateAdditionalData()) {
            getNextForm(setCurrentForm, currentForm, forms);
            navigate('/result');
        }
    }

    return (
        <>
            <h2 className="form__heading">
                Additional Information
            </h2>
            <form onSubmit={handleNextForm}>
                <div className="builder__form">
                    <div className="builder__container--main">
                        <div className="builder__container">
                            <InputBuilder
                                title='Skills'
                                inputType='text'
                                inputPlaceholder='ExpressJS'
                                inputLabel='Enter your job relevant skills'
                                dynamicList={AdditionalContext.skills}
                                setDynamicList={AdditionalContext.setSkills}
                                maxSize={MAX_SKILLS}
                                validationSchema={skillsSchema}
                                onValidationChange={setValidationErrors}
                            />
                        </div>
                    </div>
                    <div className="builder__container--main">
                        <div className="builder__container">
                            <InputBuilder
                                title='Languages'
                                inputType='text'
                                inputPlaceholder='English'
                                inputLabel='Languages'
                                dynamicList={AdditionalContext.languages}
                                setDynamicList={AdditionalContext.setLanguages}
                                maxSize={MAX_LANGUAGES}
                                validationSchema={languagesSchema}
                                onValidationChange={setValidationErrors}
                            />
                        </div>
                    </div>
                    <div className="builder__container--main">
                        <div className="builder__container">
                            <InputBuilder
                                title='Certifications'
                                inputType='text'
                                inputPlaceholder='Java Development on Oracle Cloud'
                                inputLabel='Enter your certifications'
                                dynamicList={AdditionalContext.certifications}
                                setDynamicList={AdditionalContext.setCertifications}
                                maxSize={MAX_CERTIFICATIONS}
                                validationSchema={certificationsSchema}
                                onValidationChange={setValidationErrors}
                            />
                        </div>
                    </div>
                    <div className="builder__container--main">
                        <div className="builder__container">
                            <InputBuilder
                                title='Awards'
                                inputType='text'
                                inputPlaceholder='Google Hackathon 2019 winner'
                                inputLabel='Enter your received awareds'
                                dynamicList={AdditionalContext.awards}
                                setDynamicList={AdditionalContext.setAwards}
                                maxSize={MAX_AWARDS}
                                validationSchema={awardsSchema}
                                onValidationChange={setValidationErrors}
                            />
                        </div>
                    </div>
                </div>
                <div className={isFinalForm ? 'button__finalcontainer' : 'button__container'}>
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