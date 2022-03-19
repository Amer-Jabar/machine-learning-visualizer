import { transition } from "d3";

import { shifter } from "./initializeGraph";

const createLine = (svgEl, coordinates, algorithmDataClone, transitionCondition) => {

    const containerWidth = document.querySelector('#coordinates-plane').clientWidth;
    const containerHeight = document.querySelector('#coordinates-plane').clientHeight;
    
    const widthScaler = containerWidth / Math.max(...algorithmDataClone.x);
    const heightScaler = containerHeight / Math.max(...algorithmDataClone.y);

    if ( svgEl.select('#regression-line').size() === 0 ) {
        if ( transitionCondition )
            svgEl
                .append('line')
                .attr('id', 'regression-line')
                .transition(
                    transition()
                    .duration(250)
                )
                .attr('x1', (coordinates.x1 * widthScaler))
                .attr('x2', (coordinates.x2 * widthScaler))
                .attr('y1', containerHeight - (coordinates.y1 * heightScaler) - shifter)
                .attr('y2', containerHeight - (coordinates.y2 * heightScaler) - shifter)
                .attr('transform', `translate(${shifter}, 0)`)
                .style('stroke', '#5a8da9')
                .style('stroke-width', '3px')
        else
            svgEl
                .append('line')
                .attr('id', 'regression-line')
                .attr('x1', (coordinates.x1 * widthScaler))
                .attr('x2', (coordinates.x2 * widthScaler))
                .attr('y1', containerHeight - (coordinates.y1 * heightScaler) - shifter)
                .attr('y2', containerHeight - (coordinates.y2 * heightScaler) - shifter)
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
                .attr('x1', (coordinates.x1 * widthScaler))
                .attr('x2', (coordinates.x2 * widthScaler))
                .attr('y1', containerHeight - (coordinates.y1 * heightScaler) - shifter)
                .attr('y2', containerHeight - (coordinates.y2 * heightScaler) - shifter)
        else
            svgEl
                .select('#regression-line')
                .attr('x1', (coordinates.x1 * widthScaler))
                .attr('x2', (coordinates.x2 * widthScaler))
                .attr('y1', containerHeight - (coordinates.y1 * heightScaler) - shifter)
                .attr('y2', containerHeight - (coordinates.y2 * heightScaler) - shifter)
    }
}

export default createLine;