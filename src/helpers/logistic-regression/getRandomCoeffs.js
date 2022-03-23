import { API } from "../..";

const getRandomCoeffs = () => (
    fetch(`${API}/api/linear-regression/coeffs`)
    .then(res => res.json())
)

export default getRandomCoeffs;