import { useEffect, useState } from 'react';

import ControlPlane from './control-plane/control-plane';
import CoordinatesMetrics from './coordinates-metrics/coordinates-metrics';

import style from './linear-regression.module.sass';

const LinearRegression = () => {

    const [algorithmData, setAlgorithmData] = useState({
        loss_hist: [],
        gradient_hist: [],
        w1_hist: [],
        minError: 1,
        eta: 0.0001,
    });
    const [svg, setSvg] = useState(null);

    useEffect(() => () => setSvg(null), []);

    return (
        <div
        className={style.container}
        id='linear-regression'
        >
            <CoordinatesMetrics
            algorithmData={algorithmData}
            ></CoordinatesMetrics>
            <div></div>
            <section
            id='coordinates-plane'
            className={style['coordinates-plane']}>
                <svg className={'style.coordinates-plane-svg'}></svg>
            </section>
            <ControlPlane
            setAlgorithmData={setAlgorithmData}
            svg={svg}
            setSvg={setSvg}
            ></ControlPlane>
        </div>
    )
}


export default LinearRegression;