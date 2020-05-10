import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import { articleList } from '../api/article';
import LoadText from '../components/LoadText';
const {
    Buttons,
    Toaster,
    Header,
    Row,
    Col,
    Icon,
    Modal,
    Carousel,
    LoadMore, PopContainer
  } = Components;
const { sessions, storage, date } = utils;
class PayDoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
          enableLoad: 'canload',
          currentPage: 1,
          pageSize: 5,
          articleListArr: [],
          loadStatus: 'LOADING', //'LOADING', 'ERROR', 'SUCCESS', 'NODATA'
      };
    }

    componentDidMount(){
      console.log();
      this.getArticleList()
    }

    getArticleList(){
      articleList({current: 1,pageSize: 5
      }).then((res)=>{
          if(res.code=='0000'){
              this.setState({
                  articleListArr: res.data.list,
                  loadStatus: 'SUCCESS',
              })
          }else{
            this.setState({
              articleListArr: [],
              loadStatus: 'NODATA'
            })
          }
      }).catch((err)=>{
          console.log('err',err)
          this.setState({
            articleListArr: [],
            loadStatus: 'ERROR'
          })
      })
    }
    
    showArticleDetail(itm){
      PopContainer.confirm({
      content: (<Row>
          <Col className="padding-all border-bottom border-color-e5e5e5">{itm.title}</Col>
          <Col className="heighth-75 overflow-y-scroll padding-all-1r">
              <Row>
                  <Col>作者 {itm.user} / 发布于 {date.format(itm.createTime, 'yyyy-mm-dd ')}  / 查看 {itm.sea} / 属于 </Col>
                  <Col><div dangerouslySetInnerHTML={{__html: itm.content}} /></Col>
              </Row>
          </Col>
          <Col className="text-align-center line-height-3r" onClick={()=>{PopContainer.closeAll()}}>关闭</Col>
          </Row>),
      type: 'bottom',
      containerStyle: {},
      })
    }
  
    render() {
        const { articleListArr, enableLoad, loadStatus } = this.state;
        const listMap = [{ tabName: 'first', content: (<div className="padding-all-1r bg-show"><div className="padding-all-10x bg-FECAAD textclolor-gray-red border-radius-100 ">抢100优惠券</div></div>), isActive: true },
        { tabName: 'second', content: (<div className="padding-all-1r bg-show"><div className="padding-all-10x bg-F1F8FD textclolor-alink border-radius-100 ">1元秒杀24期免息</div></div>), isActive: false },
        { tabName: 'thired', content: (<div className="padding-all-1r bg-show"><div className="padding-all-10x bg-F1F8FD textclolor-alink border-radius-100 ">小白卡满1000减30</div></div>), isActive: false }]
        const self = this;
        let articleDom = articleListArr&&articleListArr.length>0 ? articleListArr.map((itm, idx)=>{
          return (<Col className="textclolor-333 margin-bottom-3r" key={`${idx}-article`}>
              <Row justify={'center'}>
                  <Col className='textclolor-333 font-size-big' onClick={()=>{self.showArticleDetail(itm)}}>{itm.title}</Col>
                  <Col className='textclolor-black-low font-size-small margin-top-1r'>作者 {itm.user} / 发布于 {date.format(itm.createTime, 'yyyy-mm-dd ')}  / 查看 {itm.sea} / 属于 </Col>
                  <Col className='textclolor-333 font-size-normal'>{itm.info}</Col>
                  <Col span={4} className='margin-top-2r border-bottom border-color-e5e5e5'></Col>
              </Row>
          </Col>)
      }) : <LoadText loadTextStatus={loadStatus} refreshBack={this.getArticleList()} ></LoadText>

        return(
          <LoadMore enableLoad={enableLoad} percent={20}  loadfunc={()=>{this.loadmore()}} className="bg-f5f5f5">
            <Row justify='center' className="padding-all-2r">
              <Col>{articleDom}</Col>
            </Row>
          </LoadMore>
        );
    }
}
export default PayDoc;
