#!/bin/bash
# 从 jiawanlong/Cesium-Examples 仓库复制示例文件到 public/cesium-demo/
# 使用前请先克隆 Cesium-Examples 仓库到项目同级目录:
#   git clone https://github.com/jiawanlong/Cesium-Examples.git --depth 1

SOURCE="${1:-../Cesium-Examples}"
TARGET="public/cesium-demo"

if [ ! -d "$SOURCE" ]; then
  echo "错误: 找不到 Cesium-Examples 目录: $SOURCE"
  echo "请先运行: git clone https://github.com/jiawanlong/Cesium-Examples.git --depth 1"
  exit 1
fi

echo "正在从 $SOURCE 复制示例文件..."

mkdir -p "$TARGET/examples/cesiumEx"
mkdir -p "$TARGET/libs/cesium"

# Cesium 库
cp -r "$SOURCE/libs/cesium/Cesium1.98" "$TARGET/libs/cesium/" 2>/dev/null && echo "  ✓ Cesium 1.98 库"

# 示例 HTML + JS + 资源文件
cd "$SOURCE/examples/cesiumEx"
find . -maxdepth 1 \( -name "*.html" -o -name "*.js" -o -name "*.json" -o -name "*.png" -o -name "*.jpg" -o -name "*.svg" -o -name "*.gif" -o -name "*.glb" -o -name "*.mp4" -o -name "*.mp3" -o -name "*.czml" \) \
  -exec cp {} "../../../webgis-learn/$TARGET/examples/cesiumEx/" \; 2>/dev/null
echo "  ✓ 示例文件 (HTML/JS/资源)"
cd - > /dev/null

# 数据子目录
for dir in data buildings SkyBox img echarts ocean; do
  cp -r "$SOURCE/examples/cesiumEx/$dir" "$TARGET/examples/cesiumEx/" 2>/dev/null && echo "  ✓ $dir/"
done

# 共享资源
for dir in css js fonts libs img template locales; do
  mkdir -p "$TARGET/examples/$dir"
  cp -r "$SOURCE/examples/$dir"/* "$TARGET/examples/$dir/" 2>/dev/null
done
echo "  ✓ 共享资源 (css/js/fonts/libs/img)"

# 额外依赖库
for dir in echarts echarts-gl turf proj4 d3 d3-hexbin; do
  cp -r "$SOURCE/libs/$dir" "$TARGET/libs/" 2>/dev/null
done
echo "  ✓ 依赖库 (echarts/turf/proj4/d3)"

# 根文件
cp "$SOURCE/examples/index.html" "$TARGET/examples/" 2>/dev/null
cp "$SOURCE/index.html" "$TARGET/" 2>/dev/null
cp "$SOURCE/code.html" "$TARGET/" 2>/dev/null
cp "$SOURCE/code.js" "$TARGET/" 2>/dev/null

echo ""
echo "完成! 示例文件已复制到 $TARGET/"
du -sh "$TARGET"
