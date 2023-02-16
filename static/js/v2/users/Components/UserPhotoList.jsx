import React, { Component } from "react";
import { Link } from "react-router-dom";
import fetch from "../../util/fetch";
import { withRouter } from "../../util/WithRouter";
import { BtnPlusContent, LoadingXlContent } from "../../icon/icons";
class UserPhotoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      loading: false,
      userid: this.props.useParams.id,
      page: 0,
      prevY: 0,
      limit: 20,
      plus: false,
      album_title: "",
      album_description: "",
      photoPreviewcount: 0
    };
  }

  getPhotos = (page, user_id, limit) => {
    this.setState({ loading: true });
    var formData = new FormData();
    formData.append('url', '/RESTAPI/Album/user_album')
    formData.append('user_id', user_id)
    formData.append('page', page)
    formData.append('limit', limit)
    fetch('/api', formData,
      (res) => {
        console.log(res);
        this.setState({ photos: [...this.state.photos, ...res.album.media_list] });
        this.setState({ loading: false });
        if (res.album.media_list.length < limit) {
          this.setState({ plus: false });
        } else {
          this.setState({ plus: true })
        }
      }
    )
  }

  componentDidMount() {
    this.setState({ photos: [...this.state.photos, ...this.props.media] });
    this.setState({ loading: false });
    if (this.props.media.length < 20) {
      this.setState({ plus: false });
    } else {
      this.setState({ plus: true })
    }
    var options = {
      root: null,
      rootMargin: "350px",
      threshold: 1.0
    };

    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options,
    );
    this.observer.observe(this.loadingRef);
  }
  componentWillUnmount() {

  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y - 400;
    if (this.state.prevY > y) {
      this.plusBtn();
    }
    this.setState({ prevY: y });
  }
  plusBtn = () => {
    if (this.state.photos != []) {
      const entries = this.state.photos;
      const lastPhoto = entries[this.state.photos.length - 1];
      if (this.state.photos.length > 0) {
        var curPage = lastPhoto.id;
      } else {
        var curPage = 0;
      }
      if (this.state.plus === true && !this.state.loading) {
        this.getPhotos(curPage, this.state.userid, this.state.limit);
        this.setState({ page: curPage });
      }
    }
  }

  fakeGrid = () => {
    let row = [];
    for (let i = 0; i < 5; i++) {
      row.push(
        <div className="photo-gri" key={i}>
         
        </div>
      )
    }
    return row;
  }
  render() {
    return (
      <div className="aBv Ba2 g4R Nxz">

        {this.state.photos.length > 0 ?
          <div className="Fdo Cdf kzZ" style={{ margin: "-4px" }}>
            {this.state.photos.map(e => (
              <div key={e.id} className="photo-gri">
                <div className="photo-wrapper">
                  <div className="Fdo Anv Dfv PSb">
                    <Link
                      to={`/album/${e.album_id}/${e.id}`} className="photo-container">
                      <img data-src={e.image_url} className="lazyload" alt={e.id} />
                    </Link>
                    {e.photocount > 1 &&
                      <div className="page CzVzU">
                        <div className="" style={{ padding: "8px" }}>
                          <svg height="22" width="22" className="gUZ" color="#fff" viewBox="0 0 512 512"><path d="M154.7 464h266.7c23.5 0 42.7-19.2 42.7-42.7V154.7c0-23.5-19.2-42.7-42.7-42.7H154.7c-23.5 0-42.7 19.2-42.7 42.7v266.7c0 23.4 19.2 42.6 42.7 42.6z" /><path d="M90.7 48h266.7c23.5 0 42.7 19.2 42.7 42.7V96H138.7C115.2 96 96 115.2 96 138.7V400h-5.3C67.2 400 48 380.8 48 357.3V90.7C48 67.2 67.2 48 90.7 48z" /></svg>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            ))}
            <this.fakeGrid />
          </div>
          :
          <div className="gtb">
            <h3>L'utilisateur n'a pas encore de photo</h3>
          </div>
        }
        <div ref={loadingRef => (this.loadingRef = loadingRef)}>
          {this.state.loading &&
            <LoadingXlContent />
          }
          {!this.state.loading && this.state.plus &&
            <BtnPlusContent onclick={this.plusBtn} />
          }
        </div>
      </div>
    );
  }
}

export default withRouter(UserPhotoList);
