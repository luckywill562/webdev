import React from "react";
import fetch from "../../../util/fetch";
import { PersonAdd } from "../../../icon/icons";
import MyVerticallyCenteredModal from "../../../../Components/modal/modalCore";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { closeAlertBox, showAlertBox } from "../../../redux/UtilRedux";
import { onClickFollowButton, onClickFollowersButtonAction, onClickFollowingsButtonAction } from "../../../redux/UserProfiles";
import { updateButtonAllSuggestions, updateButtonUserSuggestions } from "../../../redux/SuggestionsRedux";
import Cookies from "js-cookie";
import { ModalMenu } from "../Template";
import { withRouter } from "../../../util/WithRouter";
const FollowBtn = (props) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state)
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const FollowUser = () => {
    if (props.user.private && !props.user.requested_follow_by_viewer && !props.user.followed_by_viewer) {
      var action = 'REQUEST';
    } else if (props.user.has_requested_follow_viewer) {
      var action = 'REPLY';
    } else if (!props.user.private && !props.user.has_requested_follow_viewer && !props.user.followed_by_viewer) {
      var action = 'FOLLOW';
    } else if (props.user.followed_by_viewer) {
      var action = 'UNFOLLOW';
    } else if (props.user.requested_follow_by_viewer) {
      var action = 'DELETE_REQUEST';
    }
    setLoading(true);
    setModal(false)
    var formData = new FormData();
    formData.append("action", action)
    formData.append('url', 'RESTAPI/Users/follow')
    formData.append("user_id", props.user.user_id)
    fetch('./api', formData, (data) => {
      if (data?.success == 1) {
        dispatch(onClickFollowButton({ 'user_id': props.user.user_id, 'type': data.type }));
        dispatch(updateButtonUserSuggestions({ 'user_id': props.user.user_id, 'type': data.type }))
        dispatch(updateButtonAllSuggestions({ 'user_id': props.user.user_id, 'type': data.type }))
        dispatch(onClickFollowersButtonAction({ 'user_id': props.user.user_id, 'type': data.type }))
        dispatch(onClickFollowingsButtonAction({ 'user_id': props.user.user_id, 'type': data.type }))
      }
      setLoading(false);
      dispatch(showAlertBox(data));
      setTimeout(() => {
        dispatch(closeAlertBox());
      }, 2000);
      if (data.success === 1 && data.type === "REQUEST" || data.type === 'UNFOLLOW' || data.type ==='DELETE_REQUEST' && props.user.private) {
        let payload = {
          data_type: 'notifications',
          sub_type: 'NEW_FOLLOWING_REQUEST',
          c_user: store.Util.c_user.user_id,
          security_token: Cookies.get('isLogedin'),
          client_id: parseInt(props.user.user_id),
          user_data: data.user,
          follower_type: data?.type
        };
        store.Util.ws.send(JSON.stringify(payload));

      }
    })
  }
  return <div className={`Fdo ${props.type === 'button' && 'Lbdf '}`}>

    {!props.user.viewer &&
      <>
        <div className="Fdo RpE">
          {loading &&
            <div className="ApE kVc hty ELG p1c">
              <div className="Fdo hty  Aic Lns">
                <Spinner size="sm" animation="border" />
              </div>
            </div>
          }
          {props.user.followed_by_viewer ?
            <button className={`sqdOP   L3NKy ZIAjV  ${props.type === 'button' ? ` Xdg Bsj Bgu` : "lZJ"}`} onClick={() => setModal(true)}>
              <div className="Fdo">
                {props.type === 'button' && (
                  <span className="Fdo Aic">
                    <PersonAdd size={18} />
                  </span>
                )
                }
                <span className="Fdo LmP">Abonné(e)</span>
              </div>
            </button>
            :
            <button to="#" className={`sqdOP   L3NKy ZIAjV ${props.type === 'button' ? ` Xdg Bsj ${props.user.requested_follow_by_viewer || props.user.followed_by_viewer ? `Bgu` : `_Dvgb`} ` : " lZJ "}`} onClick={FollowUser}>
              <div className="Fdo">
                {props.type === 'button' && (
                  <span className="Fdo Aic">
                    <PersonAdd size={18} />
                  </span>
                )
                }
                {props.user.requested_follow_by_viewer ?
                  <span className="Fdo LmP">Demande envoyé</span>
                  :
                  <span className="Fdo LmP">S'abonner {props?.user?.has_follow_viewer ? 'en retour' : ''}</span>
                }
              </div>
            </button>
          }
        </div>
        <MyVerticallyCenteredModal
          show={modal}
          onHide={() => setModal(false)}
          size="logout"
          nopadding="true"
        >

          <div className="Fdo Anv Bsj Lns" style={{ width: 220, minHeight: 60 }}>
            <div className="Fdo Anv">
              <ModalMenu onClick={FollowUser} to="#" variant="hbc">
                Se désabonner
              </ModalMenu>
              <ModalMenu state={{ background: props.location }} to={`/${props.user?.username}/premium`} variant="g1lx">
                devenir premium
              </ModalMenu>
            </div>
          </div>
        </MyVerticallyCenteredModal>
      </>
    }
  </div>
}
export default withRouter(FollowBtn)