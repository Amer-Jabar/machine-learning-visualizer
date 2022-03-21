import style from './navbar.module.sass'

const Navbar = ({ setAlgorithm, currentAlgorithm, currentElementId }) => {

    return (
        <nav className={style.navbar}>
            <select
            className={style['algorithm-selector']}
            name="algorithm-selector"
            onChange={e => {
                document.querySelector(`#${currentElementId}`).style.opacity = 0;
                setTimeout(() => {
                    setAlgorithm('none');
                    setAlgorithm(e.target.value);
                }, 500);
            }}>
                <option value="welcome-header">Select an Algorithm</option>
                <option value="linear-regression">Linear Regression</option>
            </select>
            <button
            className={style['algorithm-reset-button']}
            onClick={() => {
                document.querySelector(`#${currentElementId}`).style.opacity = 0;
                setTimeout(() => {
                    setAlgorithm('none');
                    setTimeout(() => setAlgorithm(currentAlgorithm), 100);
                }, 500);
            }}>Reset</button>
        </nav>
    )
}

export default Navbar;