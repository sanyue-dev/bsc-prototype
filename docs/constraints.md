# 开发约束与规范

---

## UniApp 小程序规范

目标平台：H5 + 微信小程序。

| 规范 | 要求 |
|---|---|
| 顶部标题栏 | 使用原生 NavigationBar，**不自绘 header div**；标题通过 `navigationBarTitleText` 配置 |
| 底部 Tab Bar | 使用原生 TabBar 风格，**不自绘** |
| 底部安全区 | 页面底部内容留出 `env(safe-area-inset-bottom)` |
| 布局 | 避免 `position: fixed`（小程序中有限制），优先使用 flex |
| 内容区顶部 | 从导航栏底部开始，不与状态栏/导航栏重叠 |

---

## 搜索 Input 规范

**每个 `<input>` 只负责一个字段的搜索，禁止合并多字段。**

```jsx
// ✅ 正确
<input placeholder="搜索订单号"   data-field="order_id" />
<input placeholder="搜索用户手机" data-field="phone" />
<input placeholder="搜索设备编号" data-field="device_id" />

// ❌ 错误
<input placeholder="搜索订单号 / 用户手机 / 设备编号" />
```

多字段筛选用多个独立 input 并排排列，每个 input 的 `name`/`data-field` 与后端字段名一一对应。

---

## 视觉风格分层

三端风格**刻意分层**，不要求全局统一。

| 端 | 主色 | 风格定位 |
|---|---|---|
| 小程序（车主/运营商）| `#1A9E6E`（eco 绿）| 品牌亲和，轻量友好 |
| 落地页 | `#1A9E6E` | 同上 |
| 管理后台 | 灰蓝系 | 专业中性，适合高密度数据表格；**无需与小程序配色一致** |

> 管理后台保持自身专业配色，Logo/品牌名出现在侧边栏即满足品牌认知需求。

---

## 数据安全

- 手机号全端脱敏展示，格式：`138****8821`
- 订单计费规则版本快照结算后不可修改（用于纠纷举证）
- 故障工单中的用户信息同样脱敏
