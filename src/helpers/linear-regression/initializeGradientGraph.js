import { select, scaleLinear, axisBottom, axisLeft } from "d3";

import { shifter } from "./initializeCoordinatePlaneGraph";

const initializeGradientGraph = (algorithmData, {
    alterMinHistoryX,
    alterMaxHistoryX,
    alterMaxHistoryY,
    gradientPlaneSvg,
}) => {

    const containerWidth = document.querySelector('#gradient-plane').clientWidth;
    const containerHeight = document.querySelector('#gradient-plane').clientHeight;
    const localShifter = shifter + (shifter / 2);

    let minHistoryX;
    let maxHistoryX;
    let maxHistoryY;

    if ( algorithmData ) {
        minHistoryX = Math.max(...algorithmData.w1_hist) * -1;
        maxHistoryX = Math.max(...algorithmData.w1_hist);
        maxHistoryY = Math.max(...algorithmData.loss_hist);
    } else {
        minHistoryX = alterMinHistoryX;
        maxHistoryX = alterMaxHistoryX;
        maxHistoryY = alterMaxHistoryY;
    }

    const xScaler = scaleLinear()
        .range([localShifter, containerWidth - localShifter])
        .domain([minHistoryX, maxHistoryX])

    const yScaler = scaleLinear()
        .range([containerHeight - localShifter, localShifter])
        .domain([0, maxHistoryY]);

    let localGradientPlaneSvg = gradientPlaneSvg;

    if ( !localGradientPlaneSvg) {

        localGradientPlaneSvg = select('#gradient-plane-svg')
            .attr('width', containerWidth)
            .attr('height', containerHeight);

        // Appending text and setting coordinates
        localGradientPlaneSvg
            .append('text')
            .text('Observations')
            .attr('x', `${(containerWidth / 2) - localShifter}px`)
            .attr('y', `${containerHeight - (localShifter / 4)}px`)

        // Appending text, setting coordinates and rotating around the new altered origin
        localGradientPlaneSvg
            .append('text')
            .text('Value')
            .attr('x', `${0}px`)
            .attr('y', `${containerHeight / 2 + (localShifter / 4)}px`)
            .attr('transform', `rotate(${-90}, ${0}, ${containerHeight / 2})`)


        localGradientPlaneSvg.append("g")
            .attr('id', 'gradient-plane-x-axis')
            .attr("transform", `translate(${0}, ${containerHeight - localShifter})`)
            .call(axisBottom(xScaler));
                    
        localGradientPlaneSvg.append("g")
            .attr('id', 'gradient-plane-y-axis')
            .attr("transform", `translate(${localShifter}, -${0})`)
            .call(axisLeft(yScaler));

    } else {
        localGradientPlaneSvg
            .call(axisBottom(xScaler));

        localGradientPlaneSvg
            .call(axisLeft(yScaler));
    }

    return {
        localGradientPlaneSvg, minHistoryX, maxHistoryX, maxHistoryY
    }
};

export default initializeGradientGraph;