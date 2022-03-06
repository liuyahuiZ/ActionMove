import fetch from '../servise/request';
import config from '../config/config';

export function articleList(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'video/getArticle',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function articleDetail(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'video/articleDetail',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function articleListForType(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'video/typeArticleList',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function articleFindCommit(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'video/findCommit',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function articleMakeCommit(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'video/makeCommit',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function typeList(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'videoType/findType',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}