import Fetch from "../../util/Fetch";
export default function GetConversation(setStates,client_id) {
    setStates('client_id',client_id);
    var formData = new FormData();
    formData.append('url', 'RESTAPI/views/getmsg')
    formData.append('client_id', client_id)
    Fetch('/conversation', formData,
        data => {
            const status = +data.status
            setStates(status);
            if (data.success === 1) {
                this.setState({ getConversation: data.messages })
                this.setState({ client_user: data.client.user })
                this.setState({ avatar_x26: data.client.user.user_avatar.medium })
            }
        }
    )
}