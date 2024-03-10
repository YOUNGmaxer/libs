import fs from 'fs/promises'
import { join, resolve } from 'path'

const BASE_TEMPLATE_PATH = resolve(__dirname, '../../templates')
const BASE_PACKAGE_PATH = resolve(__dirname, '../../packages')
/** 不需要拷贝的文件 */
const IGNORE_FILES = ['SUMMARY.md']

/** 获取指定的模板路径 */
export function getSelectedTemplatePath(type: string): string {
  return `${BASE_TEMPLATE_PATH}/${type}`
}

/** 获取指定的包目录路径 */
export function getTargetPackagePath(folderName: string): string {
  return `${BASE_PACKAGE_PATH}/${folderName}`
}

/** 拷贝目录 */
export async function copyFold(from: string, to: string): Promise<void> {
  try {
    // 检查源目录是否存在
    await fs.access(from)

    // 确保目标目录存在
    await fs.mkdir(to, { recursive: true })

    // 读取源目录下的所有文件和目录
    const entries = await fs.readdir(from, { withFileTypes: true })

    for (const entry of entries) {
      if (IGNORE_FILES.includes(entry.name)) continue

      const srcPath = join(from, entry.name)
      const destPath = join(to, entry.name)

      if (entry.isDirectory()) {
        // 如果是目录，则递归拷贝
        await copyFold(srcPath, destPath)
      } else {
        // 如果是文件，则直接拷贝
        await fs.copyFile(srcPath, destPath)
      }
    }
  } catch (err) {
    console.error('copyFold error:', err)
  }
}
