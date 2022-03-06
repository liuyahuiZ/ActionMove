import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import ImageMove from './imageMove';
import { goLink, getHeaderClass } from '../utils/common';
import { socketLogin } from '../servise/socketClient';
// import Light from './light';
const { Row, Col, Icon, PopContainer, ExModal, AnTransition } = Components;

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
         menu: [{title: '列表', path: '/VideoList'}],
        MDdisplay: '',
        MDaction: 'enter',
      };
    }
    componentDidMount() {
        socketLogin((res)=>{
            console.log(res)
        })
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            containerScrollTop: nextProps.containerScrollTop,
            activeKey: nextProps.pathname,
        })
    }
    showReset(){
        this.setState({
            MDdisplay: 'show',
            MDaction: 'enter', 
          })
    }
    hideResetModal(){
        this.setState({
          MDdisplay: 'hide',
          MDaction: 'leave',
        })
    }

    jumpTo(url){
        url && window.open(url);
    }
    
    doSheet1(screenWidth){
        const { location, containerScrollTop, menu, activeKey } = this.state;
        console.log('location', location)
        let pScreenWidth = screenWidth;
        const self = this;
        let menuDom = menu&&menu.length > 0 ? menu.map((itm, idx)=>{
            return (<AnTransition
                delay={idx*300}
                act={'enter'}
                duration={166}
                enter={'bottom-in'}
                leave={'bottom-out'}
                key={`${idx}-ops`}
            ><Col span={24} key={`${idx}-men`} className={`${(itm.path == `/${location}` || itm.path ==  activeKey) ? 'menu-active':'menu-default'} transf text-align-center line-height-3r heighr-3 border-radius-9r margin-bottom-1r`}>
                <div className={` textcolor-6C727C font-size-14 cursor-pointer border-radius-9r menu-hover`} 
                style={itm.path == activeKey ? { 'textDecoration': 'line-through', 'fontSize': '160%' } : { 'fontSize': '140%' } }
                 onClick={()=>{ self.setState({'activeKey': itm.path});
                 goLink(itm.path);
                 PopContainer.closeAll()
                 }}>
                {itm.title}
                </div>
            </Col></AnTransition>)
        }) : ''

        PopContainer.confirm({
            content: (<div className=" relative heighth-100 overflow-hide">
                <div className='width-100 text-align-right cursor-pointer' onClick={()=>{PopContainer.closeAll()}}>
                <Icon iconName={'close-circled'} size={'200%'} iconColor={ '#fff'} /></div>
                <Row className="padding-all textcolor-868686 zindex-6 relative">
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
        const { screenWidth, location, containerScrollTop, MDdisplay, MDaction, menu, activeKey } = this.state;
        let pScreenWidth = screenWidth;
        const self = this;

        return(
            <div className='heighr-6 overflow-hide width-100 top-0 fixed zindex-20'>
            <Row className={`relative textcolor-868686 line-height-2r padding-left-1r padding-right-1r `}>
                <Col span={6} className='padding-top-1r'>
             
                </Col>
                <Col span={12} className='text-align-center'>
                   {/* <ImageMove  className={`middle-round-6 display-inline-block backdrop-filter-5 border-radius-round ${containerScrollTop > 500 ? 'hide-in': 'hide-out'}`} imgName='logo_b.png' /> */}
                </Col>
                <Col span={6} className="relative text-align-right padding-top-1r zindex-20 cursor-pointer" onClick={()=>{this.doSheet1(screenWidth)}}>
                    { containerScrollTop > 500 ? <Icon iconName={'navicon '} size={'240%'} iconColor={"#333"}  />: 
                <Icon iconName={'navicon '} size={'240%'} iconColor={location!=='Home'? '#333' :"#fff"}  /> }
                </Col>
                {/* <Col className={`${ containerScrollTop > 500 ? 'bghand' : 'bgtrans'} heighr-6  absolute left-0 top-0`}></Col> */}
            </Row>
            </div>
        );
    }
}
export default Header;
