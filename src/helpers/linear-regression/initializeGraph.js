import { select, axisBottom, axisLeft, extent, max, scaleLinear, scaleTime } from 'd3';

export const shifter = 30;

const initializeGraph = (algorithmData) => {

    const containerWidth = document.querySelector('#coordinates-plane').clientWidth;
    const containerHeight = document.querySelector('#coordinates-plane').clientHeight;
    
    const widthScaler = (containerWidth - shifter - 5) / Math.max(...algorithmData.x);
    const heightScaler = (containerHeight - shifter - 5) / Math.max(...algorithmData.y);

    const mergedData = Array.from({ length: 100 }).map((_, i) => ({
        x: algorithmData.x[i],
        y: algorithmData.y[i],
    }))

    const xScaler = scaleTime()
        .range([0, containerWidth])
        .domain(extent(mergedData, d => d.x));

    const yScaler = scaleLinear()
        .range([containerHeight, 0])
        .domain([0, max(mergedData, d => d.y)]);

    const svgEl = select('svg')
        .attr('width', containerWidth + shifter)
        .attr('height', containerHeight);

    svgEl.append("g")
        .attr("transform", `translate(${shifter}, ${containerHeight - shifter})`)
        .call(axisBottom(xScaler));

    const g = svgEl.append("g")
        .attr('class', '.left-axis')
        .attr("transform", `translate(${shifter}, -${shifter})`)
        .call(axisLeft(yScaler));

    const ticks = g.append('g')
        .call(
            axisLeft(yScaler)
            .tickSize(containerWidth)
        )
        .attr('transform', `translate(${containerWidth}, -${0})`)

        ticks
            .selectAll('line')
            .attr('stroke', '#a8c6d7')

        ticks
            .selectAll('text')
            .remove()

    return {
        mergedData, svgEl, containerWidth, containerHeight, widthScaler, heightScaler
    }
}

export default initializeGraph;