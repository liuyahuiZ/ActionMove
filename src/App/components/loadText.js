import React , { Component }from 'react';
import { Components, utils } from 'neo';
const { Row, Col, Icon, PageTransition } = Components;

class LoadText extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loadStatus: this.props.loadTextStatus||'LOADING', //'LOADING', 'ERROR', 'SUCCESS', 'NODATA'
        loadText: {
          LOADING: '加载中...',
          SUCCESS: '加载成功',
          ERROR: '加载失败',
          NODATA: '暂无数据'
        }, // '加载中', '加载失败', '成功'
      };
    }
    componentDidMount() {
    }
  
    componentWillReceiveProps(nextProps){
      this.setState({
        loadStatus: nextProps.loadTextStatus
      })
    }
  
    render() {
      const { loadText, loadStatus } = this.state;
      const { className, showText, text } = this.props;
      const self = this;
      // console.log('loadStatus', loadStatus)
      let loadTxt = text ? text: loadText[loadStatus]
      return (
        <div className={ `${className||''} text-align-center`} style={{textAlign: 'center', lineHeight: '3rem'}}>
          {loadStatus == 'ERROR' ?<Row onClick={()=>{ self.props.refreshBack() }}>
            <Col><Icon iconName={'calendar '} size={'240%'} iconColor={ "#333"}  /></Col>
            <Col><span> {loadTxt}</span></Col>
          </Row> : ''}
          {loadStatus == 'LOADING' ? <Row>
            <Col><Icon iconName={'calendar  '} size={'240%'} iconColor={ "#333"}  /></Col>
            <Col><span> {loadTxt}</span></Col>
          </Row> : ''}
          {loadStatus == 'SUCCESS' ? loadTxt : ''}
          {loadStatus == 'NODATA' ? <Row>
            <Col><Icon iconName={'calendar '} size={'240%'} iconColor={ "#333"}  /></Col>
            <Col><span> {loadTxt}</span></Col>
          </Row> : ''}
        </div>
      );
    }
  }
  
  
  export default LoadText;
  