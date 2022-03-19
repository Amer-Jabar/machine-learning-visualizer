import { select, axisBottom, axisLeft, extent, max, scaleLinear, scaleTime } from 'd3';

export const shifter = 25;

const initializeGraph = (algorithmData) => {

    const containerWidth = document.querySelector('#coordinates-plane').clientWidth;
    const containerHeight = document.querySelector('#coordinates-plane').clientHeight;
    
    const widthScaler = containerWidth / Math.max(...algorithmData.x);
    const heightScaler = containerHeight / Math.max(...algorithmData.y);

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

    console.log(mergedData);

    const svgEl = select('svg')
        .attr('width', containerWidth + shifter)
        .attr('height', containerHeight);

    svgEl.append("g")
        .attr("transform", `translate(${shifter}, ${containerHeight - shifter})`)
        .call(axisBottom(xScaler));

    svgEl.append("g")
        .attr("transform", `translate(${shifter}, -${shifter})`)
        .call(axisLeft(yScaler));

    return {
        mergedData, svgEl, containerWidth, containerHeight, widthScaler, heightScaler
    }
}

export default initializeGraph;