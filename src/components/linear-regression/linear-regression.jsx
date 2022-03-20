import { useEffect, useState } from 'react';

import CoordinatesMetrics from './coordinates-metrics/coordinates-metrics';
import CoordinatesTabs from './coordinate-tabs/coordinate-tabs';
import CoordinatesPlane from './coordinates-plane/coordinates-plane';
import ControlPlane from './control-plane/control-plane';

import style from './linear-regression.module.sass';
import GradientPlane from './gradient-plane/gradient-plane';

const LinearRegression = () => {

    const [algorithmData, setAlgorithmData] = useState({
        loss_hist: [],
        gradient_hist: [],
        w1_hist: [],
        minError: 1,
        eta: 0.0001,
    });
    const [coordinatePlaneSvg, setCoordinatePlaneSvg] = useState(null);
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {    
        return () => {
            setAlgorithmData({});
            setCoordinatePlaneSvg(null);
            setSelectedTab(0);
        };
    }, []);

    return (
        <div
        className={style.container}
        id='linear-regression'
        >
            <CoordinatesMetrics
            algorithmData={algorithmData}
            ></CoordinatesMetrics>
            <CoordinatesTabs
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            ></CoordinatesTabs>
            <CoordinatesPlane
            selectedTabIndex={selectedTab}
            ></CoordinatesPlane>
            <GradientPlane
            selectedTabIndex={selectedTab}
            ></GradientPlane>
            <ControlPlane
            setAlgorithmData={setAlgorithmData}
            coordinatePlaneSvg={coordinatePlaneSvg}
            setCoordinatePlaneSvg={setCoordinatePlaneSvg}
            ></ControlPlane>
        </div>
    )
}


export default LinearRegression;