import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IconClock, IconPencil, IconPlusAlt, LoadingXlContent, MdMore, MiniIconComment, PeopleIcon } from "../../icon/icons";
import { CardAuthorName } from "../../Template/Template";
import { withRouter } from "../../util/WithRouter";
import { CircleProfile, RightBox } from "./Template";
import { useDispatch, useSelector } from "react-redux";
import Fetch from "../../util/Fetch";
import { addVisitedCircleSubjectList, createCircleVisitedList } from "../../redux/CercleRedux";
import MyVerticallyCenteredModal from "../../../Components/modal/modalCore";
import CreateSubject from "./CreateSubject";
const AllSubject = (props) => {
    const [circle, stateSet] = React.useState(undefined);
    const [loading, setLoading] = React.useState(false)
    const [modastate, setmodalState] = React.useState(false)
    const dispatch = useDispatch();
    const circlelist = useSelector((state) => state.circlesVisited);
    useEffect(() => {
        const findcircle = circlelist.findIndex((circlelist => circlelist.circle_info.id === props.useParams.circle_id))
        if (findcircle < 0) {
            setLoading(true)
            var formData = new FormData();
            formData.append('url', '/RESTAPI/Circle/circle')
            formData.append('circle_id', props.useParams.circle_id)
            Fetch('/api', formData, res => {
                if (res.success === 1) {
                    stateSet({ circle: res.message.circle });
                    dispatch(createCircleVisitedList(res.message.circle));
                }
                setLoading(false)
            })
        } else {
            stateSet({ circle: circlelist[findcircle] });
        }
    }, []);

    const getSubject = (circle_id, circle) => {
        var formData = new FormData();
        formData.append('url', '/RESTAPI/Circle/getSubjects')
        formData.append('circle_id', circle_id)
        Fetch('/api', formData, res => {
            const subjectSlice = circle;
            console.log(circle, ...res.message)
            if (subjectSlice) {
                subjectSlice.circle.subjects.push(...res.message)
            }
            dispatch(addVisitedCircleSubjectList({ 'subjects': res.message, 'circle_id': circle_id }))
        })
    }

    const Pleft = 54;
    return (
        <div className="Fdo aBv FGM nF1 CenterContainer">
            {loading || circle === undefined ?
                <LoadingXlContent /> :
                <>
                    <div className="default-container App " style={{ maxWidth: 540 }}>
                        <CircleProfile content={circle.circle}>
                            <div className="">
                                <div className="">
                                    <MdMore size={24} />
                                </div>
                            </div>
                        </CircleProfile>
                        <div className="Fdo Anv">
                            <div className="post-card ">
                                <div className="Fdo Lsy LDv Ert Vpe">
                                    <div className="Fdo Aic Bsj">
                                        <div className="SH1 tlK SMy Vft Bsj">Sujets populaire</div>

                                        <div className="Fdo">
                                            <div className="Fdo sqdOP _kjyt  hrdfpoiu  Bgu ZIAjV" onClick={() => setmodalState(true)}>
                                                <div className="Fdo Aic">
                                                    <IconPlusAlt size={24}/>
                                                </div>
                                                <div className="mWe gtriop">Nouveau sujet</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {circle.circle.subjects.map((element) => (
                                <>
                                    <div className="post-card " key={element.subject.element_id}>
                                        <div className="card-top">
                                            <CardAuthorName avatarsize={42} author={element.author}>

                                            </CardAuthorName>
                                        </div>
                                        <div className="Fdo Anv tw6a2znq vcx Kmm">
                                            <div className="" style={{ paddingLeft: Pleft }}>
                                                <div className="lH1 dyH iFc SMy kON IZT " dangerouslySetInnerHTML={{ __html: element.subject.title }}>
                                                    
                                                </div>
                                            </div>

                                            <div className="Fdo Ert" style={{ paddingLeft: Pleft }}>
                                                <div className="Fdo mWe vcx Aic   _0PwGv">
                                                    <span className="Fdo PLP Aic">
                                                        <IconClock size={18} />
                                                    </span>
                                                     {element.statistiques.created_date}
                                                </div>
                                                <div className="Fdo vcx  mWe  _0PwGv">
                                                    <Link to={`/discussions/${props.useParams.circle_id}/${element.subject.element_id}`} className="Fdo _0PwGv">
                                                        <span className="Fdo PLP Aic">
                                                            <MiniIconComment size={18} />
                                                        </span>
                                                        2K réponses
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            ))}
                        </div>
                    </div>
                    <div className="Fdo p1c">
                        <div className="Fdo a1C ELG Vkl Pag p1c">
                            <div className="Fdo Anv ELG">
                                <RightBox>
                                    <PeopleIcon size={24} />
                                </RightBox>
                                <RightBox>
                                    <PeopleIcon size={24} />
                                </RightBox>
                            </div>
                        </div>
                    </div>
                    <MyVerticallyCenteredModal
                        show={modastate}
                        onHide={() => setmodalState(false)}
                        nopadding="true"
                        titre={`créer un sujet`}
                        size={'gift'}
                    >
                        <div className='Fdo Anv Pag vcx Kmm'>
                            <div className="">
                                <CreateSubject />
                            </div>
                        </div>
                    </MyVerticallyCenteredModal>
                </>

            }
        </div>
    )
}
const AllSubjectMemo = React.memo(AllSubject)
export default withRouter(AllSubjectMemo)