import React from 'react';
import fetch from '../util/fetch'
import ProfileSetingDrop from '../Components/dropdown/ProfileSetting'
import Button from '../../Components/button/button'
import { withRouter } from "../util/WithRouter"
import Container from '../Components/Container'
import LoveUserComponent from './Components/LoveUserComponent';
import { Outlet, Navigate } from 'react-router-dom';
import AlbumGrid from './Components/AlbumGrid';
import MyVerticallyCenteredModal from '../../Components/modal/modalCore';
import MenuLink from './Components/MenuLink';
import FollowerBox from './Components/FollowerBox';
import FollowBtn from './Components/FollowBtn';
import About from './Components/About';
import { ChatBoxes } from '../icon/icons';
import {
  Routes,
  Route,
  Link,
  useMatch
} from "react-router-dom";
import Croppie from 'croppie'
import { Badge } from '../icon/icons';
import UserPosts from './Components/UserPosts';
import EditAboutUser from './About/EditAboutUser';
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


class Profile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      count: [],
      loading: false,
      userid: this.props.useParams.id,
      modalShow: false,
      isDeleted: false,
      changepdpLoading: false,
      //change le state si l'utilisateur upload une nouvelle photo
      avatar_src: '',
      notfound: false,
      following: false,
      loved: false,
      loved_loading: false,
      /*media*/
      page: 0,
      limit: 20,
      media_list: [],
      c: undefined,
    }
  }

  fetchProfilData(user) {
    const UserListVisited = this.props.UserListVisited.slice();
    const checkList = UserListVisited.findIndex((UserListVisited => UserListVisited.username === user));
    if (checkList === -1) {
      this.setState({ loading: true });
      var formData = new FormData();
      formData.append('id', user)
      formData.append('url', '/RESTAPI/Users/profile')
      formData.append('page', this.state.page)
      formData.append('limit', this.state.limit)
      fetch(this.state.userid, formData, res => {
        if (res.success == 1) {
          this.setState({
            loading: false, user: res.user,
            count: res.user.statistiques, avatar_src: res.user.user_avatar,
            isDeleted: res.user.isDeleted, notfound: false, following: res.user.button_action._following,
            loved: res.user.button_action._send_love, media_list: res.user.content.media,
          });
          if (checkList === -1) {
            UserListVisited.push(res.user);
            this.props.UpdateUserListVisited(UserListVisited);
          }
        } else if (res.success === 0) {
          this.setState({ notfound: true });
          history.pushState(null, 'index', '/404');
        }
      })
    } else {
      var res = this.props.UserListVisited[checkList];
      this.setState({
        user: res, avatar_src: res.user_avatar, isDeleted: res.isDeleted,
        count: res.statistiques, following: res.button_action._following, loved: res.button_action._send_love,
        media_list: res.content.media
      })
    }
  }

  componentDidMount() {
    this.fetchProfilData(this.props.useParams.id);
    this.setState({ FollowerBox: false });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.useParams.id !== prevProps.useParams.id) {
      this.setState({ user: undefined });
      this.fetchProfilData(this.props.useParams.id);
      this.setState({ FollowerBox: false });
    }
  }
  ChangeProfilPicture = (e) => {
    this.setState({ modalShow: true })
    setTimeout(() => {
      if (this.state.modalShow) {
        const c = new Croppie(this.changeAvatarRef, $image_crop)
        this.setState({ c: c });
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
          c.bind({ url: reader.result });
        }
      }
    }, 1000)
  }
  onResult = e => {
    this.setState({ changepdpLoading: true });
    this.state.c.result("base64").then(base64 => {
      var formData = new FormData();
      formData.append('url', 'RESTAPI/updateUserAvatar')
      formData.append('image', base64)
      fetch(this.state.userid, formData, res => {
        this.setState({
          modalShow: false,
          changepdpLoading: false,
          avatar_src: base64
        });
      })
    });
  };


  UpdatePostArray = (posts) => {
    const user = this.state.user;
    user.content.posts.push(...posts);
    this.setState({ user });
  }
  UpdateAlbumArray = (album, last) => {
    const user = this.state.user;
    user.content.media.push(...album);
    user.content.media_last = last
    this.setState({ user })
  }
  UpdateAboutColumn = (about) => {
    const user = this.state.user;
    user.about = about.about;
    this.setState({ user });
  }
  OnClickFollow = () => {
    const user = this.state.user;
    if (user.button_action._following === false) {
      let following = true;
      user.button_action._following = following;
      this.setState({ following });
    } else if (user.button_action._following === true) {
      let following = false
      user.button_action._following = following
      this.setState({ following });
    }
    this.setState({ user });
  }
  OnClickLove = (action) => {
    const user = this.state.user
    if (this.state.loved === true) {
      this.setState({ loved: false })
    } else if (this.state.loved === false) {
      this.setState({ loved: true })
    }
    if (action === 'ACCEPT') {
      let match = true;
      user.button_action.match = match;
      this.setState({ match })
    }
  }
  newMessage = () => {

    this.props.navigate(`/inbox/${this.state.user.user_id}`);
  }
  render() {
    const background = this.props.location.state && this.props.location.state.background;
    return (
      <>
        {this.state.notfound ?
          <Navigate to="/404" replace />
          :
          <>
            <div className="Fdo ELG">
              <div className="Fdo ELG Anv">
                <div className="Fdo Anv hty Hdt  page">
                  <div className="Fdo Lns Fbd page">
                    <div className="Aic Fdo Lns">
                      <Container style={'#fff'}>
                        {this.state.loading || !this.state.user ?
                          <ProfileTemplate />
                          :
                          <div className="profile-container Pap">
                            <div className="_mainc m2F aBv">
                              <div className="Anv RpG E4_R">
                                <div className="RpG Profil-canvas">
                                  <div className="user-profile-header-thumbnail">
                                    <img src={this.state.avatar_src} alt={this.state.user.first_name} className="hty ELG hrt" />
                                  </div>
                                  {this.state.user.isUser ?
                                    <div className="bYmF4e">
                                      <input type="file" onChange={this.ChangeProfilPicture} className="changePicPen" accept="image/*" />
                                      <div className="Ad3F">
                                        <svg width="24" height="24" className="sFc" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"></circle><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                      </div>
                                    </div>
                                    :
                                    <div className="rSxHQ d4kh"></div>
                                  }
                                </div>
                              </div>
                              <div className="_o6mpc">
                                <div className="Fdo _ienqf Aic">
                                  <h2 className="Enh">{this.state.user.first_name}</h2>
                                  {this.state.user.verified &&
                                    <div className='lZJ Lsy'>
                                      <Badge size={20} />
                                    </div>
                                  }
                                  {!this.state.user.isUser ?
                                    <span className="Lsy  _ov9ai" style={{ top: "3px" }}>
                                      <div className="Fdo">
                                        <div className="Fdo Lbdf Aic">
                                          <ProfileSetingDrop />
                                        </div>
                                      </div>
                                    </span>
                                    : null
                                  }
                                </div>
                                <div className="Fdo Aic _ienqf">
                                  <div className="Fdo Aic">
                                    {this.state.user.isUser === true ?
                                      <>
                                        <Link to="/me/match" className="sqdOP Lbdf  L3NKy ZIAjV">Match</Link>
                                        <Link to="/account/jeton" className="sqdOP Lbdf  L3NKy ZIAjV">Coup de coeur</Link>
                                        <Link to="/settings/" className="sqdOP Lbdf  L3NKy ZIAjV ">Editer le profile</Link>
                                      </> :
                                      <>
                                        <FollowBtn showAlert={this.props.showAlert} type="button" status={this.state.following} user_id={this.state.user.user_id} change={this.OnClickFollow} />
                                        {this.state.user.show_in_match === 0 && !this.state.user.button_action.match &&
                                          <LoveUserComponent type="link" user={this.state.user} CrushStatus={this.state.user.button_action} loved={this.state.loved} user_id={this.state.user.user_id} liker={this.state.user.liker}
                                            websocket={this.props.websocket} action={this.OnClickLove} />
                                        }
                                        {this.state.user.button_action.match &&
                                          <button onClick={this.newMessage} className="sqdOP   L3NKy ZIAjV  Xdg Bsj _Dvgb">
                                            <div className="Fdo">
                                              <span className="Fdo Aic">
                                                <ChatBoxes size={18} />
                                              </span>
                                              <span className="Fdo LmP">contacter</span>
                                            </div>
                                          </button>
                                        }
                                      </>}
                                  </div>
                                </div>
                                <ul className="k9GMp _ienqf">
                                  <MenuLink to={`/${this.props.useParams.id}/`} label={` photos`} count={this.state.count.photos} />
                                  <MenuLink to={`/${this.props.useParams.id}/posts/`} label="publications" count={this.state.count.posts} />
                                  <MenuLink to='following' label="abonnés" state={{ background: this.props.location }} count={this.state.count.followers} />
                                </ul>
                                {
                                  <div className="_ienqf Fdo ">
                                    <div className="sqdOP  ZIAjV ">@{this.state.user.username}</div>
                                  </div>
                                }

                                {this.state.user.bio && (
                                  <div className="few-words _ienqf Fdo ">
                                    <span className="SubContent" dangerouslySetInnerHTML={{ __html: this.state.user.bio }}></span>
                                  </div>
                                )}
                                <div className="about">
                                  <Link to="about" className='mWe' state={{ background: this.props.location }}>Plus d'informations sur {this.state.user.isUser ? "vous" : `@${this.state.user.username}`}</Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </Container>
                    </div>
                  </div>
                  <div className="Fdo tLp">
                    <div className="Cvg"></div>
                  </div>
                  <div className="Fdo Aic Cdf TabMenu ELG Bsh">
                    <div className="Fbd Fdo ELG  Lns" >
                      <div className="Fdo  ELG Lns" style={{ maxWidth: "1120px" }}>
                        <div className="Fdo ELG" style={{ padding: "0 18px" }}>
                          <div className="Fdo ELG gvn Lns">
                            {!this.state.loading && this.state.user &&
                              <>
                                <TabMenuLink activeOnlyWhenExact={true} to={`/${this.state.user.username}`} path={this.props.location.pathname} label={`album`} />
                                <TabMenuLink to={`/${this.props.useParams.id}/posts/`} path={this.props.location.pathname} label={` publications`} />
                              </>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {this.state.user && !this.state.loading &&
                    <div className="Fdo Aic Anv ELG">
                      <div className='Fdo Nfb ELG Flk main-app-width'>
                        <div className="ftB">
                          <div className="Fdo Van">
                            <div className="Evdg">
                              <div className="Rxz">
                                <Routes location={background || location}>
                                  <Route path="/" element={<Outlet />}>
                                    <Route index element={<AlbumGrid profile={this.state.user} profileUpdate={this.UpdateAlbumArray} />} />
                                    <Route path='/posts' element={<UserPosts profile={this.state.user} profileUpdate={this.UpdatePostArray} />} />
                                    <Route path="/following" element={
                                      <FollowerBox profile={this.state.user} count={this.state.count} />
                                    } />
                                    <Route path="/about/*" element={
                                      <About profile={this.state.user} UpdateAboutColumn={this.UpdateAboutColumn} />
                                    } />

                                    <Route path="*" element={<Navigate to="/404" replace />} />
                                  </Route>
                                </Routes>
                                {background && (
                                  <Routes>
                                    <Route path="following" element={
                                      <FollowerBox profile={this.state.user} count={this.state.count} />
                                    } />
                                    <Route path="/about/*" element={
                                      <About profile={this.state.user} UpdateAboutColumn={this.UpdateAboutColumn} />
                                    } />
                                  </Routes>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>

                <MyVerticallyCenteredModal
                  show={this.state.modalShow}
                  title='Modifier la photo de profile'
                  onHide={() => this.setState({ modalShow: false })}
                >
                  <div className="Fdo Aic ELG Anv">
                    <div className="Fdo ELG kzZ m2F zI7 iyn Hsu Anv">
                      <div className="Fdo ELG Anv" ref={changeAvatarRef => (this.changeAvatarRef = changeAvatarRef)}></div>
                      <div className="Fdo Cdf">
                        <div className="Fdo Aic Cdf">
                          <Button variant=" _8A5w5" onClick={() => this.setState({ modalShow: false })}>Annuler</Button>
                        </div>
                        <div className="Fdo aBv Cdf">
                          {this.state.changepdpLoading ?
                            <div className="follow-btn Dbf">
                              <div className="btn-text-content iFc">Attendez...</div>
                            </div>
                            :
                            <Button variant=" _Dvgb " onClick={this.onResult} >Suivant</Button>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </MyVerticallyCenteredModal>
              </div>
            </div>
          </>
        }
      </>
    )
  }
}
export default withRouter(Profile)
function ProfileTemplate() {
  return (
    <div className="profile-container online">
      <div className="_mainc erCf">
        <div className="Anv RpG E4_R">
          <div className="RpG Profil-canva">
            <div className="Enb">
              <div className="HaS-3"></div>
            </div>
          </div>
        </div>
        <div className="_o6mpc">
          <div className="Fdo _ienqf Aic">
            <div className="qfAOE"></div>
          </div>
          <div className="Fdo Aic _ienqf">
            <div className="DrvG"></div>
            <div className="DrvG"></div>
            <div className="ltVA"></div>
          </div>
          <div className="k9GMp _ienqf">
            <div className="drGTB Lbdf"></div>
            <div className="drGTB Lbdf"></div>
            <div className="drGTB"></div>
          </div>
          <div className='_ienqf Fdo '>
            <div className="ltVA"></div>
          </div>
          <div className="k9GMp _ienqf">
            <div className="ltVA"></div>
            <div className="ltVA"></div>
            <div className="ltVA"></div>
          </div>
        </div>
      </div>
    </div>
  )
}


function TabMenuLink({ label, onClick, to, path, activeOnlyWhenExact }) {
  const match = useMatch(to, {
    path: path,
    exact: activeOnlyWhenExact,
    strict: false,
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
