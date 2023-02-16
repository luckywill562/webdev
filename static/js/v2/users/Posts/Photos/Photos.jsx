import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "../../../util/WithRouter";
const Photos = () => {
    const ImageRow = () => {
        let row = [];
        for (let index = 0; index < 6; index++) {
            row.push(<div className="postProfileMediaRightGrid">
                <div className="photo-wrapper Eho">
                    <div className="Fdo Anv Dfv PSb">
                        <div className="photo-container ApE">
                        </div>
                    </div>
                </div>
            </div>)
        }
        return row;
    }
    return <div className="MediaRightPostContainer">
        <div className="Fdo Vpe">
            <div className="page Fdo  Igw0E  mWe   IwRSH  Lns vwCYk">Medias</div>
            <div className="Fdo"><Link to={''}>voir tout</Link></div>
        </div>
        <div className="Fdo Cdf kzZ" style={{ margin: -2, }}>
            <ImageRow />
        </div>
    </div>
}

export default withRouter(Photos)