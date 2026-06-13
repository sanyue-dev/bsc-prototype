// admin/components.jsx — antd-backed layout shell + shared UI primitives
// 蓝鲨充电 PC Admin · Ant Design v5

/* global antd, icons */

// ─── Color tokens ────────────────────────────────────────────────
const ADMIN = {
  sidebarBg:       '#ffffff',
  sidebarLightBg:  '#fafafa',
  sidebarText:     'rgba(0,0,0,0.65)',
  sidebarTextHover:'rgba(0,0,0,0.88)',
  sidebarActiveBg: '#1677ff',
  sidebarHoverBg:  'rgba(255,255,255,0.07)',
  headerBg:        '#ffffff',
  bodyBg:          '#f5f5f5',
  cardBg:          '#ffffff',
  border:          '#d9d9d9',
  borderLight:     '#f0f0f0',
  divider:         '#f0f0f0',
  textPrimary:     'rgba(0,0,0,0.88)',
  textRegular:     'rgba(0,0,0,0.65)',
  textSecondary:   'rgba(0,0,0,0.45)',
  primary:         '#1677ff',
  primaryHover:    '#4096ff',
  primaryLight:    '#e6f4ff',
  successColor:    '#52c41a',
  successBg:       '#f6ffed',
  successBorder:   '#b7eb8f',
  successDark:     '#389e0d',
  warningColor:    '#faad14',
  warningBg:       '#fffbe6',
  warningBorder:   '#ffe58f',
  warningDark:     '#d48806',
  dangerColor:     '#ff4d4f',
  dangerBg:        '#fff2f0',
  dangerBorder:    '#ffccc7',
  dangerDark:      '#cf1322',
  infoColor:       'rgba(0,0,0,0.45)',
  infoBg:          '#fafafa',
  infoBorder:      '#d9d9d9',
  panelTeal:       '#40c9c6',
  panelBlue:       '#36a3f7',
  panelRed:        '#f4516c',
  panelGreen:      '#34bfa3',
}

const ADMIN_NAV = [
  { id: 'dashboard', label: '运营看板' },
  { id: 'reports',   label: '报表中心' },
  { id: 'orders',    label: '充电订单' },
  { id: 'sessions',  label: '充电会话' },
  { id: 'stations',  label: '站点管理' },
  { id: 'devices',   label: '设备管理' },
  { id: 'tickets',   label: '故障工单' },
  { id: 'pricing',   label: '计费配置' },
  { id: 'users',     label: '用户管理' },
  { id: 'coupons',   label: '优惠券管理' },
  { id: 'roles',     label: '角色管理' },
  { id: 'perms',     label: '权限管理' },
]

const ADMIN_NAV_GROUPS = [
  { id: 'dashboard', label: '运营看板' },
  { id: 'reports',   label: '报表中心' },
  {
    id: 'charging',
    label: '充电业务',
    icon: icons.TransactionOutlined,
    children: ['orders', 'sessions'],
  },
  {
    id: 'operations',
    label: '运营资产',
    icon: icons.AppstoreOutlined,
    children: ['stations', 'devices', 'tickets'],
  },
  {
    id: 'settings',
    label: '配置与用户',
    icon: icons.SettingOutlined,
    children: ['pricing', 'users', 'coupons'],
  },
  {
    id: 'system',
    label: '系统管理',
    icon: icons.SafetyOutlined,
    children: ['roles', 'perms'],
  },
]

const ADMIN_NAV_ICONS = {
  dashboard: icons.DashboardOutlined,
  reports:   icons.BarChartOutlined,
  orders:    icons.FileTextOutlined,
  sessions:  icons.ClockCircleOutlined,
  stations:  icons.EnvironmentOutlined,
  devices:   icons.ThunderboltOutlined,
  tickets:   icons.ToolOutlined,
  pricing:   icons.DollarCircleOutlined,
  users:     icons.UserOutlined,
  coupons:   icons.GiftOutlined,
  roles:     icons.TeamOutlined,
  perms:     icons.SafetyOutlined,
}

// ─── Logout ───────────────────────────────────────────────────────
function adminLogout() {
  localStorage.removeItem('admin_logged_in')
  localStorage.removeItem('admin_screen')
  if (window.__onAdminLogout) window.__onAdminLogout()
  else window.location.reload()
}

// ─── AdminSidebar ─────────────────────────────────────────────────
function AdminSidebar({ active, onNav, collapsed }) {
  const Sider = antd.Layout.Sider
  const Menu  = antd.Menu

  const navById = Object.fromEntries(ADMIN_NAV.map(item => [item.id, item]))
  const openKeys = ADMIN_NAV_GROUPS
    .filter(item => item.children && item.children.includes(active))
    .map(item => item.id)

  const toMenuItem = item => {
    const Icon = ADMIN_NAV_ICONS[item.id]
    return {
      key:   item.id,
      icon:  <Icon/>,
      label: item.label,
    }
  }

  const [manualOpenKeys, setManualOpenKeys] = React.useState(openKeys)

  React.useEffect(() => {
    setManualOpenKeys(prev => Array.from(new Set([...prev, ...openKeys])))
  }, [active])

  const items = ADMIN_NAV_GROUPS.map(item => {
    if (!item.children) return toMenuItem(item)
    const Icon = item.icon
    return {
      key: item.id,
      icon: <Icon/>,
      label: item.label,
      children: item.children.map(id => toMenuItem(navById[id])),
    }
  })

  return (
    <Sider
      collapsed={collapsed}
      theme="light"
      style={{
        position: 'fixed',
        height: 'calc(100vh - 56px)',
        left: 0,
        top: 56,
        zIndex: 100,
        overflow: 'hidden',
        background: ADMIN.sidebarBg,
        borderRight: `1px solid ${ADMIN.borderLight}`,
        boxShadow: '2px 0 8px rgba(0,0,0,0.03)',
      }}
    >
      <Menu
        theme="light"
        mode="inline"
        inlineCollapsed={collapsed}
        selectedKeys={[active]}
        openKeys={collapsed ? [] : manualOpenKeys}
        onOpenChange={setManualOpenKeys}
        items={items}
        onClick={({ key }) => onNav(key)}
        style={{ borderRight: 0, padding: '8px 10px', background: 'transparent' }}
      />
    </Sider>
  )
}

// ─── AdminHeader ──────────────────────────────────────────────────
function AdminHeader({ title, collapsed }) {
  const userMenu = {
    items: [
      { key: 'profile',  label: '个人信息' },
      { key: 'password', label: '修改密码' },
      { type: 'divider' },
      {
        key: 'logout',
        label: <span style={{ color: ADMIN.dangerColor }}>退出登录</span>,
        onClick: adminLogout,
      },
    ],
  }

  return (
    <div style={{
      height: 56, background: '#fff', flexShrink: 0,
      borderBottom: `1px solid ${ADMIN.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px 0 20px',
      position: 'fixed', left: 0, top: 0, right: 0, zIndex: 110,
      boxShadow: '0 1px 4px rgba(0,21,41,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, minWidth: 0 }}>
          <div style={{
            width: collapsed ? 60 : 180,
            display: 'flex', alignItems: 'center', gap: 10,
            transition: 'width .2s',
            minWidth: 44,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 7, flexShrink: 0,
              background: ADMIN.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 16,
            }}>
              <icons.ThunderboltFilled/>
            </div>
            {!collapsed && (
              <span style={{ fontSize: 17, fontWeight: 700, color: ADMIN.textPrimary, whiteSpace: 'nowrap' }}>
                蓝鲨充电
              </span>
            )}
          </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <antd.Badge dot offset={[-2, 2]}>
          <antd.Button type="text" style={{ color: ADMIN.textSecondary }} icon={<icons.BellOutlined/>}/>
        </antd.Badge>
        <div style={{ width: 1, height: 18, background: ADMIN.borderLight, margin: '0 6px' }}/>
        <antd.Dropdown menu={userMenu} trigger={['click']}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 7,
            cursor: 'pointer', padding: '4px 8px', borderRadius: 4,
          }}>
            <antd.Avatar size={28} style={{ background: ADMIN.primary, fontSize: 12, fontWeight: 700, lineHeight: '28px' }}>张</antd.Avatar>
            <span style={{ fontSize: 13, color: ADMIN.textPrimary }}>张运营</span>
            <icons.DownOutlined style={{ color: ADMIN.textSecondary, fontSize: 10 }}/>
          </div>
        </antd.Dropdown>
      </div>
    </div>
  )
}

// ─── AdminLayout ──────────────────────────────────────────────────
function AdminLayout({ active, onNav, title, children }) {
  const [collapsed, setCollapsed] = React.useState(
    () => localStorage.getItem('admin_sidebar_collapsed') === '1'
  )

  React.useEffect(() => {
    localStorage.removeItem('admin_tags_v2')
  }, [])

  const toggle = () => setCollapsed(v => {
    const next = !v
    localStorage.setItem('admin_sidebar_collapsed', next ? '1' : '0')
    return next
  })

  const sideW = collapsed ? 80 : 200

  return (
    <div style={{ minHeight: '100vh', overflow: 'hidden', background: ADMIN.bodyBg }}>
      <AdminHeader title={title} collapsed={collapsed}/>
      <AdminSidebar active={active} onNav={onNav} collapsed={collapsed}/>
      <antd.Button
        type="default"
        shape="circle"
        size="small"
        onClick={toggle}
        icon={collapsed ? <icons.RightOutlined/> : <icons.LeftOutlined/>}
        style={{
          position: 'fixed',
          left: sideW - 16,
          top: 88,
          zIndex: 120,
          width: 32,
          height: 32,
          color: ADMIN.textSecondary,
          background: '#fff',
          borderColor: ADMIN.borderLight,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          transition: 'left .2s',
        }}
      />
      <div style={{
        marginLeft: sideW,
        display: 'flex', flexDirection: 'column',
        minHeight: '100vh',
        paddingTop: 56,
        transition: 'margin-left .2s',
      }}>
        <div style={{
          height: 'calc(100vh - 56px)',
          overflowY: 'auto',
          padding: '24px 32px 32px',
          background: ADMIN.bodyBg,
        }}>
          <div style={{ marginBottom: 16 }}>
            <antd.Breadcrumb
              items={[
                { title: '蓝鲨充电' },
                { title },
              ]}
            />
          </div>
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── ElCard ─── antd Card 薄包装 ──────────────────────────────────
function ElCard({ title, extra, children, style, padding }) {
  return (
    <antd.Card
      title={title
        ? <span style={{ fontSize: 14, fontWeight: 600, color: ADMIN.textPrimary }}>{title}</span>
        : undefined}
      extra={extra}
      style={style}
      styles={{ body: { padding: padding !== undefined ? padding : 20 } }}
      size="small"
    >
      {children}
    </antd.Card>
  )
}

// ─── ElTag ─── antd Tag 薄包装 ────────────────────────────────────
function ElTag({ type = 'info', children, style }) {
  const colorMap = {
    success: 'success',
    warning: 'warning',
    danger:  'error',
    info:    'default',
    primary: 'processing',
  }
  return (
    <antd.Tag color={colorMap[type] || 'default'} style={{ margin: 0, ...style }}>
      {children}
    </antd.Tag>
  )
}

// ─── ElButton ─── antd Button 薄包装 ─────────────────────────────
function ElButton({ type = 'default', size = 'default', children, onClick, style, disabled, icon }) {
  const sizeMap = { default: 'middle', small: 'small', large: 'large' }
  const antdType = type === 'primary' ? 'primary'
                 : type === 'text'    ? 'link'
                 : 'default'
  const danger = type === 'danger'
  return (
    <antd.Button
      type={antdType}
      danger={danger}
      size={sizeMap[size] || 'middle'}
      onClick={onClick}
      disabled={disabled}
      icon={icon}
      style={{
        ...(type === 'success' ? { color: ADMIN.successColor, borderColor: ADMIN.successColor } : {}),
        ...style,
      }}
    >
      {children}
    </antd.Button>
  )
}

// ─── ElInput ─── antd Input 薄包装 ───────────────────────────────
function ElInput({ placeholder, value, onChange, prefix, width = 200, style }) {
  return (
    <antd.Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      prefix={prefix}
      style={{ width, ...style }}
    />
  )
}

// ─── ElSelect ─── antd Select 薄包装 ─────────────────────────────
function ElSelect({ value, onChange, options, width = 140 }) {
  return (
    <antd.Select
      value={value}
      onChange={onChange}
      options={options}
      style={{ width }}
    />
  )
}

// ─── DataTable ─── antd Table 薄包装 ─────────────────────────────
function DataTable({ columns, data }) {
  const antdCols = columns.map((col, i) => ({
    title:     col.title,
    dataIndex: col.key,
    key:       `col_${i}`,
    align:     col.align,
    render:    col.render,
  }))
  return (
    <antd.Table
      dataSource={data.map((row, i) => ({ ...row, _rk: i }))}
      columns={antdCols}
      rowKey="_rk"
      pagination={false}
      size="middle"
    />
  )
}

// ─── Pagination ─── antd Pagination 薄包装 ───────────────────────
function Pagination({ total, page, pageSize = 10, onPageChange, onPageSizeChange }) {
  return (
    <div style={{ padding: '14px 0 0', display: 'flex', justifyContent: 'flex-end' }}>
      <antd.Pagination
        current={page}
        total={total}
        pageSize={pageSize}
        showSizeChanger
        showTotal={t => `共 ${t} 条`}
        onChange={(p, ps) => {
          if (ps !== pageSize && onPageSizeChange) onPageSizeChange(ps)
          if (p  !== page    && onPageChange)      onPageChange(p)
        }}
        size="small"
      />
    </div>
  )
}

// ─── StatCard ─────────────────────────────────────────────────────
function StatCard({ label, value, unit, delta, up, accentColor, icon }) {
  const color = accentColor || ADMIN.primary
  const [hovered, setHovered] = React.useState(false)
  return (
    <antd.Card
      size="small"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{
          padding: 14, borderRadius: 6, flexShrink: 0,
          background: hovered ? color : color + '1a',
          color: hovered ? '#fff' : color,
          transition: 'all 0.38s ease-out',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>{icon}</div>
        <div style={{ textAlign: 'right', flex: 1, paddingLeft: 8 }}>
          <div style={{ fontSize: 13, color: ADMIN.textSecondary, marginBottom: 6 }}>{label}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, justifyContent: 'flex-end' }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: ADMIN.textPrimary, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
            {unit && <span style={{ fontSize: 12, color: ADMIN.textSecondary }}>{unit}</span>}
          </div>
          {delta && (
            <div style={{ marginTop: 6, fontSize: 12, color: up ? ADMIN.successColor : ADMIN.dangerColor, display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end' }}>
              <svg width="10" height="8" viewBox="0 0 10 8" fill="currentColor">
                {up ? <path d="M5 1l4 6H1l4-6z"/> : <path d="M5 7L1 1h8L5 7z"/>}
              </svg>
              {delta} vs 前日
            </div>
          )}
        </div>
      </div>
    </antd.Card>
  )
}

// ─── Charts（ECharts + antd 风格 tooltip） ────────────────────────

// 通用 ECharts 容器：自动 init / resize / dispose
function EChartBase({ option, height, style }) {
  const ref  = React.useRef(null)
  const inst = React.useRef(null)

  React.useEffect(() => {
    if (!ref.current || !window.echarts) return
    inst.current = echarts.init(ref.current, null, { renderer: 'canvas' })
    inst.current.setOption(option)
    const ro = new ResizeObserver(() => inst.current && inst.current.resize())
    ro.observe(ref.current)
    return () => { ro.disconnect(); inst.current && inst.current.dispose() }
  }, [])

  React.useEffect(() => {
    if (inst.current) inst.current.setOption(option, { notMerge: false })
  }, [JSON.stringify(option)])

  return <div ref={ref} style={{ width: '100%', height, ...style }}></div>
}

// 共用配置
function baseGrid() {
  return { top: 10, right: 8, bottom: 28, left: 8, containLabel: true }
}
function baseAxisLabel() {
  return { fontSize: 11, color: ADMIN.textSecondary, margin: 6 }
}
function baseSplitLine() {
  return { lineStyle: { color: ADMIN.borderLight, type: 'dashed' } }
}
// antd Tooltip 风格（深色、圆角，与 antd.Tooltip 视觉一致）
function antdTip(formatter) {
  return {
    trigger: 'axis',
    backgroundColor: 'rgba(0,0,0,0.85)',
    borderWidth: 0,
    padding: [6, 10],
    textStyle: { fontSize: 12, color: '#fff' },
    extraCssText: 'border-radius:6px;box-shadow:0 3px 8px rgba(0,0,0,0.18);',
    formatter,
  }
}

// BarChart：data = [{label, v}]
function BarChart({ data, height = 150, color }) {
  const c = color || ADMIN.primary
  const option = {
    animation: true,
    grid: baseGrid(),
    tooltip: { ...antdTip(p => `${p[0].name}　${p[0].value.toLocaleString()}`), axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(0,0,0,0.04)' } } },
    xAxis: { type: 'category', data: data.map(d => d.label), axisLine: { show: false }, axisTick: { show: false }, axisLabel: baseAxisLabel() },
    yAxis: { type: 'value', splitLine: baseSplitLine(), axisLabel: { ...baseAxisLabel(), formatter: v => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v } },
    series: [{ type: 'bar', data: data.map((d, i) => ({ value: d.v, itemStyle: { color: c, opacity: i === data.length-1 ? 1 : 0.6, borderRadius: [3,3,0,0] } })), barMaxWidth: 36 }],
  }
  return <EChartBase option={option} height={height}/>
}

// LineChart：data = [{label, v}]
function LineChart({ data, height = 150, color }) {
  const c = color || ADMIN.primary
  const option = {
    animation: true,
    grid: baseGrid(),
    tooltip: antdTip(p => `${p[0].name}　${p[0].value.toLocaleString()}`),
    xAxis: { type: 'category', data: data.map(d => d.label), axisLine: { show: false }, axisTick: { show: false }, axisLabel: baseAxisLabel(), boundaryGap: false },
    yAxis: { type: 'value', splitLine: baseSplitLine(), axisLabel: { ...baseAxisLabel(), formatter: v => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v } },
    series: [{ type: 'line', data: data.map(d => d.v), smooth: true, symbol: 'circle', symbolSize: 6,
      lineStyle: { color: c, width: 2 }, itemStyle: { color: c, borderColor: '#fff', borderWidth: 2 },
      areaStyle: { color: { type: 'linear', x:0, y:0, x2:0, y2:1, colorStops: [{ offset:0, color: c+'30' }, { offset:1, color: c+'05' }] } } }],
  }
  return <EChartBase option={option} height={height}/>
}

// MiniDonut：segments = [{label, value, color, _n?}]
function MiniDonut({ segments, size = 110 }) {
  const weights = segments.map((s) => {
    if (typeof s._n === 'number') return s._n
    if (typeof s.value === 'number') return s.value
    const m = String(s.value).replace(/,/g, '').match(/^[\d.]+/)
    const n = m ? parseFloat(m[0]) : NaN
    return isNaN(n) || n === 0 ? 1 : n
  })
  const option = {
    animation: false,
    series: [{ type: 'pie', radius: ['52%','72%'], center: ['50%','50%'],
      data: segments.map((s, i) => ({ value: weights[i], name: s.label, itemStyle: { color: s.color } })),
      label: { show: false }, labelLine: { show: false }, emphasis: { scale: false } }],
  }
  return <div style={{ flexShrink: 0 }}><EChartBase option={option} height={size} style={{ width: size }}/></div>
}

// ─── SearchableMultiSelect ────────────────────────────────────────
function SearchableMultiSelect({ value = [], onChange, fetchOptions, placeholder = '请选择', width = 220 }) {
  const [options, setOptions] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const timer = React.useRef(null)

  React.useEffect(() => { doSearch('') }, [])

  function doSearch(q) {
    setLoading(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(async () => {
      try   { const res = await fetchOptions(q); setOptions(res) }
      finally { setLoading(false) }
    }, q ? 300 : 0)
  }

  return (
    <antd.Select
      mode="multiple"
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      showSearch
      filterOption={false}
      onSearch={doSearch}
      loading={loading}
      style={{ width }}
      maxTagCount="responsive"
      allowClear
    />
  )
}

// ─── PageHeader ───────────────────────────────────────────────────
function PageHeader({ children }) {
  if (!children) return null
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
      <antd.Space>{children}</antd.Space>
    </div>
  )
}

// ─── FilterBar ────────────────────────────────────────────────────
function FilterBar({ children }) {
  return <antd.Space wrap size={[16, 16]}>{children}</antd.Space>
}

function QueryPanel({ children }) {
  return (
    <ElCard style={{ marginBottom: 24 }} padding="24px 32px">
      <FilterBar>{children}</FilterBar>
    </ElCard>
  )
}

function TableCard({ title, extra, children }) {
  const hasHeader = title || extra
  return (
    <ElCard padding="24px 32px">
      {hasHeader && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: title ? 'space-between' : 'flex-end',
          gap: 16,
          marginBottom: 24,
          minHeight: 32,
        }}>
          {title && <div style={{ fontSize: 16, fontWeight: 600, color: ADMIN.textPrimary }}>{title}</div>}
          {extra && <antd.Space size="middle">{extra}</antd.Space>}
        </div>
      )}
      {children}
    </ElCard>
  )
}

// ─── InfoTip ─── antd Tooltip ─────────────────────────────────────
function InfoTip({ text }) {
  return (
    <antd.Tooltip title={text} placement="top">
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        marginLeft: 3, verticalAlign: 'middle',
        width: 14, height: 14, borderRadius: '50%',
        border: `1px solid ${ADMIN.border}`,
        fontSize: 9.5, fontWeight: 700,
        color: ADMIN.textSecondary,
        cursor: 'help', flexShrink: 0,
        background: '#fff', userSelect: 'none',
      }}>?</span>
    </antd.Tooltip>
  )
}
