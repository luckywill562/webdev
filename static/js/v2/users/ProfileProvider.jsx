import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { withRouter } from "../util/WithRouter";
import { Main } from "./Components/Main";
import { Modal } from "./Components/Modal";

class ProfileProvider extends React.PureComponent {
    render(){
        const background = this.props.location.state && this.props.location.state.background;

        return (
            <div className="App" style={{marginTop:70}}>
                <h1>profile</h1>
                <Routes location={background || location}>
                    <Route path="/" element={<Main />}>
                        <Route path="/modal" element={<Modal />} />
                    </Route>
                </Routes>
                {background && (
                    <Routes>
                        <Route path="modal" element={<Modal />} />
                    </Routes>
                )}
            </div>
        );
    }
}

export default withRouter(ProfileProvider);

function Home() {
    const location = useLocation();
    const background = location.state && location.state.background;

    return (
        <div className="App">
            <Routes location={background || location}>
                <Route path="/" element={<Main />}>
                    <Route path="/modal" element={<Modal />} />
                </Route>
            </Routes>
            {background && (
                <Routes>
                    <Route path="modal" element={<Modal />} />
                </Routes>
            )}
        </div>
    );
}
