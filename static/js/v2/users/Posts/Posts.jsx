import React from "react"
import { withRouter } from "../../util/WithRouter"
import Photos from "./Photos/Photos";
import fetch from "../../util/fetch";
import InfiniteScroll from "../../Components/InfiniteScroll";
import { BottomAffichage, CardAuthorTemplate, CardText, ConfidentialityIcon, EmptyPostContent, PostCardLoading } from "../../Template/Template";
import Like from "../../Posts/components/Like";
import Grid from "../../Posts/components/Grid";
const Posts = (props) => {
    const [loading, setLoading] = React.useState(false)
    const [nextloading, setNextLoading] = React.useState(false);
    React.useEffect(() => {
        if (props.profile.content.posts.length === 0) {
            getUserPost();
        }
    }, [])
    const getUserPost = () => {
        setLoading(true);
        var formData = new FormData();
        formData.append('url', '/RESTAPI/Users/Posts')
        formData.append('profile_id', props.profile.user_id);
        formData.append('page', 0)
        formData.append('limit', 5)
        fetch('/api', formData, (res) => {
            props.profileUpdate(res.message.posts, res.message.has_next_page)
            setLoading(false);
        })
    }
    const nextPage = () => {
        setNextLoading(true);
        var formData = new FormData();
        formData.append('url', '/RESTAPI/Users/Posts')
        formData.append('profile_id', props.profile.user_id);
        formData.append('page', props.profile.content.posts[props.profile.content.posts.length - 1].post.post_id)
        formData.append('limit', 5)
        fetch('/api', formData, (res) => {
            props.profileUpdate(res.message.posts, res.message.has_next_page)
            setNextLoading(false);
        })
    }
    return <div className="Fdo nF1 Ba2 Ert">
        {!loading && props.profile.content.posts.length === 0 ?
            <div className="Pac">
                <div className="Fdo Aic Lns">
                    <BottomAffichage titre={'Aucune publications a afficher pour l\'instant'}
                        texte={'Abonnée vous a sa page pour reçevoir des notifications lorsqu\'elle publie quelque chose'} />
                </div>
            </div>
            :
            <>
                <div className="Fdo Anv default-container App">
                    {loading ?
                        <PostCardLoading />
                        :
                        <InfiniteScroll
                            next={nextPage}
                            next_page={props.profile.content.posts_has_next_page}
                            loading={nextloading}
                        >
                            {props.profile.content.posts.map((e) => (
                                <div className="post-card card-border" key={e.post.post_id}>
                                    <div className="card-top">
                                        <CardAuthorTemplate author={e.author} avatarsize={44}>
                                            
                                        </CardAuthorTemplate>
                                        <CardText e={e.post} />
                                    </div>
                                    {e.media_src.length === 0 && e.post.post_content.length === 0 &&
                                        <EmptyPostContent />
                                    }
                                    {e.media_src.length > 0 &&
                                        <Grid media={e.media_src} type="post" media_count={e.media_src.length} post_id={e.post.post_id} />
                                    }
                                    <div className='Fdo Pag vcx Ert Aic'>
                                        <ConfidentialityIcon level={parseInt(e.post.security_level)} />
                                        <span className='_7UhW9  PIoXz   Tui    MMzan    _0PwGv              fDxYl     '>{e.post.date_of_creation}</span>
                                    </div>
                                    <Like element={e.post} commentLink={true} type="P" to={`/post/${e.post.post_id}/likes`} state={{ background: props.location.state ? props.location.state.background : props.location }} />
                                </div>
                            ))}
                        </InfiniteScroll>
                    }
                </div>
                <div className="Fdo p1c ELG" style={{ maxWidth: '320px' }}>
                    <Photos />
                </div>
            </>
        }
    </div>
}
export default withRouter(Posts)