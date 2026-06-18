# 蓝鲨充电 · 文档索引

> 渐进式披露：先读本文件，按需加载子文档。

## 产品文档

| 文件 | 内容 | 何时读 |
|---|---|---|
| `docs/glossary.md` | 术语定义、严禁词汇 | 涉及概念命名、字段命名时 |
| `docs/mobile.md` | 小程序端规格（车主18屏 + 运营商5屏）| 改小程序页面/流程时 |
| `docs/admin.md` | 管理后台规格（9个模块）| 改后台页面/功能时 |
| `docs/data-model.md` | 数据模型、计费逻辑、状态机 | 涉及数据结构、计费、状态时 |
| `docs/constraints.md` | 开发约束（UniApp规范、搜索Input规范、视觉分层）| 写新页面/组件前 |

## 原型文件

| 文件 | 端 | 说明 |
|---|---|---|
| `mobile.html` | 小程序 | 车主端 + 运营商端，Tweaks 切换角色 |
| `admin.html` | 管理后台 | PC Web，灰蓝专业风 |
| `landing.html` | 落地页 | 响应式独立页面（Web + H5），无 JSX 依赖，eco 绿主色；与小程序共用设计语言但独立部署 |

## 源文件

| 文件 | 对应端 |
|---|---|
| `mobile/vue-app.js` | 小程序车主端 18 屏 + 运营商端 5 屏，Vue 3 + Element Plus |
| `admin/vue-app.js` | 后台登录、布局、12 个管理屏，Vue 3 + Element Plus |
| `shared/theme.css` | 落地页与小程序共享设计 Token |
