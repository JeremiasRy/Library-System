import { useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHook";
import { login, register } from "../../redux/reducers/userReducer";
import { FormType, SignIn, SignUp } from "../../types/user";
import Button from "../inputs/Button";
import InputText from "../inputs/InputText";
import { PasswordWarnings } from "../PasswordWarnings";

export function UserForm(props:FormType) {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function clearFields() {
        setUsername("");
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
    }

    function onSubmit() {
        if (props.type === "Login") {
            let credentials:SignIn = {
                email: email,
                password: password
            }
            dispatch(login(credentials));
        } else {
            let newUser:SignUp = {
                username: username,
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
            }
            dispatch(register(newUser));
        }
        setTimeout(() => {
            clearFields();
        }, 500);
    }

    return (
        <div className="user-form">
            <h1>{props.type === "Login" ? "Login" : "Sing up for a library experience!"}</h1>
            <div className="user-form__inputs-wrapper">
                {props.type === "Login" && 
                <>
                <InputText label="Email" style="standard" type="email" state={email} setState={setEmail}/>
                <InputText label="Password" style="standard" type="password" state={password} setState={setPassword}/>
                </>}
                {props.type === "SignUp" &&
                <>
                <InputText label="Username" style="standard" type="text" state={username} setState={setUsername} />
                <InputText label="Email" style="standard" type="email" state={email} setState={setEmail}/>
                <InputText label="Firstname" style="standard" type="text" state={firstname} setState={setFirstname} />
                <InputText label="Lastname" style="standard" type="text" state={lastname} setState={setLastname} />
                <InputText label="Password" style="standard" type="password" state={password} setState={setPassword}/>
                <PasswordWarnings password={password}/>
                </>}
            </div>
            <div className="user-form__submit-button">
                <Button label={props.type === "Login" ? "Login" : "Register"} onClick={onSubmit} style="standard"/>
            </div>
        </div>
    )
}