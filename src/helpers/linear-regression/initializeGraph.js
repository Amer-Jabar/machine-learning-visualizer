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

    const coordinatePlaneSvg = select('svg')
        .attr('id', 'coordinates-plane-svg')
        .attr('width', containerWidth + shifter)
        .attr('height', containerHeight);
    
    const gX = coordinatePlaneSvg.append("g")
        .attr("transform", `translate(${shifter}, -${shifter})`)
        .call(axisLeft(yScaler));

    const xTicks = gX.append('g')
        .call(
            axisLeft(yScaler)
            .tickSize(containerWidth)
        )
        .attr('transform', `translate(${containerWidth}, -${0})`)

    xTicks
        .selectAll('line')
        .attr('stroke', '#d1deeb')

    xTicks
        .selectAll('text')
        .remove()

    xTicks.select('.domain')
        .attr('stroke', '#dae3eb')

    const gY = coordinatePlaneSvg.append("g")
        .attr("transform", `translate(${shifter}, ${containerHeight - shifter})`)
        .call(
            axisBottom(xScaler)
            .tickValues([10, 20, 30, 40, 50, 60, 70, 80, 90])
            .tickFormat(d => d)
        );

    const yTicks = gY.append('g')
        .call(
            axisBottom(xScaler)
            .tickSize(containerHeight - shifter)
        )
        .attr('transform', `translate(${0}, -${containerHeight - shifter})`)

    yTicks
        .selectAll('line')
        .attr('stroke', '#d1deeb')

    yTicks
        .selectAll('text')
        .remove()

    yTicks.select('.domain')
        .attr('stroke', '#dae3eb')

    return {
        mergedData, coordinatePlaneSvg, containerWidth, containerHeight, widthScaler, heightScaler
    }
}

export default initializeGraph;