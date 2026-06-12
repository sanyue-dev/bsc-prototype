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
| `mobile/app.jsx` `mobile/ui.jsx` | 小程序公共组件 |
| `mobile/screens-core.jsx` | 小程序车主端核心屏（首页/扫码/地图/站点详情）|
| `mobile/screens-charging.jsx` | 小程序充电流程（确认/充电中/完成/订单）|
| `mobile/screens-h5.jsx` | 小程序 H5 工具页（钱包/优惠券/个人中心等）|
| `mobile/screens-operator.jsx` | 小程序运营商端 |
| `mobile/ios-frame.jsx` `mobile/tweaks-panel.jsx` | 小程序框架组件 |
| `admin/components.jsx` | 后台公共组件 |
| `admin/login.jsx` | 后台登录页 |
| `admin/screens-1.jsx` | 后台：看板/站点/设备/工单/订单 |
| `admin/screens-2.jsx` | 后台：计费/用户/优惠券 |
| `admin/screens-3.jsx` | 后台：充电会话 |
| `admin/screens-4.jsx` | 后台：报表中心（收入/订单/设备/用户）|
| `shared/design-canvas.jsx` | 设计画布（多方案对比）|
