import React from "react";
import MyVerticallyCenteredModal from "../../Components/modal/modalCore";
import { ModalShowHeader } from "../Posts/Templates/Templates";
import { withRouter } from "../util/WithRouter";
import { Fetch, isEmpty } from "../util/util";
import CommentForm from "./commentForm";
import { useSelector } from "react-redux";
import { insertText, trim } from "../util/util";
import { LoadingXlContent } from "../icon/icons";
import CommentView from "./CommentView";
import { Link } from "react-router-dom";
import InfiniteScroll from "../Components/InfiniteScroll";
const SingleComment = (props) => {
    const [loading, setLoading] = React.useState(false)
    const [content, setContent] = React.useState({});
    const state = useSelector((store => store));
    React.useEffect(() => {
        setLoading(true);
        var formData = new FormData();
        formData.append('url', 'RESTAPI/Comments/single')
        Fetch('POST', props.location.pathname + props.location.search, formData, (data) => {
            setLoading(false);
            if (data?.success === 1) {
                setContent(data.response)
            } else {
                props.navigate(`/${data?.status}`);
            }
            setLoading(false)
        }, (err) => {
            console.error(err)
        })
    }, [])
    const onComment = (text) => {
        if (trim(text).length > 0 && content?.response_id) {
            let fakeID = Math.floor((Math.random() * 10000000000000000000) + 1);
            const input = insertText(text)
            let formData = new FormData();
            formData.append('element_id', content?.response_id)
            formData.append('parent_id', content?.discussion_id)
            formData.append('comment_content', trim(text))
            formData.append('type', content?.type)
            formData.append('fakeID', fakeID)
            formData.append('author_id', content?.author_id)
            formData.append('reply', true)
            formData.append('url', 'RESTAPI/comments/new')
            Fetch('POST', '/api', formData, res => {
                if (res.success === 1) {
                }
            })
        }
    }
    const avatarsize = 42;
    return <MyVerticallyCenteredModal
        show={true}
        onHide={() => props.navigate(-1)}
        nopadding="true"
    >
        <div className="Fdo" style={{ maxwidth: '100%', width: 500 }}>
            <div className="default-container App">
                {loading ?
                    <LoadingXlContent />
                    :
                    <>
                        <ModalShowHeader onClick={() => props.navigate(-1)} title="Réponse(s) a ce commentaire" />
                        <div className="post-card" style={{ margin: 0 }}>
                            <div className="card-top" style={{ paddingTop: 0 }}>
                                <div className="page              qF0y9          Igw0E   rBNOH        eGOV_     ybXk5     _4EzTm            XfCBB          HVWg4                 ">
                                    <div className="  qF0y9          Igw0E     IwRSH      eGOV_       acqo5   _4EzTm        yC0tu   ">
                                        <Link className="Fdo Post-Author-Identity--Avatar UiOplink " style={{ height: avatarsize, width: avatarsize }} to={`/${content?.author_username}`}>
                                            <img src={content?.author_avatar} className="hty ELG hrt" />
                                        </Link>
                                    </div>
                                    <div className="page Fdo  Igw0E     IwRSH  Lns vwCYk">
                                        <div className="Fdo    Igw0E   IwRSH   eGOV_  _4EzTm  ksr ">
                                            <div className="_7UhW9   xLCgt  MMzan   fDxYl  ">
                                                <div className="R19PB">
                                                    <Link to={`/${content?.author_username}`} className="mWe hft" >
                                                        <div className="_7UhW9 Fdo Aic  xLCgt   fDxYl" dangerouslySetInnerHTML={{ __html: content?.author_name }}></div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Fdo    Igw0E   IwRSH   eGOV_  _4EzTm  ksr   nmjy">
                                            <div className="_7UhW9   xLCgt  MMzan   fDxYl  ">
                                                <div className="R19PB">
                                                    <div className="_7UhW9  PIoXz       MMzan    _0PwGv              fDxYl     ">
                                                        @{content?.author_username}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Fdo"></div>
                                </div>
                                <div className="Fdo Ert">
                                    <div className="post-text" style={{
                                        fontSize: content?.response_content?.length <= 200 ? 22 : '',
                                        fontWeight: content?.response_content?.length <= 200 ? 600 : '',
                                        lineHeight: 1.2
                                    }} dangerouslySetInnerHTML={{ __html: content?.response_content }}></div>
                                </div>
                            </div>
                            <div>
                                <hr className='Fdo EvR jb3vyjys' />
                                <div className="Fdo Pag vcx Kmm aovydwv3">
                                    <div className='Fdo vcx'>
                                        <div className='Fdo Aic Hte Eho LCR _2dbep  ' style={{ marginBottom: 2, height: 36, width: 36 }}>
                                            <img data-src={state?.Util?.min_user_content?.avatar} className="hty ELG hrt lazyload" />
                                        </div>
                                    </div>
                                    <CommentForm onComment={onComment} />
                                </div>
                                <div className="comment-content">
                                    {!loading && !isEmpty(content) ?
                                        <Reply content={content} />
                                        :
                                        <LoadingXlContent />
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    </MyVerticallyCenteredModal>
}
export default withRouter(SingleComment)
const Reply = ({ content }) => {
    const [replys, setReply] = React.useState([]);
    const [next_page, setNextPage] = React.useState(false);
    const [nextLoading, setNextLoading] = React.useState(false)
    const getComment = async () => {
        if (replys.length > 0) {
            var page = replys[replys.length - 1].response_id;
        } else {
            var page = 0
        }
        setNextLoading(true);
        var formData = new FormData();
        const params = {reply: true, parent_id: content?.response_id, element_id: content?.discussion_id, type: content?.type}
        formData.append('url', 'RESTAPI/comments/get')
        formData.append('page', page)
        formData.append('params', JSON.stringify(params))
        Fetch('POST', '/api', formData, (data) => {
            if (data?.success === 1) {
                const replySlice = replys.slice();
                if(replys.length === 0 ){
                    setReply(data?.comments)
                }else{
                    replySlice.push(...data?.comments)
                    setReply(replySlice)
                }
                setNextPage(data?.has_next_page)
            }
            setNextLoading(false)
        })
    }
    React.useEffect(() => {
        getComment();
    }, [])
    return <InfiniteScroll next={getComment}
        next_page={next_page}
        loading={nextLoading}>
        <CommentView comment={replys} />
    </InfiniteScroll>
}