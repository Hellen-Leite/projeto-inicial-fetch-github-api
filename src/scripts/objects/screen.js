
const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                            <img src="${user.avatarUrl}" alt="Foto do usuário"/>
                            <div class="data">
                                 <h1>${user.name ?? 'Não possui nome cadastrado :"('}</h1>
                                 <p>${user.bio ?? 'Não possui bio cadastrada :"('}</p>
                                 <br>
                                 <span>${user.followers} seguidores  |</span>
                                 <span>|  ${user.following} seguindo</span>
                            </div>
                        </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo =>
            repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a>
            <div class="reposit">
                <p>Forks:${repo.forks}</p> 
                <p>Watchers:${repo.watchers}</p>
                <p>Stars:${repo.stargazers_count}</p>
                <p>Linguagem utilizada:${repo.language}</p>
            </div></li>`);

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
               <h2>Repositórios</h2>
               <ul>${repositoriesItens}</ul>
               </div>`
        }







        // let events = ''
        // getEvents.forEach(eventss => events = `<li style="display: flex">Repositório:${getEvents.repo.name} Commit: ${getEvents.payload.commits.message}</li>`)

    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }