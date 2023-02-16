import React from "react";
import { BtnCloseX , VideoPlayIcon } from "../../../Template/Template";
const SpecialContent = (props) => {
    const hiddenFileInput = React.createRef(null);
    const handlehiddenFileInput = event => {
        hiddenFileInput.current.click();
    };
    const onInput = (e) => {
        props.imageChange(e);
        hiddenFileInput.current.value = '';
    }
    const priceChange = (e)=>{
        let value = +e.target.value
        if (typeof (value) === 'number' && value < 1000000 && value >= 0) {
            props.setPrice(value)
        }
    }

    return <div className="MediaSpecialMessangeDiv">
        <div className="Fdo messagerie-container sLayout" style={{ padding: 0, height: '100%' }}>
            <div className="container-box messages-wrapper">
                <div className="Fdo messages-listing">
                    <div className="messages-list-wrapper">
                        <div className="messages-list-header">
                            <div className="messages-list-title">Pack personalisé</div>
                        </div>
                        <div className="conversation-list-content">
                            <div className="side-bar-message-wrapper message-scrollabled-list messagerie">
                                <div className='Fdo aovydwv3 pybr56ya Kmm'>
                                    <button onClick={handlehiddenFileInput} className="sqdOP Xdg L3NKy ZIAjV Bsj Bgu ">Ajouter des photos des videos</button>
                                </div>
                                <input className='mkhogb32'
                                    accept="image/jpeg,image/jpg,image/png,video/mp4"
                                    type="file"
                                    multiple
                                    onChange={onInput}
                                    style={{ display: 'none' }}
                                    ref={hiddenFileInput}
                                />
                                <div className="">
                                    <div className="_7UhW9    mWe   KV-D4   uL8Hv ">Prix:{props.price}AR</div>
                                </div>
                                <div className='Fdo aovydwv3 pybr56ya Kmm'>
                                    <input name="AlbumTitle" className="Text-form" value={props.price} onChange={priceChange} placeholder="ajouter un prix" />
                                </div>
                                <div className='Fdo aovydwv3 pybr56ya Kmm'>
                                    <input placeholder='votre message' className="Text-form" />
                                </div>
                            </div>
                        </div>
                        <div className="conversation-footer">
                            <div className="Fdo aovydwv3 pybr56ya Kmm Pap">
                                <button className="sqdOP Xdg L3NKy ZIAjV  Bsj _8A5w5 Rav" onClick={()=>props.setSpecialContent(false)}>Anuller</button>
                                <button className="sqdOP Xdg L3NKy ZIAjV Bsj _Dvgb Ftg">Envoyer</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="messages-text-container RpE"  >
                    <div className="conversation-container">
                        <div className=" Fdo Pac Cdf ELG vgh">
                            <div className="Fdo jifvfom9 lhclo0ds pybr56ya vcx Kmm tw6a2znq d76ob5m9 k4urcfbm rq0escxv">
                                <Preview Medias={props.Medias} DeleteImage={props.deleteImage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default SpecialContent
const Preview = (props) => {
    let row = [];

    for (let index = 0; index < props.Medias.length; index++) {
        const mediaType = props.Medias[index].type.split('/')[0];
        row.push(
            <>
                <div className='kb5gq1qc pfnyh3mw rs0gx3tq tvfksri0 w0hvl6rk hcukyx3x RpE' key={index} style={{ height: 150, width: 150 }}>
                    <div className='RpE ni8dbmo4 bBB stjgntxs fni8adji hgaippwi fykbt5ly ns4ygwem' style={{ height: 120, width: 150 }}>
                        <div className="Fdo Aic vrb vsa nwf6jgls Lns">
                            {mediaType === 'video' ?
                                <>
                                    <div className="photo-container ApE v1d">
                                        <div className="Fdo hty ELG Aic Lns">
                                            <VideoPlayIcon />
                                        </div>
                                    </div>
                                    <video src={URL.createObjectURL(props.Medias[index])}></video>
                                </>
                                :
                                <img className='idiwt2bm nwf6jgls d2edcug0 dbpd2lw6' src={URL.createObjectURL(props.Medias[index])} alt="Thumb" />
                            }

                        </div>
                    </div>
                    <div className='Fdo pmk7jnqg nezaghv5 e712q9ov'>
                        <BtnCloseX onClick={() => props.DeleteImage(index)} />
                    </div>
                </div>
            </>
        )
    }
    return row
}
