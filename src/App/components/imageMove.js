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
           display: this.props.action =='enter'? 'show': 'hide'
        };
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            style : nextProps.style,
            action: nextProps.action
        })
        if(nextProps.action=='leave'){
            setTimeout(()=>{
                this.setState({
                    display: 'hide'
                })
            }, 1000)
        } else{
            this.setState({
                display: 'show'
            })
        }
    }


    render() {
        const { imgName, className, style, action, display } = this.state;

        return (
            display=='show' ? <PageTransition
        act={action}
        duration={166}
        enter={`img-enter`}
        leave={`img-leave`}
        >
        <img className={className} style={style} src={`http://m-mymove.oss-cn-shanghai.aliyuncs.com/${imgName}`} />
        </PageTransition> : ''
        );
    }
}
export default ImageMove;
