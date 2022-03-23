import { API } from "../..";

const getRandomCoeffs = () => (
    fetch(`${API}/api/logistic-regression/coeffs`)
    .then(res => res.json())
)

export default getRandomCoeffs;