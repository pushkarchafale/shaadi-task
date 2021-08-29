import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Login from "./Login";
import Users from "./User";

interface InitialProp {
    isLoggedIn: boolean,
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

const ValidateUser = (props: InitialProp) => {
    let [component, setComponent] = useState(props.isLoggedIn ? <Users  isLoggedIn={props.isLoggedIn}/> : <Login isLoggedIn={props.isLoggedIn as boolean} setIsLoggedIn={props.setIsLoggedIn as Dispatch<SetStateAction<boolean>>}/>);
    
    useEffect(() => {
        setComponent(props.isLoggedIn ? <Users isLoggedIn={props.isLoggedIn} /> : 
            <Login  isLoggedIn={props.isLoggedIn as boolean} setIsLoggedIn={props.setIsLoggedIn as Dispatch<SetStateAction<boolean>>}/>)
    }, [props.isLoggedIn, props.setIsLoggedIn])
    
    return (
        component
    );
}

export default ValidateUser;