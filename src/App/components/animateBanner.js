import React , { Component }from 'react';
import { Components, utils } from 'neo';
import ImageMove from './imageMove';
import ImageBirdMove from './imageBirdMove';
import { bannerList, bannerListForCode } from '../api/index';
const { Row, Col, Icon } = Components;
const { sessions, storage } = utils;

class AnimateBanner extends Component {
    constructor(props) {
      super(props);
      this.state = {
         nowStyle: {},
         dotNum: 0,
         options: [{enterClass: 'move-to-right', leaveClass: ''},
            {enterClass: 'move-to-bottom', leaveClass: ''},
            {enterClass: 'move-to-left', leaveClass: ''},
            {enterClass: 'move-to-top', leaveClass: ''}],
         screenWidth: sessions.getStorage('screenWidth'),
         banners:[],
         isPhone: sessions.getStorage('screenWidth') < 800 
      };
    }
    componentDidMount() {
        this.getBannerList()
    }

    componentWillReceiveProps(){
    }

    getBannerList(){
        bannerListForCode({code: 'mymove'}).then((res)=>{
            if(res.code=='0000'&&res.data&&res.data.records.length>0){
                this.setState({
                    banners: res.data.records
                },()=>{
                    this.move()
                })
            }
        }).catch(()=>{

        })
    }
    move() {
        const arr = this.state.banners;
        let dotNum = this.state.dotNum;
        const self = this;
        setInterval(() => {
            this.changeActive(dotNum);
            dotNum += 1;
            if (dotNum >= arr.length) {
              dotNum = 0;
            }
        }, 7000);
    }

    changeActive(dotNum){
        this.setState({
            dotNum: dotNum
        })
    }

    render() {
        const { imgName, dotNum, options, screenWidth, banners, isPhone } = this.state;
        const imgDom = banners&&banners.length>0 ? banners.map((itm, idx)=>{
            return <ImageBirdMove action={dotNum !== idx ? 'leave' :'enter'} key={`${idx}-img`} style={{}} className={`${options[idx%3].enterClass} ${ isPhone ? 'heighth-120 width-auto'  : 'width-150'}`} imgName={itm.imgGroup} />
        }) : ''
        return(
            <div className='relative bg-000'>
                {imgDom}
                <div className='width-100 absolute left-0 heightp-100  bg-000'></div>
            </div>
        );
    }
}
export default AnimateBanner;
