//CORE REACT IMPORTS
import { type JSX, useContext, useRef } from 'react';

//COMPONENTS
import Divider from '../components/resume-form/Divider.tsx';

//CONTEXTS
import { UserContext } from '../contexts/UserContext';

//UTILS
import { dateConvert } from '../utils/DateConvert.ts';

//ASSETS AND STYLES
import linkIcon from '../assets/link.svg';
import whatsappIcon from '../assets/whatsapp.svg'
import '../styles/Result.css'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Result(): JSX.Element {

    const generalData = useContext(UserContext)?.GeneralContextType;
    const educationData = useContext(UserContext)?.EducationContextType;
    const workData = useContext(UserContext)?.WorkContextType;
    const projectsData = useContext(UserContext)?.ProjectContextType;
    const additionalData = useContext(UserContext)?.AdditionalContextType;

    const resumeRef = useRef<HTMLDivElement>(null);


    async function generatePDFWithLinks(): Promise<void> {
        const element = document.querySelector('.resume__container') as HTMLElement;
        if (!element) {
            return;
        }
        const canvas = await html2canvas(element, { scale: 4 });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        const container = resumeRef.current;
        if (!container) return;

        const links = container.querySelectorAll<HTMLAnchorElement>('a[href]');

        links.forEach(link => {
            const rect = link.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            // Position relative to the container
            const x = ((rect.left - containerRect.left) / container.offsetWidth) * pdfWidth;
            const y = ((rect.top - containerRect.top) / container.offsetHeight) * pdfHeight;
            const w = (rect.width / container.offsetWidth) * pdfWidth;
            const h = (rect.height / container.offsetHeight) * pdfHeight;

            pdf.link(x, y, w, h, { url: link.href });
        });

        pdf.save('resume.pdf');
    }


    return (
        <div className='result__container'>
            <div className="result__container--info">
                <h1 className='result__hero'>Your resume is all set and ready to go. Good luck!</h1>
                <p className="result__instruction">Before printing the file, please disable headers and footers in your print settings for a cleaner result.</p>
            </div>
            <div className="resume__container" ref={resumeRef}>
                <div className="link__container">
                    <h1 className='name__heading'>{generalData?.name}</h1>
                    {generalData?.portfolioLink ? <a href={generalData.portfolioLink} target='_blank'><img src={linkIcon} alt="A globe icon." width={12} /></a> : null}
                </div>
                <div className="contacts__container">
                    <div className="link__container">
                        <p className="phone__paragraph general__data">{generalData?.phoneNumber}</p>
                        {generalData?.whatsappLink ? <a href={generalData.whatsappLink} target='_blank'><img src={whatsappIcon} alt="A globe icon." width={12} /></a> : null}
                    </div>
                    <p className="location__paragraph general__data">{generalData?.address}</p>
                    <p className="email__paragraph general__data">{generalData?.email}</p>
                </div>

                <Divider title='Education' />

                <div className="university-info__container">
                    <h1 className='university__name main__data'>{educationData?.university}</h1>
                    <p className="university__location general__data">{educationData?.universityLocation}</p>
                </div>
                <div className="university__container">
                    <p className='university__mdegree general__data'>{educationData?.degree}</p>
                    <p className="university__end-date general__data">{dateConvert(educationData?.degreeEndDate)}</p>
                </div>
                <div className="university-details__container">
                    <p className="university__major general__data">{educationData?.degreeMajor}</p>
                    <p className='university__cgpa general__data'>Cumulative GPA: <strong>{educationData?.cgpa}</strong>/10</p>
                    <p className="university__coursework general__data">Relevant Coursework: {educationData?.relevantCourses.map((ele) => ele.value).join(', ')}</p>
                </div>

                <Divider title='Work Experience' />

                <div className="work-info__container">
                    <h3 className='work-info__name main__data'>{workData?.work}</h3>
                    <p className='work-info__location general__data'>{workData?.workLocation}</p>
                </div>
                <div className="work-details__container">
                    <p className='work-details__position general__data'>{workData?.workPosition}</p>
                    <p className="work-details__duration general__data">{dateConvert(workData?.workStartDate)} - {dateConvert(workData?.workEndDate)}</p>
                </div>
                <div className="work-details__responsibilities">
                    {workData?.responsibilities.map((ele) => {
                        return (
                            <li>
                                <ul className='work__details general__data'>{ele.value}</ul>
                            </li>
                        )
                    })}
                </div>

                <Divider title='University Projects' />

                <div className="main-project-info__container">
                    <div className='link__container'>
                        <h3 className='main-project__name main__data'>{projectsData?.mainProjectTitle}</h3>
                        {<a href={projectsData?.mainProjectLink} target='_blank'><img src={linkIcon} alt="A globe icon." width={12} /></a>}
                    </div>
                    <p className='main-project__end-date general__data'>{dateConvert(projectsData?.mainProjectEndDate)}</p>
                </div>
                <div className="main-project-details__container">
                    {projectsData?.mainProjectDetails.map((ele) => {
                        return (
                            <li>
                                <ul className='project__details general__data'>{ele.value}</ul>
                            </li>
                        )
                    })}
                </div>

                <div className="side-project-info__container">
                    <div className='link__container'>
                        <h3 className='side-project__name main__data'>{projectsData?.sideProjectTitle}</h3>
                        {<a href={projectsData?.sideProjectLink} target='_blank'><img src={linkIcon} alt="A globe icon." width={12} /></a>}
                    </div>
                    <p className='side-project__end-date general__data'>{dateConvert(projectsData?.sideProjectEndDate)}</p>
                </div>
                <div className="side-project-details__container">
                    {projectsData?.sideProjectDetails.map((ele) => {
                        return (
                            <li>
                                <ul className='project__details general__data'>{ele.value}</ul>
                            </li>
                        )
                    })}
                </div>

                <Divider title='Additional' />

                <div className="skills__container general__data">
                    <strong>Technical Skills: </strong>{additionalData?.skills.map((ele) => ele.value).join(', ')}
                </div>
                <div className="languages__container general__data">
                    <strong>Languages </strong>{additionalData?.languages.map((ele) => ele.value).join(', ')}
                </div>
                <div className="certifications-training__container general__data">
                    <strong>Certifications: </strong>{additionalData?.certifications.map((ele) => ele.value).join(', ')}
                </div>
                <div className="awards__container general__data">
                    <strong>Awards: </strong>{additionalData?.awards.map((ele) => ele.value).join(', ')}
                </div>
            </div>
            <div className="download__container">
                <button className='btn__download' onClick={generatePDFWithLinks}>Download</button>
            </div>
        </div>
    )

}