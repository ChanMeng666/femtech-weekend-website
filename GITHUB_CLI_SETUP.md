# GitHub CLI 安装和配置指南 (macOS)

## 📋 概述

本指南将帮助你在 Mac 上安装 GitHub CLI (`gh`) 并进行身份验证。

---

## 🚀 方法一：使用安装脚本（推荐）

### 步骤 1: 运行安装脚本

在终端中执行：

```bash
cd /Users/yhz/Documents/GitHub/femtech-weekend-website
./install-github-cli.sh
```

**注意**：
- 安装过程中可能需要输入你的 Mac 管理员密码
- 安装 Homebrew 可能需要几分钟时间
- 请保持网络连接

### 步骤 2: 身份验证

安装完成后，运行：

```bash
gh auth login
```

按照提示操作：
1. **What account do you want to log into?** → 选择 `GitHub.com`
2. **What is your preferred protocol for Git operations?** → 选择 `HTTPS` 或 `SSH`
3. **Authenticate Git with your GitHub credentials?** → 选择 `Yes`
4. **How would you like to authenticate GitHub CLI?** → 选择：
   - `Login with a web browser` (推荐，最简单)
   - 或 `Paste an authentication token` (如果你已有 token)

如果选择浏览器登录：
- 会显示一个代码（如 `ABCD-1234`）
- 按回车键会在浏览器中打开 GitHub 登录页面
- 输入代码并授权即可

### 步骤 3: 验证登录

```bash
gh auth status
```

应该显示你的登录状态。

---

## 🔧 方法二：手动安装

### 步骤 1: 安装 Homebrew

在终端中运行：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**Apple Silicon Mac (M1/M2/M3)** 需要额外配置：

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

### 步骤 2: 安装 GitHub CLI

```bash
brew install gh
```

### 步骤 3: 验证安装

```bash
gh --version
```

应该显示版本信息，例如：
```
gh version 2.40.0 (2024-01-15)
```

### 步骤 4: 身份验证

```bash
gh auth login
```

按照上述步骤 2 的提示操作。

---

## ✅ 验证安装和登录

### 检查版本
```bash
gh --version
```

### 检查登录状态
```bash
gh auth status
```

### 测试连接
```bash
gh api user
```

应该返回你的 GitHub 用户信息。

---

## 🎯 使用 GitHub CLI 推送代码

安装并登录后，你可以：

### 方式 1: 使用 GitHub CLI 同步
```bash
gh repo sync
```

### 方式 2: 使用 Git 推送（现在会自动使用 GitHub CLI 的凭据）
```bash
git push origin main
```

---

## 🔍 常见问题

### Q: 安装 Homebrew 时提示权限不足？
A: 确保你的用户账户有管理员权限，或者使用 `sudo`。

### Q: 找不到 `gh` 命令？
A: 重启终端，或运行：
```bash
source ~/.zprofile  # 或 ~/.zshrc
```

### Q: 身份验证失败？
A: 检查网络连接，或尝试使用 token 方式：
```bash
gh auth login --with-token < token.txt
```

### Q: 想切换账户？
A: 运行：
```bash
gh auth logout
gh auth login
```

---

## 📚 更多资源

- [GitHub CLI 官方文档](https://cli.github.com/manual/)
- [Homebrew 官方文档](https://brew.sh/)

---

## 🎉 完成后的下一步

1. ✅ 安装 GitHub CLI
2. ✅ 身份验证
3. ✅ 推送代码：
   ```bash
   git push origin main
   ```





