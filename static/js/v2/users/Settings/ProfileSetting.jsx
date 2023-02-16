import React from "react";
import { Dropdown } from "react-bootstrap";
import DrpCore from "../../Components/dropdown/core/DropdownCore.jsx"
import CustomToggle from "../../Components/dropdown/core/customButtonToggle"
import { DropdownContentTemplate } from "../../Template/Template.jsx";
import MyVerticallyCenteredModal from "../../../Components/modal/modalCore.jsx";
import { Button } from "../../Components/fields/Fields.jsx";
import Fetch from "../../util/Fetch.js";
import { useDispatch, useSelector } from "react-redux";
import { closeAlertBox, showAlertBox } from "../../redux/UtilRedux.jsx";
import { changeUserProfileElement } from "../../redux/UserProfiles.jsx";
import { changeConversationClientElement } from "../../redux/InboxRedux.jsx";
import Cookies from "js-cookie";
const ProfileSettings = (props) => {
  const dispatch = useDispatch()
  const store = useSelector((state)=>state);
  const [modal, setModal] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const modalAction = () => {
    if(!loading){
      setModal(!modal)
    }
  }
  const blocAction = () => {
    setLoading(true)
    let formData = new FormData();
    formData.append('user_id', props?.user?.user_id)
    formData.append('url', '/RESTAPI/Users/settings/block');
    Fetch('/', formData, res=>{
      setLoading(false);
      setModal(false)
      if(res.success === 1){
        dispatch(changeUserProfileElement({user_id: props?.user?.user_id, name: 'blocked_by_viewer'}))
        dispatch(changeConversationClientElement({user_id: props?.user?.user_id, name: 'blocked_by_viewer'}))
        let payload = {
          data_type: 'notifications',
          sub_type: 'BLOCAGE',
          c_user: store?.Util?.c_user?.user_id,
          security_token: Cookies.get('isLogedin'),
          client_id: parseInt(props?.user?.user_id),
        };
        store.Util.ws.send(JSON.stringify(payload));
      }
      dispatch(showAlertBox(res));
      setTimeout(() => {
        dispatch(closeAlertBox());
      }, 2000);
    })
  }
  const BlocClef = props?.user?.blocked_by_viewer ? 'débloquer' : 'bloquer'
  return (
    <Dropdown >
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <svg width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
      </Dropdown.Toggle>
      <Dropdown.Menu as={DrpCore}>
        {props.user.blocked_by_viewer ?
          <DropdownContentTemplate name={BlocClef} onClick={modalAction}>
            <svg width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g><path d="M 16,0C 7.164,0,0,7.164,0,16s 7.164,16, 16,16s 16-7.164, 16-16S 24.836,0, 16,0z M 16,4c 6.616,0, 12,5.384, 12,12 c0,2.588-0.832,4.98-2.23,6.942L 9.058,6.23C 11.020,4.832, 13.412,4, 16,4z M 4,16c0-2.588, 0.832-4.98, 2.23-6.942l 16.712,16.712l0,0 C 20.978,27.168, 18.588,28, 16,28C 9.384,28, 4,22.616, 4,16z"></path></g></svg>
          </DropdownContentTemplate>
          :
          <DropdownContentTemplate name={BlocClef} onClick={modalAction}>
            <svg width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g><path d="M 16,0C 7.164,0,0,7.164,0,16s 7.164,16, 16,16s 16-7.164, 16-16S 24.836,0, 16,0z M 16,4c 6.616,0, 12,5.384, 12,12 c0,2.588-0.832,4.98-2.23,6.942L 9.058,6.23C 11.020,4.832, 13.412,4, 16,4z M 4,16c0-2.588, 0.832-4.98, 2.23-6.942l 16.712,16.712l0,0 C 20.978,27.168, 18.588,28, 16,28C 9.384,28, 4,22.616, 4,16z"></path></g></svg>
          </DropdownContentTemplate>
        }

      </Dropdown.Menu>
      <MyVerticallyCenteredModal
        show={modal}
        onHide={() => modalAction()}
        size="sm"
        titre={`${BlocClef} cet utilisateur`}
      >
        <div className="Fdo Anv RpE">
          <div className="Fdo Anv Aic v2ao">
            <div className="_2dbep Xs-User-Avatar">
              <img src={props?.user?.avatar?.x56 ? props?.user?.avatar?.x56 : props?.user?.avatar} className="hty ELG hrt lazyload" />
            </div>
            <div className="e2ler">{props?.user?.first_name}</div>
            <span className="Vpe">Vous êtes sur le point de {BlocClef} <span dangerouslySetInnerHTML={{ __html: props?.user?.first_name}}></span></span>
            {props?.user?.blocked_by_viewer ?
              <div className="sqdOP ">Vous ne pourriez plus voir son profil,ni ses publications ou photos. Vous ne pourriez plus envoyer, ni recevoir de l'argent ou des cadeaux de la part de cette personne</div>
              :
              <div className="sqdOP ">Vous pourriez de nouveau  voir son profil,ses publications ou photos. Vous pourriez de nouveau  envoyer ou recevoir de l'argent ou des cadeaux a cette personne</div>
            }
          </div>
          <div className="Fdo Kmm Vnk">
            <Button variant="_Dvgb" isLoading={loading} disabled={loading} onClick={blocAction}>{BlocClef}</Button>
          </div>
        </div>
      </MyVerticallyCenteredModal>
    </Dropdown>
  )
}


export default ProfileSettings