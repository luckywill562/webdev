import React from "react";
import { withRouter } from "../../util/WithRouter";
import MyVerticallyCenteredModal from "../../../Components/modal/modalCore";
import { Button } from "../../Components/fields/Fields";
import Croppie from 'croppie'
import Fetch from "../../util/Fetch";
const $image_crop = {
    enableExif: true,
    enableOrientation: true,
    viewport: {
        height: 250,
        width: 250,
        type: "square"
    },
    boundary: {
        width: 440,
        height: 400
    }
};
const AvatarChange = () => {
    const changeAvatarRef = React.useRef();
    const [state, stateSet] = React.useState({
        c: undefined,
    });
    const [modal, setModal] = React.useState(false);
    const [loadingChange, setLoadingChange] = React.useState(false);
    const ChangeProfilPicture = (e) => {
        setModal(true);
        setTimeout(() => {
            const c = new Croppie(changeAvatarRef.current, $image_crop)
            stateSet({ c });
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                c.bind({ url: reader.result });
            }
        }, 1);

    }
    const onResult = e => {
        setLoadingChange(true)
        state.c.result("base64").then(base64 => {
            var formData = new FormData();
            formData.append('url', 'RESTAPI/updateUserAvatar')
            formData.append('image', base64)
            Fetch('/api', formData, res => {
                setModal(false)
                setLoadingChange(false);
            })
        });
    };
    return <div className="bYmF4e">
        <input type="file" onChange={ChangeProfilPicture} className="changePicPen" accept="image/*" />
        <div className="Ad3F">
            <svg width="24" height="24" className="sFc" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"></circle><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
        </div>
        <MyVerticallyCenteredModal
            show={modal}
            titre='Modifier la photo de profile'
            onHide={() => setModal(false)}
            nopadding="true"
        >
            <div className="Fdo Aic ELG Anv">
                <div className="Fdo ELG kzZ m2F zI7 iyn Hsu Anv">
                    <div className="Fdo ELG Anv" ref={changeAvatarRef}></div>
                    <div className="Fdo Cdf Pag vcx">
                        <div className="Fdo Aic Cdf ">
                            <Button variant=" _8A5w5" onClick={() => setModal(false)}>Annuler</Button>
                        </div>
                        <div className="Fdo aBv Cdf">
                            <Button variant=" _Dvgb " isLoading={loadingChange} onClick={onResult} >Suivant</Button>
                        </div>
                    </div>
                </div>
            </div>
        </MyVerticallyCenteredModal>
    </div>
}
export default withRouter(AvatarChange)