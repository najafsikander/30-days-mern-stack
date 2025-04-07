const baseUrl:string = 'http://localhost:3000/v1/';

export const getAllUsers = `${baseUrl}users/`;
export const getSingleUser = (id:string) => `${baseUrl}users/user/${id}`;
export const updateSingleUser = (id:string) => `${baseUrl}users/user/${id}`;
export const changeUserPassword = (id:string) => `${baseUrl}auth/changePassword/${id}`;
export const newUserPassword = `${baseUrl}auth/newUserPassword`;
export const resetUserPassword = `${baseUrl}auth/sendResetPasswordMail` ;
export const giveUserRating = `${baseUrl}users/giveUserRating`;
export const getUserRating = `${baseUrl}users/getAllRatings`;
export const deleteUserRating = (id:string) => `${baseUrl}users/deleteUserRating/${id}`;
export const updateUserProfilePicture = (id:string) => `${baseUrl}users/updateUserProfilePicture/${id}`;