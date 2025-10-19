//CORE REACT IMPORTS
import React, { type JSX, useContext, useState } from 'react';

//THIRD PARTY IMPORTS
import { toast } from 'sonner';

//CONTEXTS
import { UserContext, type GeneralDataType } from '../../contexts/UserContext.ts';
import { FormContext } from '../../contexts/FormContext.ts';

//UTILS
import { forms } from '../../utils/FormList.ts';
import { getPrevForm, getNextForm } from '../../utils/UpdateForms.ts';
import { getInputFeedbackStyles, getInputStyles, validateAddress, validateEmail, validateName, validatePhone, validatePortfolioLink, validateWhatsappLink } from '../../utils/Validators.ts';

export default function General(): JSX.Element {

    const [generalFormErrors, setGeneralFormErrors] = useState<GeneralDataType>({
        name: '',
        portfolioLink: '',
        address: '',
        phoneNumber: '',
        whatsappLink: '',
        email: ''
    })

    const GeneralContext = useContext(UserContext)?.GeneralContextType;
    const currentForm = useContext(FormContext)?.currentForm + '';
    const setCurrentForm = useContext(FormContext)?.setCurrentForm;

    const isFinalForm = forms.indexOf(currentForm) === forms.length - 1;

    if (GeneralContext === undefined) {
        return (
            <p>Loading....</p>
        )
    }

    function updateGeneralData(formData: FormData): boolean {

        const userName: string = formData.get('name') as string;
        const userPortfolioLink: string = formData.get('portfolio-link') as string;
        const userAddress: string = formData.get('address') as string;
        const userPhoneNumber: string = formData.get('phone-number') as string;
        const userWhatsappLink: string = formData.get('whatsapp-link') as string;
        const userEmail: string = formData.get('email') as string;

        GeneralContext?.setName(userName);
        GeneralContext?.setPortfolioLink(userPortfolioLink);
        GeneralContext?.setAddress(userAddress);
        GeneralContext?.setPhoneNumber(userPhoneNumber);
        GeneralContext?.setWhatsappLink(userWhatsappLink);
        GeneralContext?.setEmail(userEmail);

        const newErrors = {
            name: validateName(userName),
            portfolioLink: validatePortfolioLink(userPortfolioLink),
            address: validateAddress(userAddress),
            phoneNumber: validatePhone(userPhoneNumber),
            whatsappLink: validateWhatsappLink(userWhatsappLink),
            email: validateEmail(userEmail)
        }
        setGeneralFormErrors(newErrors);

        const allValid = Object.values(newErrors).every(error => error.startsWith('✓'))

        if(allValid) {
            return true;
        }
        return false;

    }

    function handleChange(field: string, value: string): void {

        let errorMessage: string = '';

        switch (field) {
            case 'name':
                errorMessage = validateName(value);
                break;
            case 'portfolioLink':
                errorMessage = validatePortfolioLink(value);
                break;
            case 'address':
                errorMessage = validateAddress(value);
                break;
            case 'phoneNumber':
                errorMessage = validatePhone(value);
                break;
            case 'whatsappLink':
                errorMessage = validateWhatsappLink(value);
                break;
            case 'email':
                errorMessage = validateEmail(value);
                break;
            default:
                break;
        }

        setGeneralFormErrors(prevGeneralFormErrors => ({
            ...prevGeneralFormErrors,
            [field]: errorMessage
        }));

    }

    function handlePreviousForm(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();
        getPrevForm(setCurrentForm, currentForm, forms);

    }

    function handleNextForm(e: React.FormEvent<HTMLFormElement>): string | number | undefined {

        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (updateGeneralData(formData)) {
            getNextForm(setCurrentForm, currentForm, forms);
        }
        else {
            return toast.error('Please fill the given form first.');
        }
    }

    return (
        <>
            <h2 className="form__heading">
                General Information
            </h2>
            <form onSubmit={handleNextForm}>
                <div className='builder__form'>
                    <div className="builder__container--main">
                        <label className='builder__label' htmlFor="name">Enter your name</label>
                        <input
                            className='builder__input'
                            id='name'
                            name='name'
                            type="text"
                            placeholder='John Smith'
                            onChange={(e) => handleChange('name', e.target.value)}
                            style={{
                                border: getInputStyles(generalFormErrors.name)
                            }}
                            defaultValue={GeneralContext.name}
                        />
                        <p
                            className='builder__info'
                            style={{
                                color: getInputFeedbackStyles(generalFormErrors.name)
                            }}
                        >
                            {generalFormErrors.name}
                        </p>
                    </div>
                    <div className="builder__container--main">
                        <div className="builder--container--helper">
                            <label className='builder__label' htmlFor="portfolio-link">Enter your personal website link (optional)</label>
                            <input
                                className='builder__input'
                                id='portfolio-link'
                                name='portfolio-link'
                                type="text"
                                placeholder='John-Smith-portfolio.com'
                                onChange={(e) => handleChange('portfolioLink', e.target.value)}
                                style={{
                                    border: getInputStyles(generalFormErrors.portfolioLink ?? '')
                                }}
                                defaultValue={GeneralContext.portfolioLink}
                            />
                            <p
                                className='builder__info'
                                style={{
                                    color: getInputFeedbackStyles(generalFormErrors.portfolioLink ?? '')
                                }}
                            >
                                {generalFormErrors.portfolioLink}
                            </p>
                        </div>
                    </div>
                    <div className="builder--container--main">
                        <div className="builder__container">
                            <label className='builder__label' htmlFor="address">Enter your address</label>
                            <input
                                className='builder__input'
                                id='address'
                                name='address'
                                type="text"
                                onChange={(e) => handleChange('address', e.target.value)}
                                placeholder='New York, USA'
                                style={{
                                    border: getInputStyles(generalFormErrors.address)
                                }}
                                defaultValue={GeneralContext.address}
                            />
                            <p
                                className='builder__info'
                                style={{
                                    color: getInputFeedbackStyles(generalFormErrors.address)
                                }}
                            >
                                {generalFormErrors.address}
                            </p>
                        </div>
                    </div>
                    <div className="builder__container--main">
                        <div className="builder__container">
                            <label className='builder__label' htmlFor="phone-number">Enter your phone number</label>
                            <input
                                className='builder__input'
                                id='phone-number'
                                name='phone-number'
                                type="tel"
                                placeholder='+91 5641334556'
                                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                                style={{
                                    border: getInputStyles(generalFormErrors.phoneNumber)
                                }}
                                defaultValue={GeneralContext.phoneNumber}
                            />
                            <p
                                className='builder__info'
                                style={{
                                    color: getInputFeedbackStyles(generalFormErrors.phoneNumber)
                                }}
                            >
                                {generalFormErrors.phoneNumber}
                            </p>
                        </div>
                    </div>
                    <div className="builder__container--main">
                        <div className="builder--container--helper">
                            <label className='builder__label' htmlFor="whatsapp-link">Enter your phone number connected to WhatsApp. If you dont have one, create one at <a className='builder__number--link' href="https://create.wa.link/" target='_blank'>WaLink</a> (optional)</label>
                            <input
                                className='builder__input'
                                id='whatsapp-link'
                                name='whatsapp-link'
                                type="text"
                                placeholder='wa.link/vc34er'
                                onChange={(e) => handleChange('whatsappLink', e.target.value)}
                                style={{
                                    border: getInputStyles(generalFormErrors.whatsappLink ?? '')
                                }}
                                defaultValue={GeneralContext.whatsappLink}
                            />
                            <p
                                className='builder__info'
                                style={{
                                    color: getInputFeedbackStyles(generalFormErrors.whatsappLink ?? '')
                                }}
                            >
                                {generalFormErrors.whatsappLink}
                            </p>
                        </div>
                    </div>
                    <div className="builder__container--main">
                        <div className="builder__container">
                            <label htmlFor="email" className="builder__label">Enter your email address</label>
                            <input
                                className='builder__input'
                                id='email'
                                name='email'
                                type="email"
                                placeholder='JohnSmith@gmail.com'
                                onChange={(e) => handleChange('email', e.target.value)}
                                style={{
                                    border: getInputStyles(generalFormErrors.email)
                                }}
                                defaultValue={GeneralContext.email}
                            />
                            <p
                                className='builder__info'
                                style={{
                                    color: getInputFeedbackStyles(generalFormErrors.email)
                                }}
                            >
                                {generalFormErrors.email}
                            </p>
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
                                className='builder__btn builder__btn--next'
                            >
                                {isFinalForm ? 'Create My Resume' : 'Next'}
                            </button>
                        )
                    }
                </div>
            </form>
        </>
    )
}
