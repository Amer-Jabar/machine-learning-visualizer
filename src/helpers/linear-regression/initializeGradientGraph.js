import { select, scaleLinear, axisBottom, axisLeft } from "d3";

import { shifter } from "./initializeCoordinatePlaneGraph";

const initializeGradientGraph = (algorithmData) => {

    const containerWidth = document.querySelector('#gradient-plane').clientWidth;
    const containerHeight = document.querySelector('#gradient-plane').clientHeight;    

    const minHistoryX = Math.max(...algorithmData.w1_hist) * -1;
    const maxHistoryX = Math.max(...algorithmData.w1_hist);
    const maxHistoryY = Math.max(...algorithmData.loss_hist)

    const xScaler = scaleLinear()
        .range([0, containerWidth])
        .domain([minHistoryX, maxHistoryX])

    const yScaler = scaleLinear()
        .range([containerHeight, 0])
        .domain([0, maxHistoryY]);

    if ( select('#gradient-plane-x-axis').empty() || select('#gradient-plane-y-axis').empty() ) {

        const gradientPlaneSvg = select('#gradient-plane-svg')
            .attr('width', containerWidth + shifter)
            .attr('height', containerHeight);

        gradientPlaneSvg.append("g")
            .attr('id', 'gradient-plane-x-axis')
            .attr("transform", `translate(${shifter}, ${containerHeight - shifter})`)
            .call(axisBottom(xScaler));
                    
        gradientPlaneSvg.append("g")
            .attr('id', 'gradient-plane-y-axis')
            .attr("transform", `translate(${shifter}, -${shifter})`)
            .call(axisLeft(yScaler));

    } else {
        select('#gradient-plane-x-axis')
            .call(axisBottom(xScaler));

        select('#gradient-plane-y-axis')
            .call(axisLeft(yScaler));
    }

    return {
        minHistoryX, maxHistoryX, maxHistoryY
    }
};

export default initializeGradientGraph;