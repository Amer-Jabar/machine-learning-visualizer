const setMetricsBoard = () => {
    const metrics = document.querySelector('#coordinates-metrics');
    const { top, left } = document.querySelector('#control-plane').getClientRects()[0];

    metrics.style.top = `${top}px`;
    metrics.style.left = `${left - 225}px`;
}

export default setMetricsBoard;