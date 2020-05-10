import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import ImageMove from './imageMove';
import { goLink, getHeaderClass } from '../utils/common';
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
         containerScrollTop: 0,
         activeKey: this.props.pathname,
         menu: [{title: '首页', path: '/Home'},
          {title: '博客', path: '/ArticleList'},
          {title: '音乐', path: '/MusicCategory'},
          {title: '留言', path: '/MusicCategory'},
          {title: '日历', path: '/Clender'}]
      };
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps){
        console.log('nextProps.containerScrollTop', nextProps.containerScrollTop)
        this.setState({
            containerScrollTop: nextProps.containerScrollTop
        })
    }
    
    doSheet1(screenWidth){
        const { location, containerScrollTop, menu, activeKey } = this.state;
        let pScreenWidth = screenWidth;
        console.log(screenWidth, pScreenWidth);
        const self = this;
        let menuDom = menu&&menu.length > 0 ? menu.map((itm, idx)=>{
            return (<Col span={24} key={`${idx}-men`} className={`${itm.path == activeKey ? 'menu-default':'menu-active'} transf text-align-center  line-height-3r heighr-3 border-radius-9r margin-bottom-1r`}>
                <div className={` textcolor-6C727C font-size-14 cursor-pointer border-radius-9r`} 
                style={itm.path == activeKey ? { 'textDecoration': 'line-through', 'color': '#fff', 'fontSize': '160%' } : { 'color': '#000', 'fontSize': '140%' } }
                 onClick={()=>{ self.setState({'activeKey': itm.path});
                 goLink(itm.path);
                 PopContainer.closeAll()
                 }}>
                {itm.title}
                </div>
            </Col>)
        }) : ''

        PopContainer.confirm({
            content: (<div className="bg-262626 ">
                <div className='width-100 text-align-right' onClick={()=>{PopContainer.closeAll()}}>
                <Icon iconName={'close-circled'} size={'200%'} iconColor={ '#fff'} /></div>
              <Row className="padding-all textcolor-868686 bg-262626">
                {menuDom}
              </Row>
              </div>),
            type: 'right',
            containerStyle: { right: '0rem', width: pScreenWidth > 750 ? '35vw': '70vw', background: '#262626'},
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
                    <ImageMove  className="middle-round-6 display-inline-block" imgName='logo_b.png' />
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
