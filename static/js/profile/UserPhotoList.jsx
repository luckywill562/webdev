import React, { Component } from "react";
import {Link} from "react-router-dom";
import fetch from '../util/async'
import Loading from '../Components/app/loading'
import Button from '../Components/button/button'
import CreatePhotoAlbum from '../Components/modal/CreatePhotoAlbum'
import Input from '../Components/auth/Fields'
import {
  useParams,
} from "react-router-dom";
export default function getParam(props){
  let { topicId} = useParams();
  return(<UserPhotoList user={topicId} isUser={props.isUser}/>);
}
 class UserPhotoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      loading: false,
      userid: props.user,
      page: 0,
      prevY: 0,
      limit: 20,
      plus: false,
      album_title: "",
      album_description: "",
      photoPreviewcount: 0
    };
  }

  getPhotos = (page,user_id,limit) =>{
    this.setState({ loading: true });
    var formData = new FormData();
    formData.append('url','/photos')
    formData.append('user_id', user_id)
    formData.append('page', page)
    formData.append('limit', limit)
    fetch('/api',formData,
        (res)=>{
            this.setState({ photos: [...this.state.photos, ...res.photos] });
            this.setState({ loading: false });
             if(res.photos.length < limit){
                 this.setState({plus: false});
             }else{
                 this.setState({plus: true})
             }
        }
    )
  }

  componentDidMount() {
    this.getPhotos(this.state.page,this.state.userid,this.state.limit);
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };
   
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }
 

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      if(this.state.photos != []){
        const entries = this.state.photos;
        const lastPhoto = entries[this.state.photos.length - 1];
        if(this.state.photos.length >0){
          var curPage = lastPhoto.id;
        }else{
          var curPage = 0;
        }
        if(this.state.plus === true){
            this.getPhotos(curPage,this.state.userid,this.state.limit);
            this.setState({ page: curPage });
        }
      }
    }
    this.setState({ prevY: y });
  }

  UploadPhotoPreview=()=>{
    $(this).PreviewFunctionUploadPhoto();
  }

  UploadPhoto = (e)=>{
    e.preventDefault();
    $(this).UploadPhotoPreview();
  }
  /* change la valeur du filtre age state*/
  handleChange = (e)=>{
    const name = e.target.name
    this.setState({[name]: e.target.value});
  }
  createAlbum = ()=>{
    return(
      <>
        {this.props.isUser ? 
        <form className="PostFormData" id="add_name" encType="multipart/form-data" method="POST" onSubmit={this.UploadPhoto}>
          <div className="LPN xcv L4E zI7 iyn Hsu Aic E6d">
            <div className="LPN L4E">
              <span className="vx-z">
                <div className="bt-open">
                  <div className="text-box-open">
                    <a href="#" className="pBj">
                      <div className=" RpG pIc RlF">
                        <span className="js-add-pic-icon">
                          <svg width="24" height="24" viewBox="0 0 32 32" fill="#45bd62"><g><path d="M 17,2C 8.716,2, 2,8.716, 2,17S 8.716,32, 17,32S 32,25.284, 32,17S 25.284,2, 17,2z M 23.708,15.708 c-0.39,0.39-1.024,0.39-1.414,0L 18,11.414L 18,27 C 18,27.552, 17.552,28, 17,28S 16,27.552, 16,27L 16,11.414 L 11.708,15.708 c-0.39,0.39-1.024,0.39-1.414,0c-0.39-0.39-0.39-1.024,0-1.414l 6-6C 16.296,8.29, 16.298,8.29, 16.3,8.288 c 0.090-0.088, 0.198-0.162, 0.316-0.21c 0.244-0.102, 0.52-0.102, 0.764,0C 17.504,8.128, 17.614,8.2, 17.708,8.292l 6,6 C 24.098,14.684, 24.098,15.316, 23.708,15.708z"></path></g></svg>
                        </span>
                        <div className="photo-text-open">Photos</div>
                      </div>
                      <div className="input-file-open">
                        <input type="file" multiple="1" name="imagevdfrfrf"  onChange={this.UploadPhotoPreview} className="fn_3" />
                      </div>
                    </a>
                  </div>
                </div>
              </span>
            </div>
          </div>
        <div className="upload-view pbD">
          <div className="preview-container LPN"></div>
          {$(self).countImagesPosts() > 0 ?
          <Button variant="primaire" type="submit">Uploader</Button>: <></>}
        </div>
        </form>:''
        }
      </>
    )
  }

  render() {

    // Additional css
    const loadingCSS = {
      height: "1px"
    };

    // To change the loading icon behavior
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

    return (
        <div className="aBv Ba2 g4R Nxz">
          <div className="Fdo Aic" style={{marginBottom: "16px"}}>
            <div className="Fdo" style={{marginBottom:"-6px",marginTop:"-6px"}}>
            <h2>Photos</h2>
            </div>
            {this.props.isUser ? 
            <CreatePhotoAlbum>
              <div className="Fdo Anv ELG">
                <div className="">
                <Input type="text" onChange={this.handleChange} value={this.state.album_title} name="album_title">Donnez un Nom a l'album</Input>
                </div>
                <div className="">
                  <label htmlFor="album_description">Decrivez votre album en quelque mots</label>
                <textarea type="text" onChange={this.handleChange} className="Text-form" value={this.state.album_description} name="album_description">Donnez un Nom a l'album</textarea>
                </div>
                ou
                <this.createAlbum/>
              </div>
            </CreatePhotoAlbum>
            :""}
          </div>
          {this.state.photos.length != 0 ? 
          <div className="Fdo Cdf kzZ" style={{margin:"-4px"}}>
          {this.state.photos.map(e => (
              <div key={e.id} className="photo-gri">
                <div className="photo-wrapper">
                  <div className="Fdo Anv Dfv PSb">
                    <Link to="/render" className="photo-container">
                        <img src={e.image_url} alt={e.id}/>
                    </Link> 
                    {e.photocount > 1 ?
                    <div className="page CzVzU">
                      <div className="" style={{padding:"8px"}}>
                      <svg aria-label="Carrousel" color="#ffffff" fill="#ffffff" height="22" role="img" viewBox="0 0 48 48" width="22"><path d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z"></path></svg>
                      </div>
                    </div> :""}
                  </div>
                </div>
              </div>
          ))}
          
          </div>
          :<div className="gtb">
            <h3>L'utilisateur n'a pas encore de photo</h3>
          </div>
          }
        <div ref={loadingRef => (this.loadingRef = loadingRef)} style={loadingCSS}>
          <Loading style={loadingTextCSS}/>
        </div>
      </div>
    );
  }
}
