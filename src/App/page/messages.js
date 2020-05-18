import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import { UrlSearch } from '../utils';
import { addMessages } from '../api/index'
import { goLink } from '../utils/common';

const {
    Buttons,
    Toaster,
    Header,
    Item,
    Row,
    Col,
    Icon,
    Modal,
    Input, Editor
  } = Components;
const { sessions, storage } = utils;
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
          isPhone: sessions.getStorage('screenWidth') < 800 
      };
    }
    componentDidMount(){
        let obg = UrlSearch();
    }

    setValue(key,val){
      this.setState({[key]: val});
    }

    addMsg(){
      const self = this;
      const { phone, name, email } = this.state
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
        }else{
          Toaster.toaster({ type: 'normal', position: 'top', content: res.msg, time: 5000 });
        }
      }).catch((err)=>{
        Toaster.toaster({ type: 'normal', position: 'top', content: JSON.stringify(err), time: 5000 });
      })
    }

    render() {
      const { phone, code, message, name, email, isPhone} = this.state;
      const self = this;
        return(
          <section className="bg-f5f5f5">
            <Row className="padding-all " justify='center'>
                <Col span={isPhone? 24: 20} className="bg-show margin-top-2 padding-all-1r border-radius-5f">
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
                        <Icon iconName={'iphone'} size={'250%'} iconColor={'#333'} /> 
                      </Col>
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
                  </Row>
                  <Row className="margin-top-1r">
                      <Col span={3} className=" text-align-center">
                        <Icon iconName={'email'} size={'190%'} iconColor={'#333'} /> 
                      </Col>
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
                  </Row>
                  <Row className="margin-top-1r">
                      <Col span={3} className=" text-align-center">
                        <Icon iconName={'chatbox-working'} size={'190%'} iconColor={'#333'} /> 
                      </Col>
                      <Col span={21}>
                      <Editor
                          ref={(r)=>{
                            self.$$editor = r
                          }}
                          />
                      </Col>
                  </Row>
                </Col>
                
                <Col span={isPhone? 20 :6} className="margin-top-5r padding-all-1r" >
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
            {/* </div> */}
          </section>
        );
    }
}
export default Messages;
