//CORE REACT IMPORTS
import { type ReactNode, type JSX, useState } from 'react';

//INTERFACES
import { UserContext, type GeneralContextType, type EducationContextType, type WorkContextType, type ProjectContextType, type AdditionalContextType } from './UserContext';
import { defaultAwards, defaultCertifications, defaultLanguages, defaultMainProjectDetails, defaultRelevantCourse, defaultResponsibilites, defaultSideProjectDetails, defaultSkills } from '../utils/DefaultValues';

interface UserProviderProps {
    children: ReactNode
}

export default function UserProvider({ children }: UserProviderProps): JSX.Element {

    const [name, setName] = useState<string>('');
    const [portfolioLink, setPortfolioLink] = useState<string | undefined>(undefined);
    const [address, setAddress] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [whatsappLink, setWhatsappLink] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string>('');
    const generalDataFormat: GeneralContextType = {
        name,
        setName,
        portfolioLink,
        setPortfolioLink,
        address,
        setAddress,
        phoneNumber,
        setPhoneNumber,
        whatsappLink,
        setWhatsappLink,
        email,
        setEmail
    }

    const [university, setUniversity] = useState<string>('');
    const [universityLocation, setUniversityLocation] = useState<string>('');
    const [degree, setDegree] = useState<string>('');
    const [degreeEndDate, setDegreeEndDate] = useState<string>('');
    const [degreeMajor, setDegreeMajor] = useState<string>('');
    const [cgpa, setCgpa] = useState<string>('');
    const [relevantCourses, setRelevantCourses] = useState<{id: string, value: string}[]>(defaultRelevantCourse);
    const educationDataFormat: EducationContextType = {
        university,
        setUniversity,
        universityLocation,
        setUniversityLocation,
        degree,
        setDegree,
        degreeEndDate,
        setDegreeEndDate,
        degreeMajor,
        setDegreeMajor,
        cgpa,
        setCgpa,
        relevantCourses,
        setRelevantCourses
    }

    const [work, setWork] = useState<string>('');
    const [workLocation, setWorkLocation] = useState<string>('');
    const [workPosition, setWorkPosition] = useState<string>('');
    const [workStartDate, setWorkStartDate] = useState<string>('');
    const [workEndDate, setWorkEndDate] = useState<string>('');
    const [responsibilities, setResponsibilities] = useState<{id: string, value: string}[]>(defaultResponsibilites)
    const workDataFormat: WorkContextType = {
        work,
        setWork,
        workLocation, setWorkLocation,
        workPosition,
        setWorkPosition,
        workStartDate,
        setWorkStartDate,
        workEndDate,
        setWorkEndDate,
        responsibilities,
        setResponsibilities
    }

    const [mainProjectTitle, setMainProjectTitle] = useState<string>('');
    const [mainProjectLink, setMainProjectLink] = useState<string | undefined>('');
    const [mainProjectEndDate, setMainProjectEndDate] = useState<string>('');
    const [mainProjectDetails, setMainProjectDetails] = useState<{id: string, value: string}[]>(defaultMainProjectDetails);
    const [sideProjectTitle, setSideProjectTitle] = useState<string>('');
    const [sideProjectLink, setSideProjectLink] = useState<string | undefined>('');
    const [sideProjectEndDate, setSideProjectEndDate] = useState<string>('');
    const [sideProjectDetails, setSideProjectDetails] = useState<{id: string, value: string}[]>(defaultSideProjectDetails);
    const projectDataFormat: ProjectContextType = {
        mainProjectTitle,
        setMainProjectTitle,
        mainProjectLink,
        setMainProjectLink,
        mainProjectEndDate,
        setMainProjectEndDate,
        mainProjectDetails,
        setMainProjectDetails,
        sideProjectTitle,
        setSideProjectTitle,
        sideProjectLink,
        setSideProjectLink,
        sideProjectEndDate,
        setSideProjectEndDate,
        sideProjectDetails,
        setSideProjectDetails
    }

    const [skills, setSkills] = useState<{id: string, value: string}[]>(defaultSkills)
    const [languages, setLanguages] = useState<{id: string, value: string}[]>(defaultLanguages);
    const [certifications, setCertifications] = useState<{id: string, value: string}[]>(defaultCertifications);
    const [awards, setAwards] = useState<{id: string, value: string}[]>(defaultAwards)
    const additionalDataFormat: AdditionalContextType = {
        skills,
        setSkills,
        languages,
        setLanguages,
        certifications,
        setCertifications,
        awards,
        setAwards
    }


    return (
        <UserContext.Provider
            value=
            {{
                GeneralContextType: generalDataFormat,
                EducationContextType: educationDataFormat,
                WorkContextType: workDataFormat,
                ProjectContextType: projectDataFormat,
                AdditionalContextType: additionalDataFormat
            }}
        >
            {children}
        </UserContext.Provider>
    )

}