import { User } from "../models/user";


/**
 * Funcion que recibe un usuario y lo adapta para la base de datos
 * 
 * @param {User} user 
 */
export const userModelToLocalhost = (user) => {

    const {

        firstName,
        lastName,
        balance,
        avatar,
        id,
        isActive,
        gender
    } = user;

    return {
        id,
        first_name: firstName,
        last_name: lastName,
        balance,
        avatar,
        isActive,
        gender
    };
}