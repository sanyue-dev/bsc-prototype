// ui.jsx — shared design system: theme, status bar, WeChat header, tab bar, icons, primitives

// ─── theme palettes (LIGHT) ────────────────────────────────────
const THEMES = {
  tech: { // 科技蓝 — bright primary on cool white
    name: '科技蓝',
    bg0: '#EEF2FA', bg1: '#F4F7FC', bg2: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceFlat: '#FFFFFF',
    surfaceHi: '#F8FAFE',
    surfaceTint: '#EAF0FF',     // very-light blue surface (chips, hovers)
    line: '#E5EAF3',
    lineSoft: '#EEF1F6',
    text: '#0F1B36', textMuted: '#5C6B89', textDim: '#94A0B8',
    primary: '#2E5BFF',
    primary2: '#5A7CFF',
    primaryDark: '#1E3FB8',
    glow: 'rgba(46,91,255,0.22)',
    accent: '#0099FF',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    // for "dark immersive" sub-screens (scan, charging dial)
    immerseBg: '#070D22',
    immerseSurface: 'rgba(20,30,72,0.78)',
    immerseLine: 'rgba(120,150,220,0.22)',
  },
  deep: { // 深海蓝 — slightly deeper, navy-leaning
    name: '深海蓝',
    bg0: '#EAEFF9', bg1: '#F1F5FC', bg2: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceFlat: '#FFFFFF',
    surfaceHi: '#F6F9FE',
    surfaceTint: '#E5ECFB',
    line: '#E1E7F2',
    lineSoft: '#EBEFF7',
    text: '#0A1530', textMuted: '#536183', textDim: '#8E9AB4',
    primary: '#1B4FE0',
    primary2: '#3D6CF0',
    primaryDark: '#143BAA',
    glow: 'rgba(27,79,224,0.22)',
    accent: '#2D7BFF',
    success: '#0EA471',
    warning: '#E08A00',
    danger: '#E0354B',
    immerseBg: '#04081A',
    immerseSurface: 'rgba(12,28,68,0.82)',
    immerseLine: 'rgba(100,140,200,0.22)',
  },
  electric: { // 亮电蓝 — cyan-leaning, fresh
    name: '亮电蓝',
    bg0: '#E8F4FF', bg1: '#F1F8FF', bg2: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceFlat: '#FFFFFF',
    surfaceHi: '#F4FAFF',
    surfaceTint: '#DBEEFF',
    line: '#D9E6F4',
    lineSoft: '#E8F0F9',
    text: '#0E1B33', textMuted: '#52617F', textDim: '#8D9AB3',
    primary: '#0E7CFF',
    primary2: '#3D96FF',
    primaryDark: '#0058C7',
    glow: 'rgba(14,124,255,0.25)',
    accent: '#00C8FF',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    immerseBg: '#04102A',
    immerseSurface: 'rgba(16,38,90,0.82)',
    immerseLine: 'rgba(110,200,255,0.22)',
  },
  eco: { // 草绿·环保 — single accent, black/white/gray base
    name: '环保绿',
    bg0: '#F0F5F2', bg1: '#F5F8F6', bg2: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceFlat: '#FFFFFF',
    surfaceHi: '#FAFCFA',
    surfaceTint: '#E4F1EA',
    line: '#DCE8E1',
    lineSoft: '#EBF2EE',
    text: '#111816', textMuted: '#566961', textDim: '#96A69D',
    primary: '#1A9E6E',
    primary2: '#28B47E',
    primaryDark: '#127A54',
    glow: 'rgba(26,158,110,0.15)',
    accent: '#1A9E6E',
    success: '#1A9E6E',
    warning: '#B07010',
    danger: '#C43030',
    immerseBg: '#060F0B',
    immerseSurface: 'rgba(10,36,24,0.82)',
    immerseLine: 'rgba(60,160,100,0.22)',
  },
  smartisan: { // 锤子OS风格 — Synkro蓝 + 纯白 + 深灰
    name: '锤子',
    bg0: '#EFEFEF', bg1: '#F7F7F7', bg2: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceFlat: '#F7F7F7',
    surfaceHi: '#FAFAFA',
    surfaceTint: '#EAF2FF',
    line: 'rgba(0,0,0,0.09)',
    lineSoft: 'rgba(0,0,0,0.05)',
    text: '#1A1A1A', textMuted: '#666666', textDim: '#999999',
    primary: '#4A90D9',
    primary2: '#5CA3E8',
    primaryDark: '#3070B8',
    glow: 'rgba(74,144,217,0.18)',
    accent: '#4A90D9',
    success: '#34C759',
    warning: '#FF9500',
    danger: '#FF3B30',
    immerseBg: '#1A1A1A',
    immerseSurface: 'rgba(44,44,44,0.94)',
    immerseLine: 'rgba(255,255,255,0.08)',
  },
};

// ─── status bar (microscopic WeChat style, white glyphs on dark) ───
function StatusBar({ time = '9:41', tint = '#fff' }) {
  return (
    <div style={{
      height: 44, padding: '0 22px', display: 'flex',
      alignItems: 'center', justifyContent: 'space-between',
      color: tint, fontSize: 15, fontWeight: 600,
      fontFamily: '-apple-system, "SF Pro", system-ui',
      position: 'relative', zIndex: 5,
    }}>
      <span style={{ paddingTop: 4 }}>{time}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', paddingTop: 4 }}>
        <svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="7" width="2.6" height="4" rx="0.5" fill={tint}/><rect x="4.4" y="5" width="2.6" height="6" rx="0.5" fill={tint}/><rect x="8.8" y="2.5" width="2.6" height="8.5" rx="0.5" fill={tint}/><rect x="13.2" y="0" width="2.6" height="11" rx="0.5" fill={tint}/></svg>
        <svg width="15" height="11" viewBox="0 0 15 11"><path d="M7.5 3c2 0 3.8.8 5.1 2l1-1A8 8 0 007.5 1 8 8 0 001.9 4l1 1A7 7 0 017.5 3z" fill={tint}/><circle cx="7.5" cy="9" r="1.3" fill={tint}/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke={tint} strokeOpacity="0.45" fill="none"/><rect x="2" y="2" width="18" height="8" rx="2" fill={tint}/><path d="M23 3.5v5c0.7-0.2 1.3-1 1.3-2.5s-0.6-2.3-1.3-2.5z" fill={tint} fillOpacity="0.45"/></svg>
      </div>
    </div>
  );
}

// ─── WeChat H5 header (浏览器条 + 标题 + 三点 + ×) ────────────────
function WeChatH5Header({ title, theme, onClose, onBack }) {
  return (
    <div style={{
      height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 16px', background: '#F7F8FA',
      borderBottom: `1px solid ${theme.line}`,
      color: '#1A1A1A', position: 'relative', zIndex: 5,
    }}>
      <div onClick={onBack} style={{
        width: 56, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer',
        color: '#576B95', fontSize: 14,
      }}>
        <svg width="9" height="15" viewBox="0 0 9 15"><path d="M8 1L1 7.5 8 14" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: 0.4 }}>{title}</div>
      <div style={{ width: 56, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10 }}>
        <div style={{
          width: 28, height: 18, borderRadius: 9, border: '1px solid #C8C9CC',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3,
        }}>
          <span style={{ width: 3, height: 3, borderRadius: 999, background: '#7A7B80' }}/>
          <span style={{ width: 3, height: 3, borderRadius: 999, background: '#7A7B80' }}/>
          <span style={{ width: 3, height: 3, borderRadius: 999, background: '#7A7B80' }}/>
        </div>
        <div onClick={onClose} style={{ cursor: 'pointer', color: '#7A7B80', fontSize: 20, lineHeight: 1 }}>×</div>
      </div>
    </div>
  );
}

// ─── native title bar ────────────────────────────────────────────
// tabs: [{ id, label }] — renders pill segment control in the bar
function NativeTitleBar({ title, theme, onBack, onLight = false, tabs, activeTab, onTab, right }) {
  const bg = theme.bg1;
  const tc = theme.text;
  return (
    <div style={{
      height: 44, display: 'flex', alignItems: 'center',
      padding: '0 12px', color: tc, position: 'relative', zIndex: 5,
      background: bg, flexShrink: 0,
      borderBottom: `1px solid ${theme.line}`,
    }}>
      {/* left: back button or spacer */}
      {onBack ? (
        <div onClick={onBack} style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 32, height: 32, cursor: 'pointer', color: tc, zIndex: 1,
        }}>
          <svg width="9" height="15" viewBox="0 0 9 15">
            <path d="M8 1L1 7.5 8 14" stroke="currentColor" strokeWidth="1.6" fill="none"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      ) : <div style={{ width: 32 }}/>}

      {/* pill tabs or centered title */}
      {tabs ? (
        <div style={{
          position: 'absolute', left: 0, right: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center', gap: 2,
          pointerEvents: 'none',
        }}>
          <div style={{
            display: 'flex', gap: 2,
            background: theme.bg0,
            borderRadius: 999, padding: '3px',
            border: `1px solid ${theme.line}`,
            pointerEvents: 'all',
          }}>
            {tabs.map(t => (
              <div key={t.id} onClick={() => onTab && onTab(t.id)} style={{
                padding: '3px 14px', borderRadius: 999, cursor: 'pointer',
                background: activeTab === t.id ? theme.primary : 'transparent',
                color: activeTab === t.id ? '#ffffff' : theme.textMuted,
                fontSize: 13, fontWeight: 600,
                transition: 'all .15s',
              }}>{t.label}</div>
            ))}
          </div>
        </div>
      ) : title && (
        <div style={{
          position: 'absolute', left: 0, right: 0, textAlign: 'center',
          fontSize: 17, fontWeight: 700, color: tc,
          letterSpacing: 0.2, pointerEvents: 'none',
        }}>{title}</div>
      )}

      {/* right: flex spacer or custom slot */}
      <div style={{ flex: 1 }}/>
      {right && (
        <div style={{ position: 'relative', zIndex: 1 }}>{right}</div>
      )}
      {!right && <div style={{ width: 32 }}/>}
    </div>
  );
}

// ─── kind badge: 原生 / H5 (small corner sticker) ─────────────────
function KindBadge({ kind, theme }) {
  const isNative = kind === 'native';
  return (
    <div style={{
      position: 'absolute', top: 70, right: 12, zIndex: 30,
      padding: '3px 8px', borderRadius: 6,
      fontSize: 10, fontWeight: 700, letterSpacing: 0.6,
      color: isNative ? '#fff' : theme.primary,
      background: isNative ? theme.primary : '#fff',
      border: isNative ? 'none' : `1px solid ${theme.primary}`,
      boxShadow: isNative
        ? `0 4px 10px ${theme.glow}`
        : '0 2px 6px rgba(15,27,54,0.08)',
      pointerEvents: 'none',
    }}>
      {isNative ? '原生' : 'H5'}
    </div>
  );
}

// ─── tab bar (车主端底部 · 5项) ──────────────────────────────────
function TabBar({ active, onTab, theme }) {
  const allTabs = [
    { id: 'home',    label: '首页',  icon: 'home' },
    { id: 'savings', label: '省钱',  icon: 'coupon' },
    { id: 'scan',    label: '扫一扫', icon: 'scan' },
    { id: 'shop',    label: '商城',  icon: 'shop' },
    { id: 'profile', label: '我的',  icon: 'user' },
  ];
  return (
    <div style={{
      height: 56,
      display: 'flex', alignItems: 'stretch',
      background: '#FFFFFF',
      borderTop: '1px solid rgba(0,0,0,0.09)',
    }}>
      {allTabs.map(t => {
        const on = active === t.id;
        return (
          <div key={t.id} onClick={() => onTab(t.id)} style={{
            flex: 1,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 3,
            cursor: 'pointer',
            background: 'transparent',
                        paddingBottom: 4,
          }}>
            {/* icon with blue stroke circle when active */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32 }}>
              <Icon name={t.icon} size={22} color={on ? theme.primary : '#BBBBBB'} filled={on}/>
            </div>
            <span style={{
              fontSize: 10, fontWeight: on ? 600 : 400,
              color: on ? theme.primary : '#BBBBBB',
              letterSpacing: 0.1,
            }}>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── operator tab bar ────────────────────────────────────────────
function OperatorTabBar({ active, onTab, theme }) {
  const tabs = [
    { id: 'op-dashboard', label: '看板', icon: 'chart' },
    { id: 'op-stations', label: '站点', icon: 'station' },
    { id: 'op-devices',  label: '设备', icon: 'plug' },
    { id: 'op-tickets',  label: '工单', icon: 'ticket' },
  ];
  return (
    <div style={{
      height: 56,
      display: 'flex', alignItems: 'stretch',
      background: '#FFFFFF',
      borderTop: '1px solid rgba(0,0,0,0.09)',
    }}>
      {tabs.map(t => {
        const on = active === t.id;
        return (
          <div key={t.id} onClick={() => onTab(t.id)} style={{
            flex: 1,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 3, cursor: 'pointer',
            background: 'transparent',
                        paddingBottom: 4,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32 }}>
              <Icon name={t.icon} size={22} color={on ? theme.primary : '#BBBBBB'} filled={on}/>
            </div>
            <span style={{ fontSize: 10, fontWeight: on ? 600 : 400, color: on ? theme.primary : '#BBBBBB' }}>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── icon library (line icons; filled by toggling) ───────────────
function Icon({ name, size = 20, color = 'currentColor', filled = false, glow = null }) {
  const sw = 1.8;
  const wrap = (kids) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      style={glow ? { filter: `drop-shadow(0 0 6px ${glow})` } : undefined}>
      {kids}
    </svg>
  );
  switch (name) {
    case 'bolt': return wrap(
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke={color} strokeWidth={sw}
        fill={filled ? color : 'none'} strokeLinejoin="round" strokeLinecap="round"/>
    );
    case 'pin': return wrap(
      <>
        <path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z" stroke={color} strokeWidth={sw}
          fill={filled ? color : 'none'} strokeLinejoin="round"/>
        <circle cx="12" cy="9" r="2.5" stroke={filled ? '#0B1130' : color} strokeWidth={sw} fill={filled ? '#0B1130' : 'none'}/>
      </>
    );
    case 'list': return wrap(
      <>
        <rect x="3" y="5" width="18" height="3.5" rx="1" stroke={color} strokeWidth={sw} fill={filled ? color : 'none'}/>
        <rect x="3" y="10.25" width="18" height="3.5" rx="1" stroke={color} strokeWidth={sw} fill={filled ? color : 'none'}/>
        <rect x="3" y="15.5" width="18" height="3.5" rx="1" stroke={color} strokeWidth={sw} fill={filled ? color : 'none'}/>
      </>
    );
    case 'user': return wrap(
      <>
        <circle cx="12" cy="8" r="4" stroke={color} strokeWidth={sw} fill={filled ? color : 'none'}/>
        <path d="M3.5 21c1.5-4.5 5-7 8.5-7s7 2.5 8.5 7" stroke={color} strokeWidth={sw} fill={filled ? color : 'none'} strokeLinecap="round"/>
      </>
    );
    case 'scan': return wrap(
      <>
        <path d="M4 9V5h4M20 9V5h-4M4 15v4h4M20 15v4h-4" stroke={color} strokeWidth={sw} strokeLinecap="round"/>
        <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth={sw} strokeLinecap="round"/>
      </>
    );
    case 'wallet': return wrap(
      <>
        <rect x="3" y="6" width="18" height="13" rx="2.5" stroke={color} strokeWidth={sw}/>
        <path d="M3 9h15a3 3 0 010 6H15" stroke={color} strokeWidth={sw} fill="none"/>
        <circle cx="16" cy="12" r="1.2" fill={color}/>
      </>
    );
    case 'coupon': return wrap(
      <>
        <path d="M3 7a2 2 0 012-2h14a2 2 0 012 2v3a2 2 0 100 4v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 100-4V7z"
          stroke={color} strokeWidth={sw} fill="none"/>
        <line x1="12" y1="6" x2="12" y2="18" stroke={color} strokeWidth={sw} strokeDasharray="2 2"/>
      </>
    );
    case 'bell': return wrap(
      <>
        <path d="M6 8a6 6 0 1112 0c0 5 2 6 2 8H4c0-2 2-3 2-8z" stroke={color} strokeWidth={sw} fill="none"/>
        <path d="M10 20a2 2 0 004 0" stroke={color} strokeWidth={sw} strokeLinecap="round"/>
      </>
    );
    case 'wrench': return wrap(
      <path d="M14 4a4 4 0 015 5l-9 9-4 1 1-4 9-9-2-2z" stroke={color} strokeWidth={sw} fill="none" strokeLinejoin="round"/>
    );
    case 'headset': return wrap(
      <>
        <path d="M4 13a8 8 0 1116 0v4a2 2 0 01-2 2h-2v-6h4M4 13v4a2 2 0 002 2h2v-6H4"
          stroke={color} strokeWidth={sw} fill="none" strokeLinejoin="round"/>
      </>
    );
    case 'chart': return wrap(
      <>
        <rect x="3" y="13" width="4" height="8" rx="1" stroke={color} strokeWidth={sw} fill={filled ? color : 'none'}/>
        <rect x="10" y="8" width="4" height="13" rx="1" stroke={color} strokeWidth={sw} fill={filled ? color : 'none'}/>
        <rect x="17" y="4" width="4" height="17" rx="1" stroke={color} strokeWidth={sw} fill={filled ? color : 'none'}/>
      </>
    );
    case 'station': return wrap(
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" stroke={color} strokeWidth={sw} fill={filled ? color : 'none'}/>
        <rect x="8" y="6" width="8" height="5" rx="1" stroke={filled ? '#0B1130' : color} strokeWidth={sw} fill="none"/>
        <path d="M10 14h4M10 17h4" stroke={filled ? '#0B1130' : color} strokeWidth={sw} strokeLinecap="round"/>
      </>
    );
    case 'plug': return wrap(
      <>
        <path d="M9 2v4M15 2v4" stroke={color} strokeWidth={sw} strokeLinecap="round"/>
        <rect x="6" y="6" width="12" height="7" rx="2" stroke={color} strokeWidth={sw} fill={filled ? color : 'none'}/>
        <path d="M12 13v4a3 3 0 003 3" stroke={filled ? '#0B1130' : color} strokeWidth={sw} strokeLinecap="round" fill="none"/>
      </>
    );
    case 'ticket': return wrap(
      <>
        <path d="M3 8a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 100-4V8z"
          stroke={color} strokeWidth={sw} fill={filled ? color : 'none'}/>
        <path d="M9 9l6 6M9 15l6-6" stroke={filled ? '#0B1130' : color} strokeWidth={sw} strokeLinecap="round"/>
      </>
    );
    case 'gear': return wrap(
      <>
        <circle cx="12" cy="12" r="3" stroke={color} strokeWidth={sw} fill="none"/>
        <path d="M19 12a7 7 0 00-.2-1.7l2-1.5-2-3.5-2.4 1a7 7 0 00-3-1.7L13 2h-4l-.4 2.6a7 7 0 00-3 1.7l-2.4-1-2 3.5 2 1.5A7 7 0 005 12c0 .6.1 1.1.2 1.7l-2 1.5 2 3.5 2.4-1c.9.8 1.9 1.4 3 1.7L11 22h4l.4-2.6c1.1-.3 2.1-.9 3-1.7l2.4 1 2-3.5-2-1.5c.1-.6.2-1.1.2-1.7z"
          stroke={color} strokeWidth={sw} fill="none" strokeLinejoin="round"/>
      </>
    );
    case 'check': return wrap(
      <path d="M5 12l4.5 4.5L19 7" stroke={color} strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    );
    case 'right': return wrap(
      <path d="M9 5l7 7-7 7" stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    );
    case 'search': return wrap(
      <>
        <circle cx="11" cy="11" r="6" stroke={color} strokeWidth={sw}/>
        <line x1="16" y1="16" x2="21" y2="21" stroke={color} strokeWidth={sw} strokeLinecap="round"/>
      </>
    );
    case 'filter': return wrap(
      <path d="M3 5h18l-7 9v6l-4-2v-4L3 5z" stroke={color} strokeWidth={sw} fill="none" strokeLinejoin="round"/>
    );
    case 'phone': return wrap(
      <path d="M5 4h3l2 5-3 2c1 3 3 5 6 6l2-3 5 2v3a2 2 0 01-2 2A14 14 0 013 6a2 2 0 012-2z"
        stroke={color} strokeWidth={sw} fill="none" strokeLinejoin="round"/>
    );
    case 'arrow-up': return wrap(
      <path d="M12 19V5M5 12l7-7 7 7" stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    );
    case 'plus': return wrap(
      <>
        <line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth={sw} strokeLinecap="round"/>
        <line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth={sw} strokeLinecap="round"/>
      </>
    );
    case 'flash': return wrap(
      <path d="M11 2L4 13h6l-1 9 9-13h-6l1-7z" stroke={color} strokeWidth={sw} fill={filled ? color : 'none'} strokeLinejoin="round"/>
    );
    case 'clock': return wrap(
      <>
        <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={sw}/>
        <path d="M12 7v5l3 2" stroke={color} strokeWidth={sw} strokeLinecap="round"/>
      </>
    );
    case 'coin': return wrap(
      <>
        <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={sw}/>
        <path d="M12 7v10M9.5 10.5h5M9.5 13.5h5" stroke={color} strokeWidth={sw} strokeLinecap="round"/>
      </>
    );
    case 'shield': return wrap(
      <path d="M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-3z" stroke={color} strokeWidth={sw} fill="none" strokeLinejoin="round"/>
    );
    case 'qr': return wrap(
      <>
        <rect x="4" y="4" width="6" height="6" stroke={color} strokeWidth={sw} fill="none"/>
        <rect x="14" y="4" width="6" height="6" stroke={color} strokeWidth={sw} fill="none"/>
        <rect x="4" y="14" width="6" height="6" stroke={color} strokeWidth={sw} fill="none"/>
        <path d="M14 14h2v2M18 14v2M14 18h2M18 18v2" stroke={color} strokeWidth={sw} strokeLinecap="round"/>
      </>
    );
    case 'message': return wrap(
      <path d="M4 5h16v11H8l-4 4V5z" stroke={color} strokeWidth={sw} fill={filled ? color : 'none'} strokeLinejoin="round"/>
    );
    case 'play': return wrap(
      <path d="M7 4l13 8-13 8V4z" fill={color}/>
    );
    case 'stop': return wrap(
      <rect x="5" y="5" width="14" height="14" rx="2" fill={color}/>
    );
    case 'pause': return wrap(
      <>
        <rect x="6" y="4" width="4" height="16" rx="1.5" fill={color}/>
        <rect x="14" y="4" width="4" height="16" rx="1.5" fill={color}/>
      </>
    );
    case 'minus': return wrap(<line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth={sw} strokeLinecap="round"/>);
    case 'warn': return wrap(
      <>
        <path d="M12 3l10 17H2L12 3z" stroke={color} strokeWidth={sw} fill={filled ? color : 'none'} strokeLinejoin="round"/>
        <line x1="12" y1="10" x2="12" y2="14" stroke={filled ? '#0B1130' : color} strokeWidth={sw} strokeLinecap="round"/>
        <circle cx="12" cy="17" r="1" fill={filled ? '#0B1130' : color}/>
      </>
    );
    case 'info': return wrap(
      <>
        <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={sw}/>
        <line x1="12" y1="11" x2="12" y2="16" stroke={color} strokeWidth={sw} strokeLinecap="round"/>
        <circle cx="12" cy="8" r="1" fill={color}/>
      </>
    );
    case 'cam': return wrap(
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" stroke={color} strokeWidth={sw}/>
        <path d="M9 7l2-3h2l2 3" stroke={color} strokeWidth={sw} fill="none"/>
        <circle cx="12" cy="13" r="3.5" stroke={color} strokeWidth={sw}/>
      </>
    );
    case 'gallery': return wrap(
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" stroke={color} strokeWidth={sw}/>
        <circle cx="8" cy="10" r="1.5" fill={color}/>
        <path d="M5 18l5-5 4 4 3-3 4 4" stroke={color} strokeWidth={sw} fill="none" strokeLinejoin="round"/>
      </>
    );
    case 'home': return wrap(
      <>
        <path d="M3 11.5L12 4l9 7.5" stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 10v11h5v-5h4v5h5V10" fill={filled ? color : 'none'} stroke={color} strokeWidth={sw} strokeLinejoin="round"/>
      </>
    );
    case 'shop': return wrap(
      <>
        <rect x="3" y="7" width="18" height="14" rx="2" fill={filled ? color : 'none'} stroke={color} strokeWidth={sw}/>
        <path d="M8 7V5a4 4 0 018 0v2" stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round"/>
      </>
    );
    default: return null;
  }
}

// ─── primitive: button ───────────────────────────────────────────
function Button({ children, kind = 'primary', theme, onClick, full, style, disabled }) {
  const base = {
    height: 46, padding: '0 22px', borderRadius: 8,
    fontSize: 15, fontWeight: 600, letterSpacing: 0.3,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'transform .1s ease',
    width: full ? '100%' : undefined,
    opacity: disabled ? 0.45 : 1,
  };
  const styles = {
    primary: {
      ...base,
      color: '#fff',
      background: theme.primary,
      boxShadow: 'none',
    },
    ghost: {
      ...base,
      color: theme.text,
      background: theme.surface,
      border: `1px solid ${theme.line}`,
      boxShadow: 'none',
    },
    accent: {
      ...base,
      color: '#fff',
      background: theme.accent,
      boxShadow: 'none',
    },
    danger: {
      ...base,
      color: '#fff',
      background: theme.danger,
      boxShadow: 'none',
    },
  };
  return <button onClick={onClick} disabled={disabled} style={{ ...styles[kind], ...style }}>{children}</button>;
}

// ─── card ────────────────────────────────────────────────────────
function Card({ children, theme, style, padded = true, glow = false, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: theme.surface,
      border: `1px solid ${theme.line}`,
      borderRadius: 10,
      padding: padded ? 16 : 0,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── stat / value ────────────────────────────────────────────────
function Stat({ label, value, unit, theme, accent = false, big = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontSize: 11, color: theme.textMuted, letterSpacing: 0.3 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
        <span className="mono" style={{
          fontSize: big ? 34 : 22, fontWeight: 700,
          color: accent ? theme.primary : theme.text,
          lineHeight: 1,
        }}>{value}</span>
        {unit && <span style={{ fontSize: 12, color: theme.textMuted }}>{unit}</span>}
      </div>
    </div>
  );
}

// ─── section header inside a screen ──────────────────────────────
function SectionTitle({ children, theme, right }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '16px 18px 8px',
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: theme.text, letterSpacing: 0 }}>{children}</div>
      {right && <div style={{ fontSize: 12, color: theme.textMuted }}>{right}</div>}
    </div>
  );
}

// ─── grid / line backgrounds for hero areas ──────────────────────
// Set `tinted` for a colored blue hero (text needs to be white on top)
function GridBg({ theme, height = 200, children, style, tinted = false }) {
  if (tinted) {
    return (
      <div style={{
        position: 'relative', height, overflow: 'hidden',
        background: theme.primary,
        ...style,
      }}>
        <div style={{ position: 'relative' }}>{children}</div>
      </div>
    );
  }
  return (
    <div style={{
      position: 'relative', height, overflow: 'hidden',
      background: theme.bg0,
      ...style,
    }}>
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
}

// ─── shared body wrapper (handles bg + flex) ─────────────────────
function ScreenBody({ children, theme, style }) {
  return (
    <div style={{
      flex: 1, overflowY: 'auto', overflowX: 'hidden',
      background: theme.bg1,
      ...style,
    }} className="noscroll">
      {children}
    </div>
  );
}

// expose
Object.assign(window, {
  THEMES, StatusBar, WeChatH5Header, NativeTitleBar, KindBadge,
  TabBar, OperatorTabBar, Icon, Button, Card, Stat,
  SectionTitle, GridBg, ScreenBody,
});
