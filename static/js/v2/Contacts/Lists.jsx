import React from "react";
import { withRouter } from "../util/WithRouter";
import { BottomAffichage, CardAuthorTemplate, ExploreLoading } from "../Template/Template";
import { useDispatch, useSelector } from "react-redux";
import Fetch from "../util/Fetch";
import InfiniteScroll from "../Components/InfiniteScroll";
import { Button } from "../Components/fields/Fields";
import { createMatchList } from "../redux/ContactsRedux";
import Retire from "./Retire";

const Lists = (props) => {
    const dispatch = useDispatch();
    const redux = useSelector((state) => state);
    const store = redux.MatchList
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
        formData.append('url', './RESTAPI/Contacts/All')
        formData.append('limit', limit)
        Fetch('/api', formData, data => {
            dispatch(createMatchList(data.users));
            setLoading(false)
        })
    }
    const nextData = () => {
        setNextLoading(true);
        GetData();
    }
    const newMessage = (user_id) => {
        props.navigate(`/inbox/${user_id}`);
    }
    return <div className="Fdo Lns Nfb ELG Flk">
        <div className="Fdo aBv FGM nF1 CenterContainer Lns">
            <div className="default-container App">
                {store.length > 0 &&
                    <h1 className="SH1 tlK SMy Vft">Contacts</h1>
                }
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
                                <CardAuthorTemplate author={e} showOnline={true} >
                                    <div className="Fdo  Pag g4R">
                                        <Retire user={e} />
                                        <div className="Fdo " >
                                            <Button onClick={() => newMessage(e.user_id)} variant="_Dvgb">Messages</Button>
                                        </div>
                                    </div>
                                </CardAuthorTemplate>
                            </div>
                        ))}
                    </InfiniteScroll>
                }
                {!loading && store.length === 0 &&
                    <BottomAffichage titre={'Aucune personne dans votre liste de contact'}
                        texte={'Vous voyez ici les personnes avec qui vous avez matcher'} />
                }

            </div>
        </div>
    </div>
}
export default withRouter(Lists)