//CORE REACT IMPORTS
import { useContext, useState, type JSX } from 'react';

//THIRD PARTY IMPORTS
import { toast } from 'sonner';

//COMPONENT
import InputBuilder from './InputBuilder.tsx';

//CONTEXTS
import { UserContext, type ProjectDataType } from '../../contexts/UserContext.ts';
import { FormContext } from '../../contexts/FormContext.ts';

//UTILITIES
import { MAX_MAIN_PROJECT_DETAILS, MAX_SIDE_PROJECT_DETAILS } from '../../utils/DefaultValues.ts';
import { getNextForm, getPrevForm } from '../../utils/UpdateForms.ts';
import { forms } from '../../utils/FormList.ts';
import { getInputFeedbackStyles, getInputStyles, validateMainProjectEndDate, validateMainProjectLink, validateMainProjectTitle, validateSideProjectEndDate, validateSideProjectLink, validateSideProjectTitle } from '../../utils/Validators.ts';
import { projectDetailsSchema } from '../../utils/Schema.ts';

export default function Projects(): JSX.Element {

    const ProjectsContext = useContext(UserContext)?.ProjectContextType;
    const currentForm = useContext(FormContext)?.currentForm + '';
    const setCurrentForm = useContext(FormContext)?.setCurrentForm;

    const isFinalForm = forms.indexOf(currentForm) === forms.length - 1;

    const [_, setValidationErrors] = useState({});
    const [mainProjectDetailErrors, ] = useState([]);
    const [sideProjectDetailErrors, ] = useState([]);
    const [projectsFormErrors, setProjectsFormErrors] = useState<ProjectDataType>({
        mainProjectTitle: '',
        mainProjectLink: '',
        mainProjectEndDate: '',
        sideProjectTitle: '',
        sideProjectLink: '',
        sideProjectEndDate: '',
    })



    if (ProjectsContext === undefined) {
        return (
            <p>Loading....</p>
        )
    }

    function handlePreviousForm(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();
        getPrevForm(setCurrentForm, currentForm, forms);
    }

    function handleNextForm(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (updateProjectsData(formData)) {
            getNextForm(setCurrentForm, currentForm, forms);
        }
    }

    function updateProjectsData(formData: FormData): boolean {

        const mainProjectTitle: string = formData.get('main-project-title') as string;
        const mainProjectLink: string = formData.get('main-project-link') as string;
        const mainProjectEndDate: string = formData.get('main-project-end-date') as string;
        const sideProjectTitle: string = formData.get('side-project-title') as string;
        const sideProjectLink: string = formData.get('side-project-link') as string;
        const sideProjectEndDate: string = formData.get('side-project-end-date') as string;

        ProjectsContext?.setMainProjectTitle(mainProjectTitle);
        ProjectsContext?.setMainProjectLink(mainProjectLink);
        ProjectsContext?.setMainProjectEndDate(mainProjectEndDate);
        ProjectsContext?.setSideProjectTitle(sideProjectTitle);
        ProjectsContext?.setSideProjectLink(sideProjectLink);
        ProjectsContext?.setSideProjectEndDate(sideProjectEndDate);

        const newErrors = {
            mainProjectTitle: validateMainProjectTitle(mainProjectTitle),
            mainProjectLink: validateMainProjectLink(mainProjectLink),
            mainProjectEndDate: validateMainProjectEndDate(mainProjectEndDate),
            sideProjectTitle: validateSideProjectTitle(sideProjectTitle),
            sideProjectLink: validateSideProjectLink(sideProjectLink),
            sideProjectEndDate: validateSideProjectEndDate(sideProjectEndDate),
        }
        setProjectsFormErrors(newErrors);

        // Validate all fields including relevant courses
        const allFieldsValid = Object.values(newErrors).every(error => error.startsWith('✓'));

        // Check if relevant courses are valid
        const allMainProjectDetailsValid = Object.values(mainProjectDetailErrors).every(error => error === '');
        const allSideProjectDetailsValid = Object.values(sideProjectDetailErrors).every(error => error === '');
        const hasAtLeastOneProjectDetail = ProjectsContext && ProjectsContext?.mainProjectDetails.length > 0 && ProjectsContext?.sideProjectDetails.length > 0 &&
            ProjectsContext?.mainProjectDetails.every(c => c.value.trim() !== '') && ProjectsContext?.sideProjectDetails.every(c => c.value.trim() !== '');

        if (allFieldsValid && allMainProjectDetailsValid && allSideProjectDetailsValid && hasAtLeastOneProjectDetail) {
            return true;
        }

        if (!hasAtLeastOneProjectDetail) {
            toast.error('Please add at least one project detail.');
        }

        return false;



        return true;

    }

    function handleChange(field: string, value: string): void {

        let errorMessage: string = '';

        setProjectsFormErrors(prevGeneralFormErrors => ({
            ...prevGeneralFormErrors,
            [field]: errorMessage
        }));

        switch (field) {
            case 'mainProjectTitle':
                errorMessage = validateMainProjectTitle(value);
                break;
            case 'mainProjectLink':
                errorMessage = validateMainProjectLink(value);
                break;
            case 'mainProjectEndDate':
                errorMessage = validateMainProjectEndDate(value);
                break;
            case 'sideProjectTitle':
                errorMessage = validateSideProjectTitle(value);
                break;
            case 'sideProjectLink':
                errorMessage = validateSideProjectLink(value);
                break;
            case 'sideProjectEndDate':
                errorMessage = validateSideProjectEndDate(value);
                break;
            default:
                break;
        }

        setProjectsFormErrors(prevGeneralFormErrors => ({
            ...prevGeneralFormErrors,
            [field]: errorMessage
        }));

    }

    return (
        <>
            <h2 className="form__heading">
                Projects Information
            </h2>
            <form onSubmit={handleNextForm}>
                <div className='builder__form'>
                    <div className="builder__container--main">
                        <div className="builder__container">
                            <label htmlFor="main-project-title" className="builder__label">Enter your main project title</label>
                            <input
                                className='builder__input'
                                onChange={(e) => handleChange('mainProjectTitle', e.target.value)}
                                style={{
                                    border: getInputStyles(projectsFormErrors.mainProjectTitle)
                                }}
                                id='main-project-title'
                                name='main-project-title'
                                type="text"
                                placeholder='Employee Management System'
                                defaultValue={ProjectsContext.mainProjectTitle}
                            />
                            <p
                                className='builder__info'
                                style={{
                                    color: getInputFeedbackStyles(projectsFormErrors.mainProjectTitle)
                                }}
                            >
                                {projectsFormErrors.mainProjectTitle}
                            </p>
                        </div>
                    </div>
                    <div className="builder__container--main">
                        <div className="builder--container--helper">
                            <label className='builder__label' htmlFor="main-project-link">Enter your main project live link (optional)</label>
                            <input className='builder__input' onChange={(e) => handleChange('mainProjectLink', e.target.value)}
                                style={{
                                    border: getInputStyles(projectsFormErrors.mainProjectLink ?? '')
                                }} id='main-project-link' name='main-project-link' type="text" placeholder='ems-dev.vercel.app'
                                defaultValue={ProjectsContext.mainProjectLink}
                            />
                            <p
                                className='builder__info'
                                style={{
                                    color: getInputFeedbackStyles(projectsFormErrors.mainProjectLink ?? '')
                                }}
                            >
                                {projectsFormErrors.mainProjectLink}
                            </p>
                        </div>
                    </div>
                    <div className="builder__container--main">
                        <div className="builder__container">
                            <label htmlFor="main-project-end-date" className="builder__label">Enter your main project completion date</label>
                            <input className='builder__input' onChange={(e) => handleChange('mainProjectEndDate', e.target.value)}
                                style={{
                                    border: getInputStyles(projectsFormErrors.mainProjectEndDate)
                                }} id='main-project-end-date' name='main-project-end-date' type="date"
                                defaultValue={ProjectsContext.mainProjectEndDate}
                            />
                            <p
                                className='builder__info'
                                style={{
                                    color: getInputFeedbackStyles(projectsFormErrors.mainProjectEndDate)
                                }}
                            >
                                {projectsFormErrors.mainProjectEndDate}
                            </p>
                        </div>
                    </div>
                    <div className="builder__container--main">
                        <div className="builder__container">
                            <InputBuilder
                                title='Main Project Details'
                                inputType='text'
                                inputPlaceholder='Designed and implemented a movie recommendation application'
                                inputLabel='Your main project details'
                                dynamicList={ProjectsContext.mainProjectDetails}
                                setDynamicList={ProjectsContext.setMainProjectDetails}
                                maxSize={MAX_MAIN_PROJECT_DETAILS}
                                validationSchema={projectDetailsSchema}
                                onValidationChange={setValidationErrors}
                            />
                        </div>
                    </div>
                    <div className="builder__container--main">
                        <div className="builder__container">
                            <label htmlFor="side-project-title" className="builder__label">Enter your side project title</label>
                            <input className='builder__input' onChange={(e) => handleChange('sideProjectTitle', e.target.value)}
                                style={{
                                    border: getInputStyles(projectsFormErrors.sideProjectTitle)
                                }} id='side-project-title' name='side-project-title' type="text" placeholder='Fresher Resume Builder'
                                defaultValue={ProjectsContext.sideProjectTitle}
                            />
                            <p
                                className='builder__info'
                                style={{
                                    color: getInputFeedbackStyles(projectsFormErrors.sideProjectTitle)
                                }}
                            >
                                {projectsFormErrors.sideProjectTitle}
                            </p>
                        </div>
                    </div>
                    <div className="builder__conatiner--main">
                        <div className="builder--container--helper">
                            <label className='builder__label' htmlFor="side-project-link">Enter your side project live link (optional)</label>
                            <input className='builder__input' onChange={(e) => handleChange('sideProjectLink', e.target.value)}
                                style={{
                                    border: getInputStyles(projectsFormErrors.sideProjectLink ?? '')
                                }} id='side-project-link' name='side-project-link' type="text" placeholder='resume-builder.dev.vercel.app'
                                defaultValue={ProjectsContext.sideProjectLink}
                            />
                            <p
                                className='builder__info'
                                style={{
                                    color: getInputFeedbackStyles(projectsFormErrors.sideProjectLink ?? '')
                                }}
                            >
                                {projectsFormErrors.sideProjectLink}
                            </p>
                        </div>
                    </div>
                    <div className="builder__container--main">
                        <div className="builder__container">
                            <label htmlFor="side-project-end-date" className="builder__label">Enter your side project completion date</label>
                            <input className='builder__input' onChange={(e) => handleChange('sideProjectEndDate', e.target.value)}
                                style={{
                                    border: getInputStyles(projectsFormErrors.sideProjectEndDate)
                                }} id='side-project-end-date' name='side-project-end-date' type="date"
                                defaultValue={ProjectsContext.sideProjectEndDate}
                            />
                            <p
                                className='builder__info'
                                style={{
                                    color: getInputFeedbackStyles(projectsFormErrors.sideProjectEndDate)
                                }}
                            >
                                {projectsFormErrors.sideProjectEndDate}
                            </p>
                        </div>
                    </div>
                    <div className="builder__container--main">
                        <div className="builder__container">
                            <InputBuilder
                            title='Side Project Details'
                            inputType='text'
                            inputPlaceholder='Designed and implemented Unix-based operating system'
                            inputLabel='Enter your side project details'
                            dynamicList={ProjectsContext.sideProjectDetails}
                            setDynamicList={ProjectsContext.setSideProjectDetails} maxSize={MAX_SIDE_PROJECT_DETAILS} />
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