import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { socketSendMessage, socketGetMessage, heardLogin } from '../servise/socketClient';

const {
    Buttons,
    Toaster,
    Row,
    Col,
    Icon,
    Modal,
    Input, Editor, AnTransition
  } = Components;
const { sessions, storage, date } = utils;
class Chat extends Component {
    constructor(props) {
      super(props);
      this.state = {
          userInfo: storage.getStorage('userInfo') || {
            nickname: ''
          },
          phone: '',
          name: '',
          messageText: '',
          userId: storage.getStorage('userClient'),
          email: '',
          messageList: sessions.getStorage('messageList')||[],
          currentPage: 1,
          pageSize: 20,
          loadStatus: 'LOADING', //'LOADING', 'ERROR', 'SUCCESS', 'NODATA',
          pageInfo: {},
          nowAccount: 0,
          isPhone: sessions.getStorage('screenWidth') < 800 
      };
    }
    componentDidMount(){
      const self = this;
      let neMessageList =  this.state.messageList
      socketGetMessage((res)=>{
        console.log('GetMessage', res);
        neMessageList.push(res)
        self.setState({
          messageList: neMessageList
        })
        sessions.setStorage('messageList', neMessageList)
      })

      heardLogin((res)=>{
        console.log('res nowAccount', res);
        self.setState({
          nowAccount: res.onlineCount
        })
      })
    }

    setValue(key,val){
      this.setState({[key]: val});
    }


    addMsg(){
      const self = this;
      let message = self.$$editor.getValue();
  
      if(!message&&message==='') {
        Toaster.toaster({ type: 'normal', position: 'top', content: '请填写留言信息', time: 3000 }, true);
        return false;
      }
      socketSendMessage(message, (res)=>{
        console.log('res', res);
        self.setState({
          messageText: '-'
        })
      })
    }

    render() {
      const { messageList, isPhone, messageText, userId, nowAccount} = this.state;
      const self = this;
      let messageDom = messageList.map((itm, idx)=>{
        return (<AnTransition
          delay={(idx)*200}
          act={'enter'}
          duration={166}
          enter={'listTem-enter'}
          leave={'listTem-leave'}
          key={`${idx}-ops`}
          ><Col className={`textclolor-333 margin-bottom-1r  ${itm.userid==userId? 'text-align-right': ''}`} >
                <Row justify={ itm.userid==userId? 'flex-end': 'flex-start'} className={` relative ${itm.userid==userId? 'padding-right-3r': 'padding-left-3r'}`}>
                  <Col className={`absolute textclolor-black-low font-size-small ${itm.userid==userId? 'right-0': 'left-0'}`}>
                    <Icon iconName={'android-happy'} size={'240%'} iconColor={'#999'} />  
                  </Col>
                  <Col style={{width: 'auto'}} className={`display-inline-block textclolor-333 font-size-normal padding-left-1r padding-top-fm padding-bottom-fm padding-right-1r border-radius-5f ${itm.userid==userId? 'textcolor-fff bg-6E9EFB': 'textclolor-black-low bg-show'}`}>
                    <div dangerouslySetInnerHTML={{__html: itm.content}} />
                    <div className={`font-size-small ${itm.userid==userId? 'textcolor-fff': 'textclolor-black-low'} margin-top-1r`}>{itm.username} | {date.momentFormate(itm.time, 'YYYY-MM-DD HH:mm')}</div>
                  </Col>
                </Row>
            </Col></AnTransition>)
        })
        return(
          <section className="bg-f5f5f5" >
            <Row className="padding-all " justify='center'>
                <Col span={isPhone? 24: 20} className='heighth-60 overflow-y-scroll padding-right-1r'>
                <div className='width-100 display-inline-block text-align-center font-size-small textclolor-black-low'>当前在线人数（{nowAccount}）</div>
                <Row className="margin-top-1r">{messageDom}</Row>
                </Col>
                <Col span={isPhone? 24: 20} className="bg-show margin-top-2 padding-top-1r overflow-hide padding-left-1r padding-right-1r padding-bottom-1r border-radius-5f content-dom" >
                  <Row className="" justify='center'>
                      <AnTransition delay={8*300} act={'enter'} duration={166} enter={'right-logo'} leave={'right-out'}>
                      <Col span={21} className=" editor">
                      <Editor value={messageText} ref={(r)=>{
                            self.$$editor = r
                      }} />
                      </Col>
                      </AnTransition>
                      <AnTransition delay={10*300} act={'enter'} duration={166} enter={'right-logo'} leave={'right-out'}>
                      <Col span={3} className="margin-top-2r text-align-center" >
                        <Buttons
                          text={<Icon iconName={'paper-airplane'} size={'190%'} iconColor={'#fff'} />}
                          type={'primary'}
                          size={'small'}
                          style={{height:'3rem', width: '3rem', minWidth: 'auto', backgroundColor: '#333', color:'#fff', borderRadius: '3rem'}}
                          onClick={()=>{
                            this.addMsg()
                          }}
                        />
                      </Col>
                      </AnTransition>
                  </Row>
                </Col>
            </Row>
          </section>
        );
    }
}
export default Chat;
