import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import { UrlSearch } from '../utils';
import { addMessages, messagesList } from '../api/index'
import PageNation from '../components/pageNation';
import LoadText from '../components/LoadText';
import { goLink } from '../utils/common';

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
class Messages extends Component {
    constructor(props) {
      super(props);
      this.state = {
          userInfo: storage.getStorage('userInfo') || {
            nickname: ''
          },
          phone: '',
          name: '',
          message: '',
          code: '',
          email: '',
          messageList: [],
          currentPage: 1,
          pageSize: 20,
          loadStatus: 'LOADING', //'LOADING', 'ERROR', 'SUCCESS', 'NODATA',
          pageInfo: {},
          isPhone: sessions.getStorage('screenWidth') < 800 
      };
    }
    componentDidMount(){
        let obg = UrlSearch();
        const { currentPage, pageSize } = this.state;
        this.getMessageList({current: currentPage, pageSize: pageSize });
    }

    getMessageList(obg){
      messagesList(obg).then((res)=>{
        if(res.code=='0000'){
            this.setState({
              messageList: res.data.records,
              loadStatus: res.data.records.length==0? 'NODATA': 'SUCCESS',
              pageInfo: res.data.pageInfo
            })
        }else{
          this.setState({
            messageList: [],
            loadStatus: 'NODATA'
          })
        }
    }).catch((err)=>{
        console.log('err',err)
        this.setState({
          messageList: [],
          loadStatus: 'ERROR'
        })
    })
    }
    setValue(key,val){
      this.setState({[key]: val});
    }


    addMsg(){
      const self = this;
      const { phone, name, email, currentPage,  pageSize} = this.state
      let message = self.$$editor.getValue();
      if(!name&&name==='') {
        Toaster.toaster({ type: 'normal', position: 'top', content: '请填写称呼', time: 3000 }, true);
        return false;
      }
      if(!phone&&phone==='') {
        Toaster.toaster({ type: 'normal', position: 'top', content: '请填写手机号', time: 3000 }, true);
        return false;
      }
      if(!message&&message==='') {
        Toaster.toaster({ type: 'normal', position: 'top', content: '请填写留言信息', time: 3000 }, true);
        return false;
      }
      addMessages({
        "phone": phone,
        "userName": name,
        "email": email,
        "message": message
      }).then((res)=>{
        console.log(res);
        if(res.respHead.code=='0000'){
          Toaster.toaster({ type: 'normal', position: 'top', content: '留言成功', time: 5000 });
          self.getMessageList({current: currentPage, pageSize: pageSize });
        }else{
          Toaster.toaster({ type: 'normal', position: 'top', content: res.msg, time: 5000 });
        }
      }).catch((err)=>{
        Toaster.toaster({ type: 'normal', position: 'top', content: JSON.stringify(err), time: 5000 });
      })
    }

    render() {
      const { phone, code, message, name, email, isPhone, messageList, loadStatus, pageInfo} = this.state;
      const self = this;
      let messageDom = messageList&&messageList.length>0 ? messageList.map((itm, idx)=>{
        return (<AnTransition
          delay={(idx)*600}
          act={'enter'}
          duration={166}
          enter={'listTem-enter'}
          leave={'listTem-leave'}
          key={`${idx}-ops`}
      ><Col className="textclolor-333 margin-bottom-3r" >
            <Row className="">
              <Col className='textclolor-black-low font-size-small margin-top-1r'>
              <Icon iconName={'android-happy'} size={'190%'} iconColor={'#999'} /> <span className='font-size-large textclolor-333'>{itm.userName||'--'}</span> / 留言于 {date.momentFormate(itm.createTime, 'YYYY-MM-DD HH:mm:ss')} </Col>
              <Col className='textclolor-333 font-size-normal'><div dangerouslySetInnerHTML={{__html: itm.message}} /></Col>
            </Row>
        </Col></AnTransition>)
    }) : <LoadText loadTextStatus={loadStatus} refreshBack={()=>{this.props.getMessageList()}} ></LoadText>
        return(
          <section className="bg-f5f5f5" >
            <Row className="padding-all " justify='center'>
                <Col span={isPhone? 24: 20} className="bg-show margin-top-2 padding-top-2r overflow-hide padding-left-1r padding-right-1r padding-bottom-3r border-radius-5f content-dom" >
                  <Row className="">
                      <AnTransition delay={300} act={'enter'} duration={166} enter={'small-left-in'} leave={'left-out'}>
                        <Col span={3} className="text-align-center">
                        <Icon iconName={'android-happy'} size={'190%'} iconColor={'#333'} />
                        </Col></AnTransition>
                      <AnTransition delay={5*300} act={'enter'} duration={166} enter={'right-logo'} leave={'right-out'}>
                        <Col span={21}>
                        <Input
                            value={name}
                            placeholder="请输入称呼"
                            maxLength={100}
                            onChange={(e,t,v)=>{
                                self.setValue('name',v)
                            }}
                            />
                        </Col>
                      </AnTransition>
                  </Row>
                  <Row className="margin-top-1r">
                      <AnTransition delay={2*300} act={'enter'} duration={166} enter={'small-left-in'} leave={'left-out'}>
                      <Col span={3} className=" text-align-center">
                        <Icon iconName={'iphone'} size={'250%'} iconColor={'#333'} /> 
                      </Col>
                      </AnTransition>
                      <AnTransition delay={6*300} act={'enter'} duration={166} enter={'right-logo'} leave={'right-out'}>
                      <Col span={21}>
                      <Input
                          value={phone}
                          placeholder="请输入手机号"
                          maxLength={100}
                          onChange={(e,t,v)=>{
                              self.setValue('phone',v)
                          }}
                          />
                      </Col>
                      </AnTransition>
                  </Row>
                  <Row className="margin-top-1r">
                      <AnTransition delay={3*300} act={'enter'} duration={166} enter={'small-left-in'} leave={'left-out'}>
                      <Col span={3} className=" text-align-center">
                        <Icon iconName={'email'} size={'190%'} iconColor={'#333'} /> 
                      </Col>
                      </AnTransition>
                      <AnTransition delay={7*300} act={'enter'} duration={166} enter={'right-logo'} leave={'right-out'}>
                      <Col span={21}>
                      <Input
                          value={email}
                          placeholder="请输入邮箱"
                          maxLength={100}
                          onChange={(e,t,v)=>{
                              self.setValue('email',v)
                          }}
                          />
                      </Col>
                      </AnTransition>
                  </Row>
                  <Row className="margin-top-1r">
                      <AnTransition delay={4*300} act={'enter'} duration={166} enter={'small-left-in'} leave={'left-out'}>
                      <Col span={3} className=" text-align-center">
                        <Icon iconName={'chatbox-working'} size={'190%'} iconColor={'#333'} /> 
                      </Col>
                      </AnTransition>
                      <AnTransition delay={8*300} act={'enter'} duration={166} enter={'right-logo'} leave={'right-out'}>
                      <Col span={18} className="margin-top-1">
                      <Editor
                          ref={(r)=>{
                            self.$$editor = r
                          }}
                          />
                      </Col>
                      </AnTransition>
                  </Row>
                </Col>
                <AnTransition delay={9*300} act={'enter'} duration={166} enter={'right-logo'} leave={'right-out'}>
                <Col span={isPhone? 20 : 18} className='font-size-small margin-top-2r textclolor-black-low'>留言会公开显示，请勿在留言内容写下微信号等私人联系方式，谨防诈骗。如果你不想发布公开留言，也可以发送邮件到 690385384@qq.com 与我联系。
                </Col>
                </AnTransition>
                <AnTransition delay={10*300} act={'enter'} duration={166} enter={'right-logo'} leave={'right-out'}>
                <Col span={isPhone? 20 :7} className="margin-top31r padding-all-1r" >
                  <Buttons
                    text="提交"
                    type={'primary'}
                    size={'large'}
                    style={{backgroundColor: '#333', color:'#fff', borderRadius: '3rem'}}
                    onClick={()=>{
                      this.addMsg()
                    }}
                  />
                </Col>
                </AnTransition>
                <AnTransition delay={12*300} act={'enter'} duration={166} enter={'right-logo'} leave={'right-out'}>
                <Col span={isPhone? 24: 20} >
                  <Row className="width-100 textcolor-288767 font-size-large margin-top-3r">留言板</Row>
                  <Row>{messageDom}</Row>
                </Col>
                </AnTransition>
                <AnTransition delay={13*300} act={'enter'} duration={166} enter={'right-logo'} leave={'right-out'}>
                <Col span={isPhone? 20 : 18}>
                <PageNation getData={(pageNum)=>{
                self.setState({
                    currentPage: pageNum
                },()=>{ self.getMessageList({current: pageNum, pageSize: pageSize, searchObg: searchObg }) })
                
                }} pageInfo={pageInfo} />
                </Col>
                </AnTransition>
            </Row>
            {/* </div> */}
          </section>
        );
    }
}
export default Messages;
