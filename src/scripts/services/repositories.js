import { baseUrl, repositoriesEEventsQuantity } from "../variables.js"

async function getRepos(userName) {
    const response = await fetch(`${baseUrl}/${userName}/repos`)
    const repositories = await response.json()
    return repositories.slice(0, repositoriesEEventsQuantity)
}

export { getRepos }

//?per_page=${repositoriesEEventsQuantity}