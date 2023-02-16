import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Love, CommentIcon, LoveAlt } from "../../icon/icons";
import Fetch from "../../util/Fetch";
import { CountLikes } from "../../Template/Template";
import { withRouter } from "../../util/WithRouter";
import { useDispatch } from "react-redux";
import {singleAlbumActions } from "../../redux/PostsRedux";
import { closeAlertBox, showAlertBox } from "../../redux/UtilRedux";

const Like = (props) => {
    const e = props.element;
    const dispatch = useDispatch();
    const onLiked = async () => {
        var action = e?.liked_by_viewer ? 'UNLIKE' : 'LIKE';
        dispatch(singleAlbumActions({album_id: e?.album_id, action:'LIKE_AND_UNLIKE'}))
        var formData = new FormData();
        const params = { 'element_id': e?.album_id , 'author_id': e?.author_id ,'action': action, 'element_type':props?.type}
        formData.append('url', 'RESTAPI/Likes/Like')
        formData.append('params', JSON.stringify(params));
        Fetch('/api', formData, (data) => {
            dispatch(showAlertBox(data));
            setTimeout(() => {
                dispatch(closeAlertBox());
            }, 2000);
            if (data.success === 0) {
                dispatch(singleAlbumActions({album_id: e?.album_id, action: 'LIKE_AND_UNLIKE' ,likes: data?.likes}))
            } else {
                dispatch(singleAlbumActions({album_id: e?.album_id, action: 'LIKE_AND_UNLIKE' ,likes: data?.likes}))
            }
        }, (erreur) => {
            dispatch(showAlertBox({ message: 'une erreur s\'est produite', success: 0 }));
            setTimeout(() => {
                dispatch(closeAlertBox());
            }, 2000);
            dispatch(singleAlbumActions({album_id: e?.album_id, action: 'LIKE_AND_UNLIKE'}))
        })
    }

    return <div className="Fdo Anv">
        <div className="Fdo Aic Pag vcx Cdf ">
            <div className="card-action Fdo ELG Cdf Aic Pac">
                <span className="PaN klpyt">
                    <button onClick={onLiked} className={e?.liked_by_viewer == true ? "post-action unfavourite-button" : "post-action favourite-button"}>
                        {e?.liked_by_viewer ?
                            <span className="hbc">
                                <Love size={24} />
                            </span>
                            :
                            <span className="">
                                <LoveAlt size={24} />
                            </span>
                        }
                    </button>
                </span>

                {props?.commentLink ?
                    <button className='post-action Comment-button' onClick={() => { props.navigate(`/post/${e.post_id}`) }}>
                        <CommentIcon size={24} />
                    </button>
                    :
                    <button className='post-action Comment-button'>
                        <CommentIcon size={24} />
                    </button>
                }
            </div>
            <section className='Pag Fdo'>
                <div className="">{e?.views} vues</div>
                {props?.commentLink ?
                    <Link to={`/post/${e?.post_id}`} state={{ background: props.location }}>
                        <span className="Pag">{e?.comment_counter}  Commentaires</span>
                    </Link>
                    :
                    <span className="Pag">{e?.comment_counter} Commentaires</span>
                }
            </section>
        </div >
        <div className="Fdo Vpe" style={{ paddingLeft: 3 }}>
            <CountLikes media={e} to={`/likes/album/${e?.album_id}`} state={props.state} />
        </div>
    </div>
}
export default withRouter(Like)
