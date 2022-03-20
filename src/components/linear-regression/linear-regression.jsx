import { useEffect, useState } from 'react';

import CoordinatesMetrics from './coordinates-metrics/coordinates-metrics';
import CoordinatesPlane from './coordinates-plane/coordinates-plane';
import ControlPlane from './control-plane/control-plane';

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

    useEffect(() => {
        
        const setCoordinateTabs = () => {
            const metrics = document.querySelector('#coordinates-metrics');
            const tabsContainer = document.querySelector('#coordinate-tabs');

            const { top, left } = metrics.getClientRects()[0];
            tabsContainer.style.top = `${top}px`;
            tabsContainer.style.left = `${left - tabsContainer.clientWidth - 50}px`;
        }

        setTimeout(() => setCoordinateTabs(), 2000);

        return () => setSvg(null);
    }, []);

    return (
        <div
        className={style.container}
        id='linear-regression'
        >
            <CoordinatesMetrics
            algorithmData={algorithmData}
            ></CoordinatesMetrics>
            <div
            style={{
                position: 'absolute'
            }}
            id='coordinate-tabs'>
                <img
                src='images/linear-regression/scatterplot.png'
                alt="scatterplot icon"
                />
                <img
                src='images/linear-regression/linechart.png'
                alt="linechart icon"
                />
                <img
                src='images/linear-regression/loss.png'
                alt="loss icon"
                />
            </div>
            <CoordinatesPlane></CoordinatesPlane>
            <ControlPlane
            setAlgorithmData={setAlgorithmData}
            svg={svg}
            setSvg={setSvg}
            ></ControlPlane>
        </div>
    )
}


export default LinearRegression;