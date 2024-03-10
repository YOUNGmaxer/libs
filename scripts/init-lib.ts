import prompts from 'prompts'
import { checkIsFolderExist, checkIsPackageExist } from './helper/checker'
import { copyFold, getSelectedTemplatePath, getTargetPackagePath, renderFiles } from './helper/file'

enum TemplateType {
  ts = 'ts',
  'egg-plugin' = 'egg-plugin',
}

async function startInit() {
  const response = await prompts([
    {
      type: 'select',
      name: 'type',
      message: '选择想要生成的库类型',
      choices: [{ title: TemplateType.ts, description: '基础的 TS 库', value: TemplateType.ts }],
    },
    {
      type: 'text',
      name: 'packageName',
      message: '请输入库名称',
      validate: async (val) => {
        try {
          return (await checkIsPackageExist(val)) ? `已用同名库(${val})，请重新命名` : true
        } catch (err) {
          console.error(err)
          return true
        }
      },
    },
    {
      type: 'text',
      name: 'folderName',
      message: '请输入目录名称（默认则同库名称）',
      initial: (prev) => prev,
      validate: (val) => {
        return checkIsFolderExist(val) ? `已有目录，请重新命名` : true
      },
    },
  ])

  console.log(response)
  if (response.folderName) {
    await copyFold(getSelectedTemplatePath(response.type), getTargetPackagePath(response.folderName))
    await renderFiles(response.folderName, response)
  }
}

startInit()
