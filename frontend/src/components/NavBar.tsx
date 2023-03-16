import NavElement from "./NavElement";

export default function NavBar() {
    return (
        <div className="navbar">
            <h1>My library</h1>
            <div className="navbar__nav-elements">
                <NavElement name="Books" to="books"/>
                <NavElement name="Loans" to="loans" />
                <NavElement name="Profile" to ="profile" />
                <NavElement name="Categories" to="categories" />
                <NavElement name="Authors" to="authors" />
                <NavElement name="Publishers" to="publishers" />
            </div>
        </div>
    )
}