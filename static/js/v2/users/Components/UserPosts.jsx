import React from "react";
import { withRouter } from "../../util/WithRouter";
import fetch from "../../util/fetch";
import { BtnPlusContent, LoadingXlContent, PrivateIcon } from "../../icon/icons";
import { Link } from "react-router-dom";
import { Lock, VideoPlayIcon } from "../../Template/Template";
class UserPosts extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            prevY: 0,
            limit: 20,
            loading: false,
            plus: false,
            next: true,
        }
    }
    componentDidMount() {

        if (this.props.profile.content.posts.length === 0) {
            this.getUserPost(this.state.page, this.props.profile.user_id, this.state.limit);
        }

        var options = {
            root: null,
            rootMargin: "350px",
            threshold: 1.0
        };

        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options,
        );
        this.observer.observe(this.loadingRef);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.useParams.id !== prevProps.useParams.id) {
            this.setState({ plus: this.props.profile.content.media_last });
        }
    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
            this.plusBtn();
        }
        this.setState({ prevY: y });
    }

    getUserPost = (page, user_id, limit) => {
        this.setState({ loading: true });
        var formData = new FormData();
        formData.append('url', '/RESTAPI/Users/Posts')
        formData.append('profile_id', user_id);
        formData.append('page', page)
        formData.append('limit', limit)
        fetch('/api', formData,
            (res) => {
                this.props.profileUpdate(res.message.posts);
                this.setState({ loading: false });
            }
        )
    }

    plusBtn = () => {
        const entries = this.props.profile.content.media;
        const lastPhoto = entries[this.props.profile.content.media.length - 1];
        if (this.props.profile.content.media.length > 0) {
            var curPage = lastPhoto.id;
        } else {
            var curPage = 0;
        }
        if (!this.state.plus && !this.state.loading) {
            this.getUserPost(curPage, this.props.useParams.id, this.state.limit);
            this.setState({ page: curPage });
        }
    }

    fakeGrid = () => {
        let row = [];
        for (let i = 0; i < 5; i++) {
            row.push(
                <div className="photo-gri" key={i}> </div>
            )
        }
        return row;
    }
    render() {
        return (
            <div className="aBv Ba2 g4R Nxz">
                {this.props.profile.content.posts.length > 0 ?
                    <div className="Fdo Cdf kzZ" style={{ margin: "-4px" }}>
                        {this.props.profile.content.posts.map((e, index) => (
                            <div className="posts-grid" key={index}>
                                <div className="photo-wrapper Eho BjN Ngt">
                                    <div className="Fdo Anv Dfv PSb Aic Lns">
                                        <Link className="Fdo Aic Lns profile-card hty ELG" to={`/post/${e.post_id}`} state={{ background: this.props.location }} >
                                            {e.media.media_src && e.media.has_media &&
                                                <div className="photo-container ApE">
                                                    <img data-src={e.media.media_src} className="lazyload" />
                                                </div>
                                            }
                                            {e.post_content.length > 0 && e.media.media_src &&
                                                <div className="photo-container ApE Dbf"></div>
                                            }
                                            <div className="Fdo Pag Vnk Kmm vcx p1c">
                                                <div className="Data-description-container SMy e2ler v2ao" style={{textAlign: "center"}} dangerouslySetInnerHTML={{ __html: e.post_content }}></div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <this.fakeGrid />
                    </div>
                    :
                    <>
                        {!this.state.loading &&
                            <div className="gtb  Pag Vnk Kmm vcx">
                                <h3>L'utilisateur n'a pas de publications</h3>
                            </div>
                        }
                    </>
                }
                <div ref={loadingRef => (this.loadingRef = loadingRef)}>
                    {this.state.loading &&
                        <LoadingXlContent />
                    }
                    {!this.state.loading && this.state.plus && !this.props.profile.content.media_last &&
                        <BtnPlusContent onclick={this.plusBtn} />
                    }
                </div>
            </div>
        )
    }
}
export default withRouter(UserPosts);