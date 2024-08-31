import { getUser } from "./services/user.js"
import { getRepos } from "./services/repositories.js"
import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"
import { getEvents } from "./services/events.js"

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if (validateEmptyInput(userName))
        return
    getUserData(userName)
    getUserEvents(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if (isEnterKeyPressed) {
        if (validateEmptyInput(userName))
            return
        getUserData(userName)
        getUserEvents(userName)
    }
})

function validateEmptyInput(userName) {
    if (userName.length === 0) {
        alert("Prencha o campo com o nome do usuário do GitHub")
        return true
    }
}

async function getUserData(userName) {
    const userResponse = await getUser(userName)
    if (userResponse.message === "Not Found") {
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepos(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)

    screen.renderUser(user)
    getUserEvents(userName)

}
function getUserEvents(userName) {
    getEvents(userName).then(eventesData => {
        let eventsItens = ""
        eventesData.forEach(item => {
            if (item.type === "PushEvent") {
                eventsItens += `<div class="events"><li>${item.repo.name}: <p class="commits"> -${item.payload.commits[0].message}</p></li> </div>`
            }
            else { eventsItens += `${item.repo.name}: <div class="events"><p class="strong">Sem mensagem de commit</p></div>` }
        })

        document.querySelector('.profile-data').innerHTML += `<div class="repositories section">
        <h2>Últimos Eventos</h2>
        <div class="events">
        <ul>${eventsItens}</ul>
        </div>
        </div>`
    })
}