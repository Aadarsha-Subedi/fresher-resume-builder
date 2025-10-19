//THIRD PARTY IMPORTS
import z from 'zod';

const strictUrlRegex = /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
const alphabetCommaNumberSpaceRegex = /^[a-zA-Z0-9,\s]+$/;
const alphabetSpaceRegex = /^[a-zA-Z\s]+$/;
const alphabetNumberRegex = /^[a-zA-Z0-9]+$/;
const alphabetSpaceNumberRegex = /^[a-zA-Z0-9\s]+$/;
const alphabetSpaceCommaRegex = /^[a-zA-Z,\s]+$/;
const looseRegex = /^[a-zA-Z0-9,!@#$%^&*\s]+$/


export const nameSchema = z
    .string()
    .trim()
    .regex(alphabetSpaceRegex, 'Name can only contain alphabets and spaces')
    .min(1, 'Name is required')
    .max(40, 'Name cannot be more than 35 characters')
    .transform((val: string) => {
        return val.trim().replace(/\s+/g, ' ');
    })
    .refine((val: string) => val.length >= 2, 'Name must be atleast 2 characters')

export const addressSchema = z
    .string()
    .trim()
    .regex(alphabetCommaNumberSpaceRegex, 'Address can only contain alphabets, commans, numbers and spaces')
    .min(1, 'Address is required')
    .max(100, 'Address cannot be more than 100 characters')
    .transform((val: string) => val.trim().replace(/\s+/g, ' '))
    .refine((val: string) => val.length >= 5, 'Address must be at least 5 characters');

export const phoneSchema = z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .regex(
        /^\+\d{1,3}\s?\d{6,14}$/,
        'Phone must start with country code (e.g., +91 1234567890)'
    )
    .transform((val: string) => val.trim().replace(/\s+/g, ' '));

export const emailSchema = z
    .string()
    .trim()
    .min(1, 'Email is required')
    .max(60, 'Email cannot be more than 40 characters.')
    .email('Invalid email format');

export const portfolioLinkSchema = z
    .string()
    .trim()
    .max(100, 'Links cannot be more than 100 characters.')
    .refine((val) => val === '' || strictUrlRegex.test(val), {
        message: 'Portfolio link must start with http:// or https:// and be a valid URL',
    })
    .optional()
    .or(z.literal(''));

export const whatsAppLinkSchema = z
    .string()
    .trim()
    .max(100, 'Links cannot be more than 100 characters.')
    .refine(
        (val) => {
            if (!val || val === '') return true; // Allow empty
            // Must start with http:// or https:// and be a valid wa.link or wa.me URL
            return /^https?:\/\/(wa\.link\/[a-zA-Z0-9]+|wa\.me\/\d+|api\.whatsapp\.com\/send)/i.test(val);
        },
        {
            message:
                'WhatsApp link must start with http:// or https:// and be in format wa.link/xxx, https://wa.me/1234567890, or api.whatsapp.com/send',
        }
    )
    .optional()
    .or(z.literal(''));

// ===== EDUCATION SCHEMAS =====

export const universitySchema = z
    .string()
    .trim()
    .regex(alphabetSpaceRegex, 'University name can only contain alphabets and spaces')
    .min(1, 'University name is required')
    .max(150, 'University name cannot exceed 150 characters')
    .transform((val: string) => val.trim().replace(/\s+/g, ' '))
    .refine((val: string) => val.length >= 2, 'University name must be at least 2 characters');

export const universityLocationSchema = z
    .string()
    .trim()
    .regex(alphabetSpaceCommaRegex, 'University name can only contain alphabets, numbers, commas and spaces')
    .min(1, 'University location is required')
    .max(150, 'University location cannot exceed 150 characters')
    .transform((val: string) => val.trim().replace(/\s+/g, ' '))
    .refine((val: string) => val.length >= 2, 'Location must be at least 2 characters');

export const degreeSchema = z
    .string()
    .trim()
    .regex(alphabetSpaceRegex, 'Degree name can only contain alphabets and spaces')
    .min(1, 'Degree is required')
    .max(100, 'Degree cannot exceed 100 characters')
    .transform((val: string) => val.trim().replace(/\s+/g, ' '))
    .refine((val: string) => val.length >= 2, 'Degree must be at least 2 characters');

export const degreeEndDateSchema = z
    .string()
    .trim()
    .min(1, 'Date is required')

// Or if you're using string dates:
export const degreeEndDateStringSchema = z
    .string()
    .trim()
    .min(1, 'Degree end date is required')

export const degreeMajorSchema = z
    .string()
    .trim()
    .regex(alphabetSpaceRegex, 'Degree Major can only contain letters and spaces')
    .min(1, 'Major is required')
    .max(100, 'Major cannot exceed 100 characters')
    .transform((val: string) => val.trim().replace(/\s+/g, ' '))
    .refine((val: string) => val.length >= 2, 'Major must be at least 2 characters');

// Or if CGPA is a string input:
export const cgpaStringSchema = z
    .string()
    .trim()
    .min(1, 'CGPA is required')
    .regex(/^\d+(\.\d{1,2})?$/, 'CGPA must be a valid number with up to 2 decimal places')
    .refine((val) => {
        const num = parseFloat(val);
        return num >= 0 && num <= 10;
    }, 'CGPA must be between 0 and 10');

export const relevantCoursesSchema = z
    .string()
    .trim()
    .min(1, 'Course name cannot be empty')
    .regex(alphabetSpaceNumberRegex, 'Courses can only contain alphabet, numbers and spaces')
    .transform((val: string) => val.trim().replace(/\s+/g, ' '))
    .refine((courses: string) => courses.length >= 2, 'Each course must be at least 2 characters');

// ===== WORK EXPERIENCE SCHEMAS =====

export const workSchema = z
    .string()
    .trim()
    .regex(alphabetCommaNumberSpaceRegex, 'Work company can only contain letters, numbers and spaces')
    .min(1, 'Company name is required')
    .max(100, 'Work company cannot exceed 100 characters')
    .transform((val: string) => val.trim().replace(/\s+/g, ' '))
    .refine((val: string) => val.length >= 2, 'Company name must be at least 2 characters');

export const workLocationSchema = z
    .string()
    .trim()
    .regex(alphabetCommaNumberSpaceRegex, 'Work location can only contain letters, numbers and spaces')
    .min(1, 'Work location is required')
    .max(100, 'Work location cannot exceed 100 characters')
    .transform((val: string) => val.trim().replace(/\s+/g, ' '))
    .refine((val: string) => val.length >= 2, 'Location must be at least 2 characters');

export const workPositionSchema = z
    .string()
    .trim()
    .regex(alphabetCommaNumberSpaceRegex, 'Work position can only contain letters, numbers and spaces')
    .min(1, 'Position is required')
    .max(75, 'Work position cannot exceed 75 characters')
    .transform((val: string) => val.trim().replace(/\s+/g, ' '))
    .refine((val: string) => val.length >= 2, 'Position must be at least 2 characters');

export const workStartDateSchema = z
    .string()
    .trim()
    .min(1, 'Work start date is required');

export const workEndDateSchema = z
    .string()
    .trim()
    .min(1, 'Work end date is required');

export const responsibilitiesSchema = z
    .string()
    .trim()
    .min(1, 'Responsibilities cannot be empty')
    .regex(alphabetSpaceNumberRegex, 'Responsibilities can only contain alphabet, numbers and spaces')
    .transform((val: string) => val.trim().replace(/\s+/g, ' '))
    .refine((courses: string) => courses.length >= 2, 'Each responsibility must be at least 2 characters');

// ===== PROJECT SCHEMAS =====

export const projectTitleSchema = z
    .string()
    .trim()
    .regex(alphabetCommaNumberSpaceRegex, 'Project title can only contain letters, numbers and spaces')
    .min(1, 'Project title is required')
    .max(50, 'Project title cannot exceed 50 characters')
    .transform((val: string) => val.trim().replace(/\s+/g, ' '))
    .refine((val: string) => val.length >= 3, 'Project title must be at least 3 characters');

export const projectLinkSchema = z
    .string()
    .trim()
    .refine((val) => val === '' || strictUrlRegex.test(val), {
        message: 'Project link must start with http:// or https:// and be a valid URL',
    })
    .optional()
    .or(z.literal(''));

export const projectEndDateSchema = z
    .string()
    .trim()
    .min(1, 'Project completion date is required')

export const projectDetailsSchema = z
    .string()
    .trim()
    .regex(looseRegex, 'Special symbols are not allowed.')
    .min(1, 'Project details cannot be empty')
    .transform((val: string) => val.trim().replace(/\s+/g, ' '))
    .refine((courses: string) => courses.length >= 2, 'Each Project detail must be at least 2 characters');

// ===== ADDITIONAL FIELDS SCHEMAS =====

export const skillsSchema = z
    .string()
    .trim()
    .min(1, 'Skills cannot be empty')
    .regex(alphabetNumberRegex, 'Skills can only contain alphabets and numbers')
    .transform((val: string) => val.trim().replace(/\s+/g, ' '))
    .refine((courses: string) => courses.length >= 2, 'Each skill must be at least 2 characters');

export const languagesSchema = z
    .string()
    .trim()
    .min(1, 'Languages cannot be empty')
    .regex(alphabetNumberRegex, 'Languages can only contain alphabets and numbers')
    .transform((val: string) => val.trim().replace(/\s+/g, ' '))
    .refine((courses: string) => courses.length >= 2, 'Each language must be at least 2 characters');

export const certificationsSchema = z
    .string()
    .trim()
    .min(1, 'Skills cannot be empty')
    .regex(looseRegex, 'Certifications cannot contain special symbols')
    .transform((val: string) => val.trim().replace(/\s+/g, ' '))
    .refine((courses: string) => courses.length >= 2, 'Each certification must be at least 2 characters');

export const awardsSchema = z
    .string()
    .trim()
    .min(1, 'Awards cannot be empty')
    .regex(looseRegex, 'Awards cannot contain special symbols')
    .transform((val: string) => val.trim().replace(/\s+/g, ' '))
    .refine((courses: string) => courses.length >= 2, 'Each award must be at least 2 characters');