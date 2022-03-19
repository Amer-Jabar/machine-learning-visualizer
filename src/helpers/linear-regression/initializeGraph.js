import { select, axisBottom, axisLeft, extent, max, scaleLinear, scaleTime } from 'd3';

const initializeGraph = (algorithmData) => {

    const containerWidth = document.querySelector('#coordinates-plane').clientWidth;
    const containerHeight = document.querySelector('#coordinates-plane').clientHeight;
    
    const widthScaler = containerWidth / 100;
    const heightScaler = containerHeight / 100;

    const shifter = 25

    const mergedData = Array.from({ length: 100 }).map((_, i) => ({
        x: (algorithmData.x[i] + (shifter / widthScaler)) * widthScaler,
        y: (algorithmData.y[i] + (shifter / heightScaler)) * heightScaler,
    }))

    const xScaler = scaleTime().range([0, containerWidth]);
    const yScaler = scaleLinear().range([containerHeight, 0]);

    const svgEl = select('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight);
        
    xScaler.domain(extent(algorithmData.x, d => d));
    yScaler.domain([0, max(algorithmData.y, d => d)]);

    svgEl.append("g")
        .attr("transform", `translate(${shifter}, ${containerHeight - 25})`)
        .call(axisBottom(xScaler));

    svgEl.append("g")
        .attr("transform", `translate(${shifter}, -${shifter})`)
        .call(axisLeft(yScaler));

    return {
        mergedData, svgEl, containerHeight
    }
}

export default initializeGraph;