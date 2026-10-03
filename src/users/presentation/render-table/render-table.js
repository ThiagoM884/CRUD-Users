import usersStore from '../../store/users-store';
import { deleteUserById } from '../../use-cases/delete-user-by-id';
import { showModal } from '../render-modal/render-modal';
import './render-table.css'

let table;

const createTable = () => {

    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');

    tableHeaders.innerHTML = `
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>`;

    const tableBody = document.createElement('tbody');
    table.append(tableHeaders, tableBody);

    return table;
}

/**
 * 
 * @param {HTMLDivElement} element 
 */

export const RenderTable = (element) => {

    const users = usersStore.getUsers();

    if (!table) {
        table = createTable();
        element.append(table);

        // LISTENER PARA LA EDICION
        table.addEventListener('click', event => {
            const data = event.target.closest(".select-item");

            if (!data) return;

            const idData = data.getAttribute('data-id');
            showModal(idData);

        });

        // LISTENER PARA LA ELIMINACIÓN
        table.addEventListener('click', async (event) => {
            const element = event.target.closest(".delete-item");
            if (!element) return;

            const idElement = element.getAttribute('data-id');

            try {
                await deleteUserById(idElement);
                await usersStore.reloadPage();
                RenderTable();
                document.querySelector('#current-page').innerText = usersStore.getCurrentPage();


            } catch (error) {
                console.log(error);
                alert('No se pudo eliminar el registro');
            }
        });
    }

    let tableHtml = '';
    users.forEach(user => {
        tableHtml += `
        <tr>
            <td>${user.id}</td>
            <td>${user.balance}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.isActive ? 'Yes' : 'No'}</td>
            <td>
                <a href="#" class="select-item" data-id="${user.id}">Select</a>
                |
                <a href="#" class="delete-item" data-id="${user.id}">Delete</a>
            </td>
        </tr>`;

    });

    table.querySelector('tbody').innerHTML = tableHtml;

}