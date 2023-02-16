import React, { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import MyVerticallyCenteredModal from "../../../Components/modal/modalCore";
const CommentForm = lazy(() => import("../../Comments/commentForm"));
import { IconNext, IconPrev } from "../../icon/icons";
import { Lock } from "../../Template/Template";
import Like from "./Like";
import { CardAuthorTemplate, ExploreLoading } from "../../Template/Template";
import fetch from "../../util/fetch";
import { withRouter } from "../../util/WithRouter";
import GetComment from "./GetComment";
import MediaPayment from "../../media/components/mediaPayment";
import { closeAlertBox, showAlertBox } from "../../redux/UtilRedux";
import { createSingleAlbumLists, singleAlbumActions } from "../../redux/PostsRedux";
import Player from "../../media/Player";
import { insertText, trim } from "../../util/util";
const SingleAlbum = (props) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const [album, setAlbum] = React.useState({});
    const [imageIndex, setImageIndex] = React.useState(0)
    const [Image, setImage] = React.useState({});
    const location = useLocation();
    const MediaDivContainer = React.useRef(null);
    const [height, setHeight] = React.useState(0);
    const imgRef = React.useRef(null);
    const [imgWidth, setImagewidth] = React.useState(600)
    const [imgHeight, setImageHeight] = React.useState(0);
    const store = useSelector((state) => state)
    const Album = store.VisitedAlbumLists
    React.useEffect(() => {
        const findIndex = Album.find((visited => visited.album.album_id === props.useParams.id))
        if (findIndex) {
            setAlbum(findIndex)
            if (findIndex.images.length > 0) {
                setImage(findIndex.images[0]);
            }
        } else {
            Load();
        }
    }, [])
    const Load = () => {
        setLoading(true);
        let formData = new FormData();
        formData.append('album_id', props.useParams.id)
        formData.append('url', 'RESTAPI/album/Single')
        fetch('/api', formData, res => {
            if (res.success === 1) {
                setAlbum(res.album)
                dispatch(createSingleAlbumLists(res.album));
                if (res.album.images.length > 0) {
                    setImage(res.album.images[0])
                }
            } else {
                dispatch(showAlertBox(res));
                setTimeout(() => {
                    dispatch(closeAlertBox());
                }, 1000);
                props.navigate(-1);
            }
            setLoading(false)
        })
    }

    React.useEffect(() => {
        const findIndex = Album.find((visited => visited.album.album_id === props.useParams.id))
        if (findIndex) {
            setAlbum(findIndex)
        }
    }, [Album])

    React.useEffect(() => {
        setHeight(MediaDivContainer.current.offsetHeight);
        window.addEventListener('resize', () => {
            if (MediaDivContainer.current) {
                setHeight(MediaDivContainer.current.offsetHeight);
            }
        })
    }, []);

    React.useEffect(() => {
        if (height > 0 && Image) {
            setImagewidth((height * Image.media_width) / Image.media_height)
        }
    }, [height])
    React.useEffect(() => {
        if (height > 0 && Image) {
            setImagewidth((height * Image.media_width) / Image.media_height)
        }
    }, [Image])

    const onComment = (text) => {
        let fakeID = Math.floor((Math.random() * 10000000000000000000) + 1);
        const comment = {
            "response_content": insertText(trim(text)), "discussion_id": album?.album_id,
            "response_id": fakeID, "author_id": store.Util?.min_user_content.user_id, "author_name": store.Util?.min_user_content.first_name,
            "author_username": store.Util?.min_user_content.username, "author_avatar": store.Util?.min_user_content.avatar, "process": true,
            'posted_date': 'maintenant', type: 'album_media'
        }
        dispatch(singleAlbumActions({ album_id: album?.album.album_id, action: 'NEW_COMMENT', comment: comment }));
        let formData = new FormData();
        formData.append('element_id', album?.album?.album_id)
        formData.append('comment_content', text)
        formData.append('type', 'album')
        formData.append('fakeID', fakeID)
        formData.append('author_id', album?.album?.author_id)
        formData.append('url', 'RESTAPI/comments/new')
        formData.append('parent_id', album?.album?.album_id)
        formData.append('reply', 0);
        fetch('/api', formData, res => {
            if (res.success === 1) {
                dispatch(singleAlbumActions({ album_id: album?.album?.album_id, action: 'NEW_COMMENT', comment: res.data, fakeID: fakeID }));
            }
            dispatch(showAlertBox(res));
            setTimeout(() => {
                dispatch(closeAlertBox());
            }, 1000);

        })
    }
    const Payment = (src) => {
        const Slice = Image
        if (Image.media_type === 'video') {
        } else {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", src, true);
            xhr.responseType = "arraybuffer";
            xhr.onload = function (e) {
                // Obtain a blob: URL for the image data.
                var arrayBufferView = new Uint8Array(this.response);
                var blob = new Blob([arrayBufferView], { type: "image/jpg" });
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL(blob);
                imgRef.current.src = imageUrl
            };
            xhr.send();

        }
    }
    return <MyVerticallyCenteredModal
        show={true}
        nopadding="true"
        onHide={() => props.navigate(-1)}
        size="album"
    >
        <div className="Fdo messagerie-container" style={{ padding: 0, maxHeight: 600, minHeight: 230 }}>
            <div ref={MediaDivContainer} className="messages-text-container  RpG Fdo Aic Lns"
                style={{
                    width: imgWidth ? imgWidth : "500",
                    background: 'rgb(0,0,0)',
                    height: imgHeight ? imgHeight : '',
                    maxWidth: imgWidth ? imgWidth : ''
                }}>

                {loading || !album.images ?
                    <div className="">chargement...</div>
                    :
                    <>
                        {album.images[imageIndex - 1] &&
                            <button className="ApE fdVbn pIc p1c" onClick={() => {
                                setImageIndex(imageIndex - 1)
                                setImage(album.images[imageIndex - 1])
                            }}>
                                <div className="Fdo LCR tBo hgf">
                                    <IconPrev size={32} />
                                </div>
                            </button>
                        }
                        {Image &&
                            <>
                                <Link to={`/media?id=${Image.media_id}&type=album&element_id=${album.album.album_id}`} state={{ background: location.state ? location.state.background : location }} className='pIc StyledSignelIconContainer'>
                                    <span className="Fdo PLP">
                                        <svg className="sFc" width="18" height="18" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g><path d="M 29.922,2.618c-0.102-0.244-0.296-0.44-0.54-0.54C 29.26,2.026, 29.13,2, 29,2l-8,0 C 20.448,2, 20,2.448, 20,3 C 20,3.552, 20.448,4, 21,4l 5.586,0 L 18.292,12.292c-0.39,0.39-0.39,1.024,0,1.414c 0.39,0.39, 1.024,0.39, 1.414,0L 28,5.414L 28,11 C 28,11.552, 28.448,12, 29,12S 30,11.552, 30,11l0-8 l0,0C 30,2.87, 29.974,2.74, 29.922,2.618zM 3,20C 2.448,20, 2,20.448, 2,21l0,8 c0,0.002,0,0.002,0,0.004c0,0.13, 0.026,0.258, 0.076,0.378 c 0.048,0.118, 0.12,0.224, 0.208,0.314c 0.004,0.004, 0.004,0.008, 0.008,0.012c 0.002,0.002, 0.006,0.002, 0.008,0.006 c 0.090,0.088, 0.198,0.162, 0.316,0.21C 2.74,29.974, 2.87,30, 3,30l 8,0 C 11.552,30, 12,29.552, 12,29C 12,28.448, 11.552,28, 11,28L 5.414,28 l 8.292-8.292c 0.39-0.39, 0.39-1.024,0-1.414c-0.39-0.39-1.024-0.39-1.414,0L 4,26.586L 4,21 C 4,20.448, 3.552,20, 3,20z"></path></g></svg>
                                    </span>
                                    <span className="Fdo">Voir la photo</span>
                                </Link>
                                {Image.media_type === 'video' ?
                                    <Player ref={imgRef} video={`/watch/${Image.media}`} poster={Image.media_src} />
                                    :
                                    <img ref={imgRef} className="eximg" src={Image.media_src} />
                                }

                                {Image?.locked && !Image.deblocked_by_viewer && Image.media_type === 'image' &&
                                    <Lock />
                                }
                                {Image?.locked && !Image.deblocked_by_viewer && !Image.create_by_viewer ?
                                    <div className="Fdo aovydwv3 ApE" style={{ bottom: 10 }}>
                                        <MediaPayment media={Image} author={album.author}
                                            element={Image.media_id}
                                            media_change={Payment} session={store.Util.c_user} />
                                    </div>
                                    :
                                    null
                                }
                            </>
                        }
                        {album.images[imageIndex + 1] &&
                            <button className="ApE vbyrt pIc p1c" onClick={() => {
                                setImageIndex(imageIndex + 1)
                                setImage(album.images[imageIndex + 1])
                            }}>
                                <div className="Fdo LCR tBo hgf">
                                    <IconNext size={32} />
                                </div>
                            </button>
                        }
                    </>
                }
                {!loading && album.images && album.images.length === 0 &&
                    <div className="">Aucun contenu</div>
                }
            </div>
            <div className="Fdo albumContentRight hty ljhf n8ej3o3l p1c">
                <div className="messages-list-wrapper">
                    {loading || !album.author ?
                        <div className="Fdo  Pag vcx">
                            <div className="Fdo ELG Anv">
                                <ExploreLoading length={1} />
                            </div>
                        </div>
                        :
                        <>
                            <div className="Fdo Ert Vpe Pag vcx">
                                <div className="E6d" dangerouslySetInnerHTML={{ __html: album.album?.title }}></div>
                            </div>
                            <div className="Fdo Vpe Pag vcx">
                                <CardAuthorTemplate author={album?.author}></CardAuthorTemplate>
                            </div>
                        </>
                    }

                    <div className="conversation-list-content gslkf">
                        {!loading && album.album &&
                            <div className="vcx Kmm Pag">
                                <Suspense fallback={<div>loading...</div>}>
                                    <GetComment content={album?.album} />
                                </Suspense>
                            </div>
                        }
                    </div>

                    <div className="Fdo Anv">
                        <section className="ltpMr ndfg gslkf">
                            <div className="vcx Pag">
                                <div className="_7UhW9  PIoXz   Tui    MMzan    _0PwGv              fDxYl     " dangerouslySetInnerHTML={{ __html: album?.album?.date_of_creation }}></div>
                            </div>
                            {!loading && album.album &&
                                <Like element={album.album} commentLink={false} type="album" state={{ background: props.location.state.background }} />
                            }
                        </section>
                        <div className="Fdo Pag Kmm vcx">
                            <div className='Fdo vcx'>
                                <div className='Fdo Aic Hte Eho LCR _2dbep  ' style={{ marginBottom: 2, height: 36, width: 36 }}>
                                    <img data-src={`${store.Util.c_user.avatar.x56}`} className="hty ELG hrt lazyload" />
                                </div>
                            </div>
                            <Suspense fallback={<div>loading...</div>}>
                                <CommentForm onComment={onComment} />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MyVerticallyCenteredModal>
}
export default withRouter(SingleAlbum)