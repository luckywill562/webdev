import React from "react";
import { Link, Outlet } from "react-router-dom";
import { withRouter } from "../../util/WithRouter";
import { TabMenuLink, MenuLink } from "./Template";
import FollowBtn from "./Buttons/FollowBtn";
import { Checked, ChatBoxes } from "../../icon/icons";
import { Spinner } from "react-bootstrap";
import ProfileSettings from "../Settings/ProfileSetting";
import AvatarChange from "../Settings/AvatarChange";
import LoveUserComponent from "./Buttons/LoveUserComponent";
const Main = (props) => {
  const [btnMessageLoading, setBtnMessageLoading] = React.useState(false)

  const newMessage = () => {
    props.navigate(`/inbox/${props.user.user_id}`);
  }
  return (
    <>
      <div className="Fdo Fbd fykbt5ly ns4ygwem Bsh">
        <div className="Fdo Anv Vnk Flk">
          <div className="Fdo Lns page">
            <div className="Aic Fdo Lns">
              <div className="ELG Lsy LDv">
                <div className="_mainc Lsy Vpe Aic">
                  <div className="Anv RpG E4_R">
                    <div className="RpG Profil-canvas">
                      <div className="user-profile-header-thumbnail">
                        <img src={props.user.avatar} className="hty ELG hrt" />
                      </div>
                      {props.user.viewer ?
                        <AvatarChange />
                        :
                        props.user.online ?
                          <div className="rSxHQ d4kh"></div> : null
                      }
                    </div>

                  </div>
                  <div className="_o6mpc">
                    
                    <div className="Fdo _ienqf Aic">
                      <h2 className="Enh" dangerouslySetInnerHTML={{ __html: props.user.first_name }}></h2>
                      {props.user.verified ?
                        <>
                          <div className='lZJ Lsy'>
                            <Checked size={20} />
                          </div>
                        </>
                        :
                        null
                      }
                      {!props.user.viewer ?
                        <span className="Lsy  _ov9ai" style={{ top: "3px" }}>
                          <div className="Fdo">
                            <div className="Fdo Lbdf Aic">
                              <ProfileSettings user={props.user} />
                            </div>
                          </div>
                        </span>
                        : null
                      }
                    </div>

                    <div className="Fdo Aic _ienqf">
                      <div className="Fdo Aic">
                        {props?.user?.viewer ?
                            <Link to="/settings/" className="sqdOP Xdg L3NKy ZIAjV  _8A5w5">Modifier</Link>
                          :
                          <>
                            <FollowBtn type="button" user={props?.user} />
                            {props?.user?.has_match_with_viewer || props?.user?.people_meet_desactived ?
                              <div className="Fdo page RpE">
                                {btnMessageLoading &&
                                  <div className="ApE kVc hty ELG p1c">
                                    <div className="Fdo hty  Aic Lns">
                                      <Spinner size="sm" animation="border" />
                                    </div>
                                  </div>
                                }
                                <button onClick={newMessage} className={`sqdOP   L3NKy ZIAjV  Xdg Bsj Lbg ${btnMessageLoading ? 'disabled' : ''}`}>
                                  <div className="Fdo">
                                    <span className="Fdo Aic">
                                      <ChatBoxes size={18} />
                                    </span>
                                    <span className="Fdo LmP">message</span>
                                  </div>
                                </button>
                              </div> :
                              <LoveUserComponent type="link" user={props?.user} />
                            }
                          </>
                        }
                      </div>
                    </div>
                    {props?.user?.viewer_is_premium &&
                      <div className="Fdo _ienqf Aic">
                        <span className="premium-indicator" data-toggle="tooltip" data-html="true" title="vous pouvez acceder au contenus privés de cette utilisateur">
                          premium
                        </span>
                      </div>
                    }
                    <div className="_ienqf Fdo ">
                      <div className=" ZIAjV ">@{props?.user?.username}</div>
                    </div>
                  </div>
                </div>
                <div className="Fdo Anv Lsy">
                  <ul className="k9GMp Vpe">
                    <MenuLink to={`following`} state={{ background: props?.location }} label="abonnements" count={props.user.statistiques.following} />
                    <MenuLink to='followers' label="abonnés" state={{ background: props?.location }} count={props.user.statistiques.followers} />

                  </ul>
                  {props?.user?.bio && (
                    <div className="few-words Vpe Fdo ">
                      <span className="SubContent" dangerouslySetInnerHTML={{ __html: props?.user?.bio }}></span>
                    </div>
                  )}
                  <div className="about _ienqf">
                    <Link to="about" className='mWe' state={{ background: props.location }}>Plus d'informations sur {props.user.viewer ? "vous" : `@${props.user.username}`}</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Fdo tLp">
            <div className="Cvg"></div>
          </div>
          <div className="Fdo Aic Cdf TabMenu ELG">
            <div className="Fdo ELG  Lns" >
              <div className="Fdo  ELG Lns" style={{ maxWidth: "825px" }}>
                <div className="Fdo ELG">
                  <div className="Fdo ELG gvn Ert Lsy LDv Vpe">
                    <TabMenuLink activeOnlyWhenExact={true} to={`/${props.useParams.id}`} path={props.location.pathname} label={`album`} />
                    <TabMenuLink to={`/${props.useParams.id}/videos`} path={props.location.pathname} label={` videos`} />
                    <TabMenuLink to={`/${props.useParams.id}/private`} path={props.location.pathname} label={` privée`} />
                    <TabMenuLink to={`/${props.useParams.id}/posts/`} path={props.location.pathname} label={` publications`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
export default withRouter(Main)

