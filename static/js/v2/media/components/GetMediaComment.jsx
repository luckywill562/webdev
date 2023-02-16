import React from "react";
import { useDispatch } from "react-redux";
import CommentView from "../../Comments/CommentView";
import InfiniteScroll from "../../Components/InfiniteScroll";
import Fetch from "../../util/Fetch";
import { singleMediaAction } from "../../redux/MediaListView";
import { Link } from "react-router-dom";
const GetMediaComment = (props) => {
    const dispatch = useDispatch();
    const [commentnextloading, setcommentnextLoading] = React.useState(false)
    const params = { reply: false, parent_id: props?.content?.content?.media_id, element_id: props?.content?.content?.media_id, type: props.content.content.content_type+'_media' }
    React.useEffect(() => {
        if (props.content.comments.length === 0 && props.content.has_next_page) {
            LoadComments();
        }
    }, [props.content.content.media_id])

    const LoadComments = () => {
        setcommentnextLoading(true)
        if (props.content.comments.length === 0) {
            var page = 0;
        } else {
            var page = props.content.comments[props.content.comments.length - 1].response_id;
        }
        var formData = new FormData();
        formData.append('url', 'RESTAPI/comments/get')
        formData.append('page', page)
        formData.append('params', JSON.stringify(params));
        Fetch('/api', formData, res => {
            if (res.success === 1) {
                dispatch(singleMediaAction({ 'content': props.content, action: 'pushComments', payload: res }));
            } else {
                dispatch(showAlertBox(res));
            }
            setcommentnextLoading(false)
        })
    }

    const Refresh = (event) => {
        event.preventDefault();
        dispatch(singleAlbumActions({ album_id: props.content.album_id, action: 'RELOAD_COMMENT' }));
        setcommentnextLoading(true);
        var formData = new FormData();
        formData.append('url', 'RESTAPI/comments/get')
        formData.append('page', 0)
        formData.append('params', JSON.stringify(params));
        Fetch('/api', formData, res => {
            if (res.success === 1) {
                
            } else {
                dispatch(showAlertBox(res));
            }
            setcommentnextLoading(false)
        })

    }
    return <>
    <Link to="#" onClick={Refresh}>reload</Link>
    {!props.content.has_next_page && !commentnextloading && props.content.comments.length === 0 ?
        <div className="Fdo Aic Lns hty">Aucun commentaire</div>
        :
        <InfiniteScroll
            next={LoadComments}
            next_page={props.content.has_next_page}
            loading={commentnextloading}
            margin="0px"
        >
            <CommentView comment={props.content.comments} />
        </InfiniteScroll>
    }
</>
}
export default GetMediaComment