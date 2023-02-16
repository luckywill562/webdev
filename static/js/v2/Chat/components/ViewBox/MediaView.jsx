import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import Fetch from '../../../util/Fetch';
import { withRouter } from '../../../util/WithRouter';
import { Spinner } from 'react-bootstrap';
import { IconNext, IconPrev, Close } from '../../../icon/icons';
import MyVerticallyCenteredModal from '../../../../Components/modal/modalCore';
import { setCount, showAlertBox } from '../../../redux/UtilRedux';
import { useDispatch, useSelector } from 'react-redux';
const MediaView = (props) => {
    const [content, setContent] = React.useState(undefined);
    const dispatch = useDispatch();
    React.useEffect(() => {
        GetMedia(props.location.pathname + props.location.search);
    }, [props.location.search]);
    const store = useSelector((state) => state);
    const onDismiss = () => {
        props.navigate(store.viewBoxHistory)
    }
    React.useEffect(() => {
        if (props.location.state) {
            dispatch(setCount(props.location.state.mediachat.pathname))
        }
    }, []);
    const GetMedia = (url) => {
        var data = new FormData();
        data.append('url', 'RESTAPI/Chat/viewBox')
        Fetch(url, data, res => {
            if (res.success === 1) {
                setContent(res?.payload?.media)
            }else{
                dispatch(showAlertBox(res))
            }
        })
    }
    return <MyVerticallyCenteredModal
        show={true}
        onHide={() => props.navigate(-1)}
        size="sm"
        nopadding="true"
    >
        <div className='Dapi'>
            <div className="Fdo  messages-wrapper" style={{ borderRadius: 0, }}>
                <button className='StyledCloseIconContainer' onClick={onDismiss}>
                    <Close size={36} />
                </button>

                <div className="Fdo Aic Bsj">
                    <div className="messages-text-container  RpG Fdo Aic Lns" style={{ background: 'rgb(0,0,0)' }}>
                        {content &&
                            <>
                                <div className="DivBlurBackground" style={{ backgroundImage: `url(${content.media_src})` }}></div>
                                {content.media_type === 'video' ?
                                    <video className="eximg" src={content.media_src} controls></video>
                                    :
                                    <img className="eximg" src={content.media_src} />
                                }
                            </>
                        }

                    </div>
                </div>
            </div>
        </div>
    </MyVerticallyCenteredModal>
}
class MediaVie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: undefined,
            medias: [],
            media: undefined,
            media_next: undefined,
            media_prev: undefined,
            boxHistory: 1,
            boxLoading: true,
            Post_author: [],
            user_post: [],
        }
    }
    onDismiss = () => {
        const count = this.state.boxHistory;
        this.props.navigate(-this.state.boxHistory);
    }
    countHistory = () => {
        this.setState({ boxHistory: this.state.boxHistory + 1 });
    }
    componentDidMount() {
        console.log(this.props)
        var data = new FormData();
        data.append('message_id', this.props.useParams.message_id)
        data.append('url', 'RESTAPI/Chat/viewBox')
        Fetch(props.location.pathname + props.location.search, data,
            res => {
                this.setState({ medias: res.posts.media, boxLoading: false });
                if (this.state.medias.length > 0) {
                    this.GetImage();
                }
            })
    }

    GetImage = () => {
        if (this.state.medias) {
            const list = this.state.medias.slice()
            const image = list.find((list) => list.media_id === this.props.useParams.media_id);
            this.setState({ media: image });
            const objIndex = list.findIndex((list => list.media_id === this.props.useParams.media_id));
            const next = list[objIndex + 1];
            const prev = list[objIndex - 1]
            if (next) {
                const media_next = next.media_id
                this.setState({ media_next: media_next });
            } else {
                this.setState({ media_next: undefined });
            }
            if (prev) {
                const media_prev = prev.media_id;
                this.setState({ media_prev: media_prev })
            } else {
                this.setState({ media_prev: undefined });
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (+this.props.useParams.media_id != +prevProps.useParams.media_id) {
            this.GetImage();
            var count = this.state.boxHistory + 1;
            this.setState({ boxHistory: count });
            console.log(this.state.boxHistory);
        }
    }

    onDismiss = () => {
        this.props.navigate(-1)
    }
    render() {
        const media = this.state.media;
        const author = this.state.Post_author;
        return (
            <MyVerticallyCenteredModal
                show={true}
                onHide={() => this.props.navigate(-1)}
                size="sm"
                nopadding="true"
            >
                <div className='Dapi'>
                    <div className="Fdo  messages-wrapper" style={{ borderRadius: 0, background: 'rgb(0,0,0)' }}>
                        <div className="Fdo ApE p1c">
                            <div className="wGH Vnk">
                                <button className='pIc' onClick={this.onDismiss}>
                                    <span className="Fdo LCR tBo hgf">
                                        <Close size={36} />
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="Fdo Aic Bsj">
                            <div className="messages-text-container  RpG Fdo Aic Lns">
                                {this.state.boxLoading ?
                                    <div className='Fdo RpG App Flk Aic Lns' style={{ alignContent: 'center' }}>
                                        <Spinner animation="border" />
                                        <h2>Chargement...</h2>
                                    </div>
                                    :
                                    <>
                                        {this.state.media &&
                                            <>
                                                {media.media_type === 'video' ?
                                                    <video className='k4urcfbm bixrwtb6 datstx6m Fdo' src={media.media_src} controls></video>
                                                    :
                                                    <img className='k4urcfbm bixrwtb6 datstx6m Fdo' src={media.media_src} />
                                                }
                                            </>
                                        }
                                        <div className='Fdo RpG App Flk Aic'>
                                            {this.state.media_prev && (
                                                <MediaLink client_id={this.props.useParams.id} post_id={this.props.useParams.message_id} media_id={this.state.media_prev}>
                                                    <div className="brt hgf">
                                                        <IconPrev size={42} />
                                                    </div>
                                                </MediaLink>
                                            )}

                                            {this.state.media_next && (
                                                <MediaLink post_id={this.props.useParams.message_id} client_id={this.props.useParams.id} media_id={this.state.media_next}>
                                                    <div className="brt hgf">
                                                        <IconNext size={42} />
                                                    </div>
                                                </MediaLink>
                                            )}
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </MyVerticallyCenteredModal >
        );
    }
}
export default withRouter(MediaView)

function MediaLink({ media_id, children, post_id, client_id }) {
    const location = useLocation();

    return (
        <Link to={`/inbox/${client_id}/${post_id}/media/${media_id}`}>
            {children}
        </Link>
    )
}