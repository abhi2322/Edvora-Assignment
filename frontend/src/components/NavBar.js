import React from 'react'
import pokeLogo from '../Assets/pokmonLogo.png'
import {useNavigate} from 'react-router-dom';
import logoutBtn from '../Assets/logoutBtn.png'
function NavBar(props) {
    const navigate = useNavigate();
    const LogoutHandler=()=>{
        localStorage.clear();
        navigate('/')
    }
    return (
        <div className="navbar">
            <img style={{width:"180px",height:"100px"}} src={pokeLogo} alt="POKEMON"></img>
            <div className="navbarIcons">
                <div className="userName">{`Welcome ${props.userName.substring(1)}`}</div>
                <button className="btnLogout" onClick={LogoutHandler}>
                    <img style={{width:"24px",height:"24px"}} src={logoutBtn} alt="logout"></img>
                </button>
            </div>
        </div>
    )
}

export default NavBar
