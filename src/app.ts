export async function getInitialState(): Promise<API.IUser> {
    return Promise.resolve({
        id: 0,
        name: ''
    })
}