import React from "react";
import { Gift, LoadingXlContent } from "../../../icon/icons";
import MyVerticallyCenteredModal from "../../../../Components/modal/modalCore";
import { Button } from "../../../Components/fields/Fields";
import Fetch from '../../../util/Fetch'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from "react-redux";
import { createGiftsSlice } from "../../../redux/UtilRedux";
import { withRouter } from "../../../util/WithRouter";
import { changeMessagePosition, pushNewMessage } from "../../../redux/InboxRedux";

const Gifts = (props) => {
    const [loading, setLoading] = React.useState(false);
    const [giftToSend, setGiftToSend] = React.useState(undefined);
    const [process, setProcess] = React.useState(false);
    const dispatch = useDispatch();
    const store = useSelector((store) => store);
    React.useEffect(() => {
        if (props.open &&store.GiftLists.length === 0) {
            setLoading(true)
            var formData = new FormData();
            formData.append('url', 'RESTAPI/Gift/gift')
            Fetch('/api', formData, res => {
                setLoading(false);
                dispatch(createGiftsSlice(res.giftList));
            })
        }
    }, [props.open])
    const check = (id) => {
        setGiftToSend(id)
    }
    const sendGift = () => {
        props.close()
        const fake_ID = Date.now();
        const copy = { "subject": 'un cadeaux', "id": fake_ID, "sender_id": Cookies.get('s_id'), "user_id": props.useParams.id, "media": 0, "created_time": { "count": 0, "time": "m" }, "sended": true, "mesmedia": [], "status": 0, "type": 2, process: true,error: false}
        const uedeux = { "subject": 'un cadeaux', "client_id": props.useParams.id, "id": fake_ID, "client": {"user": props.client }, "status": 0, "sender_id": Cookies.get('s_id'), "sended": true, "online_status": false, "ismedia": false, "conversations": [] }
        dispatch(pushNewMessage(copy));
        dispatch(changeMessagePosition(uedeux));
        let data = {
            data_type: 'message_text',
            sub_type: 'Gift',
            gift_id: giftToSend,
            client_id: props.useParams.id,
            c_user: Cookies.get('s_id'),
            security_token: Cookies.get('isLogedin'),
            msg: '🎁',
            media: 0,
            fake_ID: fake_ID,
            type: "GIFT",
            price: 0,
        };
        store.Util.ws.send(JSON.stringify(data));
    }
    return <>
        
        <MyVerticallyCenteredModal
            show={props.open}
            onHide={props.close}
            titre="Choisir un cadeau"
            size="gift">
            <div className="Fdo Anv Aic ELG eGOV_ Aic">
                {loading ?
                    <LoadingXlContent />
                    :
                    <div className="Fdo Aic kzZ jifvfom9 d76ob5m9 k4urcfbm rq0escxv">
                        {store.GiftLists.map((e, index) => (
                            <div key={index} className="kb5gq1qc pIc pfnyh3mw rs0gx3tq tvfksri0 w0hvl6rk hcukyx3x RpE ">
                                <div className={giftToSend === e.gift_id ? "Fdo Anv vag wfh Aic Lns QOqBd Ngt e6nwac2 ghjf" : "Fdo Anv vag wfh Aic Lns QOqBd Ngt e6nwac2 "} onClick={() => check(e.gift_id)}>
                                    <div className="Fdo">
                                        <span className={`icon`}>{e.gift_icon}</span>
                                    </div>
                                    <div className="Fdo">
                                        <span className="v2ao">{e.gift_name}</span>
                                    </div>
                                    <div className="Fdo">
                                        <span className="v2ao">{e.gift_price} {e.devise}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="Fdo Anv pybr56ya Kmm ELG">
                            <Button variant="_Dvgb" disabled={giftToSend === undefined ? true : false} isLoading={process} onClick={sendGift}>Envoyer</Button>
                        </div>
                    </div>
                }
            </div>
        </MyVerticallyCenteredModal>
    </>
}
export default withRouter(Gifts)