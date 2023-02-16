import React from 'react';

export default function MsgTmp({ index, value, list, c_user, client, src, sender_id }) {
  const msg_list = list.slice()
  const next = msg_list[index + 1]
  const prev = msg_list[index - 1]
  return (<div
    style={{
      display: "flex",
      justifyContent: +c_user === +value.sender_id ? "flex-end" : "flex-start",
      paddingBottom: "1px"
    }}
  >
    <div style={{
      display: "flex",
      flexDirection: +c_user === +value.sender_id ? "column" : "row",
      flexGrow: 1,
      alignItems:'flex-end'
    }}>
    {value.subject && +value.media === 0 ?
      <>
        {client === value.sender_id && (
          <div style={{
            height: 30,
            width: 30,
            marginRight: "0.5em",
            border: next && next.sender_id != c_user ? "1px solid transparent" : "1px solid #e5e6ea",
            borderRadius: 50,
            overflow: "hidden",
            alignItems: "center"
          }}>
            {next && next.sender_id != c_user ? <></> :
              <img className="hty ELG hrt" src={src} />}
          </div>
        )}
        {c_user === sender_id ?
          <div
            style={{
              color: "#f1f1f1",
              padding: "8px 16px",
              maxWidth: "60%",
              background: "rgb(0, 132, 255)",
              borderTopRightRadius: prev && prev.sender_id === c_user && c_user === sender_id ? "4px" : "1.5rem",
              borderBottomRightRadius: next && next.sender_id === c_user && c_user === sender_id ? "4px" : "1.5rem",
              borderTopLeftRadius: "1.5rem",
              borderBottomLeftRadius: "1.5rem"
            }}>

            <span className="SubContent" dangerouslySetInnerHTML={{ __html: value.subject }}></span>

          </div> : <div style={{
            color: "#262626",
            padding: "8px 16px",
            maxWidth: "60%",
            background: "#E4E6EC",
            borderTopLeftRadius: prev && prev.sender_id != c_user && c_user != sender_id ? "4px" : "1.5rem",
            borderBottomLeftRadius: next && next.sender_id != c_user && c_user != sender_id ? "4px" : "1.5rem",
            borderTopRightRadius: "1.5rem",
            borderBottomRightRadius: "1.5rem"
          }}>
            <span className="SubContent" dangerouslySetInnerHTML={{ __html: value.subject }}></span>
          </div>
        }
      </>
      :
      <div className={client != value.sender_id ? 'Fdo Anv b2r' : 'Fdo Anv ft4'} style={{ maxWidth: "60%", }}>
        {value.subject.length > 0 && (
          <div style={{ display: 'flex', justifyContent: client != value.sender_id ? 'flex-end' : 'flex-start' }}>
            {value.subject != '' && (
              <>
                {client === value.sender_id && (
                  <div style={{
                    height: 30,
                    width: 30,
                    marginRight: "0.5em",
                    border: next && next.sender_id != c_user ? "1px solid transparent" : "1px solid #e5e6ea",
                    borderRadius: 50,
                    overflow: "hidden",
                    alignItems: "center"
                  }}>
                    {next && next.sender_id != c_user ? <></> :
                      <img className="hty ELG hrt" src={src} />}
                  </div>
                )}
              </>
            )}
            {c_user === sender_id ?
              <div
                style={{
                  color: "#f1f1f1",
                  padding: "8px 16px",
                  background: "rgb(0, 132, 255)",
                  borderTopRightRadius: "1.5rem",
                  borderBottomRightRadius: "4px",
                  borderTopLeftRadius: "1.5rem",
                  borderBottomLeftRadius: "1.5rem"
                }}>
                <span className="SubContent" dangerouslySetInnerHTML={{ __html: value.subject }}></span>
              </div> : <div style={{
                color: "#262626",
                padding: "8px 16px",
                background: "#E4E6EB",
                borderTopLeftRadius: "1.5rem",
                borderBottomLeftRadius: next && next.sender_id != c_user && c_user != sender_id ? "4px" : "1.5rem",
                borderTopRightRadius: "1.5rem",
                borderBottomRightRadius: "1.5rem"
              }}>
                <span className="SubContent" dangerouslySetInnerHTML={{ __html: value.subject }}></span>
              </div>
            }
          </div>
        )}
        <div className='Fdo'>
          {list[index].media === '1' && list[index].mesmedia.length > 0 ?
            <>
              {client === value.sender_id && (
                <div style={{
                  display: 'flex',
                  flex: '0 0 auto',
                  height: 30,
                  width: 30,
                  marginRight: "0.5em",
                  border: next && next.sender_id != c_user ? "1px solid transparent" : "1px solid #e5e6ea",
                  borderRadius: 50,
                  overflow: "hidden",
                  alignItems: "center"
                }}>
                  {next && next.sender_id != c_user ? <></> :
                    <img className="hty ELG hrt" src={src} />}
                </div>
              )}
              <div className="j83agx80 bp9cbjyn jifvfom9 owycx6da d76ob5m9 k4urcfbm rq0escxv">
                {value.mesmedia.map((media, index) => (
                  <div key={index} className='kb5gq1qc pfnyh3mw  rs0gx3tq  hcukyx3x l9j0dhe7'>
                    <div className='l9j0dhe7 ni8dbmo4 stjgntxs fni8adji hgaippwi fykbt5ly ns4ygwem'>
                      <img className='k4urcfbm bixrwtb6 datstx6m q9uorilb' src={media.media_src} />
                    </div>
                  </div>
                ))}
              </div>
            </>
            :
            <>
              {+client === +value.sender_id && (
                <div style={{
                  display: 'flex',
                  flex: '0 0 auto',
                  height: 30,
                  width: 30,
                  marginRight: "0.5em",
                  border: next && next.sender_id != c_user ? "1px solid transparent" : "1px solid #e5e6ea",
                  borderRadius: 50,
                  overflow: "hidden",
                  alignItems: "center"
                }}>
                  {next && next.sender_id != c_user ? <></> :
                    <img className="hty ELG hrt" src={src} />}
                </div>
              )}
              {value.media_process ?
                <div className="j83agx80 bp9cbjyn jifvfom9 owycx6da f10w8fjw d76ob5m9 k4urcfbm rq0escxv">
                  <div>Chargement de l'image...</div>
                </div>
                :
                <div className="j83agx80 bp9cbjyn jifvfom9 owycx6da f10w8fjw d76ob5m9 k4urcfbm rq0escxv">
                  <div>Piece jointe indisponnible</div>
                </div>}
            </>
          }
        </div>
      </div>}
    {next ? 
    <>
        {list[index].sender_id === c_user && +next.status === 0 && +list[index].status === 1 && (
          <div style={{
            width: '16px',
            height:'16px',
            overflow: 'hidden',
            borderRadius: 50,
            margin:4
          }}>
            <img src={src} className="hty ELG hrt"/>
          </div>
        )}
      </>
     :<>
     {+list[index].status === 1 &&(
       <div style={{
        width: '16px',
        height:'16px',
        overflow: 'hidden',
        borderRadius: 50,
        margin:4
      }}>
        <img src={src} className="hty ELG hrt"/>
      </div>
     )}
     </>
     }
    </div>
  </div>)
}