import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../auth/Fields";
import { Button } from "../../../../Components/fields/Fields";
import {CircleSelected } from "../../../../icon/icons";
import { showAlertBox } from "../../../../redux/UtilRedux";
import Search from "../../../../Search/Search";
import Fetch from "../../../../util/Fetch";
const Send = (props) => {
    const [price, setPrice] = React.useState(0);
    const [step, setStep] = React.useState(1);
    const [user, setUser] = React.useState({});
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [messages, setMessages] = React.useState({});

    const dispatch = useDispatch();
    const store = useSelector((state) => state)
    const devise = store.Util?.c_user?.currency
    const HandleChangePricea = (event) => {
        let value = +event.target.value
        if (typeof (value) === 'number' && value < 1000000 && value >= 0) {
            setPrice(value)
        }
    }
    const handleNext = (step) => {
        if (price > 0) {
            setStep(step)
        }
    }
    const searchNext = (payload) => {
        setUser(payload)
        handleNext(step + 1)
    }
    const HandleChange = (e) => {
        setPassword(e.target.value)
    }
    const SendMoney = () => {
        setLoading(true);
        var formData = new FormData();
        formData.append('montant', price)
        formData.append('user_id', user.user_id)
        formData.append('password', password)
        formData.append('url', 'RESTAPI/Transactions/Send')
        Fetch('/api', formData, res => {
            setLoading(false)
            setMessages(res)
            dispatch(showAlertBox(res));
            if (res.success === 0) {
                props.closeModal()
            }
        })
    }
    return <>
        {step === 1 ?
            <div className="g4R aBv ">
                <div className=" page            qF0y9          Igw0E   rBNOH           CcYR1  ybXk5     _4EzTm                                                                                                              ">
                    <div className="page wBKMS">
                        <div className="_7UhW9    vy6Bb   mWe   KV-D4   uL8Hv    ">
                            Entrer montant
                        </div>
                    </div>
                </div>
                <div className='Fdo Ert  text-group'>
                    <input className='Text-form' type="text" value={price} onChange={HandleChangePricea} name="montant" placeholder='Entrer un montant' />
                    <div className='Fdo input-group-text'>{devise}</div>
                </div>
                <div className="Fdo aovydwv3 pybr56ya Kmm">
                    <Button variant="_Dvgb" onClick={() => handleNext(step + 1)}>suivant</Button>
                </div>
            </div>
            : step === 2 && price > 0 ?
                <div className="Fdo Anv">
                    <Search nextClick={searchNext} />
                </div>
                : step === 3 && user ?
                    <>
                        <div className="Fdo Anv Aic v2ao">
                            <div className="_2dbep Xs-User-Avatar">
                                <img src={user.avatar.x56} className="hty ELG hrt lazyload" />
                            </div>
                            <div className="e2ler">{user.first_name}</div>
                            <div className="sqdOP ">Envoyer {price.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })} {devise} vers @{user.username}</div>
                        </div>
                        <div className="Fdo Anv Lsy LDv">
                            {messages && messages.success === 1 ?
                                <div className="Fdo Anv Aic Lnl">
                                    <span className="g1lx">
                                        <CircleSelected size={32} />
                                    </span>
                                    <span>{messages.message}</span>
                                </div>
                                :
                                <div className="Lnl">
                                    <div className="Fdo Lns Aic Anv">
                                        <Input type="password" onChange={HandleChange} value={password} name="password" placeholder="Votre mot de passe" />
                                    </div>
                                    <div className="Fdo Vnk">
                                        <Button variant="_Dvgb" isLoading={loading} onClick={SendMoney}>Envoyer</Button>
                                    </div>
                                </div>
                            }
                        </div>
                    </>
                    :
                    null
        }
    </>
}
export default Send