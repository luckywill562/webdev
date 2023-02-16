import React from "react";
const ConversationTemplate = ({ content, author }) => {
    return <div className='Fdo Anv'>
        {content?.message_type === 'INFO' ?
            <div className="Fdo Anv Aic">
                <div className='Fdo _4EzTm Aic Eho LCR vTu cgat1ltu '>
                    <img className="hty ELG hrt" src={author?.avatar} />
                </div>
                <div className="_7UhW9    MMzan    _0PwGv  Vgd" >
                    {content?.sended ? 'vous avez ': author?.username + ' a '}{content?.texte_info}
                </div>
            </div>
            :
            <div className='Fdo' style={{
                justifyContent: content?.sended ? "flex-end" : "flex-start",
                paddingBottom: "1px"
            }}
            >
                <div className='Fdo b2r Bsj Aic' style={{
                    flexDirection: content?.sended ? "column" : "row",
                }}>
                    {!content?.sended && (
                        <div className='Fdo _4EzTm Aic Eho LCR vTu cgat1ltu '>
                            <img className="hty ELG hrt" src={author?.avatar} />
                        </div>
                    )}
                    {content.sended ?
                        <div className='Bwt Obm bBA'
                            style={{
                                color: "#f1f1f1",
                                padding: "8px 16px",
                                borderTopRightRadius: "0.9rem",
                                borderBottomRightRadius: "0.9rem",
                                borderTopLeftRadius: "0.9rem",
                                borderBottomLeftRadius: "0.9rem"
                            }}>
                            <span className="SubContent" dangerouslySetInnerHTML={{ __html: content.subject }}></span>
                        </div>
                        :
                        <div className='Bwt QOqBd' style={{
                            color: "#262626",
                            padding: "8px 16px",
                            borderTopLeftRadius: '0.9rem',
                            borderBottomLeftRadius: "0.9rem",
                            borderTopRightRadius: '0.9rem',
                            borderBottomRightRadius: "0.9rem"
                        }}>

                            <span className="SubContent" dangerouslySetInnerHTML={{ __html: content.subject }}></span>
                        </div>
                    }
                </div>
            </div>
        }
    </div>
}
export default ConversationTemplate