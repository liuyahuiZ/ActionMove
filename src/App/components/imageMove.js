import React , { Component }from 'react';
import { Components, utils } from 'neo';
const { Row, Col, Icon } = Components;
  

class ImageMove extends Component {
    constructor(props) {
      super(props);
      this.state = {
         imgName: this.props.imgName,
         className: this.props.className
      };
    }
    componentDidMount() {
    }
  

    render() {
        const { imgName, className } = this.state;
        return(
         <img className={className} src={`http://m-mymove.oss-cn-shanghai.aliyuncs.com/${imgName}`} />
        );
    }
}
export default ImageMove;
