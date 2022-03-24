import { mergeData } from "./initializeCoordinatePlaneGraph";

const classifyScatterPlot = (coordinatePlaneSvg, algorithmData) => {
    if ( !algorithmData.pred ) return;

    const mergedData = mergeData(algorithmData);

    const min = algorithmData.pred && Math.min(...algorithmData.pred.map(value => Number(value).toFixed(5)));
    const max = algorithmData.pred && Math.max(...algorithmData.pred.map(value => Number(value).toFixed(5)));
    const middle = (min + max) / 2;

    coordinatePlaneSvg
        .selectAll('circle')
        .data(mergedData)
        .attr('fill', (d, i) => d.y >= middle ? 'yellow' : 'green');
}

export default classifyScatterPlot;