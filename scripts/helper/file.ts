import fs from 'fs/promises'
import { join, resolve } from 'path'

const BASE_TEMPLATE_PATH = resolve(__dirname, '../../templates')
const BASE_PACKAGE_PATH = resolve(__dirname, '../../packages')
/** 不需要拷贝的文件 */
const IGNORE_FILES = ['SUMMARY.md']
/** 需要渲染进行内容替换的文件 */
const NEED_RENDER_FILES = ['package.json', 'README.md']

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

/** 渲染文件（替换文件中指定内容） */
export async function renderFile(targetFilePath: string, data: object) {
  try {
    // 读取文件内容
    let content = await fs.readFile(targetFilePath, 'utf8')

    // 替换占位符为data对象中对应的值
    content = content.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
      // 如果没有找到匹配的键值，则保留原始占位符
      return data.hasOwnProperty(key) ? data[key] : match
    })

    // 将替换后的内容写回文件
    await fs.writeFile(targetFilePath, content, 'utf8')
  } catch (err) {
    console.error('renderFile error:', err)
  }
}

/** 渲染指定的文件 */
export async function renderFiles(folderName: string, data: object) {
  const destPath = getTargetPackagePath(folderName)
  const renderTasks: Array<Promise<void>> = []
  for (const fileName of NEED_RENDER_FILES) {
    const filePath = join(destPath, fileName)
    renderTasks.push(renderFile(filePath, data))
  }
  await Promise.all(renderTasks)
}
