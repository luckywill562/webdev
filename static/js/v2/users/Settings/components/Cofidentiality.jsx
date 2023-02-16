import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MyVerticallyCenteredModal from "../../../../Components/modal/modalCore";
import { Button } from "../../../Components/fields/Fields";
import { IconPrivate, PhotoIconAlt } from "../../../icon/icons";
import { showAlertBox, UpdatePrivacy, closeAlertBox } from "../../../redux/UtilRedux";
import { Checkbox, MenuItemWithIcon } from "../../../Template/Template";
import Fetch from "../../../util/Fetch";
import { isEmpty } from "../../../util/util";
import { withRouter } from "../../../util/WithRouter";
const Cofidentiality = (props) => {
    const dispatch = useDispatch();
    const [modalConfirm, setModalConfirm] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [offer, setOffer] = React.useState({});
    const [loadingOffer, setOfferLoading] = React.useState(false)
    const store = useSelector((state => state))
    const currency = store?.Util?.c_user?.currency
    const [modal1, setModal1] = React.useState(false)
    const [modal2, setModal2] = React.useState(false);
    const Check = () => {
        setModalConfirm(true);
    }
    const Confirm = () => {
        setLoading(true)
        var formData = new FormData();
        formData.append('url', 'RESTAPI/users/settings/confidentiality')
        formData.append('type', 'private')
        formData.append('value', +!props.session_user.private)
        Fetch('/api', formData, res => {
            setLoading(false)
            if (res.success === 1) {
                setModalConfirm(!modalConfirm)
                dispatch(UpdatePrivacy({ 'name': 'private' }))
            } else {
                dispatch(showAlertBox(res))
                setTimeout(() => {
                    dispatch(closeAlertBox());
                }, 2000);
            }
        })
    }
    React.useEffect(() => {
        setOfferLoading(true)
        var formData = new FormData();
        formData.append('url', 'RESTAPI/users/settings/getOffer')
        Fetch('/api', formData, (res) => {
            setOfferLoading(false)
            if (res?.success === 1) {
                setOffer(res.data)
            }
        })
    }, [])
    return <div className="Fdo Pap ELG Anv Hsu">
        <div className="Fdo ELG Kmm Anv Vnk">
            <div className="Fdo ELG  Kmm ">
                <h2 className="yTZ mWe">Confidentialité</h2>
            </div>
            <div className="Fdo Anv ELG" style={{ maxWidth: 370 }}>
                <div className="Fdo  ELG">
                    <div className="Fdo Aic LDv ">
                        {props.session_user.private ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>
                        }
                    </div>
                    <div style={{ flex: 1 }}>
                        <Checkbox checked={props.session_user.private ? true : false} name="checkforCom" onchange={Check}>
                            compte privé
                        </Checkbox>
                    </div>
                </div>
                <div className="_7UhW9  PIoXz       MMzan    _0PwGv      " style={{ marginTop: 2 }}>Lorsq'un compte est privé, seuls les abonements autorisé par vous peuvent voir vos contenus</div>
            </div>
        </div>
        <div className="Fdo ELG Kmm Anv Vnk">
            <div className="Fdo ELG  Kmm">
                <h2 className="yTZ mWe">Abonnements personalisés</h2>
            </div>
            <div className="_7UhW9  PIoXz       MMzan    _0PwGv  Kmm ">Monetisation du contenu graçe a des abonnements payant.</div>
            <div className="_7UhW9  PIoXz       MMzan    _0PwGv  Kmm ">Les abonnées premium pouront acceder a vos contenus privé sans payer.</div>
            <div className="sp-container Hsu">
                {loadingOffer &&
                    <div className="">chargement...</div>
                }
                {!isEmpty(offer) && !loadingOffer &&
                    <div className="card-deck mb-3 text-center">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <Checkbox checked={offer?.firstdeg?.active ? true : false} name="checkforCom" onchange={Check}>
                                    1er degre
                                </Checkbox>
                            </div>
                            <div className="card-body">
                                <div style={{ opacity: offer?.firstdeg?.active ? 1 : 0.4 }}>
                                    <h1 className="card-title pricing-card-title">{offer?.firstdeg?.price} {currency} <small className="text-muted">/{offer?.firstdeg?.delay}</small></h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>Accèss gratuit au contenu privé</li>
                                    </ul>
                                </div>
                                <button type="button" className="btn" onClick={() => setModal1(true)}>
                                    modifier
                                </button>
                            </div>
                        </div>
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <Checkbox checked={offer?.seconddeg?.active ? true : false} name="checkforCom" onchange={Check}>
                                    2èm dégré
                                </Checkbox>
                            </div>
                            <div className="card-body">
                                <div style={{ opacity: offer?.seconddeg?.active ? 1 : 0.4 }}>
                                    <h1 className="card-title pricing-card-title">{offer?.seconddeg?.price} {currency} <small className="text-muted">/ {offer?.seconddeg?.delay}</small></h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>Accèss gratuit au contenu privé</li>
                                    </ul>
                                </div>
                                <button type="button" className="btn" onClick={() => setModal2(true)}>
                                    modifier
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
        <MyVerticallyCenteredModal
            show={modal1}
            size="gift"
            onHide={() => setModal1(false)}
            titre={`${offer?.firstdeg?.active ?
                'desactiver'
                :
                'Activer'
                } l'offre`}
        >
            <button type="button" className="btn" onClick={() => setModal1(true)}>
                {offer?.firstdeg?.active ?
                    'desactiver'
                    :
                    'Activer'
                }
            </button>
        </MyVerticallyCenteredModal>
        <MyVerticallyCenteredModal
            show={modal2}
            size="gift"
            onHide={() => setModal2(false)}
            titre={` ${offer?.seconddeg?.active ? 'desactiver' : 'activer'} l'offre`}
        >
            <button type="button" className="btn" onClick={() => setModal2(true)}>
                {offer?.seconddeg?.active ?
                    'desactiver'
                    :
                    'activer'
                }
            </button>
        </MyVerticallyCenteredModal>
        <MyVerticallyCenteredModal
            show={modalConfirm}
            size="gift"
            onHide={() => setModalConfirm(false)}
        >
            <div className="Fdo Anv Kmm  Vnk">
                <div className="Fdo Anv Vpe">
                    <div className="yTZ mWe">
                        {props.session_user.private ?
                            'Désactiver ' : 'Activer '
                        }
                        le mode privé
                    </div>
                    <div className="Fdo Anv">
                        <MenuItemWithIcon legende={`${props?.session_user?.private ? 'Tous le monde' :
                            'Seuls vous et vos abonnés '}  peuvent voir vos photos`}>
                            <PhotoIconAlt size={22} />
                        </MenuItemWithIcon>
                        <hr className="Fdo " style={{ margin: 0 }} />
                        <MenuItemWithIcon legende={`${props.session_user.private ? 'Tous le monde ' : 'Seuls vous vos abonnés '} peuvent voir ce que vous publiez`}>
                            <svg width="22" height="22" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g><path d="M 4,32l 24,0 c 1.104,0, 2-0.896, 2-2L 30,2 c0-1.104-0.896-2-2-2L 4,0 C 2.896,0, 2,0.896, 2,2l0,28 C 2,31.104, 2.896,32, 4,32z M 4,2l 24,0 l0,28 L 4,30 L 4,2 zM 23,6l-8,0 C 14.448,6, 14,6.448, 14,7C 14,7.552, 14.448,8, 15,8l 8,0 C 23.552,8, 24,7.552, 24,7 C 24,6.448, 23.552,6, 23,6zM 23,12l-14,0 C 8.448,12, 8,12.448, 8,13C 8,13.552, 8.448,14, 9,14l 14,0 C 23.552,14, 24,13.552, 24,13 C 24,12.448, 23.552,12, 23,12zM 23,18l-14,0 C 8.448,18, 8,18.448, 8,19C 8,19.552, 8.448,20, 9,20l 14,0 c 0.552,0, 1-0.448, 1-1 C 24,18.448, 23.552,18, 23,18zM 23,24l-14,0 C 8.448,24, 8,24.448, 8,25C 8,25.552, 8.448,26, 9,26l 14,0 c 0.552,0, 1-0.448, 1-1 C 24,24.448, 23.552,24, 23,24z"></path></g></svg>
                        </MenuItemWithIcon>
                    </div>
                </div>
                <Button variant="_Dvgb" isLoading={loading} onClick={Confirm}>{props.session_user.private ?
                    'Désactiver ' : 'activer '
                }</Button>
            </div>
        </MyVerticallyCenteredModal>
    </div>
}
export default withRouter(Cofidentiality)