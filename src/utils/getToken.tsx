export const isAuthenticatedRoute = () => {
    const token = localStorage.getItem('token');
    return !!token
}