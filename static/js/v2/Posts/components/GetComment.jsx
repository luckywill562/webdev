import React from "react";
import { withRouter } from "../../util/WithRouter";
import Fetch from "../../util/Fetch";
import CommentView from "../../Comments/CommentView";
import InfiniteScroll from "../../Components/InfiniteScroll";
import { useDispatch } from "react-redux";
import { pushCommentData } from "../../redux/PostsRedux";

const GetComment = (props) => {
    const dispatch = useDispatch();
    const [nextloading, setNextLoading] = React.useState(false);
    React.useEffect(() => {
        getComment();
    }, [])
    const getComment = async () => {
        if (props.element.post_reply.length > 0) {
            var page = props.element.post_reply[props.element.post_reply.length - 1].response_id;
        } else {
            var page = 0
        }
        setNextLoading(true);
        var formData = new FormData();
        formData.append('url', 'RESTAPI/comments/get')
        const params = { reply: false, parent_id: props?.element?.post?.post_id, element_id: props?.element.post.post_id, type: 'post' }
        formData.append('params', JSON.stringify(params))
        formData.append('page', page)
        Fetch('/api', formData, (data) => {
            if (data?.success === 1) {
                dispatch(pushCommentData({ 'post_id': props?.element?.post?.post_id, data }))
            }
            setNextLoading(false)
        })
    }

    return <div className="comment-content">
        {props?.element?.post?.comment_payment &&
            <div className="Fdo Vpe">
                <span className="Tpc">Pour pouvoir répondre, Vous devez payer {props?.element?.post?.comment_price} {props?.session_user?.devise}</span>
            </div>
        }
        <InfiniteScroll
            next={getComment}
            next_page={props?.element?.has_next_page}
            loading={nextloading}
        >
            {props?.element?.post_reply?.length > 0 && (
                <CommentView comment={props?.element?.post_reply}  />
            )}

        </InfiniteScroll>

    </div>
}

export default withRouter(GetComment)