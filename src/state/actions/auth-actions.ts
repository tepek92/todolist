export const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return ({type: 'login/SET-IS-LOGGED-IN', isLoggedIn} as const);
}
