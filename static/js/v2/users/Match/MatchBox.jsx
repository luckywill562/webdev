import React from "react";
import Container from "../../Components/Container";
import Fetch from "../../util/Fetch";
import { withRouter } from "../../util/WithRouter";
class MatchBox extends React.Component {
    constructor(props) {
        super(props);   
    }
    componentDidMount(){
        var formData = new FormData();
            formData.append('with_id', this.props.useParams.with_id);
            formData.append('url', 'RESTAPI/Match/match')
            Fetch('/api', formData, res => {
               console.log(res);
            })
    }
    render() {
        return (
            <Container>
                <h1>Vous avez un match</h1>
            </Container>
        )
    }
}
export default withRouter(MatchBox)