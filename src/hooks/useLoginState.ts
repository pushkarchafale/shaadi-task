
import { useEffect, useState } from 'react';

const useLoginState = (value: boolean) => {
    
    let initialState: boolean;
    let storedValue: string = window.localStorage.getItem('isLoggedin') || '';
    try {
        initialState = JSON.parse(storedValue) || value;
    } catch (err) {
        initialState = value;
    }
    
    let [isLoggedIn, setIsLoggedIn] = useState(initialState);

    useEffect(() => {
        window.localStorage.setItem('isLoggedin', isLoggedIn.toString())
    }, [isLoggedIn])

    return [isLoggedIn, setIsLoggedIn];
}

export default useLoginState;