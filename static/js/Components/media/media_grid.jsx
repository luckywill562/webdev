import React from 'react'
import { Link } from 'react-router-dom'
class GridOneMedia extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            media: props.media,
            card_width: props.card_width
        }
    }

    componentDidMount(){
        this.setState({card_width: $('.post-card').width()})
        $(window).on("resize",()=>{
            this.setState({card_width: $('.post-card').width()})
        });
    }
    
    render(){
        const media = this.state.media[0]
        const card = this.state.card_width
        const calculHeight = card * media.media_height / media.media_width
        const styleHeight = {height: calculHeight}
        return(
            <div className="item-grid" style={styleHeight}>
                <div className="Media-container">
                    <Link to='/'>
                        <img className="ELG" src={media.media_src}/>
                    </Link>
                </div>
            </div>
        )
    }
}

class GridtwoMedia extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            media: props.media,
            card_width: props.card_width
        }
    }

    componentDidMount(){
        this.setState({card_width: $('.post-card').width()})
        $(window).on("resize",()=>{
            this.setState({card_width: $('.post-card').width()})
        });
    }
    
    render(){
        const media1 = this.state.media[0]
        const media2 = this.state.media[1]
        const card = this.state.card_width
        const media1autoHeight = card/2-2 * media1.media_height / media1.media_width
        const media2autoHeight = card/2-2 * media2.media_height / media1.media_width
        if(media1.media_height > media2.media_height){
            var mediaContainerStyle = {"height": media1autoHeight}
        }else{
            var mediaContainerStyle = {"height": media2autoHeight}
        }
        return(
            <div className="Media-container" style={mediaContainerStyle}>
            <div className="post-media-grid Post-media-Double" style={mediaContainerStyle}>
                <Link to='/'>
                    <img className="img-scale" src={media1.media_src}/>
                </Link>
            </div>
            <div className="post-media-grid Post-media-Double" style={mediaContainerStyle}>
                <Link to='/'>
                    <img className="img-scale" src={media2.media_src}/>
                </Link>
            </div>
            </div>
        )
    }
}

export default class Mediagrid extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            media: props.media,
            media_count: props.media_count,
            card_width: 502
        }
    }

    
    render(){
        return(
            <div className="Post-media btb Pbggc bwt">
                    {this.state.media_count === 1 ? 
                    <GridOneMedia media={this.state.media} card_width={this.state.card_width}/>
                    :this.state.media_count === 2 ?
                    <GridtwoMedia media={this.state.media} card_width={this.state.card_width}/>
                    :null}
            </div>
        )
    }
}