import React, { Suspense, useEffect, lazy } from "react";
import { Link, Outlet, Route, Routes, Navigate } from "react-router-dom";
import { withRouter } from "../util/WithRouter";
import { useDispatch, useSelector } from "react-redux"
import Fetch from "../util/Fetch";
import { addTask, createCircleList } from "../redux/CercleRedux";
import AllSubject from "./Components/AllSubject";
import CreateCircle from "../Create/CreateCircle";
import { CircleList } from "./Components/Template";
import { PeopleIcon } from "../icon/icons";
const Discussions = lazy(() => import("./discussions/Discussions"));
const Circle = (props) => {
    const dispatch = useDispatch();
    const circles = useSelector((state) => state.circles);
    useEffect(() => {
        if (circles.length === 0) {
            let formData = new FormData();
            formData.append('url', '/RESTAPI/Circle/CircleList')
            Fetch('/circles', formData, res => {
                if (res.success === 1) {
                    dispatch(createCircleList(res?.groups));
                }
            })
        }
    }, []);
    const background = props.location.state && props.location.state.background;

    return (
        <>
            <Routes location={background || location}>
                <Route path="/" element={<Outlet />}>

                    <Route index element={
                        <div className="Fdo aBv FGM nF1 CenterContainer">
                            <div className="Fdo Anv Pac">
                                <div className="post-card ">
                                    <div className="Fdo Lsy LDv Ert Vpe">
                                        <div className="Fdo Aic Bsj">
                                            <div className="SH1 tlK SMy Vft Bsj">Groupe de discussions</div>
                                            <div className="Fdo">
                                                <Link to='/create-circle' state={{ background: props.location }} className="Fdo sqdOP _kjyt  hrdfpoiu  Bgu ZIAjV">
                                                    <div className="Fdo Aic">
                                                        <svg className="gUZ U9O kVc" width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g><path d="M 9,18L 16,18 l0,7 C 16,25.552, 16.448,26, 17,26S 18,25.552, 18,25L 18,18 l 7,0 C 25.552,18, 26,17.552, 26,17 C 26,16.448, 25.552,16, 25,16L 18,16 L 18,9 C 18,8.448, 17.552,8, 17,8S 16,8.448, 16,9L 16,16 L 9,16 C 8.448,16, 8,16.448, 8,17C 8,17.552, 8.448,18, 9,18z"></path></g></svg>
                                                    </div>
                                                    <div className="mWe gtriop">Créer</div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="Fdo Ba2 lhclo0ds">
                                    {circles?.length > 0 ?
                                        <div className="Fdo Cdf kzZ" style={{ margin: -4 }}>
                                            {circles.map((element, index) => (
                                                <CircleList element={element} key={index} />
                                            ))}
                                            <FakeGrid />
                                        </div>
                                        :
                                        <div className="Fdo Anv Pac">
                                            <div className="alert-info info oocd">
                                                <div className="Fdo">
                                                    <div className="icon-info">
                                                        <PeopleIcon size={24}/>
                                                    </div>
                                                    <div className="content">
                                                        <h2>Discuter avec un groupe de personne</h2>
                                                        <p>Un cercle vous permet de discuter avec un ou plusieurs personnes en meme temps sans avoir l'autorisation de ce dernier</p>
                                                        <p> </p>
                                                        <Link to='/create-circle' state={{ background: props.location }}  className="btn">Nouveau cercle</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>

                            </div>
                        </div>
                    } />
                    <Route path='/inbox/:circle_id' element={
                        <Suspense fallback={'loading...'}>
                            <Discussions list={circles} />
                        </Suspense>
                    }
                    />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                </Route>
            </Routes>
            {background && (
                <Routes>
                    <Route path="create-circle" element={<CreateCircle />} />
                </Routes>
            )}
        </>
    )
}

const FakeGrid = () => {
    let row = [];
    for (let i = 0; i < 15; i++) {
        row.push(
            <div className="circle-list-grid" style={{ paddingTop: 0, paddingBottom: 0 }} key={i}> </div>
        )
    }
    return row;
}
const CircleMemo = React.memo(Circle)
export default withRouter(CircleMemo)