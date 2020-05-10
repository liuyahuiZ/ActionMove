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
         options: [{imgName: 'monty.jpg', x: { start:0 , limit: 300, addp: 1, isNegative: true}},
            {imgName: 'city.jpg', y: {start:0 , limit: -300, addp: 1, isNegative: true}}],
         optionsPer: [1,1],
         styleArr: [{},{}],
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
        // this.setState({
        //     optionsPer: [0,1,0]
        // })
        self.changeStyle(arr[dotNum], dotNum);
        setInterval(()=>{
            self.setState({
                optionsPer: [0,0,0]
            })
            self.changeStyle(arr[dotNum], dotNum);
            dotNum += 1;
            if (dotNum === arr.length) {
                dotNum = 0;
            }
            self.setState({
                dotNum: dotNum
            })
        }, 5000)
    }

    changeStyle(itm, idx){
        const self = this;
        let start= this.state.optionsPer;
        let styleArr = this.state.styleArr;
        const animate = () => {
            if(itm.x){
                if (start[idx] < itm.x.limit ) {
                    start[idx] += itm.x.addp;
                    styleArr[idx] = {
                        transform: `translate3d(${itm.x.isNegative? '-':''}${start[idx]}px,0px,0px) scale(1,1)`
                    }
                    self.setState({
                        styleArr: styleArr,
                        optionsPer: start
                    });
                    window.requestAnimationFrame(animate)
                }
            }
            if(itm.y){
                if (start[idx] < itm.y.limit ) {
                    start[idx] += itm.y.addp;
                    styleArr[idx] = {
                        transform: `translate3d(0px,${itm.y.isNegative? '-':''}${start[idx]}px,0px) scale(1,1)`
                    }
                    self.setState({
                        styleArr: styleArr,
                        optionsPer: start
                    });
                    window.requestAnimationFrame(animate)
                }
            }
            if(itm.scale){
                if (start[idx] < itm.scale.limit ) {
                    start[idx] += itm.scale.addp;
                    styleArr[idx] = {
                        transform: `translate3d(0px,0px,0px) scale(${itm.scale.isNegative? '-':''}${start[idx]},${itm.scale.isNegative? '-':''}${start[idx]})`
                    }
                    self.setState({
                        styleArr: styleArr,
                        optionsPer: start
                    });
                    window.requestAnimationFrame(animate)
                }
    
            }
        }
        window.requestAnimationFrame(animate)
        
    }

    render() {
        const { imgName, styleArr, dotNum, options, screenWidth } = this.state;
        const imgDom = options&&options.length>0 ? options.map((itm, idx)=>{
            return <ImageMove action={dotNum !== idx ? 'leave' :'enter'} key={`${idx}-img`} style={styleArr[idx]} className={screenWidth > 750 ? 'width-120': ''} imgName={itm.imgName} />
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
