import React from "react";
import { useDispatch } from "react-redux";
import MyVerticallyCenteredModal from "../../Components/modal/modalCore";
import { Button } from "../Components/fields/Fields";
import { RetireUserOnMatchList } from "../redux/ContactsRedux";
import { closeAlertBox, showAlertBox } from "../redux/UtilRedux";
import Fetch from "../util/Fetch";
const Retire = (props) => {
    const [showModal, setShowModal] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch();
    const confirm = () => {
        setLoading(true);
        var formData = new FormData();
        formData.append('url', './RESTAPI/Contacts/delete')
        formData.append('user_id', props.user.user_id)
        Fetch('/api', formData, data => {
            setLoading(false);
            dispatch(showAlertBox(data))
            setTimeout(() => {
                dispatch(closeAlertBox());
            }, 1500);
            setShowModal(false);
            dispatch(RetireUserOnMatchList(props.user))
        })
    }
    return <>
        <div className="Fdo LDv">
            <Button variant="_8A5w5" onClick={() => setShowModal(true)}>Retirer</Button>
        </div>
        <MyVerticallyCenteredModal
            show={showModal}
            onHide={() => setShowModal(false)}
            size="sm"
            titre={`Retirer ${props.user.first_name}`}
        >
            <div className="Fdo Anv RpE">
                <div className="Fdo Anv Aic v2ao">
                    <div className=" iFc SMy SNs pBj bi6gxh9e IZT mWe">Attention!</div>
                    <div className="_2dbep Xs-User-Avatar">
                        <img src={props.user.avatar.x56} className="hty ELG hrt lazyload" />
                    </div>
                    <div className="e2ler">{props.user.first_name}</div>
                    <div className="">Si vous retirer cette personne, ça veut dire que vous voulez plus parler avec elle. Le match sera anullé</div>
                </div>
                <div className="Fdo Kmm Vnk">
                    <Button isLoading={loading} variant="_Dvgb" onClick={confirm}>confirmer</Button>
                </div>
            </div>
        </MyVerticallyCenteredModal>
    </>
}
export default Retire