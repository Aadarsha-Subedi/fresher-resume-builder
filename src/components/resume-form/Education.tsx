//CORE REACT IMPORTS
import { type JSX, useContext, useState } from 'react';

//THIRD PARTY IMPORTS
import { toast } from 'sonner';

//COMPONENT
import InputBuilder from './InputBuilder.tsx';

//CONTEXTS
import { UserContext, type EducationDataType } from '../../contexts/UserContext.ts';
import { FormContext } from '../../contexts/FormContext.ts';

//UTILITIES
import { MAX_RELEVANT_COURSES } from '../../utils/DefaultValues';
import { getPrevForm, getNextForm } from '../../utils/UpdateForms.ts';
import { forms } from '../../utils/FormList.ts';
import { getInputFeedbackStyles, getInputStyles, validateCgpa, validateDegree, validateDegreeEndDate, validateDegreeMajor, validateUniversity, validateUniversityLocation } from '../../utils/Validators.ts';
import { relevantCoursesSchema } from '../../utils/Schema.ts';

export default function Education(): JSX.Element {

    const [educationFormErrors, setEducationFormErrors] = useState<EducationDataType>({
        university: '',
        universityLocation: '',
        degree: '',
        degreeEndDate: '',
        degreeMajor: '',
        cgpa: ''
    })
    const [_, setValidationErrors] = useState({});
    const [relevantCoursesErrors, ] = useState<Record<string, string>>({});

    const EducationContext = useContext(UserContext)?.EducationContextType;
    const currentForm = useContext(FormContext)?.currentForm + '';
    const setCurrentForm = useContext(FormContext)?.setCurrentForm;

    const isFinalForm = forms.indexOf(currentForm) === forms.length - 1;

    if (EducationContext === undefined) {
        return (
            <p>Loading....</p>
        )
    }

    function handleChange(field: string, value: string): void {

        let errorMessage: string = '';

        switch (field) {
            case 'university':
                errorMessage = validateUniversity(value);
                break;
            case 'universityLocation':
                errorMessage = validateUniversityLocation(value);
                break;
            case 'degree':
                errorMessage = validateDegree(value);
                break;
            case 'degreeEndDate':
                errorMessage = validateDegreeEndDate(value);
                break;
            case 'degreeMajor':
                errorMessage = validateDegreeMajor(value);
                break;
            case 'cgpa':
                errorMessage = validateCgpa(value);
                break;
            default:
                break;
        }

        setEducationFormErrors(preveducationFormErrors => ({
            ...preveducationFormErrors,
            [field]: errorMessage
        }));

    }

    function updateEducationData(formData: FormData): boolean {
        const userUniversity: string = formData.get('university') as string;
        const userUniversityLocation: string = formData.get('university-location') as string;
        const userDegree: string = formData.get('degree') as string;
        const userDegreeEndDate: string = formData.get('degree-end-date') as string;
        const userDegreeMajor: string = formData.get('degree-major') as string;
        const userCgpa: string = formData.get('cgpa') as string;

        EducationContext?.setUniversity(userUniversity);
        EducationContext?.setUniversityLocation(userUniversityLocation);
        EducationContext?.setDegree(userDegree);
        EducationContext?.setDegreeEndDate(userDegreeEndDate);
        EducationContext?.setDegreeMajor(userDegreeMajor);
        EducationContext?.setCgpa(userCgpa)

        const newErrors = {
            university: validateUniversity(userUniversity),
            universityLocation: validateUniversityLocation(userUniversityLocation),
            degree: validateDegree(userDegree),
            degreeEndDate: validateDegreeEndDate(userDegreeEndDate),
            degreeMajor: validateDegreeMajor(userDegreeMajor),
            cgpa: validateCgpa(userCgpa),
        }
        setEducationFormErrors(newErrors);

        // Validate all fields including relevant courses
        const allFieldsValid = Object.values(newErrors).every(error => error.startsWith('✓'));

        // Check if relevant courses are valid
        const allCoursesValid = Object.values(relevantCoursesErrors).every(error => error === '');
        const hasAtLeastOneCourse = EducationContext && EducationContext?.relevantCourses.length > 0 &&
            EducationContext?.relevantCourses.every(c => c.value.trim() !== '');

        if (allFieldsValid && allCoursesValid && hasAtLeastOneCourse) {
            return true;
        }

        if (!hasAtLeastOneCourse) {
            toast.error('Please add at least one relevant course');
        }

        return false;

    }

    function handlePreviousForm(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();
        getPrevForm(setCurrentForm, currentForm, forms);
    }

    function handleNextForm(e: React.FormEvent<HTMLFormElement>): string | number | undefined {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (updateEducationData(formData)) {
            getNextForm(setCurrentForm, currentForm, forms);
        }
        else {
            return toast.error('Please fill the given form first.');
        }
    }

    return (
        <>
            <h2 className="form__heading">
                Education Information
            </h2>
            <form onSubmit={handleNextForm}>
                <div className='builder__form'>
                    <div className="builder__container--main">
                        <div className="builder__container">
                            <label htmlFor="university" className="builder__label">Enter your college/university</label>
                            <input
                                className='builder__input'
                                id='university'
                                name='university'
                                type="text"
                                placeholder='University of Arizona'
                                onChange={(e) => handleChange('university', e.target.value)}
                                style={{
                                    border: getInputStyles(educationFormErrors.university)
                                }}
                                defaultValue={EducationContext.university}
                            />
                            <p
                                className='builder__info'
                                style={{
                                    color: getInputFeedbackStyles(educationFormErrors.university)
                                }}
                            >
                                {educationFormErrors.university}
                            </p>
                        </div>
                    </div>
                    <div className="builder__container--main">
                        <div className="builder__container">
                            <label htmlFor="university-location" className="builder__label">Enter your college/university location</label>
                            <input
                                className='builder__input'
                                id='university-location'
                                name='university-location'
                                type="text"
                                placeholder='Arizona, United States'
                                onChange={(e) => handleChange('universityLocation', e.target.value)}
                                style={{
                                    border: getInputStyles(educationFormErrors.universityLocation)
                                }}
                                defaultValue={EducationContext.universityLocation}
                            />
                            <p
                                className='builder__info'
                                style={{
                                    color: getInputFeedbackStyles(educationFormErrors.universityLocation)
                                }}
                            >
                                {educationFormErrors.universityLocation}
                            </p>
                        </div>
                    </div>
                    <div className="builder__container--main">
                        <div className="builder__container">
                            <label htmlFor="degree" className="builder__label">Enter your degree</label>
                            <input
                                className='builder__input'
                                id='degree' name='degree'
                                type="text"
                                placeholder='Bachelors of Technology'
                                onChange={(e) => handleChange('degree', e.target.value)}
                                style={{
                                    border: getInputStyles(educationFormErrors.degree)
                                }}
                                defaultValue={EducationContext.degree}
                            />
                            <p
                                className='builder__info'
                                style={{
                                    color: getInputFeedbackStyles(educationFormErrors.degree)
                                }}
                            >
                                {educationFormErrors.degree}
                            </p>
                        </div>
                    </div>
                    <div className="builder__container--main">
                        <div className="builder__container">
                            <label htmlFor="degree-end-date" className="builder__label">Enter your graduation date (approx)</label>
                            <input
                                className='builder__input'
                                id='degree-end-date'
                                name='degree-end-date'
                                type="date"
                                onChange={(e) => handleChange('degreeEndDate', e.target.value)}
                                style={{
                                    border: getInputStyles(educationFormErrors.degreeEndDate)
                                }}
                                defaultValue={EducationContext.degreeEndDate}
                            />
                            <p
                                className='builder__info'
                                style={{
                                    color: getInputFeedbackStyles(educationFormErrors.degreeEndDate)
                                }}
                            >
                                {educationFormErrors.degreeEndDate}
                            </p>
                        </div>
                    </div>
                    <div className="builder__container--main">
                        <div className="indent--container">
                            <label htmlFor="degree-major" className="builder__label">Enter your major</label>
                            <input
                                className='builder__input'
                                id='degree-major'
                                name='degree-major'
                                type="text"
                                placeholder='Major in Computer Science and Engineering'
                                onChange={(e) => handleChange('degreeMajor', e.target.value)}
                                style={{
                                    border: getInputStyles(educationFormErrors.degreeMajor)
                                }}
                                defaultValue={EducationContext.degreeMajor}
                            />
                            <p
                                className='builder__info'
                                style={{
                                    color: getInputFeedbackStyles(educationFormErrors.degreeMajor)
                                }}
                            >
                                {educationFormErrors.degreeMajor}
                            </p>
                        </div>
                    </div>
                    <div className="builder__container--main">
                        <div className="indent--container">
                            <label htmlFor="cgpa" className="builder__label">Enter your cgpa (out of 10)</label>
                            <input
                                className='builder__input'
                                id='cgpa'
                                name='cgpa'
                                type="number"
                                step='.01'
                                placeholder='8.70'
                                onChange={(e) => handleChange('cgpa', e.target.value)}
                                style={{
                                    border: getInputStyles(educationFormErrors.cgpa)
                                }}
                                defaultValue={EducationContext.cgpa}
                            />
                            <p
                                className='builder__info'
                                style={{
                                    color: getInputFeedbackStyles(educationFormErrors.cgpa + '')
                                }}
                            >
                                {educationFormErrors.cgpa}
                            </p>
                        </div>
                    </div>

                    <div className="builder__container--main">
                        <div className="builder__container--indent">
                            <div className="indent--container">
                                <InputBuilder
                                    inputType='text'
                                    inputPlaceholder='Data Structures and Algorithms'
                                    inputLabel='Enter Relevant courseworks'
                                    title='Relevant Courses'
                                    dynamicList={EducationContext?.relevantCourses}
                                    setDynamicList={EducationContext?.setRelevantCourses}
                                    maxSize={MAX_RELEVANT_COURSES}
                                    validationSchema={relevantCoursesSchema}
                                    onValidationChange={setValidationErrors}
                                />
                            </div>
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