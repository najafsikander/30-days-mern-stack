const baseUrl:string = 'http://localhost:8080/v1/';

export const getAllUsers = `${baseUrl}users/`;
export const getSingleUser = (id:string) => `${baseUrl}users/${id}`;