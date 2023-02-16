import React from "react";
import { LoadingXlContent } from "../icon/icons";
import { ExploreContainer, ExploreLoading, PostCardLoading } from "./Template";
import MyVerticallyCenteredModal from "../../Components/modal/modalCore";
import { useNavigate } from "react-router-dom";
const CreatePostLoading = () => {
    return <div className="post-card">
        <div className="Fdo Anv Ert tw6a2znq vcx Kmm">
            <div className="Fdo">
                <div className="page  _4EzTm yC0tu">
                    <div className="_2dbep nmjy" style={{ height: 56, width: 56 }}>
                        <div className="HaS-3"></div>
                    </div>
                </div>
                <div className="Fdo Anv Bsj">
                    <div className="Fdo buofh1pr RpE">
                        <div className="RpE buofh1pr ni8dbmo4 stjgntxs czkt41v7 fmqxjp7s">
                            <div className="buofh1pr Fdo flx89l3n dpja2al7 dfr">
                                <div className="RpE Eho orhb3f3m czkt41v7 fmqxjp7s emzo65vh rq0escxv buofh1pr hpfvmrgz" style={{ height: 90 }}>
                                    <div className="HaS-3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Fdo Vnk Kmm" >
                <div className="Fdo Bsj">
                    <div className="Eho Vkuy Mtlc Ngt" >
                        <div className="HaS-3"></div>
                    </div>
                </div>

                <div className="Fdo aovydwv3 Eho Vkuy Ngt" style={{ width: 130 }}>
                    <div className="HaS-3"></div>
                </div>
            </div>
            <div className="Fdo aovydwv3 ">
                <div className="sqdOP Ngt L3NKy ZIAjV Bsj Vkuy Eho">
                    <div className="HaS-3"></div>
                </div>
            </div>
        </div>
    </div>
}
const PostsPageLoading = () => {
    return <div className="Fdo aBv FGM nF1 CenterContainer">
        <div className="default-container App">
            <CreatePostLoading />
            <PostCardLoading />
        </div>
        <ExploreContainer>
            <ExploreLoading length={3} />
        </ExploreContainer>
    </div>
}

function UserPageLoading() {
    return <div className="Fdo Fbd fykbt5ly ns4ygwem Bsh">
        <div className="Fdo Anv Vnk Flk">
            <div className="Fdo Lns page">
                <div className="Aic Fdo Lns">
                    <div className="ELG Lsy LDv">
                        <div className="_mainc Vpe Aic">
                            <div className="Anv RpG E4_R">
                                <div className="RpG Profil-canva">
                                    <div className="Enb">
                                        <div className="HaS-3"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="_o6mpc">
                                <div className="Fdo _ienqf Aic">
                                    <div className="qfAOE Ngt"></div>
                                </div>
                                <div className="k9GMp _ienqf">
                                    <div className="drGTB Vkuy Ngt Lbdf"></div>
                                    <div className="drGTB Vkuy Ngt Lbdf"></div>
                                </div>
                                <div className='_ienqf Fdo '>
                                    <div className="ltVA"></div>
                                </div>
                            </div>
                        </div>
                        <div className="Fdo Anv Lsy">
                            <div className="k9GMp _ienqf">
                                <div className="drGTB Lbdf"></div>
                                <div className="drGTB Lbdf"></div>
                            </div>
                            <div className="k9GMp _ienqf">
                                <div className="ltVA" style={{ width: 150 }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Fdo tLp">
                <div className="Cvg"></div>
            </div>
            <div className="Fdo Aic Cdf TabMenu ELG">
                <div className="Fdo ELG gvn Ert Lsy LDv Vpe">
                    <div className="Fdo Aic Cdf _9VEo1">
                        <div className="ltVA" style={{ width: 100, height: '100%' }}></div>
                    </div>
                    <div className="Fdo Aic Cdf _9VEo1">
                        <div className="ltVA " style={{ width: 120, height: '100%' }}></div>
                    </div>
                    <div className="Fdo Aic Cdf _9VEo1">
                        <div className="ltVA " style={{ width: 70, height: '100%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}


const InboxListCardLoading = () => {
    return <div className="rOtsg ElL" style={{ paddingTop: 4, paddingBottom: 4 }}>
        <div className="page              qF0y9          Igw0E   rBNOH        eGOV_     ybXk5     _4EzTm            XfCBB          HVWg4                 ">
            <div className="  qF0y9          Igw0E     IwRSH      eGOV_       acqo5   _4EzTm        yC0tu   ">
                <div className="Fdo Post-Author-Identity--Avatar UiOplink " style={{ height: 56, width: 56 }}>
                    <div className="HaS-3"></div>
                </div>
            </div>
            <div className="page Fdo  Igw0E     IwRSH  Lns vwCYk">
                <div className="profil-name">
                    <div className="DrvG" style={{ height: 13, marginTop: 10, minWidth: 120 }}></div>
                </div>
                <div className="profil-username">
                    <div className="DrvG" style={{ height: 10, marginTop: 5 }}></div>
                </div>
            </div>

        </div>
    </div>
}

const InboxListLoading = () => {
    const row = []
    for (let index = 0; index < 20; index++) {
        row.push(<InboxListCardLoading key={index} />)
    }
    return row
}
const InboxNavLoading = () => {
    return <div className="Fdo Bsj Bsh Ert Vpe Lsy LDv">
        <div className="Fdo Ftg Rav ">
            <div className="Fdo Aic Cdf _9VEo1">
                <div className="ltVA " style={{ width: 60, height: '100%' }}></div>
            </div>
            <div className="Fdo Aic Cdf _9VEo1">
                <div className="ltVA " style={{ width: 70, height: '100%' }}></div>
            </div>
        </div>
    </div>
}
function MessagePageLoading() {
    return <div className='Fdo Bcg Nfb ELG Flk main-app-width Pap'>
        <div className="Fdo messagerie-container sLayout">
            <div className="container-box messages-wrapper">
                <div className="Fdo messages-listing">
                    <div className="messages-list-wrapper">
                        <div className="messages-list-header">
                            <div className="messages-list-title">messages</div>
                        </div>
                        <div className="conversation-list-content">
                            <InboxNavLoading />
                            <div className="side-bar-message-wrapper message-scrollabled-list messagerie">
                                <InboxListLoading />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="messages-text-container" >
                    <div className="conversation-container">
                        <LoadingXlContent />
                    </div>
                </div>
            </div>
        </div>
    </div>
}
function CardLoading({ opacity }) {
    return (
        <div className="member-wrapper BjN" style={{ opacity: opacity }}>
            <div className="profile-card ">
                <div className="thumbnail">
                    <div className="HaS-3"></div>
                </div>
                <div className="info-content">
                    <div className="JGf PLP">
                        <div className="profile-bouton-action"></div>
                    </div>
                    <div className="profile-info hfv">
                        <div className="brief-info  has-led">
                            <div className="Lp1">
                                <div className="HaS-3"></div>
                            </div>
                        </div>
                    </div>
                    <div className="about">
                        <div className="Lp2 ">
                            <div className="HaS-3"></div>
                        </div>
                        <div className="Lp3">
                            <div className="HaS-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CardHomeLoading() {
    let row = [];
    for (let i = 0; i < 3; i++) {
        row.push(
            <CardLoading key={i} opacity={1} />
        )
    }
    return <div className="people-wrapper Fdo">{row}</div>;
}

const SingleMediaBox = () => {
    return <MyVerticallyCenteredModal
        show={true}
        size="sm"
        nopadding="true"
    >
        <div className='Dapi'>
            <div className="Fdo  messages-wrapper" style={{ borderRadius: 0, }}>

                <div className="Fdo Aic Bsj">
                    <div className="messages-text-container  RpG Fdo Aic Lns" style={{ background: 'rgb(0,0,0)' }}>
                        <LoadingXlContent />

                    </div>
                    <div className="Fdo box-overlay hty ljhf n8ej3o3l p1c">
                        <div className="messages-list-wrapper">
                            <div className="Fdo Kmm Pag vcx">
                                <div className="Fdo ELG Anv">
                                    <ExploreLoading length={1}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MyVerticallyCenteredModal>
}
const AlbumBoxLoading = ()=>{
    const navigate = useNavigate();
    return <MyVerticallyCenteredModal
    show={true}
    onHide={()=>navigate(-1)}
    nopadding="true"
    size="album"
>
    <div className="Fdo messagerie-container" style={{ padding: 0, maxHeight: 600, minHeight: 230 }}>
        <div  className="messages-text-container  RpG Fdo Aic Lns"
            style={{
                width: "500px",
                background: 'rgb(0,0,0)',
                maxWidth: 500,
                maxHeight: '100vh'
            }}>
                <div className="">chargement...</div>
        </div>
        <div className="Fdo albumContentRight hty ljhf n8ej3o3l p1c">
            <div className="messages-list-wrapper">
                    <div className="Fdo  Pag vcx">
                        <div className="Fdo ELG Anv">
                            <ExploreLoading length={1} />
                        </div>
                    </div>
                <div className="conversation-list-content gslkf">
                    
                </div>
                <div className="Fdo Anv">
                    <section className="ltpMr ndfg gslkf">
                        
                    </section>
                    <div className="Fdo tw6a2znq f10w8fjw vcx">
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
</MyVerticallyCenteredModal>
}

export { PostsPageLoading, CreatePostLoading, UserPageLoading, MessagePageLoading, InboxListLoading, InboxNavLoading, CardHomeLoading, SingleMediaBox ,
AlbumBoxLoading}