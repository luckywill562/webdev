import React from 'react';
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import { withRouter } from '../../util/WithRouter';
import Container from '../../Components/Container';
import Account from './components/Information';
import Security from './components/Security';
import { MenuTemplate } from '../../Template/Template'
import Cofidentiality from './components/Cofidentiality';
import { useSelector } from 'react-redux';
const Settings = (props) => {
    const store = useSelector((state) => state);
    return (
        <Container>
            <div className='Fdo Bcg Nfb ELG Flk main-app-width Pap'>
                <div className="Fdo messagerie-container sLayout Pap">
                    <div className="container-box messages-wrapper">
                        <div className="Fdo messages-listing">
                            <div className="messages-list-wrapper">
                                <div className="messages-list-header">
                                    <div className="messages-list-title">Paramètres</div>
                                    <div className="Fdo">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                                    </div>
                                </div>
                                <div className="conversation-list-content">
                                    <div className="side-bar-message-wrapper message-scrollabled-list">
                                        <div>
                                            <MenuTemplate path={props.location.pathname} to="/settings">
                                                Paramètres du compte
                                            </MenuTemplate>
                                            <MenuTemplate to="/settings/security" path={props.location.pathname}>
                                                Paramètres de securité
                                            </MenuTemplate>
                                            <MenuTemplate to="/settings/confidentiality" path={props.location.pathname}>
                                                Paramètres d'abonnements
                                            </MenuTemplate>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="messages-text-container">
                            <div className="conversation-container v4a ni8dbmo4">
                                <Routes>
                                    <Route path="/" element={<Account session_user={store.Util.c_user} />} />
                                    <Route path="security" element={<Security session_user={store.Util.c_user} />} />
                                    <Route path='confidentiality' element={<Cofidentiality session_user={store.Util.c_user} />} />
                                    <Route path="*" element={<Navigate to="/404" replace />} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
export default withRouter(Settings);