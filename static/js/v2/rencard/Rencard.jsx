import React from "react";
import { withRouter } from "../util/WithRouter";
import { Link } from "react-router-dom";
import Fetch from "../util/Fetch";
import { CardAuthorTemplate } from "../Template/Template";
import { Button } from "../Components/fields/Fields";
import { useDispatch, useSelector } from "react-redux";
import { closeAlertBox, showAlertBox } from "../redux/UtilRedux";
import { ChangeRencardInterestedButton, CreateRencardList } from "../redux/RencardRedux";
const Rencard = (props) => {
    const [loading, setLoading] = React.useState(false);
    const [Rencard, setRencard] = React.useState([]);
    const dispatch = useDispatch();
    const state = useSelector((store) => store);
    React.useEffect(() => {
        if (state.RencardList.length === 0) {
            setLoading(true);
            var formData = new FormData();
            formData.append('url', '/RESTAPI/Rencard/get')
            formData.append('page', 0)
            formData.append('limit', 5)
            Fetch('/api', formData, (res) => {
                setLoading(false);
                if (res.success === 1) {
                    dispatch(CreateRencardList(res.payload));
                    setRencard(res.payload);
                }
            })
        }
    }, []);
    const handleClick = (id) => {
        var formData = new FormData();
        const find = state.RencardList.find((element=> element.content.id === id));
        if(find.content.viewer_intersted){
            var action = 'uninterested'
        }else if(!find.content.viewer_intersted){
            var action = 'interested'
        }
        dispatch(ChangeRencardInterestedButton(id));
        formData.append('url', '/RESTAPI/Rencard/Interested')
        formData.append('post_id', id)
        formData.append('action', action)
        Fetch('/api', formData, (res) => {
            dispatch(showAlertBox(res));
            setTimeout(() => {
                dispatch(closeAlertBox());
            }, 1000);
            if(res.success === 0){
                dispatch(ChangeRencardInterestedButton(id));
            }
        })
    }
    return <div className="Fdo aBv Anv FGM nF1 CenterContainer">
        <div className="Fdo Anv">
            <div className="post-card ">
                <div className="Fdo Lsy LDv Ert Vpe">
                    <div className="Fdo Aic Bsj">
                        <div className="SH1 tlK SMy Vft Bsj">Rencard</div>
                        <div className="Fdo">
                            <Link to='/create-circle' state={{ background: props.location }} className="Fdo sqdOP _kjyt  hrdfpoiu  Bgu ZIAjV">
                                <div className="Fdo Aic">
                                    <svg className="gUZ U9O kVc" width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g><path d="M 9,18L 16,18 l0,7 C 16,25.552, 16.448,26, 17,26S 18,25.552, 18,25L 18,18 l 7,0 C 25.552,18, 26,17.552, 26,17 C 26,16.448, 25.552,16, 25,16L 18,16 L 18,9 C 18,8.448, 17.552,8, 17,8S 16,8.448, 16,9L 16,16 L 9,16 C 8.448,16, 8,16.448, 8,17C 8,17.552, 8.448,18, 9,18z"></path></g></svg>
                                </div>
                                <div className="mWe gtriop">Lancer un rencard</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="DivRencardFeed">
                {state.RencardList.map((element) => (
                    <div className="DivContainer-StyledDivContainerV2 BjN Ngt" key={element.content.id}>
                        <div style={{ paddingTop: '50%' }}>
                            <div className="DivWrapper">
                                <div className="MeetDivContentBlock">
                                    <div className="card-top">
                                        <CardAuthorTemplate author={element.author} />
                                    </div>
                                    <div className="Fdo Flk Lsy LDv">
                                        <div className="Fdo Ngt Bsj">
                                            <div className=" Fdo Ert Vpe Lsy LDv Anv Pac">
                                                {element.content.description ?
                                                    <div className="RencardDivTextMotif" dangerouslySetInnerHTML={{ __html: element.content.description }}></div>
                                                    :
                                                    <div className="Fdo Aic Lns RencardDivTextMotif">
                                                        <div>Aucune description</div>
                                                    </div>
                                                }
                                                <div className="Fdo Aic">
                                                    <span className="Fdo">
                                                        <svg width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g><path d="M 15.212,16.424c 2.874,0, 5.212-2.338, 5.212-5.212C 20.424,8.338, 18.086,6, 15.212,6S 10,8.338, 10,11.212 C 10,14.086, 12.338,16.424, 15.212,16.424z M 15.212,8c 1.77,0, 3.212,1.44, 3.212,3.212s-1.44,3.212-3.212,3.212S 12,12.982, 12,11.212 S 13.44,8, 15.212,8zM 14.484,31.458c 0.168,0.186, 0.33,0.306, 0.486,0.39c 0.002,0.002, 0.006,0.002, 0.008,0.004 c 0.108,0.056, 0.214,0.098, 0.314,0.098c 0.1,0, 0.206-0.042, 0.314-0.098c 0.002-0.002, 0.006-0.002, 0.008-0.004 c 0.156-0.084, 0.318-0.204, 0.486-0.39c0,0, 9.296-10.11, 10.23-18.87c 0.056-0.452, 0.094-0.91, 0.094-1.376 C 26.424,5.020, 21.404,0, 15.212,0S 4,5.020, 4,11.212c0,0.474, 0.038,0.936, 0.096,1.394C 5.054,21.362, 14.484,31.458, 14.484,31.458z M 15.212,2 c 5.080,0, 9.212,4.132, 9.212,9.212c0,0.338-0.024,0.698-0.082,1.164c-0.716,6.712-7.018,14.588-9.048,16.984 c-2.082-2.4-8.474-10.256-9.214-17C 6.026,11.918, 6,11.554, 6,11.212C 6,6.132, 10.132,2, 15.212,2z"></path></g></svg>
                                                    </span>
                                                    <span className="E6d">
                                                        La gastronomie pizza
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="LDv Kmm Lsy">
                                        {element.content.viewer_intersted ?
                                            <Button variant="_8A5w5" onClick={() => handleClick(element.content.id)}>ça ne m'interesse plus</Button>
                                            :
                                            <Button variant="_Dvgb" onClick={() => handleClick(element.content.id)}>Allons-y</Button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
}
export default withRouter(Rencard)