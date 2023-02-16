import React from "react";
import MyVerticallyCenteredModal from "../../../Components/modal/modalCore";
import { withRouter } from "../../util/WithRouter";
import { CardAuthorTemplate, ExploreLoading, NameContainer } from "../../Template/Template";
import Fetch from "../../util/Fetch";
import { useDispatch } from "react-redux";
import { createFollowersList } from "../../redux/UserProfiles";
import FollowBtn from "../Components/Buttons/FollowBtn";
import InfiniteScroll from "../../Components/InfiniteScroll";
import { EmptyFollowers } from "../Components/Template";
const Followers = (props) => {
    const [loading, setLoading] = React.useState(false)
    const [nextloading, setNextLoading] = React.useState(false)
    const dispatch = useDispatch();
    const limit = 10;
    React.useEffect(() => {
        if (props.profile.content.followers.length === 0 && props.profile.content.followers_list_has_next_page) {
            setLoading(true)
            GetData()
        }
    }, [])
    const GetData = () => {
        setNextLoading(true);
        let data = new FormData();
        if (props.profile.content.followers.length > 0) {
            let id = props.profile.content.followers.map(e => {
                return e.user_id
            })
            data.append('idlist', id)
        }
        data.append('url', 'RESTAPI/Users/Followers');
        data.append('user_id', props.profile.user_id);
        data.append('limit', limit)
        data.append('Type', 'followers');
        Fetch('/api', data, res => {
            if (res.success === 1) {
                dispatch(createFollowersList({ 'user_id': props.profile.user_id, 'followers': res.followers, 'next_page': res.has_next_next }))
            }
            setLoading(false);
            setNextLoading(false)
        })
    }
    return <MyVerticallyCenteredModal
        show={true}
        titre='Abonnés'
        onHide={() => props.navigate(-1)}
        size="sm"
        nopadding="true"
    >
        <div className="Fdo  aBv Anv">
            {props.profile.statistiques.followers > 0 &&
                <div className="Fdo">
                    <span className="Fdo Kmm">
                        <span className="sqdOP"> {props.profile.statistiques.followers} </span>
                        <span className="PLP LmP"> personne(s) suit </span>
                        <span className="sqdOP">{props.profile.username}</span>
                    </span>
                </div>
            }
            <div className='Eom g4R'>
                {!loading && props.profile.content.followers.length === 0 &&
                    <EmptyFollowers text={`Aucun resultat`} />
                }
                {loading ?
                    <ExploreLoading length={+props.profile.statistiques.followers >= limit ? limit : +props.profile.statistiques.followers} />
                    :
                    <InfiniteScroll
                        next={GetData}
                        next_page={props.profile.content.followers_list_has_next_page}
                        loading={nextloading}
                        margin={0}
                    >
                        {props.profile.content.followers.map((e, index) => (
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
export default withRouter(Followers)