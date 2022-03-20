const clearAllGraphs = (coordinatePlaneSvg, gradientPlaneSvg, {
    circle, line, g, gradientLine
}) => {
    if ( circle )
        coordinatePlaneSvg.selectAll('circle').remove()
    if ( line )
        coordinatePlaneSvg.selectAll('line').remove()
    if ( g )
        coordinatePlaneSvg.selectAll('g').remove()

    if ( gradientPlaneSvg && gradientLine )
        gradientPlaneSvg.selectAll('line').remove();
}

export default clearAllGraphs;