const calculateGradientLine = (lossHistory, w1History) => {
    if ( lossHistory.length < 2 || w1History.length < 2 ) return;

    const dimensions = {
        x1: w1History[w1History.length - 2],
        x2: w1History[w1History.length - 1],
        y1: lossHistory[lossHistory.length - 2],
        y2: lossHistory[lossHistory.length - 1],
    }

    return dimensions;
}

export default calculateGradientLine;