import { useState } from 'react';

import Navbar from './navbar/navbar';
import LinearRegression from '../linear-regression/linear-regression.jsx';

import style from './visualizer.module.sass';

const resetAlgorithm = (setAlgorithm, algorithmName) => {
    setAlgorithm('');
    setAlgorithm(algorithmName);
}

const Visualizer = () => {

    const [algorithm, setAlgorithm] = useState(null);

    const RenderedAlgorithm = () => {
        if ( algorithm === 'linear-regression' )
            return (
                <LinearRegression
                resetAlgorithm={() => resetAlgorithm(setAlgorithm, 'linear-regression')}
                ></LinearRegression>
            )
        
        return <></>
    }

    return (
        <div className={style.visualizer}>
            <Navbar
            setAlgorithm={setAlgorithm}
            ></Navbar>
            <RenderedAlgorithm></RenderedAlgorithm>
        </div>
    )
}

export default Visualizer;