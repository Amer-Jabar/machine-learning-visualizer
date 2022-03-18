const calculateError = (algorithmDataClone) => {

    const { loss_hist } = algorithmDataClone;
    const last = loss_hist[loss_hist.length - 1];
    const preLast = loss_hist[loss_hist.length - 2];

    const error = Math.abs(last - preLast)
    if ( isNaN(error) ) return 2;

    return error;
}

export default calculateError;