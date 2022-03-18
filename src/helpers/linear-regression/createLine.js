const createLine = (svgEl, coordinates) => {

    const containerWidth = document.querySelector('#coordinates-plane').clientWidth;
    const containerHeight = document.querySelector('#coordinates-plane').clientHeight;
    
    const widthScaler = containerWidth / 100;
    const heightScaler = containerHeight / 100;

    if ( svgEl.select('line').size() === 0 )
        svgEl
            .append('line')
            .attr('x1', (coordinates.x1 * widthScaler))
            .attr('x2', (coordinates.x2 * widthScaler))
            .attr('y1', containerHeight - (coordinates.y1 * heightScaler))
            .attr('y2', containerHeight - (coordinates.y2 * heightScaler))
            .style('stroke', 'red')
            .transition()
            .duration(250)
    else
        svgEl
            .select('line')
            .attr('x1', (coordinates.x1 * widthScaler))
            .attr('x2', (coordinates.x2 * widthScaler))
            .attr('y1', containerHeight - (coordinates.y1 * heightScaler))
            .attr('y2', containerHeight - (coordinates.y2 * heightScaler))

}

export default createLine;