import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "../../Components/fields/Fields";

const  Nav =(props)=> {
    const navigate = useNavigate();
        return (
            <header className='guest'>
                <div className='top'>
                    <div className='container'>
                        <div className='logo-container'>
                            <Link to='/' className="Fdo">
                                <img src={props.logo} className="App-logo" alt="logo" />
                            </Link>
                        </div>
                        <div className='Fdo'>
                            <Button variant="Bsj _Dvgb" onClick={()=>navigate('/login')}>Se connecter</Button>
                        </div>
                        <div className='Fdo Pag'>
                            <Button variant="Bsj _Dvgb" onClick={()=>navigate('/register')}>S'inscrire</Button>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
export default Nav