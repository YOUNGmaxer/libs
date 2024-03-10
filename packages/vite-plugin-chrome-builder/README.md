# vite-plugin-chrome-builder

## 使用

```typescript
import { defineConfig } from 'vite'
import { ChromeExtensionBuilder } from 'vite-plugin-chrome-builder'

export default defineConfig({
  plugins: [
    ChromeExtensionBuilder()
  ]
});
```

## 能力

* 拷贝 manifest.json 到产物中
