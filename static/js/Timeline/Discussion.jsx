import React from 'react';
import '../../css/discussion.css';
import fetch from '../util/async';
import { Link } from 'react-router-dom';
import Loading from '../Components/app/loading'
import ModalComment from '../Components/modal/modalComment'
import Button from '../Components/button/button'
import Media from '../Components/media/media_grid'
import ModalPost from '../Components/modal/modalPost';
export default class Discussion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            url: './discussion',
            likerror: false,
            postLimit: 10,
            postLoading: false,
            plus: [],
            response: [],
            comment_value: '',
            post_value: '',
            loadingPostComment: false
        }
    }

    componentDidMount() {
        __photo__upload__ = new Array();
        this.setState({ postLoading: true })
        var formData = new FormData();
        formData.append('limit', this.state.postLimit)
        formData.append('url', this.state.url)
        fetch(this.state.url, formData,
            data => {
                if (data.success === 1) {
                    this.setState({ posts: data.posts })
                    this.setState({ plus: data.posts })
                    this.setState({ postLoading: false })
                    this.getComment()
                } else {
                    window.location.href = "/";
                }

            }
        )
    }


    morePostResult = async () => {
        this.setState({ postLoading: true })
        const idfetched = this.state.posts;
        let id = idfetched.map(e => {
            return e.post_id
        })
        const newpostslist = this.state.posts.slice()
        var formData = new FormData();
        formData.append('limit', this.state.postLimit)
        formData.append('url', this.state.url)
        formData.append('idlist', id)
        fetch(this.state.url, formData,
            (data) => {
                if (data.success === 1) {
                    data.posts.map(e => {
                        newpostslist.push(e)
                    })
                    this.setState({ posts: newpostslist })
                    this.setState({ postLoading: false })
                    this.setState({ plus: data.posts })
                    if (data.posts == '' || data.posts.length < this.state.postLimit) {
                        this.setState({ plus: [] })
                    }
                    this.getComment()
                } else if (data.success === 0) {
                    window.location.href = "/";
                }
            }
        )

    }
    onLiked = async (id) => {
        const posts = this.state.posts.slice()
        const objIndex = posts.findIndex((posts => posts.post_id === id));
        if (posts[objIndex].post_status == true) {
            posts[objIndex].post_status = false
            posts[objIndex].like_counter -= 1
            var action = 'unlike';
        } else {
            posts[objIndex].post_status = true
            posts[objIndex].like_counter = + 1;
            var action = 'like';
        }
        this.setState({ posts: posts })
        var formData = new FormData();
        formData.append('action', action)
        formData.append('url', 'RESTAPI/PostReaction')
        formData.append('post_id', id)

        fetch('/api', formData,
            (data) => {
                if (data.success === 0) {
                    window.location.href = "/";
                }
            }
        )
    }

    closeAlert = () => {
        this.setState({ likeerror: false });
    }

    getComment = async () => {
        let post_id = this.state.posts.map(e => e.post_id)
        var formData = new FormData();
        formData.append('url', 'RESTAPI/views/getComments')
        formData.append('post_id', post_id)
        fetch('/api', formData,
            (data) => {
                if (data.success === 1) {
                    this.setState({ response: data.response });
                }
            }
        )
    }

    HandleChange = (e) => {
        const name = e.target.name;
        this.setState({ [name]: e.target.value })
    }
    PostComment = async (post_id) => {
        this.setState({ loadingPostComment: true });
        const lastcomment = this.state.response.slice()
        var formData = new FormData();
        formData.append('post_id', post_id)
        formData.append('comment_content', this.state.comment_value)
        formData.append('url', 'RESTAPI/PostComment')
        fetch('/api', formData,
            res => {
                if (res.success === 1) {
                    lastcomment.push(res.reponse)
                    this.setState({ response: lastcomment });
                    this.setState({ loadingPostComment: false })
                }
            })
    }

    commentShow({ comment, post }) {
        if (comment.discussion_id === post) {
            return (
                <div className="comment-box">
                    <div className="Fdo">
                        <div className="Fdo ELG">
                            <div className="Fdo">
                                <Link to={`/people/${comment.author_id}`} className="Post-Author-Identity--Avatar Fdo Rvt">
                                    <img src={comment.author_avatar} alt={comment.author_name} />
                                </Link>
                            </div>
                            <div className="Fdo ELG">
                                <div className="Fdo">
                                    <div className="Fdo">
                                        <div className="Fdo GHT">
                                            <div className="KHv">
                                                <div className="GTJ">
                                                    <Link to={`/people/${comment.author_id}`} className="profil-name">
                                                        <strong>{comment.author_name} </strong>
                                                    </Link>
                                                    <span dangerouslySetInnerHTML={{ __html: comment.response_content }}></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
    PostPhotoPreview = (e) => {
        $(this).PreviewFunctionUploadPhoto();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        $(this).createPost(this.state.post_value)
    }
    render() {
        const previewStyle = { display: "none" };
        const likeErrorTextCSS = { display: this.state.likeerror ? "block" : "none" };
        const loadingTextCSS = { display: this.state.postLoading ? "flex" : "none" };
        const btnplusStyle = { display: this.state.postLoading || this.state.plus.length == 0 ? "none" : "block" }
        return (
            <>
                <div className="profile-container nF1">
                    <div className="default-container">
                        <div className="alert error alert-warning alert-dismissible fade show" style={likeErrorTextCSS} role="alert">
                            <strong>dam!</strong> une erreur s'est produite
                            <button type="button" className="close" onClick={this.closeAlert}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="create-post N8tH">
                            <ModalPost>
                                <div className="Fdo Anv">
                                    <form method="POST" className="PostFormData" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                                        <div className="Fdo">
                                            <div className="">
                                                <textarea onChange={this.HandleChange} name="post_value" value={this.state.post_value}></textarea>
                                            </div>
                                        </div>
                                        <div className="LPN xcv L4E zI7 iyn Hsu Aic E6d" >
                                            <div className="LPN L4E">
                                                <span className="vx-z">
                                                    <div className="bt-open">
                                                        <div className="text-box-open">
                                                            <a href="#" className="pBj">
                                                                <div className="bBB RpG pIc RlF">
                                                                    <span className="js-add-pic-icon">
                                                                        <svg width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#45bd62"><g><path d="M 17,2C 8.716,2, 2,8.716, 2,17S 8.716,32, 17,32S 32,25.284, 32,17S 25.284,2, 17,2z M 23.708,15.708 c-0.39,0.39-1.024,0.39-1.414,0L 18,11.414L 18,27 C 18,27.552, 17.552,28, 17,28S 16,27.552, 16,27L 16,11.414 L 11.708,15.708 c-0.39,0.39-1.024,0.39-1.414,0c-0.39-0.39-0.39-1.024,0-1.414l 6-6C 16.296,8.29, 16.298,8.29, 16.3,8.288 c 0.090-0.088, 0.198-0.162, 0.316-0.21c 0.244-0.102, 0.52-0.102, 0.764,0C 17.504,8.128, 17.614,8.2, 17.708,8.292l 6,6 C 24.098,14.684, 24.098,15.316, 23.708,15.708z"></path></g></svg>
                                                                    </span>
                                                                    <div className="photo-text-open">
                                                                        Photos
                                                                    </div>
                                                                </div>
                                                                <div className="input-file-open">
                                                                    <input type="file" multiple="1" onChange={this.PostPhotoPreview} className="fn_3" />
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="upload-view pbD" style={previewStyle}>
                                            <div className="preview-container LPN"></div>
                                        </div>
                                        <div className="Fdo">
                                            <Button variant="primaire" type="submit" >Publier</Button>
                                        </div>
                                    </form>
                                </div>
                            </ModalPost>
                        </div>
                        {this.state.posts.map(e => (
                            <div className="post-card" key={e.post_id}>
                                <div className="card-top">
                                    <div className="card-user-identity">
                                        <div className="profil-picture">
                                            <img src={e.author_avatar} className="hty ELG hrt" alt={e.author_name} />
                                        </div>
                                        <div className="profil-identity">
                                            <Link to={`/${e.username}`} className="profil-name">
                                                <div >{e.post_author}</div>
                                            </Link>
                                            <div className="profil-username">@Devbutants</div>
                                        </div>
                                        <div className="card-settings">
                                            <i className="arrow_carrot-down">
                                                <svg width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g><path d="M 22.782,13.8L 17,19.582L 11.218,13.8c-0.39-0.39-1.024-0.39-1.414,0c-0.39,0.39-0.39,1.024,0,1.414 l 6.486,6.486c 0.196,0.196, 0.454,0.294, 0.71,0.292c 0.258,0, 0.514-0.096, 0.71-0.292l 6.486-6.486c 0.39-0.39, 0.39-1.024,0-1.414 C 23.806,13.41, 23.172,13.41, 22.782,13.8z"></path></g></svg>
                                            </i>
                                        </div>
                                    </div>
                                    <div className="card-text">
                                        <div className="post-text" dangerouslySetInnerHTML={{ __html: e.post_content }}></div>
                                    </div>
                                </div>
                                {e.media_count > 0 ?
                                    <Media media={e.media_src} media_count={+e.media_count} />
                                    : null}
                                <div className="card-bottom">
                                    <ul className="card-action">
                                        <li className="heart-icon">
                                            <button onClick={() => this.onLiked(e.post_id)} className={e.post_status == true ? "post-action unfavourite-button" : "post-action favourite-button"}></button>
                                            <span className={e.post_status == false ? "counter" : "counter counter_colored"}>{e.like_counter}</span>
                                        </li>
                                        <li className="comment-icon">
                                            <ModalComment>
                                                <div className="Fdo Anv">
                                                    <form method="POST" onSubmit={(event) => { event.preventDefault(); this.PostComment(e.post_id) }}>
                                                        <div className="Fdo">
                                                            <div className="">
                                                                <textarea onChange={this.HandleChange} name="comment_value" value={this.state.comment_value}></textarea>
                                                            </div>
                                                        </div>
                                                        <div className="Fdo">
                                                            {this.state.loadingPostComment ?
                                                                <div className="follow-btn Dbf">
                                                                    <div className="btn-text-content iFc">Posting...</div>
                                                                </div>
                                                                :
                                                                <>
                                                                    {this.state.comment_value === '' ?
                                                                        <div className="follow-btn Dbf">
                                                                            <div className="btn-text-content iFc">Repondre</div>
                                                                        </div>
                                                                        :
                                                                        <Button variant="primaire" type="submit" >Repondre</Button>
                                                                    }
                                                                </>
                                                            }
                                                        </div>
                                                    </form>
                                                </div>
                                            </ModalComment>
                                            <span className="counter">{e.comment_counter}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="comment-content" >
                                    {this.state.response.map(comment => (
                                        <this.commentShow key={comment.response_id} comment={comment} post={e.post_id} />
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className="Fdo Anv Aic">
                            <Loading style={loadingTextCSS} />
                            <button className="zhara-button-nude" style={btnplusStyle} onClick={this.morePostResult}>
                                <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g><path d="M 17,2C 8.716,2, 2,8.716, 2,17S 8.716,32, 17,32S 32,25.284, 32,17S 25.284,2, 17,2z M 17,30 C 9.832,30, 4,24.168, 4,17S 9.832,4, 17,4S 30,9.832, 30,17S 24.168,30, 17,30zM 25,16L 18,16 L 18,9 C 18,8.448, 17.552,8, 17,8S 16,8.448, 16,9L 16,16 L 9,16 C 8.448,16, 8,16.448, 8,17C 8,17.552, 8.448,18, 9,18L 16,18 l0,7 C 16,25.552, 16.448,26, 17,26S 18,25.552, 18,25L 18,18 l 7,0 C 25.552,18, 26,17.552, 26,17C 26,16.448, 25.552,16, 25,16z"></path></g></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </>)
    }
} 