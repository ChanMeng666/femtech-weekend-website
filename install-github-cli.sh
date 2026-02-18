#!/bin/bash
# GitHub CLI 安装脚本 (macOS)

set -e

echo "🚀 开始安装 GitHub CLI..."
echo ""

# 步骤 1: 检查并安装 Homebrew
if ! command -v brew &> /dev/null; then
    echo "📦 检测到未安装 Homebrew，开始安装..."
    echo "⚠️  安装过程中可能需要输入你的 Mac 密码"
    echo ""
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # 添加 Homebrew 到 PATH (Apple Silicon Mac)
    if [ -f /opt/homebrew/bin/brew ]; then
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
    
    echo "✅ Homebrew 安装完成！"
    echo ""
else
    echo "✅ Homebrew 已安装"
    echo ""
fi

# 步骤 2: 安装 GitHub CLI
echo "📥 正在安装 GitHub CLI..."
brew install gh

echo ""
echo "✅ GitHub CLI 安装完成！"
echo ""

# 步骤 3: 验证安装
echo "🔍 验证安装..."
gh --version

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ 安装完成！"
echo ""
echo "📋 下一步：运行以下命令进行身份验证"
echo ""
echo "   gh auth login"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"





