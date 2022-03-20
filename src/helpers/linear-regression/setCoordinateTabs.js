const setCoordinateTabs = () => {
    const metrics = document.querySelector('#coordinates-metrics');
    const tabsContainer = document.querySelector('#coordinate-tabs');

    const { top, left } = metrics.getClientRects()[0];
    tabsContainer.style.top = `${top}px`;
    tabsContainer.style.left = `${left - tabsContainer.clientWidth - 50}px`;
    tabsContainer.style.opacity = 1;
}


export default setCoordinateTabs;