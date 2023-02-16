import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../Components/fields/Fields";
import { unshiftUserOnList } from "../../redux/RequestRedux";
import { showAlertBox, showMatchBox } from "../../redux/UtilRedux";
import Fetch from "../../util/Fetch";
import Cookies from "js-cookie";
import { changeUserProfileElement } from "../../redux/UserProfiles";
const BtnActions = (props) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state)
    const [state, stateSet] = React.useState({
        loadingAccept: false,
        loadingDelete: false,
    });
    const HandleClick = (id, action) => {
        props.disableLink();
        if (action === 'REFUSE') {
            stateSet({ loadingDelete: true });
        } else if (action === 'ACCEPT') {
            stateSet({ loadingAccept: true })
        }
        var formData = new FormData();
        formData.append('action', action)
        formData.append('url', 'RESTAPI/Users/Like');
        formData.append("liked_id", id)
        Fetch('./api', formData, (data) => {
            stateSet({ loadingDelete: false, loadingAccept: false });
            props.disableLink();
            dispatch(showAlertBox(data));
            if (data.success === 1) {
                dispatch(unshiftUserOnList(id));
            }
            if (data.success === 1 && data.payload && data.payload.type === 'ACCEPT') {
                dispatch(showMatchBox(props.e))
                dispatch(changeUserProfileElement({ user_id: id, name: 'has_match_with_viewer' }))

                let payload = {
                    data_type: 'notifications',
                    sub_type: 'NEW_MATCH_REQUEST',
                    c_user: store.Util.c_user.user_id,
                    security_token: Cookies.get('isLogedin'),
                    client_id: parseInt(id),
                    payload: { count: data.payload.count, type: data.payload.type, user: store.Util.c_user },
                };
                store.Util.ws.send(JSON.stringify(payload));
            }else if(data.success === 1 && data.payload &&  data.payload.type === 'REFUSE'){
                dispatch(changeUserProfileElement({ user_id: id, name: 'has_requested_love_viewer' }))
            }
        })
    }
    return (
        <>
            <div className="Fdo ELG Ert LDv">
                <Button variant={`Lbg ELG`} isLoading={state.loadingAccept} disabled={state.loadingDelete} onClick={(event) => {
                    event.preventDefault()
                    HandleClick(props.e.user_id, 'ACCEPT')
                }}>oui, je suis interessé</Button>
            </div>
            <div className="Fdo ELG Ert">
                <Button variant={`_8A5w5 ELG`} disabled={state.loadingAccept} isLoading={state.loadingDelete} onClick={(event) => {
                    event.preventDefault()
                    HandleClick(props.e.user_id, 'REFUSE')
                }}>ça ne m'interesse pas</Button>
            </div>
        </>
    )
}
export default BtnActions