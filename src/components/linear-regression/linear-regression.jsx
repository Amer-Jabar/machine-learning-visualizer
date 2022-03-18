import { useEffect, useState } from 'react';

import getRandomCoeffs from '../../helpers/linear-regression/getRandomCoeffs';
import getRandomData from '../../helpers/linear-regression/getRandomData';
import executeAlgorithm from '../../helpers/linear-regression/executeAlgorithm';
import initializeGraph from '../../helpers/linear-regression/initializeGraph';
import scatterPlot from '../../helpers/linear-regression/scatterPlot';
import calculateLine from '../../helpers/linear-regression/calculateLine';

import style from './linear-regression.module.sass';
import createLine from '../../helpers/linear-regression/createLine';


const LinearRegression = () => {

    const EPOCH_STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 50, 100, 500, 1000, 10000];

    const [algorithmData, setAlgorithmData] = useState({
        loss_hist: [],
        gradient_hist: [],
        w1_hist: [],
    });
    const allDataExists = algorithmData.x && algorithmData.y && algorithmData.eta;
    const [iterations, setIterations] = useState(0);
    const [svg, setSvg] = useState(null);

    return (
        <div className={style.container}>
            <section
            id='coordinates-plane'
            className={style['coordinates-plane']}>
                <svg
                className={'style.coordinates-plane-svg'}>
                    <text x="25" y="25">W1: { algorithmData.w1 ? Number(algorithmData.w1).toFixed(8) : '-' }</text>
                    <text x="150" y="25">W0: { algorithmData.w0 ? Number(algorithmData.w0).toFixed(8) : '-' }</text>
                </svg>
            </section>
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

                        const { mergedData, svgEl, containerHeight } = initializeGraph(algorithmData);
                        scatterPlot(svgEl, mergedData, containerHeight, 500);
                        const { x1, x2, y1, y2 } = calculateLine(algorithmData);
                        createLine(svgEl, { x1, x2, y1, y2 });

                        setSvg(svgEl);
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
                            scatterPlot(svgEl, mergedData, containerHeight, 500);

                            const recursiveFetches = async () => {
                                algorithmDataClone = await executeAlgorithm(algorithmDataClone);
                                iterationsClone += (algorithmData.epochs || 1);
                                const { x1, x2, y1, y2 } = calculateLine(algorithmDataClone);
                                createLine(svgEl, { x1, x2, y1, y2 });
        
                                setIterations(iterationsClone);
                                setAlgorithmData(algorithmDataClone);

                                let lastSample = algorithmDataClone.loss_hist.pop();
                                if ( lastSample < 30 ) return;

                                return recursiveFetches();
                            }
                            
                            recursiveFetches();
                        }}>Start</button>
                    </div>
                    <div className={style['control-plane-metrics']}>
                        <div className={style['control-plane-metrics-component']}><label>Epoch:</label><p>+{ iterations }</p></div>
                        <div className={style['control-plane-metrics-component']}>
                            <label>Loss:</label>
                            <p>-{
                                algorithmData.loss_hist.length > 0
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
                    // svg.selectAll('circle').remove()
                    // svg.selectAll('line').remove()

                    // setAlgorithmData({});
                    // setIterations(0);
                    throw new Error()
                }}>Clear Values</button>
            </section>
        </div>
    )
}


export default LinearRegression;