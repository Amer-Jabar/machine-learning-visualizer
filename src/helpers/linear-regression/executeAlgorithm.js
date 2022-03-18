import runAlgorithm from './runAlgorithm';

const executeAlgorithm = async (algorithmData) => {
    let postPayload = {
        x: algorithmData.x,
        y: algorithmData.y,
        w1: algorithmData.w1,
        w0: algorithmData.w0,
        eta: algorithmData.eta,
        x_: algorithmData.x_,
        epochs: algorithmData.epochs || 1
    }
    const result = await runAlgorithm(postPayload);

    return {
        ...algorithmData,
        ...result,
        loss_hist: [...algorithmData.loss_hist, ...result.loss_hist],
        gradient_hist: [...algorithmData.gradient_hist, ...result.gradient_hist],
        w1_hist: [...algorithmData.w1_hist, ...result.w1_hist],
    }
}

export default executeAlgorithm;