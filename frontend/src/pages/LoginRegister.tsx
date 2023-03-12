import { useState } from "react";
import Button from "../components/Button";
import { UserForm } from "../components/UserForm";
import { FormType } from "../types/user";

export function LoginRegister() {
    const [type, setType] = useState<FormType>({type: "Login"});

    function onClick() {
        setType(type.type === "Login" ? {type: "SignUp"} : {type: "Login"})
    }
    return (
        <div className="login-page">
            
            <Button label={type.type === "Login" ? "Register" : "Login" } onClick={onClick} style="standard"/>
            {type.type === "Login" ? <UserForm type="Login" /> : <UserForm type="SignUp"/>}
        </div>
    )
}