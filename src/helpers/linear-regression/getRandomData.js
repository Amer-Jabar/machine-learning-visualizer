import { API } from "../..";

const getRandomData = () => (
    fetch(`${API}/api/logistic-regression/random-data`)
    .then(async (res) => {
        const responseBody = await res.json();
        return { ...responseBody }
    })
)

export default getRandomData;