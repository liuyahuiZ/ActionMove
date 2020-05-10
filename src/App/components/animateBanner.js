import React , { Component }from 'react';
import { Components, utils } from 'neo';
import ImageMove from './imageMove';

const { Row, Col, Icon } = Components;
const { sessions, storage } = utils;

class AnimateBanner extends Component {
    constructor(props) {
      super(props);
      this.state = {
         nowStyle: {},
         dotNum: 0,
         options: [{imgName: 'monty.jpg', enterClass: 'move-to-right', leaveClass: ''},
            {imgName: 'city.jpg', enterClass: 'move-to-bottom', leaveClass: ''},
            {imgName: 'star.jpg', enterClass: 'move-to-left', leaveClass: ''}],
         screenWidth: sessions.getStorage('screenWidth'),
      };
    }
    componentDidMount() {
        this.move()
    }

    move() {
        const arr = this.state.options;
        let dotNum = this.state.dotNum;
        const self = this;
        setInterval(() => {
            this.changeActive(dotNum);
            dotNum += 1;
            if (dotNum === arr.length) {
              dotNum = 0;
            }
        }, 8000);
    }

    changeActive(dotNum){
        this.setState({
            dotNum: dotNum
        })
    }

    render() {
        const { imgName, dotNum, options, screenWidth } = this.state;
        const imgDom = options&&options.length>0 ? options.map((itm, idx)=>{
            return <ImageMove action={dotNum !== idx ? 'leave' :'enter'} key={`${idx}-img`} style={{}} className={`${itm.enterClass} ${screenWidth > 750 ? 'width-120': ''}`} imgName={itm.imgName} />
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
