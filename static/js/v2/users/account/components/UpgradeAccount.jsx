import React from "react";
import MyVerticallyCenteredModal from "../../../../Components/modal/modalCore";
import Fetch from "../../../util/Fetch";
import { LoadingXlContent } from "../../../icon/icons";
import Input from "../../../auth/Fields";
import { Button } from "../../../Components/fields/Fields";
import { useDispatch, useSelector } from 'react-redux'
import { closeAlertBox, showAlertBox } from "../../../redux/UtilRedux";
import { withRouter } from "../../../util/WithRouter";
const UpgradeAccount = (props) => {
    const [offers, setOffers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [choice, setChoice] = React.useState(undefined)
    const [password, setPassword] = React.useState('');
    const [process, setProcess] = React.useState(false);
    const store = useSelector((state => state));
    const dispatch = useDispatch();
    React.useEffect(() => {
        setLoading(true)
        var formData = new FormData();
        formData.append('url', 'RESTAPI/Jeton/offres')
        Fetch('/api', formData, res => {
            setLoading(false)
            if (res?.success === 1) {
                setOffers(res?.responses)
            } else {
                dispatch(showAlertBox(res))
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
        formData.append('url', 'RESTAPI/Payments/Jetons')
        formData.append("params", JSON.stringify(choice));
        formData.append("password", password)
        Fetch('/api', formData, (res) => {
            setProcess(false);
            props.close();
            dispatch(showAlertBox(res));
            setTimeout(() => {
                dispatch(closeAlertBox());
            }, 1500);
        })
    }
    return <MyVerticallyCenteredModal
        show={props.open}
        onHide={props.close}
        nopadding="true"
    >
        <div className="app-overlay purchase">
            <div className="overlay-container">
                <div className="inner" >
                    <div className="frame">
                        <span className="close" onClick={props?.close}>
                            <span className="cross">x</span>
                        </span>
                        <div className="content purchase">
                            <div className="choose-package-step-wrapper">
                                <div className="choose-package-step-header">
                                    Devenir premium et beneficier plus d'experience
                                </div>
                                <div className="choose-package-step">
                                    <div className="choose-package-step-item-header choose-plan">
                                        Choisir un plan:
                                    </div>
                                    <div className="choose-package-step-item-header get-benefits">
                                        Ce que vous pouvez faire en tant que premium:
                                    </div>
                                    {choice ?
                                        <div className="choose-package-step-item plans">
                                            <button className="two-steps-subscription-packages-list-item" >
                                                {choice?._name} POINTS
                                                <span>
                                                    {store?.Util?.c_user?.currency}  {choice?._price}
                                                </span>
                                                <span className="discount-percentage">
                                                    {choice?._delay}
                                                </span>
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
                                                    {offers?.map((element, index) => (
                                                        <button className="two-steps-subscription-packages-list-item" key={index} onClick={() => handleChoice(element)}>
                                                            {element?._name} POINTS
                                                            <span>
                                                                {store?.Util?.c_user?.currency}  {element?._price}
                                                            </span>
                                                            <span className="discount-percentage">
                                                                {element?._delay}
                                                            </span>
                                                        </button>
                                                    ))}
                                                </>
                                            }
                                        </div>
                                    }
                                    <div className="choose-package-step-item benefits">
                                        <div className="subscription-benefits list">
                                            <div className="subscription-benefit-item">
                                                <i className="icon subscription-benefit-item-icon subscription-benefits-icon blue-icon">

                                                </i>
                                                <div>
                                                    <span className="subscription-benefit-item-title">Chat gratuit</span> avec vos stars, crush ou match
                                                </div>
                                            </div>

                                            <div className="subscription-benefit-item">
                                                <i className="icon subscription-benefit-item-icon subscription-benefits-icon blue-icon">

                                                </i>
                                                <div>
                                                    <span className="subscription-benefit-item-title">Commentaires</span> illimités sur les photos ou publications
                                                </div>
                                            </div>

                                            <div className="subscription-benefit-item">
                                                <i className="icon subscription-benefit-item-icon subscription-benefits-icon blue-icon">

                                                </i>
                                                <div>
                                                    <span className="subscription-benefit-item-title">Match</span> illimités avec les personnes qui vous plait
                                                </div>
                                            </div>
                                            <div className="subscription-benefit-item">
                                                <i className="icon subscription-benefit-item-icon subscription-benefits-icon blue-icon">

                                                </i>
                                                <div>
                                                    <span className="subscription-benefit-item-title">Publications</span> de photo ou videos sans limite
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
export default withRouter(UpgradeAccount)