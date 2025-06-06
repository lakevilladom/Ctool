// import {findWorkspacePackages} from '@pnpm/workspace.find-packages';
// const  packages  = await findWorkspacePackages(process.cwd());
// console.log(packages)

import { join } from "node:path";

const SubPkgs = {
    ctoolCore: "ctool-core",
    ctoolSite: "ctool-site",
    ctoolConfig: "ctool-config",
    ctoolWeb: "ctool-adapter/web",
    ctoolBase: join("ctool-adapter", "base"),
    ctoolEdge: join("ctool-adapter", "edge"),
    ctoolTauri: join("ctool-adapter", "tauri"),
    ctoolUtools: join("ctool-adapter", "utools"),
    ctoolChrome: join("ctool-adapter", "chrome"),
    ctoolFirefox: join("ctool-adapter", "firefox"),
    ctoolElectron: join("ctool-adapter", "electron"),
} as const;

/**
 * 获取子包路径,如果传参，则获取传参路径，不传参则获取所有子包路径
 * @param pkgName 子包名称
 * @returns 子包路径
*/
export function getSubPkgsPath(pkgName: (keyof typeof SubPkgs)) {
    if (pkgName) {
        return join(process.cwd(), "packages", SubPkgs[pkgName]);
    }
    return Object.values(SubPkgs).map(path =>
        join(process.cwd(), "packages", path)
    );
}





