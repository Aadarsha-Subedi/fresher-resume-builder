//CORE REACT IMPORTS
import type { JSX } from 'react';

interface DividerProps {
    title: string
}

export default function Divider({ title }: DividerProps): JSX.Element {

    return (
        <>
            <div className="heading__container">
                <h3 className='builder__heading'>{title}</h3>
            </div>
        </>
    )

}