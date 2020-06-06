import React , { Component }from 'react';
import PropTypes from 'prop-types';
import { Components, utils } from 'neo';
const { Row, Col, Icon } = Components;
import config from '../config/config'  

class ImageBird extends Component {
    constructor(props) {
      super(props);
      this.state = {
         imgName: this.props.imgName,
         className: this.props.className,
         loadStatus: 'LOADING',
         imgText: this.props.imgName ? '加载中...': '暂无数据'
      };
    }
    componentDidMount() {
    }
  
    componentWillReceiveProps(nextProps){
        this.setState({
            className: nextProps.className,
            action: nextProps.action,
        })
    }

    render() {
        const { imgName, className, loadStatus, display, imgText } = this.state;
        const { showText } = this.props;
        const self = this;
        return(
        <div className={`width-100 ${loadStatus=='LOADING'? 'img_bg': ''} `}>
         {loadStatus=='ERROR'? '' :<img onLoad={()=>{
            self.setState({
                loadStatus: 'LOADED',
                imgText: ''
            })
         }} onError={()=>{
            this.setState({
              loadStatus: 'ERROR',
              imgText: '加载失败'
            })
        }} className={`width-100 ${className}`} src={`${config.ROOT_URL}files/getTheImage?path=${imgName}`} /> }
          <div className={`width-100 text-align-center ${loadStatus=='ERROR'||!imgName ? 'icon_bg': ''}`} >{ loadStatus=='ERROR'||!imgName ? <Icon iconName='image' size="300%" /> : ''}</div>
          {/* <div className='width-100 text-align-center'>{ showText ? imgText : '' }</div> */}
         </div>
        );
    }
}
ImageBird.propTypes = {
    style: PropTypes.shape(),
    onClick: PropTypes.func,
    className: PropTypes.string,
    showText: PropTypes.bool
  };
  
ImageBird.defaultProps = {
    style: {},
    onClick: () => {},
    className: '',
    showText: true
  };
  
export default ImageBird;
