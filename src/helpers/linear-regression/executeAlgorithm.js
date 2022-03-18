import runAlgorithm from './runAlgorithm';

const executeAlgorithm = async (algorithmData) => {
    let postPayload;
    if ( !algorithmData.loss_hist || !algorithmData.gradient_hist || !algorithmData.w1_hist )
        postPayload = {
            ...algorithmData,
            loss_hist: [],
            gradient_hist: [],
            w1_hist: [],
            epochs: algorithmData.epochs || 1
        }
    else
        postPayload = {
            ...algorithmData,
            epochs: algorithmData.epochs || 1
        }

    const result = await runAlgorithm(postPayload);
    return {
        ...algorithmData,
        ...result
    }
}

export default executeAlgorithm;