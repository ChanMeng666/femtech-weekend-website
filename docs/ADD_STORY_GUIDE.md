# 如何在 FemTech Weekend 网站添加一篇新文章（Story）

本站的 **Story** 即 **Blog**，文章会出现在 `/blog` 页面，每篇文章有独立链接 `/blog/<slug>`。

---

## 一、上传方式概览

| 方式 | 说明 |
|------|------|
| **本地添加文件后 Git 推送** | 在项目里新建/编辑 MDX 文件，提交并推送到 GitHub，部署后自动上线。 |
| **仅英文** | 只改 `blog/` 下文件即可。 |
| **中英双语** | 英文放 `blog/`，中文放 `i18n/zh-Hans/docusaurus-plugin-content-blog/`。 |

下面按「只发英文」和「中英双语」两种需求分别说明。

---

## 二、只添加英文文章

### 1. 新建文章文件夹

在项目根目录下创建（日期和 slug 可自定）：

```
blog/YYYY-MM-DD-你的文章英文短名/
```

例如：`blog/2026-02-18-new-partnership/index.mdx`

### 2. 新建 `index.mdx` 并写内容

在刚建的文件夹里新建 **index.mdx**，内容结构如下：

```mdx
---
slug: 文章URL短名（英文，不要和别的重复）
title: "文章标题（英文）"
authors: [zhuyihan]
tags: [femtech, womens-health]
---

# 文章主标题

这里写正文，支持 **粗体**、列表、链接等 Markdown。
```

**说明：**

- **slug**：用于 URL，如 `new-partnership` → 文章地址为 `/blog/new-partnership`。
- **title**：列表和正文里显示的标题。
- **authors**：必须在 `blog/authors.yml` 里已有，常用如 `zhuyihan`。
- **tags**：可用 `blog/tags.yml` 里已有标签，或按需在 tags.yml 里新增。

### 3. 作者与标签

- 作者列表：打开 **blog/authors.yml**，确认用的作者 id 存在（如 `zhuyihan`）。
- 标签列表：打开 **blog/tags.yml**，用已有标签或按同样格式新增。

### 4. 提交并推送

```bash
git add blog/2026-02-18-new-partnership/
git commit -m "Add new story: New Partnership"
git push origin main
```

部署（如 Vercel）会自动从 GitHub 拉取，几分钟后新文章会出现在 `/blog`。

---

## 三、同时添加中文版（中英双语）

约定：**英文放在 blog，中文放在 i18n**。

### 1. 英文版（同上）

在 **blog/** 下按「二」的步骤创建，例如：

- `blog/2026-02-18-new-partnership/index.mdx`（英文）

### 2. 中文版

在 **i18n** 下用**同一日期和同一文件夹名**建一份中文版：

- 路径：`i18n/zh-Hans/docusaurus-plugin-content-blog/2026-02-18-new-partnership/index.mdx`
- 若该目录不存在，先建：  
  `i18n/zh-Hans/docusaurus-plugin-content-blog/2026-02-18-new-partnership/`

中文 **index.mdx** 示例：

```mdx
---
slug: new-partnership
title: "新合作（中文标题）"
authors: [zhuyihan]
tags: [femtech, womens-health]
---

# 新合作

这里是中文正文……
```

**注意：** `slug` 要和英文版一致，这样中英文是同一篇文章的不同语言版本。

### 3. 中文标签（可选）

若用了需要翻译的标签，可在 **i18n/zh-Hans/docusaurus-plugin-content-blog/tags.yml** 里为对应 key 写中文 label。

### 4. 提交并推送

```bash
git add blog/2026-02-18-new-partnership/
git add i18n/zh-Hans/docusaurus-plugin-content-blog/2026-02-18-new-partnership/
git commit -m "Add new story (EN+ZH): New Partnership"
git push origin main
```

---

## 四、可选：在导航栏显示「Story / 博客」

目前导航里没有「Story」入口，用户可通过直接访问 `/blog` 看文章。若希望从导航进入：

1. 打开 **docusaurus.config.ts**
2. 在 `themeConfig.navbar.items` 里增加一项，例如：

```ts
{
  to: '/blog',
  label: 'Story',  // 或 'Blog'
  position: 'left'
}
```

3. 中文文案在 **i18n/zh-Hans/docusaurus-theme-classic/navbar.json** 里为对应 key 添加翻译（如 `"Story"` → `"故事"` 或 `"博客"`）。

---

## 五、参考现有文章结构

可对照这些已有文章：

- 英文：`blog/2026-01-01-femtech-investment-landscape-2025/index.mdx`
- 中文：`i18n/zh-Hans/docusaurus-plugin-content-blog/2026-01-01-femtech-investment-landscape-2025/index.mdx`

---

## 六、图片与附件

- 图片可放在该文章自己的文件夹里，例如：  
  `blog/2026-02-18-new-partnership/img/photo.png`
- 在 MDX 里引用（示例）：  
  `![描述](img/photo.png)` 或使用项目里的 `ZoomableImage` 等组件（参考现有带图文章）。

---

**总结：** 在 `blog/`（和可选的 `i18n/zh-Hans/.../blog/`）里按日期+slug 建文件夹和 `index.mdx`，写好 frontmatter 和正文，然后 `git add` → `commit` → `push` 即可完成「在 Story 里上传新文章」。
