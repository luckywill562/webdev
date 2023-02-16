import React from "react";
import { withRouter } from "../util/WithRouter";
import { BottomAffichage, ExploreLoading } from "../Template/Template";
import { useDispatch, useSelector } from "react-redux";
import Fetch from "../util/Fetch";
import InfiniteScroll from "../Components/InfiniteScroll";
import { createSavedList } from "../redux/MediaListView";
import { changeNextStatus } from "../redux/UtilRedux";
import { Link } from "react-router-dom";
const Saved = (props) => {
    const dispatch = useDispatch();
    const redux = useSelector((state) => state);
    const store = redux.SavedMedia
    const [loading, setLoading] = React.useState(false)
    const [nextloading, setNextLoading] = React.useState(false);
    React.useEffect(() => {
        if (store.length === 0) {
            setLoading(true)
            GetData();
        }
    }, [])

    const GetData = () => {
        var formData = new FormData();
        formData.append('url', './RESTAPI/Saved/Saved')
        formData.append('limit', 1)
        if (store.length > 0) {
            formData.append('page', store[store.length - 1].id)
        } else {
            formData.append('page', 0)
        }
        Fetch('/api', formData, data => {
            if (data.success === 1) {
                setNextLoading(false)
                dispatch(createSavedList(data?.saved))
                dispatch(changeNextStatus({ 'name': 'saved_element', 'value': data.has_next_page }))
            }
            setLoading(false)
        })
    }
    const nextData = () => {
        setNextLoading(true);
        GetData();
    }

    return <div className="Fdo Lns Nfb ELG Flk">
        <div className="Fdo aBv FGM nF1 CenterContainer Lns">
            <div className="Fdo Anv Bsj">
                {loading ?
                    <ExploreLoading length={20} />
                    :
                    <InfiniteScroll
                        next={nextData}
                        next_page={redux?.Next_Page?.saved_element}
                        loading={nextloading}
                        margin="10px">
                        {store.map((e, index) => (
                            <div className="post-card" key={index}>
                                <div className="Fdo aBv Ba2 g4R Nxz">
                                    <div style={{ maxWidth: 144, maxHeight: 144 }}>
                                        <div className="photo-wrapper Eho Ngt" style={{ height: 144, width: 144, padding: 0 }}>
                                            <div className="Fdo Anv Dfv PSb">
                                                <Link className="photo-container" to={`/media?id=${e?.media_id}&type=${e?.element_type}&element_id=${e?.content_id}`} state={{ background: props?.location }}>
                                                    <img data-src={e?.media_src} className="lazyload" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Fdo Bsj hpfvmrgz fdlor gtg Anv">
                                        <Link className="esuyzwwr lzcic4wl" to={`/media?id=${e?.media_id}&type=${e?.element_type}&element_id=${e?.content_id}`}>
                                            <span style={{
                                                    fontSize: '1.25rem',
                                                    maxWidth: '100%',
                                                    wordBreak: 'break-word',
                                                    lineHeight: 1.2,
                                                    fontWeight: 700,
                                                    color: '#262626'
                                            }}>
                                                <span className="floe " style={{
                                                    wordBreak: 'break-word',
                                                    fontSize: '1.25rem',
                                                    lineHeight: 1.2,
                                                    fontWeight: 700,
                                                    wordWrap: 'break-word',
                                                    overflowY: 'hidden',
                                                    paddingBottom: '2px',
                                                    overflowX: 'hidden',
                                                    position: 'relative',
                                                   
                                                    display: '-webkit-box',
                                                }}>
                                                # **Développeurs PHP**
                                                ## **Missions :**

                                                * Garantir l’ergonomie du logiciel
                                                * Assurer la mise à jour de l’application web ainsi que la résolution des bugs
                                                * Et toute autre tâche liée au développement web

                                                ## Profil :
                                                * Être diplômé en informatique, génie logiciel ou équivalent
                                                * Maîtrise du langage PHP, MySQL, Javascript et de l’environnement web (HTML, CSS)
                                                * Avoir une connaissance du logiciel de gestion ERP-DOLIBARR serait un atout
                                                * Capable de développer ou de manipuler une application mobile
                                                * Ayant un bon sens de précision au niveau des codes
                                                * Être sérieux, créatif, autodidacte
                                                * Maîtrise bien la langue française
                                                * Disponible de suite


                                                Pour postuler, envoyez votre dossier de candidature via recrutement@somme.group

                                                **Local** : Ambatobe
                                                </span>
                                            </span>
                                        </Link>
                                        <div className="Fdo Anv Bsj">
                                            <div className="Lwe">
                                                <div className="Fdo Cdf">
                                                    <div className="Rav">
                                                        <div className="ELG">
                                                            Annuler l'enregistrement
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </InfiniteScroll>
                }
                {!loading && store.length === 0 &&
                    <BottomAffichage titre={'Aucun enregistement'}
                        texte={'Vous voyez les contenu que vous avez enregistrer'} />
                }

            </div>
        </div>
    </div>
}
export default withRouter(Saved)