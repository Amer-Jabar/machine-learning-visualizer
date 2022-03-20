import style from './coordinates-plane.module.sass';

const CoordinatesPlane = () => {

    return (
        <section
        id='coordinates-plane'
        className={style['coordinates-plane']}>
            <svg className={'style.coordinates-plane-svg'}></svg>
        </section>
    )
}

export default CoordinatesPlane;