import { useState } from "react";
import Button from "../components/inputs/Button";
import { UserForm } from "../components/forms/UserForm";
import { FormType } from "../types/user";

export function LoginRegister() {
    const [type, setType] = useState<FormType>({type: "Login"});

    function onClick() {
        setType(type.type === "Login" ? {type: "SignUp"} : {type: "Login"})
    }
    return (
        <div className="login-page">
            {type.type === "Login" ? <UserForm type="Login" /> : <UserForm type="SignUp"/>}
            <Button label={type.type === "Login" ? "Register" : "Back to login" } onClick={onClick} style="standard"/>
        </div>
    )
}