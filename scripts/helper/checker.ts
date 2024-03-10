import fs from 'fs'
import { getTargetPackagePath } from './file'

/** 检查包名是否已经存在 */
export async function checkIsPackageExist(packageName: string): Promise<boolean> {
  const url = `https://registry.npmjs.org/${encodeURIComponent(packageName)}`
  try {
    const response = await fetch(url)
    // 成功获取到响应，且响应状态不是404，则假定包存在
    return response.status !== 404
  } catch (error) {
    return false // 根据情况看是否需要改变这里的逻辑
  }
}

/** 检查目录是否已经存在 */
export function checkIsFolderExist(folderName: string): boolean {
  return fs.existsSync(getTargetPackagePath(folderName))
}
