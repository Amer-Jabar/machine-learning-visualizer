const getRandomCoeffs = () => (
    fetch('http://127.0.0.1:8000/api/linear-regression/coeffs')
    .then(res => res.json())
)

export default getRandomCoeffs;