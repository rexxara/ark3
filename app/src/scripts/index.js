
// import chapter1 from './texts/chapter1/index'
// import chapter2 from './texts/chapter2.mi'
// import chapter3 from './texts/chapter3/index'
// import bkChapter1 from './texts/BkTestChapter1/index';
// import bkChapter2 from './texts/BKTestChapter2/bkchapter2.mi';



import c01_妮娜初遇 from './texts/pamyatnik/c01_妮娜初遇.mi';
import c02_玛尔法初见玛丽亚初见 from './texts/pamyatnik/c02_玛尔法初见玛丽亚初见.mi';
import c03_科米初见 from './texts/pamyatnik/c03_科米初见.mi';
import c04_去玛丽亚家帮忙 from './texts/pamyatnik/c04_去玛丽亚家帮忙.mi';
import c05_基洛夫工厂罢工 from './texts/pamyatnik/c05_基洛夫工厂罢工.mi';
import c06_去教会和玛尔法照顾孩子 from './texts/pamyatnik/c06_去教会和玛尔法照顾孩子.mi';
import c07_真的去和玛丽亚看戏剧 from './texts/pamyatnik/c07_真的去和玛丽亚看戏剧.mi';
import c08_沙皇退位 from './texts/pamyatnik/c08_沙皇退位.mi';

const charaters = {
    凉子: {
        images: {
            default: '1_normal.png',
            开心: '2_happy.png',
            生气: "3_angry.png",
            惊讶: "5_surprise.png"
        },
        style: {
            width: '20vw',
            top: '5vh'
        }
    },
    真由: {
        images: {
            default: '1_normal.png',
            无语: '7_wordless.png',
            无语2: '7_wordless_2.png',
            惊讶: "5_surprise.png"
        },
        style: {
            width: '20vw',
        }
    },
    临光: {
        images:
        {
            default: 'char_148_nearl_1.png.merge.png',
            笑: "char_148_nearl_2.png.merge.png",
            不笑: "char_148_nearl_9.png.merge.png"
        }
    },
    塔露拉: {
        images: {
            default: 'char_011_talula_1.png.merge.png',
            死妈脸: 'char_011_talula_2.png.merge.png',
            气急败坏: 'char_011_talula_2.png.merge.png',
        }
    },
    文静: {
        images: {
            default: '3b1f1948a8b9212f81960ae8dc6c77ac9b521899.png'
        },
        style: {
            top: '6vh',
        }
    }
}
const inputs = {
    第一章输入姓名: {
        key: 'userName',
        afterFix: (string) => '傻逼' + string
    }
}
const chooses = {
    pamy选择A: [{
        text: '基洛夫工厂罢工',
        callback: (variables) => {
            return { ...variables, pamy选择A: 'c05_基洛夫工厂罢工' }
        }
    }, {
        text: '去教会和玛尔法照顾孩子',
        callback: (variables) => {
            return { ...variables, pamy选择A: 'c06_去教会和玛尔法照顾孩子' }
        }
    }, {
        text: '真的去和玛丽亚看戏剧',
        callback: (variables) => {
            return { ...variables, pamy选择A: 'c07_真的去和玛丽亚看戏剧' }
        }
    }],
    BK选择A: [{
        text: '要好好遵守约定啊',
        callback: (execCommand, variables) => {
            return { ...variables, BK选择A: '要好好遵守约定啊' }
        }
    }, {
        text: '为什么会迟到呢',
        callback: (execCommand, variables) => {
            return { ...variables, BK选择A: '为什么会迟到呢' }
        }
    }],
    第三章选择A: [{
        text: '冬马好感+1',
        callback: (execCommand, variables) => {
            return { ...variables, 女主好感度: variables.女主好感度 + 1 }
        }
    }, {
        text: '冬马好感-1',
        callback: (execCommand, variables) => {
            return { ...variables, 女主好感度: variables.女主好感度 - 1 }
        }
    }],
    第三章选择B: [{
        text: 'playBgm:無花果',
        callback: (execCommand, variables) => {
            execCommand('[playBgm:無花果]')
        }
    }, {
        text: 'playBgm:晴天前夜',
        callback: (execCommand, variables) => {
            execCommand('[playBgm:晴天前夜]')
        }
    }],
    塔露拉的思考: [
        {
            text: '奥利给！！！', callback: (execCommand, variables) => {
                return { ...variables, 思考结果: '奥利给！！！' }
            }
        },
        {
            text: '哎给喽！！！', callback: (execCommand, variables) => {
                return { ...variables, 思考结果: '哎给喽！！！' }
            }
        }
    ]
}
const variables = {
    女主好感度: 1,
    adminName: 'rexxara'
}
const backgrounds = {
    公园门口: 'BG11a_1280.jpg',
    龙门: "bg_lungmen_m.png",
}
const BGMs = {
    tamn01: 'tam-n01.ogg',
    tamn16: 'tam-n16.ogg'
}

const cgs = {
    HE1: 'avg_11_1.png',
    HE2: 'avg_01.png',
    HE3: 'avg_01.png',
    set1: {
        a: 'set1/avg_40_1.png',
        b: 'set1/avg_40_2.png',
        c: 'set1/avg_40_3.png'
    },
    test: {
        1: 'test/1.png',
        2: 'test/2.png',
        3: 'test/3.png',
        4: 'test/4.png',
        5: 'test/5.png',
    }
}
const soundEffects = {
    eff1: 'eff01.mp3',
    大无语: 'Ikkyu_san.ogg',
}
const scences = [
    // {
    //     塔露拉的正义演讲: { script: [chapter1[1], chapter1[2]], cover: cgs.HE1 },
    // },//一页一个对象
    // {
    //     白色相簿2: { script: chapter3, cover: cgs.set1.a }
    // }
]
const chapters = {
    chapter1: [{ name: 'c01_妮娜初遇', script: c01_妮娜初遇, next: 'c02_玛尔法初见玛丽亚初见', isBegin: true }],
    chapter2: [{ name: 'c02_玛尔法初见玛丽亚初见', script: c02_玛尔法初见玛丽亚初见, next: 'c03_科米初见' }],
    chapter3: [{
        name: 'c03_科米初见', script: c03_科米初见, next: 'c04_去玛丽亚家帮忙',
    }],
    chapter4: [{
        name: 'c04_去玛丽亚家帮忙', script: c04_去玛丽亚家帮忙,
        next: ({ pamy选择A }) => pamy选择A,
    }],
    chapter5: [{ name: 'c05_基洛夫工厂罢工', script: c05_基洛夫工厂罢工, next: 'c08_沙皇退位' }],
    chapter6: [{ name: 'c06_去教会和玛尔法照顾孩子', script: c06_去教会和玛尔法照顾孩子, next: 'c08_沙皇退位' }],
    chapter7: [{ name: 'c07_真的去和玛丽亚看戏剧', script: c07_真的去和玛丽亚看戏剧, next: 'c08_沙皇退位' }],
    chapter8: [{ name: 'c08_沙皇退位', script: c08_沙皇退位, }]
}
// const bkScript1 = {
//     chapter1: bkChapter1,
//     chapter2: [{ name: 'chapter2', script: bkChapter2, isEnd: true }],
// }
// const apiTestChapters = {
//     chapter1: chapter1,
//     chapter2: [{ name: 'chapter2', script: chapter2, next: 'chapter3_section1' }],
//     chapter3: chapter3
// }
export default {
    charaters,
    variables,
    backgrounds,
    BGMs,
    cgs,
    chooses,
    chapters: chapters,
    inputs,
    scences,
    soundEffects
}