// Note: While using some backends like Spring and Django, the body must be stringified.

import { API } from "../..";

const runAlgorithm = (algorithmData) => (
    fetch(`${API}/api/logistic-regression/execute`, {
        method: 'POST',
        body: JSON.stringify(algorithmData)
    })
    .then(res => res.json())
)

export default runAlgorithm;