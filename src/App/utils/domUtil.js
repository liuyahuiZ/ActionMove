import React , { Component }from 'react';
import { Components, utils } from 'neo';
import ImageBird from '../components/imageBird';
import Commit from '../components/commit';
import { articleDetail, articleMakeCommit } from '../api/article';

const { Row, Col, PopContainer, Toaster, Icon } = Components;
const { sessions, date } = utils;

function mkCommit(itm){
    articleMakeCommit({
        user: '',
        content: '',
        _id: itm._id
    }).then((res)=>{
        if(res.code=='0000'){

        }else{
          Toaster.toaster({ type: 'normal', position: 'top', content: '请填写手机号', time: 3000 }, true);
          return false;
        }
    }).catch((err)=>{
        console.log('err',err)
    })
}
function detailPop(itm, comment){
    const comentDom = comment&&comment.length>0?comment.map((itm, idx)=>{
        return <Row className="textclolor-333 margin-bottom-3r">
            <Col className='textclolor-black-low font-size-small margin-top-1r'>
            <Icon iconName={'android-happy'} size={'190%'} iconColor={'#999'} /> <span className='font-size-large textclolor-333'>{itm.user||'--'}</span> / 评论于 {date.momentFormate(itm.createTime, 'YYYY-MM-DD HH:mm:ss')} </Col>
            <Col className='textclolor-333 font-size-normal'><div dangerouslySetInnerHTML={{__html: itm.content}} /></Col>
        </Row>
    }): ''
    PopContainer.confirm({
        content: (<Row justify={'center'} className='padding-top-1r'>
            {/* <Col className="padding-all border-bottom border-color-e5e5e5">{itm.title}</Col> */}
            <Col span={20} className="heighth-80 overflow-y-scroll padding-all-1r">
                <Row justify={'center'}>
                    <Col className='textclolor-333 font-size-large margin-bottom-1r'>{itm.title}</Col>
                    <Col span={18}><ImageBird imgName={itm.imgGroup}  /></Col>
                    <Col className='textclolor-black-low margin-top-1r'>作者 {itm.user} / 发布于 {date.momentFormate(itm.createTime, 'YYYY-MM-DD')}  / 查看 {itm.sea} / 属于 {itm.type}</Col>
                    <Col className='textclolor-333'><div dangerouslySetInnerHTML={{__html: itm.content}} /></Col>
                </Row>
                <Row className="margin-top-3r">
                    <Col className="font-size-large textclolor-333">评论列表</Col>
                    <Col className="margin-top-1r margin-bottom-2r"><Commit articleId={itm._id} /></Col>
                    {comentDom}
                </Row>
            </Col>
            <Col className="text-align-center line-height-3r cursor-pointer border-top border-color-e5e5e5" onClick={()=>{PopContainer.closeAll()}}>关闭</Col>
            </Row>),
        type: 'bottom',
        containerStyle: {},
    })
}

export function showArticleDetail(itm){
    articleDetail({id: itm._id}).then((res)=>{
        if(res.code=='0000'){
            detailPop(res.data.article, res.data.comment)
        }else{
          
        }
    }).catch((err)=>{
        console.log('err',err)
    })
}