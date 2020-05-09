import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import ImageMove from './imageMove';
import { UrlSearch } from '../utils';
const { Row, Col, Icon, PopContainer } = Components;

const { sessions, storage } = utils;

class Header extends Component {
    constructor(props) {
      super(props);
      this.state = {
         imgName: this.props.imgName,
         className: this.props.className,
         screenWidth: sessions.getStorage('screenWidth'),
         location: location.hash.split('#/')[1],
         containerScrollTop: 0
      };
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            containerScrollTop: nextProps.containerScrollTop
        })
    }
    
    doSheet1(screenWidth){
        const { location, containerScrollTop } = this.state;
        let pScreenWidth = screenWidth;
        console.log(screenWidth, pScreenWidth);
        PopContainer.confirm({
            content: (<div className="bg-262626 ">
                <div className='width-100 text-align-right' onClick={()=>{PopContainer.closeAll()}}>
                <Icon iconName={'close-circled'} size={'200%'} iconColor={ '#fff'} /></div>
              <Row className="padding-all textcolor-868686 bg-262626">
                {/* <Col span={12} onClick={() => { PopContainer.closeAll() }}>关闭</Col>
                <Col span={12}></Col> */}
                <Col className={`${location=='Home'? 'textcolor-fff' :''} line-height-2r padding-all textcolor-868686`}  onClick={()=>{
                            this.handleClick('/Home');
                            PopContainer.closeAll();
                }}>
                首页
                </Col>
                <Col className={`${location=='News'? 'textcolor-fff' :''} line-height-2r padding-all textcolor-868686`}  onClick={()=>{
                            this.handleClick('/News');
                            PopContainer.closeAll();
                        }}>
                行业新闻
                </Col>
                <Col className={`${location=='Events'? 'textcolor-fff' :''} line-height-2r padding-all textcolor-868686`} onClick={()=>{
                            this.handleClick('/Events');
                            PopContainer.closeAll();
                        }}>
                公司动态
                </Col>
              </Row>
              </div>),
            type: 'right',
            containerStyle: { right: '0rem', width: pScreenWidth > 750 ? '50vw': '100vw', background: '#262626'},
        });
    }

    handleClick(link) {
        if(link) {
            hashHistory.push(link);
        }
    }

    render() {
        const { screenWidth, location, containerScrollTop } = this.state;
        console.log('containerScrollTop', containerScrollTop);
        return(
            <div className='heighr-6 overflow-hide width-100 top-0 fixed zindex-20'>
            <Row className={`relative textcolor-868686 line-height-2r padding-left-2r padding-right-2r `}>
                <Col span={6} className='padding-top-1r'>
                    {/* <Icon iconName={'navicon '} size={'240%'} iconColor={ containerScrollTop > 500 ? "#868686": '#fff'} 
                    onClick={()=>{this.doSheet1()}}/> */}
                </Col>
                <Col span={12} className='text-align-center'>
                    <ImageMove  className="middle-round-6" imgName='logo_b.png' />
                </Col>
                <Col span={6} className="relative text-align-right padding-top-1r zindex-20" onClick={()=>{this.doSheet1(screenWidth)}}>
                    <Icon iconName={'navicon '} size={'240%'} iconColor={ containerScrollTop > 500 ? "#868686": '#fff'}  />
                </Col>
                <Col className={`${ containerScrollTop > 500 ? 'bghand' : 'bgtrans'} heighr-6  absolute left-0 top-0`}></Col>
            </Row>
            </div>
        );
    }
}
export default Header;
