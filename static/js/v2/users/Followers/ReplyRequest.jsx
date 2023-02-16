import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../Components/fields/Fields";
import { FollowRequestListButtonAction } from "../../redux/RequestRedux";
import { changeButtonOnaccetpt } from "../../redux/UserProfiles";
import { closeAlertBox, showAlertBox } from "../../redux/UtilRedux";
import Fetch from "../../util/Fetch";

const ReplyRequest = (props) => {
    const dispatch = useDispatch();
    const [AcceptLoading, setAcceptLoading] = React.useState(false)
    const [DeleteLoading, setDeleteLoading] = React.useState(false)
    const Reply = (action) => {
        if (action === 'ACCEPT') {
            setAcceptLoading(true);
        } else {
            setDeleteLoading(false);
        }
        let formData = new FormData();
        formData.append("action", action)
        formData.append('url', 'RESTAPI/Users/follow')
        formData.append("user_id", props.user.user_id)
        Fetch('/api', formData, (res) => {
            if (res.success === 1) {
                dispatch(changeButtonOnaccetpt({ 'user_id': props.user.user_id }))
                dispatch(FollowRequestListButtonAction({ 'user_id': props.user.user_id }))
            }
            dispatch(showAlertBox(res));
            setTimeout(() => {
                dispatch(closeAlertBox());
            }, 2000);
        })
    }
    return <>
        <div className="Fdo LDv">
            <Button variant="_8A5w5" isLoading={DeleteLoading} disabled={AcceptLoading} onClick={() => Reply('DECLINE')}>réfuser</Button>
        </div>
        <div className="Fdo ">
            <Button variant="_Dvgb" isLoading={AcceptLoading} disabled={DeleteLoading} onClick={() => Reply('ACCEPT')}>accepter</Button>
        </div>
    </>
}
export default ReplyRequest