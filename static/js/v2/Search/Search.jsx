import React from "react";
import { NavbarSearch } from "../Components/fields/Fields";
import Fetch from "../util/Fetch";
import { ExploreLoading,NameContainer } from "../Template/Template";
import { Checked, CircleSelected } from "../icon/icons";
import { CircleEmpty } from "../icon/icons";
const SearchComponent = (props) => {
    const [state, stateSet] = React.useState({
        disabled: false,
        loading: false
    });
    const [query, setQ] = React.useState('');
    const [typingTimeout, settypingTimeout] = React.useState(0)
    const [result, setResult] = React.useState([]);
    const [selected, setSelected] = React.useState(undefined);
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
    const onSelect = (index) => {
        if (selected === index) {
            setSelected(undefined)
        } else {
            setSelected(index)
        }
    }
    return <div>
        <div className="Fdo Anv Lsy LDv">
            {selected != undefined &&
                <div className="Fdo Vpe">
                    <div className="Fdo ELG info-content" >
                        <div className="Fdo oocd Aic Ngt mWe">
                            <div className="Fdo Lsy LDv Ert Vpe">
                                <div className="Fdo">
                                    {result[selected].first_name}
                                </div>
                                <div className="Lsy">
                                    <span className="pIc" onClick={() => setSelected(undefined)}>x</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Fdo">
                        <button className=" lZJ v1d sqdOP Lbdf  L3NKy ZIAjV" onClick={()=>props.nextClick(result[selected])}>suivant</button>
                    </div>
                </div>
            }
            <div className="Fdo Anv RpE KNH Ftg Rav">
                <NavbarSearch onSearch={onSearch} />
            </div>
        </div>

        <div className="Fdo Anv">
            <div className="Eom">
                {state.loading ?
                    <div className="Lnl">
                        <ExploreLoading length={3} />
                    </div>
                    :
                    <>
                        {result.map((e, index) => (
                            <div key={index} className="Lnl jb3vyjys qt6c0cv9">
                                <div className="page Bsj ElL pIc" onClick={() => onSelect(index)}>
                                    <div className="Fdo Aic Lsy LDv Ert Vpe">
                                        <div className='Fdo ELG yC0tu'>
                                            <div className="Fdo yC0tu">
                                                <div className='Fdo Post-Author-Identity--Avatar Xs-User-Avatar UiOplink d-flex'>
                                                    <img src={e.avatar.medium} className="lazyload" />
                                                </div>
                                            </div>
                                            <NameContainer top={e.first_name} bottom={`@${e.username}`} />
                                        </div>
                                        <div className='Fdo'>
                                            {selected === index ?
                                                <div className='lZJ Lsy'>
                                                    <CircleSelected size={24} />
                                                </div>
                                                :
                                                <CircleEmpty />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                }
            </div>
        </div>
    </div>
}
export default SearchComponent