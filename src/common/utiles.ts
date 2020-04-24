let util: any = {};

util.title = (title: any) => {
    title = '数据平台' + title;
    window.document.title = title;
};

export default util;