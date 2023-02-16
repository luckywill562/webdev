import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createContactsList } from '../../redux/ContactsRedux';
import { ExploreLoading } from '../../Template/Template';
import Fetch from '../../util/Fetch';
const PannelCom = () => {
    const store = useSelector((state) => state)
    const dispatch = useDispatch();
    const limit = 10
    const [loading, setLoading] = React.useState(false)
    const [nextloading, setNextLoading] = React.useState(false);
    const GetData = () => {
        let formData = new FormData();
        formData.append('limit', limit)
        formData.append('url', 'RESTAPI/Contacts/Contacts')
        Fetch('/contacts', formData, (res) => {
            dispatch(createContactsList(res.users))
            setLoading(false)
        })
    }
    React.useEffect(() => {
        if (store?.ContactsList?.length == 0) {
            setLoading(true)
            GetData();
        }
    }, [])
    return (
        <div className="chat-list-wrapper">
            <div className="panel-block completed">
                <div className="Fdo">
                    <div className="header page Fdo  Igw0E  mWe   IwRSH  Lns vwCYk Lsy LDv">
                        <h4 className="title">Contacts</h4>
                    </div>
                    <div className=''>
                        <Link to={`/contacts`}>voir tout</Link>
                    </div>
                </div>
                <div className="row-wrapper content">
                    <div className="cell spinner-container">
                        <div className="nano has-scrollbar">
                            <div className="nano-content">
                                {loading ?
                                    <ExploreLoading length={3} />
                                    :
                                    <ul className="events contacts">
                                        {store?.ContactsList?.map(users => (
                                            <li className="event-wrapper stale" key={users?.user_id}>
                                                <div className="">
                                                    <Link to={`/inbox/${users?.user_id}`} className="RpE Ngt Hsu ElL" style={{ display: "block" }}>
                                                        <div className="Lsy LDv RpE Ngt Hsu Fdo Aic Bcg" style={{ minHeight: "44px" }}>
                                                            <div className="Fdo Anv RpE" style={{ margin: "4px 6px 4px auto" }}>
                                                                <div className="_2dbep" style={{ height: "28px", width: "28px" }}>
                                                                    <img data-src={users?.avatar?.x26} className="hty ELG hrt lazyload" alt="com-pannel-avatar" />
                                                                </div>
                                                            </div>
                                                            <div className="description _7UhW9   xLCgt  MMzan   fDxYl  ">
                                                                <div className="R19PB">
                                                                    <span className="_7UhW9   xLCgt  MMzan  se6yk">{users?.first_name}</span>
                                                                </div>
                                                            </div>
                                                            <div className='Hgfrt'></div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                }
                                {!loading && store?.ContactsList?.length == 0 &&
                                    <div className='v2ao Ert'>Aucun contact trouvé.</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)

}
export default PannelCom