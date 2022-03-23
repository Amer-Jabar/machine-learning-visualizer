import style from './gradient-plane.module.sass';

const tabIndex = 1;

const GradientPlane = ({ selectedTabIndex }) => {

    return (
        <section
        id='gradient-plane'
        className={style['gradient-plane']}
        style={{
            opacity: selectedTabIndex === tabIndex ? 1 : 0
        }}>
            <svg
            className={style['gradient-plane-svg']}
            id='gradient-plane-svg'
            ></svg>
        </section>
    )
}

export default GradientPlane;