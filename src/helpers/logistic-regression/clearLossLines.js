import { select } from "d3"

const clearLossLines = (localLossPlaneSvg, axis) => {
    if ( localLossPlaneSvg && axis )
        return localLossPlaneSvg
            .selectAll('*')
            .remove();

    if ( localLossPlaneSvg )
        return localLossPlaneSvg
            .selectAll('.loss-line')
            .remove();

    select('#loss-plane-svg')
        .selectAll('.loss-line')
        .remove();
}

export default clearLossLines;