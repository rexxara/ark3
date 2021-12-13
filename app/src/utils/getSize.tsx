import { isAndroid } from "./utils"

interface CacheMap {
    [arg: string]: string | number
}

let vwCacheMap: CacheMap = {}
const vw = (num: number, ignorePx?: boolean): string | number => {
    const { clientHeight, clientWidth } = document.documentElement
    if (vwCacheMap[num]) {
        return vwCacheMap[num]
    }
    if (clientHeight > clientWidth && !isAndroid()) {
        //手机
        let res: string | number = clientHeight / 100 * num;
        if (!ignorePx) {
            res = res + 'px';
        }
        vwCacheMap[num] = res
        return res
    } else {
        //pc
        let res: string | number = clientWidth / 100 * num;
        if (!ignorePx) {
            res = res + 'px';
        }
        vwCacheMap[num] = res
        return res
    }
}
let vhCacheMap: CacheMap = {}
const vh = (num: number, ignorePx?: boolean): string | number => {
    if (vhCacheMap[num]) {
        return vhCacheMap[num]
    }
    const { clientHeight, clientWidth } = document.documentElement
    if (clientHeight > clientWidth && !isAndroid()) {
        //手机
        let res: string | number = clientWidth / 100 * num
        if (!ignorePx) {
            res = res + 'px';
        }
        vhCacheMap[num] = res
        return res
    } else {
        //pc
        let res: string | number = clientHeight / 100 * num;
        if (!ignorePx) {
            res = res + 'px';
        }
        vhCacheMap[num] = res
        return res
    }
}
export { vw, vh }