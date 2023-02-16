import React from "react";
import MyVerticallyCenteredModal from "../../Components/modal/modalCore";
import Button from "../../Components/button/button";
import { AgeSearchedMinimum, TemplateCheck } from "../Template/Template";
import { CircleEmpty, CircleSelected, IconFemale, IconMale, LoadingXlContent, PeopleIcon } from "../icon/icons";
import Fetch from "../util/Fetch";
import { useDispatch, useSelector } from "react-redux";
import { ChangeFilterValue, changeNextStatus, changeSexeFilterValue, showAlertBox } from "../redux/UtilRedux";
import {  newFilterResult } from "../redux/UserFilterRedux";
import { Link } from "react-router-dom";
const Filtre = (props) => {
    const [loading, setLoading] = React.useState(false)
    const [modalFiltre, setModalFiltre] = React.useState(false)
    const store = useSelector((state) => state);
    const dispatch = useDispatch();
    const getNewParams = (e) => {
        e.preventDefault();
        setLoading(true);
        var formData = new FormData();
        formData.append('url', './RESTAPI/Filtre/GetUserFilter')
        formData.append('max_age', store.Util.Filtre.max_age)
        formData.append('min_age', store.Util.Filtre.min_age)
        formData.append('sex_search', store.Util.Filtre.sex_type)
        formData.append('limit', 9)
        Fetch('/api', formData, data => {
            if (data?.success === 1) {
                dispatch(newFilterResult(data?.data?.users))
                dispatch(changeNextStatus({ name: 'user_search', value: data?.data?.has_next_page }))
            } else {
                dispatch(showAlertBox(data));
            }
            setLoading(false)

            setModalFiltre(false)
        })
    }
    const handleChangeFilterValue = (e) => {
        if (typeof (e.target.value === 'number') && parseInt(e.target.value) < 100) {
            dispatch(ChangeFilterValue({ name: e.target.name, value: +e.target.value }))
        }
    }
    const changeSexe = (sexe) => {
        dispatch(changeSexeFilterValue(sexe))
    }
    return <>
        <div className="Fdo Anv">
            <div className="page Fdo  Igw0E  IwRSH   eGOV_    _4EzTm Cxfa">
                <Link className="page ElL Ngt" to="" onClick={() => setModalFiltre(true)}>
                    <div className="Fdo   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm Lsy LDv ApE" style={{ right: 30 }}>
                        <div className="page _4EzTm ovd Vgd a1C" style={{ bottom: 20, zIndex: 1 }}>
                            <div className=" LCR Fdo Lns Aic Fbd BjN" style={{ width: "36px", height: "36px" }}>
                                <svg width="24" height="24" className="sFc tlK" viewBox="0 0 32 32" fill="#000000"><g><path d="M 27,6L 24,6 c0-1.104-0.896-2-2-2l-2,0 C 18.896,4, 18,4.896, 18,6L 5,6 C 4.448,6, 4,6.448, 4,7C 4,7.552, 4.448,8, 5,8L 18,8 c0,1.104, 0.896,2, 2,2l 2,0 c 1.104,0, 2-0.896, 2-2l 3,0 C 27.552,8, 28,7.552, 28,7C 28,6.448, 27.552,6, 27,6z M 22,8l-2,0 L 20,6 l 2,0 L 22,8 zM 27,14L 14,14 c0-1.104-0.896-2-2-2L 10,12 C 8.896,12, 8,12.896, 8,14L 5,14 C 4.448,14, 4,14.448, 4,15C 4,15.552, 4.448,16, 5,16L 8,16 c0,1.104, 0.896,2, 2,2l 2,0 c 1.104,0, 2-0.896, 2-2l 13,0 C 27.552,16, 28,15.552, 28,15C 28,14.448, 27.552,14, 27,14z M 12,16L 10,16 L 10,14 l 2,0 L 12,16 zM 27,22L 20,22 c0-1.104-0.896-2-2-2L 16,20 c-1.104,0-2,0.896-2,2L 5,22 C 4.448,22, 4,22.448, 4,23 C 4,23.552, 4.448,24, 5,24L 14,24 c0,1.104, 0.896,2, 2,2l 2,0 c 1.104,0, 2-0.896, 2-2l 7,0 c 0.552,0, 1-0.448, 1-1 C 28,22.448, 27.552,22, 27,22z M 18,24L 16,24 l0-2 l 2,0 L 18,24 z"></path></g></svg>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
        <MyVerticallyCenteredModal
            show={modalFiltre}
            onHide={() => !loading ? setModalFiltre(false): null}
            titre="Configurer le Filtre"
        >
            {loading &&
                <div className="backdropLoad">
                    <div className="Fdo Lns hty ELG Aic">
                        <div className="Fdo Anv">
                            <LoadingXlContent />
                        </div>
                    </div>
                </div>
            }
            <div className="Fdo Aic Anv modal-sm">
                {store.Util.Filtre.min_age < 18 || store.Util.Filtre.max_age < 18 ?
                    <div className="message_status">L'age minimum requise est de 18 ans</div>
                    : store.Util.Filtre.max_age < store.Util.Filtre.min_age ?
                        <div className="message_status">L'age minimum doit etre plus petit que l'age maximun</div> : null
                }
                <form method="POST" className="Anv ELG" onSubmit={getNewParams}>
                    <div className="Fdo Anv">
                        <div className="filter-range-wrap">
                            <div className="m2F">
                                <div className="Fdo Aic">
                                    <div className="vcx">de</div>
                                    
                                    <AgeSearchedMinimum value={store.Util.Filtre.min_age} name="min_age" onChange={handleChangeFilterValue} />
                            
                                    <div className="wGH">a</div>
                                    <AgeSearchedMinimum value={store.Util.Filtre.max_age} name="max_age" onChange={handleChangeFilterValue} />
                                    <div className="aBv">ans</div>
                                </div>
                            </div>
                            <div className="Fdo SFD Anv">
                                <TemplateCheck onClick={() => changeSexe("A")}
                                    active={store.Util.Filtre.sex_type === "A" ? true
                                        :
                                        false}
                                    checkbox={store.Util.Filtre.sex_type === "A" ? <CircleSelected />
                                        :
                                        <CircleEmpty />} name="Tous">
                                    <PeopleIcon size={24} />
                                </TemplateCheck>

                                <TemplateCheck onClick={() => changeSexe("M")}
                                    active={store.Util.Filtre.sex_type === "M" ? true
                                        :
                                        false}
                                    checkbox={store.Util.Filtre.sex_type === "M" ? <CircleSelected />
                                        :
                                        <CircleEmpty />} name="Homme">
                                    <IconMale size={24} />
                                </TemplateCheck>
                                <TemplateCheck onClick={() => changeSexe("F")}
                                    active={store.Util.Filtre.sex_type === "F" ? true
                                        :
                                        false}
                                    checkbox={store.Util.Filtre.sex_type === "F" ? <CircleSelected />
                                        :
                                        <CircleEmpty />} name="Femme">
                                    <IconFemale size={24} />
                                </TemplateCheck>
                            </div>
                        </div>
                        <div className="Fdo Aic ELG">
                            <div className="Fdo ELG CDp kzZ m2F">
                                {store.Util.Filtre.min_age > store.Util.Filtre.max_age || store.Util.Filtre.min_age < 18 || store.Util.Filtre.max_age < 18 ?
                                    <Button type='button' variant="_Dvgb disabled">Filtrer</Button>
                                    :
                                    <Button type="submit" variant='_Dvgb'>Filtrer</Button>
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </MyVerticallyCenteredModal>
    </>
}
export default Filtre