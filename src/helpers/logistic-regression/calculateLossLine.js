const calculateLossLine = (algorithmData, iterations) => {
    if ( iterations < 1 ) return;

    const loss = algorithmData.loss_hist;
    let pairs = []
    for ( let i = 1; i < loss.length; i++ ) {
        pairs[i - 1] = {
            x1: i - 1,
            x2: i,
            y1: loss[i - 1],
            y2: loss[i]
        }
    }
    
    return pairs;
}

export default calculateLossLine;