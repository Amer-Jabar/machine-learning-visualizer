import { useEffect, useState } from 'react';

import './spinner.component.scss';

const Spinner = ({ loader, closingInterval }) => {

    const SPINNER_TRANSITION_DURATION = 500;

    const [localLoader, setLocalLoader] = useState(loader);

    useEffect(() => setLocalLoader(true), [])
    setTimeout(() => setLocalLoader(false), closingInterval - SPINNER_TRANSITION_DURATION);

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