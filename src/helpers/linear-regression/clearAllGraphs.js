const clearAllGraphs = (svg, {
    circle, line, g
}) => {
    if ( circle )
        svg.selectAll('circle').remove()
    if ( line )
        svg.selectAll('line').remove()
    if ( g )
        svg.selectAll('g').remove()
}

export default clearAllGraphs;