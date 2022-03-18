const scatterPlot = (svgEl, mergedData, containerHeight, delay) => {
    svgEl
        .selectAll('circle')
        .data(mergedData)
        .enter()
        .append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => containerHeight - d.y)
        .attr('r', 3)
        .attr('fill', (d, i) => `hsl(205, 74%, ${100 - ((i + 25) / (mergedData.length + 25)) * 100}%)`)
        .style('transition-delay', (d, i) => `${i * 0.01}s`)
        .style('transition-duration', '0.1s')
        .style('opacity', 0)

    setTimeout(() => svgEl.selectAll('circle').style('opacity', 1), delay);
}

export default scatterPlot;