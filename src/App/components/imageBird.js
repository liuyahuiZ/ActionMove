import React , { Component }from 'react';
import { Components, utils } from 'neo';
const { Row, Col, Icon } = Components;
  

class ImageBird extends Component {
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
         <img className={className} src={`https://bird-bord.oss-cn-beijing.aliyuncs.com/${imgName}`} />
        );
    }
}
export default ImageBird;
