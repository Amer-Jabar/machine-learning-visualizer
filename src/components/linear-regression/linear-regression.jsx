import { useEffect, useState } from 'react';

import getRandomCoeffs from '../../helpers/linear-regression/getRandomCoeffs';
import getRandomData from '../../helpers/linear-regression/getRandomData';
import executeAlgorithm from '../../helpers/linear-regression/executeAlgorithm';
import initializeGraph from '../../helpers/linear-regression/initializeGraph';
import scatterPlot from '../../helpers/linear-regression/scatterPlot';
import calculateLine from '../../helpers/linear-regression/calculateLine';
import createLine from '../../helpers/linear-regression/createLine';
import calculateError from '../../helpers/linear-regression/calculateError';
import clearAllGraphs from '../../helpers/linear-regression/clearAllGraphs';

import style from './linear-regression.module.sass';

const EPOCH_STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 50, 100, 500, 1000, 10000];
const LEARNING_RATE = [0.001, 0.0005, 0.0001, 0.00005, 0.00001, 0.000005, 0.000001];
const ERROR_LIMITS = [1, 0.5, 0.1, 0.05, 0.01, 0.005, 0.001, 0.0005, 0.0001, 0.00005, 0.00001, 0.000005, 0.000001, 0.0000005, 0.0000001, 0.00000005, 0.00000001];
const BASE_ALGORITHM_DATA = {
    loss_hist: [],
    gradient_hist: [],
    w1_hist: [],
    eta: 0.001,
}

const LinearRegression = () => {

    const [algorithmData, setAlgorithmData] = useState({
        loss_hist: [],
        gradient_hist: [],
        w1_hist: [],
        eta: 0.001,
    });
    const allDataExists = algorithmData.x && algorithmData.y && algorithmData.eta;
    const [iterations, setIterations] = useState(0);
    const [svg, setSvg] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            const metrics = document.querySelector('#coordinates-metrics');
            const { top, left } = document.querySelector('#control-plane').getClientRects()[0];
    
            metrics.style.top = `${top}px`;
            metrics.style.left = `${left - 175}px`;
        }, 1000);
    })

    return (
        <div className={style.container}>
            <div
            className={style['coordinates-metrics']}
            id='coordinates-metrics'
            >
                <p>W1: { algorithmData.w1 ? Number(algorithmData.w1).toFixed(8) : '-' }</p>
                <p>W0: { algorithmData.w0 ? Number(algorithmData.w0).toFixed(8) : '-' }</p>
                <p>eta: { Number(algorithmData.eta) }</p>
            </div>
            <section
            id='coordinates-plane'
            className={style['coordinates-plane']}>
                <svg className={'style.coordinates-plane-svg'}></svg>
            </section>
            <section
            className={style['control-plane']}
            id='control-plane'
            >
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
                    .then(randomData => {
                        if ( svg ) {
                            clearAllGraphs(svg);

                            const { mergedData, containerHeight } = initializeGraph(randomData);
                            scatterPlot(mergedData, containerHeight, 500);
                        } else {
                            const { mergedData, svgEl, containerHeight } = initializeGraph(randomData);
                            scatterPlot(mergedData, containerHeight, 500);
                            setSvg(svgEl);
                        }

                        setAlgorithmData({
                            ...algorithmData,
                            ...randomData
                        });
                    })
                    .catch(err => console.log(err))
                }}
                >Get Random Data</button>
                <button
                style={
                    algorithmData.w1 && algorithmData.w0 ? {
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
                <div className={style['control-plane-coeff-container']}>
                    <label>Request Epochs: </label>
                    <select
                    className={style['control-plane-coeff-selector']}
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
                <div className={style['control-plane-coeff-container']}>
                    <label>Learning Rate: </label>
                    <select
                    className={style['control-plane-coeff-selector']}
                    onChange={e => setAlgorithmData({
                        ...algorithmData,
                        eta: Number(e.target.value)
                    })}
                    value={ algorithmData.eta }
                    >
                        { LEARNING_RATE.map((eta, index) => <option value={eta} key={index}>{eta}</option>) }
                    </select>
                </div>
                <div className={style['control-plane-coeff-container']}>
                    <label>Minimum Error: </label>
                    <select
                    className={style['control-plane-coeff-selector']}
                    onChange={e => setAlgorithmData({
                        ...algorithmData,
                        minError: Number(e.target.value)
                    })}
                    value={ algorithmData.minError }
                    >
                        { ERROR_LIMITS.map((error, index) => <option value={error} key={index}>{error}</option>) }
                    </select>
                </div>
                <button
                disabled={ !allDataExists }
                style={
                    algorithmData?.loss_hist?.length > 0 ? {
                        background: 'aliceblue',
                        border: 'solid 1px #5a8da9'
                    } : {
                        background: ''
                    }
                }
                onClick={() => {
                    executeAlgorithm(algorithmData, setAlgorithmData)
                    .then(newAlgorithmData => setAlgorithmData(newAlgorithmData))
                    .finally(() => {
                        setIterations(iterations + 1);

                        const { x1, x2, y1, y2 } = calculateLine(algorithmData);
                        createLine(svg, { x1, x2, y1, y2 });
                    });
                }}
                >Run Algorithm</button>
                
                <div className={style['control-plane-status']}>
                    <div className={style['control-plane-status-button-group']}>
                        <button
                        disabled={ !allDataExists }
                        style={
                            allDataExists ? {
                                'background': '#bcf8ce',
                                'border': 'solid 1px #6fba86'
                            } : {}
                        }
                        onClick={() => {
                            let algorithmDataClone = algorithmData;
                            let iterationsClone = iterations;

                            const { mergedData, svgEl, containerHeight } = initializeGraph(algorithmData);
                            scatterPlot(mergedData, containerHeight, 0);
                            setSvg(svgEl);

                            const recursiveFetches = async (minError) => {
                                algorithmDataClone = await executeAlgorithm(algorithmDataClone);
                                iterationsClone += (algorithmData.epochs || 1);
                                const { x1, x2, y1, y2 } = calculateLine(algorithmDataClone);
                                createLine(svgEl, { x1, x2, y1, y2 });
        
                                setIterations(iterationsClone);
                                setAlgorithmData(algorithmDataClone);
                                
                                const mustContinue = calculateError(algorithmDataClone) > minError;
                                if ( !mustContinue ) return;

                                return recursiveFetches(minError);
                            }
                            
                            recursiveFetches(algorithmData.minError);
                        }}>Start</button>
                    </div>
                    <div className={style['control-plane-metrics']}>
                        <div className={style['control-plane-metrics-component']}><label>Epoch:</label><p>+{ iterations }</p></div>
                        <div className={style['control-plane-metrics-component']}>
                            <label>Loss:</label>
                            <p>-{
                                algorithmData?.loss_hist?.length > 0
                                ? Number(algorithmData?.loss_hist[algorithmData?.loss_hist?.length - 1]).toFixed(8)
                                : 'Nothing yet'
                            }</p>
                        </div>
                    </div>
                </div>

                <button
                id='clear-value-button'
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
                    clearAllGraphs(svg)

                    setAlgorithmData(BASE_ALGORITHM_DATA);
                    setIterations(0);
                }}>Clear Values</button>
            </section>
        </div>
    )
}


export default LinearRegression;