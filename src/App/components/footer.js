import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { logCount } from '../api/index';
const { Row, Col, Icon } = Components;

const { sessions, storage } = utils;

class Footer extends Component {
    constructor(props) {
      super(props);
      this.state = {
         pageStatus: this.props.pageStatus,
         screenWidth: sessions.getStorage('screenWidth'),
         allAccess: 0,
         isPhone: sessions.getStorage('screenWidth') < 800 
      };
    }
    componentDidMount() {
        this.getLogCount()
    }

    getLogCount(){
        logCount({}).then((res)=>{
            console.log('res',res)
            this.setState({
                allAccess: res.data.total
            })
        }).catch(()=>{
        })
    }
    
    handleClick(link) {
        if(link) {
            hashHistory.push(link);
        }
    }

    render() {
        const { pageStatus, screenWidth, allAccess, isPhone } = this.state;
        return(
            <Row className='bg-333 opacity-9'>
                <Col className=" padding-bottom-1r  relative">
                    <Row className="zindex-10 padding-bottom-1r margin-bottom-3r relative " justify="center">
                        <Col  span={17} className="margin-top-3r ">
                            <div className="width-100 relative text-align-left line-height-3r textcolor-fff">关于</div>
                            <Row justify="center">
                                <Col span={isPhone ? 16 :8} className='textclolor-black-low'>
                                    <Row className='line-height-2r font-size-small'>
                                        <Col span={4} className="text-align-center"><Icon iconName={'android-happy '} size={'200%'} iconColor={ '#fff'} /></Col>
                                        <Col span={19}>Mr.Andsen</Col>
                                        <Col span={4} className="text-align-center"><Icon iconName={'android-mail '} size={'180%'} iconColor={ '#fff'} /></Col>
                                        <Col span={19}>690385384@qq.com</Col>
                                        <Col span={4} className="text-align-center"><Icon iconName={'android-phone-portrait '} size={'200%'} iconColor={ '#fff'} /></Col>
                                        <Col span={19}>13162698677</Col>
                                        <Col span={4} className="text-align-center"><Icon iconName={'clock '} size={'200%'} iconColor={ '#fff'} /></Col>
                                        <Col span={19}>{allAccess}</Col>
                                    </Row>
                                </Col>
                                <Col span={16}>
                                    <div className="width-100 line-height-2r font-size-small textclolor-black-low">
                                    <p>Coder Mr.Andsen, 技术宅，设计爱好者，动漫迷，游戏迷，目前工作地 上海浦东<br/>技术栈 ：web前端，UI设计，nodejs koa2 mongodb，react，vue，ReactNative <br/>
                                    GitHub个人主页地址： <a className='font-size-small textclolor-black-low' target='_blank' href="https://github.com/liuyahui">https://github.com/liuyahuiZ</a><br/>
                                    站酷个人主页地址：<a className='font-size-small textclolor-black-low' target='_blank' href="http://paoying.zcool.com.cn">http://paoying.zcool.com.cn</a><br/></p>
                                    </div>
                                    <div className='width-100 line-height-2r'><a className='font-size-small textclolor-black-low' target='_blank' href="http://www.beian.miit.gov.cn/">沪ICP备20015330号</a></div>
                                    <div className='width-100 line-height-2r font-size-small textclolor-black-low'>Copyright © 2016-2021 wetalks.cn All Rights Reserved</div>
                                </Col>
                                
                            </Row>
                        </Col>
                        
                    </Row>
                </Col>
                {/* <Col className="line-height-3r relative text-align-center bg-000 textcolor-fff">Copyright� 小鸟环保 fit-time.com 版权所有    |    苏ICP备14047316号-3</Col> */}
                </Row>
        );
    }
}
export default Footer;
