import React from "react";
import { Link } from "react-router-dom";
import { IconRefresh } from "../icon/icons";
import { withRouter } from "../util/WithRouter";
import Like from "./Like";
const CommentView = (props) => {
    return props.comment.map((comment, index) => (
        <div className="comment-box" key={index}>
            <div className={comment.process ? "Fdo Ncdty" : "Fdo"}>
                <div className="Fdo ELG">
                    <div className="Fdo ">
                        <Link to={`/${comment.author_username}`} className="Post-Author-Identity--Avatar Fdo Rvt">
                            <img src={comment.author_avatar} alt={comment.author_name} />
                        </Link>
                    </div>
                    <div className="Fdo ELG">
                        <div className="Fdo Pag Anv Bsj">
                            <div className="Fdo">
                                <div className="Fdo GHT Bsj">
                                    <div className="KHv">
                                        <div className=" Fdo Anv">
                                            <Link to={`/${comment.author_username}`} className="mWe KV-D4" style={{ lineHeight: 1 }}>
                                                <span style={{ fontSize: '0.8rem', fontWeight: 600 }} className="Fdo">{comment.author_name} </span>
                                            </Link>
                                            <span dangerouslySetInnerHTML={{ __html: comment.response_content }}></span>
                                        </div>
                                        {comment.process &&
                                            <div className="Fdo">
                                                <p>publication...</p>
                                            </div>
                                        }
                                    </div>
                                </div>

                            </div>
                            <div className="  PIoXz   Fdo     MMzan   _0PwGv ">
                                {!comment.process &&
                                    <>
                                        <div className="Fdo">
                                            <time>{comment.posted_date}</time>
                                        </div>
                                        <div className="Fdo Action  Lsy">
                                            <Link
                                                to={{
                                                    pathname: "/reply",
                                                    search: `?comment_id=${comment.response_id}&type=${comment.type.toLowerCase()}`,
                                                    state: { fromDashboard: true }
                                                }} state={{ background: props.location.state ? props.location.state.background : props.location }}
                                            >
                                                {!comment?.reply &&
                                                <span className="sqdOP">répondre</span>
                                                }
                                            </Link>
                                        </div>
                                    </>
                                }
                            </div>
                            {comment?.count_response > 0 &&
                                <div className="Fdo nmjy">
                                    <Link className="ButtonShowReply"
                                        to={{
                                            pathname: "/reply",
                                            search: `?comment_id=${comment.response_id}&type=${comment.type.toLowerCase()}`,
                                            state: { background: props.location.state ? props.location.state.background : props.location }
                                        }} state={{ background: props.location.state ? props.location.state.background : props.location }}
                                    >
                                        <IconRefresh size={16} />
                                        {comment?.count_response > 1 ? 
                                        <span>
                                            afficher les {comment?.count_response} réponses
                                        </span> :
                                        <span>afficher la reponse</span>
                                        }
                                    </Link>
                                </div>
                            }
                        </div>
                        { !comment.process &&
                            <Like comment={comment} />
                        }
                    </div>

                </div>
            </div>
        </div>
    )
    );
}

export default withRouter(CommentView)