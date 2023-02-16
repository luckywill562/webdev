import React from "react";
import { withRouter } from "../../util/WithRouter";
import fetch from "../../util/fetch";
import { PhotoGridTemplate } from "../Components/Template";
import InfiniteScroll from "../../Components/InfiniteScroll";
import { ImageGridLoading } from "../../Template/Template";
const FakeGrid = () => {
    let row = [];
    for (let i = 0; i < 5; i++) {
        row.push(
            <div className="photo-gri" key={i}> </div>
        )
    }
    return row;
}
const AlbumGrid = (props) => {
    const [loading, setLoading] = React.useState(false)
    const [nextloading, setNextLoading] = React.useState(false);
    React.useEffect(() => {
        if (props?.profile?.content?.media?.length === 0 && props?.profile?.content?.media_has_next_page) {
            getPhotos();
        }
    }, [])
    const getPhotos = () => {
        setLoading(true)
        var formData = new FormData();
        formData.append('url', '/RESTAPI/Album/user_album')
        formData.append('user_id', props.profile.user_id)
        formData.append('page', 0)
        formData.append('limit', 10)
        fetch('/api', formData, (res) => {
            if(res?.success ==1){
                props.profileUpdate(res?.album?.media_list, res?.album?.has_next_page);
            }
            setLoading(false)
        })
    }
    const nextPage = () => {
        setNextLoading(true)
        var formData = new FormData();
        formData.append('url', '/RESTAPI/Album/user_album')
        formData.append('user_id', props.profile.user_id)
        if (props.profile.content.media.length > 0) {
            formData.append('page', props.profile.content.media[props.profile.content.media.length - 1].album_id)
        } else {
            formData.append('page', 0)
        }
        formData.append('limit', 10)
        fetch('/api', formData, (res) => {
            if(res?.success ==1){
                props.profileUpdate(res?.album?.media_list, res?.album?.has_next_page);
            }
            setNextLoading(false)
        })
    }
    return (
        <div className="Ba2 Ert">
            {loading ?
                <div className="Fdo Cdf kzZ" style={{ margin: "-4px" }}>
                    <ImageGridLoading />
                </div>
                :
                <InfiniteScroll
                    next={nextPage}
                    next_page={props.profile.content.media_has_next_page}
                    loading={nextloading}
                    margin="300px"
                >
                    {props.profile.content.media.length > 0 ?
                        <div className="Fdo Cdf kzZ" style={{ margin: "-4px" }}>
                            {props.profile.content.media.map((e, index) => (
                                <div key={index} className="photo-gri">
                                    <PhotoGridTemplate e={e} state={props.location} />
                                </div>
                            ))}
                            <FakeGrid />
                        </div>
                        : null
                    }
                </InfiniteScroll>
            }
            {!loading && props.profile.content.media.length == 0 && !props.profile.content.media_has_next_page &&
                <div className='Fdo Fdo Anv Aic'>
                    <div className='Fdo SH1'>L'utilisateur n'a pas encore de photo</div>
                    <div className=''>Abonnée vous a sa page pour reçevoir des notifications lorsqu'elle publie quelque chose</div>
                </div>
            }
        </div>
    )
}

export default withRouter(AlbumGrid);