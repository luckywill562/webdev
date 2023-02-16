import React from "react";
import MyVerticallyCenteredModal from "../../../Components/modal/modalCore";
import { LoadingXlContent } from "../../icon/icons";
import fetch from "../../util/Fetch";
import { withRouter } from "../../util/WithRouter";
import Input from "../../auth/Fields";
import { Button } from "../../Components/fields/Fields";
import { useDispatch, useSelector } from 'react-redux'
import { showAlertBox } from "../../redux/UtilRedux";
const FollowPremium = (props) => {
    const [offers, setOffers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [choice, setChoice] = React.useState(undefined)
    const [password, setPassword] = React.useState('');
    const [process, setProcess] = React.useState(false);
    const store = useSelector((state => state));
    const dispatch = useDispatch();
    React.useEffect(() => {
        setLoading(true);
        let formData = new FormData();
        const params = { user_id: props?.user?.user_id }
        formData.append('url', 'RESTAPI/Users/PremiumOffer')
        formData.append("params", JSON.stringify(params));
        fetch('/api', formData, (res) => {
            setLoading(false);
            if (res.success === 1) {
                setOffers(res?.results)
            } else {

            }
        })
    }, [])
    const handleChoice = (params) => {
        setChoice(params)
    }
    const handleChange = (e) => {
        setPassword(e.target.value)
    }
    const handleSubmit = (e) => {
        setProcess(true)
        let formData = new FormData();
        formData.append('url', 'RESTAPI/Users/BecomePremium')
        formData.append("params", JSON.stringify(choice));
        formData.append("password", password)
        fetch('/api', formData, (res) => {
            setProcess(false);
            if (res.success === 1) {
                console.log(res)
            } else {

            }
            dispatch(showAlertBox(res));
        })
    }
    return <MyVerticallyCenteredModal
        show={true}
        onHide={() => props.navigate(-1)}
        nopadding="true"
    >
        <div className="app-overlay purchase">
            <div className="overlay-container">
                <div className="inner" >
                    <div className="frame">
                        <span className="close" onClick={() => props.navigate(-1)}>
                            <span className="cross">x</span>
                        </span>
                        <div className="content purchase">
                            <div className="choose-package-step-wrapper">
                                <div className="choose-package-step-header">
                                    <div className="_2dbep" style={{ height: 100, width: 100 }}>
                                        <img src={props?.user?.avatar} className="hty ELG hrt" />
                                    </div>
                                    Devenir abonné gold a  {props?.user?.username}
                                </div>
                                <div className="choose-package-step">
                                    <div className="choose-package-step-item-header choose-plan">
                                        Choisir un Plan:
                                    </div>
                                    <div className="choose-package-step-item-header get-benefits">
                                        Ce que vous pouvez faire si vous etes gold:
                                    </div>
                                    {choice ?
                                        <div className="choose-package-step-item plans">
                                            <button className="two-steps-subscription-packages-list-item">
                                                {choice?.delay}
                                                <span>
                                                    {choice?.saved > 0 &&
                                                        <span className="full-price">{store?.Util?.c_user?.currency} {choice?.price}</span>
                                                    }
                                                    {store?.Util?.c_user?.currency}   {choice?.saved_price}
                                                </span>
                                                {choice?.saved > 0 &&
                                                    <span className="discount-percentage">
                                                        REMISE {choice?.saved}%
                                                    </span>
                                                }
                                            </button>
                                            Taper votre mot de passe pour confirmer
                                            <div className="Lwe">
                                                <Input value={password} type={'password'} onChange={handleChange} placeholder="mot de passe" name={"password"} />
                                            </div>
                                            <div className="Lwe">
                                                <Button onClick={handleSubmit} type="btn" variant="btn" isLoading={process} >Proceder au payment</Button>
                                            </div>
                                            <div className="Lwe">
                                                <Button onClick={() => setChoice(undefined)} type="btn" variant="btn TKi86 iol">Choisir un autre offre</Button>
                                            </div>
                                        </div>
                                        :
                                        <div className="choose-package-step-item plans">
                                            {loading ?
                                                <LoadingXlContent />
                                                :
                                                <>
                                                    {offers?.map((e, index) => (
                                                        <button className="two-steps-subscription-packages-list-item" onClick={() => handleChoice(e)} key={index}>
                                                            {e?.delay}
                                                            <span>
                                                                {e?.saved > 0 &&
                                                                    <span className="full-price">{store?.Util?.c_user?.currency} {e?.price}</span>
                                                                }
                                                                {store?.Util?.c_user?.currency}   {e?.saved_price}
                                                            </span>
                                                            {e?.saved > 0 &&
                                                                <span className="discount-percentage">
                                                                    REMISE {e?.saved}%
                                                                </span>
                                                            }
                                                        </button>

                                                    ))}
                                                </>
                                            }
                                            {!loading && offers?.length === 0 &&
                                                <div className=" choose-plan">
                                                    Aucun offre disponnible
                                                </div>
                                            }
                                        </div>
                                    }
                                    <div className="choose-package-step-item benefits">
                                        <div className="subscription-benefits list">
                                            <div className="subscription-benefit-item">
                                                <i className="icon subscription-benefit-item-icon subscription-benefits-icon blue-icon">

                                                </i>
                                                <div>
                                                    <span className="subscription-benefit-item-title">Contenu privé</span> Accèss gratuit aux contenus privé
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MyVerticallyCenteredModal>
}
export default withRouter(FollowPremium)