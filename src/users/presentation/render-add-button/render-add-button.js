import { showModal } from '../render-modal/render-modal';
import './render-add-button.css'


/**
 * 
 * @param {HTMLDivElement} element 
 */
export const RenderAddButton = (element) => {

    const btnAdd = document.createElement('button');
    btnAdd.innerText = "+";
    btnAdd.classList.add('fab-button');
    element.append(btnAdd);


    btnAdd.addEventListener('click', () => {
        showModal();
    })
}