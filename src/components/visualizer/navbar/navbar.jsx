import style from './navbar.module.sass'

const Navbar = ({ setAlgorithm }) => {

    return (
        <nav className={style.navbar}>
            <select className={style['algorithm-selector']} name="algorithm-selector" onChange={e => setAlgorithm(e.target.value)}>
                <option value="none">Select an Algorithm</option>
                <option value="linear-regression">Linear Regression</option>
                <option value="logistic-regression">Logistic Regression</option>
            </select>
        </nav>
    )
}

export default Navbar;