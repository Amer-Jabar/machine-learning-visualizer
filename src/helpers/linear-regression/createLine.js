import { transition } from "d3";

import { shifter } from "./initializeCoordinatePlaneGraph";
import { circleDiameter } from "./scatterPlot";

const createLine = (svgEl, coordinates, algorithmDataClone, transitionCondition) => {

    const containerWidth = document.querySelector('#coordinates-plane').clientWidth;
    const containerHeight = document.querySelector('#coordinates-plane').clientHeight;
    
    const widthScaler = (containerWidth - shifter) / Math.max(...algorithmDataClone.x);
    const heightScaler = (containerHeight - shifter) / Math.max(...algorithmDataClone.y);

    if ( svgEl.select('#regression-line').size() === 0 ) {
        if ( transitionCondition )
            svgEl
                .append('line')
                .attr('id', 'regression-line')
                .transition(
                    transition()
                    .duration(250)
                )
                .attr('x1', Number(coordinates.x1 * widthScaler).toFixed(5))
                .attr('x2', Number(coordinates.x2 * widthScaler - shifter).toFixed(5))
                .attr('y1', Number(containerHeight - (coordinates.y1 * heightScaler) - shifter + (circleDiameter * 2)).toFixed(5))
                .attr('y2', Number(containerHeight - (coordinates.y2 * heightScaler) + circleDiameter).toFixed(5))
                .attr('transform', `translate(${shifter}, 0)`)
                .style('stroke', '#5a8da9')
                .style('stroke-width', '3px')
        else
            svgEl
                .append('line')
                .attr('id', 'regression-line')
                .attr('x1', Number(coordinates.x1 * widthScaler).toFixed(5))
                .attr('x2', Number(coordinates.x2 * widthScaler - shifter).toFixed(5))
                .attr('y1', Number(containerHeight - (coordinates.y1 * heightScaler) - shifter + (circleDiameter * 2)).toFixed(5))
                .attr('y2', Number(containerHeight - (coordinates.y2 * heightScaler) + circleDiameter).toFixed(5))
                .attr('transform', `translate(${shifter}, 0)`)
                .style('stroke', '#5a8da9')
                .style('stroke-width', '3px')
    } else {
        if ( transitionCondition )
            svgEl
                .select('#regression-line')
                .transition(
                    transition()
                    .duration(250)
                )
                .attr('x1', Number(coordinates.x1 * widthScaler).toFixed(5))
                .attr('x2', Number(coordinates.x2 * widthScaler - shifter).toFixed(5))
                .attr('y1', Number(containerHeight - (coordinates.y1 * heightScaler) - shifter + (circleDiameter * 2)).toFixed(5))
                .attr('y2', Number(containerHeight - (coordinates.y2 * heightScaler) + circleDiameter).toFixed(5))
        else
            svgEl
                .select('#regression-line')
                .attr('x1', Number(coordinates.x1 * widthScaler).toFixed(5))
                .attr('x2', Number(coordinates.x2 * widthScaler - shifter).toFixed(5))
                .attr('y1', Number(containerHeight - (coordinates.y1 * heightScaler) - shifter + (circleDiameter * 2)).toFixed(5))
                .attr('y2', Number(containerHeight - (coordinates.y2 * heightScaler) + circleDiameter).toFixed(5))
    }
}

export default createLine;