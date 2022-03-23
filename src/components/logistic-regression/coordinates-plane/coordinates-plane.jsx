import style from './coordinates-plane.module.sass';

const tabIndex = 0;

const CoordinatesPlane = ({ selectedTabIndex }) => {

    return (
        <section
        id='coordinates-plane'
        className={style['coordinates-plane']}
        style={{
            opacity: selectedTabIndex === tabIndex ? 1 : 0
        }}>
            <svg
            className={style['coordinates-plane-svg']}
            id='coordinates-plane-svg'
            ></svg>
        </section>
    )
}

export default CoordinatesPlane;