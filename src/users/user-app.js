import { RenderAddButton } from "./presentation/render-add-button/render-add-button";
import { RenderButton } from "./presentation/render-buttons/render-button";
import { RenderModal } from "./presentation/render-modal/render-modal";
import { RenderTable } from "./presentation/render-table/render-table";
import usersStore from "./store/users-store";
import { saveUser } from "./use-cases/save-user";


/**
 * 
 * @param {HTMLDivElement} element 
 */

export const UserApp = async (element) => {

    element.innerHTML = 'Loading...';
    await usersStore.loadNextPage();
    element.innerHTML = '';
    RenderTable(element);
    RenderButton(element);
    RenderAddButton(element);
    RenderModal(element, async (userLike) => {
        const user = await saveUser(userLike);
        await usersStore.onUserChanged(user);
        RenderTable();
    });
}