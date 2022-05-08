
export function loadChapterHandle(chapterName: string) {
    console.log('loading chapter',chapterName)
    return new Promise(res => {
        setTimeout(() => {
            res(chapterName)
        }, 2000);
    });
}
