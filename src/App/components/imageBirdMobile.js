import React , { Component }from 'react';
import { Components, utils } from 'neo';
const { Row, Col, Icon } = Components;
  

class ImageBirdMobile extends Component {
    constructor(props) {
      super(props);
      this.state = {
         imgName: this.props.imgName,
         className: this.props.className,
         style: this.props.style
      };
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            style : nextProps.style
        })
    }
  

    render() {
        const { imgName, className, style } = this.state;
        return(
         <img className={className} style={style} src={`https://bird-bord.oss-cn-beijing.aliyuncs.com/${imgName}`} />
        );
    }
}
export default ImageBirdMobile;
