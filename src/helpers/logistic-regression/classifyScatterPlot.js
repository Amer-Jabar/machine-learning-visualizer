import { transition } from "d3";
import { scaleNumber } from "./drawLossLine";
import { mergeData, shifter } from "./initializeCoordinatePlaneGraph";
import { circleDiameter } from "./scatterPlot";

const classifyScatterPlot = (coordinatePlaneSvg, algorithmData, classColors) => {
    if ( !algorithmData.pred ) return;

    const mergedData = mergeData(algorithmData, true);
    const containerWidth = document.querySelector('#coordinates-plane').clientWidth;
    const containerHeight = document.querySelector('#coordinates-plane').clientHeight;

    const min = algorithmData.pred && Math.min(...algorithmData.pred.map(value => Number(value).toFixed(5)));
    const max = algorithmData.pred && Math.max(...algorithmData.pred.map(value => Number(value).toFixed(5)));
    const middle = (min + max) / 2;

    const minScaleX = Math.min(...algorithmData.x);
    const maxScaleX = Math.max(...algorithmData.x);

    coordinatePlaneSvg
        .selectAll('circle')
        .data(mergedData)
        .attr('fill', (d, i) => d.y >= middle ? classColors.classA : classColors.classB)
        .attr('cx', d => `${scaleNumber(d.x, minScaleX, maxScaleX, shifter + circleDiameter, containerWidth - shifter - circleDiameter)}px`)
        .attr('cy', d => `${scaleNumber(d.y, 0, max, containerHeight - shifter - circleDiameter, shifter + circleDiameter)}px`)
}

export default classifyScatterPlot;