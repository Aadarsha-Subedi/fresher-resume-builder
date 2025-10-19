//UTILS
import { nameSchema, portfolioLinkSchema, addressSchema, phoneSchema, whatsAppLinkSchema, emailSchema, universitySchema, universityLocationSchema, degreeSchema, degreeEndDateSchema, degreeMajorSchema, relevantCoursesSchema, workSchema, workLocationSchema, workPositionSchema, workStartDateSchema, workEndDateSchema, projectTitleSchema, projectLinkSchema, projectEndDateSchema, cgpaStringSchema } from './Schema';

export function validateName(value: string): string {

    const result = nameSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓ Valid name';

}
export function validatePortfolioLink(value: string): string {

    const result = portfolioLinkSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓ Valid portfolio link';

}
export function validateAddress(value: string): string {

    const result = addressSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓';

}
export function validatePhone(value: string): string {

    const result = phoneSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓ Valid phone number';

}
export function validateWhatsappLink(value: string): string {

    const result = whatsAppLinkSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓ Valid Whatsapp link';

}
export function validateEmail(value: string): string {

    const result = emailSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓ Valid email';

}
export function validateUniversity(value: string): string {

    const result = universitySchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓';

}

export function validateUniversityLocation(value: string): string {

    const result = universityLocationSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓';

}
export function validateDegree(value: string): string {

    const result = degreeSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓';

}
export function validateDegreeEndDate(value: string): string {

    const result = degreeEndDateSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓';

}
export function validateDegreeMajor(value: string): string {

    const result = degreeMajorSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓';

}
export function validateCgpa(value: string): string {

    const result = cgpaStringSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓ Valid cgpa';

}
export function validateRelevantCourses(value: string): string {

    const result = relevantCoursesSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓ Valid courses';

}
export function validateWork(value: string): string {

    const result = workSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓';

}
export function validateWorkLocation(value: string): string {

    const result = workLocationSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓';

}
export function validateWorkPosition(value: string): string {

    const result = workPositionSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓';

}
export function validateWorkStartDate(value: string): string {

    const result = workStartDateSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓';

}
export function validateWorkEndDate(value: string): string {

    const result = workEndDateSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓';

}
export function validateMainProjectTitle(value: string): string {

    const result = projectTitleSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓';

}
export function validateMainProjectLink(value: string): string {

    const result = projectLinkSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓';

}
export function validateMainProjectEndDate(value: string): string {

    const result = projectEndDateSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓';

}
export function validateSideProjectTitle(value: string): string {

    const result = projectTitleSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓';

}
export function validateSideProjectLink(value: string): string {

    const result = projectLinkSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓';

}
export function validateSideProjectEndDate(value: string): string {

    const result = projectEndDateSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues[0].message;;
    }

    return '✓';

}

export function getInputStyles(errorField: string): string {

    if (!errorField) {
        return '3px solid var(--neutral-400)'
    }
    else if (!errorField.startsWith('✓')) {
        return '3px solid var(--accent--error-600)'
    }
    return '3px solid var(--accent--success-600)'

}

export function getInputFeedbackStyles(errorField: string): string {
    if (!errorField) {
        return 'inherit'
    }
    else if (!errorField.startsWith('✓')) {
        return 'var(--accent--error-600)'
    }
    return 'var(--accent--success-600)'
}

