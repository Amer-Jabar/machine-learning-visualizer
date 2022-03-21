import { API } from "../..";

const getRandomData = () => (
    fetch(`${API}/api/linear-regression/random-data`)
    .then(async (res) => {
        const responseBody = await res.json();
        const xSteps = await getXSteps();
        return { ...responseBody, ...xSteps }
    })
)

const getXSteps = () => (
    fetch(`${API}/api/linear-regression/x-steps`)
    .then(res => res.json())
)

export default getRandomData;