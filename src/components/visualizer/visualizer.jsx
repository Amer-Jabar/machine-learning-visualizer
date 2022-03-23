import { useEffect, useState } from 'react';

import WelcomeHeader from './welcome-header/welcome-header';
import Navbar from './navbar/navbar';
import LinearRegression from '../linear-regression/linear-regression.jsx';

import style from './visualizer.module.sass';
import LogisticRegression from '../logistic-regression/logistic-regression';

const Visualizer = () => {

    const [algorithm, setAlgorithm] = useState('welcome-header');
    const [currentElementId, setCurrentElementId] = useState('welcome-header');

    useEffect(() => {
        let mounted = true;

        if ( mounted ) {
            setAlgorithm('welcome-header');
            setCurrentElementId('welcome-header');
        }

        return () => mounted = false;
    }, []);
    useEffect(() => setCurrentElementId(algorithm), [algorithm]);

    const RenderedAlgorithm = () => {
        if ( algorithm === 'linear-regression' )
            return <LinearRegression key={1}></LinearRegression>
        else if ( algorithm === 'logistic-regression' )
            return <LogisticRegression key={2}></LogisticRegression>
        else if ( algorithm === 'welcome-header' )
            return (
                <WelcomeHeader
                key={0}
                show={ algorithm === 'welcome-header' }
                ></WelcomeHeader>
            )
        
        return <></>
    }

    return (
        <div
        className={style.visualizer}
        style={ currentElementId === 'welcome-header' ? {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        } : {} }
        >
            <Navbar
            setAlgorithm={setAlgorithm}
            currentAlgorithm={algorithm}
            currentElementId={currentElementId}
            ></Navbar>
            <RenderedAlgorithm></RenderedAlgorithm>
        </div>
    )
}

export default Visualizer;