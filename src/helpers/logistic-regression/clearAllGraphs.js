const clearAllGraphs = (coordinatePlaneSvg, lossPlaneSvg, {
    circle, line, g, lossLine
}) => {
    if ( coordinatePlaneSvg && circle )
        coordinatePlaneSvg.selectAll('circle').remove()
    if ( coordinatePlaneSvg && line )
        coordinatePlaneSvg.selectAll('line').remove()
    if ( coordinatePlaneSvg && g )
        coordinatePlaneSvg.selectAll('g').remove()

    if ( lossPlaneSvg && lossLine )
        lossPlaneSvg.selectAll('*').remove();
}

export default clearAllGraphs;