import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { goLink } from '../utils/common';
import ImageBird from './imageBird';
import LoadText from './LoadText';
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

    showArticleDetail(itm) {
        goLink(`/VideoDetail?id=${itm._id}`); 
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
          ><Col className="textclolor-333 margin-bottom-3r border-radius-9 overflow-hide" span={isPhone ? 12 : 6}>
                <Row justify={'center'} className="margin-left-p2r margin-right-p2r bg-show border-radius-9 overflow-hide">
                    <Col span={24} className='overflow-hide maxheight-10' onClick={()=>{this.showArticleDetail(itm)}}><ImageBird imgName={itm.imgGroup} className="img-hover border-radius-9"  /></Col>
                    <Col span={24} onClick={()=>{this.showArticleDetail(itm)}}>
                        <Row className={"padding-all-8x"}>
                            <Col className='textclolor-333 font-size-big cursor-pointer article-hover' >{itm.title}</Col>
                            <Col className='textclolor-black-low font-size-small '>作者 {itm.user} / 发布于 {date.momentFormate(itm.createTime, 'YYYY-MM-DD ')}  / 查看 {itm.sea} / 属于 {itm.type}</Col>
                            {/* <Col className='textclolor-666 font-size-normal margin-top-p4r' onClick={()=>{this.showArticleDetail(itm)}}>{itm.info}</Col> */}
                        </Row>
                    </Col>
                </Row>
            </Col></AnTransition>)
        }) : <LoadText loadTextStatus={loadStatus} refreshBack={()=>{this.props.getArticleList()}} ></LoadText>

        return (<Row justify="flex-start">{articleDom}</Row>);
    }
}
export default List;
