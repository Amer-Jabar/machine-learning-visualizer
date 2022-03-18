// Note: While using some backends like Spring and Django, the body must be stringified.

const runAlgorithm = (algorithmData) => (
    fetch('http://127.0.0.1:8000/api/linear-regression/execute', {
        method: 'POST',
        body: JSON.stringify(algorithmData)
    })
    .then(res => res.json())
)

export default runAlgorithm;