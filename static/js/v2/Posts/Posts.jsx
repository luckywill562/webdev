import React, { Suspense, lazy } from 'react'

import { withRouter } from "../util/WithRouter";
import Fetch from "../util/Fetch";
import Media from './components/Grid';
const CreatePost = lazy(() => import('../Create/Post'));
import Like from './components/Like';
import { BottomAffichage, CardAuthorTemplate, CardText, EmptyPostContent, ExploreContainer, ExploreLoading, PostCardLoading } from '../Template/Template';
const Suggestions = lazy(() => import('./components/Suggestions'));
import { useDispatch, useSelector } from 'react-redux';
import { createAllPostsSlice, pushPostsSlice } from '../redux/PostsRedux';
import InfiniteScroll from '../Components/InfiniteScroll';
import { GetPostsfunc } from './components/Functions';
import { changeNextStatus } from '../redux/UtilRedux';
import { ConfidentialityIcon } from '../Template/Template';
import { CreatePostLoading, PostsPageLoading } from '../Template/Loading';
const Posts = (props) => {
    const [postLoading, setPostLoading] = React.useState(false);
    const [page, setPage] = React.useState(0)
    const limit = 2
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();
    const store = useSelector((state) => state)
    const Posts = store.AllPosts
    const ref1 = React.useRef(null);

    React.useEffect(() => {
        if (Posts.length === 0) {
            setPostLoading(true)
            GetPostsfunc(page, limit, action => {
                dispatch(createAllPostsSlice(action));
                setPostLoading(false)
            })
        }
    }, [])
    const NextPage = () => {
        setLoading(true)
        let formData = new FormData();
        if (Posts.length > 0) {
            let id = Posts.map(e => {
                return e.post_id
            })
            formData.append('idlist', id)
        }
        formData.append('page', page)
        formData.append('limit', limit)
        formData.append('url', './RESTAPI/Status/Posts')
        Fetch('/posts', formData, (res) => {
            setLoading(false)
            if (res.posts.length > 0) {
                dispatch(pushPostsSlice(res.posts))
            }

            dispatch(changeNextStatus({ 'name': 'explore_user', 'value': res.has_next_page }))
        })
    }

    return <>
        <div className="Fdo aBv FGM nF1 CenterContainer">
            <div className="default-container App">
                <Suspense fallback={<CreatePostLoading />}>
                    <div className="post-card card-border">
                        <CreatePost websocket={store.Util.ws} c_user={store.Util.c_user} />
                    </div>
                </Suspense>
                {/**
            <div className='Fdo Aic Lns'>
                <div className='a1C'>
                    <div className='LmP PLP Fry Ert Vpe Thn hn33210v'>
                        <div className='mWe iFc'>nouvelle publications</div>
                    </div>
                </div>
            </div>
             * 
             */}
                {!postLoading && Posts.length === 0 &&
                    <BottomAffichage titre={'Aucune publications a afficher pour l\'instant'}
                        texte="Suivez plus de personne pour avoir plus d'actualite" />
                }
                {postLoading || !Posts ?
                    <PostCardLoading />
                    :
                    <InfiniteScroll
                        next={NextPage}
                        next_page={store.Next_Page.posts}
                        loading={loading}
                    >

                        {Posts?.map((e, index) => (
                            <div className="post-card card-border" key={index} ref={ref1}>
                                <div className="card-top">
                                    <CardAuthorTemplate author={e?.author} avatarsize={44}>
                                        <div className="card-settings">
                                            <i className="arrow_carrot-down">
                                                <svg width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g><path d="M 22.782,13.8L 17,19.582L 11.218,13.8c-0.39-0.39-1.024-0.39-1.414,0c-0.39,0.39-0.39,1.024,0,1.414 l 6.486,6.486c 0.196,0.196, 0.454,0.294, 0.71,0.292c 0.258,0, 0.514-0.096, 0.71-0.292l 6.486-6.486c 0.39-0.39, 0.39-1.024,0-1.414 C 23.806,13.41, 23.172,13.41, 22.782,13.8z"></path></g></svg>
                                            </i>
                                        </div>
                                    </CardAuthorTemplate>
                                    <CardText e={e?.post} />

                                </div>
                                {e?.media_src?.length === 0 && e?.post?.post_content.length === 0 &&
                                    <EmptyPostContent />
                                }
                                {e?.media_src?.length > 0 &&
                                    <Media media={e.media_src} type="post" media_count={+e?.post?.media_count} post_id={e?.post?.post_id} />
                                }
                                <div className='Fdo Pag vcx Ert Aic'>
                                    <ConfidentialityIcon level={parseInt(e.post.security_level)} />
                                    <span className='_7UhW9  PIoXz   Tui    MMzan    _0PwGv              fDxYl     '>{e?.post?.date_of_creation}</span>
                                </div>
                                <Like element={e?.post} commentLink={true} type="post" to={`/likes/post/${e?.post?.post_id}`} state={{ background: props.location }} />
                            </div>
                        ))}
                    </InfiniteScroll>
                }
            </div>
            <Suspense fallback={
                <ExploreContainer>
                    <ExploreLoading length={3} />
                </ExploreContainer>
            }>
                <Suggestions />
            </Suspense>
        </div>
    </>
}

export default withRouter(Posts)







