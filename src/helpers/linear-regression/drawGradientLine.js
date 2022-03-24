import { select } from "d3";

import { shifter } from "./initializeCoordinatePlaneGraph";

export const scaleNumber = (x, xMin, xMax, a, b) => ((b - a) * (x - xMin) / (xMax - xMin)) + a;

export const scaleNumbers = (list, rMin, rMax, tMin, tMax) => {
    const scaledList = list.map(number => {
        return ({
            x1: (((number.x1 - rMin) / (rMax - rMin) * (tMax - tMin)) + tMin),
            x2: (((number.x2 - rMin) / (rMax - rMin) * (tMax - tMin)) + tMin),
            y1: number.y1,
            y2: number.y2,
        })
    })
    return scaledList;
}

const drawGradientLine = (gradientHistory, minHistoryX, maxHistoryX, maxHistoryY) => {
    if ( gradientHistory.length < 1 ) return;
    
    const containerWidth = document.querySelector('#gradient-plane').clientWidth;
    const containerHeight = document.querySelector('#gradient-plane').clientHeight;

    gradientHistory = scaleNumbers(gradientHistory, minHistoryX, maxHistoryX, shifter, containerWidth);
    const gradientLocalShifter = shifter + (shifter / 2);

    const gradientPlaneSvg = select('#gradient-plane-svg');

    gradientPlaneSvg
        .selectAll('.gradient-plane-svg-line')
        .data(gradientHistory)
        .enter()
        .append('line')
        .attr('class', 'gradient-plane-svg-line')
        .attr('x1', d => d.x1 - shifter)
        .attr('x2', d => d.x2 - shifter)
        .attr('y1', d => (containerHeight - ((d.y1 / maxHistoryY) * (containerHeight - gradientLocalShifter)) - (gradientLocalShifter)))
        .attr('y2', d => (containerHeight - ((d.y2 / maxHistoryY) * (containerHeight - gradientLocalShifter)) - (gradientLocalShifter)))
        .attr('stroke', 'rgb(90, 141, 169)')
        .attr('stroke-width', '2px')

}

export default drawGradientLine;