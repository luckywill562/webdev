import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../Components/fields/Fields";
import { AlertBottom } from "../../Template/Template";
import Fetch from "../../util/Fetch";
import { escapeHtml, trim } from "../../util/util";
import Container from "../Container";
import Input from "../Fields";

const ResetPassword = (props) => {
    const [Email, setEmail] = React.useState('');
    const location = useLocation();
    const [Autorised, setAutorised] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [Alert, setAlert] = React.useState();
    const [messageOnPage, setMessageOnPage] = React.useState();
    const [process, setProcess] = React.useState(false);
    const navigate = useNavigate()
    React.useEffect(() => {
        var formData = new FormData();
        formData.append('email', trim(Email));
        formData.append('url', 'RESTAPI/Auth/reset');
        Fetch(location.search, formData, res => {
            if (res.success === 1) {
                setAutorised(true);
            }
            setLoading(false);
        })
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        setProcess(true)
        var formData = new FormData();
        formData.append('password', trim(password));
        formData.append('passwordConfirm', trim(passwordConfirm));
        formData.append('url', 'RESTAPI/Auth/newPassword');
        Fetch(location.search, formData, res => {
            if (res.success === 1) {
                setMessageOnPage(res)
            } else {
                setAlert(res);
            }
            setProcess(false)
        })
    }
    const HandleChange = (e) => {
        if (e.target.name === 'password') {
            setPassword(e.target.value);
        } else if (e.target.name === 'passwordConfirm') {
            setPasswordConfirm(e.target.value)
        }
    }
    return <Container logo={props.logo}>
        {loading ?
            <h1>verification en cours...</h1>
            : !loading && !Autorised ?
                <Navigate to={'/login'} /> :
                !loading && Autorised && messageOnPage ?
                    <div className="Fdo ELG taijpn5t hty Aic Anv">
                        <div className="Fdo Aic v2ao">
                            <h1 className="guest-title animated-alement animate">{messageOnPage.message}</h1>
                        </div>
                        <Button variant={` ELG _Dvgb"`} onClick={()=>navigate(`/login`)}>Se connecter maintenant</Button>
                    </div>
                    :
                    <>
                        <div className="v2ao tlK SMy Vft">
                            <h3>Nouveau mot de passe</h3>
                        </div>
                        {Alert &&
                            <AlertBottom message={Alert.message} />
                        }
                        <form method="POST" className="Kmm" onSubmit={handleSubmit}>
                            <Input type="password" value={password} name="password" onChange={HandleChange} placeholder="nouveau mot de passe">Nouveau mot de passe</Input>
                            <Input type="password" value={passwordConfirm} name="passwordConfirm" onChange={HandleChange} placeholder="confirmez le nouveau mot de passe">confirmez le nouveau mot de passe</Input>
                            <Button isLoading={process} variant={`Fsvg ELG`}>changer mon mot de passe</Button>
                        </form>
                    </>
        }
    </Container>
}
export default ResetPassword