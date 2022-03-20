import style from './gradient-plane.module.sass';

const tabIndex = 1;

const GradientPlane = ({ selectedTabIndex }) => {

    return (
        <div
        className={style['gradient-plane']}
        id='gradient-plane'
        style={{
            opacity: selectedTabIndex === tabIndex ? 1 : 0
        }}
        >This is gradient plane</div>
    )
}

export default GradientPlane;