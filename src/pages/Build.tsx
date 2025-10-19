//CORE REACT IMPORTS
import { useContext, type JSX } from 'react';

//COMPONENTS
import General from '../components/resume-form/General.tsx';
import Education from '../components/resume-form/Education.tsx';
import Work from '../components/resume-form/Work.tsx';
import Projects from '../components/resume-form/Projects.tsx';
import Additional from '../components/resume-form/Additional.tsx';

//CONTEXTS
import { FormContext } from '../contexts/FormContext.ts';

//ASSETS AND STYLES
import '../styles/Build.css';

export default function Build(): JSX.Element {

    const currentForm = useContext(FormContext)?.currentForm + '';

    function getCurrentForm(): JSX.Element {

        if (currentForm === 'general') {
            return <General />
        }
        else if (currentForm === 'education') {
            return <Education />
        }
        else if (currentForm === 'work') {
            return <Work />
        }
        else if (currentForm === 'university projects') {
            return <Projects />
        }
        return <Additional />

    }



    return (
        <main className="container">
            <div className="builder">
                {getCurrentForm()}
            </div >
        </main>
    )

}