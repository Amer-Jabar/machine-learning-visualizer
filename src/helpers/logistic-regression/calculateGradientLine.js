const calculateGradientLine = (epochNumbers, lossHistory, w1History) => {
    if ( lossHistory.length < 2 || w1History.length < 2 ) return;

    if ( epochNumbers === 1 ) {
        const dimensions = {
            x1: Number(w1History[w1History.length - 2]).toFixed(5),
            x2: Number(w1History[w1History.length - 1]).toFixed(5),
            y1: Number(lossHistory[lossHistory.length - 2]).toFixed(5),
            y2: Number(lossHistory[lossHistory.length - 1]).toFixed(5),
        }
        return dimensions;
    } else {
        const dimensions = [];

        for ( let index = w1History.length - epochNumbers; index < w1History.length; index++ )
            dimensions.push({
                x1: Number(w1History[index - 1] || w1History[index]).toFixed(5),
                x2: Number(w1History[index]).toFixed(5),
                y1: Number(lossHistory[index - 1] || lossHistory[index]).toFixed(5),
                y2: Number(lossHistory[index]).toFixed(5),
            })

        return dimensions;
    }
}

export default calculateGradientLine;