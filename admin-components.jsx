// admin-components.jsx — Layout shell + shared UI primitives
// 蓝鲨充电 PC Admin · vue-element-plus-admin style

const ADMIN = {
  sidebarBg:         '#001529',
  sidebarLightBg:    '#0f2438',
  sidebarText:       '#bfcbd9',
  sidebarTextHover:  '#ffffff',
  sidebarActiveBg:   '#409eff',
  sidebarHoverBg:    'rgba(255,255,255,0.07)',
  headerBg:          '#ffffff',
  bodyBg:            '#f5f7f9',
  cardBg:            '#ffffff',
  border:            '#dcdfe6',
  borderLight:       '#ebeef5',
  divider:           '#d8dce5',
  textPrimary:       '#303133',
  textRegular:       '#606266',
  textSecondary:     '#909399',
  primary:           '#409eff',
  primaryHover:      '#66b1ff',
  primaryLight:      '#ecf5ff',
  successColor:      '#67c23a',
  successBg:         '#f0f9eb',
  successBorder:     '#c2e7b0',
  successDark:       '#529b2e',
  warningColor:      '#e6a23c',
  warningBg:         '#fdf6ec',
  warningBorder:     '#f5dab1',
  warningDark:       '#b88230',
  dangerColor:       '#f56c6c',
  dangerBg:          '#fef0f0',
  dangerBorder:      '#fde2e2',
  dangerDark:        '#c45656',
  infoColor:         '#909399',
  infoBg:            '#f4f4f5',
  infoBorder:        '#d3d4d6',
  // Panel icon accent colors (matching vue-element-plus-admin PanelGroup)
  panelTeal:         '#40c9c6',
  panelBlue:         '#36a3f7',
  panelRed:          '#f4516c',
  panelGreen:        '#34bfa3',
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
function AdminNavIcon({ id, active }) {
  const c = active ? '#ffffff' : ADMIN.sidebarText
  const icons = {
    dashboard: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="8" rx="1.5" fill={c} opacity="0.95"/><rect x="13" y="3" width="8" height="4" rx="1.5" fill={c} opacity="0.7"/><rect x="13" y="9" width="8" height="2.5" rx="1.25" fill={c} opacity="0.5"/><rect x="3" y="13" width="4" height="8" rx="1.5" fill={c} opacity="0.6"/><rect x="9" y="13" width="12" height="8" rx="1.5" fill={c} opacity="0.9"/></svg>,
    stations:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke={c} strokeWidth="1.6" fill="none"/><circle cx="12" cy="9" r="2.5" stroke={c} strokeWidth="1.5" fill="none"/></svg>,
    devices:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={c} strokeWidth="1.6" fill="none" strokeLinejoin="round" strokeLinecap="round"/></svg>,
    tickets:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke={c} strokeWidth="1.5" fill="none"/><path d="M8 8h8M8 12h8M8 16h5" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>,
    pricing:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.5" fill="none"/><path d="M12 7v1.5M12 15.5V17" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><path d="M9.5 10.5c0-1.1.9-2 2.5-2s2.5.9 2.5 2c0 2.4-5 2.4-5 4.5 0 1.1.9 2 2.5 2s2.5-.9 2.5-2" stroke={c} strokeWidth="1.4" strokeLinecap="round" fill="none"/></svg>,
    users:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke={c} strokeWidth="1.5" fill="none"/><path d="M4 20c0-3.8 3.6-6.5 8-6.5s8 2.7 8 6.5" stroke={c} strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>,
    orders:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><rect x="9" y="3" width="6" height="4" rx="1" stroke={c} strokeWidth="1.5"/><path d="M9 12h6M9 16h4" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>,
    sessions:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="13" r="7" stroke={c} strokeWidth="1.5" fill="none"/><path d="M12 10v3.5l2.5 2" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M8.5 3.5h7M12 3.5V6" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>,
    coupons:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M2 9a2 2 0 012-2h16a2 2 0 012 2v1.5a2 2 0 000 4V16a2 2 0 01-2 2H4a2 2 0 01-2-2v-1.5a2 2 0 000-4V9z" stroke={c} strokeWidth="1.5" fill="none"/><path d="M9 12h6M9 9.5h3" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></svg>,
    reports:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke={c} strokeWidth="1.5" fill="none"/><path d="M7 16l3-4 3 3 3-5" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  }
  return icons[id] || null
}

// ─── AdminSidebar ─────────────────────────────────────────────────
function AdminSidebar({ active, onNav, collapsed }) {
  const sideW = collapsed ? 64 : 200
  return (
    <div style={{
      width: sideW, flexShrink: 0, height: '100vh',
      position: 'fixed', left: 0, top: 0,
      background: ADMIN.sidebarBg,
      display: 'flex', flexDirection: 'column',
      zIndex: 100, userSelect: 'none',
      transition: 'width .2s',
      overflow: 'hidden',
    }}>
      {/* Logo — 50px to match --logo-height */}
      <div style={{
        height: 50, display: 'flex', alignItems: 'center',
        gap: 10, padding: collapsed ? '0' : '0 16px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        flexShrink: 0,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        transition: 'padding .2s',
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: 6,
          background: ADMIN.primary, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white"/>
          </svg>
        </div>
        {!collapsed && (
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: 0.5 }}>蓝鲨充电</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', marginTop: 1 }}>运营管理平台</div>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: collapsed ? '8px 6px' : '8px 10px', overflowY: 'auto', overflowX: 'hidden', transition: 'padding .2s' }}>
        {ADMIN_NAV.map(item => {
          const isActive = active === item.id
          return (
            <div key={item.id} onClick={() => onNav(item.id)}
              title={collapsed ? item.label : ''}
              style={{
                display: 'flex', alignItems: 'center',
                gap: collapsed ? 0 : 10,
                justifyContent: collapsed ? 'center' : 'flex-start',
                height: 42, padding: collapsed ? '0' : '0 12px',
                borderRadius: 4, cursor: 'pointer', marginBottom: 2,
                background: isActive ? ADMIN.sidebarActiveBg : 'transparent',
                color: isActive ? '#fff' : ADMIN.sidebarText,
                fontSize: 13, fontWeight: isActive ? 600 : 400,
                transition: 'background .15s, color .15s',
                overflow: 'hidden', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.background = ADMIN.sidebarLightBg
                  e.currentTarget.style.color = '#fff'
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = ADMIN.sidebarText
                }
              }}
            >
              <AdminNavIcon id={item.id} active={isActive}/>
              {!collapsed && item.label}
            </div>
          )
        })}
      </nav>
    </div>
  )
}

// ─── adminLogout ──────────────────────────────────────────────────
function adminLogout() {
  localStorage.removeItem('admin_logged_in')
  localStorage.removeItem('admin_screen')
  if (window.__onAdminLogout) window.__onAdminLogout()
  else window.location.reload()
}

// ─── AdminHeader ──────────────────────────────────────────────────
function AdminHeader({ title, onToggle }) {
  const [dropOpen, setDropOpen] = React.useState(false)
  const ref = React.useRef(null)
  React.useEffect(() => {
    function onOut(e) { if (ref.current && !ref.current.contains(e.target)) setDropOpen(false) }
    document.addEventListener('mousedown', onOut)
    return () => document.removeEventListener('mousedown', onOut)
  }, [])

  const iconBtn = (children, onClick) => (
    <button onClick={onClick} style={{
      width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 4,
      color: ADMIN.textSecondary, flexShrink: 0, transition: 'background .12s',
    }}
      onMouseEnter={e => e.currentTarget.style.background = ADMIN.bodyBg}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >{children}</button>
  )

  return (
    <div style={{
      height: 50, background: ADMIN.headerBg, flexShrink: 0,
      borderBottom: `1px solid ${ADMIN.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px', zIndex: 10,
    }}>
      {/* Left: collapse + breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {iconBtn(
          <svg width="16" height="12" viewBox="0 0 18 14" fill="none">
            <path d="M1 1h16M1 7h16M1 13h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>,
          onToggle
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
          <span style={{ color: ADMIN.textSecondary }}>蓝鲨充电</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4 2l4 4-4 4" stroke={ADMIN.border} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ color: ADMIN.textPrimary, fontWeight: 500 }}>{title}</span>
        </div>
      </div>

      {/* Right: tools + user */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {/* Search */}
        {iconBtn(<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.6"/><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>)}
        {/* Fullscreen */}
        {iconBtn(<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>)}
        {/* Settings */}
        {iconBtn(<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/><path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>)}

        {/* Notification */}
        <div style={{ position: 'relative' }}>
          {iconBtn(<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>)}
          <span style={{ position: 'absolute', top: 4, right: 4, width: 7, height: 7, borderRadius: 999, background: ADMIN.dangerColor, border: '1.5px solid #fff', pointerEvents: 'none' }}/>
        </div>

        <div style={{ width: 1, height: 18, background: ADMIN.borderLight, margin: '0 6px' }}/>

        {/* User dropdown */}
        <div ref={ref} style={{ position: 'relative' }}>
          <div
            onClick={() => setDropOpen(v => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer',
              padding: '4px 8px', borderRadius: 4,
              background: dropOpen ? ADMIN.primaryLight : 'transparent',
              transition: 'background .12s',
            }}
            onMouseEnter={e => { if (!dropOpen) e.currentTarget.style.background = ADMIN.bodyBg }}
            onMouseLeave={e => { if (!dropOpen) e.currentTarget.style.background = 'transparent' }}
          >
            <div style={{
              width: 28, height: 28, borderRadius: 999,
              background: ADMIN.primary, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0,
            }}>张</div>
            <span style={{ fontSize: 13, color: ADMIN.textPrimary }}>张运营</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: dropOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
              <path d="M1 1l4 4 4-4" stroke={ADMIN.textSecondary} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {dropOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', right: 0,
              background: '#fff', borderRadius: 4,
              border: `1px solid ${ADMIN.borderLight}`,
              boxShadow: '0 6px 24px rgba(0,21,41,0.12)',
              minWidth: 160, zIndex: 999, overflow: 'hidden',
              animation: 'dropIn .15s ease',
            }}>
              <div style={{ padding: '12px 16px 10px', borderBottom: `1px solid ${ADMIN.borderLight}` }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: ADMIN.textPrimary }}>张运营</div>
                <div style={{ fontSize: 12, color: ADMIN.textSecondary, marginTop: 2 }}>超级管理员</div>
              </div>
              {[
                { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.8 3.6-6.5 8-6.5s8 2.7 8 6.5"/></svg>, label: '个人信息' },
                { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>, label: '修改密码' },
              ].map((item, i) => (
                <div key={i} onClick={() => setDropOpen(false)} style={{
                  display: 'flex', alignItems: 'center', gap: 9,
                  padding: '9px 16px', fontSize: 13, color: ADMIN.textRegular,
                  cursor: 'pointer', transition: 'background .12s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = ADMIN.bodyBg}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >{item.icon}{item.label}</div>
              ))}
              <div style={{ borderTop: `1px solid ${ADMIN.borderLight}` }}/>
              <div onClick={adminLogout} style={{
                display: 'flex', alignItems: 'center', gap: 9,
                padding: '9px 16px', fontSize: 13, color: ADMIN.dangerColor,
                cursor: 'pointer', transition: 'background .12s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = ADMIN.dangerBg}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                退出登录
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes dropIn { from { opacity:0;transform:translateY(-6px) } to { opacity:1;transform:none } }`}</style>
    </div>
  )
}

// ─── TagsView ─────────────────────────────────────────────────────
function TagsView({ active, tags, onNav, onClose }) {
  return (
    <div style={{
      height: 35, background: '#fff', flexShrink: 0,
      borderBottom: `1px solid ${ADMIN.divider}`,
      borderTop: `1px solid ${ADMIN.divider}`,
      display: 'flex', alignItems: 'center',
      padding: '0 12px', gap: 5,
      overflowX: 'auto', overflowY: 'hidden',
    }}>
      <style>{`.tags-scroll::-webkit-scrollbar{display:none}`}</style>
      {tags.map(tag => {
        const isActive = tag.id === active
        return (
          <div
            key={tag.id}
            onClick={() => onNav(tag.id)}
            className="tags-scroll"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              height: 24, padding: '0 8px',
              border: `1px solid ${isActive ? ADMIN.primary : ADMIN.divider}`,
              borderRadius: 2,
              background: isActive ? ADMIN.primary : '#fff',
              color: isActive ? '#fff' : ADMIN.textRegular,
              cursor: 'pointer', fontSize: 12, flexShrink: 0,
              transition: 'all .12s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = ADMIN.primary }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = ADMIN.textRegular }}
          >
            {isActive && (
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff', display: 'inline-block', flexShrink: 0 }}/>
            )}
            {tag.label}
            {tag.id !== 'dashboard' && (
              <span
                onClick={e => { e.stopPropagation(); onClose(tag.id) }}
                style={{ fontSize: 14, lineHeight: 1, opacity: 0.65, cursor: 'pointer', marginLeft: 1, display: 'inline-flex', alignItems: 'center' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0.65'}
              >×</span>
            )}
          </div>
        )
      })}
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

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: ADMIN.bodyBg }}>
      <AdminSidebar active={active} onNav={onNav} collapsed={collapsed}/>
      <div style={{
        marginLeft: sideW, flex: 1,
        display: 'flex', flexDirection: 'column',
        height: '100vh', overflow: 'hidden',
        transition: 'margin-left .2s',
      }}>
        <AdminHeader title={title} onToggle={toggle}/>
        <TagsView active={active} tags={tags} onNav={onNav} onClose={closeTag}/>
        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

// ─── ElCard ───────────────────────────────────────────────────────
function ElCard({ title, extra, children, style, padding }) {
  const [hovered, setHovered] = React.useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: ADMIN.cardBg, borderRadius: 4,
        border: `1px solid ${ADMIN.borderLight}`,
        boxShadow: hovered
          ? '0 2px 12px rgba(0,21,41,0.1)'
          : '0 1px 4px rgba(0,21,41,0.04)',
        transition: 'box-shadow .3s',
        overflow: 'hidden', ...style,
      }}>
      {title && (
        <div style={{
          padding: '13px 20px',
          borderBottom: `1px solid ${ADMIN.borderLight}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: ADMIN.textPrimary }}>{title}</span>
          {extra}
        </div>
      )}
      <div style={{ padding: padding !== undefined ? padding : 20 }}>{children}</div>
    </div>
  )
}

// ─── ElTag ────────────────────────────────────────────────────────
function ElTag({ type = 'info', children }) {
  const map = {
    success: { bg: ADMIN.successBg,  color: ADMIN.successDark, border: ADMIN.successBorder },
    warning: { bg: ADMIN.warningBg,  color: ADMIN.warningDark, border: ADMIN.warningBorder },
    danger:  { bg: ADMIN.dangerBg,   color: ADMIN.dangerDark,  border: ADMIN.dangerBorder },
    info:    { bg: ADMIN.infoBg,     color: ADMIN.infoColor,   border: ADMIN.infoBorder },
    primary: { bg: ADMIN.primaryLight, color: ADMIN.primary,   border: '#c5d3ff' },
  }
  const s = map[type] || map.info
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '2px 8px', borderRadius: 3, fontSize: 12,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      fontWeight: 500, whiteSpace: 'nowrap',
    }}>{children}</span>
  )
}

// ─── ElButton ─────────────────────────────────────────────────────
function ElButton({ type = 'default', size = 'default', children, onClick, style, disabled }) {
  const typeMap = {
    primary: { bg: ADMIN.primary,     color: '#fff',             border: ADMIN.primary,      hover: ADMIN.primaryHover },
    default: { bg: '#fff',            color: ADMIN.textRegular,  border: ADMIN.border,       hover: '#ecf5ff' },
    danger:  { bg: '#fff',            color: ADMIN.dangerColor,  border: ADMIN.dangerColor,  hover: ADMIN.dangerBg },
    success: { bg: '#fff',            color: ADMIN.successColor, border: ADMIN.successColor, hover: ADMIN.successBg },
    text:    { bg: 'transparent',     color: ADMIN.primary,      border: 'transparent',      hover: ADMIN.primaryLight },
  }
  const sizeMap = {
    default: { h: 32, px: 15, fs: 13 },
    small:   { h: 26, px: 10, fs: 12 },
    large:   { h: 40, px: 20, fs: 14 },
  }
  const ts = typeMap[type] || typeMap.default
  const ss = sizeMap[size] || sizeMap.default
  return (
    <button onClick={onClick} disabled={disabled} style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      height: ss.h, padding: `0 ${ss.px}px`, borderRadius: 4,
      background: ts.bg, color: ts.color, border: `1px solid ${ts.border}`,
      fontSize: ss.fs, fontWeight: 500, cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1, transition: 'all .15s', outline: 'none',
      whiteSpace: 'nowrap', ...style,
    }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = ts.hover }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.background = ts.bg }}
    >{children}</button>
  )
}

// ─── ElInput ──────────────────────────────────────────────────────
function ElInput({ placeholder, value, onChange, prefix, width = 200, style }) {
  const [focused, setFocused] = React.useState(false)
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center',
      height: 32, borderRadius: 4,
      border: `1px solid ${focused ? ADMIN.primary : ADMIN.border}`,
      background: '#fff', width, overflow: 'hidden',
      transition: 'border-color .2s',
      boxShadow: focused ? `0 0 0 2px ${ADMIN.primary}26` : 'none',
      ...style,
    }}>
      {prefix && <div style={{ padding: '0 6px 0 10px', color: ADMIN.textSecondary, flexShrink: 0, display: 'flex' }}>{prefix}</div>}
      <input
        placeholder={placeholder} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          flex: 1, border: 'none', outline: 'none', fontSize: 13,
          color: ADMIN.textPrimary, padding: prefix ? '0 10px 0 2px' : '0 10px',
          background: 'transparent',
        }}/>
    </div>
  )
}

// ─── ElSelect ─────────────────────────────────────────────────────
function ElSelect({ value, onChange, options, width = 140 }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{
      height: 32, borderRadius: 4, border: `1px solid ${ADMIN.border}`,
      padding: '0 10px', fontSize: 13, color: ADMIN.textPrimary,
      background: '#fff', cursor: 'pointer', width, outline: 'none',
    }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

// ─── DataTable ────────────────────────────────────────────────────
function DataTable({ columns, data }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: '#f5f7fa' }}>
            {columns.map((col, ci) => (
              <th key={ci} style={{
                padding: '10px 12px', textAlign: col.align || 'left',
                fontWeight: 600, color: ADMIN.textPrimary,
                borderBottom: `1px solid ${ADMIN.border}`, whiteSpace: 'nowrap',
              }}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr><td colSpan={columns.length} style={{ padding: '40px', textAlign: 'center', color: ADMIN.textSecondary }}>暂无数据</td></tr>
          )}
          {data.map((row, ri) => (
            <tr key={ri} style={{ background: '#fff', borderBottom: `1px solid ${ADMIN.borderLight}` }}
              onMouseEnter={e => e.currentTarget.style.background = ADMIN.primaryLight}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            >
              {columns.map((col, ci) => (
                <td key={ci} style={{
                  padding: '10px 12px', textAlign: col.align || 'left',
                  verticalAlign: 'middle', color: ADMIN.textRegular,
                }}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Pagination ───────────────────────────────────────────────────
function Pagination({ total, page, pageSize = 10, onPageChange, onPageSizeChange }) {
  const [jumpVal, setJumpVal] = React.useState('')
  const ps = pageSize || 10
  const pages = Math.max(1, Math.ceil(total / ps))

  function getPageNums() {
    if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1)
    const result = []
    const left = Math.max(2, page - 2)
    const right = Math.min(pages - 1, page + 2)
    result.push(1)
    if (left > 2) result.push('...')
    for (let i = left; i <= right; i++) result.push(i)
    if (right < pages - 1) result.push('...')
    result.push(pages)
    return result
  }

  function handleJump(e) {
    if (e.key === 'Enter') {
      const n = parseInt(jumpVal)
      if (!isNaN(n) && n >= 1 && n <= pages) onPageChange && onPageChange(n)
      setJumpVal('')
    }
  }

  const btnBase = { height: 28, minWidth: 28, borderRadius: 2, border: `1px solid ${ADMIN.border}`, background: '#fff', color: ADMIN.textRegular, cursor: 'pointer', fontSize: 13, padding: '0 7px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'all .12s' }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0 0', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <select value={ps} onChange={e => onPageSizeChange && onPageSizeChange(Number(e.target.value))}
          style={{ height: 28, borderRadius: 2, border: `1px solid ${ADMIN.border}`, padding: '0 24px 0 8px', fontSize: 13, color: ADMIN.textRegular, background: '#fff', cursor: 'pointer', outline: 'none', appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23909399' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat', backgroundPosition: 'right 7px center',
          }}>
          {[10, 20, 50, 100].map(n => <option key={n} value={n}>{n}条/页</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button onClick={() => page > 1 && onPageChange && onPageChange(page - 1)} disabled={page <= 1}
          style={{ ...btnBase, opacity: page <= 1 ? 0.4 : 1, cursor: page <= 1 ? 'not-allowed' : 'pointer' }}>
          <svg width="7" height="11" viewBox="0 0 7 11" fill="none"><path d="M6 1L1 5.5 6 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        {getPageNums().map((p, i) =>
          p === '...' ? (
            <span key={`e${i}`} style={{ width: 28, textAlign: 'center', fontSize: 13, color: ADMIN.textSecondary }}>…</span>
          ) : (
            <button key={p} onClick={() => onPageChange && onPageChange(p)}
              style={{ ...btnBase,
                border: `1px solid ${p === page ? ADMIN.primary : ADMIN.border}`,
                background: p === page ? ADMIN.primary : '#fff',
                color: p === page ? '#fff' : ADMIN.textRegular,
                fontWeight: p === page ? 600 : 400,
              }}
              onMouseEnter={e => { if (p !== page) { e.currentTarget.style.color = ADMIN.primary; e.currentTarget.style.borderColor = ADMIN.primary } }}
              onMouseLeave={e => { if (p !== page) { e.currentTarget.style.color = ADMIN.textRegular; e.currentTarget.style.borderColor = ADMIN.border } }}
            >{p}</button>
          )
        )}
        <button onClick={() => page < pages && onPageChange && onPageChange(page + 1)} disabled={page >= pages}
          style={{ ...btnBase, opacity: page >= pages ? 0.4 : 1, cursor: page >= pages ? 'not-allowed' : 'pointer' }}>
          <svg width="7" height="11" viewBox="0 0 7 11" fill="none"><path d="M1 1l5 4.5L1 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
      <span style={{ fontSize: 13, color: ADMIN.textSecondary, whiteSpace: 'nowrap' }}>共 {total} 条</span>
    </div>
  )
}

// ─── StatCard (PanelGroup style) ──────────────────────────────────
// Matches vue-element-plus-admin PanelGroup.vue:
//  icon LEFT (colored bg, fills solid on hover) + label/value RIGHT
function StatCard({ label, value, unit, delta, up, accentColor, icon }) {
  const [hovered, setHovered] = React.useState(false)
  const color = accentColor || ADMIN.primary
  return (
    <ElCard padding="20px">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        {/* Icon — left, colored bg */}
        <div style={{
          padding: 14, borderRadius: 6, display: 'inline-flex',
          alignItems: 'center', justifyContent: 'center',
          background: hovered ? color : (color + '1a'),
          color: hovered ? '#fff' : color,
          transition: 'all 0.38s ease-out',
          flexShrink: 0,
        }}>
          {icon}
        </div>
        {/* Value — right */}
        <div style={{ textAlign: 'right', flex: 1, paddingLeft: 8 }}>
          <div style={{ fontSize: 14, color: ADMIN.textSecondary, marginBottom: 8 }}>{label}</div>
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
    </ElCard>
  )
}

// ─── BarChart ─────────────────────────────────────────────────────
function BarChart({ data, height = 150, color }) {
  const c = color || ADMIN.primary
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
        const x = i * slot + (slot - barW) / 2
        return (
          <g key={i}>
            <rect x={x} y={H - bh} width={barW} height={bh} rx="3"
              fill={c} opacity={i === n - 1 ? 1 : 0.55}/>
            <text x={x + barW / 2} y={H + 18} textAnchor="middle" fontSize="11" fill={ADMIN.textSecondary}>{d.label}</text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── LineChart ────────────────────────────────────────────────────
function LineChart({ data, height = 150, color }) {
  const c = color || ADMIN.primary
  const max = Math.max(...data.map(d => d.v))
  const min = Math.min(...data.map(d => d.v)) * 0.88
  const W = 500, H = height, n = data.length
  const px = i => (i / (n - 1)) * (W - 40) + 20
  const py = v => H - ((v - min) / (max - min || 1)) * H * 0.82 - 8
  const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${px(i)},${py(d.v)}`).join(' ')
  const fill = `${path} L${px(n-1)},${H + 4} L${px(0)},${H + 4}Z`
  const uid = c.replace('#', '')
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

// ─── MiniDonut ────────────────────────────────────────────────────
function MiniDonut({ segments, size = 110 }) {
  const cx = size / 2, cy = size / 2, r = size * 0.33
  const C = 2 * Math.PI * r
  const total = segments.reduce((s, d) => s + d.value, 0)
  let consumed = 0
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
      {segments.map((seg, i) => {
        const len = (seg.value / total) * C
        const da = `${len} ${C - len}`
        const off = -consumed
        consumed += len
        return <circle key={i} cx={cx} cy={cy} r={r} fill="none"
          stroke={seg.color} strokeWidth={size * 0.13}
          strokeDasharray={da} strokeDashoffset={off}/>
      })}
    </svg>
  )
}

// ─── PageHeader ───────────────────────────────────────────────────
function PageHeader({ children }) {
  if (!children) return null
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>{children}</div>
    </div>
  )
}

// ─── FilterBar ────────────────────────────────────────────────────
function FilterBar({ children }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>{children}</div>
}

// ─── expose ───────────────────────────────────────────────────────
Object.assign(window, {
  ADMIN, ADMIN_NAV, AdminNavIcon,
  AdminSidebar, AdminHeader, TagsView, AdminLayout,
  ElCard, ElTag, ElButton, ElInput, ElSelect,
  DataTable, Pagination,
  StatCard, BarChart, LineChart, MiniDonut,
  PageHeader, FilterBar,
})
