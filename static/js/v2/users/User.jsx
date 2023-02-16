import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { withRouter } from "../util/WithRouter";
import Main from "./Components/Main";
import Fetch from "../util/fetch";
import AlbumGrid from "./album/AlbumGrid";
import { ContentBottomContainer } from "./Components/Template";
import { useDispatch, useSelector } from "react-redux";
import { AddAboutContent, AddPostsContent, createUserProfilesSlice } from "../redux/UserProfiles";
import { AddAlbumContent } from "../redux/UserProfiles";
import Followers from "./Followers/Followers";
import Following from "./Followers/Following";
import Posts from "./Posts/Posts";
import About from "./About/About";
import { IconPrivate, PersonAdd } from "../icon/icons";
import ReplyRequest from "./Followers/ReplyRequest";
import Videos from "./videos/Videos";
import { UserPageLoading } from "../Template/Loading";
import FollowPremium from "./Followers/Premium";
import PrivateContent from "./Private/PrivateContent";
const User = (props) => {
    const mounted = React.useRef();
    const dispatch = useDispatch();
    const [user, setUser] = React.useState(undefined);
    const [loading, setLoading] = React.useState(false);
    const UserListVisited = useSelector((reponse) => reponse.UserProfiles);
    const checkList = UserListVisited.findIndex((UserListVisited => UserListVisited.username === props.useParams.id));

    const GetUser = (user) => {
        if (checkList < 0) {
            setLoading(true);
            var formData = new FormData();
            formData.append('id', user)
            formData.append('url', '/RESTAPI/Users/profile')
            formData.append('page', 0)
            formData.append('limit', 20)
            Fetch(`/${user}`, formData, res => {
                setLoading(false)
                if (res.success == 1) {
                    dispatch(createUserProfilesSlice(res.payload));
                    setUser(res.payload)
                } else if (res.success === 0) {
                    props.navigate(`/404`);
                }
            })
        } else {
            setLoading(false)
            setUser(UserListVisited[checkList])
        }
    }

    React.useEffect(() => {
        GetUser(props.useParams.id);
    }, [props.useParams.id]);

    React.useEffect(() => {
        if (!mounted.current) {
            mounted.current = true
        } else {
            if (checkList >= 0) {
                setUser(UserListVisited[checkList])
            }
        }
    }, [UserListVisited]);

    const UpdateAlbumArray = (album, last) => {
        dispatch(AddAlbumContent({ 'name': album, 'plus': last, 'index': checkList }))
    }
    const PostsUpdate = (posts, next_page) => {
        dispatch(AddPostsContent({ 'name': posts, 'next_page': next_page, 'index': checkList }))
    }
    const UpdateAboutColumn = (data) => {
        dispatch(AddAboutContent({ index: checkList, data }))
    }
    const background = props.location.state && props.location.state.background;

    return <div className="Fdo Anv Pac">
        {user && user.blocked_by_viewer ?
            <div className="Fdo Lsy LDv Ert Vpe">cette utilisateur n'est plus disponnible</div>
            :
            <>
                {user && user.has_requested_follow_viewer &&
                    <div className="Fdo aBv  nF1 CenterContainer ">
                        <div className="Fdo Bsj">
                            <div className="Fdo Bsh Ert Vpe btb Bsj Aic hn33210v  LDv Lsy">
                                <div className="LDv">
                                    <PersonAdd size={22} />
                                </div>
                                <div className="page Fdo  Igw0E  mWe   IwRSH  Lns vwCYk">
                                    cette personne demmande a vous suivre
                                </div>
                                <div className="Fdo">
                                    <ReplyRequest user={user} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className={`Fdo aBv  nF1 CenterContainer ${user && user.has_requested_follow_viewer ? '' : ''}`}>
                    <div className="Fdo ELG Anv">
                        <div className="Fdo Anv hty Hdt  page">
                            {loading || !user ?
                                <UserPageLoading /> :
                                <>
                                    <Routes location={background || location}>
                                        <Route path="/" element={<Main user={user} />}>
                                            {user.private && !user.followed_by_viewer && !user.viewer ?
                                                <>
                                                    <Route index element={
                                                        <ContentBottomContainer>
                                                            <PrivateTemplate />
                                                        </ContentBottomContainer>
                                                    } />
                                                    <Route path='/posts/*' element={
                                                        <ContentBottomContainer>
                                                            <PrivateTemplate />
                                                        </ContentBottomContainer>
                                                    } />
                                                    <Route path="/followers" element={
                                                        <PrivateTemplate />
                                                    } />
                                                    <Route path="/following" element={
                                                        <PrivateTemplate />
                                                    } />
                                                    <Route path="/videos" element={
                                                        <PrivateTemplate />
                                                    } />
                                                    <Route path="/premium" element={
                                                        <FollowPremium user={user} />
                                                    } />
                                                    <Route path="/private" element={
                                                        <PrivateContent user={user} />
                                                    } />
                                                </>
                                                :
                                                <>
                                                    <Route index element={
                                                        <ContentBottomContainer>
                                                            <AlbumGrid profile={user} profileUpdate={UpdateAlbumArray} />
                                                        </ContentBottomContainer>
                                                    } />
                                                    <Route path='/posts/*' element={
                                                        <ContentBottomContainer>
                                                            <Posts profile={user} profileUpdate={PostsUpdate} />
                                                        </ContentBottomContainer>
                                                    } />
                                                    <Route path="/followers" element={
                                                        <Followers profile={user} />
                                                    } />
                                                    <Route path="/following" element={
                                                        <Following profile={user} />
                                                    } />
                                                    <Route path="/videos" element={
                                                        <Videos user={user} />
                                                    } />
                                                    <Route path={`/premium`} element={
                                                        <FollowPremium user={user} />
                                                    } />
                                                    <Route path="/private" element={
                                                        <PrivateContent user={user} />
                                                    } />
                                                    <Route path="/about" element={<About profile={user} UpdateAboutColumn={UpdateAboutColumn} />} />
                                                    <Route path="*" element={<Navigate to="/404" replace />} />
                                                </>
                                            }
                                        </Route>
                                    </Routes>
                                    {background && (
                                        <Routes>
                                            <Route path="followers" element={
                                                <Followers profile={user} />
                                            } />

                                            <Route path="following" element={
                                                <Following profile={user} />
                                            } />
                                            <Route path={`premium`} element={
                                                <FollowPremium user={user} />
                                            } />
                                            <Route path="about" element={<About profile={user} UpdateAboutColumn={UpdateAboutColumn} />} />
                                        </Routes>
                                    )}
                                </>
                            }
                        </div>
                    </div>
                </div>
            </>
        }
    </div>
}
export default withRouter(User)

function PrivateTemplate() {
    return <div className="Fdo Anv Bsj Lns Aic v4a FGM">
        <div className="Fdo Anv Aic">
            <div className="Fdo Aic Lns">
                <div className="m9osqain ">
                    <IconPrivate size={32} />
                </div>
            </div>
            <div className="yTZ mWe">Ce compte est privé</div>
            <div className="v2ao">suivez cette personne si vous voulez voir ses photos ou ses publications</div>
        </div>
    </div>
}
