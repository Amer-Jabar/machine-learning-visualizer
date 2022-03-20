import { useEffect, useState } from "react";

import style from './welcome-header.module.sass';

const WelcomeHeader = ({ show }) => {

    const [showState, setShowState] = useState(false);

    useEffect(() => {
        setTimeout(() => setShowState(show), 500);

        return () => setShowState(false);
    }, [show])

    return (
        <h1
        className={style['welcome-header']}
        id="welcome-header"
        style={{
            opacity: showState ? 1 : 0
        }}
        >
            Welcome To <span>Machine Learning</span> Visualizer
        </h1>
    )
}

export default WelcomeHeader;