const clearAllGraphs = (coordinatePlaneSvg, gradientPlaneSvg, {
    circle, line, g, gradientLine, coordinateLabels, gradientLabels, gradientG
}) => {
    if ( coordinatePlaneSvg && circle )
        coordinatePlaneSvg.selectAll('circle').remove()
    if ( coordinatePlaneSvg && line )
        coordinatePlaneSvg.selectAll('line').remove()
    if ( coordinatePlaneSvg && g )
        coordinatePlaneSvg.selectAll('g').remove()
    if ( coordinatePlaneSvg && coordinateLabels )
        coordinatePlaneSvg.selectAll('text').remove()

    if ( gradientPlaneSvg && gradientLine )
        gradientPlaneSvg.selectAll('line').remove();
    if ( gradientPlaneSvg && gradientG )
        gradientPlaneSvg.selectAll('g').remove();
    if ( gradientPlaneSvg && gradientLabels )
        gradientPlaneSvg.selectAll('text').remove();
}

export default clearAllGraphs;