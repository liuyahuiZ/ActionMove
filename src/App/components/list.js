import React , { Component }from 'react';
import { Components, utils } from 'neo';
import ImageBird from './imageBird';
import LoadText from './LoadText';
import { showArticleDetail } from '../utils/domUtil';
const { Row, Col, Icon, AnTransition, PopContainer } = Components;
const { sessions, date } = utils;
class List extends Component {
    constructor(props) {
      super(props);
      this.state = {
         articlesArr: this.props.articlesArr||[],
         loadStatus: this.props.loadStatus||'LOADING',
         isPhone: sessions.getStorage('screenWidth') < 800 
      };
    }
    componentDidMount() {
    }
  
    componentWillReceiveProps(nextProps){
        this.setState({
            articlesArr: nextProps.articlesArr,
            loadStatus: nextProps.loadStatus
        })
    }

    render() {
        const { articlesArr, loadStatus, isPhone } = this.state;
        const self = this;
        let articleDom = articlesArr&&articlesArr.length>0 ? articlesArr.map((itm, idx)=>{
            return (<AnTransition
              delay={idx*600}
              act={'enter'}
              duration={166}
              enter={'listTem-enter'}
              leave={'listTem-leave'}
              key={`${idx}-ops`}
          ><Col className="textclolor-333 margin-bottom-3r" span={24}>
                <Row justify={'center'}>
                    <Col span={isPhone ? 16 : 18}><Row className="padding-right-2r">
                      <Col className='textclolor-333 font-size-big cursor-pointer article-hover' onClick={()=>{showArticleDetail(itm)}}>{itm.title}</Col>
                      <Col className='textclolor-black-low font-size-small margin-top-1r'>作者 {itm.user} / 发布于 {date.momentFormate(itm.createTime, 'YYYY-MM-DD ')}  / 查看 {itm.sea} / 属于 {itm.type}</Col>
                      <Col className='textclolor-666 font-size-normal margin-top-p4r' onClick={()=>{showArticleDetail(itm)}}>{itm.info}</Col>
                      </Row>
                    </Col>
                    <Col span={isPhone ? 8 : 6} className='overflow-hide maxheight-10'><ImageBird imgName={itm.imgGroup} className="img-hover"  /></Col>
                    <Col span={4} className='margin-top-2r border-bottom border-color-e5e5e5'></Col>
                </Row>
            </Col></AnTransition>)
        }) : <LoadText loadTextStatus={loadStatus} refreshBack={()=>{this.props.getArticleList()}} ></LoadText>

        return (<Row justify="center">{articleDom}</Row>);
    }
}
export default List;
