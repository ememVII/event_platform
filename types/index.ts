

export type CreateUserParams = {
    clerkId: string,
    email: string,
    firstName: string,
    lastName: string,
    username: string,
    photo: string
}

export type UpdateUserParams = {
    firstName: string,
    lastName: string,
    username: string,
    photo: string
}