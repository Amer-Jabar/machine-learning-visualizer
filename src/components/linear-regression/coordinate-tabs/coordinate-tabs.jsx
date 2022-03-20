import { useEffect, useState } from 'react';

import setCoordinateTabs from '../../../helpers/linear-regression/setCoordinateTabs';

import style from './coordinate-tabs.module.sass';

const tabs = [{
    src: 'images/linear-regression/scatterplot.png',
    alt: 'scatterplot icon'
}, {
    src: 'images/linear-regression/linechart.png',
    alt: 'linechart icon'
}, {
    src: 'images/linear-regression/loss.png',
    alt: 'loss icon',
    style: {
        filter: 'hue-rotate(-405deg)'
    }
}]

const CoordinatesTabs = ({ selectedTab, setSelectedTab }) => {

    useEffect(() => {
        setTimeout(() => setCoordinateTabs(), 1000);
    }, []);

    return (
        <div
        className={style['coordinate-tabs']}
        id='coordinate-tabs'>
            { tabs.map((tabIcon, index) => (
                <img
                key={index}
                src={tabIcon.src}
                alt={tabIcon.alt}
                style={{
                    ...tabIcon.style,
                    background: selectedTab === index ? 'white' : '',
                    opacity: selectedTab === index ? 1 : 0.5,
                }}
                onClick={() => setSelectedTab(index)}
                ></img>
            )) }
        </div>
    )
}

export default CoordinatesTabs;