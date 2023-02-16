import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Lock, VideoPlayIcon } from '../../Template/Template'
import { withRouter } from '../../util/WithRouter'
class GridOneMedia extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            media: props.media,
            card_width: props.card_width
        }
    }
    componentDidMount() {
    }

    render() {
        const media = this.state.media[0]
        const card = this.props.card_width
        const calculHeight = card * media.media_height / media.media_width
        const styleHeight = { height: calculHeight }
        return (
            <>
                {!media.exist &&
                    <div className="sbh">
                        <div className="Pap E6d LPN Aic">
                            <span>
                                <svg className="Sfc" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                            </span>
                            <span className="LmP">Ce contenu n\'est plus disponible</span>
                        </div>
                        <p className="Pap">Le proprietaire a peut etre supprimer le contenu ou modifier la visibilite</p>
                    </div>
                }
                <div>
                    {media && media.exist && (
                        <div className="item-grid" style={styleHeight}>
                            <div className="Media-container">
                                <div className='messages-text-container RpG Fdo Aic Lns'>
                                    <MediaLink type={this.props.type} post_id={this.props.post_id} media_id={media.media_id}>
                                        <Locked locked={media.locked} />
                                        {media.media_type && media.media_type === 'video' ?
                                        <>
                                            <div className="Fdo ApE hty ELG Aic Lns">
                                                <VideoPlayIcon />
                                            </div>
                                            <img className="lazyload" style={{height: '100%'}} data-src={media.media_src} />
                                        </>
                                        :
                                        <img className="ELG lazyload" data-src={media.media_src} />
                                        }
                                    </MediaLink>
                                </div>
                            </div>
                        </div>
                    )
                    }
                </div>
            </>
        )
    }
}

class GridtwoMedia extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            media: props.media,
            card_width: props.card_width
        }
    }

    componentDidMount() {
        this.setState({ card_width: 500 })
    }

    render() {
        const media1 = this.state.media[0]
        const media2 = this.state.media[1]
        const card = this.state.card_width
        const media1autoHeight = card / 2 - 2 * media1.media_height / media1.media_width
        const media2autoHeight = card / 2 - 2 * media2.media_height / media1.media_width
        if (media1.media_height > media2.media_height) {
            var mediaContainerStyle = { "height": media1autoHeight }
        } else {
            var mediaContainerStyle = { "height": media2autoHeight }
        }
        return (
            <div className="Media-container" style={mediaContainerStyle}>
                <div className="post-media-grid Post-media-Double" style={mediaContainerStyle}>
                    <MediaLink type={this.props.type} post_id={this.props.post_id} media_id={media1.media_id}>
                        <img className="img-scale" src={media1.media_src} />
                    </MediaLink>
                </div>
                <div className="post-media-grid Post-media-Double" style={mediaContainerStyle}>
                    <MediaLink type={this.props.type} post_id={this.props.post_id} media_id={media2.media_id}>
                        <img className="img-scale" src={media2.media_src} />
                    </MediaLink>
                </div>
            </div>
        )
    }
}

class Mediagrid extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            media: props.media,
            media_count: props.media_count,
            card_width: 502
        }
    }

    handleObserver(entities, observer) {
        const width = entities[0].boundingClientRect.width;
        this.setState({ card_width: width });
    }

    componentDidMount() {
        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this)
        );
        this.observer.observe(this.cardWidth);
        window.addEventListener("resize", (e) => {
            this.observer = new IntersectionObserver(
                this.handleObserver.bind(this)
            );
        })
    }

    render() {
        return (
            <div className="Post-media btb Pbggc  bwt" ref={cardWidth => (this.cardWidth = cardWidth)}>
                {this.state.media_count === 1 ?
                    <GridOneMedia type={this.props.type} media={this.state.media} card_width={this.state.card_width} post_id={this.props.post_id} />
                    : this.state.media_count === 2 ?
                        <GridtwoMedia type={this.props.type} media={this.state.media} card_width={this.state.card_width} post_id={this.props.post_id} />
                        :
                        null
                }
            </div>
        )
    }
}
function MediaLink({ media_id, children, post_id, type }) {
    const location = useLocation();
    return (
        <Link className='ELG Aic Lns Fdo' to={`/media?id=${media_id}&type=${type}&element_id=${post_id}`} state={{ background: location.state ? location.state.background : location }} style={{ position: 'absolute', top: 0, bottom: 0 }}>
            {children}
        </Link>
    )
}

function Locked({ locked }) {
    if (locked) {
        return <Lock />
    } else {
        return null
    }
}
export default withRouter(Mediagrid)