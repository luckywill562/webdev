import React from 'react';
import fetch from '../util/async'
import UserPhotoList from './UserPhotoList'
import ProfileSetingDrop from '../Components/dropdown/ProfileSetting'
import { Modal } from 'react-bootstrap'
import Button from '../Components/button/button'
import RoundBtn from '../Components/button/RoundBtn'
import AboutUser from "./About_user"
import Error404 from "../Components/app/NotFound"
/*icon*/
import Love from '../icon/Love'
import LoveAlt from '../icon/Love_alt'
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

function OldSchoolMenuLink({ label, to, count, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });
  return (
    <li className="Y8-fY hdx">
      {match ?
        <span className="-nal3">
          <span className="g47SY">{count}</span> {label}
        </span>
        :
        <Link to={to} className="-nal3">
          <span className="g47SY">{count}</span> {label}
        </Link>
      }
    </li>
  )
}

function TabMenuLink({ label, onClick, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });
  return (
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
  constructor(props) {
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
      avatar_src: '',
      notfound: false,
      followed: false,
      followed_loading: false,
      loved: false,
      loved_loading: false
    }
  }

  fetchProfilData(user) {
    __photo__upload__ = new Array();
    this.setState({ loading: true });
    var formData = new FormData();
    formData.append('id', user)
    formData.append('url', this.state.url)
    fetch(this.state.userid, formData,
      res => {
        if (res.success == 1) {
          this.setState({ loading: false });
          this.setState({ user: res.user });
          this.setState({ count: res.user_count });
          this.setState({ avatar_src: res.user.user_avatar });
          this.setState({ isDeleted: res.user.isDeleted });
          this.setState({ notfound: false });
          this.setState({ followed: res.user.follower_status });
          this.setState({ loved: res.user.loved_user });
        } else if (res.success === 0) {
          this.setState({ notfound: true });
        }
      })
  }
  componentDidMount() {
    __photo__upload__ = new Array();
    this.fetchProfilData(this.props.id.topicId);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.id.topicId !== prevProps.id.topicId) {
      this.fetchProfilData(this.props.id.topicId);
    }
  }
  /*update photo de profil function*/
  ChangeProfilPicture = (e) => {
    var reader = new FileReader();
    reader.onload = function (event) {
      $('.avatar_preview').croppie($image_crop).croppie('bind', { url: event.target.result });
    }
    reader.readAsDataURL(e.target.files[0]);
    this.setState({ modalShow: true })
  }

  HandleCrop = async () => {
    this.setState({ changepdpLoading: true });
    $('.avatar_preview').croppie('result', {
      type: 'canvas',
    }).then((response) => {
      $.ajax({
        url: "/api",
        type: "POST",
        dataType: 'Json',
        data: { "image": response, 'url': 'RESTAPI/updateUserAvatar' },
        success:
          () => {
            this.setState({ modalShow: false })
            this.setState({ changepdpLoading: false });
            this.setState({ avatar_src: response });
          }
        , error: function (error) {
          alert('error')
        }
      });
    })
  }

  FollowUser = async (e) => {
    e.preventDefault();
    this.setState({ followed_loading: true })
    if (this.state.followed === true) {
      var followed_action = "UnFollow";
    } else if (this.state.followed === false) {
      var followed_action = "Follow";
    }
    var formData = new FormData();
    formData.append("action", followed_action)
    formData.append('url', 'RESTAPI/follow')
    formData.append("user_id", this.state.user.user_id)
    fetch('./api', formData,
      (data) => {
        if (data.success === 1) {
          if (this.state.followed === true) {
            this.setState({ followed: false })
          } else if (this.state.followed === false) {
            this.setState({ followed: true })
          }
          this.setState({ followed_loading: false })
        }
      }
    )
  }

  DatingButtonProfile = () => {
    return (
      <div className="Fdo">
        <div className="Fdo Lbdf Aic">
          <ProfileSetingDrop />
        </div>
      </div>
    )
  }

  followBntComponent = () => {
    const history = useHistory();
    const LoveUser = async (e) => {
      e.preventDefault()
      if (this.state.loved === true) {
        var loved_action = "unlike";
      } else if (this.state.loved === false) {
        var loved_action = "like";
      }
      var formData = new FormData();
      formData.append('action', loved_action)
      formData.append('url', 'RESTAPI/UserReaction')
      formData.append("liked_id", this.state.user.user_id)
      fetch('./api', formData,
        (data) => {
          if (data.success === 1) {
            if (this.state.loved === true) {
              this.setState({ loved: false })
            } else if (this.state.loved === false) {
              this.setState({ loved: true })
            }
            if (data.data.type === "like" & data.data.is_notified === false) {
              const res = data.data[0];
            }
          }
          console.log(data[0])
        }
      )
    }
    return (
      <div className="Fdo Aic">
        {this.state.user.isUser === true ?
          <>
            <Link to="/account/" className="sqdOP Lbdf  L3NKy ZIAjV ">Modifier le profile</Link>
            <Link to="/account/" className="sqdOP Lbdf  L3NKy ZIAjV">Jeton</Link></> :
          <>
            {this.state.followed_loading ?
              <span className="sqdOP Lbdf  L3NKy ZIAjV">Loading...</span> :
              <>
                {this.state.followed ?
                  <Link to="#" className="sqdOP Lbdf  L3NKy ZIAjV" onClick={this.FollowUser}>Abonné(e)</Link> :
                  <Link to="#" className="sqdOP Lbdf  L3NKy ZIAjV" onClick={this.FollowUser}>S'abonner</Link>}
              </>}
            <Link to="#" onClick={LoveUser} className={this.state.loved ? 'sqdOP Lbdf  L3NKy ZIAjV counter_colored' : 'sqdOP Lbdf  L3NKy ZIAjV'}>
              {this.state.loved || this.state.loved_loading ? "Aimé(e)" : "J'aime"}
            </Link>
            <Link to="#" className="sqdOP Lbdf  L3NKy ZIAjV" onClick={() => history.push(`/live/${this.state.user.user_id}`)}>Message</Link>
          </>}
      </div>
    )
  }


  UserIndicatorOnline = () => {
    return (
      <>
        {this.state.user.isUser ?
          <div className="bYmF4e">
            <input type="file" onChange={this.ChangeProfilPicture} className="changePicPen" accept="image/*" />
            <div className="Ad3F">
              <svg width="24" height="24" className="sFc" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"></circle><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
            </div>
          </div> : ''}
      </>
    )
  }

  MyVerticallyCenteredModal = (props) => {
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
                <Button variant=" _8A5w5" onClick={props.onHide}>Annuler</Button>
              </div>
              <div className="Fdo aBv Cdf">
                {this.state.changepdpLoading ?
                  <div className="follow-btn Dbf">
                    <div className="btn-text-content iFc">Attendez...</div>
                  </div>
                  :
                  <Button variant=" _Dvgb " onClick={this.HandleCrop} >Suivant</Button>
                }
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  profileRenderContainer = () => {
    let { path, url } = useRouteMatch();
    if (this.state.isDeleted === true) {
      return (<div className="nF1"><h1>Vous avez retirer cette utilisateur</h1></div>)
    } else {
      return (
        <>
          <div className="Fdo ELG">
            <div className="Fdo ELG Anv">
              <div className="Fdo Anv hty Hdt  page">
                <div className="Fdo Lns Fbd page">
                  <div className="Aic Fdo Lns">
                    <div className="profile-container">
                      <div className="_mainc erCf">
                        <div className="Anv RpG _b0acm">
                          <div className="RpG Profil-canvas">
                            <div className="user-profile-header-thumbnail">
                              <img src={this.state.avatar_src} alt={this.state.user.first_name} className="hty ELG hrt" />
                            </div>
                            <this.UserIndicatorOnline />
                          </div>
                        </div>
                        <div className="_o6mpc">
                          <div className="Fdo _ienqf Aic">
                            <h2 className="Enh">{this.state.user.first_name}</h2>
                            {!this.state.user.isUser ?
                              <span className="_ncrqg  _ov9ai" style={{ top: "3px" }}>
                                <this.DatingButtonProfile />
                              </span>
                              : ""}
                          </div>
                          <div className="Fdo Aic _ienqf">
                            <this.followBntComponent />
                          </div>
                          <ul className="k9GMp _ienqf">
                            <OldSchoolMenuLink to={`${url}/posts/`} label="abonnements" count={this.state.count.posts} />
                            <OldSchoolMenuLink to={`${url}/photos/`} label=" abonnés" count={this.state.count.photos} />
                            <OldSchoolMenuLink to={`${url}/posts/`} label=" crush" count={this.state.count.posts} />
                          </ul>
                          <div className="_ienqf Fdo ">
                            <div className="sqdOP  ZIAjV ">@{this.state.user.username}</div>
                          </div>
                          <div className="few-words ">
                            <span className="SubContent" dangerouslySetInnerHTML={{ __html: this.state.user.bio }}></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Fdo tLp">
                  <div className="Cvg"></div>
                </div>
                <div className="Fdo Aic Cdf TabMenu ELG Bsh">
                  <div className="Fbd Fdo ELG  Lns" >
                    <div className="Fdo  ELG Lns" style={{ maxWidth: "900px" }}>
                      <div className="Fdo ELG" style={{ padding: "0 16px" }}>
                        <div className="Fdo ELG gvn" style={{ padding: "0 6px", justifyContent: "center" }}>
                          <TabMenuLink activeOnlyWhenExact={true} to={`${url}`} label={`${this.state.count.photos} Photos`} />
                          <TabMenuLink to={`${url}/about`} label="A propos" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Fdo Aic Anv ELG">
                  <div className="ftB">
                    <div className="Fdo Van">
                      <div className="Evdg">
                        <div className="Rxz">
                          <Switch>
                            <Route path={`${url}/about`}><AboutUser /></Route>
                            <Route exact path={`${path}/`}> <UserPhotoList isUser={this.state.user.isUser} /> </Route>
                            <Route path="*" component={Error404} />
                          </Switch>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <this.MyVerticallyCenteredModal
                show={this.state.modalShow}
                onHide={() => this.setState({ modalShow: false })}
              />
            </div>
          </div>
        </>
      )

    }
  }

  render() {
    return (
      <>
        {this.state.notfound ?
          <h1>page not foun</h1>
          : this.state.loading ?
            <ProfileTemplate /> :
            <this.profileRenderContainer />
        }
      </>
    )
  }
}

function ProfileTemplate() {
  return (
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
