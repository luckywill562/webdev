import React from 'react';
import {useQuery} from '@apollo/client';
import {FETCH_POSTS_QUERY} from "../../util/graphql";

import './Pannel-com.css'
function PannelCom({children }) {
    const{loading,data} = useQuery(FETCH_POSTS_QUERY);
    
    return <div className="communication-panel blured chats">
      <div className="wrapper">
          <div className="chat-list-wrapper">
              <div className="panel-block BjN completed">
                  <div className="row-wrapper">
                      <div className="header">
                          <h4 className="title">Mes contacts</h4>
                      </div>
                  </div>
                  <div className="row-wrapper content">
                      <div className="cell spinner-container">
                          <div className="nano has-scrollbar">
                              <div className="nano-content">
                              {loading ? (
                                 <p>Loading contacts..</p>
                                ) : (
                                  <ul className="events contacts">
                                  
                                    {data.usermatch.map((e) => (
                                      <li className="event-wrapper stale" key={e.id}>
                                          <div className="avatar-wrapper">
                                              <img src={`http://localhost/upload/avatar/th/${e.avatar}`} className="avatar" alt="com-pannel-avatar"/>
                                          </div>
                                          <div className="description">
                                              <span className="wrapper">
                                                  <span className="name-raw">
                                                      <span className="name">{e.name}</span>
                                                  </span>
                                              </span>
                                          </div>
                                      </li>
                                      ))}
                                  </ul>
                                  )}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  }
  
  export default PannelCom