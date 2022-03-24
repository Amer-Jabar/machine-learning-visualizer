import { axisBottom, axisLeft, scaleLinear, select } from "d3";

import { shifter } from "./initializeCoordinatePlaneGraph";

const scaleGradientPlane = (containerWidth, containerHeight, gradientPlaneSvg, {
    maxHistoryY, maxHistoryX, minHistoryX,
}) => {

    const localShifter = shifter + (shifter / 2);

    const xScaler = scaleLinear()
        .range([localShifter, containerWidth - localShifter])
        .domain([minHistoryX, maxHistoryX])

    const yScaler = scaleLinear()
        .range([containerHeight - localShifter, localShifter])
        .domain([0, maxHistoryY]);

    gradientPlaneSvg
        .select('#gradient-plane-x-axis')
        .call(axisBottom(xScaler));

    gradientPlaneSvg
        .select('#gradient-plane-y-axis')
        .call(axisLeft(yScaler));

    return {
        xScaler, yScaler
    }
}

export default scaleGradientPlane;