import { useEffect, useState } from "react";

import style from './welcome-header.module.sass';

const WelcomeHeader = ({ show }) => {

    const [showState, setShowState] = useState(false);

    useEffect(() => setTimeout(() => setShowState(true), 500), [])
    useEffect(() => {}, [showState])

    return (
        <h1
        className={style['welcome-header']}
        id="welcome-header"
        style={{
            opacity: showState ? 1 : 0
        }}
        >Welcome To Machine Learning Visualizer</h1>
    )
}

export default WelcomeHeader;