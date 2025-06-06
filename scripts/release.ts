import { join } from "node:path"
import { mkdirSync, rmSync, readdirSync, statSync, writeFileSync } from "node:fs";

import { getSubPkgsPath } from "../utils/packages.ts";

const releaseDir="_release"
const releasePath = join(process.cwd(), releaseDir);

// 发布初始化 清空 `./_release` 目录
const init = () => {
    rmSync(releasePath, { recursive: true, force: true });
    mkdirSync(releasePath);
};

// 获取发布文件列表 生成发布文件日志
const get = () => {
    const files =
        readdirSync(releasePath)
            .map(item => {
                return {
                    path: join(releasePath, item),
                    name: `./${item}/${item}`,
                };
            })
            .filter(item => {
                return statSync(item.path).isFile();
            })
            .map(item => item.name) || [];
    const result = files.join("\n");
    writeFileSync(join(process.cwd(), "_release_files"), result);
    console.log(result);
};

// 清理 core dist 文件 github action 中使用
const clear = () => {
    rmSync(join(getSubPkgsPath("ctoolCore") as string, "dist",".git"), { recursive: true, force: true });
    rmSync(join(getSubPkgsPath("ctoolCore") as string, "dist",".nojekyll"), { force: true });
};

const run = () => {
    const args = process.argv.splice(2) || [];
    let type = "init";
    if (args.length > 0) {
        type = `${args[0]}`;
    }
    switch (type) {
        case "init":
            init();
            break;
        case "get":
            get();
            break;
        case "clear":
            clear();
            break;
        default:
            console.error("type error node ./release.js [init|get|clear]");
    }
};

run();
