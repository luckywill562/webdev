import Fetch from "../../util/Fetch";

const getInbox = (result,page,limit) => {
    var formData = new FormData();
    formData.append('url', '/RESTAPI/Chat/inbox');
    formData.append('page', page);
    formData.append('limit', limit);
    formData.append('data_type', 'messages_list')
    Fetch('/inbox', formData, data => {
        result(data)
    })
}
export { getInbox }