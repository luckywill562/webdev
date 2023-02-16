import React from 'react';
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import { withRouter } from '../../util/WithRouter';
import Container from '../../Components/Container';
import Account from './components/Account'
import { MenuTemplate } from '../../Template/Template';
import { IconCurrency } from '../../icon/icons';
import Fetch from '../../util/Fetch';
import { LoadingXlContent } from '../../icon/icons';
import Jeton from './components/Jeton';
import CreateTransactions from './components/CreateTransaction';
class Balance extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            soldes: [],
            solde: '',
            transactions: [],
            loading: true,
            open: false,
        }
    }
    componentDidMount() {
        let data = new FormData();
        data.append('url', '/RESTAPI/Accounts/soldes');
        data.append('name', this.state.name);
        data.append('username', this.state.username);
        data.append('bio', this.state.bio);
        Fetch('/api', data, res => {
            if (res.success === 1) {
                this.setState({ soldes: res.solde, transactions: res.transactions, loading: false });
            }
        })
    }
    close = () => {
        this.setState({ open: false })
    }
    render() {
        const soldes = this.state.soldes;
        return (
            <Container>
                <div className='Fdo Bcg Nfb ELG Flk main-app-width Pap'>
                    <div className="Fdo messagerie-container sLayout">
                        <div className="container-box messages-wrapper">
                            <div className="Fdo messages-listing">
                                <div className="messages-list-wrapper">
                                    <div className="messages-list-header">
                                        <div className="messages-list-title">Soldes</div>
                                        <div className="icon-message-seting">
                                            <IconCurrency size={24} />
                                        </div>
                                    </div>
                                    <div className="conversation-list-content">
                                        <div className="side-bar-message-wrapper message-scrollabled-list">
                                            <div>
                                                <MenuTemplate to="/account" path={this.props.location.pathname}>
                                                    Dépots, transfert, Rétrait
                                                </MenuTemplate>
                                                <MenuTemplate path={this.props.location.pathname} to="/account/transactions">
                                                    Historiques des Transactions
                                                </MenuTemplate>
                                                <MenuTemplate to="/account/points" path={this.props.location.pathname}>
                                                    Mes points
                                                </MenuTemplate>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="messages-text-container">
                                <div className="conversation-container">
                                    <div className='conversation-header messagerie'>
                                        <div className='S-mcP Fdo messagerie'>
                                            <div className='AjEzM messagerie'>
                                                <div className='m7ETg messagerie'>
                                                    <div className='Fdo Aic'>
                                                        <div className='Fdo Bsj sqdOP'>
                                                            Total
                                                        </div>
                                                        <div className='Fdo'>
                                                            <span className='Lsy LDv'>{soldes.total}</span>
                                                            <span>{soldes.devise}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.loading ? <LoadingXlContent /> :
                                        <Routes>
                                            <Route path="/" element={<CreateTransactions />} />
                                            <Route path="/transactions" element={<Account session_user={this.props.session_user} transactions={this.state.transactions} devise={soldes.devise} />} />
                                            <Route path="/points" element={<Jeton />} />
                                            <Route path="*" element={<Navigate to="/404" replace />} />
                                        </Routes>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}
const Balanc = () => {
    React.useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3d3cudGFrYWxvLm1nIiwiYXVkIjoid3d3LnRha2Fsby5tZyIsImlhdCI6MTY2NzIyNTc2OCwiZXhwIjoxNjY3MjM0MzY4LCJkYXRhIjp7InVzZXJfaWQiOiIxIn19.GbuKx0KAzXFnbkiDQyn1KzmgEMtGSQgj7yJq3ZLEJQs");
        myHeaders.append("X-Requested-With", "XMLHttpRequest");

        var formdata = new FormData();
        formdata.append("email", "takalo1@gmail.com");
        formdata.append("password", "92930955");
        formdata.append("user_id", "1");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("localhost:8001/user", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }, [])
    return <Container>
        <h1>hello world</h1>
    </Container>
}
export default withRouter(Balance);
