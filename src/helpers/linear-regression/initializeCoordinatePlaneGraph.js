import { select, axisBottom, axisLeft, scaleLinear } from 'd3';

export const shifter = 35;

const initializeCoordinatePlaneGraph = (algorithmData) => {

    const containerWidth = document.querySelector('#coordinates-plane').clientWidth;
    const containerHeight = document.querySelector('#coordinates-plane').clientHeight;

    const mergedData = Array.from({ length: algorithmData.x.length }).map((_, i) => ({
        x: algorithmData.x[i],
        y: algorithmData.y[i],
    }))

    const minScaleX = Math.min(...algorithmData.x);
    const maxScaleX = Math.max(...algorithmData.x);
    const maxScaleY = Math.max(...algorithmData.y);

    const xScaler = scaleLinear()
        .range([shifter, containerWidth - shifter])
        .domain([minScaleX, maxScaleX]);

    const yScaler = scaleLinear()
        .range([containerHeight - shifter, shifter])
        .domain([0, maxScaleY]);

    const coordinatePlaneSvg = select('#coordinates-plane-svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight);
    
    // Appending text and setting coordinates
    coordinatePlaneSvg
        .append('text')
        .text('W1')
        .attr('x', `${(containerWidth / 2) - shifter}px`)
        .attr('y', `${containerHeight}px`)
    
    // Appending text, setting coordinates and rotating around the new altered origin
    coordinatePlaneSvg
        .append('text')
        .text('Loss')
        .attr('x', `${0}px`)
        .attr('y', `${containerHeight / 2 + 10}px`)
        .attr('transform', `rotate(${-90}, ${0}, ${containerHeight / 2})`)

    const gX = coordinatePlaneSvg.append("g")
        .attr("transform", `translate(${0}, ${containerHeight - shifter})`)
        .call(axisBottom(xScaler));

    const xTicks = gX.append('g')
        .call(axisBottom(xScaler))
        .attr('transform', `translate(${0}, ${-containerHeight + (shifter * 2)})`)

    xTicks
        .selectAll('line')
        .attr('stroke', '#d1deeb')

    xTicks
        .selectAll('text')
        .remove()

    xTicks.select('.domain')
        .attr('stroke', '#dae3eb')

    const gY = coordinatePlaneSvg.append("g")
        .attr("transform", `translate(${shifter}, -${0})`)
        .call(axisLeft(yScaler));

    const yTicks = gY.append('g')
        .call(axisLeft(yScaler))
        .attr('transform', `translate(${containerWidth - (shifter * 2)}, -${0})`)

    yTicks
        .selectAll('line')
        .attr('stroke', '#d1deeb')

    yTicks
        .selectAll('text')
        .remove()

    yTicks.select('.domain')
        .attr('stroke', '#dae3eb')

    return {
        mergedData, coordinatePlaneSvg, containerWidth, containerHeight, minScaleX, maxScaleX, maxScaleY
    }
}

export default initializeCoordinatePlaneGraph;