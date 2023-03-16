import { SetStateAction, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHook";
import { editUser } from "../../redux/reducers/userReducer";
import { EditUser, User } from "../../types/user";
import Button from "../inputs/Button";
import InputText from "../inputs/InputText";

export default function EditUserForm(props: {user:User}) {
    const dispatch = useAppDispatch();
    const [id, setId] = useState<number>();
    const [newPassword, setNewPassword] = useState<string>("");
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setId(props.user.id);
        setUsername(props.user.username);
        setFirstname(props.user.firstname);
        setLastname(props.user.lastname);
        setEmail(props.user.email);
    }, [props]);

    function submitAction() {
        let updateUser:EditUser = {
            id:id as number,
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
            newPassword: newPassword === "" ? null : newPassword,
            password: password
        }
        dispatch(editUser(updateUser));
    }
    return (
        <div className="user-edit-form">
            <InputText type={"text"} state={username} setState={setUsername} label={"Username"} style={"standard"} />
            <InputText type={"text"} state={firstname} setState={setFirstname} label={"Firstname"} style={"standard"} />
            <InputText type={"text"} state={lastname} setState={setLastname} label={"Lastname"} style={"standard"} />
            <InputText type={"email"} state={email} setState={setEmail} label={"Email"} style={"standard"} />
            <InputText type={"password"} state={password} setState={setPassword} label={"Enter password to make changes"} style={"standard"} />
            <InputText type={"password"} state={newPassword} setState={setNewPassword} label={"New password (Leave empty if you don't want to change password)"} style={"standard"} />
            <Button onClick={submitAction} label={"Submit"} style={"standard"} />
        </div>
    )
}