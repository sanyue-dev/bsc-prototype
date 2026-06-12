// admin/components.jsx — antd-backed layout shell + shared UI primitives
// 蓝鲨充电 PC Admin · Ant Design v5

/* global antd */

// ─── Color tokens ────────────────────────────────────────────────
const ADMIN = {
  sidebarBg:       '#001529',
  sidebarLightBg:  '#0f2438',
  sidebarText:     '#bfcbd9',
  sidebarTextHover:'#ffffff',
  sidebarActiveBg: '#409eff',
  sidebarHoverBg:  'rgba(255,255,255,0.07)',
  headerBg:        '#ffffff',
  bodyBg:          '#f5f7f9',
  cardBg:          '#ffffff',
  border:          '#dcdfe6',
  borderLight:     '#ebeef5',
  divider:         '#d8dce5',
  textPrimary:     '#303133',
  textRegular:     '#606266',
  textSecondary:   '#909399',
  primary:         '#409eff',
  primaryHover:    '#66b1ff',
  primaryLight:    '#ecf5ff',
  successColor:    '#67c23a',
  successBg:       '#f0f9eb',
  successBorder:   '#c2e7b0',
  successDark:     '#529b2e',
  warningColor:    '#e6a23c',
  warningBg:       '#fdf6ec',
  warningBorder:   '#f5dab1',
  warningDark:     '#b88230',
  dangerColor:     '#f56c6c',
  dangerBg:        '#fef0f0',
  dangerBorder:    '#fde2e2',
  dangerDark:      '#c45656',
  infoColor:       '#909399',
  infoBg:          '#f4f4f5',
  infoBorder:      '#d3d4d6',
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
]

// ─── Nav Icons ────────────────────────────────────────────────────
function AdminNavIcon({ id, className, style }) {
  const c = 'currentColor'
  const icons = {
    dashboard: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="8" rx="1.5" fill={c} opacity="0.95"/><rect x="13" y="3" width="8" height="4" rx="1.5" fill={c} opacity="0.7"/><rect x="13" y="9" width="8" height="2.5" rx="1.25" fill={c} opacity="0.5"/><rect x="3" y="13" width="4" height="8" rx="1.5" fill={c} opacity="0.6"/><rect x="9" y="13" width="12" height="8" rx="1.5" fill={c} opacity="0.9"/></svg>),
    stations:  (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke={c} strokeWidth="1.6" fill="none"/><circle cx="12" cy="9" r="2.5" stroke={c} strokeWidth="1.5" fill="none"/></svg>),
    devices:   (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={c} strokeWidth="1.6" fill="none" strokeLinejoin="round" strokeLinecap="round"/></svg>),
    tickets:   (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke={c} strokeWidth="1.5" fill="none"/><path d="M8 8h8M8 12h8M8 16h5" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>),
    pricing:   (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.5" fill="none"/><path d="M12 7v1.5M12 15.5V17" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><path d="M9.5 10.5c0-1.1.9-2 2.5-2s2.5.9 2.5 2c0 2.4-5 2.4-5 4.5 0 1.1.9 2 2.5 2s2.5-.9 2.5-2" stroke={c} strokeWidth="1.4" strokeLinecap="round" fill="none"/></svg>),
    users:     (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke={c} strokeWidth="1.5" fill="none"/><path d="M4 20c0-3.8 3.6-6.5 8-6.5s8 2.7 8 6.5" stroke={c} strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>),
    orders:    (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><rect x="9" y="3" width="6" height="4" rx="1" stroke={c} strokeWidth="1.5"/><path d="M9 12h6M9 16h4" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>),
    sessions:  (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="13" r="7" stroke={c} strokeWidth="1.5" fill="none"/><path d="M12 10v3.5l2.5 2" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M8.5 3.5h7M12 3.5V6" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>),
    coupons:   (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M2 9a2 2 0 012-2h16a2 2 0 012 2v1.5a2 2 0 000 4V16a2 2 0 01-2 2H4a2 2 0 01-2-2v-1.5a2 2 0 000-4V9z" stroke={c} strokeWidth="1.5" fill="none"/><path d="M9 12h6M9 9.5h3" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>),
    reports:   (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke={c} strokeWidth="1.5" fill="none"/><path d="M7 16l3-4 3 3 3-5" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  }
  const icon = icons[id]
  if (!icon) return null
  return React.cloneElement(icon, {
    className: [icon.props.className, className].filter(Boolean).join(' ') || undefined,
    style: { ...icon.props.style, ...style },
  })
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

  const items = ADMIN_NAV.map(item => ({
    key:   item.id,
    icon:  <AdminNavIcon id={item.id}/>,
    label: item.label,
  }))

  return (
    <Sider
      collapsed={collapsed}
      width={200}
      collapsedWidth={64}
      theme="dark"
      style={{ position: 'fixed', height: '100vh', left: 0, top: 0, zIndex: 100, overflow: 'hidden' }}
    >
      <div style={{
        height: 50, display: 'flex', alignItems: 'center',
        gap: collapsed ? 0 : 10,
        justifyContent: collapsed ? 'center' : 'flex-start',
        padding: collapsed ? 0 : '0 16px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        flexShrink: 0, transition: 'padding .2s',
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: 6, flexShrink: 0,
          background: ADMIN.primary,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        </div>
        {!collapsed && (
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: 0.5 }}>蓝鲨充电</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', marginTop: 1 }}>运营管理平台</div>
          </div>
        )}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        inlineCollapsed={collapsed}
        selectedKeys={[active]}
        items={items}
        onClick={({ key }) => onNav(key)}
        style={{ borderRight: 0, marginTop: 4 }}
      />
    </Sider>
  )
}

// ─── AdminHeader ──────────────────────────────────────────────────
function AdminHeader({ title, onToggle }) {
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
      height: 50, background: '#fff', flexShrink: 0,
      borderBottom: `1px solid ${ADMIN.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px', zIndex: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <antd.Button
          type="text"
          onClick={onToggle}
          style={{ color: ADMIN.textSecondary, padding: '0 6px' }}
          icon={
            <svg width="16" height="12" viewBox="0 0 18 14" fill="none">
              <path d="M1 1h16M1 7h16M1 13h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          }
        />
        <span style={{ fontSize: 13, color: ADMIN.textSecondary }}>蓝鲨充电</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M4 2l4 4-4 4" stroke={ADMIN.border} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontSize: 13, color: ADMIN.textPrimary, fontWeight: 500 }}>{title}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <antd.Badge dot offset={[-2, 2]}>
          <antd.Button type="text" style={{ color: ADMIN.textSecondary }} icon={
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          }/>
        </antd.Badge>
        <div style={{ width: 1, height: 18, background: ADMIN.borderLight, margin: '0 6px' }}/>
        <antd.Dropdown menu={userMenu} trigger={['click']}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 7,
            cursor: 'pointer', padding: '4px 8px', borderRadius: 4,
          }}>
            <antd.Avatar size={28} style={{ background: ADMIN.primary, fontSize: 12, fontWeight: 700, lineHeight: '28px' }}>张</antd.Avatar>
            <span style={{ fontSize: 13, color: ADMIN.textPrimary }}>张运营</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke={ADMIN.textSecondary} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
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
  const [tags, setTags] = React.useState(() => {
    try {
      const saved = localStorage.getItem('admin_tags_v2')
      if (saved) return JSON.parse(saved)
    } catch(e) {}
    return [{ id: 'dashboard', label: '运营看板' }]
  })

  React.useEffect(() => {
    const navItem = ADMIN_NAV.find(n => n.id === active)
    if (!navItem) return
    setTags(prev => {
      if (prev.some(t => t.id === active)) return prev
      const next = [...prev, { id: active, label: navItem.label }]
      localStorage.setItem('admin_tags_v2', JSON.stringify(next))
      return next
    })
  }, [active])

  function closeTag(id) {
    setTags(prev => {
      const next = prev.filter(t => t.id !== id)
      localStorage.setItem('admin_tags_v2', JSON.stringify(next))
      if (id === active) {
        const idx = prev.findIndex(t => t.id === id)
        const fallback = next[Math.min(idx, next.length - 1)]
        if (fallback) onNav(fallback.id)
      }
      return next
    })
  }

  const toggle = () => setCollapsed(v => {
    const next = !v
    localStorage.setItem('admin_sidebar_collapsed', next ? '1' : '0')
    return next
  })

  const sideW = collapsed ? 64 : 200

  const tabItems = tags.map(tag => ({
    key:      tag.id,
    label:    tag.label,
    closable: tag.id !== 'dashboard',
  }))

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: ADMIN.bodyBg }}>
      <style>{`
        .admin-tagview .ant-tabs-content-holder { display: none !important; }
        .admin-tagview .ant-tabs-nav { margin-bottom: 0 !important; }
        .admin-tagview { background: #fff; border-bottom: 1px solid ${ADMIN.divider}; padding-left: 8px; }
        .admin-tagview .ant-tabs-tab { font-size: 12px !important; }
      `}</style>
      <AdminSidebar active={active} onNav={onNav} collapsed={collapsed}/>
      <div style={{
        marginLeft: sideW, flex: 1,
        display: 'flex', flexDirection: 'column',
        height: '100vh', overflow: 'hidden',
        transition: 'margin-left .2s',
      }}>
        <AdminHeader title={title} onToggle={toggle}/>
        <antd.Tabs
          className="admin-tagview"
          type="editable-card"
          hideAdd
          size="small"
          activeKey={active}
          items={tabItems}
          onChange={onNav}
          onEdit={(key, action) => { if (action === 'remove') closeTag(key) }}
        />
        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
          {children}
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

// ─── Charts（自定义 SVG） ─────────────────────────────────────────
function BarChart({ data, height = 150, color }) {
  const c   = color || ADMIN.primary
  const max = Math.max(...data.map(d => d.v))
  const W = 500, H = height, n = data.length
  const slot = W / n
  const barW = Math.floor(slot * 0.52)
  return (
    <svg viewBox={`0 0 ${W} ${H + 26}`} style={{ width: '100%', display: 'block' }}>
      {[0.25, 0.5, 0.75, 1].map((f, i) => (
        <line key={i} x1={0} y1={H * (1 - f * 0.9)} x2={W} y2={H * (1 - f * 0.9)}
          stroke={ADMIN.borderLight} strokeWidth="1"/>
      ))}
      {data.map((d, i) => {
        const bh = (d.v / max) * H * 0.88
        const x  = i * slot + (slot - barW) / 2
        return (
          <g key={i}>
            <rect x={x} y={H - bh} width={barW} height={bh} rx="3" fill={c} opacity={i === n - 1 ? 1 : 0.55}/>
            <text x={x + barW / 2} y={H + 18} textAnchor="middle" fontSize="11" fill={ADMIN.textSecondary}>{d.label}</text>
          </g>
        )
      })}
    </svg>
  )
}

function LineChart({ data, height = 150, color }) {
  const c   = color || ADMIN.primary
  const max = Math.max(...data.map(d => d.v))
  const min = Math.min(...data.map(d => d.v)) * 0.88
  const W = 500, H = height, n = data.length
  const px = i => (i / (n - 1)) * (W - 40) + 20
  const py = v => H - ((v - min) / (max - min || 1)) * H * 0.82 - 8
  const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${px(i)},${py(d.v)}`).join(' ')
  const fill = `${path} L${px(n-1)},${H + 4} L${px(0)},${H + 4}Z`
  const uid  = c.replace('#', '')
  return (
    <svg viewBox={`0 0 ${W} ${H + 26}`} style={{ width: '100%', display: 'block' }}>
      <defs>
        <linearGradient id={`lg${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c} stopOpacity="0.18"/>
          <stop offset="100%" stopColor={c} stopOpacity="0.01"/>
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f, i) => (
        <line key={i} x1={20} y1={py(min + (max - min) * f)} x2={W - 20} y2={py(min + (max - min) * f)}
          stroke={ADMIN.borderLight} strokeWidth="1" strokeDasharray="4 4"/>
      ))}
      <path d={fill} fill={`url(#lg${uid})`}/>
      <path d={path} stroke={c} strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={px(i)} cy={py(d.v)} r="3.5" fill={c} stroke="#fff" strokeWidth="1.5"/>
          <text x={px(i)} y={H + 19} textAnchor="middle" fontSize="11" fill={ADMIN.textSecondary}>{d.label}</text>
        </g>
      ))}
    </svg>
  )
}

function MiniDonut({ segments, size = 110 }) {
  const cx = size / 2, cy = size / 2, r = size * 0.33
  const C   = 2 * Math.PI * r
  const total = segments.reduce((s, d) => s + d.value, 0)
  let consumed = 0
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
      {segments.map((seg, i) => {
        const len = (seg.value / total) * C
        const da  = `${len} ${C - len}`
        const off = -consumed
        consumed += len
        return <circle key={i} cx={cx} cy={cy} r={r} fill="none"
          stroke={seg.color} strokeWidth={size * 0.13}
          strokeDasharray={da} strokeDashoffset={off}/>
      })}
    </svg>
  )
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
  return <antd.Space wrap>{children}</antd.Space>
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
