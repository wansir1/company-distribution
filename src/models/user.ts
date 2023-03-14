import {useState, useCallback} from 'react'

export default function user () {
    const [user, setUser] = useState<API.IUser>({id:11, name: 'test', passward: '123'});
    const singin = useCallback((name: string, passward: string) => {
        setUser({
            id: 1,
            name,
            passward,
        })
    }, [])
    const singout = useCallback(() => {
        setUser({} as API.IUser);
    }, [])

    return {
        user,
        singin,
        singout
    }
}