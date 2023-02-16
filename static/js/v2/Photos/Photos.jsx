import React from "react";
import { ContentBottomContainer, PhotoGridTemplate, TabMenuLink } from "../users/Components/Template";
import fetch from "../util/fetch";
import { withRouter } from "../util/WithRouter";
import { useDispatch, useSelector } from 'react-redux';
import { createPhotosExploreSlice } from "../redux/PhotoExploreRedux";
import { FakePhotoGrid, ImageGridLoading ,BottomAffichage} from "../Template/Template";
const Photos = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false)
    const store = useSelector((state) => state);
    React.useEffect(() => {

        if (store.PhotosExplore.length === 0) {
            setLoading(true);
            let formData = new FormData();
            formData.append('url', '/RESTAPI/Album/GetPhotosAlbum')
            fetch('/api', formData, res => {
                setLoading(false)
                dispatch(createPhotosExploreSlice(res.message))
            })
        }
    }, [])

    return <ContentBottomContainer>
            <div className="Ba2">
                <div className="Fdo Cdf kzZ" style={{ margin: '-4px' }}>
                    {loading ?
                        <ImageGridLoading /> :
                        <>
                            {store.PhotosExplore.map((element) => (
                                <div className="photo-item" key={element.album_id}>
                                    <PhotoGridTemplate e={element} state={props.location} />
                                </div>
                            ))}
                        </>
                    }
                    <FakePhotoGrid />
                </div>
                {!loading && store.PhotosExplore.length === 0 &&
                    <BottomAffichage titre={'Aucune photos pour vous pour le moment'} texte={'Abonne toi a plus de personne'} />
                }
        </div>
    </ContentBottomContainer>
}


export default withRouter(Photos)