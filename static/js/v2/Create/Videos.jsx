import React from "react";
import Fetch from "../util/Fetch";
const Videos = () => {
    const [files, setFiles] = React.useState(undefined)
    const _ = (abc)=> {
        return document.getElementById(abc);
    }
    const handleChange = (e)=>{
        setFiles(e.target.files[0])
    }
   const uploadFileHandler = async()=> {
        var file = files;
        var formdata = new FormData();
        formdata.append("uploadingfile", file);
        formdata.append('url', 'RESTAPI/Album/upload');
        var ajax =await  new XMLHttpRequest();
        ajax.upload.addEventListener("progress", progressHandler, false);
        ajax.addEventListener("load", completeHandler, false);
        ajax.addEventListener("error", errorHandler, false);
        ajax.addEventListener("abort", abortHandler, false);
        ajax.open("POST", "index.php", true);
        ajax.send(formdata);
    }
    const  progressHandler = (event)=> {
        var loaded = new Number((event.loaded / 1048576));//Make loaded a "number" and divide bytes to get Megabytes
        var total = new Number((event.total / 1048576));//Make total file size a "number" and divide bytes to get Megabytes
       console.log(loaded.toPrecision(5))
       var percent = (event.loaded / event.total) * 100;
       console.log(Math.round(percent))
    }
    const  completeHandler=(event) => {
        console.log('complete')
    }
    const  errorHandler = (event) =>{
    }
    const abortHandler = (event) => {
    }
    return <>
        <form id="upload_form" enctype="multipart/form-data" method="post">
            <div className="form-group">
                <input type="file" name="uploadingfile" onChange={handleChange} id="uploadingfile" />
            </div>
            <div className="form-group">
                <input className="btn btn-primary" type="button" value="Upload File" name="btnSubmit"
                    onClick={uploadFileHandler} />
            </div>
            <div className="form-group">
                <div className="progress" id="progressDiv">
                    <progress id="progressBar" value="0" max="100" ></progress>
                </div>
            </div>
            <div className="form-group">
                <h3 id="status"></h3>
                <p id="uploaded_progress"></p>
            </div>
        </form>
    </>
}
export default Videos