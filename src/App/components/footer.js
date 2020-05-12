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
                                    <div className="width-100 relative text-align-left line-height-2r"></div>
                                </Col>
                                <Col span={16}>
                                    <div className="width-100 line-height-3r"></div>

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
