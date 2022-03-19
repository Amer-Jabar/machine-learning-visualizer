const clearAllGraphs = (svg) => {
    svg.selectAll('circle').remove()
    svg.selectAll('line').remove()
    svg.selectAll('g').remove()
}

export default clearAllGraphs;