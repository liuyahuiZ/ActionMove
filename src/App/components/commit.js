import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { articleMakeCommit } from '../api/article';

const {
    Buttons,
    Toaster,
    Row,
    Col,
    Icon,
    Modal,
    Input, Textarea, AnTransition
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
          articleId: this.props.articleId,
          name: '',
          message: '',
          code: '',
          email: '',
          isPhone: sessions.getStorage('screenWidth') < 800 
      };
    }
    componentDidMount(){
        
    }

 
    setValue(key,val){
      this.setState({[key]: val});
    }

    addMsg(){
      const self = this;
      const { name, message,articleId } = this.state
      if(!name&&name==='') {
        Toaster.toaster({ type: 'normal', position: 'top', content: '请填写称呼', time: 3000 }, true);
        return false;
      }
      if(!message&&message==='') {
        Toaster.toaster({ type: 'normal', position: 'top', content: '请填写留言信息', time: 3000 }, true);
        return false;
      }
      articleMakeCommit({
        "articleId": articleId,
        "user": name,
        "content": message
      }).then((res)=>{
        console.log(res);
        if(res.respHead.code=='0000'){
          Toaster.toaster({ type: 'normal', position: 'top', content: '评论成功', time: 5000 });
        }else{
          Toaster.toaster({ type: 'normal', position: 'top', content: res.msg, time: 5000 });
        }
      }).catch((err)=>{
        Toaster.toaster({ type: 'normal', position: 'top', content: JSON.stringify(err), time: 5000 });
      })
    }

    render() {
      const { message, name, isPhone} = this.state;
      const self = this;
        return(
          <section className="">
            <Row className="" justify='center'>
                <Col className="bg-show border-all border-color-d9d8d8 padding-all-1r border-radius-5f">
                  <Row className="">
                      <Col span={3} className="text-align-center">
                        <Icon iconName={'android-happy'} size={'190%'} iconColor={'#333'} /> 
                      </Col>
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
                  </Row>
                  
                  <Row className="margin-top-1r">
                      <Col span={3} className=" text-align-center">
                        <Icon iconName={'chatbox-working'} size={'190%'} iconColor={'#333'} /> 
                      </Col>
                      <Col span={21} className="margin-top-1">
                          <Textarea 
                          value={message}
                          placeholder="请输入评论内容"
                          maxLength={100}
                          maxLengthShow={false}
                          style={{border: '0'}}
                          onChange={(v)=>{
                              self.setValue('message',v)
                          }}/>
                      </Col>
                  </Row>
                </Col>
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
                
                
            </Row>
          </section>
        );
    }
}
export default Messages;
