import { select } from 'd3';

const initializeGraph = (algorithmData) => {

    const containerWidth = document.querySelector('#coordinates-plane').clientWidth;
    const containerHeight = document.querySelector('#coordinates-plane').clientHeight;
    
    const widthScaler = containerWidth / 100;
    const heightScaler = containerHeight / 100;

    const mergedData = Array.from({ length: 100 }).map((_, i) => ({
        x: algorithmData.x[i] * widthScaler,
        y: algorithmData.y[i] * heightScaler,
    }))

    const svgEl = select('svg')
        .attr('width', document.querySelector('#coordinates-plane').clientWidth)
        .attr('height', document.querySelector('#coordinates-plane').clientHeight)

    return {
        mergedData, svgEl, containerHeight
    }
}

export default initializeGraph;