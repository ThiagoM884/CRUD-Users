import { getUserById } from '../../use-cases/get-user-by-id';
import './render-modal.css'
import modalHtml from './render-modal.html?raw'

let modal;
let form;
let loadedUser;


/**
 * Funcion que permite mostrar el modal, recibe id en caso de edicion y si es null, es porque estamos creando
 * @param {String | Number} id 
 * 
 */
export const showModal = async (id) => {
    modal?.classList.remove('hide-modal');
    loadedUser = {};
    if (!id) return;

    const user = await getUserById(id);
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    loadedUser = user;
}

export const hideModal = () => {
    modal?.classList.add('hide-modal');
    form.reset();
}

/**
 * 
 * @param {HTMLDivElement} element 
 * @param {callback<Promise>} callback
 */
export const RenderModal = (element, callback) => {

    if (modal) return;

    modal = document.createElement('div');
    modal.classList.add('modal-container');
    modal.classList.add('hide-modal');
    modal.innerHTML = modalHtml;


    modal.addEventListener('click', (event) => {
        if (event.target.className === 'modal-container') {
            hideModal();
        }
        else {
            return;
        }
    });

    form = modal.querySelector('form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        if (!formData.has('isActive')) {
            formData.append('isActive', 'No');
        }

        const userLike = { ...loadedUser };
        for (const [key, value] of formData) {
            if (key === 'balance') {
                userLike[key] = Number(value);
                continue;
            }

            if (key === 'isActive') {
                userLike[key] = (value === 'on') ? 'Yes' : 'No';
                continue;
            }

            userLike[key] = value;
        }

        await callback(userLike);
        hideModal();

    });
    element.append(modal);
}