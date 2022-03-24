import { useEffect, useState } from 'react';

import getRandomCoeffs from '../../../helpers/logistic-regression/getRandomCoeffs';
import getRandomData from '../../../helpers/logistic-regression/getRandomData';
import executeAlgorithm from '../../../helpers/logistic-regression/executeAlgorithm';
import initializeCoordinatePlaneGraph from '../../../helpers/logistic-regression/initializeCoordinatePlaneGraph';
import scatterPlot from '../../../helpers/logistic-regression/scatterPlot';
import initializeLossGraph from '../../../helpers/logistic-regression/initializeLossGraph';
import clearAllGraphs from '../../../helpers/logistic-regression/clearAllGraphs';
import calculateLossLine from '../../../helpers/logistic-regression/calculateLossLine';
import drawLossLine from '../../../helpers/logistic-regression/drawLossLine';
import clearLossLines from '../../../helpers/logistic-regression/clearLossLines'

import style from './control-plane.module.sass';
import calculateError from '../../../helpers/linear-regression/calculateError';
import classifyScatterPlot from '../../../helpers/logistic-regression/classifyScatterPlot';

const LEARNING_RATE = [0.1, 0.01, 0.001, 0.0006, 0.0005, 0.0001, 0.00005, 0.00001, 0.000005, 0.000001];
const ERROR_LIMITS = [0.01, 0.005, 0.001, 0.0005, 0.0001, 0.00005, 0.00001, 0.000005, 0.000001, 0.0000005, 0.0000001, 0.00000005, 0.00000001, 0.000000005, 0.000000001];
const BASE_ALGORITHM_DATA = {
    loss_hist: [],
    eta: 0.01,
    w1: null,
    w0: null,
}

const ControlPlane = ({ setAlgorithmData: setParentsAlgorithmData }) => {
    
    const [algorithmData, setAlgorithmData] = useState(BASE_ALGORITHM_DATA);
    const [coordinatePlaneSvg, setCoordinatePlaneSvg] = useState(null);
    const [lossPlaneSvg, setLossPlaneSvg] = useState(null);
    const [iterations, setIterations] = useState(0);
    const [planesAreBlank, setPlanesAreBlank] = useState(true);
    const [classColors, setClassColors] = useState({
        classA: 'green',
        classB: 'yellow',
    })
    let allDataExists = algorithmData.x && algorithmData.y && algorithmData.eta && algorithmData.w1 !== null && algorithmData.w0 !== null;

    useEffect(() => {
        return () => {
            setAlgorithmData({});
            setCoordinatePlaneSvg(null);
            setIterations(0);
            allDataExists = null;
        }
    }, []);

    return (
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
                    if ( coordinatePlaneSvg && !planesAreBlank ) {
                        clearAllGraphs(coordinatePlaneSvg, lossPlaneSvg, {
                            circle: false, line: true, g: true, lossLine: true,
                        });
                        setIterations(0);
                        setParentsAlgorithmData(BASE_ALGORITHM_DATA);
        
                        const {
                            mergedData,
                            containerWidth,
                            containerHeight,
                            minScaleX,
                            maxScaleX,
                            maxScaleY
                        } = initializeCoordinatePlaneGraph(randomData);
                        
                        scatterPlot(mergedData, containerWidth, containerHeight, minScaleX, maxScaleX, maxScaleY, 0, true);
                        clearLossLines(lossPlaneSvg);
                        const localLossPlaneSvg = initializeLossGraph(lossPlaneSvg);
                        setLossPlaneSvg(localLossPlaneSvg)
                    } else {
                        clearAllGraphs(coordinatePlaneSvg, null, {
                            circle: false, line: true, g: true
                        });
                        const {
                            mergedData,
                            coordinatePlaneSvg: localCoordinatePlaneSvg,
                            containerWidth,
                            containerHeight,
                            minScaleX,
                            maxScaleX,
                            maxScaleY
                        } = initializeCoordinatePlaneGraph(randomData);
                        scatterPlot(mergedData, containerWidth, containerHeight, minScaleX, maxScaleX, maxScaleY, 0, false);
                        setCoordinatePlaneSvg(localCoordinatePlaneSvg);

                        clearLossLines(lossPlaneSvg, true);
                        const localLossPlaneSvg = initializeLossGraph();
                        setLossPlaneSvg(localLossPlaneSvg);
                        setPlanesAreBlank(false);
                    }

                    setAlgorithmData({
                        ...algorithmData,
                        ...randomData,
                        ...BASE_ALGORITHM_DATA,
                    });
                })
                .catch(err => console.log(err))
            }}
            >Get Random Data</button>
            <button
            style={
                (algorithmData.w1 !== null && algorithmData.w1 !== undefined) &&
                (algorithmData.w0 !== null && algorithmData.w0 !== undefined) ? {
                    background: 'aliceblue',
                    border: 'solid 1px #5a8da9'
                } : {
                    background: ''
                }
            }
            onClick={() => {
                getRandomCoeffs()
                .then(randomData => {
                    setAlgorithmData({
                        ...algorithmData,
                        ...randomData
                    });
                    setParentsAlgorithmData({
                        ...algorithmData,
                        ...randomData
                    });
                })
                .catch(err => console.log(err))
            }}
            >Initialize Random Coeffecients</button>
            <div className={style['control-plane-coeff-container']}>
                <label>Learning Rate: </label>
                <select
                className={style['control-plane-coeff-selector']}
                onChange={e => {
                    setAlgorithmData({
                        ...algorithmData,
                        eta: Number(e.target.value)
                    });
                    setParentsAlgorithmData({
                        ...algorithmData,
                        eta: Number(e.target.value)
                    });
                }}
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
                value={ algorithmData.minError || 1 }
                >
                    { ERROR_LIMITS.map((error, index) => <option value={error} key={index}>{error}</option>) }
                </select>
            </div>
            <div className={style['control-plane-coeff-container']}>
                <label>Class 1: </label>
                <input
                type="color"
                className={style['control-plane-color-selector']}
                onChange={e => setClassColors({
                    ...classColors,
                    classA: e.target.value
                })}/>
            </div>
            <div className={style['control-plane-coeff-container']}>
                <label>Class 2: </label>
                <input
                type="color"
                className={style['control-plane-color-selector']}
                onChange={e => setClassColors({
                    ...classColors,
                    classB: e.target.value
                })}/>
            </div>
            <button
            disabled={ !allDataExists }
            style={
                allDataExists ? {
                    background: 'aliceblue',
                    border: 'solid 1px #5a8da9'
                } : {
                    background: ''
                }
            }
            onClick={() => {
                executeAlgorithm(algorithmData, setAlgorithmData)
                .then(newAlgorithmData => {
                    const lossLineDimensions = calculateLossLine(newAlgorithmData, iterations);
                    if ( lossLineDimensions ) {
                        clearLossLines(lossPlaneSvg);
                        drawLossLine(lossLineDimensions)
                    }
                    classifyScatterPlot(coordinatePlaneSvg, newAlgorithmData, classColors);

                    setIterations(iterations + 1);
                    setAlgorithmData(newAlgorithmData);
                    setParentsAlgorithmData(newAlgorithmData);
                })
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
                        let localLossPlaneSvg = lossPlaneSvg;

                        const recursiveFetches = async (minError) => {
                            algorithmDataClone = await executeAlgorithm(algorithmDataClone);
                            iterationsClone++;
                            const lossLineDimensions = calculateLossLine(algorithmDataClone, iterationsClone);
                            if ( lossLineDimensions ) {
                                clearLossLines(localLossPlaneSvg);
                                drawLossLine(lossLineDimensions)
                            }
                            classifyScatterPlot(coordinatePlaneSvg, algorithmDataClone, classColors);

                            setIterations(iterationsClone);
                            setAlgorithmData(algorithmDataClone);
                            setParentsAlgorithmData(algorithmDataClone);        

                            const mustContinue = calculateError(algorithmDataClone) > minError;
                            if ( !mustContinue ) return;

                            return recursiveFetches(minError);
                        }
                        
                        recursiveFetches(algorithmData.minError || 1);
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
                clearAllGraphs(coordinatePlaneSvg, lossPlaneSvg, {
                    circle: true, line: true, g: false, lossLine: true,
                });

                setAlgorithmData(BASE_ALGORITHM_DATA);
                setParentsAlgorithmData(BASE_ALGORITHM_DATA);
                setIterations(0);
                setPlanesAreBlank(true);
            }}>Clear Values</button>
        </section>
    )
}

export default ControlPlane;