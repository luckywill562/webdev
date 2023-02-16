import React from "react";
import MyVerticallyCenteredModal from "../../../Components/modal/modalCore";
import { withRouter } from "../../util/WithRouter";
import SearchComponent from "../../Search/Search";
class Welcome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchUser: false
        }
    }
    newMessage = (payload) => {
        this.props.navigate(`/inbox/${payload.user_id}`);
    }
    render() {
        return <div className="Fdo Anv Bsj Lns Aic v4a">
            <div className="Fdo Anv Aic">
                <span className="SH1 tlK SMy Vft Ba2">Nouveau un message</span>
                <div className="Fdo Aic Lns">
                    <span className="g1lx Ba2 m9osqain ">
                        <svg height={150} width={150} className="sFc" viewBox="0 0 512 512"><path d="M431 320.6c0-4.4 1.2-8.6 3.3-12.2.6-1.1 1.4-2.1 2.1-3.1 17.4-26 27.6-57.1 27.6-90.3.3-92.2-77.5-167-173.7-167-83.9 0-153.9 57.1-170.3 132.9-2.4 11.1-3.7 22.4-3.7 34.2 0 92.3 74.8 169.1 171 169.1 15.3 0 35.9-4.6 47.2-7.7 11.3-3.1 22.5-7.2 25.4-8.3 2.9-1.1 6.1-1.7 9.3-1.7 3.6 0 7 .7 10.1 2l56.7 20.1s2.4 1 3.9 1c4.4 0 8-3.5 8-8 0-1-.5-2.7-.5-2.7L431 320.6z" /><path d="M318.5 392.5c-3.6 1-8.2 2.1-13.2 3.2-10.5 2.2-23.9 4.5-34 4.5-96.2 0-171-76.8-171-169.1 0-6.6.7-15 1.5-21.4.6-4.3 1.3-8.6 2.3-12.8 1-4.5 2.2-9 3.5-13.4l-8 7.1C66.8 219.2 48 260 48 302.5c0 29.3 8.5 57.5 24.8 82 2.3 3.5 3.6 6.2 3.2 8-.4 1.8-11.9 62-11.9 62-.6 2.9.5 5.8 2.7 7.7 1.5 1.2 3.3 1.8 5.1 1.8 1 0 2-.2 2.9-.6l56.1-22.1c1.8-.7 3.7-1.1 5.7-1.1 0 0 2.4-.2 6.3 1.3 18.9 7.4 39.8 12 60.7 12 46.6 0 90.4-20.1 120.1-55.1 0 0 3.2-4.4 6.9-9.6-3.7 1.3-7.9 2.6-12.1 3.7z" /></svg>
                    </span>
                </div>
                <div className='m7ETg messagerie Ba2'>
                    <span className='Lsy LDv'>Rechercher une personnes dans vos contact</span>
                </div>
                <div className="Fdo Ba2">
                    <button className="sqdOP Xdg L3NKy ZIAjV _Dvgb" onClick={() => this.setState({ searchUser: true })}>Nouveau message</button>
                    <MyVerticallyCenteredModal
                        show={this.state.searchUser}
                        onHide={() => this.setState({ searchUser: false })}
                        titre="Nouveau message"
                        size="sm"
                        nopadding="true">
                        <SearchComponent nextClick={this.newMessage} />
                    </MyVerticallyCenteredModal>
                </div>
            </div>
        </div>
    }
}
export default withRouter(Welcome)