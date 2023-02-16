import React, { useEffect } from "react";
import { withRouter } from "../../util/WithRouter";
import Fetch from "../../util/Fetch";
import { Camera, LoadingXlContent } from "../../icon/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRequestReceivedSlice } from "../../redux/RequestRedux";
import BtnActions from "./BtnActions";
import { BottomAffichage } from "../../Template/Template";
import { changeNextStatus, updateRequestStats } from "../../redux/UtilRedux";
const Received = (props) => {
    const [state, stateSet] = React.useState({
        disabled: false
    });
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch();
    const store = useSelector((state) => state)
    const ReceivedList = store.RequestReceivedList
    useEffect(() => {

        if (ReceivedList.length === 0 && store.Next_Page.love_request) {
            setLoading(true);
            var formData = new FormData();
            formData.append('url', 'RESTAPI/Match/received');
            formData.append('limit', 20);
            Fetch('/api', formData, res => {
                setLoading(false)
                dispatch(createRequestReceivedSlice(res.message))
                dispatch(changeNextStatus({ 'name': 'love_request', 'value': res.has_next_page }))

            })
        }
    }, []);
    React.useEffect(() => {
        dispatch(updateRequestStats());
        var formData = new FormData();
        formData.append('url', 'RESTAPI/Match/setMatchRequestasView');
        Fetch('/api', formData, res => {
        })
    }, [ReceivedList])

    const disableLink = () => {
        stateSet({ disabled: !state.disabled })
    }
    return <div className=" Ba2 g4R nF1 ">
        <div className="people-wrapper Fdo" style={{ padding: 0 }}>
            {loading ?
                <LoadingXlContent />
                :
                <>
                    {ReceivedList.map((e) => (
                        <div className={`member-wrapper  Fry`} key={e.user_id} style={{ maxHeight: 245 }}>
                            <Link to={`/${e.username}`} onClick={(e) => {
                                if (state?.disabled === true) {
                                    e.preventDefault()
                                }
                            }} className="profile-card ">
                                <div className="Fdo Anv Aic v2ao Vnk">
                                    <div className="DivroundListAvatar">
                                        <div className="roundListAvatarcontent">
                                            <div className="ListavatarContent"
                                                style={{
                                                    height: 56,
                                                    width: 56,
                                                    order: 2,
                                                    cursor: 'pointer',
                                                }}>
                                                <span className="_aa8h" style={{
                                                    height: 56,
                                                    width: 56,
                                                }}>
                                                    <img src={e.avatar} className="hty ELG hrt lazyload" />

                                                </span>
                                            </div>
                                            <div className="ListavatarContent"
                                                style={{
                                                    height: 56,
                                                    width: 56,
                                                    order: 1,
                                                    cursor: 'pointer',
                                                    marginRight: '-12px'
                                                }}>
                                                <span className="_aa8h" style={{
                                                    height: 56,
                                                    width: 56,
                                                }}>
                                                    <img className="_aa8j" src={store.Util.c_user.avatar.x56} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="info-content">
                                        <div className="profile-info">
                                            <div className="brief-info has-led">
                                                <div className="">
                                                    <span className="age">{e.first_name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <span>est interessé par votre profile</span>
                                </div>
                                <div className="DivMatchBotomContent">
                                    <BtnActions disableLink={disableLink} e={e} />
                                </div>
                            </Link>
                        </div>
                    ))}
                </>
            }
        </div>
        {ReceivedList.length === 0 && !loading && !store.Next_Page.love_request &&
            <BottomAffichage titre={'Aucune nouvelle personne interessé par votre profile'} texte={'vous voyez ici lorsq\'une personne est interessé par votre profile ou quand elle veut vous parler'} />
        }
    </div>
}

export default withRouter(Received)