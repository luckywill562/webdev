// This is a React Router v6 app
import React from "react";
import { Link } from 'react-router-dom'
import LoveUserComponent from "../users/Components/Buttons/LoveUserComponent";
import Fetch from "../util/Fetch";
import { BottomAffichage } from "../Template/Template";
import Button from "../../Components/button/button";
import { Camera, Close, LoadingXlContent } from "../icon/icons";
import { useDispatch, useSelector } from "react-redux";
import { createUserFilterSlice, spliceUserFilter } from "../redux/UserFilterRedux";
import Filtre from "./Filtre";
import { changeNextStatus, closeAlertBox, showAlertBox } from "../redux/UtilRedux";
import { CardHomeLoading } from "../Template/Loading";

const Home = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false)
  const [animation, setAnimation] = React.useState(false)
  const [fadeout, setFadeout] = React.useState(false)

  const store = useSelector((state) => state);
  const users = store.UserFilter
  const [nextLoading, setNextLoading] = React.useState(false)
  const getUserMatch = () => {
    var formData = new FormData();
    if (users.length > 0) {
      var id = users.map((e) => {
        return e.user.user_id
      })
      setNextLoading(true);
    } else {
      setLoading(true);
      var id = 0;
    }
    formData.append('url', './RESTAPI/Filtre/GetUserFilter')
    formData.append('max_age', store.Util.Filtre.max_age)
    formData.append('min_age', store.Util.Filtre.min_age)
    formData.append('sex_search', store.Util.Filtre.sex_type)
    formData.append('idlist', id)
    formData.append('limit', 9)
    Fetch('/api', formData, data => {
      if (data?.success === 1) {
        dispatch(createUserFilterSlice(data?.data?.users));
        dispatch(changeNextStatus({ name: 'user_search', value: data?.data?.has_next_page }));
      }
      setNextLoading(false)
      setTimeout(() => {
        setAnimation(true)
        setTimeout(() => {
          setLoading(false)
          setFadeout(true);
        }, 0, 5);
      }, 0, 5);
    })
  }
  const onRetire = (id) => {
    dispatch(spliceUserFilter(id));
    var action = "remove"
    var formData = new FormData()
    formData.append('action', action)
    formData.append('url', 'RESTAPI/Filtre/delete')
    formData.append('user_id', id)
    Fetch('./api', formData, data => {
      dispatch(showAlertBox(data));
      setTimeout(() => {
        dispatch(closeAlertBox());
      }, 2000);
    })
  }
  React.useEffect(() => {
    if (users.length === 0 && store.Next_Page.user_search) {
      getUserMatch();
    } else {
      setLoading(false)
      setAnimation(true);
    }
  }, [])

  return <>
    {users.length === 0 && !loading &&
      <div className="Fdo Fdo Anv Aic">
        <div className="Fdo SH1">Aucun resultat selon la configuration de votre filtre</div>
        <div>Configurer le filtre a nouveau si vous voulez voir d'avantage</div>
      </div>
    }
    {loading ?
      <CardHomeLoading /> :
      <div className="people-wrapper Fdo">
        {users.map(e => (
          <div className={`member-wrapper  BjN animated-alement ${animation && 'animate'}`} key={e.user.user_id}>
            <Link to={`/${e.user.username}`} className="profile-card ">
              <div className="thumbnail">
                <img data-src={e.user.avatar} alt="" className="photo lazyload" />
                <div className="counters">
                  <div className="photos-counter">
                    <Camera size={22} />
                    <div className="count">{e.photo_count}</div>
                  </div>
                </div>
              </div>
              <div className="Bare-new">
                <div className="">Nouveau</div>
              </div>
              <div className="info-content">
                <div className="JGf PLP">
                  <LoveUserComponent type="button" user={e.user} />
                  <div className="LmP p1c">
                    <button className="Fdo sqdOP  L4fx ZIAjV Fbd BjN" onClick={(event) => {
                      event.preventDefault()
                      onRetire(e.user.user_id)
                    }}>
                      <Close />
                    </button>
                  </div>
                </div>
                <div className="profile-info">
                  <div className="brief-info has-led">
                    <div className="user-container">
                      <span className="age" dangerouslySetInnerHTML={{ __html: e.user.first_name }}></span>
                      <span>,{e.age}</span>
                      {e.user.online ?
                        <div className="rSxHQ df2d"></div>
                        :
                        <div className="rSxHQ df2d" style={{ backgroundColor: '#BABABA' }}></div>
                      }
                    </div>
                  </div>
                </div>
                <div className="about">
                  <div className="about-me">
                    <AboutItem label={"Sexe"} content={e.user.user_gender} />
                    <AboutItem label={"Age"} content={e.age} />
                    <AboutItem label={"Rélation accepté"} content={e.accepted_relationship} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))
        }
      </div>
    }
    <div className="Fdo Aic Lns" style={{ marginBottom: '100px' }}>
      {!loading && !nextLoading && users.length != 0 && store.Next_Page.user_search &&
        <Button variant="_Dvgb" onClick={getUserMatch}>Voir plus</Button>
      }
      {nextLoading &&
        <LoadingXlContent />
      }
      {!loading && users.length > 0 && !store.Next_Page.user_search &&
        <BottomAffichage titre={'Fin de la suggestion'} texte={'Configurer le filtre si vous voulez voir d\'avantage'} />
      }
    </div>
    <Filtre />
  </>
}
export default Home;

function AboutItem({ label, content }) {
  return <div style={{ lineHeight: "1.7" }}>
    <span className="mWe">{label}: </span>
    <span className="mWe">{content}</span>
  </div>
}