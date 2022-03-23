import runAlgorithm from './runAlgorithm';

const executeAlgorithm = async (algorithmData) => {
    let postPayload = {
        x: algorithmData.x,
        y: algorithmData.y,
        w1: algorithmData.w1,
        w0: algorithmData.w0,
        eta: algorithmData.eta,
        loss_hist: algorithmData.loss_hist,
    }
    
    const result = await runAlgorithm(postPayload);

    console.log(result);

    return {
        ...algorithmData,
        ...result,
        loss_hist: [...algorithmData.loss_hist, ...result.loss_hist],
    }
}

export default executeAlgorithm;