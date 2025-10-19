//CORE REACT IMPORTS
import type { JSX } from 'react';

//COMPONENTS
import Header from './Header.tsx';
import FormProvider from '../contexts/FormProvider.tsx';
import UserProvider from '../contexts/UserProvider.tsx';


//THIRD PARTY IMPORTS
import { Outlet } from 'react-router-dom';

export default function Layout(): JSX.Element {
    return (
        <>
            <Header />
            <FormProvider>
                <UserProvider>
                    <Outlet />
                </UserProvider>
            </FormProvider>
        </>
    )
}