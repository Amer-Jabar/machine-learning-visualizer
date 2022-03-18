import { useState } from 'react';

import getRandomCoeffs from '../../helpers/linear-regression/getRandomCoeffs';
import getRandomData from '../../helpers/linear-regression/getRandomData';
import runAlgorithm from '../../helpers/linear-regression/runAlgorithm';

import style from './linear-regression.module.sass';

const LinearRegression = () => {

    const EPOCH_STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 50, 100, 500, 1000];

    const [algorithmData, setAlgorithmData] = useState({});
    console.log(algorithmData?.loss_hist[algorithmData?.loss_hist?.length - 1])

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
                onClick={() => {
                    let postPayload;
                    if ( !algorithmData.loss_hist || !algorithmData.gradient_hist || !algorithmData.w1_hist )
                        postPayload = {
                            ...algorithmData,
                            loss_hist: [],
                            gradient_hist: [],
                            w1_hist: [],            
                        }
                    else
                        postPayload = {
                            ...algorithmData,
                            epochs: algorithmData.epochs || 1
                        }

                    runAlgorithm(postPayload)
                    .then(result => setAlgorithmData({
                            ...algorithmData,
                            ...result
                        })
                    )
                    .catch(err => console.log(err))
                }}
                >Run Algorithm</button>
                <button>Show Results</button>
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
                onClick={() => setAlgorithmData({})}>Clear Values</button>
            </section>
        </div>
    )
}


export default LinearRegression;