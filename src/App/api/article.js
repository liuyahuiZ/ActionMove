import fetch from '../servise/request';
import config from '../config/config';

export function articleList(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'article/getArticle',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function articleListForType(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'article/typeArticleList',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function typeList(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'blockType/findType',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}