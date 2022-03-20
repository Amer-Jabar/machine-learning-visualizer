import { select } from "d3";
import { shifter } from "./initializeCoordinatePlaneGraph";

const scaleNumbers = (list, rMin, rMax, tMin, tMax) => {
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

    gradientHistory = scaleNumbers(gradientHistory, minHistoryX, maxHistoryX, 0, containerWidth);

    select('#gradient-plane-svg')
        .selectAll('.gradient-plane-svg-line')
        .remove();
    
    select('#gradient-plane-svg')
        .data(gradientHistory)
        .selectAll('.gradient-plane-svg-line')
        .data(gradientHistory)
        .enter()
        .append('line')
        .attr('class', 'gradient-plane-svg-line')
        .attr('x1', d => d.x1 + shifter)
        .attr('x2', d => d.x2 + shifter)
        .attr('y1', d => (containerHeight - ((d.y1 / maxHistoryY) * containerHeight) - shifter))
        .attr('y2', d => (containerHeight - ((d.y2 / maxHistoryY) * containerHeight) - shifter))
        .attr('stroke', 'red')

}

export default drawGradientLine;