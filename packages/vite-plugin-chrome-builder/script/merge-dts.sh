#!/bin/bash

# 源类型定义文件
SOURCE_FILE="src/types.d.ts"

# 目标类型定义文件数组
TARGET_FILES=("dist/index.d.ts" "dist/index.d.cts")

# 遍历数组，合并文件
for target_file in "${TARGET_FILES[@]}"
do
  cat "$SOURCE_FILE" >> "$target_file"
done

echo "合并类型文件完成!"
