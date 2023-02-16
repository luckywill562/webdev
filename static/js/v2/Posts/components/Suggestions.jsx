import React from "react";
import Fetch from "../../util/Fetch";
import FollowBtn from "../../users/Components/Buttons/FollowBtn";
import { CardAuthorTemplate, ExploreContainer, ExploreLoading } from "../../Template/Template";
import { useDispatch, useSelector } from "react-redux";
import { createUserSuggestions } from "../../redux/SuggestionsRedux";
const Suggestions = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const list = useSelector((state) => state);
    React.useEffect(() => {
        if (list.Suggestions.length === 0) {
            setLoading(true)
            var formData = new FormData();
            formData.append('url', './RESTAPI/suggestions/suggestions')
            formData.append('limit', 5)
            Fetch('/api', formData, data => {
                if (data.success) {
                    dispatch(createUserSuggestions(data.users));
                }
                setLoading(false);
            })
        }
    }, []);

    return <ExploreContainer>
        {loading ?
            <ExploreLoading length={3} />
            :
            <>
                {list.Suggestions.map((e, index) => (
                    <div className='UserActions Ert Vpe' key={index}>
                        <CardAuthorTemplate author={e}>
                            <FollowBtn type="link" user={e} />
                        </CardAuthorTemplate>
                    </div>
                ))}
                {list.Suggestions.length === 0 &&
                    <div className="">Aucune suggestions pour le moment</div>
                }
            </>
        }
    </ExploreContainer>
}
export default Suggestions
