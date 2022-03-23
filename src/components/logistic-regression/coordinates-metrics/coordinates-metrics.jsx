import { useEffect } from "react";

import setMetricsBoard from '../../../helpers/linear-regression/setMetricsBoard';
import calculateError from "../../../helpers/linear-regression/calculateError";

import style from './coordinates-metrics.module.sass';

const CoordinatesMetrics = ({ algorithmData }) => {

    useEffect(() => {
        setTimeout(() => setMetricsBoard(), 1000);
    }, []);

    return (
        <div
        className={style['coordinates-metrics']}
        id='coordinates-metrics'
        >
            <p>W1: { (algorithmData.w1 !== null && algorithmData.w1 !== undefined) ? Number(algorithmData.w1).toFixed(8) : '-' }</p>
            <p>W0: { (algorithmData.w0 !== null && algorithmData.w0 !== undefined) ? Number(algorithmData.w0).toFixed(8) : '-' }</p>
            <p>eta: { Number(algorithmData.eta) }</p>
            <p>Error: { calculateError(algorithmData) === 2 ? '-' : Number(calculateError(algorithmData)).toFixed(8) }</p>
        </div>
    )
}

export default CoordinatesMetrics;