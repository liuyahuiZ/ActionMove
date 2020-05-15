import React , { Component }from 'react';
import { Components, utils } from 'neo';
import ImageBird from '../components/imageBird';
import { articleDetail } from '../api/article';

const { Row, Col, PopContainer } = Components;
const { sessions, date } = utils;

function detailPop(itm){
    PopContainer.confirm({
        content: (<Row justify={'center'} className='padding-top-1r'>
            {/* <Col className="padding-all border-bottom border-color-e5e5e5">{itm.title}</Col> */}
            <Col span={20} className="heighth-75 overflow-y-scroll padding-all-1r">
                <Row justify={'center'}>
                    <Col className='textclolor-333 font-size-large margin-bottom-1r'>{itm.title}</Col>
                    <Col span={18}><ImageBird imgName={itm.imgGroup}  /></Col>
                    <Col className='textclolor-black-low margin-top-1r'>作者 {itm.user} / 发布于 {date.momentFormate(itm.createTime, 'YYYY-MM-DD')}  / 查看 {itm.sea} / 属于 {itm.type}</Col>
                    <Col className='textclolor-333'><div dangerouslySetInnerHTML={{__html: itm.content}} /></Col>
                </Row>
            </Col>
            <Col className="text-align-center line-height-3r cursor-pointer" onClick={()=>{PopContainer.closeAll()}}>关闭</Col>
            </Row>),
        type: 'bottom',
        containerStyle: {},
        })
}

export function showArticleDetail(itm){
    articleDetail({id: itm._id}).then((res)=>{
        if(res.code=='0000'){
            detailPop(res.data[0])
        }else{
          
        }
    }).catch((err)=>{
        console.log('err',err)
    })
}