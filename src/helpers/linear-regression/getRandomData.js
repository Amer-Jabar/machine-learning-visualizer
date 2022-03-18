const getRandomData = () => (
    fetch('http://127.0.0.1:8000/api/linear-regression/random-data')
    .then(async (res) => {
        const responseBody = await res.json();
        const xSteps = await getXSteps();
        return { ...responseBody, ...xSteps }
    })
)

const getXSteps = () => (
    fetch('http://127.0.0.1:8000/api/linear-regression/x-steps')
    .then(res => res.json())
)

export default getRandomData;