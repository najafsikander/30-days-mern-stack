export const isAuthorized = (userRole:string, roles: string[]):boolean => {
    const result:boolean =  roles.includes(userRole);
    return result;
}