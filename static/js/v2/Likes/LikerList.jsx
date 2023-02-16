import React from "react";
import { Love } from "../icon/icons";
import { CardAuthorTemplate, ExploreLoading } from "../Template/Template";
import Fetch from "../util/Fetch";
import { withRouter } from "../util/WithRouter";
import { ModalShowHeader } from "../Posts/Templates/Templates";
import MyVerticallyCenteredModal from "../../Components/modal/modalCore";
const LikerList = (props) => {
    const [loading, setLoading] = React.useState(false)
    const [likerList, setLikerList] = React.useState([]);
    React.useEffect(() => {
        setLoading(true);
        let formData = new FormData();
        formData.append('limit', 10)
        formData.append('url', './RESTAPI/Likes/LikerList')
        formData.append('element_id', props?.useParams?.id)
        formData.append('element_type', props?.useParams?.type)
        const userList = likerList.slice();
        Fetch('/api', formData, (res) => {
            setLoading(false);
            if(res.success ===1){
                userList.push(...res.payload);
                setLikerList(userList)
            }
        })
    }, [])
    return <MyVerticallyCenteredModal
        show={true}
        onHide={() => props.navigate(-1)}
        nopadding="true"
    >
        <div className="Fdo">
            <div className="default-container App">
                <ModalShowHeader title="Mentions j'aime" onClick={() => props.navigate(-1)} />
                <div className="Fdo  aBv Anv">
                    <div className='Eom g4R'>
                        {loading ?
                            <ExploreLoading length={4} />
                            :
                            <div>
                                {likerList.map((e, index) => (
                                    <div className='app-user-follow-box UserActions' key={index}>
                                        <CardAuthorTemplate author={e}>
                                            <div className="QBdPU Fdo hbc">
                                                <Love size={18} />
                                            </div>
                                        </CardAuthorTemplate>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    </MyVerticallyCenteredModal>
}
export default withRouter(LikerList)