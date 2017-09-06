// 获取URL中的参数值
export const getUrlparams = function () {
    let obj = {};
    let reg = /([^?=&]+)=([^?=&]+)/g;
    window.location.href.replace(reg, function() {
        obj[arguments[1]] = arguments[2];
    });
    return obj;
}
