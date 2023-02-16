import React from 'react'
import { withRouter } from '../../util/WithRouter';
import { Close } from '../../icon/icons';
import BoxMediaView from '../../media/BoxMediaView';
import { useDispatch, useSelector } from 'react-redux';
import { setCount } from '../../redux/UtilRedux';

const Modal = (props) => {
    const history = useSelector((state) => state.viewBoxHistory)
    const dispatch = useDispatch();
    const onDismiss = () => {
        props.navigate(history);
    }
    
    React.useEffect(() => {
        if (props.location.state) {
            dispatch(setCount(props.location.state.background.pathname))
        }
    }, [])
    return <div className="Dapi">
        <div className="Fdo  messages-wrapper Nma" style={{ borderRadius: 0 }}>
            <div className="Fdo ApE p1c">
                <div className="wGH Vnk">
                    <button className='pIc' onClick={() => onDismiss()}>
                        <span className="Fdo LCR tBo hgf"><Close size={36} /></span>
                    </button>
                </div>
            </div>
            <div className="Fdo Aic Bsj">
                <BoxMediaView c_user={props.c_user} element={props.element} mediaId={props.useParams.mediaId} />
            </div>
        </div>
    </div>
}
export default withRouter(Modal)

