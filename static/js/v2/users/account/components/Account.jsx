import React from "react";
import { ArrowUp, ArrowDown, Swap, IconCurrency } from "../../../icon/icons";
export default class Balance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className="Fdo Pap Anv hty vgh">
                <div className="Fdo ELG Anv Vnk Kmm hty">
                    {this.props.transactions.length < 1 ?
                        <div className="Fdo Anv Bsj Lns Aic">
                            <div className="Fdo Anv Aic">
                                <span className="SH1 tlK SMy Vft Ba2">Aucune activités</span>
                                <div className="Fdo Aic Lns ">
                                    <span className="g1lx Ba2 m9osqain "><Swap size={100} /></span>
                                </div>
                                <div className="Fdo Ba2">
                                    <button className="sqdOP Xdg L3NKy ZIAjV _Dvgb">Deposer de l'argent</button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="Fdo Cdf kzZ">
                            {this.props.transactions.map((e, index) => (
                                <div className="photo-gri" key={index}>
                                    <div className="photo-wrapper">
                                        <div className="Fdo Anv Dfv PSb BjN Ngt">
                                            <div className="Fdo Anv Lns v2ao Lsy LDv pbD ">
                                                <div className="Fdo Lns pbD">
                                                    <span className="Lsy LDv">{e.transaction_date}</span>
                                                </div>
                                                <div className="v2ao Lsy LDv pbD ">
                                                    <h4>{e.transaction_name}</h4>
                                                </div>
                                                <div className="Fdo Lns pbD">
                                                    <span className="lZJ">
                                                        {e.transaction_type === 'D' &&
                                                            <ArrowDown size={32} />
                                                        }
                                                    </span>
                                                    <span className="g1lx">
                                                        {e.transaction_type === 'T' &&
                                                            <ArrowUp size={32} />
                                                        }
                                                    </span>
                                                    <span className="g1lx">
                                                        {+e.transaction_type === 3 &&
                                                            <IconCurrency size={32} />
                                                        }
                                                    </span>
                                                </div>
                                                <div className="Fdo Lns pbD">
                                                    <div className="messages-list-title">
                                                        <span className="Lsy LDv">{e.montant}</span>
                                                        <span className="LDv">{this.props.devise}</span>
                                                    </div>
                                                </div>
                                                <div className="info">
                                                    <span dangerouslySetInnerHTML={{ __html: e.info }}></span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="photo-gri">

                            </div>
                            <div className="photo-gri">
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}