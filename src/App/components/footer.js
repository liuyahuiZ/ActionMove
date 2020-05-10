import React , { Component }from 'react';
import { Components, utils } from 'neo';
const { Row, Col, Icon } = Components;

const { sessions, storage } = utils;

class Footer extends Component {
    constructor(props) {
      super(props);
      this.state = {
         pageStatus: this.props.pageStatus,
         screenWidth: sessions.getStorage('screenWidth')
      };
    }
    componentDidMount() {
    }
    
    handleClick(link) {
        if(link) {
            hashHistory.push(link);
        }
    }

    render() {
        const { pageStatus, screenWidth } = this.state;
        return(
            <Row className='bg-333 opacity-8'>
                <Col className=" padding-bottom-1r bg-F6F6F6 relative">
                    <Row className="zindex-10 padding-bottom-1r margin-bottom-3r relative " justify="center">
                        <Col  span={14} className="margin-top-3r ">
                            <Row justify="center">
                                <Col span={8}>
                                    <div className="width-100 relative text-align-left line-height-3r">关于</div>
                                    <div className="width-100 relative text-align-left line-height-2r">商务合作：bird@time.com</div>
                                    <div className="width-100 relative text-align-left line-height-2r">客服电话：021-54930202</div>
                                    <div className="width-100 relative text-align-left line-height-2r">工作时间：9:30-18:30</div>
                                </Col>
                                <Col span={16}>
                                    <div className="width-100 line-height-3r"></div>
                                    <div className="width-100 line-height-2r font-size-8">上海小鸟投资管理有限公司（小鸟投资）成立于2015年5月20日。<br/>
公司坐落于全国科技、贸易、信息、金融和航运中心上海。<br/>
上海小鸟环保科技有限公司（小鸟环保）是小鸟投资旗下的控股公司。<br/>
“小鸟环保”是一家致力于生活垃圾无害化处理，餐厨垃圾资源化利用以及餐饮废水处理技术研发、设备生产与技术服务为一体的企业。</div>
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
