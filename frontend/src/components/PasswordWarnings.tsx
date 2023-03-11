export function PasswordWarnings(props: {password:string}) {
    function longEnough():boolean {
        return props.password.length < 8;
    }
    function hasUppercase():boolean {
        for (let i = 0; i < props.password.length; i++) {
            if (props.password.charCodeAt(i) >= 65 && props.password.charCodeAt(i) <= 90) {
                return true;
            }
        }
        return false;
    }
    return (
        <p>{longEnough() && "Password is not long enough"}{!hasUppercase() && " Add a uppercase letter to your password"}</p>
    )
}