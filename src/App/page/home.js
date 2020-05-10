import ReactDOM from 'react-dom';
import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
const { Row, Col, Icon, ActionSheet, Buttons, Carousel, PopContainer } = Components;
import Footer from '../components/Footer';
import Header from '../components/Header';

import AnimateBanner from '../components/animateBanner';
import ImageBird from '../components/imageBird';
import LoadText from '../components/LoadText';
import { findType } from '../api/index';
import { articleList } from '../api/article';

const { sessions, storage, date } = utils;
class HomeDoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
          confirmDirty: false,
          containerScrollTop: storage.getStorage('containerScrollTop') || 0,
          pageStatus: 'MOBILE',
          activeKey: 'action0',
          activeNum: 0,
          articleListArr: [],
          loadStatus: 'LOADING', //'LOADING', 'ERROR', 'SUCCESS', 'NODATA'
      };
    }
    componentDidMount(){
        const self = this;
        const container = this.$$homeContainer;
        const { containerScrollTop } = self.state;
        container.scrollTop = containerScrollTop;
        container.addEventListener('scroll', (e)=>{
            e.preventDefault();
            self.checkActive(container.scrollTop);
            self.setState({
                containerScrollTop: container.scrollTop
            },()=>{
                storage.setStorage('containerScrollTop', container.scrollTop)
            })
        })
        this.findAllType();
        this.getArticleList()
    }

    findAllType(){
        findType({}).then((res)=>{
            console.log('res',res)
        }).catch((err)=>{
            console.log('err',err)
        })
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

    checkActive(top){
        let arr = ['action0','action1', 'action2'];
        const actNum = 200;
        for(let i=0;i<arr.length;i++){
            if(top> (this[`$$${arr[arr.length-1]}`].offsetTop )){
                this.setState({
                    activeKey: arr[arr.length-1],
                    activeNum: arr.length
                })
            } else{
                let pre =  this[`$$${arr[i]}`];
                let next = this[`$$${arr[i+1]}`];
                if(top> (pre.offsetTop)&&top < next.offsetTop){
                    this.setState({
                        activeKey: arr[i],
                        activeNum: i+1
                    })
                }
            }
        }

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
        const {pageStatus, containerScrollTop, activeKey, activeNum, articleListArr, loadStatus} = this.state;
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
          <section className="bg-show images-all heighth-100 width-100 overflow-hide overflow-y-scroll" ref={(r) => { this.$$homeContainer = r; }}>
            <Row >
                <Col className="relative heighth-100 zindex-10" >
                    <div ref={(r) => { this.$$action0 = r; }}>
                        <Row className="absolute width-100 top-1 zindex-10" justify="center">
                            <Col span={18} className="bg-000 opacity-8 padding-all border-radius-5f">
                                <Row className="">
                                    <Col className={'textcolor-fff text-align-center font-size-large'}>"不昧本来，太虚明月流辉过"</Col>
                                    <Col className={'textcolor-fff text-align-center'}>抱元独坐，云去无心，大道无我</Col>
                                    <Col className={'textcolor-fff text-align-center line-height-3r'}>THE BIRD ECO</Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="absolute width-100 bottom-1r padding-all zindex-10" align={'center'} justify={'center'}>
                            <Col span={15.5}>
                                <div className="textcolor-fff font-size-7 opacity-8">THE PROTECTION OF THE ENVIRONMENT IS ONE OF THE BASIC STATE POLICIES OF THE CHINESE GOVERNMENT</div>
                            </Col>
                            <Col span={2.5}>
                                <div className={'width-100'}><span className={"icon small icon-footer1"} /> </div>
                                <div className={'width-100'}><span className="textcolor-fff font-size-8 opacity-8">环保</span></div>
                            </Col>
                            <Col span={2.5}>
                                <div className={'width-100'}><span className={"icon small icon-footer2"} /> </div>
                                <div className={'width-100'}><span className="textcolor-fff font-size-8 opacity-8">安全</span></div>
                            </Col>
                            <Col span={3}>
                                <div className={'width-100'}><span className={"icon small icon-footer3"} /> </div>
                                <div className={'width-100'}><span className="textcolor-fff font-size-8 opacity-8">循环</span></div>
                            </Col>
                            
                        </Row>
                    </div>
                </Col>
                <Col className={"fixed top-0 width-100 zindex-0 overflow-hide"}> 
                    <AnimateBanner />
                </Col>
                <Col className="zindex-10 bg-show" >
                    <div ref={(r) => { this.$$action1 = r; }}>
                    <Row className={"margin-top-3r"} justify="center">
                        <Col span={18} className="">
                            <div className="width-100 textcolor-288767 text-align-center font-size-large">热门博客</div>
                            <div className={`${containerScrollTop > 200 ? 'bottom-in' : 'bottom-out'} font-size-9 line-height-1f margin-top-5r `}>
                                <Row>{articleDom}</Row>
                            </div>
                        </Col>
                    </Row>
                    </div>
                    <div ref={(r) => { this.$$action2 = r; }}>
                    <Row className={"margin-top-5r"} justify="center">
                        <Col span={18}  className={`${activeNum > 1 ? 'bottom-in' : 'bottom-out'}`}>
                            <div className="width-100 textcolor-288767 font-size-large text-align-center">博客分类</div>
                            <div className="width-100 text-align-center"><ImageBird imgName='hengxian.png' /></div>
                            <div className="width-100 font-size-9 line-height-3r text-align-center ">XLJ型分散式生活垃圾无害化减量设备</div>
                        </Col>
                        <Col span={18} className={`${activeNum > 1 ? 'bottom-in' : 'bottom-out'} margin-top-2r margin-bottom-2r`}>
                            <Row justify="center">
                                <Col span={22}><ImageBird className="width-100 " imgName='product.png' /></Col>
                                <Col className="font-size-9 margin-top-1r">
                                <div className="width-100 font-size-9 line-height-1f">在国外，农村与城市一样卫生清洁， 环境优美，农民居住的房屋，虽然旁边就是稻田、菜田，但没有尘土飞扬，四周也不见塑料袋、餐厨垃圾等垃圾山，院子里花草摇曳，景色怡人，令人向往。</div>
                                <div className="width-100 font-size-9 line-height-1f">秉持着让中国村镇居民也生活在 “蓝天白云，水清林绿，鸟语花香” 宜居环境的信念，【小鸟环保】团队通过技术攻关，为“美丽乡村建 设”提供技术先进、经济实用的垃圾减量解决方案。</div>
                                </Col>
                                
                            </Row>
                        </Col>
                    </Row>
                    </div>
                </Col>
                
                <Col>
                   <Footer  pageStatus={pageStatus} />
                </Col>
            </Row>
          </section>
        );
    }
}
export default HomeDoc;
