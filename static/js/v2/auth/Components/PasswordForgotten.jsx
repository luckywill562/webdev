import React from "react";
import { Button } from "../../Components/fields/Fields";
import Fetch from "../../util/Fetch";
import { trim } from "../../util/util";
import Container from "../Container";
import Input from "../Fields";
import { AlertBottom } from "../../Template/Template";
import Footer from './Footer'
const PasswordForgotten = ({ logo }) => {
    const [Email, setEmail] = React.useState('');
    const [messageOnPage, setMessageOnPage] = React.useState();
    const [Alert, setAlert] = React.useState();
    const [process, setProcess] = React.useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setProcess(true)
        var formData = new FormData();
        formData.append('email', trim(Email));
        formData.append('url', 'RESTAPI/Auth/forgotten');
        Fetch('/forgotten', formData, res => {
            if (res.success === 1) {
                setMessageOnPage(res)
                setAlert();
            } else {
                setAlert(res);
            }
            setProcess(false);
        })
    }
    const HandleChange = (e) => {
        setEmail(e.target.value)
    }
    return <>
        {Alert &&
            <AlertBottom message={Alert.message} />
        }
        {messageOnPage ?
            <div className="Fdo ELG taijpn5t hty">
                <div className="Fdo Aic">
                    <h1 className="guest-title animated-alement animate">{messageOnPage.message}</h1>
                </div>
            </div>
            :
            <Container logo={logo}>
                <div className="v2ao tlK SMy Vft">
                    <h3>Mot de passe oublié</h3>
                </div>
                <form method="POST" className="Kmm" onSubmit={handleSubmit}>
                    <Input type="email" value={Email} name="email" onChange={HandleChange} placeholder="votre adresse email">Adresse email</Input>
                    <Button isLoading={process} variant={`Fsvg ELG`}>Récuperer mon compte</Button>

                </form>
            </Container>
        }
        <Footer />
    </>
}
export default PasswordForgotten