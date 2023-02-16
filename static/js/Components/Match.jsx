import React from "react";
import { Link } from "react-router-dom";
import globe from '../../globe.png'
import people from '../../people.png'
export default class Matchpeople extends React.Component{
  constructor(){
    super();
    this.state = {
      list: [],
      error: null,
      loading: false,
      plus: [],
      url: './home'
    }
  }
  
  componentDidMount(){
    this.setState({ loading: true });
    ajax(this.state.url, {url:this.state.url} , {params: {},
      success: (data)=>{
        this.setState({list: data.users});
        this.setState({ loading: false });
        this.setState({plus:data.users})
      }
      }
    )
    
  }
ready = () =>{
    this.setState({ loading: true });
    const idfetched = this.state.list;
    let id = idfetched.map(e => {
      return e.user_id
    })

    const list = this.state.list.slice()
    ajax(this.state.url, {url:this.state.url,idlist:id} , {params: {},
      success: (data)=>{
        data.users.map(e => {
          list.push(e)
        })
        
        this.setState({list:list})
        this.setState({ loading: false });
        this.setState({plus: list})
        if(data.users == '' || data.users.length < 1){
          this.setState({plus:[]})
        }
      }
      }
    )   
}


render(){
    // Additional css
    const loadingCSS = {
      height: "100px"
    };
    // To change the loading icon behavior
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };
    const btnplusStyle = {display: this.state.loading || this.state.plus.length == 0 ? "none" : "block"}
    return (
      <>
      <div className="Left-pannel">
      <div className="Pannel-container Scroll-pannel">
        <div className="jsx-1067475104 scroll-wrapper side-scroll-wrapper jsx-239834881">
          <div className="jsx-3451294568 side-bar fixed">
            <div>
              <div className="jsx-3451294568 nav-wrapper">
                <Link to="/" className="jsx-3451294568 nav-item activ">
                  <img src={people} className="globe" />
                  <h2 className="jsx-3451294568 nav-name">Decouvrir</h2>
                </Link>
              <Link to="/discussion" className="jsx-3451294568 nav-item">
                <img src={globe} className="globe" />
                <h2 className="jsx-3451294568 nav-name">Discussion</h2>
                </Link>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  <div className="explore-container">
    <div className="people-wrapper FGM">
      <ul className="found-members">
        {this.state.list.map(e => (
        <li className="member-wrapper" key={e.user_id}>
        <Link to={`/people/${e.user_id}`} className="profile-card BjN">
            <div className="thumbnail">
                <img src={e.src} alt="" className="photo"/>
                <div className="placeholder"></div>
                <div className="counters">
                    <div className="photos-counter">
                        <div className="count">{e.age}</div>
                    </div>
                </div>
            </div>
            <div className="profile-info">
                  <div className="brief-info has-led">
                      <p className="user-container">
                          <span>{e.name}</span>
                      </p>
                  </div>
            </div>
            <div className="about">
                <div className="about-me">
                    <span>{e.few_words}</span>
                </div>
            </div>
        </Link>
    </li>
    ))}
<li className="member-wrapper" style={loadingCSS}>
  <span style={loadingTextCSS}>Chargement...</span>
  <button className="btn btn-danger" style={btnplusStyle} onClick={this.ready}>Afficher plus</button>
</li>
</ul>
  </div>
  </div>
  </>
    );
  }
}