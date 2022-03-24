import { transition } from "d3";

import { shifter } from "./initializeCoordinatePlaneGraph";
import { scaleNumber } from "./drawGradientLine";
import { circleDiameter } from "./scatterPlot";

const createLine = (svgEl, coordinates, algorithmDataClone, transitionCondition) => {

    const containerWidth = document.querySelector('#coordinates-plane').clientWidth;
    const containerHeight = document.querySelector('#coordinates-plane').clientHeight;
    const yMaxScaler = Math.max(...algorithmDataClone.y);
    
    if ( svgEl.select('#regression-line').size() === 0 ) {
        svgEl
            .append('line')
            .attr('id', 'regression-line')
            .transition(transition().duration(transitionCondition ? 250 : 10))
            .attr('x1', 0)
            .attr('x2', containerWidth - shifter * 2)
            .attr('y1', containerHeight - scaleNumber(coordinates.y1, 0, yMaxScaler, 0, containerHeight - shifter * 2) - (shifter * 2))
            .attr('y2', containerHeight - scaleNumber(coordinates.y2, 0, yMaxScaler, 0, containerHeight - shifter * 2) - (shifter * 2) - circleDiameter * 2)
            .attr('transform', `translate(${shifter}, ${shifter})`)
            .style('stroke', '#5a8da9')
            .style('stroke-width', '3px')
    } else {
        svgEl
            .select('#regression-line')
            .attr('id', 'regression-line')
            .transition(transition().duration(transitionCondition ? 250 : 10))
            .attr('x1', 0)
            .attr('x2', containerWidth - shifter * 2)
            .attr('y1', containerHeight - scaleNumber(coordinates.y1, 0, yMaxScaler, 0, containerHeight - shifter * 2) - (shifter * 2))
            .attr('y2', containerHeight - scaleNumber(coordinates.y2, 0, yMaxScaler, 0, containerHeight - shifter * 2) - (shifter * 2) - circleDiameter * 2)
    }
}

export default createLine;