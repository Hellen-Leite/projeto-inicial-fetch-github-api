import { baseUrl, repositoriesEEventsQuantity } from "../variables.js"

async function getRepos(userName) {
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoriesEEventsQuantity}`)
    return await response.json()
}

export { getRepos }