import React from "react";
import { withRouter } from "../../util/WithRouter";
import Fetch from '../../util/Fetch'
import { CardAuthorTemplate } from "../../Template/Template";
import { Button } from "react-bootstrap";
const InterestedList = (props) => {
    const [loading, setLoading] = React.useState(false)
    const [InterestedList, setInterestedList] = React.useState([]);
    React.useEffect(() => {
        setLoading(true);
        var formData = new FormData();
        formData.append('url', '/RESTAPI/Rencard/getInterestedList')
        formData.append('post_id', props.useParams.id)
        Fetch('/api', formData, (res) => {
            setLoading(false)
            setInterestedList(res.payload)
        })
    }, [])
    const Chose = (element) => {
        console.log(element)
    }
    return <div className="Fdo Anv">
        {loading ?
            <div>loading...</div>
            :
            <>
                {InterestedList.map((element) => (
                    <div className="Ert">
                        <CardAuthorTemplate author={element}>
                            <Button onClick={()=>Chose(element)}>choisir</Button>
                        </CardAuthorTemplate>
                    </div>
                ))}
            </>
        }
    </div>
}
export default withRouter(InterestedList)