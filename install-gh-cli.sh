#!/bin/bash
# GitHub CLI 安装脚本 (macOS)

echo "正在安装 GitHub CLI..."

# 检查是否已安装
if command -v gh &> /dev/null; then
    echo "GitHub CLI 已安装"
    gh --version
    exit 0
fi

# 方法1: 使用 Homebrew 安装 (推荐)
echo "尝试使用 Homebrew 安装..."
if command -v brew &> /dev/null; then
    echo "检测到 Homebrew，开始安装..."
    brew install gh
    if [ $? -eq 0 ]; then
        echo "✅ GitHub CLI 安装成功！"
        gh --version
        echo ""
        echo "下一步：运行 'gh auth login' 进行身份验证"
        exit 0
    fi
else
    echo "未检测到 Homebrew"
    echo ""
    echo "建议先安装 Homebrew:"
    echo '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
    echo ""
    echo "然后运行: brew install gh"
fi

# 方法2: 手动下载安装
echo ""
echo "或者手动安装："
echo "1. 访问 https://cli.github.com/"
echo "2. 下载 macOS 版本并安装"
echo ""
echo "安装后运行: gh auth login"
