import React from "react";
import { LoadingXlContent } from "../icon/icons";
import { BtnPlusContent } from "../icon/icons";
class InfiniteScroll extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            prevY: 0,
        }
    }

    componentDidMount() {
        var options = {
            root: null,
            rootMargin: this.props.margin ? this.props.margin:"350px",
            threshold: 1.0
        };

        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options,
        );
        this.observer.observe(this.loadingRef);
    }
    
    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y && y >0) {
            this.next()
        }
        this.setState({ prevY: y });
    }
    next = ()=>{
        if(this.props.next_page && !this.props.loading){
            this.props.next();
        }
    }
    render(){
        return <>
            {this.props.children}
            <div ref={loadingRef => (this.loadingRef = loadingRef)}>
                    {this.props.loading &&
                        <LoadingXlContent />
                    }
                    {!this.props.loading && this.props.next_page &&
                        <BtnPlusContent onclick={this.next} />
                    }
                </div>
        </>
    }
}
export default InfiniteScroll