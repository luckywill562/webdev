import fetch from "../../util/fetch";
export const GetPostsfunc = (page, postLimit, action) => {
        let formData = new FormData();
        formData.append('page', page)
        formData.append('limit', postLimit)
        formData.append('url', './RESTAPI/Status/Posts')
        fetch('/posts', formData, (res) => {
            action(res.posts) 
        })
}