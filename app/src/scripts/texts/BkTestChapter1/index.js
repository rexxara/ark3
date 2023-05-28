
import chapter1 from './bk1.mi'
import afterChooseA_1 from './afterChooseA_1.mi';
import afterChooseA_2 from './afterChooseA_2.mi';
import sectionB from './sectionB.mi';
const ch1 = [
    {
        name: 'chapter1', script: chapter1,
        //next: ({ BK选择A }) => BK选择A === '要好好遵守约定啊' ? 'afterChooseA_1' : 'afterChooseA_2', 
        isBegin: true,
    },
    // { name: 'afterChooseA_1', script: afterChooseA_1, next: 'sectionB' },
    // { name: 'afterChooseA_2', script: afterChooseA_2, next: 'sectionB' },
    // { name: 'sectionB', script: sectionB, next:'chapter2'},
]
export default ch1