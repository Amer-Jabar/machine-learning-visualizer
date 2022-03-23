import style from './loss-plane.module.sass';

const tabIndex = 1;

const GradientPlane = ({ selectedTabIndex }) => {

    return (
        <section
        id='loss-plane'
        className={style['loss-plane']}
        style={{
            opacity: selectedTabIndex === tabIndex ? 1 : 0
        }}>
            <svg
            className={style['loss-plane-svg']}
            id='loss-plane-svg'
            ></svg>
        </section>
    )
}

export default GradientPlane;