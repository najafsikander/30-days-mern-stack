const baseUrl:string = 'http://localhost:8080/v1/';

export const getAllUsers = `${baseUrl}users/`;
export const getSingleUser = (id:string) => `${baseUrl}users/${id}`;
export const updateSingleUser = (id:string) => `${baseUrl}users/${id}`;
export const changeUserPassword = (id:string) => `${baseUrl}auth/changePassword/${id}`;
export const resetUserPassword = `${baseUrl}auth/sendResetPasswordMail` ;