import React, { useState } from 'react';
import { Checked, CircleEmpty, IconErrorAlt, IconGiftAlt } from '../../icon/icons'
import { Link, useLocation } from 'react-router-dom';
import MyVerticallyCenteredModal from '../../../Components/modal/modalCore';
import { useSelector } from 'react-redux';
export default function MessageTemplate({ index, value, list, client, src }) {
  const store = useSelector((state) => state);
  const msg_list = list.slice()
  const msg = list[index];
  const next = msg_list[index + 1]
  const prev = msg_list[index - 1]
  const [modal, setModal] = useState(false);
  const GiftSeen = (e) => {
    e.preventDefault();
    setModal(true);
  }
  return <>
    {msg.type === 'GIFT' ?
      <div className='Fdo Anv Lns Aic w0hvl6rk' key={index}>
        <div className='Fdo Anv vag wfh Aic Lns QOqBd Ngt ELG pbD nmjy' style={{ maxWidth: 250 }}>
          <div className='Fdo Lng Aic'>
            <div className='Eho  Aic LCR vTu ' style={{
              border: next && !next.sended ? "1px solid transparent" : "1px solid #e5e6ea",
            }}>
              <img className="hty ELG hrt" src={src} />
            </div>
          </div>
          <hr className='Fdo EvR ELG' />
          <div className='Fdo Anv Aic'>
            <div className='Fdo'>
              <IconGiftAlt size={24} />
            </div>
            {msg?.sended ?
              <span>Vous avez envoyer un cadeau</span>
              :
              <span>Vous avez reçu un cadeau</span>
            }

            <MyVerticallyCenteredModal
              show={modal}
              onHide={() => setModal(false)}
              titre=" cadeau"
              size="gift">

            </MyVerticallyCenteredModal>
            <Link to="" className='sqdOP  ZIAjV ' onClick={GiftSeen}>Voir le contenu</Link>
          </div>
        </div>
        {msg?.error &&
          <div className='Fdo' style={{ padding: '4px 0' }}>
            <span className='_7UhW9  PIoXz       MMzan  G6S            fDxYl     '>message non envoyé</span>
          </div>
        }
      </div>
      :
      msg?.type === 'HEART' ?
        <div className='Fdo' style={{
          justifyContent: msg.sended ? "flex-end" : "flex-start",
          paddingBottom: "1px"
        }}
        >

          <div className='Fdo b2r Bsj Aic' style={{
            flexDirection: msg.sended ? "row" : "row",
            justifyContent: msg.sended ? "flex-end" : "flex-start",
          }}>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="#ff4477"><g><path d="M 31.984,13.834C 31.9,8.926, 27.918,4.552, 23,4.552c-2.844,0-5.35,1.488-7,3.672 C 14.35,6.040, 11.844,4.552, 9,4.552c-4.918,0-8.9,4.374-8.984,9.282L0,13.834 c0,0.030, 0.006,0.058, 0.006,0.088 C 0.006,13.944,0,13.966,0,13.99c0,0.138, 0.034,0.242, 0.040,0.374C 0.48,26.872, 15.874,32, 15.874,32s 15.62-5.122, 16.082-17.616 C 31.964,14.244, 32,14.134, 32,13.99c0-0.024-0.006-0.046-0.006-0.068C 31.994,13.89, 32,13.864, 32,13.834L 31.984,13.834 z"></path></g></svg>
          </div>
        </div>
        :
        msg?.type === 'NEW_CONTACT' ?
          <div className='v2ao Vnk'>
            <span className='_7UhW9  PIoXz       MMzan    _0PwGv              fDxYl     '>
              vous avez un nouveau contact
            </span>
          </div>
          : msg.type != 'NEW_CONTACT' && msg.type != 'GIFT' &&
          <div className='Fdo' style={{
            justifyContent: msg.sended ? "flex-end" : "flex-start",
            paddingBottom: "1px"
          }}
          >

            <div className='Fdo b2r Bsj Aic' style={{
              flexDirection: msg.sended ? "row" : "row",
              justifyContent: msg.sended ? "flex-end" : "flex-start",
            }}>

              {value.subject && +value.media === 0 ?
                <>
                  {!msg.sended && (
                    <div className='Eho Aic LCR vTu cgat1ltu ' style={{
                      border: next && !next.sended ? "1px solid transparent" : "1px solid #e5e6ea",
                    }}>
                      {next && next.sended || next && next.time_status != msg.time_status || next && next.type != msg.type || next && next.mesmedia.length > 0 || !next ?
                        <img className="hty ELG hrt" src={src} /> : ''}
                    </div>
                  )}
                  {msg.sended && msg.mesmedia.length == 0 ?
                    <div className='Bwt bBA Obm '
                      style={{
                        color: "#f1f1f1",
                        padding: "8px 16px",
                        maxWidth: "60%",
                        borderTopRightRadius: prev && prev.sended && msg.sended && prev.time_status === msg.time_status && prev.type === msg.type && prev.mesmedia.length == 0 ? "4px" : "0.9rem",
                        borderBottomRightRadius: next && next.sended && msg.sended && next.time_status === msg.time_status && next.type === msg.type && next.mesmedia.length == 0 ? "4px" : "0.9rem",
                        borderTopLeftRadius: "0.9rem",
                        borderBottomLeftRadius: "0.9rem",
                        marginTop: prev && prev.sended && msg.sended && prev.time_status === msg.time_status && prev.type === msg.type && prev.mesmedia.length == 0 ? 0 : "0.6rem"
                      }}>
                      <span className="SubContent" dangerouslySetInnerHTML={{ __html: value.subject }}></span>
                    </div>
                    : !msg?.sended && msg?.mesmedia.length == 0 ?
                      <div className='Bwt QOqBd' style={{
                        color: "#262626",
                        padding: "8px 16px",
                        maxWidth: "60%",
                        borderTopLeftRadius: prev && !prev?.sended && !msg?.sended && prev?.time_status === msg.time_status && prev.mesmedia.length == 0 && prev.type === msg.type ? "4px" : "0.9rem",
                        borderBottomLeftRadius: next && !next.sended && !msg.sended && next?.time_status === msg.time_status && next.mesmedia.length == 0 && next.type === msg.type ? "4px" : "0.9rem",
                        borderTopRightRadius: "0.9rem",
                        borderBottomRightRadius: "0.9rem",
                        marginTop: prev && !prev?.sended && !msg?.sended && prev?.time_status === msg.time_status && prev.mesmedia.length == 0 && prev.type === msg.type ? 0 : "0.6rem"
                      }}>
                        <span className="SubContent" dangerouslySetInnerHTML={{ __html: value?.subject }}></span>
                      </div>
                      :
                      null
                  }
                </>
                :

                <div className={`Fdo Anv nmjy ${!msg?.sended ? ' b2r' : ' ft4'}`} style={{ maxWidth: "60%", }}>
                  <div className='Fdo aovydwv3'>
                    {msg?.media > 0 && msg?.mesmedia.length > 0 ?
                      <>
                        {!msg?.sended && (
                          <div className='Fdo _4EzTm Aic Eho LCR vTu cgat1ltu ' style={{
                            border: "1px solid #e5e6ea",
                          }}>
                            <img className=" hty ELG hrt" src={src} />
                          </div>
                        )}
                        <div className=" Aic jifvfom9 owycx6da d76ob5m9 k4urcfbm rq0escxv" style={{ borderRadius: "0.9rem", overflow: "hidden" }}>
                          {msg?.price_value ?
                            <>
                              <MessageMoney value={value} client={client} msg={msg} />
                              {!msg.sended ?
                                <div className='Fdo ELG hty'>
                                  <button className='sqdOP Xdg L3NKy ZIAjV _Dvgb'>{msg?.price} {store.Util.c_user.devise}: debloquer</button>
                                </div>
                                :
                                <div className='Fdo bkfpd7mw'>{msg?.price} {store.Util.c_user.devise}</div>
                              }
                            </>
                            :
                            <>
                              {msg?.mesmedia.map((media, index) => (
                                <div key={index} className='kb5gq1qc pfnyh3mw hfv  hcukyx3x RpE'>
                                  {media?.progress ?
                                    <>
                                      <div className='RpE ni8dbmo4 stjgntxs fni8adji hgaippwi fykbt5ly ns4ygwem'
                                        style={{
                                          height: media.media_height ? media.media_height : 'auto', width: media.media_width,
                                          backgroundColor: '#efefef',
                                          borderTopRightRadius: msg.sended ? 4 : "0.9rem",
                                          borderBottomRightRadius: msg.sended ? 4 : '0.9rem',
                                          borderTopLeftRadius: !msg.sended ? 4 : '0.9rem',
                                          borderBottomLeftRadius: !msg.sended && msg.subject ? 4 : '',
                                          opacity: '0.5',
                                        }}>
                                        {media.media_type === 'video' ?
                                          <video className='k4urcfbm bixrwtb6 datstx6m Fdo' src={media.media_src} controls></video>
                                          :
                                          <img className='k4urcfbm bixrwtb6 datstx6m Fdo' src={media.media_src} />
                                        }
                                      </div>
                                      <div className="uploadProgressbar">
                                        <div className="barProgress" style={{ width: `${media.progress}%` }}> </div>
                                      </div>
                                    </> :
                                    <MediaLink post_id={msg?.id} media_id={media?.media_id} client={client}>
                                      <div className='RpE ni8dbmo4 stjgntxs fni8adji hgaippwi fykbt5ly ns4ygwem'
                                        style={{
                                          height: media?.media_height ? media?.media_height : 'auto', width: media.media_width,
                                          backgroundColor: '#efefef',
                                          borderTopRightRadius: msg?.sended ? 4 : "0.9rem",
                                          borderBottomRightRadius: msg?.sended ? 4 : '0.9rem',
                                          borderTopLeftRadius: !msg?.sended ? 4 : '0.9rem',
                                          borderBottomLeftRadius: !msg?.sended && msg?.subject ? 4 : '',
                                        }}>
                                        {media.media_type === 'video' ?
                                          <video className='k4urcfbm bixrwtb6 datstx6m Fdo' src={media?.media_src} controls></video>
                                          :
                                          <img className='k4urcfbm bixrwtb6 datstx6m Fdo' src={media?.media_src} />
                                        }
                                      </div>
                                    </MediaLink>
                                  }
                                </div>
                              ))}
                            </>
                          }

                          {msg?.subject && (
                            <div className='Fdo' style={{ justifyContent: msg?.sended ? 'flex-end' : 'flex-start', marginTop: 5 }}>
                              {msg.sended ?
                                <div className='Bwt Obm bBA'
                                  style={{
                                    color: "#f1f1f1",
                                    padding: "8px 16px",
                                    borderTopRightRadius: 4,
                                    borderBottomRightRadius: 4,
                                    borderTopLeftRadius: "0.9rem",
                                    borderBottomLeftRadius: "0.9rem"
                                  }}>
                                  <span className="SubContent" dangerouslySetInnerHTML={{ __html: value?.subject }}></span>
                                </div>
                                :
                                <div className='Bwt QOqBd' style={{
                                  color: "#262626",
                                  padding: "8px 16px",
                                  borderTopLeftRadius: 4,
                                  borderBottomLeftRadius: 4,
                                  borderTopRightRadius: '0.9rem',
                                  borderBottomRightRadius: "0.9rem"
                                }}>
                                  <span className="SubContent" dangerouslySetInnerHTML={{ __html: msg?.subject }}></span>
                                </div>
                              }
                            </div>
                          )}
                        </div>
                      </>
                      :
                      <>
                        {!msg?.sended && (
                          <div className='Fdo _4EzTm Aic Eho LCR vTu cgat1ltu ' style={{
                            border: next && !next?.sended ? "1px solid transparent" : "1px solid #e5e6ea",
                          }}>
                            {next && !next?.sended || !next &&
                              <img className="hty ELG hrt" src={src} />}
                          </div>
                        )}
                        {value?.media_process ?
                          <div className="j83agx80 Aic jifvfom9 owycx6da d76ob5m9 k4urcfbm rq0escxv">
                            <div className='Bwt ' style={{
                              color: "#ddd",
                              padding: "8px 16px",
                              borderTopLeftRadius: "0.9rem",
                              borderBottomLeftRadius: next && !next?.sended && !msg?.sended ? "4px" : "0.9rem",
                              borderTopRightRadius: "0.9rem",
                              borderBottomRightRadius: "0.9rem",
                              border: 'solid 1px #efefef'
                            }}>Chargement de l'image...</div>
                          </div>
                          :
                          <div className="Fdo Aic jifvfom9 owycx6da d76ob5m9 k4urcfbm rq0escxv">
                            <div className='Bwt ' style={{
                              color: "#ddd",
                              padding: "8px 16px",
                              borderTopLeftRadius: "0.9rem",
                              borderBottomLeftRadius: "0.9rem",
                              borderTopRightRadius: "0.9rem",
                              borderBottomRightRadius: "0.9rem",
                              border: 'solid 1px #efefef'
                            }}>message indisponible</div>
                          </div>}
                      </>
                    }
                  </div>
                </div>
              }
              {msg?.sended && !next && msg?.process && !msg?.error &&
                <div className="Eho LCR  _0PwGv  " >
                  <CircleEmpty size={14} />
                </div>
              }
              {msg?.sended && !next && msg?.error &&
                <div className='Fdo G6S'>
                  <IconErrorAlt size={14} />
                </div>
              }

              {msg?.sended && !next && !msg?.process && !msg?.error && !msg?.seen &&
                <div className="Eho LCR _0PwGv  " >
                  <Checked size={14} />
                </div>
              }
              {msg?.sended && !msg?.seen && !msg.process && !msg?.error || msg?.sended && msg?.seen && !msg.process && !msg?.error && next &&
                <div className="Eho LCR hft RpE   " >
                </div>
              }
              {next ? //vue
                <>
                  {msg?.sended && !next?.seen && msg?.seen && (
                    <div className="Eho LCR hft RpE _2dbep " >
                      <img src={src} className="hty ELG hrt ApE Udt" />
                    </div>
                  )}
                </>
                :
                <>
                  {msg?.seen && msg?.sended && (
                    <div className="Eho LCR hft RpE _2dbep ">
                      <img src={src} className="hty ELG hrt ApE Udt" />
                    </div>
                  )}
                </>
              }
            </div>
          </div>
    }
  </>
}
function MediaLink({ media_id, children, post_id, client }) {
  const location = useLocation();
  return (
    <Link to={`/inbox/${client}.media?message_id=${post_id}&media_id=${media_id}`} state={{ mediachat: location }}>
      {children}
    </Link>
  )
}

const MessageMoney = ({ value, msg, client }) => {
  return <div className='DivMessengerPremiumMedia kb5gq1qc pfnyh3mw hfv  hcukyx3x RpE'>
    {value?.mesmedia.map((media, index) => (
      <MediaLink post_id={msg?.id} media_id={media?.media_id} client={client} key={index}>
        <div className='RpE  ni8dbmo4 stjgntxs fni8adji hgaippwi fykbt5ly ns4ygwem'
          style={{
            backgroundColor: '#efefef',
          }}>
          <Image src={media?.media_src} />
        </div>
      </MediaLink>
    ))}
  </div>
}

const Image = React.memo(function Image({ src }) {
  return <img src={src} className='k4urcfbm bixrwtb6 datstx6m Fdo' />;
});