import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { userModelToLocalhost } from "../mappers/user-to-localhost.mapper";
import { User } from "../models/user";


/**
 * 
 * @param {User} userLike 
 */
export const saveUser = async (userLike) => {

    const user = new User(userLike);

    if (!user.firstName || !user.lastName) {
        throw 'Nombre y apellido son requeridos';
    }

    const saveUser = userModelToLocalhost(user);

    if (saveUser.id) {
        return await updateUser(saveUser);
    }

    return await createUser(saveUser);
}


/**
 * 
 * @param {User} user 
 * @returns {User} 
 */

const createUser = async (user) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users`;

    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json'
        }

    });
    const newUser = await res.json();

    return localhostUserToModel(newUser);
}


/**
 * 
 * @param {User} user 
 * @returns {User}
 */
const updateUser = async (user) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;

    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json'
        }

    });
    const updatedUser = await res.json();
    return localhostUserToModel(updatedUser);

}