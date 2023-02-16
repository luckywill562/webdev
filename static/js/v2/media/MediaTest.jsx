import React, { Suspense, useRef, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyVerticallyCenteredModal from "../../Components/modal/modalCore";
import { IconNext, IconPrev, Love, Close, LoadingXlContent, InfoIcon, Icon_pause, Triangle_right, SaveAlt, Save } from '../icon/icons'
import { changeMediaVisibility, createMediaListSingle, singleMediaAction } from "../redux/MediaListView";
import { CardAuthorTemplate, CountLikes, ExploreLoading, Lock } from "../Template/Template";
import Fetch from "../util/Fetch";
import { closeAlertBox, setCount, showAlertBox } from "../redux/UtilRedux";
import { withRouter } from "../util/WithRouter";
const CommentForm = lazy(() => import("../Comments/commentForm"));
import MediaPayment from "./components/mediaPayment";
import { insertText, trim } from "../util/util";
import GetMediaComment from "./components/GetMediaComment";
import Player from "./Player";
const MediaTest = (props) => {
    const [content, setContent] = React.useState(undefined);
    const [loading, setLoading] = React.useState(false);
    const [leftLoading, setLeftLoading] = React.useState(false);
    const [author, setAuthor] = React.useState(undefined);
    const [likerLink, setLikerLink] = React.useState('');
    const mediaClosed = React.useRef();
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const onDismiss = () => {
        props.navigate(store.viewBoxHistory)
    }
    React.useEffect(() => {
        if (props.location.state && props.location.state.background) {
            dispatch(setCount(props.location.state.background.pathname))
        } else {
            dispatch(setCount(store.viewBoxHistory))
        }
        setLikerLink(props.location.pathname + '/likes' + props.location.search)
    }, []);

    const GetImage = (link) => {
        const checkList = store.MediaListView.findIndex((media => media.content.media_link === link));
        if (checkList >= 0) {
            setLeftLoading(false)
            setContent(store.MediaListView[checkList]);
            setAuthor(store.MediaListView[checkList].author)
        } else {
            setLoading(true)
            var formData = new FormData();
            formData.append('url', 'RESTAPI/media/get')
            formData.append('media_link', link)
            Fetch(`${link}`, formData, res => {
                setLoading(false);
                setLeftLoading(false)
                if (res.success === 0) {
                    props.navigate('/404');
                } else {
                    setAuthor(res.payload.author)
                    setContent(res.payload);
                    dispatch(createMediaListSingle(res.payload));
                }
            })
        }
    }

    React.useEffect(() => {
        setLeftLoading(true);
        GetImage(props.location.pathname + props.location.search);
    }, [props.location.search])

    const loadImage = (next) => {
        GetImage(next)
        history.pushState(null, 'index', next);
        const link = next.split('?');
        const likerListLink = link[0] + '/likes?' + link[1]
        setLikerLink(likerListLink)
    }
    React.useEffect(() => {
        if (content) {
            const checkList = store.MediaListView.findIndex((media => media.content.media_id === content.content.media_id));
            if (checkList >= 0) {
                setContent(store.MediaListView[checkList]);
            }
        }
    }, [store.MediaListView])


    const Payment = (src) => {
        if (content.content.media_type === 'video') {
            dispatch(changeMediaVisibility(content.content.media_id));
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
                mediaClosed.current.src = imageUrl
                dispatch(changeMediaVisibility(content.content.media_id));
            };
            xhr.send();

        }
    }

    const onComment = (text) => {
        if (text.length > 0) {
            let fakeID = Math.floor((Math.random() * 10000000000000000000) + 1);
            const comment = {
                "response_content": insertText(trim(text)), "discussion_id": content.content.media_id,
                "response_id": fakeID, "author_id": author.user_id, "author_name": author.first_name,
                "author_username": author.username, "author_avatar": store.Util.c_user.avatar.x56, "process": true,
                'posted_date': 'maintenant', type: content.content.content_type
            }
            dispatch(singleMediaAction({ content, comment, action: 'push_comment' }));
            var formData = new FormData();
            formData.append('element_id', content?.content?.media_id)
            formData.append('comment_content', text)
            formData.append('type', content?.content?.content_type + '_media')
            formData.append('fakeID', fakeID)
            formData.append('author_id', content?.author?.user_id)
            formData.append('url', 'RESTAPI/comments/new')
            formData.append('parent_id', content?.content?.media_id)
            formData.append('reply', 0);

            Fetch('/api', formData, res => {
                if (res.success === 1) {
                    dispatch(singleMediaAction({ content, comment: res?.data, action: 'confirm_added', fakeID }));
                }
                dispatch(showAlertBox(res))
                setTimeout(() => {
                    dispatch(closeAlertBox(res));
                }, 1000);
            })
        }

    }
    const Like = () => {
        if (content?.content?.liked_by_viewer == true) {
            var action = 'UNLIKE';
        } else {
            var action = 'LIKE';
        }
        dispatch(singleMediaAction({ 'content': content, action: 'reaction' }));
        var formData = new FormData();
        const params = { 'element_id': content?.content?.media_id, 'author_id': content?.author?.user_id, 'action': action, 'element_type': 'media' }
        formData.append('url', 'RESTAPI/Likes/Like')
        formData.append('params', JSON.stringify(params));
        Fetch('/api', formData, (data) => {
            dispatch(singleMediaAction({ 'content': content, action: 'reaction', 'likes': data.likes }));
            dispatch(showAlertBox(data))
            setTimeout(() => {
                dispatch(closeAlertBox());
            }, 2000);
        })
    }
    const SavePic = () => {
        if (content?.content?.saved_by_viewer == true) {
            var action = 'unsave';
        } else {
            var action = 'save';
        }
        dispatch(singleMediaAction({ 'content': content, action: 'save' }));
        var formData = new FormData();
        formData.append('action', action)
        formData.append('url', 'RESTAPI/media/save')
        formData.append('media_id', content?.content?.media_id)
        formData.append('type', content?.content?.content_type)
        Fetch('/api', formData, (data) => {
            if (data.success === 0) {
                dispatch(singleMediaAction({ 'content': content, action: 'saved' }));
            }
            dispatch(showAlertBox(data))
            setTimeout(() => {
                dispatch(closeAlertBox());
            }, 2000);
        })
    }
    return <MyVerticallyCenteredModal
        show={true}
        onHide={() => props.navigate(-1)}
        size="sm"
        nopadding="true"
    >

                <div className="Dapi">
                    <div className="Fdo  messages-wrapper" style={{ borderRadius: 0, }}>
                        <button className='StyledCloseIconContainer' onClick={onDismiss}>
                            <Close size={36} />
                        </button>

                        <div className="Fdo Aic Bsj">
                            <div className="messages-text-container  RpG Fdo Aic Lns" style={{ background: 'rgb(0,0,0)' }}>
                                {content &&
                                    <div className="DivBlurBackground" style={{ backgroundImage: `url(${content.content.media_src})` }}></div>
                                }
                                <button className='pIc StyledSignelIconContainer' onClick={onDismiss}>
                                    <span className="Fdo PLP">
                                        <InfoIcon size={20} />
                                    </span>
                                    <span className="Fdo">Signaler</span>
                                </button>
                                {loading || !content ?
                                    <LoadingXlContent />
                                    :
                                    <>
                                        {content.content.prev &&
                                            <button className="ApE fdVbn pIc p1c" onClick={() => loadImage(content.content.prev)}>
                                                <div className="Fdo LCR tBo hgf">
                                                    <IconPrev size={42} />
                                                </div>
                                            </button>
                                        }
                                        {content?.content?.media_type === 'video' ?
                                            <Player video={`/watch/${content?.content?.media}`} poster={content?.content?.media_src} />
                                            :
                                            <img className="eximg" ref={mediaClosed} src={`${content?.content?.media_src}`} />
                                        }
                                        {content?.content?.blocked && !content?.content?.viewer_can_see && content?.content?.media_type === 'image' &&
                                            <Lock />
                                        }
                                        {content?.content?.next &&
                                            <button className="ApE vbyrt pIc p1c" onClick={() => loadImage(content?.content?.next)}>
                                                <div className="Fdo LCR tBo hgf">
                                                    <IconNext size={42} />
                                                </div>
                                            </button>
                                        }
                                        {content?.content?.blocked && !content?.content?.viewer_can_see ?
                                            <div className="Fdo aovydwv3 ApE" style={{ bottom: 10 }}>
                                                <MediaPayment media={content?.content} author={content?.author}
                                                    element={content?.content?.media_id} text={true}
                                                    media_change={Payment} session={store.Util.c_user} />
                                            </div>
                                            :
                                            null
                                        }
                                    </>
                                }

                            </div>
                            <div className="Fdo box-overlay hty ljhf n8ej3o3l p1c">
                                <div className="messages-list-wrapper">
                                    {leftLoading || !author ?
                                        <div className="Fdo Kmm Pag vcx">
                                            <div className="Fdo ELG Anv">
                                                <ExploreLoading length={1} />
                                            </div>
                                        </div>
                                        :
                                        <div className="Fdo Kmm Vnk Pag vcx">
                                            <CardAuthorTemplate author={author}>

                                            </CardAuthorTemplate>
                                        </div>

                                    }
                                    {loading || !content ?
                                        null
                                        :
                                        <>
                                            <div className="conversation-list-content gslkf">
                                                <div className="Fdo Anv">
                                                    <div className="Fdo Vnk Pag vcx Anv">
                                                        {content?.content?.blocked && content?.content?.create_by_viewer ?
                                                            <div className="Fdo Ngt G7mk bi6gxh9e" >
                                                                <div className="E6d Fdo Ert Vpe Lsy LDv">
                                                                    <div className="cgat1ltu">
                                                                        <InfoIcon size={20} />
                                                                    </div>
                                                                    <div className="">ce contenu est bloqué mais vous le voyez car vous êtes l'auteur, seuls vous, vos abonnés premium ou les personnes qui ont payé peuvent voir ceci</div>
                                                                </div>
                                                            </div>
                                                            :
                                                            <></>
                                                        }
                                                        {content?.content?.blocked && content?.content?.viewer_can_see && !content?.content?.create_by_viewer &&
                                                            <div className="Fdo Ngt G7mk bi6gxh9e">
                                                                <div className="E6d Fdo Ert Vpe Lsy LDv">
                                                                    <div className="cgat1ltu">
                                                                        <InfoIcon size={20} />
                                                                    </div>
                                                                    <div className="">Ce contenu est bloqué mais vous le voyez car vous êtes abonnés premium ou vous avez debloqué le contenu</div>
                                                                </div>
                                                            </div>
                                                        }
                                                        <div className="Fdo">
                                                            <span className="Data-description-container SMy" dangerouslySetInnerHTML={{ __html: content?.content?.description }}></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="vcx Kmm Pag">
                                                    <GetMediaComment content={content} />
                                                </div>
                                            </div>
                                            <div className="Fdo Anv">
                                                <section className="ltpMr ndfg gslkf Pag vcx">
                                                    <div className='Fdo'>
                                                        <span className='_7UhW9  PIoXz   Tui Ert    MMzan    _0PwGv   fDxYl     '>{content?.content?.date}</span>
                                                    </div>
                                                    <div className="Fdo Aic Cdf">
                                                        <div className="card-action Fdo ELG Cdf Aic Pac">
                                                            <span className="PaN klpyt">
                                                                <button onClick={Like} className={content?.content?.liked_by_viewer ? "post-action unfavourite-button" : "post-action favourite-button"}>
                                                                    {content?.content?.liked_by_viewer ?
                                                                        <span className="hbc">
                                                                            <Love size={24} />
                                                                        </span>
                                                                        :
                                                                        <svg className="sFc" width={24} height={24} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g><path d="M 31.984,13.834C 31.9,8.926, 27.918,4.552, 23,4.552c-2.844,0-5.35,1.488-7,3.672 C 14.35,6.040, 11.844,4.552, 9,4.552c-4.918,0-8.9,4.374-8.984,9.282L0,13.834 c0,0.030, 0.006,0.058, 0.006,0.088 C 0.006,13.944,0,13.966,0,13.99c0,0.138, 0.034,0.242, 0.040,0.374C 0.48,26.872, 15.874,32, 15.874,32s 15.62-5.122, 16.082-17.616 C 31.964,14.244, 32,14.134, 32,13.99c0-0.024-0.006-0.046-0.006-0.068C 31.994,13.89, 32,13.864, 32,13.834L 31.984,13.834 z M 29.958,14.31 c-0.354,9.6-11.316,14.48-14.080,15.558c-2.74-1.080-13.502-5.938-13.84-15.596C 2.034,14.172, 2.024,14.080, 2.010,13.98 c 0.002-0.036, 0.004-0.074, 0.006-0.112C 2.084,9.902, 5.282,6.552, 9,6.552c 2.052,0, 4.022,1.048, 5.404,2.878 C 14.782,9.93, 15.372,10.224, 16,10.224s 1.218-0.294, 1.596-0.794C 18.978,7.6, 20.948,6.552, 23,6.552c 3.718,0, 6.916,3.35, 6.984,7.316 c0,0.038, 0.002,0.076, 0.006,0.114C 29.976,14.080, 29.964,14.184, 29.958,14.31z"></path></g></svg>
                                                                    }
                                                                </button>
                                                            </span>
                                                            <button className='post-action Comment-button' >
                                                                <svg className="sFc" width={24} height={24} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g><path d="M 1.898,29.382c 0.164,0.352, 0.518,0.576, 0.906,0.576c 2.87,0, 5.298-0.698, 8.056-2.324 C 12.198,27.846, 14.84,28.108, 16,28.108c 8.756,0, 15.878-5.846, 15.878-13.034S 24.756,2.042, 16,2.042S 0.122,7.886, 0.122,15.074 c0,3.388, 1.634,6.662, 4.51,9.088c-0.652,1.48-1.522,2.876-2.594,4.154C 1.79,28.616, 1.734,29.032, 1.898,29.382z M 2.122,15.074 c0-6.084, 6.226-11.034, 13.878-11.034s 13.878,4.95, 13.878,11.034S 23.652,26.108, 16,26.108c-1.148,0-4.136-0.308-5.146-0.504 c-0.244-0.044-0.498,0.002-0.71,0.128C 8.28,26.872, 6.654,27.524, 4.914,27.8c 0.75-1.136, 1.374-2.336, 1.86-3.586 c 0.162-0.418, 0.030-0.89-0.328-1.16C 3.656,20.942, 2.122,18.106, 2.122,15.074z"></path></g></svg>
                                                            </button>
                                                            <button className="post-action save-button" onClick={SavePic}>
                                                                {content?.content?.saved_by_viewer ?
                                                                    <Save size={21} />
                                                                    :
                                                                    <SaveAlt size={21} />
                                                                }
                                                            </button>
                                                        </div>
                                                        <div className="Pag">
                                                            <span className="mWe Pag">{content?.content?.count_comments} commentaires</span>
                                                        </div>
                                                    </div>
                                                </section>
                                                <CountLikes media={content?.content} to={`/likes/media/${content?.content?.media_id}`} state={{ background: props.location.state ? props.location.state.background : props.location }} />
                                                <div className="Fdo  pybr56ya tw6a2znq f10w8fjw vcx">
                                                    <div className='Fdo vcx'>
                                                        <div className='Fdo Aic Hte Eho LCR _2dbep  ' style={{ marginBottom: 2, height: 36, width: 36 }}>
                                                            <img data-src={`${store?.Util?.c_user?.avatar?.x56}`} className="hty ELG hrt lazyload" />
                                                        </div>
                                                    </div>
                                                    <Suspense fallback="loading">
                                                        <CommentForm onComment={onComment} />
                                                    </Suspense>
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </MyVerticallyCenteredModal >
}
export default withRouter(MediaTest);


