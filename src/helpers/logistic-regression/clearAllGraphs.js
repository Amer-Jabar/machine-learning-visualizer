const clearAllGraphs = (coordinatePlaneSvg, gradientPlaneSvg, {
    circle, line, g, gradientLine
}) => {
    if ( coordinatePlaneSvg && circle )
        coordinatePlaneSvg.selectAll('circle').remove()
    if ( coordinatePlaneSvg && line )
        coordinatePlaneSvg.selectAll('line').remove()
    if ( coordinatePlaneSvg && g )
        coordinatePlaneSvg.selectAll('g').remove()

    if ( gradientPlaneSvg && gradientLine )
        gradientPlaneSvg.selectAll('line').remove();
}

export default clearAllGraphs;