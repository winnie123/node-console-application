import * as fs from 'fs'

function readFile(filePath: string, filename: string): Promise<[]> {
    let path = filePath + filename;

    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, buffer) => {
            if (!err) {
                const json: string = buffer.toString('utf8')
                const arr: [] = JSON.parse(json)
                resolve(arr);
            }
            else {
                reject(err);
            }
        });
    });
};

/**
     * @member 写入excel
     * @param {string} data 数据字符串
     * @param {string} filePath 文件夹路径
     * @param {string} fileName 文件名
     * @returns {Promise<void>}
     */
function saveFile<T>(data: string, filePath: string, fileName: string): Promise<void> {
    let result: boolean = true;
    let path: string = filePath + fileName;
    return new Promise((resolve, reject) => {
        // 写入内容
        fs.open(path, 'w+', (err, fd) => {
            if (err) {
                reject(err);
            }
            resolve(fd);
        });
    }).then((fd: string) => {
        fs.writeFile(fd, data, (err) => {
            Promise.reject(err);
        });
    }).catch(Promise.reject);

}

export {
    readFile,
    saveFile
}