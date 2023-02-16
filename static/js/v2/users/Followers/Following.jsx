import React from "react";
import MyVerticallyCenteredModal from "../../../Components/modal/modalCore";
import { withRouter } from "../../util/WithRouter";
import { CardAuthorTemplate, ExploreLoading, NameContainer } from "../../Template/Template";
import Fetch from "../../util/Fetch";
import { useDispatch } from "react-redux";
import { createFollowingList } from "../../redux/UserProfiles";
import FollowBtn from "../Components/Buttons/FollowBtn";
import InfiniteScroll from "../../Components/InfiniteScroll";
import { EmptyFollowers } from "../Components/Template";
const Following = (props) => {
    const [loading, setLoading] = React.useState(false)
    const [nextloading, setNextLoading] = React.useState(false)
    const dispatch = useDispatch();
    const limit = 10;
    React.useEffect(() => {
        if (props.profile.content.following.length === 0 && props.profile.content.following_list_has_next_page) {
            setLoading(true)
            GetData();
        }
    }, [])
    const GetData = () => {
        setNextLoading(true);
        let data = new FormData();
        if (props.profile.content.following.length > 0) {
            let id = props.profile.content.following.map(e => {
                return e.user_id
            })
            data.append('idlist', id)
        }
        data.append('url', 'RESTAPI/Users/Followers');
        data.append('user_id', props.profile.user_id);
        data.append('limit', limit)
        data.append('Type', 'Following');
        Fetch('/api', data, res => {
            if (res.success === 1) {
                dispatch(createFollowingList({ 'user_id': props.profile.user_id, 'followers': res.followers, 'next_page': res.has_next_next }))
            }
            setLoading(false);
            setNextLoading(false);
        })
    }
    return <MyVerticallyCenteredModal
        show={true}
        titre='suivi(es)'
        onHide={() => props.navigate(-1)}
        size="sm"
        nopadding="true"
    >
        <div className="Fdo  aBv Anv">
            {props.profile.statistiques.following > 0 &&
                <div className="Fdo">
                    <span className="Fdo Kmm">
                        <span className="sqdOP">{props.profile.username}</span>
                        <span className="PLP LmP"> suit </span>
                        <span className="sqdOP"> {props.profile.statistiques.following} </span>
                        <span className="PLP LmP"> personne(s) </span>
                    </span>
                </div>
            }
            <div className='Eom g4R'>
                {!loading && props.profile.content.following.length === 0 &&
                    <EmptyFollowers text={`Aucun resultat`} />
                }
                {loading ?
                    <ExploreLoading length={props.profile.statistiques.following >= limit ? limit : props.profile.statistiques.following} />
                    :
                    <InfiniteScroll
                        next={GetData}
                        next_page={props.profile.content.following_list_has_next_page}
                        loading={nextloading}
                    >
                        {props.profile.content.following.map((e, index) => (
                            <div className='app-user-follow-box UserActions' key={index}>
                                <CardAuthorTemplate author={e}>
                                    <FollowBtn type="link" user={e} />
                                </CardAuthorTemplate>
                            </div>
                        ))}
                    </InfiniteScroll>
                }
            </div>

        </div>
    </MyVerticallyCenteredModal>
}
export default withRouter(Following)