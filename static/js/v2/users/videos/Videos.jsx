import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LoadingXlContent, Play } from "../../icon/icons";
import Fetch from "../../util/Fetch";
import { BottomAffichage } from "../../Template/Template";
const Videos = (props) => {
    const [loading, setLoading] = React.useState(false);
    const [videos, setVideos] = React.useState([]);
    React.useEffect(() => {
        setLoading(true);
        var formData = new FormData();
        formData.append('url', '/RESTAPI/Users/videos')
        formData.append('profile_id', props.user.user_id);
        formData.append('page', 0)
        formData.append('limit', 5)
        Fetch('/api', formData, (res) => {
            if (res?.success === 1) {
                setVideos(res.message.videos)
            }
            setLoading(false);
        })
    }, [])
    const location = useLocation()
    return <div className="Ba2 Ert ftB g4R Bsj ">
        {loading ?
            <LoadingXlContent />
            :
            <div className="DivVideoFeedV2">
                {videos.map((e, index) => (
                    <div className="DivContainer-StyledDivContainerV2" key={index}>
                        <div style={{ paddingTop: '132.653%' }}>
                            <div className="DivWrapper">
                                <canvas className="CanvasPlaceholder"></canvas>
                                <div className="DivPlayerContainer">
                                    <Link to={`/media?id=${e.media_id}&type=album&element_id=${e?.album_id}`} state={{ background: location }}>
                                        <div className="DivContainer">
                                            <img src={e?.image_url} className="ImgPoster" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="BottomVideoStat">
                            <div className="BottomStatContainer LCR hgf shadowvg">
                                <Play size={24} />
                                <span>{e?.views}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        }
        {!loading && videos.length === 0 &&
            <div className="Pac">
                <div className="Fdo Aic Lns">
                    <BottomAffichage titre={'L\'utilisateur n\'a pas encore publié des videos'} />
                </div>
            </div>
        }
    </div >
}
export default Videos