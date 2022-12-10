export const queryToObject = (str: string = '') => {
    const pureStr = str.split('?')[1] || str;
    if (!pureStr) return {};
    return Object.fromEntries(pureStr.split('&').map(it => {
        return it.split('='); 
    }));
};

export const setDomFullscreen = (div: HTMLDivElement | null, open: boolean = false) => {
    // @ts-ignore
    const openFn = div.requestFullscreen || div.mozRequestFullScreen || div.webkitRequestFullScreen || div.msRequestFullscreen;
    // @ts-ignore
    const cancelFn = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
    open ? openFn.call(div, { navigationUI: 'hide' }) : cancelFn.call(document);
}

export const multyListener = (el: HTMLElement, listenerList: string, callback: Function) => {
    listenerList.split(' ').forEach(event => {
        el.addEventListener(event, (ev) => callback(ev));
    });
}

export const classNames = (classes: Object) => {
    return Object.entries(classes).map(([key, val]) => {
        if (val) {
            return key;
        }
        return false;
    }).filter(Boolean).join(" ");
}