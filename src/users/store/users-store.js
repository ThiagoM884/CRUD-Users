import { loadUsersByPage } from "../use-cases/load-users-by-page";


const state = {
    users: [],
    currentPage: 0
};

const loadNextPage = async () => {
    const { users, pages } = await loadUsersByPage(state.currentPage + 1);
    if (pages === state.currentPage) return;

    state.currentPage += 1;
    state.users = users;
}


const loadPreviousPage = async () => {
    if (state.currentPage === 1) return;
    const { users } = await loadUsersByPage(state.currentPage - 1);

    state.currentPage -= 1;
    state.users = users;
}

const onUserChanged = (userUpdated) => {
    let wasFound;

    state.users = state.users.map(user => {
        if (user.id === userUpdated.id) {
            wasFound = true;
            return userUpdated;
        }
        return user;
    })

    if (state.users.length < 10 && !wasFound) {
        state.users.push(userUpdated);
    }

}

const reloadPage = async () => {
    const { users, pages } = await loadUsersByPage(state.currentPage);

    console.log("Usuarios recibidos:", users.length);
    console.log("Páginas disponibles:", pages);

    if (users.length === 0 && state.currentPage != 1) {
        await loadPreviousPage();
        return;
    };
    state.users = users;
}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,

    /**
     * 
     * @returns {User[]}
     */
    getUsers: () => [...state.users],

    /**
     * 
     * @returns {Number}
     */
    getCurrentPage: () => state.currentPage
}
