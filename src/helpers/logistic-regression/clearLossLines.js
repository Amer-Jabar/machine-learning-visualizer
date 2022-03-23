import { select } from "d3"

const clearLossLines = () => {
    select('#loss-plane-svg')
        .selectAll('.loss-line')
        .remove();
}

export default clearLossLines;