import React from "react";
import MyVerticallyCenteredModal from "../../Components/modal/modalCore";
import { Button, NavbarSearch } from "../Components/fields/Fields";
import { withRouter } from "../util/WithRouter";
import { NameContainer, ExploreLoading } from "../Template/Template";
import { CircleSelected, CircleEmpty } from "../icon/icons";
import Fetch from "../util/Fetch";
import Input from "../auth/Fields";
import { useDispatch } from "react-redux";
import { createCircleList, UnshiftNewCercle } from "../redux/CercleRedux";
import { showAlertBox } from "../redux/UtilRedux";
const CreateCircle = (props) => {
    const [state, stateSet] = React.useState({
        disabled: false,
        loading: false
    });
    const [query, setQ] = React.useState('');
    const [typingTimeout, settypingTimeout] = React.useState(0)
    const [result, setResult] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    const [step, setStep] = React.useState(1);
    const [circleName, setCircleName] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch()
    const nextStep = () => {
        if (selected.length > 0) {
            setStep(2);
        } else {
            alert('ajouter au moins un membre');
        }
    }
    const HandleChange = e => {
        setCircleName(e.target.value)
    }
    const newCircle = () => {
        setLoading(true);
        var formData = new FormData();
        formData.append('members', JSON.stringify(selected))
        formData.append('circle_name',circleName )
        formData.append('url', 'RESTAPI/Circle/create')
        Fetch('/api', formData, res => {
            console.log(res)
            if(res.success === 1){
                dispatch(UnshiftNewCercle(res?.res));
            }
            setLoading(false)
            dispatch(showAlertBox(res));
            props.navigate(-1)
        })
    }
    const search = () => {
        stateSet({ loading: true })
        var formData = new FormData();
        formData.append('q', query)
        formData.append('url', 'RESTAPI/Search/users')
        Fetch('/api', formData, res => {
            stateSet({ loading: false })
            setResult(res.users)
        })
    }
    const onSearch = (e) => {
        setQ(e.target.value)
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        settypingTimeout({
            typingTimeout: setTimeout(() => {
                if (query.length > 0) {
                    search()
                }
            }, 1000)
        })
    }
    const onSelect = (user) => {
        const selectedSlice = selected.slice();
        const find = selected.findIndex((element => element.user_id === user.user_id));
        if (find < 0) {
            selectedSlice.push(user);
            setSelected(selectedSlice)
        } else {
            selectedSlice.splice(find, 1)
            setSelected(selectedSlice)
        }
    }
    const deleteMember = (user) => {
        const selectedSlice = selected.slice();
        const find = selectedSlice.findIndex((element => element.user_id === user));
        if (find > -1) {
            selectedSlice.splice(find, 1)
            setSelected(selectedSlice)
        }
    }
    const row = [];
    result.forEach((e, index) => {
        const find = selected.find((element => element.user_id === e.user_id));
        row.push(
            <div key={index} className="Lnl jb3vyjys qt6c0cv9">
                <div className="page Bsj ElL pIc" onClick={() => onSelect(e)}>
                    <div className="Fdo Aic Lsy LDv Ert Vpe">
                        <div className='Fdo ELG yC0tu'>
                            <div className="Fdo yC0tu">
                                <div className='Fdo Post-Author-Identity--Avatar Xs-User-Avatar UiOplink d-flex'>
                                    <img src={e?.avatar?.medium} className="lazyload" />
                                </div>
                            </div>
                            <NameContainer top={e?.first_name} bottom={`@${e?.username}`} />
                        </div>
                        <div className='Fdo'>
                            {!find ?
                                <CircleEmpty />
                                :
                                <div className='lZJ Lsy'>
                                    <CircleSelected size={24} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    return <MyVerticallyCenteredModal
        show={true}
        onHide={() => props.navigate(-1)}
        nopadding="true"
        size={'gift'}
    >
        <div className="Fdo Anv">
            {step === 1 ?
                <div className="page Anv Vpe Lsy  LDv">
                    <div className="Lsy LDv">
                        <div className="Fdo Ert Vpe">
                            <span className="yTZ mWe">
                                Ajouter des membres
                            </span>
                        </div>
                    </div>
                    {selected.length > 0
                        &&
                        <div className="Fdo Vpe">
                            <div className="Fdo ELG info-content lhclo0ds" >
                                {selected.map((element) => (
                                    <div className="Fdo oocd Aic Ngt mWe" key={element.user_id} style={{ margin: '0 4px 4px 0' }}>
                                        <div className="Fdo Lsy LDv Ert Vpe Aic">
                                            <div className="Fdo yC0tu">
                                                <div className='Fdo Post-Author-Identity--Avatar' style={{ height: 32, width: 32 }}>
                                                    <img src={element?.avatar?.medium} className="lazyload" />
                                                </div>
                                            </div>
                                            <div className="Fdo">
                                                {element.first_name}
                                            </div>
                                            <div className="Lsy">
                                                <span className="pIc" onClick={() => deleteMember(element.user_id)}>x</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="Fdo">
                                <button className=" lZJ v1d sqdOP Lbdf  L3NKy ZIAjV" onClick={nextStep}>suivant</button>
                            </div>
                        </div>
                    }
                    <div className="Fdo Anv RpE KNH Ftg Rav">
                        <NavbarSearch onSearch={onSearch} />
                    </div>

                    <div className="Fdo Anv">
                        <div className="Eom">
                            {state.loading ?
                                <div className="Lnl">
                                    <ExploreLoading length={3} />
                                </div>
                                :
                                <>
                                    {row}
                                </>
                            }
                        </div>
                    </div>
                </div>
                :
                step === 2 ?
                    <div className="page Anv Vpe Lsy  LDv">
                        <div className="Lsy LDv">
                            <div className="Fdo Ert Vpe">
                                <span className="yTZ mWe">
                                    Donner un nom a votre groupe de discussions
                                </span>
                            </div>
                        </div>
                        <div className="Fdo Anv RpE">
                            <Input placeholder={'Donner un nom'} value={circleName} onChange={HandleChange}></Input>
                        </div>
                        <div className="Fdo aovydwv3 pybr56ya">
                            <Button variant="_Dvgb" onClick={newCircle} isLoading={loading}>Suivant</Button>
                        </div>
                    </div>
                    :
                    null

            }
        </div>

    </MyVerticallyCenteredModal>
}
export default withRouter(CreateCircle)