import ReactDOM from 'react-dom';
import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
const { Row, Col, Icon, ActionSheet, Buttons, Carousel, PopContainer } = Components;
import Footer from '../components/Footer';
import Header from '../components/Header';

import AnimateBanner from '../components/animateBanner';
import ImageBird from '../components/imageBird';
import ImageBirdMobile from '../components/imageBirdMobile';

const { sessions, storage } = utils;
class HomeDoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
          confirmDirty: false,
          containerScrollTop: storage.getStorage('containerScrollTop') || 0,
          pageStatus: 'MOBILE',
          activeKey: 'action0',
          activeNum: 0
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
    }

    checkActive(top){
        let arr = ['action0','action1', 'action2','action3', 'action4','action5'];
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
    
    handleClick(link, itm) {
        if(link) {
            hashHistory.push({
                pathname: link,
                query: itm || ''
            });
        }
    }

    handleUrlClick(link, itm) {
        if(link) {
            window.location.href = itm.content
        }
    }
    
    showVideo(){
        PopContainer.confirm({
            content: (<div className="padding-all">
            <video controls="controls" className="width-100" poster="http://www.miui.com/zt/miui9/new_images/miui_show_264.jpg" 
            src={'//video.market.xiaomi.com/download/Browser/0e2d5950977c942060e818207c87c3e072c9d344d'} id="audioPlay" ref={(r) => { this.$$videos = r; }}  x5-playsinline="" playsinline="" webkit-playsinline=""  />
            </div>),
            type: 'bottom',
            containerStyle: { top: '30vh',},
        });
    }

    render() {
        const {pageStatus, containerScrollTop, activeKey, activeNum} = this.state;

        return(
          <section className="bg-show images-all heighth-100 width-100 overflow-hide overflow-y-scroll" ref={(r) => { this.$$homeContainer = r; }}>
            <Row >
            <Col className="relative heighth-100 zindex-10" >
                    <div ref={(r) => { this.$$action0 = r; }}>
                        <Row className="absolute width-100 top-1 zindex-10" justify="center">
                            <Col span={21} className="bg-000 opacity-8 padding-all border-radius-5f">
                                <Row className="">
                                    <Col className="text-align-center"><ImageBird  className="middle-round-3f" imgName='logo.jpg' /> </Col>
                                    <Col className={'textcolor-fff text-align-center font-size-large'}>"碧水蓝天 自由翱翔"</Col>
                                    <Col className={'textcolor-fff text-align-center'}>上海小鸟环保</Col>
                                    <Col className={'textcolor-fff text-align-center line-height-3r'}>THE BIRD ECO</Col>
                                    <Col className={'textcolor-fff text-align-center margin-top-1r'}>理念视频</Col>
                                    <Col className={'textcolor-fff text-align-center margin-top-1r'} onClick={()=>{this.showVideo()}}><span  className="icon trophy icon-bofang" /></Col>
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
                        <Col span={22} className="">
                            <div className="width-100 textcolor-288767 text-align-center font-size-large">公司简介</div>
                            <div className="text-align-center"><ImageBird imgName='hengxian.png' /></div>
                            <div className={`${containerScrollTop > 200 ? 'bottom-in' : 'bottom-out'} font-size-9 line-height-1f margin-top-1r `}>进步源自虔诚之心和点滴付出，您的信任与重托则是我们最大的动力</div>
                        </Col>
                        <Col span={22} className="margin-top-2r">
                            <Row justify="center">
                                <Col span={16} className={`${containerScrollTop > 400 ? 'bottom-in' : 'bottom-out'}`}><ImageBird className="width-100 " imgName='introuce.png' /></Col>
                                <Col className={`${containerScrollTop > 600 ? 'bottom-in' : 'bottom-out'} font-size-9 margin-top-1r line-height-1f`}>
                                上海小鸟投资管理有限公司【小鸟投资】成立于2015年5月20日。<br/>
                                是一家致力于生活垃圾无害化处理；餐厨垃圾资源化利用以及餐饮废水处理技术研发、设备生产与技术服务为一体的企业。<br/>
                                【小鸟环保】<br/>
                                是上海小鸟投资管理有限公司旗下控股公司，坐落于全国科技、贸易、信息、金融和航运中心的上海。</Col>
                            </Row>
                        </Col>
                    </Row>
                    </div>
                    <div ref={(r) => { this.$$action2 = r; }}>
                    <Row className={"margin-top-5r"} justify="center">
                        <Col span={22}  className={`${activeNum > 1 ? 'bottom-in' : 'bottom-out'}`}>
                            <div className="width-100 textcolor-288767 font-size-large text-align-center">简单可靠的产品</div>
                            <div className="width-100 text-align-center"><ImageBird imgName='hengxian.png' /></div>
                            <div className="width-100 font-size-9 line-height-3r text-align-center ">XLJ型分散式生活垃圾无害化减量设备</div>
                        </Col>
                        <Col span={22} className={`${activeNum > 1 ? 'bottom-in' : 'bottom-out'} margin-top-2r margin-bottom-2r`}>
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
                {/* 我们的核心优势 */}
                <Col className="zindex-10 bg-show">
                    <div ref={(r) => { this.$$action3 = r; }}>
                    <Row className="relative padding-bottom-3r" justify="center">
                        <Col span={22} className="zindex-10 margin-top-2r">
                            <Row className="relative " >
                                <Col className="textcolor-fff font-size-large text-align-center  zindex-10"><span className="">我们的核心优势</span></Col>
                                <Col className="textcolor-fff text-align-center font-size-9">依托成熟的生物处理技术</Col>
                                <Col className="border-dashed-bottom absolute top-1r zindex-6"></Col>
                            </Row>
                        </Col>
                        <Col span={22} className="margin-top-1r bg-show border-radius-5f zindex-10 padding-all font-size-9">
                        <div className={`${activeNum > 2 ? 'bottom-in' : 'bottom-out'} line-height-1f`}>【小鸟环保】依托株式会社三協エレック的生物处理技术成果，针对国内农村突出的垃圾减量难题，研发出无需添加任何燃料的生活垃圾分散式无害化减量系统—--XLJ系列产品。<br/>
                        XLJ系列产品具有体积减量率高、低能耗、基础建设周期短、无污染等技术优势。为中国美丽乡村建设提供最具效率、最经济的一站式解决方案， 是符合当前国情的全新一代分散式生活垃圾减量技术装备。</div>
                        <div span={22} className={`${activeNum > 1 ? 'bottom-in' : 'bottom-out'} text-align-center zindex-10 line-height-3r font-size-12`} >视频播放 
                        <span className="relative top-4x"><Icon iconName={'social-youtube-outline '} size={'140%'} /></span></div>
                        </Col>
                        
                        <ImageBird className=" heightp-100 absolute-left zindex-6" imgName='hexinyoushibeijing.png' />
                    </Row>
                    </div>
                </Col>
                
                <Col className="zindex-10 bg-show" >
                    <div ref={(r) => { this.$$action4 = r; }}>
                    <Row justify="center">
                        <Col span={22} className="margin-top-3r margin-bottom-2r">
                            <div className="width-100 textcolor-288767 font-size-large text-align-center margin-top-3r">产品实景照片</div>
                            <div className="width-100 text-align-center"><ImageBird imgName='hengxian.png' /></div>
                            <div className="width-100 font-size-9 line-height-3r text-align-center ">XLJ型分散式生活垃圾无害化减量设备</div>
                        </Col>
                        <Col span={22} className="margin-top-3r margin-bottom-2r">
                            <Row justify="center" >
                                <Col span={12}><ImageBird className="width-100 " imgName='work.png' /></Col>
                                <Col span={12} className={`${activeNum > 3 ? 'p1-line-animate' : 'right-out'}`}>
                                <div className="width-100 font-size-9 line-height-2r padding-left-1r">
                                1. 垃圾减量系统<br/>
                                2. 生物滴滤烟气处理系统 <br/>
                                3. 自动上料系统<br/>
                                4. 智能控制系统</div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    </div>
                </Col>
                <Col className="zindex-10 bg-show">
                    <div ref={(r) => { this.$$action5 = r; }}>
                    <Row className="relative " justify="center">
                        <Col span={22} className="zindex-10 margin-top-2r">
                            <Row>
                                <Col className="padding-all font-size-9">
                                <div className="width-100 textcolor-288767 font-size-large text-align-center">工作原理</div>
                                <div className="width-100 text-align-center"><ImageBird imgName='hengxian.png' /></div>
                                <div className={`${activeNum > 4 ? 'bottom-in' : 'bottom-out'} width-100 font-size-8 line-height-1f margin-top-2r margin-bottom-2r`}>1.采用控制进氧量的方式，控制减量腔内始终处于低温状态，避免二噁英生成 <br/>
2.生活垃圾在这个温度环境中缓慢烘干，阴燃（无明火）；低温阴燃状态会产生大量焦油和CO<br/>
3.将腔内的烟气引入烟气处理系统，将焦油粉尘等颗粒物沉淀下来（集中处理）<br/>
4.经过生物滴滤、电解和吸附等工艺将烟气中携带的其他有害物质和汞、铅、铬、镉、等重金属过滤掉<br/>
5.通过消除CO的装置降低CO浓度；过滤UV装置消除嗅源；最终烟气（含一定水蒸气）达标排放；系统产生的溢流水，纳管进入暂蓄池，集中至污水处理厂处理</div>
                                </Col>
                                <Col className={`${activeNum > 5 ? 'bottom-in' : 'bottom-out'} padding-all`}><ImageBirdMobile className="width-100" imgName='work_principle.png' /></Col>
                            </Row>
                        </Col>
                        <ImageBird className="width-100 absolute-left zindex-6" imgName='picture_bgwork1.png' />
                    </Row>
                    </div>
                </Col>
                {/* 工艺流程 */}
                

                {/* 关于我们 */}
                <Col>
                   <Footer  pageStatus={pageStatus} />
                </Col>
            </Row>
          </section>
        );
    }
}
export default HomeDoc;
