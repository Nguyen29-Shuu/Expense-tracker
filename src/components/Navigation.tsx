import { NavLink } from "react-router-dom";
import '../styles/Navigation.css'

function Navigation(){
    return(
        <nav className="navigation">
            <NavLink  className={({ isActive }) => isActive ? "active" : ""} 
                to="/" end>
                    Dashboar
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "active" : ""}
                to="/transactions" end>
                    Transactions
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "active" : ""}
                to="/analytics" end>
                    Analytics
            </NavLink>
        </nav>
    )
}
export default Navigation