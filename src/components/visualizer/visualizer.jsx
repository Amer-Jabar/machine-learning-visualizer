import { useEffect, useState } from 'react';

import WelcomeHeader from './welcome-header/welcome-header';
import Navbar from './navbar/navbar';
import LinearRegression from '../linear-regression/linear-regression.jsx';

import style from './visualizer.module.sass';

const Visualizer = () => {

    const [algorithm, setAlgorithm] = useState(null);
    const [currentElementId, setCurrentElementId] = useState('welcome-header');

    useEffect(() => {
        setAlgorithm('welcome-header');
        setCurrentElementId('welcome-header');

        return () => {
            setAlgorithm(null);
            setCurrentElementId(null);
        }
    }, []);

    const RenderedAlgorithm = () => {
        if ( algorithm === 'linear-regression' ) {
            setCurrentElementId('linear-regression');
            return <LinearRegression></LinearRegression>
        } else if ( algorithm === 'welcome-header' ) {
            setCurrentElementId('welcome-header');
            return (
                <WelcomeHeader
                show={ algorithm === 'welcome-header' }
                ></WelcomeHeader>
            )
        }
        
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