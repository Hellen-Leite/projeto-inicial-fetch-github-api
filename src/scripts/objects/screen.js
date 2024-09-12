
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
                                        <p>Forks:${repo.forks ?? 'Este usuário não possui Forks'}</p> 
                                        <p>Watchers:${repo.watchers ?? 'Sem watchers'}</p>
                                        <p>Stars:${repo.stargazers_count ?? 'Sem Stars no momento'}</p>
                                        <p>Linguagem utilizada:${repo.language ?? 'Linguagem não convencional'}</p>
                                    </div>
                                  </li>`);

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                    <h2>Repositórios</h2>
                                                    <ul>${repositoriesItens}</ul>
                                           </div>`
        }

        let eventss = ''
        user.events.forEach(item => {
            if (item.type === "PushEvent") {
                eventss += `<div class="events">
                                <li>${item.repo.name}: 
                                    <p class="commits"> -${item.payload.commits[0].message}</p>
                                </li> 
                            </div>`
            }
            else {
                eventss += `${item.repo.name}: 
                            <div class="events">
                                <p class="strong">Sem mensagem de commit</p>
                            </div>` }
        })


        this.userProfile.innerHTML += `<div class="repositories section">
                                        <h2>Últimos Eventos</h2>
                                        <div class="events">
                                            <ul>${eventss}</ul>
                                        </div>
                                       </div>`

    },

    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }