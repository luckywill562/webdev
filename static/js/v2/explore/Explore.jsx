import React from "react";
import { withRouter } from "../util/WithRouter";
import { BottomAffichage, CardAuthorTemplate, ExploreLoading } from "../Template/Template";
import { useDispatch, useSelector } from "react-redux";
import Fetch from "../util/Fetch";
import { createAllSuggestionsList } from "../redux/SuggestionsRedux";
import FollowBtn from "../users/Components/Buttons/FollowBtn";
import InfiniteScroll from "../Components/InfiniteScroll";
import { changeNextStatus } from "../redux/UtilRedux";
const Explore = () => {
    const dispatch = useDispatch();
    const redux = useSelector((state) => state);
    const store = redux.AllSuggestions
    const [loading, setLoading] = React.useState(false)
    const [nextloading, setNextLoading] = React.useState(false);
    const limit = 20
    React.useEffect(() => {
        if (store.length === 0) {
            setLoading(true)
            GetData();
        }
    }, [])

    const GetData = () => {
        var formData = new FormData();
        formData.append('url', './RESTAPI/suggestions/suggestions')
        if (store.length > 0) {
            let id = store.map((e) => {
                return e.user_id
            })
            formData.append('idlist', id)
        }
        formData.append('limit', limit)
        Fetch('/api', formData, data => {
            dispatch(createAllSuggestionsList(data.users));
            setLoading(false);
            setNextLoading(false)
            dispatch(changeNextStatus({ 'name': 'explore_user', 'value': data.has_next_page }))
        })
    }
    const nextData = () => {
        setNextLoading(true);
        GetData();
    }
    return <div className="Fdo Lns Nfb ELG Flk">

        <div className="Fdo aBv FGM nF1 CenterContainer Lns">
            <div className="default-container App">
                <h1 className="SH1 tlK SMy Vft">suggestions</h1>
                {loading ?
                    <ExploreLoading length={20} />
                    :
                    <InfiniteScroll
                        next={nextData}
                        next_page={redux.Next_Page.explore_user}
                        loading={nextloading}
                        margin="10px">

                        {store.map((e, index) => (
                            <div className='UserActions Ert Vpe' key={index}>
                                <CardAuthorTemplate author={e}>
                                    <FollowBtn type="button" user={e} />
                                </CardAuthorTemplate>
                            </div>
                        ))}
                    </InfiniteScroll>
                }
                {!loading && store.length === 0 &&
                    <BottomAffichage titre={'aucune suggesions pour le moment'} texte={'nous n\'avons aucune personnes a vous suggerer pour le moment'}/>
                }
            </div>
        </div>
    </div>
}
export default withRouter(Explore)