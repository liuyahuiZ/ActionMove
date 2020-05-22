import ReactDOM from 'react-dom';
import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
const { Row, Col, Icon, ActionSheet, Buttons, AnTransition, PopContainer } = Components;
import Footer from '../components/Footer';
import Header from '../components/Header';

import AnimateBanner from '../components/animateBanner';
import ImageBird from '../components/imageBird';
import LoadText from '../components/LoadText';
import List from '../components/list';
import { showArticleDetail } from '../utils/domUtil';
import { getUser } from '../utils/common'
import { findType, addAccessLog } from '../api/index';
import { articleList, articleListForType } from '../api/article';

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
          loadStatus: 'LOADING', //'LOADING', 'ERROR', 'SUCCESS', 'NODATA',
          typeListArr: [],
          typeloadStatus: 'LOADING',
          isPhone: sessions.getStorage('screenWidth') < 800 
      };
    }
    componentDidMount(){
        console.log('this.props', this.props)
        if(this.props.pageIn=='pageOut') return
        const self = this;
        const container = this.$$homeContainer;
        const { containerScrollTop } = self.state;
        container.scrollTop = containerScrollTop;
        let scrollTimer
        container.addEventListener('scroll', (e)=>{
            e.preventDefault();
            clearTimeout(scrollTimer);
            
            //停止滚动300ms后，执行方法,降低渲染效率
            scrollTimer = setTimeout(() => {
                self.checkActive(container.scrollTop);
                self.setState({
                    containerScrollTop: container.scrollTop
                })
                // todo something scroll end
                storage.setStorage('containerScrollTop', container.scrollTop)
            }, 300);
        })
        this.addLog()
        this.findAllType();
        this.getArticleList();
        this.getArticleListForType()
    }
    addLog(){
        addAccessLog({client: navigator.userAgent, info: '', user: getUser()}).then((res)=>{
            console.log('res',res)
        }).catch(()=>{
        })
    }
    findAllType(){
        findType({}).then((res)=>{
            console.log('res',res)
        }).catch((err)=>{
            console.log('err',err)
        })
    }

    getArticleList(){
        articleList({current: 1,pageSize: 5, sort: {'sea': -1}
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

    getArticleListForType(){
        articleListForType({}).then((res)=>{
            if(res.code=='0000'){
                this.setState({
                    typeListArr: res.data,
                    typeloadStatus: 'SUCCESS',
                })
            }else{
                this.setState({
                    typeListArr: [],
                    typeloadStatus: 'NODATA'
                })
              }
        }).catch((err)=>{
            console.log('err',err)
            this.setState({
                typeListArr: [],
                typeloadStatus: 'ERROR'
            })
        })
    }

    checkActive(top){
        let arr = ['action0','action1', 'action2'];
        const actNum = 100;
        for(let i=0;i<arr.length;i++){
            if(top> (this[`$$${arr[arr.length-1]}`].offsetTop + actNum)){
                this.setState({
                    activeKey: arr[arr.length-1],
                    activeNum: arr.length
                })
            } else{
                let pre =  this[`$$${arr[i]}`];
                let next = this[`$$${arr[i+1]}`];
                if(top> (pre.offsetTop + actNum)&&top < (next.offsetTop+ actNum)){
                    this.setState({
                        activeKey: arr[i],
                        activeNum: i+1
                    })
                }
            }
        }

    }



    render() {
        const {pageStatus, containerScrollTop, activeKey, activeNum, articleListArr, loadStatus, typeListArr, typeloadStatus, isPhone} = this.state;
        const self = this;

        let typeDom = typeListArr&&typeListArr.length>0 ? typeListArr.map((itm, idx)=>{
            return (<Row><Col className="textclolor-333 margin-bottom-3r" key={`${idx}-article`}>
                <Row justify={'center'} className='relative'>
                    <Col className='textclolor-333 font-size-huge zindex-20 line-height-3r' >{itm.info.typeKey}</Col>
                    <Col className='textclolor-333 font-size-small zindex-20 '>{itm.info.remark}</Col>
                    <Col span={24} className="absolute top-0 left-0 border-radius-5f overflow-hide margin-top-1r heighr-6"><ImageBird imgName={itm.info.imgGroup} /></Col>
                    
                    <Col className='textclolor-333 margin-top-5r'>
                        <Row>{itm.articleList&&itm.articleList.length>0 ? 
                            itm.articleList.map((ait, aidx)=>{
                                let paddStyle = ''
                                if((aidx+1)%3 == 1){
                                    paddStyle = 'padding-right-1r'
                                }
                                if((aidx+1)%3 == 0) {
                                    paddStyle = 'padding-left-1r'
                                }
                                if(isPhone) paddStyle=''
                               return( <Col span={ isPhone ? 24: 8} className={`${paddStyle} margin-bottom-1r`} key={`${aidx}-article`}>
                                    <Row justify={'center'} className="padding-all-1r bg-show border-radius-5f overflow-hide">
                                        <Col className='textclolor-333 font-size-big cursor-pointer text-overflow' onClick={()=>{showArticleDetail(ait)}}>{ait.title}</Col>
                                        <Col className='textclolor-black-low font-size-small margin-top-1r'>作者 {ait.user} / 发布于 {date.momentFormate(ait.createTime, 'YYYY-MM-DD ')}  / 查看 {ait.sea} </Col>
                                        <Col className='textclolor-333 font-size-normal info-text-overflow' onClick={()=>{showArticleDetail(ait)}}>{ait.info}</Col>
                                        <Col span={4} className='margin-top-2r border-bottom border-color-e5e5e5'></Col>
                                    </Row>
                                </Col>)
                            }) : ''}</Row>
                    </Col>

                    <Col span={4} className='margin-top-2r border-bottom border-color-e5e5e5'></Col>
                </Row>
            </Col></Row>)
        }) : <LoadText loadTextStatus={typeloadStatus} refreshBack={()=>{}} ></LoadText>
        return(
          <section className="bg-show images-all heighth-100 width-100 overflow-hide overflow-y-scroll" ref={(r) => { this.$$homeContainer = r; }}>
            <Header pathname={this.props.location.pathname} containerScrollTop={containerScrollTop} />
            <Row >
                <Col className="relative heighth-100 zindex-10" >
                    <div ref={(r) => { this.$$action0 = r; }}>
                        <Row className="absolute width-100 top-1 zindex-10" justify="center">
                            <Col span={18} className="bg-000 opacity-8 padding-all border-radius-5f">
                                <Row className="">
                                    <Col className={'textcolor-fff text-align-center font-size-large'}>满堂花醉三千客，一剑霜寒十四州。</Col>
                                    <Col className={'textcolor-fff text-align-center font-size-large'}>鼓角揭天嘉气冷，风涛动地海山秋。</Col>
                                    <Col className={'textcolor-fff text-align-center '}>“ 对酒转愁多，愁多奈酒何 ”</Col>
                                    <Col className={'textcolor-fff text-align-right line-height-3r'}>—— 《贯休》</Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="absolute width-100 bottom-1r padding-all zindex-10" align={'center'} justify={'center'}>
                            <Col span={15.5}>
                                <div className="textcolor-fff font-size-7 opacity-8">However bad life may seem, there is always something you can do, and succeed at.</div>
                            </Col>
                            <Col span={2.5}>
                                <div className={'width-100'}><span className={"icon small icon-footer1"} /> </div>
                                <div className={'width-100'}><span className="textcolor-fff font-size-8 opacity-8">求知</span></div>
                            </Col>
                            <Col span={2.5}>
                                <div className={'width-100'}><span className={"icon small icon-footer2"} /> </div>
                                <div className={'width-100'}><span className="textcolor-fff font-size-8 opacity-8">创新</span></div>
                            </Col>
                            <Col span={3}>
                                <div className={'width-100'}><span className={"icon small icon-footer3"} /> </div>
                                <div className={'width-100'}><span className="textcolor-fff font-size-8 opacity-8">回馈</span></div>
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
                            <div className={`${activeNum > 0 ? 'bottom-in' : 'bottom-out'} font-size-9 line-height-1f margin-top-5r `}>
                                <List articlesArr={articleListArr} loadStatus={loadStatus} />
                            </div>
                        </Col>
                    </Row>
                    </div>
                    <div ref={(r) => { this.$$action2 = r; }}>
                    <Row className={"margin-top-5r bg-f5f5f5"} justify="center">
                        <Col span={18}  className={`${activeNum > 1 ? 'bottom-in' : 'bottom-out'}`}>
                            <div className="width-100 textcolor-288767 font-size-large text-align-center margin-top-3r">博客分类</div>
                            <div className="width-100 text-align-center"></div>
                        </Col>
                        <Col span={18} className={`${activeNum > 1 ? 'bottom-in' : 'bottom-out'} margin-top-2r margin-bottom-2r`}>
                            {typeDom}
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
