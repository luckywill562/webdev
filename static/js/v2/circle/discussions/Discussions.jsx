import React, { useEffect } from "react";
import { withRouter } from "../../util/WithRouter";
import Responses from "./reponses/Responses";
import { SubjectListMenu } from "../Components/Template";
const Discussions = (props) => {
   
    return <div className='Fdo Bcg Nfb ELG Flk main-app-width Pap'>
        <div className="Fdo messagerie-container sLayout">
            <div className="container-box messages-wrapper">
                <div className="messages-text-container" >
                    <div className="conversation-container hty">
                        <Responses/>
                    </div>
                </div>
                <div className="Fdo DivRighConversationBox">
                    <div className="messages-list-wrapper">
                        <div className="messages-list-header">
                            <div className="messages-list-title">Groupes de discussions</div>
                        </div>
                        <div className="conversation-list-content">
                            <div className="side-bar-message-wrapper message-scrollabled-list messagerie">
                                {props.list.map((element, index) => (
                                    <div key={index}>
                                        <SubjectListMenu element={element} path={`/circle/inbox/${element.group_id}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

}
export default withRouter(Discussions)