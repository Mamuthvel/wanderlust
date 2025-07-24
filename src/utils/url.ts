const URLs = {
    Register: '/register',
    Login: '/login',
    User: '/user',
    Users: '/users',
    GetDestination: '/getalldestination',
    GetProperty: '/getallproperty',
    GetRoomsFromProperty: (propertId: string) => `/property/${propertId}/rooms`
}
export default URLs;