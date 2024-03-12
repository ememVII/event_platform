export const headerLinks = [
    {
        title: 'Home',
        route: '/'
    },
    {
        title: 'Create Event',
        route: '/events/create'
    },
    {
        title: 'My Profile',
        route: '/profile'
    },
]

export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: ''
}