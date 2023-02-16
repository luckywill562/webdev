import React from "react"
import { Love, LoveAlt } from "../icon/icons"
import Fetch from "../util/Fetch"
import { useDispatch } from "react-redux"
import { showAlertBox, closeAlertBox } from "../redux/UtilRedux"
import { likePostComment } from "../redux/PostsRedux"
const Like = (props) => {

    const e = props.comment;
    const dispatch = useDispatch();
    const onLiked = async () => {
        var action = e?.liked_by_viewer ? 'UNLIKE' : 'LIKE';
        var formData = new FormData();
        dispatch(likePostComment({comment_id: e.response_id}));
        const params = { 'element_id': e?.response_id, 'author_id': e?.author_id, 'action': action, 'element_type': 'comment' }
        formData.append('url', 'RESTAPI/Likes/Like')
        formData.append('params', JSON.stringify(params));
        Fetch('/api', formData, (data) => {
            dispatch(showAlertBox(data))
            setTimeout(() => {
                dispatch(closeAlertBox());
            }, 2000);
            dispatch(likePostComment({comment_id: e?.response_id, likes: data?.likes}));
        }, (erreur) => {
            dispatch(showAlertBox({ message: 'une erreur s\'est produite', success: 0 }));
            setTimeout(() => {
                dispatch(closeAlertBox());
            }, 2000);
        })
    }
    return <div className="Fdo Anv Lns">
        <button onClick={onLiked} className={`post-action qt6c0cv9 favourite-button ${e.liked_by_viewer ? `hbc` : ``}`} style={{padding:0}}>
            {e.liked_by_viewer ? <Love size={20} /> :
                <LoveAlt size={20} />
            }
        </button>
        {props.comment.like_count > 0 &&
            <div className={`Fdo  mWe Lns ${e.liked_by_viewer ? `hbc` : `Tpc`}`}>
                {props.comment.like_count}
            </div>
        }
    </div>
}
export default Like