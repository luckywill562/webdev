import React from "react";
import { withRouter } from "../../util/WithRouter";
import Fetch from "../../util/Fetch";
import MyVerticallyCenteredModal from "../../../Components/modal/modalCore";
import { useDispatch, useSelector } from "react-redux";
import { AddComment, createSinglePostsSlice, updateAddedComment } from "../../redux/PostsRedux";
import { trim, insertText } from "../../util/util";
import { showAlertBox, closeAlertBox } from "../../redux/UtilRedux";
import { PostCardLoading } from "../../Template/Template";
import { Link } from "react-router-dom";
import Media from './Grid';
import Like from "./Like";
import CommentForm from "../../Comments/commentForm";
import { CardAuthorName, CardText } from "../../Template/Template";
import { ModalShowHeader } from "../Templates/Templates";
import GetComment from "./GetComment";

const Single = (props) => {
    const [LoadingContent, setLoadingContent] = React.useState(false);
    const [content, setContent] = React.useState(undefined);
    const state = useSelector((store) => store);
    const Post = state.SinglePostsList
    const [showPost, setShowPost] = React.useState(false);
    const dispatch = useDispatch();
    const Load = () => {
        var data = new FormData();
        data.append('post_id', props.useParams.element_id)
        data.append('url', 'RESTAPI/Status/Single')
        Fetch('/api', data, res => {
            setLoadingContent(false)
            if (res.posts && res.posts?.length != 0) {
                setContent(res.posts)
                dispatch(createSinglePostsSlice(res.posts));
            }
        })
    }
    const LoadSinglePost = () => {
        const visited = Post.slice();
        const findIndex = visited.findIndex((visited => visited.post.post_id === props.useParams.element_id))
        if (findIndex >= 0) {
            const result = visited[findIndex];
            setContent(result)
        } else {
            setLoadingContent(true);
            Load();
        }
    }
    React.useEffect(() => {
        LoadSinglePost();
    }, [Post])
    React.useEffect(() => {
        if (props.location.state.reload) {
            Load();
        }
    }, [])

    const onComment = (text) => {
        const post_id = props?.useParams?.element_id;
        if (trim(text).length > 0) {
            let random_class = Math.floor((Math.random() * 10000000000000000000) + 1);
            const input = insertText(text)
            dispatch(AddComment({
                "response_content": input, "discussion_id": post_id,
                "response_id": random_class, "author_id": state.Util.c_user.user_id, "author_name": state.Util.c_user.first_name,
                'posted_date': 'maintenant', "author_username": state.Util.c_user.username, "author_avatar": state.Util.c_user.avatar.small, "process": true,
                type: 'post'
            }))
            let formData = new FormData();
            formData.append('element_id', post_id)
            formData.append('parent_id', post_id)
            formData.append('comment_content', input)
            formData.append('fakeID', random_class)
            formData.append('type', 'post')
            formData.append('url', 'RESTAPI/comments/new')
            formData.append('author_id', content?.post?.author_id)
            formData.append('reply', false)
            Fetch('/api', formData, res => {
                dispatch(updateAddedComment({ content: res?.data, fakeID: random_class }))
                dispatch(showAlertBox(res));
                setTimeout(() => {
                    dispatch(closeAlertBox());
                }, 2000);
            }, (err) => {
                console.log(err)
            })
        }
    }
    return <MyVerticallyCenteredModal
        show={true}
        onHide={() => props.navigate(-1)}
        nopadding="true"
    >

        {LoadingContent || !content ?
            <PostCardLoading /> :

            <div className="Fdo" style={{ maxwidth: '100%', width: 540 }}>
                <div className="ELG App">
                    <ModalShowHeader onClick={() => props.navigate(-1)} title="Commentaires" />

                    {content?.author && content?.post &&
                        <div className="post-card" style={{ margin: 0 }}>
                            <div className="card-top" style={{ paddingTop: 0 }}>
                                <CardAuthorName author={content?.author} avatarsize={44}>
                                    <div className="card-settings">
                                        <i className="arrow_carrot-down">
                                            <svg width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g><path d="M 22.782,13.8L 17,19.582L 11.218,13.8c-0.39-0.39-1.024-0.39-1.414,0c-0.39,0.39-0.39,1.024,0,1.414 l 6.486,6.486c 0.196,0.196, 0.454,0.294, 0.71,0.292c 0.258,0, 0.514-0.096, 0.71-0.292l 6.486-6.486c 0.39-0.39, 0.39-1.024,0-1.414 C 23.806,13.41, 23.172,13.41, 22.782,13.8z"></path></g></svg>
                                        </i>
                                    </div>
                                </CardAuthorName>
                                {showPost &&
                                    <>
                                        {content?.post.content &&
                                            <div className="Fdo Ert">
                                                <div className="post-text" style={{
                                                    fontSize: content?.post.content.length <= 200 && +content?.post.media_count === 0 ? 22 : '',
                                                    fontWeight: content?.post.content.length <= 200 && +content?.post.media_count === 0 ? 600 : '',
                                                    lineHeight: 1.2
                                                }} dangerouslySetInnerHTML={{ __html: content?.post.content }}></div>
                                            </div>
                                        }
                                        <CardText e={content?.post} />
                                    </>}
                                <div className="Ert">
                                    <Link to="#" onClick={(e) => {
                                        e.preventDefault();
                                        setShowPost(!showPost)
                                    }}>{!showPost ? 'Afficher' : 'Masquer'} la publication</Link>
                                </div>
                            </div>
                            {showPost && content?.media.length > 0 &&
                                <Media media={content?.media} media_count={+content?.post.media_count} post_id={content?.post.post_id} type={content?.type} />

                            }
                            <Like element={content?.post} commentLink={false} type='post' to={`/likes/post/${content?.post?.post_id}`} state={{ background: props.location.state.background }} />

                            <div>
                                <hr className='Fdo EvR jb3vyjys' />
                                <div className="Fdo tw6a2znq vcx Kmm aovydwv3">
                                    <div className='Fdo vcx'>
                                        <div className='Fdo Aic Hte Eho LCR _2dbep  Vkuy Mtlc' style={{ marginBottom: 2 }}>
                                            <img data-src={state?.Util?.c_user?.avatar?.medium} className="hty ELG hrt lazyload" />
                                        </div>
                                    </div>
                                    <CommentForm onComment={onComment} />
                                </div>
                                <GetComment element={content} />
                            </div>
                        </div>
                    }
                </div>
            </div>


        }
    </MyVerticallyCenteredModal>
}
export default withRouter(Single)
