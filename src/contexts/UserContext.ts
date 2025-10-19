//CORE REACT IMPORTS
import { createContext, type Dispatch, type SetStateAction } from 'react';

export interface GeneralContextType {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    portfolioLink: string | undefined;
    setPortfolioLink: Dispatch<SetStateAction<string | undefined>>;
    address: string;
    setAddress: Dispatch<SetStateAction<string>>;
    phoneNumber: string;
    setPhoneNumber: Dispatch<SetStateAction<string>>;
    whatsappLink: string | undefined;
    setWhatsappLink: Dispatch<SetStateAction<string | undefined>>;
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
}
export type GeneralDataType = Pick<GeneralContextType, 'name' | 'portfolioLink' | 'address' | 'phoneNumber' | 'whatsappLink' | 'email'>


export interface EducationContextType {
    university: string;
    setUniversity: Dispatch<SetStateAction<string>>;
    universityLocation: string;
    setUniversityLocation: Dispatch<SetStateAction<string>>;
    degree: string;
    setDegree: Dispatch<SetStateAction<string>>;
    degreeEndDate: string;
    setDegreeEndDate: Dispatch<SetStateAction<string>>;
    degreeMajor: string;
    setDegreeMajor: Dispatch<SetStateAction<string>>;
    cgpa: string;
    setCgpa: Dispatch<SetStateAction<string>>;
    relevantCourses: {id: string, value: string}[];
    setRelevantCourses: Dispatch<SetStateAction<{id: string, value: string}[]>>;
}
export type EducationDataType = Pick<EducationContextType, 'university' | 'universityLocation' | 'degree' | 'degreeEndDate' | 'degreeMajor' | 'cgpa'>



export interface WorkContextType {
    work: string;
    setWork: Dispatch<SetStateAction<string>>;
    workLocation: string;
    setWorkLocation: Dispatch<SetStateAction<string>>;
    workPosition: string;
    setWorkPosition: Dispatch<SetStateAction<string>>;
    workStartDate: string;
    setWorkStartDate: Dispatch<SetStateAction<string>>;
    workEndDate: string;
    setWorkEndDate: Dispatch<SetStateAction<string>>;
    responsibilities:{id: string, value: string}[];
    setResponsibilities: Dispatch<SetStateAction<{id: string, value: string}[]>>;
}
export type WorkDataType = Pick<WorkContextType, 'work' | 'workLocation' | 'workPosition' | 'workStartDate' | 'workEndDate'>

export interface ProjectContextType {
    mainProjectTitle: string;
    setMainProjectTitle: Dispatch<SetStateAction<string>>;
    mainProjectLink: string | undefined;
    setMainProjectLink: Dispatch<SetStateAction<string | undefined>>;
    mainProjectEndDate: string;
    setMainProjectEndDate: Dispatch<SetStateAction<string>>;
    mainProjectDetails: {id: string, value: string}[];
    setMainProjectDetails: Dispatch<SetStateAction<{id: string, value: string}[]>>;
    sideProjectTitle: string;
    setSideProjectTitle: Dispatch<SetStateAction<string>>;
    sideProjectLink: string | undefined;
    setSideProjectLink: Dispatch<SetStateAction<string | undefined>>;
    sideProjectEndDate: string;
    setSideProjectEndDate: Dispatch<SetStateAction<string>>;
    sideProjectDetails: {id: string, value: string}[];
    setSideProjectDetails: Dispatch<SetStateAction<{id: string, value: string}[]>>;
}
export type ProjectDataType = Pick<ProjectContextType, 'mainProjectTitle' | 'mainProjectLink' | 'mainProjectEndDate' | 
'sideProjectTitle' | 'sideProjectLink' | 'sideProjectEndDate'>

export interface AdditionalContextType {
    skills: {id: string, value: string}[];
    setSkills: Dispatch<SetStateAction<{id: string, value: string}[]>>;
    languages: {id: string, value: string}[];
    setLanguages: Dispatch<SetStateAction<{id: string, value: string}[]>>;
    certifications: {id: string, value: string}[];
    setCertifications: Dispatch<SetStateAction<{id: string, value: string}[]>>;
    awards: {id: string, value: string}[];
    setAwards: Dispatch<SetStateAction<{id: string, value: string}[]>>;
}

export interface UserContextType {
    GeneralContextType: GeneralContextType,
    EducationContextType: EducationContextType,
    WorkContextType: WorkContextType,
    ProjectContextType: ProjectContextType,
    AdditionalContextType: AdditionalContextType
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
