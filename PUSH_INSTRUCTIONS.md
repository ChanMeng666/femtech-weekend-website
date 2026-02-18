# 推送代码到 GitHub - 操作指南

## 当前状态
- ✅ 代码已提交（commit: 8c2976e）
- ✅ Git remote 已切换为 HTTPS
- ⏳ 需要身份验证才能推送

## 方法：使用 Personal Access Token

### 步骤 1: 创建 Personal Access Token

1. 访问：https://github.com/settings/tokens
2. 点击 **"Generate new token"** → **"Generate new token (classic)"**
3. 填写信息：
   - **Note**: 例如 "FemTech Weekend - Git Push"
   - **Expiration**: 选择合适的时间（建议90天或自定义）
   - **Select scopes**: 至少勾选 **`repo`** 权限
4. 点击 **"Generate token"**
5. **重要**: 立即复制生成的 token（只显示一次！）

### 步骤 2: 推送代码

运行以下命令：
```bash
git push origin main
```

当提示输入凭据时：
- **Username**: `ChanMeng666` (或你的GitHub用户名)
- **Password**: 粘贴刚才复制的 token（不是你的GitHub密码！）

### 步骤 3: 保存凭据（可选）

推送成功后，凭据会自动保存到 macOS Keychain，下次推送不需要再输入。

---

## 替代方案：添加协作者权限

如果你有 `ChanMeng666` 账户的访问权限：

1. 访问：https://github.com/ChanMeng666/femtech-weekend-website/settings/access
2. 点击 **"Add people"**
3. 添加 `hhhhh-zyh` 为协作者
4. 然后可以切换回 SSH 方式推送

---

## 待推送的内容

- **提交**: 8c2976e
- **消息**: "Add 2025 Global FemTech Investment Landscape Review blog post (English and Chinese versions)"
- **文件**:
  - `blog/2026-01-01-femtech-investment-landscape-2025/index.mdx`
  - `i18n/zh-Hans/docusaurus-plugin-content-blog/2026-01-01-femtech-investment-landscape-2025/index.mdx`





