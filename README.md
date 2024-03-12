# libs

个人库大仓

## 预览

### Vite Plugins

- [ ] Vite-Plugin-Chrome-Extension-Builder  用于开发 Chrome 插件时的构建插件
  
  - [ ] 支持 HMR

## 开发流程

### 初始化包

- [ ] 1. npm run init-lib（交互式命令选择包类型、填写包名，自动生成包模板）
  - [ ] 支持检查 packages 中是否已有同名包

#### 支持包类型

- [ ] [ts](./templates/ts/SUMMARY.md)

  无框架依赖的 TS 库

- [ ] egg-plugin

  egg 框架插件

### 开发包

包目录下进行

- [ ] 1. npm run dev 进入开发模式（启动单测 + 监听修改）
- [ ] 2. npm run build 生产构建

## 发布流程

根目录下进行

### 测试包发布

- [ ] 1. npm run beta（commit记录 + 发布测试包）

### 正式包发布

- [ ] 1. npm run changeset（代码检查 + 单测 + 变更记录 + commit记录）
- [ ] 2. npm run publish（构建 + 发布包）
