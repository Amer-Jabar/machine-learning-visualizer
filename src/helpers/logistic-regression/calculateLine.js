const calculateLine = (algorithmData) => {
    const { w1, w0 } = algorithmData;
    const x1 = algorithmData.x_[0];
    const x2 = algorithmData.x_[algorithmData.x_.length - 1];
    const y1 = (w1 * algorithmData.x_[0] + w0)
    const y2 = (w1 * algorithmData.x_[algorithmData.x_.length - 1] + w0)

    return {
        x1,
        x2,
        y1,
        y2,
    }
}

export default calculateLine;