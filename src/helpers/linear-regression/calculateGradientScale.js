const calculateGradientScale = (algorithmData) => {
    let minHistoryX = Math.max(...algorithmData.w1_hist) * -1;
    let maxHistoryX = Math.max(...algorithmData.w1_hist);
    let maxHistoryY = Math.max(...algorithmData.loss_hist);

    return {
        minHistoryX,
        maxHistoryX,
        maxHistoryY,
    }
}

export default calculateGradientScale;