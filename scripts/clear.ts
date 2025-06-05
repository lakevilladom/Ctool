import {findWorkspacePackages} from '@pnpm/workspace.find-packages';
import { rmSync } from 'node:fs';
import { resolve } from 'node:path';

const  packages  = await findWorkspacePackages(process.cwd());
for (const pkg of packages) {
    const removePath = resolve(pkg.rootDir, 'dist');
    try {
        rmSync(removePath, { recursive: true, force: true });
        console.log(`Removed: ${removePath}`);
    } catch (error) {
        console.error(`Error removing ${removePath}:`, error);
    }
}
