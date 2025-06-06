import { rmSync } from 'node:fs';
import {getSubPkgsPath} from '../utils/packages.ts';
import { join } from 'node:path';


for (const p of getSubPkgsPath()) {
    const distPath=join(p, 'dist');
    try {
        rmSync(distPath, { recursive: true, force: true });
        console.log(`Removed: ${distPath}`);
    } catch (error) {
        console.error(`Error removing ${distPath}:`, error);
    }
}
