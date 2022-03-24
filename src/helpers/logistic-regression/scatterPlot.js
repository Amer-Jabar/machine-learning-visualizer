import { select, transition } from "d3";
import { scaleNumber } from "./drawLossLine";

import { shifter } from "./initializeCoordinatePlaneGraph";

export const circleDiameter = 3;

const scatterPlot = (mergedData, containerWidth, containerHeight, minScaleX, maxScaleX, maxScaleY, delay, rearrange) => {

    console.log({ rearrange });
    if ( rearrange ) {
        select('#coordinates-plane-svg')
            .selectAll('circle')
            .data(mergedData)
            .attr('cx', d => `${scaleNumber(d.x, minScaleX, maxScaleX, shifter + circleDiameter, containerWidth - shifter - circleDiameter)}px`)
            .attr('cy', d => `${scaleNumber(d.y, 0, maxScaleY, containerHeight - shifter - circleDiameter, shifter + circleDiameter)}px`)
            .attr('fill', (d, i) => `hsl(205, 74%, ${100 - ((i + 25) / (mergedData.length + 25)) * 100}%)`)
            
    } else {
        select('#coordinates-plane-svg')
            .selectAll('circle')
            .data(mergedData)
            .enter()
            .append('circle')
            .attr('cx', d => `${scaleNumber(d.x, minScaleX, maxScaleX, shifter + circleDiameter, containerWidth - shifter - circleDiameter)}px`)
            .attr('cy', d => `${scaleNumber(d.y, 0, maxScaleY, containerHeight - shifter - circleDiameter, shifter + circleDiameter)}px`)
            .attr('r', 3)
            .attr('fill', (d, i) => `hsl(205, 74%, ${100 - ((i + 25) / (mergedData.length + 25)) * 100}%)`)
            .style('transition-delay', (d, i) => `${i * 0.01}s`)
            .style('transition-duration', '0.1s')
            .style('opacity', 0)

        setTimeout(() => select('#coordinates-plane-svg').selectAll('circle').style('opacity', 1), delay);
    }

}

export default scatterPlot;