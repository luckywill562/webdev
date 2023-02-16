import React from "react";
import { withRouter } from "../../util/WithRouter";
import { CardAuthorTemplate, ExploreLoading } from "../../Template/Template";
import { useDispatch, useSelector } from "react-redux";
import Fetch from "../../util/Fetch";
import { createFollowRequestListSlice } from "../../redux/RequestRedux";
import { EmptyFollowers } from "../Components/Template";
import InfiniteScroll from "../../Components/InfiniteScroll";
import { changeNextStatus } from "../../redux/UtilRedux";
import ReplyRequest from "./ReplyRequest";
const FollowerRequest = () => {
    const dispatch = useDispatch();
    const redux = useSelector((state) => state)
    const store = redux.FollowerRequest
    const [loading, setLoading] = React.useState(false)
    const [nextloading, setNextLoading] = React.useState(false)
    const limit = 1;

    const GetData = () => {
        setNextLoading(true);
        let data = new FormData();
        data.append('url', 'RESTAPI/Users/Followers');
        data.append('user_id', 1);
        data.append('Type', 'Request');
        data.append('limit', limit)
        if (store.length > 0) {
            let id = store.map(e => {
                return e.user_id
            })
            data.append('idlist', id)
        }
        Fetch('/api', data, res => {
            if (res.success === 1) {
                dispatch(createFollowRequestListSlice(res.followers))
                dispatch(changeNextStatus({ 'name': 'follower_request', 'value': res.has_next_next }))
            }
            setLoading(false);
            setNextLoading(false)
        })
    }
    React.useEffect(() => {
        if (store.length === 0 && redux.Next_Page.follower_request) {
            setLoading(true)
            GetData()
        }

    }, [])
    return <div className="Fdo Lns Nfb ELG Flk">
        <div className="Fdo aBv FGM nF1 CenterContainer Lns">
            <div className=" App" style={{ maxWidth: 542 }}>
                {!loading && store.length === 0 ?
                    <EmptyFollowers text={`Vous n'avez pas de demmande d'abonnement`} />
                    :
                    <div className="page Fdo  Igw0E  mWe   IwRSH  Lns vwCYk">Demande d'abonnements</div>
                }
                {loading || !store ?
                    <ExploreLoading length={5} />
                    :
                    <InfiniteScroll
                        next={GetData}
                        next_page={redux.Next_Page.follower_request}
                        loading={nextloading}
                        margin={0}
                    >
                        {store.map((e, index) => (
                            <div className='UserActions Ert Vpe' key={index}>
                                <CardAuthorTemplate author={e}>
                                    <ReplyRequest user={e} />
                                </CardAuthorTemplate>
                            </div>
                        ))}
                    </InfiniteScroll>
                }
                <div className="Eom">
                    <div className="Fdo Anv Pag g4R">
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default withRouter(FollowerRequest)