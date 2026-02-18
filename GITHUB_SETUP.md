# GitHub 配置指南

## 方案1: 使用 GitHub CLI (推荐)

### 安装 GitHub CLI

**如果已安装 Homebrew:**
```bash
brew install gh
```

**如果没有 Homebrew，先安装:**
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install gh
```

### 登录 GitHub CLI
```bash
gh auth login
```
按照提示选择：
- GitHub.com
- HTTPS
- 登录方式（浏览器或token）

### 使用 GitHub CLI 推送
```bash
gh repo sync
# 或
git push origin main
```

---

## 方案2: 使用 Personal Access Token

### 创建 Token
1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token" -> "Generate new token (classic)"
3. 设置权限：至少勾选 `repo` 权限
4. 生成并复制 token

### 配置 Git
```bash
# 使用 token 作为密码推送
git push origin main
# 用户名: 你的GitHub用户名
# 密码: 粘贴刚才复制的token
```

### 永久保存凭据
```bash
git config --global credential.helper osxkeychain
# 下次推送时会自动使用保存的凭据
```

---

## 方案3: 使用 SSH 密钥

### 检查是否已有SSH密钥
```bash
ls -la ~/.ssh/id_*.pub
```

### 如果没有，生成新的SSH密钥
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# 按回车使用默认路径
# 设置密码（可选）
```

### 添加SSH密钥到GitHub
```bash
# 复制公钥
cat ~/.ssh/id_ed25519.pub | pbcopy

# 然后：
# 1. 访问 https://github.com/settings/keys
# 2. 点击 "New SSH key"
# 3. 粘贴公钥并保存
```

### 切换远程仓库为SSH
```bash
git remote set-url origin git@github.com:ChanMeng666/femtech-weekend-website.git
git push origin main
```

---

## 当前状态

✅ Git 已配置：
- 用户名: hhhhh-zyh
- 邮箱: zhuyihan1992@gmail.com
- 凭据助手: osxkeychain

📝 待推送的提交：
- Commit: 8c2976e
- 消息: "Add 2025 Global FemTech Investment Landscape Review blog post (English and Chinese versions)"

---

## 快速推送命令

选择上述任一方案配置后，运行：
```bash
git push origin main
```





