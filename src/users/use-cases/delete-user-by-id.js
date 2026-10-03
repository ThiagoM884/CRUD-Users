
/**
 * 
 * @param {String | Number} id 
 */
export const deleteUserById = async (id) => {
    const URL = `${import.meta.env.VITE_BASE_URL}/users/${id}`;

    const res = await fetch(URL, {
        method: 'DELETE'
    });
    const result = await res.json();
    console.log({ result });
    return true;
}