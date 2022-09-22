```js
#!/usr/bin/env node   => 想要bin直接执行必须得指定环境（node）
const program = require('commander');
const packageJson = require('../package.json')
const { exec } = require('child_process');

// git仓库地址
const gitRepositoryPath = "http://124.70.134.70:8099/ruoyi-youya-nft/youya-ntf-h5.git"

// 创建文件夹
const createDir = (dir) => {
    return new Promise(resolve => {
        exec(`mkdir ${dir}`, {}, (error) => {
            resolve(process.cwd() + "\\"+dir)
            if (error) {
                console.error(`exec error: ${error}`);
            }
        })
    })
}

// 拉取代码
const gitClone = (cwd = process.cwd()) => {
    return new Promise(resolve => {
        exec(`git clone ${gitRepositoryPath}`, {
            cwd
        }, (error) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return ;
            }
        })
    })
}

// options选项只有Boolean值
program.version(packageJson.version)
.name('lwl-cli')
.description('Split a string into substrings and display as an array')
.argument('<dir>','目录名')
.option("-d",'--dir',"目录名")
.action((dir) => {
    if(dir){
        createDir(dir).then((cwd) => {
            gitClone(cwd)
        })
    }else {
        gitClone()
    }
})

//解析用户传入的命令
program.parse(process.argv);