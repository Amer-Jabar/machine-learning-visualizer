import { axisBottom, axisLeft, scaleLinear, select } from "d3";
import { shifter } from "./initializeCoordinatePlaneGraph";

const initializeLossGraph = (lossPlaneSvgParam) => {

    const containerWidth = document.querySelector('#loss-plane').clientWidth;
    const containerHeight = document.querySelector('#loss-plane').clientHeight;    

    const xScaler = scaleLinear()
        .range([shifter, containerWidth - shifter])
        .domain([0, 10])

    const yScaler = scaleLinear()
        .range([containerHeight - (shifter * 2), 0])
        .domain([0, 100]);

    if ( lossPlaneSvgParam ) {
        lossPlaneSvgParam
            .select('#loss-plane-x-axis')
            .call(axisBottom(xScaler));

            lossPlaneSvgParam
            .select('#loss-plane-y-axis')
            .call(axisLeft(yScaler));

        return lossPlaneSvgParam;
    }
    
    const lossPlaneSvg = select('#loss-plane-svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight);

    lossPlaneSvg.append("g")
        .attr('id', 'loss-plane-x-axis')
        .attr("transform", `translate(${0}, ${containerHeight - shifter})`)
        .call(axisBottom(xScaler));
                
    lossPlaneSvg.append("g")
        .attr('id', 'loss-plane-y-axis')
        .attr("transform", `translate(${shifter}, ${shifter})`)
        .call(axisLeft(yScaler));

    return lossPlaneSvg;
}

export default initializeLossGraph;