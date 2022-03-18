import { useEffect, useState } from 'react';

import './spinner.component.scss';

export const CLOSING_INTERVAL = 3000;
const SPINNER_TRANSITION_DURATION = 500;

const Spinner = () => {
    const [localLoader, setLocalLoader] = useState(false);

    useEffect(() => setLocalLoader(true), [])
    setTimeout(() => setLocalLoader(false), CLOSING_INTERVAL - SPINNER_TRANSITION_DURATION);

    return (
        <div className='spinner-container'
        style={{ opacity: localLoader ? 1 : 0 }}>
            <div className='infinity'>
                <div>
                    <span></span>
                </div>
                <div>
                    <span></span>
                </div>
                <div>
                    <span></span>
                </div>
            </div>
        </div>
    )
}


export default Spinner;