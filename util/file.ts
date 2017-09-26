import * as fs from 'fs'

function readFile(filePath : string,filename : string){
    let path = filePath + filename;

    return new Promise((resolve,reject)=>{
        fs.readFile(path,(err,buffer)=>{
            if(!err){
                resolve(buffer);
            }
            else{
                reject(err);
            }
        });
    });
};

export default {
    readFile
}