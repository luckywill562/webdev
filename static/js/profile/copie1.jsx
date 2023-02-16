import React from 'react';
import fetch from '../util/async'
import UserPhotoList from './UserPhotoList'
import ProfileSetingDrop from '../Components/dropdown/ProfileSetting'
import {Modal} from 'react-bootstrap'
import Button from '../Components/button/button'
import { useMutation, gql } from '@apollo/client'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useRouteMatch
} from "react-router-dom";
import 'croppie'
const $image_crop = {
  enableExif: true,
  enableOrientation:true,
  viewport:{
      height: 250,
      width: 250,
      type: "square"
  },
  boundary:{
    width:440,
    height:400
  }
};

function OldSchoolMenuLink({ label, to,count, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });
    return(
      <li className="Y8-fY Lbdf">
        {match ? 
        <span className="-nal3">
          <span className="g47SY">{count} </span>{label}
        </span>
         :
        <Link to={to} className="-nal3">
          <span className="g47SY">{count} </span>{label}
        </Link>
        }
      </li>
    ) 
}

function TabMenuLink({ label,onClick, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });
    return(
      <>
        {match ? 
         <div className="Fdo Aic Cdf _9VEo1 T-jvg" onClick={onClick}>
         <span className="Fdo Aic">
           <span className="PJXu4">{label}</span>
         </span>
        </div> 
         :
         <Link to={to} className="Fdo Aic Cdf _9VEo1">
            <span className="Fdo Aic">
              <span className="PJXu4">{label}</span>
            </span>
          </Link> 
        }
      </>
    ) 
}
export default class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: [],
      count: [],
      url: '/people',
      loading: false,
      userid: props.id.topicId,
      modalShow: false,
      isDeleted: false,
      changepdpLoading: false,
      //change le state si l'utilisateur upload une nouvelle photo
      avatar_src: '',notfound: false,
      followed: false,
      followed_loading: false,
      loved: false,
      loved_loading: false
    }
  }

  fetchProfilData(user){
    __photo__upload__ = new Array();
        this.setState({ loading: true });
        var formData = new FormData();
        formData.append('id',user)
        formData.append('url',this.state.url)
        fetch(this.state.userid,formData,
            res=>{
              if(res.success == 1){
                this.setState({ loading: false });
                this.setState({user: res.user});
                this.setState({count: res.user_count});
                this.setState({avatar_src: res.user.src});
                this.setState({isDeleted: res.user.isDeleted});
                this.setState({ notfound: false });
                this.setState({ followed: res.user.follower_status });
                this.setState({ loved: res.user.loved_user });
              }else if(res.success === 0){
                this.setState({ notfound: true });
              }
            })  
  }
  componentDidMount(){
    __photo__upload__ = new Array();
    this.fetchProfilData(this.props.id.topicId);
  }
  componentDidUpdate(prevProps, prevState, snapshot){
    if (this.props.id.topicId !== prevProps.id.topicId) {
      this.fetchProfilData(this.props.id.topicId);
    }
  }
  UploadPhotoPreview(){
    $(this).PreviewFunctionUploadPhoto();
  }

  UploadPhoto = (e)=>{
    e.preventDefault();
    $(this).UploadPhotoPreview();
  }

  /*update photo de profil function*/
   
  ChangeProfilPicture = (e) =>{
    var reader = new FileReader();
      reader.onload = function (event) {
        $('.avatar_preview').croppie($image_crop).croppie('bind', { url: event.target.result});
      }
      reader.readAsDataURL(e.target.files[0]);
      this.setState({modalShow: true})
  }

  HandleCrop = async()=>{
  this.setState({changepdpLoading: true});
    $('.avatar_preview').croppie('result', {
      type: 'canvas',
    }).then((response) => {
        $.ajax({
            url:"/api",
            type: "POST",
            dataType: 'Json',
            data:{"image": response,'url': 'RESTAPI/updateUserAvatar'},
            success:
              ()=>{
                this.setState({modalShow: false})
                this.setState({changepdpLoading: false});
                this.setState({avatar_src: response});
              }
            ,error:function(error){
                alert('error')
            }
          });
    })
  }

  FollowUser = async()=>{
    this.setState({followed_loading: true})
    if(this.state.followed === true){
      var followed_action ="UnFollow";
    }else if(this.state.followed ===false){
      var followed_action ="Follow";
    }
    var formData = new FormData();
    formData.append("action",followed_action)
    formData.append('url','RESTAPI/follow')
    formData.append("user_id",this.state.user.user_id)
    fetch('./api',formData,
        (data)=>{
           if(data.success === 1){
            if(this.state.followed === true){
              this.setState({followed:false})
            }else if(this.state.followed ===false){
              this.setState({followed:true})
            }
            this.setState({followed_loading: false})
           }
        }
    )
  }

  followBntComponent = ()=>{
    const [createNotification] = useMutation(USER_LIKED);
    const LoveUser = async()=>{
      if(this.state.loved === true){
        var loved_action ="unlike";
      }else if(this.state.loved ===false){
        var loved_action ="like";
      }
      var formData = new FormData();
        formData.append('action', loved_action)
        formData.append('url','RESTAPI/UserReaction')
        formData.append("liked_id",this.state.user.user_id)
        fetch('./api',formData,
          (data)=>{
             if(data.success === 1){
              if(this.state.loved === true){
                this.setState({loved:false})
              }else if(this.state.loved ===false){
                this.setState({loved:true})
              }
              if(data.data.type === "like" & data.data.is_notified ===false){
                const res = data.data[0];
                createNotification({ variables: { to_user:res.liked_id, from_user:res.liker_id,notification_type:1} })  
              }
             }
             console.log(data[0])
          }
      )
    }

    const history = useHistory();
    return(
      <>
    {this.state.user.isUser === true ?
    <>
        <div className="Fdo Lbdf Aic">
          <Link to="/account/" className="sqdOP  L3NKy  _8A5w5   ZIAjV ">Modifier mon profil</Link>
        </div>
        <div className="Fdo Lbdf Aic">
        <Link to="/account/upgrade/" className="sqdOP  L3NKy  _8A5w5   ZIAjV ">Upgrade</Link>
      </div>
      </>
        :
        <>
        {this.state.followed_loading ?
        <div className="Fdo Lbdf Aic">
          <span className="sqdOP  L3NKy _8A5w5 ZIAjV">Loading...</span>
        </div>
        :
        <>
        {this.state.followed ?
          <div className="Fdo Lbdf Aic">
            <button className="sqdOP  L3NKy _8A5w5 ZIAjV" onClick={this.FollowUser}>Abonné(e)</button>
          </div>
        :
        <div className="Fdo Lbdf Aic">
          <button className="sqdOP  L3NKy _Dvgb ZIAjV" onClick={this.FollowUser}>S'abonner</button>
        </div>
        }
        </>
        }
        <div className="Fdo Lbdf Aic">
          <button className="Fdo sqdOP  L3NKy _Dvgb ZIAjV" >Envoyer un Crush</button>
        </div>
        
        {this.state.loved_loading ? 
        <div className="Fdo Lbdf Aic">
          <button className="Fdo sqdOP  L3NKy _8A5w5 ZIAjV">
              <svg width="22" height="22" viewBox="0 0 32 32" fill="#262626"><g><path d="M 31.984,13.834C 31.9,8.926, 27.918,4.552, 23,4.552c-2.844,0-5.35,1.488-7,3.672 C 14.35,6.040, 11.844,4.552, 9,4.552c-4.918,0-8.9,4.374-8.984,9.282L0,13.834 c0,0.030, 0.006,0.058, 0.006,0.088 C 0.006,13.944,0,13.966,0,13.99c0,0.138, 0.034,0.242, 0.040,0.374C 0.48,26.872, 15.874,32, 15.874,32s 15.62-5.122, 16.082-17.616 C 31.964,14.244, 32,14.134, 32,13.99c0-0.024-0.006-0.046-0.006-0.068C 31.994,13.89, 32,13.864, 32,13.834L 31.984,13.834 z M 29.958,14.31 c-0.354,9.6-11.316,14.48-14.080,15.558c-2.74-1.080-13.502-5.938-13.84-15.596C 2.034,14.172, 2.024,14.080, 2.010,13.98 c 0.002-0.036, 0.004-0.074, 0.006-0.112C 2.084,9.902, 5.282,6.552, 9,6.552c 2.052,0, 4.022,1.048, 5.404,2.878 C 14.782,9.93, 15.372,10.224, 16,10.224s 1.218-0.294, 1.596-0.794C 18.978,7.6, 20.948,6.552, 23,6.552c 3.718,0, 6.916,3.35, 6.984,7.316 c0,0.038, 0.002,0.076, 0.006,0.114C 29.976,14.080, 29.964,14.184, 29.958,14.31z"></path></g></svg>
          </button>
        </div>
        :
        <>
        {this.state.loved ?
        <div className="Fdo Lbdf Aic">
          <button className="Fdo sqdOP  L3NKy _8A5w5 ZIAjV" onClick={LoveUser}>
             <svg width="22" height="22" viewBox="0 0 32 32" fill="#ff4477"><g><path d="M 31.984,13.834C 31.9,8.926, 27.918,4.552, 23,4.552c-2.844,0-5.35,1.488-7,3.672 C 14.35,6.040, 11.844,4.552, 9,4.552c-4.918,0-8.9,4.374-8.984,9.282L0,13.834 c0,0.030, 0.006,0.058, 0.006,0.088 C 0.006,13.944,0,13.966,0,13.99c0,0.138, 0.034,0.242, 0.040,0.374C 0.48,26.872, 15.874,32, 15.874,32s 15.62-5.122, 16.082-17.616 C 31.964,14.244, 32,14.134, 32,13.99c0-0.024-0.006-0.046-0.006-0.068C 31.994,13.89, 32,13.864, 32,13.834L 31.984,13.834 z"></path></g></svg>
          </button>
        </div>
        :
        <div className="Fdo Lbdf Aic">
          <button className="Fdo sqdOP  L3NKy _8A5w5 ZIAjV" onClick={LoveUser}>
              <svg width="22" height="22" viewBox="0 0 32 32" fill="#262626"><g><path d="M 31.984,13.834C 31.9,8.926, 27.918,4.552, 23,4.552c-2.844,0-5.35,1.488-7,3.672 C 14.35,6.040, 11.844,4.552, 9,4.552c-4.918,0-8.9,4.374-8.984,9.282L0,13.834 c0,0.030, 0.006,0.058, 0.006,0.088 C 0.006,13.944,0,13.966,0,13.99c0,0.138, 0.034,0.242, 0.040,0.374C 0.48,26.872, 15.874,32, 15.874,32s 15.62-5.122, 16.082-17.616 C 31.964,14.244, 32,14.134, 32,13.99c0-0.024-0.006-0.046-0.006-0.068C 31.994,13.89, 32,13.864, 32,13.834L 31.984,13.834 z M 29.958,14.31 c-0.354,9.6-11.316,14.48-14.080,15.558c-2.74-1.080-13.502-5.938-13.84-15.596C 2.034,14.172, 2.024,14.080, 2.010,13.98 c 0.002-0.036, 0.004-0.074, 0.006-0.112C 2.084,9.902, 5.282,6.552, 9,6.552c 2.052,0, 4.022,1.048, 5.404,2.878 C 14.782,9.93, 15.372,10.224, 16,10.224s 1.218-0.294, 1.596-0.794C 18.978,7.6, 20.948,6.552, 23,6.552c 3.718,0, 6.916,3.35, 6.984,7.316 c0,0.038, 0.002,0.076, 0.006,0.114C 29.976,14.080, 29.964,14.184, 29.958,14.31z"></path></g></svg>
          </button>
        </div>
        }
        </>
        }
        <div className="Fdo Lbdf Aic">
          <button className="Fdo sqdOP  L3NKy _8A5w5 ZIAjV" onClick={() => history.push(`/live/${this.state.user.user_id}`)}>
            <svg width="22" height="22" viewBox="0 0 32 32" fill="#000000"><g><path d="M 27.91,11.79c 0.176,0.792, 0.278,1.606, 0.278,2.442c0,6.456-5.48,11.838-12.696,12.994 c 1.526,0.616, 3.236,0.976, 5.058,0.976c 1.718,0, 3.34-0.316, 4.804-0.866c 1.854,0.632, 3.878,0.796, 5.552,0.796 c-0.87-1.044-1.474-2.068-1.906-2.968C 30.856,23.508, 32,21.314, 32,18.898C 32,16.042, 30.406,13.496, 27.91,11.79zM 1.472,25.418c 0.174,0.33, 0.516,0.536, 0.886,0.536c 0.016,0, 0.034,0, 0.048-0.002 c 1.058-0.050, 3.162-0.752, 5.39-2.166c 1.192,0.21, 3.862,0.606, 4.794,0.606c 7.034,0, 12.542-4.898, 12.542-11.152 c0-6.15-5.624-11.152-12.542-11.152S 0.052,7.088, 0.052,13.238c0,2.862, 1.26,5.628, 3.478,7.698c-0.498,1.212-1.158,2.358-1.964,3.408 C 1.328,24.652, 1.292,25.072, 1.472,25.418z M 2.052,13.238c0-5.046, 4.728-9.152, 10.542-9.152s 10.542,4.106, 10.542,9.152 c0,5.216-4.532,9.152-10.542,9.152c-0.79,0-3.934-0.458-4.798-0.64c-0.264-0.052-0.538-0.004-0.758,0.146 c-0.858,0.568-1.666,0.998-2.37,1.314c 0.382-0.718, 0.712-1.462, 0.988-2.23c 0.142-0.398, 0.020-0.842-0.304-1.11 C 3.224,18.12, 2.052,15.764, 2.052,13.238z"></path></g></svg>
          </button>
        </div>
        <ProfileSetingDrop/>
        </>
        }
        </>
    )
  }


  photoBtnComponent = ()=>{
    const previewStyle = { display: "none" };
    let { url } = useRouteMatch();
    return(
      <div className="N8tH">
        {this.state.user.isUser ? 
        <form className="PostFormData" encType="multipart/form-data" method="POST" onSubmit={this.UploadPhoto}>
          <div className="LPN xcv L4E zI7 iyn Hsu Aic E6d">
            <div className="LPN L4E">
              <span className="vx-z">
                <div className="bt-open">
                  <div className="text-box-open">
                    <a href="#" className="pBj">
                      <div className="bBB RpG pIc RlF">
                        <span className="js-add-pic-icon">
                          <svg width="24" height="24" viewBox="0 0 32 32" fill="#45bd62"><g><path d="M 17,2C 8.716,2, 2,8.716, 2,17S 8.716,32, 17,32S 32,25.284, 32,17S 25.284,2, 17,2z M 23.708,15.708 c-0.39,0.39-1.024,0.39-1.414,0L 18,11.414L 18,27 C 18,27.552, 17.552,28, 17,28S 16,27.552, 16,27L 16,11.414 L 11.708,15.708 c-0.39,0.39-1.024,0.39-1.414,0c-0.39-0.39-0.39-1.024,0-1.414l 6-6C 16.296,8.29, 16.298,8.29, 16.3,8.288 c 0.090-0.088, 0.198-0.162, 0.316-0.21c 0.244-0.102, 0.52-0.102, 0.764,0C 17.504,8.128, 17.614,8.2, 17.708,8.292l 6,6 C 24.098,14.684, 24.098,15.316, 23.708,15.708z"></path></g></svg>
                        </span>
                        <div className="photo-text-open">Photos</div>
                      </div>
                      <div className="input-file-open">
                        <input type="file" multiple="1"  onChange={this.UploadPhotoPreview} className="fn_3" />
                      </div>
                    </a>
                  </div>
                </div>
              </span>
            </div>
          </div>
        <div className="upload-view pbD" style={previewStyle}>
          <div className="preview-container LPN"></div>
          <Button variant="primaire" type="submit">Uploader</Button>
        </div>
        </form>:
        <div className="LPN xcv L4E zI7 iyn Hsu Aic E6d N8tH">
          <div className="LPN L4E">
            <span className="vx-z">
              <div className="bt-open">
                <div className="text-box-open">
                  <Link to={`${url}/photos`} className="pBj">
                    <div className="bBB RpG pIc RlF">
                      <span className="js-add-pic-icon">
                        <svg width="24" height="24" className="sFc" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"></circle><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                      </span>
                      <div className="photo-text-open">Photos</div>
                    </div>
                  </Link>
                </div>
              </div>
            </span>
          </div>
        </div>
        }
      </div>
    )
  }

  UserIndicatorOnline = ()=>{
    return(
      <>
        {this.state.user.isUser ?
        <div className="bYmF4e">
          <input type="file" onChange={this.ChangeProfilPicture} className="changePicPen" accept="image/*"/>
            <div className="Ad3F">
						  <svg width="24" height="24" className="sFc" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"></circle><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
            </div>
        </div>:null}
      </>
      )
  }

  MyVerticallyCenteredModal = (props) =>{
    return (
      <Modal
        {...props}
        size="sm" className="modal-uploadpic"
        aria-labelledby="contained-modal-title-vcenter" 
      >
        <div className="CDp LCN kzZ m2F zI7 iyn Hsu">
          <h5 className="lH1 dyH iFc SMy kON pBj IZT">Changer la photo de profile</h5>
        </div>
        <div className="Fdo Aic">
           <div id="avatar" className="avatar_preview"></div>
        </div>
        <div className="Fdo Aic ELG Cdf">
          <div className="Fdo ELG LCN kzZ m2F zI7 iyn Hsu Cdf">
            <div className="Fdo ELG Cdf"></div>
            <div className="Fdo Cdf">
          <div className="Fdo Aic Cdf">
            <Button onClick={props.onHide}>Annuler</Button>
          </div>
          <div className="Fdo aBv Cdf">
            {this.state.changepdpLoading ? 
              <div className="follow-btn Dbf">
              <div className="btn-text-content iFc">Attendez...</div>
             </div>
              :
            <Button variant="primaire" onClick={this.HandleCrop} >Suivant</Button>
            }
          </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  profileRenderContainer = ()=>{
    let { path, url } = useRouteMatch();
    if(this.state.isDeleted === true){
      return(<div className="nF1"><h1>Vous avez retirer cette utilisateur</h1></div>)
    }else{
      return(
      <>
      <div className="profile-container online">
        <div className="Fdo Anv">
        <div className="Fdo Cdf Lns">
          <div className="Fdo Aic Anv N8tH">
            <div className="Anv RpG ">
            <div className="RpG Profil-canvas">
          <div className="user-profile-header-thumbnail">
            <img src={this.state.avatar_src} alt={this.state.user.first_name} className="hty ELG hrt"/>
          </div>
            
              <this.UserIndicatorOnline/>
            </div>
            </div>
              <div className="Anv Vfr">
               <h2 className="svH">{this.state.user.first_name}</h2>        
              </div>
              <div className="user-profile-header-description Vfr">
              <span className="user-online-indicator full-view">
                <i className="icon-led online"></i>
                <span className="user-online-indicator__text-status">En Ligne</span>
              </span>
              </div>
              <ul className="k9GMp Vfr">
                <OldSchoolMenuLink to={`${url}/photos/`} label="abonnés" count={this.state.count.photos} />
                <OldSchoolMenuLink to={`${url}/posts/`} label="crush" count={this.state.count.posts} />
              </ul>
              <div className="Vfr">
                <div className="Fdo pbD Aic">
                  <this.followBntComponent/>
                </div>
              </div>
              <div className="Vfr">
                <div className="few-words"> How to Pose• Style Advice• Beauty Tips 💌sianav.business@gmail.com My Outfits⬇️</div>
              </div>
              </div>
        </div>
        <div className="Fdo Aic Cdf TabMenu">
        <TabMenuLink activeOnlyWhenExact={true} to={`${url}`} label={`${this.state.count.photos} Photos`} />
        <TabMenuLink to={`${url}/about/`}  label="A propos" />
        </div>
        <div className="Vfr">
        <Switch>
        <Route exact path={`${url}/about/`}>
        <div className="Fdo Cdf Lns kzZ">
        <div className="profile-container-info">
        <div className="profile-info N8tH">
          <div className="column BjN">
             <h3>A propos</h3>
             <div className="about-me">
               <div className="age">
                 <span className="answer">Mon age: </span>
                 <span >24</span>
               </div>
               <div className="location">
                 <span className="answer">J'habite a: </span>
                 <span>Antananarivo</span>
               </div>
               <div className="occupation">
                 <span className="answer">Je travaille chez: </span>
                 <span>a la maison</span>
               </div>
             </div>
          </div>
          <div className="column preferences BjN">
            <h3>Ce que je cherche</h3>
            <div className="user-preferences">
            <div className="gender-age-preferences">
                 <span>je suis {this.state.user.user_gender} </span>
                 <span>et je cherche {this.state.user.search_gender} </span>
                  de {this.state.user.search_age_min} a {this.state.user.search_age_max} ans
                </div>
          </div>
            </div>
        </div>
        <div className="profile-info N8tH">
        <div className="column interests BjN">
            <h3>Ce qui m'interessent</h3>
            <div className="spinner-container">
              <div className="selected-interests icons">
                <div className="interest museum-arts">
                  <div className="icon-wrapper">
                    <div className="icon"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
        </Route>
        <Route path={`${path}/`} component={UserPhotoList}/>
        <Route path={`${path}/*`}>
          <h3>url not found</h3>
        </Route>
      </Switch>
        </div>
        
        <this.MyVerticallyCenteredModal
          show={this.state.modalShow}
          onHide={() => this.setState({modalShow: false})}
        />
        </div>
</div>
        </>
    )

    }
  }
 
  render(){
    return(
      <>
      {this.state.notfound ?
      <h1>page not found</h1>
      :this.state.loading ? 
    <ProfileTemplate/>:
    <this.profileRenderContainer/>
    }
     </>
    ) 
  }
  }

  function ProfileTemplate(){
    return(
      <div className="profile-container online">
        <div className="Fdo Anv">
          <div className="Fdo Cdf Lns">
            <div className="Fdo Aic Anv N8tH">
              <div className="Anv RpG">
                <div className="RpG Profil-canva">
                  <div className="Enb">
                    <div className="HaS-3"></div>
                  </div>
                </div>
              </div>
              <div className="Anv Vfr">
                <div className="qfAOE"></div>
              </div>
              <div className="user-profile-header-description Vfr">
                <div className="drGTB"></div>
              </div>
              <div className="k9GMp Vfr">
                <div className="DrvG"></div>
                <div className="ltVA"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const USER_LIKED = gql`
  mutation createNotification($to_user:ID!,$from_user:ID!,$notification_type:ID!){
    createNotification(to_user:$to_user,from_user:$from_user,notification_type:$notification_type){
      id
    }
  }
`