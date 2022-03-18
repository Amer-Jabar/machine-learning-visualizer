import { useState } from 'react';

import style from './linear-regression.module.sass';

const LinearRegression = () => {

    const EPOCH_STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 50, 100, 500, 1000];

    const [algorithmData, setAlgorithmData] = useState({});
    console.log(algorithmData);

    return (
        <div className={style.container}>
            <section className={style['coordinates-plane']}></section>
            <section className={style['control-plane']}>
                <button>Get Random Data</button>
                <button>Initialized Random Coeffecients</button>
                <div className={style['control-plane-epoch-container']}>
                    <label>Epochs: </label>
                    <select 
                    className={style['control-plane-epoch-selector']}
                    name="epoch-selector" 
                    id="epoch-selector"
                    onChange={e => setAlgorithmData({
                        epochs: e.target.value
                    })}
                    >
                        { EPOCH_STEPS.map((step_size, index) => <option value={step_size} key={index}>{step_size}</option>) }
                    </select>
                </div>
                <button>Run Algorithm</button>
                <button>Show Results</button>
            </section>
        </div>
    )
}


export default LinearRegression;