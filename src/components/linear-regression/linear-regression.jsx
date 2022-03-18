import { useState } from 'react';

import getRandomCoeffs from '../../helpers/linear-regression/getRandomCoeffs';
import getRandomData from '../../helpers/linear-regression/getRandomData';
import runAlgorithm from '../../helpers/linear-regression/runAlgorithm';
import executeAlgorithm from '../../helpers/linear-regression/executeAlgorithm';

import style from './linear-regression.module.sass';

const LinearRegression = () => {

    const EPOCH_STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 50, 100, 500, 1000];

    const [algorithmData, setAlgorithmData] = useState({});
    const [iterations, setIterations] = useState(0);
    const [algorithmExecutionIntervalId, setAlgorithmExecutionIntervalId] = useState(-1);
    const allDataExists = algorithmData.x && algorithmData.y && algorithmData.eta;

    return (
        <div className={style.container}>
            <section className={style['coordinates-plane']}></section>
            <section className={style['control-plane']}>
                <button
                style={
                    algorithmData.x ? {
                        background: 'aliceblue',
                        border: 'solid 1px #5a8da9'
                    } : {
                        background: ''
                    }
                }
                onClick={() => {
                    getRandomData()
                    .then(randomData => setAlgorithmData({
                        ...algorithmData,
                        ...randomData
                    }))
                    .catch(err => console.log(err))
                }}
                >Get Random Data</button>
                <button
                style={
                    algorithmData.eta ? {
                        background: 'aliceblue',
                        border: 'solid 1px #5a8da9'
                    } : {
                        background: ''
                    }
                }
                onClick={() => {
                    getRandomCoeffs()
                    .then(randomData => setAlgorithmData({
                        ...algorithmData,
                        ...randomData
                    }))
                    .catch(err => console.log(err))
                }}
                >Initialize Random Coeffecients</button>
                <div className={style['control-plane-epoch-container']}>
                    <label>Epochs: </label>
                    <select
                    className={style['control-plane-epoch-selector']}
                    name="epoch-selector" 
                    id="epoch-selector"
                    onChange={e => setAlgorithmData({
                        ...algorithmData,
                        epochs: Number(e.target.value)
                    })}
                    >
                        { EPOCH_STEPS.map((step_size, index) => <option value={step_size} key={index}>{step_size}</option>) }
                    </select>
                </div>
                <button
                style={
                    algorithmData?.loss_hist?.length > 0 ? {
                        background: 'aliceblue',
                        border: 'solid 1px #5a8da9'
                    } : {
                        background: ''
                    }
                }
                disabled={ !allDataExists }
                onClick={
                    () => executeAlgorithm(algorithmData, setAlgorithmData)
                            .then(newAlgorithmData => setAlgorithmData(newAlgorithmData))
                }
                >Run Algorithm</button>
                
                <div className={style['control-plane-status']}>
                    <div className={style['control-plane-status-button-group']}>
                        <button
                        disabled={ !allDataExists }
                        onClick={() => {
                            if ( algorithmExecutionIntervalId !== -1 )
                            clearInterval(algorithmExecutionIntervalId);
                            
                            let algorithmDataClone = algorithmData;
                            let iterationsClone = iterations;
                            
                            let intervalId = setInterval( async () => {
                                algorithmDataClone = await executeAlgorithm(algorithmDataClone);
                                console.log(iterationsClone);
                                iterationsClone += (algorithmData.epochs || 1);
                                setIterations(iterationsClone);
                                setAlgorithmData(algorithmDataClone);
                            }, 100);
                            setAlgorithmExecutionIntervalId(intervalId);
                            
                        }}>Start</button>
                        <button
                        disabled={ !allDataExists || iterations === 0 }
                        onClick={() => clearInterval(algorithmExecutionIntervalId)}>Pause</button>
                    </div>
                    <div className={style['control-plane-metrics']}>
                        <div className={style['control-plane-metrics-component']}><label>Epoch:</label><p>+{ iterations }</p></div>
                        <div className={style['control-plane-metrics-component']}>
                            <label>Loss:</label>
                            <p>-{
                                algorithmData.loss_hist
                                ? Number(algorithmData.loss_hist[algorithmData.loss_hist.length - 1]).toFixed(8)
                                : 'Nothing yet'
                            }</p>
                        </div>
                    </div>
                </div>

                <button
                className={style['control-plane-clear-values']}
                style={
                    Object.entries(algorithmData)?.length === 0 ? {
                        background: 'aliceblue',
                        border: 'solid 1px #5a8da9'
                    } : {
                        background: ''
                    }
                }
                onClick={() => {
                    clearInterval(algorithmExecutionIntervalId);

                    setAlgorithmData({});
                    setIterations(0);
                    setAlgorithmExecutionIntervalId(-1);
                }}>Clear Values</button>
            </section>
        </div>
    )
}


export default LinearRegression;