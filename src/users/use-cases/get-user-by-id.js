import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { User } from "../models/user";


/**
 * 
 * @param {String | Number} id
 * @returns {User} 
 */
export const getUserById = async (id) => {


    const URL = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
    const res = await fetch(URL);
    const userAux = await res.json();
    const user = localhostUserToModel(userAux);


    return user;
}