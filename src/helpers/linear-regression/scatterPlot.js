import { select, transition } from "d3";

import { shifter } from "./initializeGraph";

const scatterPlot = (mergedData, containerHeight, widthScaler, heightScaler, delay, rearrange) => {
    
    if ( rearrange ) {
        select('#coordinates-plane-svg')
            .selectAll('circle')
            .data(mergedData)
            .transition(
                transition()
                .duration(100)
            )
            .attr('cx', d => (d.x * widthScaler) + shifter)
            .attr('cy', d => containerHeight - d.y * heightScaler - shifter)
            
    } else {
        select('#coordinates-plane-svg')
            .selectAll('circle')
            .data(mergedData)
            .enter()
            .append('circle')
            .attr('cx', d => (d.x * widthScaler) + shifter)
            .attr('cy', d => containerHeight - d.y * heightScaler - shifter)
            .attr('r', 3)
            .attr('fill', (d, i) => `hsl(205, 74%, ${100 - ((i + 25) / (mergedData.length + 25)) * 100}%)`)
            .style('transition-delay', (d, i) => `${i * 0.01}s`)
            .style('transition-duration', '0.1s')
            .style('opacity', 0)

        setTimeout(() => select('#coordinates-plane-svg').selectAll('circle').style('opacity', 1), delay);
    }

}

export default scatterPlot;