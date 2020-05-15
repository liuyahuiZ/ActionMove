import React , { Component }from 'react';
import { Components, utils } from 'neo';
const { Row, Col, Icon, PageTransition } = Components;
  

class ImageMove extends Component {
    constructor(props) {
        super(props);
        this.state = {
           imgName: this.props.imgName,
           className: this.props.className,
           style: this.props.style,
           action: this.props.action,
           display: this.props.action =='enter'? 'show': 'hide',
           loadStatus: 'LOADING'
        };
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            style : nextProps.style,
            action: nextProps.action,
            className: nextProps.className
        })
        if(nextProps.action=='leave'){
            setTimeout(()=>{
                this.setState({
                    display: 'hide'
                })
            }, 100)
        } else{
            this.setState({
                display: 'show'
            })
        }
    }


    render() {
        const { imgName, className, style, action, display, loadStatus  } = this.state;
        const self = this;
        return  (
         <PageTransition
        act={action}
        duration={166}
        enter={`img-enter`}
        leave={`img-leave`}
        >
        <div className={`width-100 relative ${loadStatus=='LOADING'? 'img_bg': ''} ${display=='show'? 'hide-out zindex-20':"hide-in zindex-10"}`} >
        <img onLoad={()=>{ console.log('load complate');
            self.setState({
                loadStatus: 'LOADED'
            })
        }} className={className} style={style} src={`https://m-mymove.oss-cn-shanghai.aliyuncs.com/${imgName}`} />
        </div>
        </PageTransition>
        ) ;
    }
}
export default ImageMove;
