import fetch from '../servise/request';
import config from '../config/config';

export function createRecord(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'record/doCreate',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function recordList(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'record/recordList',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function recordListForType(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'record/recordListForType',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function recordListForTime(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'record/recordListForTime',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function removeRecord(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'record/removeRecord',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function findType(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'commonType/findType',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function addType(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'commonType/addType',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}
export function removeType(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'commonType/removeType',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function userUpdInfo(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'users/register',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function findUser(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'users/findUser',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function updateUser(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'users/updateUser',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function bannerList(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'banner/bannerList',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function addAccessLog(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'accessLog/addLog',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function logCount(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'accessLog/logCount',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function addMessages(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'Messages/addMessages',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}