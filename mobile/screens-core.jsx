// screens-core.jsx — 车主端核心 5 屏
//   HomeScreen   (原生)  首页
//   ScanScreen   (原生)  扫一扫
//   MapScreen    (原生)  地图找站点
//   StationScreen        站点详情 (H5)
//   PricingScreen        计费规则 (H5)

// ─── BannerCarousel ─────────────────────────────────────────────
function BannerCarousel({ theme }) {
  const BANNERS = [
    { dark: true,  tag: '限时活动', title: '充值立享好礼',   sub: '充 50 元送 5 元赠送金额',  cta: '了解' },
    { dark: false, tag: '月卡特惠', title: '畅充无忧月卡',   sub: '全网通用 · 仅 ¥15/月',     cta: '立即购买' },
    { dark: false, tag: '新站开业', title: '蓝桥科技园新站', sub: '已上线 16 个桩位',          cta: '查看' },
  ];
  const [idx, setIdx] = React.useState(0);
  const stripRef = React.useRef(null);

  const handleScroll = () => {
    const el = stripRef.current;
    if (!el) return;
    setIdx(Math.round(el.scrollLeft / el.offsetWidth));
  };

  const goTo = (i) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.offsetWidth, behavior: 'smooth' });
  };

  return (
    <div style={{ padding: '0 16px 4px' }}>
      {/* swipeable strip */}
      <div
        ref={stripRef}
        onScroll={handleScroll}
        className="noscroll"
        style={{
          display: 'flex',
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          borderRadius: 12,
        }}
      >
        {BANNERS.map((b, i) => {
          const bg       = b.dark ? '#1A1A1A' : '#FFFFFF';
          const tc       = b.dark ? '#FFFFFF' : '#1A1A1A';
          const tagBg    = b.dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)';
          const tagColor = b.dark ? 'rgba(255,255,255,0.55)' : '#999999';
          const subColor = b.dark ? 'rgba(255,255,255,0.45)' : theme.textMuted;
          return (
            <div key={i} style={{
              minWidth: '100%', height: 110, flexShrink: 0,
              scrollSnapAlign: 'start',
              background: bg,
              border: b.dark ? 'none' : `1px solid ${theme.line}`,
              padding: '14px 18px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              boxSizing: 'border-box',
            }}>
              <span style={{
                fontSize: 10, fontWeight: 600, letterSpacing: 0.8,
                color: tagColor, background: tagBg,
                borderRadius: 3, padding: '2px 6px', alignSelf: 'flex-start',
              }}>{b.tag}</span>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: tc, letterSpacing: -0.3, lineHeight: 1.2 }}>{b.title}</div>
                <div style={{ fontSize: 11, color: subColor, marginTop: 2 }}>{b.sub}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: theme.primary, letterSpacing: 0.3 }}>{b.cta} →</span>
              </div>
            </div>
          );
        })}
      </div>
      {/* dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 8 }}>
        {BANNERS.map((_, i) => (
          <div key={i} onClick={() => goTo(i)} style={{
            height: 4, borderRadius: 999, cursor: 'pointer',
            width: i === idx ? 18 : 4,
            background: i === idx ? theme.primary : `${theme.primary}44`,
            transition: 'all 0.3s ease',
          }}/>
        ))}
      </div>
    </div>
  );
}

// ─── HomeScreen (原生) ────────────────────────────────────────────
function HomeScreen({ theme, nav }) {
  return (
    <>
      <NativeTitleBar title="蓝鲨充电" theme={theme}/>
      <ScreenBody theme={theme}>
        {/* quick actions */}
        <div style={{ padding: '6px 16px 4px' }}>
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { id: 'coupons', icon: 'coupon', label: '优惠券' },
              { id: 'fault',   icon: 'wrench', label: '报修' },
              { id: 'service', icon: 'headset', label: '客服' },
            ].map(q => (
              <div key={q.id} onClick={() => nav(q.id)} style={{
                flex: 1, height: 64,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 5, cursor: 'pointer',
              }}>
                <Icon name={q.icon} size={22} color={theme.text}/>
                <span style={{ fontSize: 11, color: theme.textMuted }}>{q.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* banner carousel */}
        <BannerCarousel theme={theme} />

        {/* search bar — sticky below logo bar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 10,
          background: theme.bg1,
          padding: '8px 16px 10px',
        }}>
          <div onClick={() => nav('map')} style={{
            height: 44, borderRadius: 999, padding: '0 16px',
            display: 'flex', alignItems: 'center', gap: 10,
            background: theme.surface,
            border: `1px solid ${theme.line}`,
            cursor: 'text',
          }}>
            <Icon name="search" size={16} color={theme.textMuted}/>
            <span style={{ flex: 1, fontSize: 14, color: theme.textDim }}>搜索充电站、地址</span>
          </div>
        </div>

        {/* nearby */}
        <SectionTitle theme={theme} right={<span onClick={() => nav('map')} style={{ cursor: 'pointer', color: theme.primary }}>查看地图 →</span>}>附近站点</SectionTitle>
        <div style={{ padding: '0 16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {NEARBY_STATIONS.map((s, i) => (
            <React.Fragment key={s.id}>
              <div onClick={() => nav('station', { stationId: s.id })}>
                <StationCard station={s} theme={theme}/>
              </div>
              {i === 2 && <AdCard theme={theme}/>}
            </React.Fragment>
          ))}
        </div>

        {/* ongoing session */}
        <SectionTitle theme={theme}>当前充电</SectionTitle>
        <div style={{ padding: '0 16px 24px' }}>
          <Card theme={theme} style={{
            background: '#F0FBF5',
            border: `1px solid ${theme.success}55`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: theme.success }} className="blink"/>
                  <span style={{ fontSize: 13, color: theme.success, fontWeight: 700, letterSpacing: 0.5 }}>充电中 · 桩号 A-03</span>
                </div>
                <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 4 }}>金牛苑车棚 · 已充 38 分钟</div>
                <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: theme.text, marginTop: 8 }}>
                  ¥1.20 <span style={{ fontSize: 11, color: theme.textMuted, fontWeight: 400 }}>已消费</span>
                </div>
              </div>
              <Button kind="ghost" theme={theme} onClick={() => nav('charging')}>查看</Button>
            </div>
          </Card>
        </div>
      </ScreenBody>
      <TabBar active="home" onTab={nav} theme={theme}/>
    </>
  );
}

// helper: nearby station data
const NEARBY_STATIONS = [
  { id: 'st-1', name: '金牛苑南门车棚',    dist: '128m',  free: 4, total: 12, hours: '06:00–23:00', price: '起¥0.40/h', tag: '推荐', img: 'A' },
  { id: 'st-2', name: '蓝桥科技园 B 座',   dist: '432m',  free: 2, total: 16, hours: '24小时',       price: '起¥0.40/h', tag: '雨棚', img: 'B' },
  { id: 'st-3', name: '滨河新村东区',       dist: '780m',  free: 0, total: 8,  hours: '06:00–22:30', price: '起¥0.40/h', tag: '已满', img: 'C' },
  { id: 'st-4', name: '天府大道北段车棚',   dist: '1.1km', free: 6, total: 20, hours: '24小时',       price: '起¥0.40/h', tag: null,   img: 'D' },
  { id: 'st-5', name: '桂溪生态公园西门',   dist: '1.4km', free: 3, total: 10, hours: '07:00–22:00', price: '起¥0.40/h', tag: null,   img: 'E' },
  { id: 'st-6', name: '高新万象城地下车棚', dist: '1.8km', free: 9, total: 24, hours: '24小时',       price: '起¥0.40/h', tag: null,   img: 'F' },
  { id: 'st-7', name: '锦城绿道驿站 C区',   dist: '2.2km', free: 1, total: 6,  hours: '06:00–23:00', price: '起¥0.40/h', tag: null,   img: 'G' },
];

function StationCard({ station, theme }) {
  const full = station.free === 0;
  const ratio = station.free / station.total;
  const statusColor = full ? theme.danger : ratio >= 0.35 ? theme.success : theme.warning;

  // tag appearance
  const tagStyle = (tag) => {
    if (tag === '已满') return { bg: `${theme.danger}14`, color: theme.danger, border: `${theme.danger}30` };
    if (tag === '雨棚') return { bg: `${theme.primary}12`, color: theme.primary, border: `${theme.primary}30` };
    return { bg: `${theme.success}12`, color: theme.success, border: `${theme.success}30` };
  };

  return (
    <div style={{
      background: theme.surface,
      border: `1px solid ${theme.line}`,
      borderRadius: 14,
      padding: '14px 16px',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      gap: 11,
    }}>

      {/* ── Row 1: name + tag  ·  distance ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* name + inline tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'nowrap' }}>
            {station.tag && (() => {
              const ts = tagStyle(station.tag);
              return (
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '2px 6px',
                  borderRadius: 4, flexShrink: 0, letterSpacing: 0.3,
                  background: ts.bg, color: ts.color,
                  border: `1px solid ${ts.border}`,
                }}>{station.tag}</span>
              );
            })()}
            <span style={{
              fontSize: 15, fontWeight: 600, color: theme.text,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              letterSpacing: 0.1,
            }}>{station.name}</span>
          </div>

          {/* meta: hours · price */}
          <div style={{
            marginTop: 5, display: 'flex', gap: 5, alignItems: 'center',
            fontSize: 11, color: theme.textMuted,
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, opacity: 0.55 }}>
              <circle cx="12" cy="12" r="9" stroke={theme.textDim} strokeWidth="1.8"/>
              <path d="M12 7v5l3 2" stroke={theme.textDim} strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span>{station.hours}</span>
            <span style={{ opacity: 0.3 }}>·</span>
            <span className="mono">{station.price}</span>
          </div>
        </div>

        {/* distance pill */}
        <div style={{
          flexShrink: 0, display: 'flex', alignItems: 'center', gap: 3,
          paddingTop: 2,
        }}>
          <svg width="10" height="12" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.45 }}>
            <path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z" stroke={theme.textDim} strokeWidth="1.8"/>
            <circle cx="12" cy="9" r="2.5" stroke={theme.textDim} strokeWidth="1.8"/>
          </svg>
          <span className="mono" style={{ fontSize: 12, color: theme.textDim, fontWeight: 500 }}>{station.dist}</span>
        </div>
      </div>

      {/* ── Row 2: status pill + bar + chevron ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>

        {/* status pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5, flexShrink: 0,
          padding: '4px 9px 4px 7px', borderRadius: 999,
          background: `${statusColor}13`,
          border: `1px solid ${statusColor}28`,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: 999,
            background: statusColor, flexShrink: 0,
          }}/>
          <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: statusColor }}>
            {full ? '已满' : `${station.free} 空闲`}
          </span>
          <span style={{ fontSize: 11, color: theme.textDim }}>/{station.total}</span>
        </div>

        {/* segmented availability bar */}
        <div style={{
          flex: 1,
          display: 'flex', gap: 2, alignItems: 'center',
          height: 7,
        }}>
          {Array.from({ length: Math.min(station.total, 16) }).map((_, i) => {
            // if >16 slots, show proportional fill instead of individual dots
            const segments = Math.min(station.total, 16);
            const filledCount = Math.round((station.free / station.total) * segments);
            const isFilled = i < filledCount;
            return (
              <div key={i} style={{
                flex: 1, height: '100%',
                borderRadius: 2,
                background: isFilled ? statusColor : theme.bg0,
                opacity: isFilled ? 1 : 1,
              }}/>
            );
          })}
        </div>

        {/* chevron */}
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" style={{ flexShrink: 0, opacity: 0.3 }}>
          <path d="M1 1l4 4-4 4" stroke={theme.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

    </div>
  );
}

// ─── ScanScreen (原生) ────────────────────────────────────────────
function ScanScreen({ theme, nav }) {
  return (
    <div style={{
      flex: 1, position: 'relative',
      background: theme.bg1, color: theme.text, overflow: 'hidden',
    }}>
      {/* stylized light "viewfinder" backdrop */}
      <div style={{
        position: 'absolute', inset: 0,
        background: theme.bg0,
      }}>
        {/* faint silhouette of charging post */}
        <svg viewBox="0 0 360 600" width="100%" height="100%" style={{ opacity: 0.35 }}>
          <rect x="148" y="170" width="64" height="260" rx="8" fill="#C9D2E2" stroke="#B3BFD3" strokeWidth="1"/>
          <rect x="158" y="190" width="44" height="60" rx="4" fill="#FFFFFF" stroke="#B3BFD3" strokeWidth="1"/>
          <rect x="166" y="200" width="28" height="14" rx="2" fill="#E1E7F2"/>
          <rect x="166" y="220" width="28" height="14" rx="2" fill="#E1E7F2"/>
          <circle cx="180" cy="290" r="9" fill="#B3BFD3"/>
          <circle cx="180" cy="290" r="4" fill="#FFFFFF"/>
          <rect x="170" y="420" width="20" height="60" fill="#B3BFD3" rx="2"/>
        </svg>
        {/* soft grid */}
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
          <defs>
            <pattern id="scanGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="#D7DEE9" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#scanGrid)"/>
        </svg>
      </div>

      {/* native title bar overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 5 }}>
        <NativeTitleBar title="扫一扫" theme={theme} onBack={() => nav('home')}/>
      </div>

      {/* scan window */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -54%)',
        width: 256, height: 256,
      }}>
        {/* very subtle inner highlight (no dark mask in light mode) */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 8,
          background: 'rgba(255,255,255,0.30)',
          border: `1px dashed ${theme.primary}55`,
          pointerEvents: 'none',
        }}/>
        {/* corner brackets */}
        {[
          { top: 0, left: 0, br: '4px 0 0 0', borderL: 1, borderT: 1 },
          { top: 0, right: 0, br: '0 4px 0 0', borderR: 1, borderT: 1 },
          { bottom: 0, left: 0, br: '0 0 0 4px', borderL: 1, borderB: 1 },
          { bottom: 0, right: 0, br: '0 0 4px 0', borderR: 1, borderB: 1 },
        ].map((b, i) => (
          <div key={i} style={{
            position: 'absolute', width: 32, height: 32,
            top: b.top, left: b.left, right: b.right, bottom: b.bottom,
            borderTop: b.borderT ? `3px solid ${theme.primary}` : 'none',
            borderBottom: b.borderB ? `3px solid ${theme.primary}` : 'none',
            borderLeft: b.borderL ? `3px solid ${theme.primary}` : 'none',
            borderRight: b.borderR ? `3px solid ${theme.primary}` : 'none',
            borderRadius: b.br,
          }}/>
        ))}
        {/* sweeping scan line */}
        <div style={{
          position: 'absolute', inset: 4, overflow: 'hidden', borderRadius: 4,
        }}>
          <div style={{
            position: 'absolute', left: 0, right: 0, height: 80,
            background: `linear-gradient(180deg, transparent, ${theme.primary}66 45%, ${theme.primary} 50%, ${theme.primary}66 55%, transparent)`,
            animation: 'scanLine 2.4s ease-in-out infinite',
          }}/>
        </div>
      </div>

      {/* helper text */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 'calc(50% + 164px)',
        textAlign: 'center', color: theme.text, fontSize: 13, letterSpacing: 0.4, fontWeight: 500,
      }}>
        将充电柜二维码 / 桩号置于框内
      </div>

      {/* tip card */}
      <div style={{
        position: 'absolute', left: 16, right: 16, top: 'calc(50% + 195px)',
        padding: '12px 14px', borderRadius: 14,
        background: '#fff', border: `1px solid ${theme.line}`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <Icon name="info" size={16} color={theme.primary}/>
        <div style={{ flex: 1, fontSize: 12, color: theme.textMuted, lineHeight: 1.5 }}>
          请勿在充电过程中扫描，先停止当前充电
        </div>
      </div>

      {/* bottom actions */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 28,
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      }}>
        <ActionPill icon="gallery" label="相册" theme={theme}/>
        <ActionPill icon="qr" label="我的码" theme={theme}/>
        <ActionPill icon="plus" label="手输桩号" theme={theme} onClick={() => nav('station', { stationId: 'st-1' })}/>
      </div>
    </div>
  );
}

function ActionPill({ icon, label, theme, onClick }) {
  return (
    <div onClick={onClick} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer',
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 999,
        background: '#fff', border: `1px solid ${theme.line}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name={icon} size={22} color={theme.primary}/>
      </div>
      <span style={{ fontSize: 11, color: theme.textMuted }}>{label}</span>
    </div>
  );
}

// ─── MapScreen (原生) ─────────────────────────────────────────────
function MapScreen({ theme, nav }) {
  const [selected, setSelected] = React.useState('st-1');
  const station = NEARBY_STATIONS.find(s => s.id === selected) || NEARBY_STATIONS[0];
  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      {/* fake dark-mode map */}
      <MapBg theme={theme}/>

      {/* native title overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 5 }}>
        <NativeTitleBar title="附近站点" theme={theme} onBack={() => nav('home')}/>
      </div>

      {/* search bar */}
      <div style={{ position: 'absolute', top: 56, left: 16, right: 16, zIndex: 5 }}>
        <div style={{
          height: 40, borderRadius: 999, padding: '0 14px',
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#fff',
          border: `1px solid ${theme.line}`,
          }}>  
          <Icon name="search" size={16} color={theme.textMuted}/>
          <input placeholder="搜索站点名称、地址" style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: theme.text, fontSize: 13,
          }}/>
          <Icon name="filter" size={16} color={theme.textMuted}/>
        </div>
      </div>

      {/* filter chips */}
      <div style={{ position: 'absolute', top: 108, left: 16, right: 16, zIndex: 5, display: 'flex', gap: 6, overflowX: 'auto' }} className="noscroll">
        {['全部', '空闲优先', '24小时', '高速', '价低', '雨棚'].map((f, i) => (
          <span key={f} className="chip" style={{
            whiteSpace: 'nowrap',
            background: i === 1 ? theme.primary : '#fff',
            borderColor: i === 1 ? theme.primary : theme.line,
            color: i === 1 ? '#fff' : theme.text,
            
            fontWeight: i === 1 ? 700 : 500,
          }}>{f}</span>
        ))}
      </div>

      {/* pins */}
      {[
        { id: 'st-1', x: '38%', y: '38%', n: 4, total: 12 },
        { id: 'st-2', x: '62%', y: '52%', n: 2, total: 16 },
        { id: 'st-3', x: '28%', y: '64%', n: 0, total: 8 },
        { id: 'st-4', x: '72%', y: '32%', n: 7, total: 10 },
      ].map(p => {
        const on = selected === p.id;
        const full = p.n === 0;
        return (
          <div key={p.id} onClick={() => setSelected(p.id)} style={{
            position: 'absolute', left: p.x, top: p.y,
            transform: 'translate(-50%, -100%)', cursor: 'pointer',
            zIndex: on ? 6 : 4,
          }}>
            <div style={{
              padding: '6px 10px', borderRadius: 999,
              background: full ? theme.danger : (on ? theme.primary : '#fff'),
              border: `2px solid ${on ? '#fff' : (full ? '#fff' : theme.primary)}`,
              
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 12, fontWeight: 700, color: (on || full) ? '#fff' : theme.primary,
            }}>
              <Icon name="bolt" size={12} color={(on || full) ? '#fff' : theme.primary} filled/>
              <span className="mono">{p.n}<span style={{ opacity: 0.55, fontWeight: 400 }}>/{p.total}</span></span>
            </div>
            {/* triangle */}
            <div style={{
              width: 0, height: 0, margin: '0 auto',
              borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
              borderTop: `8px solid ${full ? theme.danger : (on ? theme.primary : '#fff')}`,
              
            }}/>
          </div>
        );
      })}

      {/* "me" dot */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)', zIndex: 3,
      }}>
        <div style={{
          width: 14, height: 14, borderRadius: 999,
          background: theme.primary, border: '3px solid #fff',
        }}/>  
      </div>

      {/* recenter button */}
      <div style={{
        position: 'absolute', right: 16, bottom: 220, zIndex: 5,
        width: 42, height: 42, borderRadius: 999,
        background: '#fff',
        border: `1px solid ${theme.line}`,
        
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" stroke={theme.primary} strokeWidth="2" fill={theme.primary}/><circle cx="12" cy="12" r="8" stroke={theme.primary} strokeWidth="1.5" fill="none"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke={theme.primary} strokeWidth="1.5" strokeLinecap="round"/></svg>
      </div>

      {/* bottom station card */}
      <div style={{
        position: 'absolute', left: 12, right: 12, bottom: 28, zIndex: 7,
      }}>
        <Card theme={theme} glow>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: theme.text }}>{station.name}</span>
                <span className="chip" style={{ color: theme.primary, borderColor: `${theme.primary}55`, background: theme.surfaceTint }}>推荐</span>
              </div>
              <div style={{ marginTop: 6, fontSize: 12, color: theme.textMuted, display: 'flex', gap: 10 }}>
                <span><span className="mono" style={{ color: theme.primary, fontWeight: 700 }}>{station.free}</span>/{station.total} 空闲</span>
                <span>·</span>
                <span className="mono">{station.dist}</span>
                <span>·</span>
                <span>步行 2 分钟</span>
              </div>
              <div style={{ marginTop: 8, fontSize: 11, color: theme.textMuted }}>
                按功率计费 <span className="mono" style={{ color: theme.text }}>¥0.60/度</span>
              </div>
            </div>
            <div style={{ width: 42, height: 42, borderRadius: 999, background: theme.surfaceTint, border: `1px solid ${theme.primary}55`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="pin" size={20} color={theme.primary} filled/>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <Button kind="ghost" theme={theme} style={{ flex: 1 }}>导航</Button>
            <Button kind="primary" theme={theme} style={{ flex: 1 }} onClick={() => nav('station', { stationId: station.id })}>查看详情</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function MapBg({ theme }) {
  // stylized light map
  return (
    <svg viewBox="0 0 360 720" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <linearGradient id="mapBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EEF2F8"/>
          <stop offset="100%" stopColor="#E3E9F2"/>
        </linearGradient>
      </defs>
      <rect width="360" height="720" fill="url(#mapBg)"/>
      {/* blocks (buildings) */}
      {[
        [20, 100, 90, 80], [120, 80, 110, 70], [240, 110, 100, 90],
        [10, 220, 70, 140], [90, 240, 130, 110], [230, 220, 120, 70],
        [10, 400, 100, 100], [120, 380, 120, 130], [250, 400, 100, 110],
        [10, 540, 130, 80], [150, 540, 90, 100], [250, 560, 100, 80],
      ].map((b, i) => (
        <rect key={i} x={b[0]} y={b[1]} width={b[2]} height={b[3]}
          fill="#FFFFFF" stroke="#D7DEE9" strokeWidth="0.5" rx="4"/>
      ))}
      {/* roads */}
      <g stroke="#FFFFFF" strokeWidth="14">
        <line x1="0" y1="200" x2="360" y2="200"/>
        <line x1="0" y1="370" x2="360" y2="370"/>
        <line x1="0" y1="520" x2="360" y2="520"/>
        <line x1="100" y1="0" x2="100" y2="720"/>
        <line x1="230" y1="0" x2="230" y2="720"/>
      </g>
      <g stroke="#E8EDF5" strokeWidth="15">
        <line x1="0" y1="200" x2="360" y2="200"/>
        <line x1="0" y1="370" x2="360" y2="370"/>
        <line x1="0" y1="520" x2="360" y2="520"/>
        <line x1="100" y1="0" x2="100" y2="720"/>
        <line x1="230" y1="0" x2="230" y2="720"/>
      </g>
      <g stroke="#FFFFFF" strokeWidth="12">
        <line x1="0" y1="200" x2="360" y2="200"/>
        <line x1="0" y1="370" x2="360" y2="370"/>
        <line x1="0" y1="520" x2="360" y2="520"/>
        <line x1="100" y1="0" x2="100" y2="720"/>
        <line x1="230" y1="0" x2="230" y2="720"/>
      </g>
      {/* dashed accent path */}
      <path d="M180 720 C180 600 100 500 180 360 C260 240 180 120 180 0"
        stroke={theme.primary} strokeWidth="2" strokeOpacity="0.45" fill="none" strokeDasharray="4 5"/>
    </svg>
  );
}

// ─── StationScreen (H5) ───────────────────────────────────────────
function StationScreen({ theme, nav }) {
  const SLOT_STATES = ['free','charging','free','free','charging','fault','free','charging','charging','charging','charging','charging'];

  return (
    <>
      <NativeTitleBar title="站点详情" theme={theme} onBack={() => nav('home')}/>
      <ScreenBody theme={theme}>

        {/* ── hero: name + tags + stats ── */}
        <div style={{ background: theme.bg0, borderBottom: `1px solid ${theme.line}`, padding: '16px 16px 18px' }}>
          {/* name row */}
          <div style={{ fontSize: 20, fontWeight: 800, color: theme.text, letterSpacing: -0.2, lineHeight: 1.25 }}>
            金牛苑南门车棚
          </div>
          {/* address */}
          <div style={{ marginTop: 5, display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: theme.textMuted }}>
            <svg width="10" height="12" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z" stroke={theme.textDim} strokeWidth="1.8"/>
              <circle cx="12" cy="9" r="2.5" stroke={theme.textDim} strokeWidth="1.8"/>
            </svg>
            金牛苑社区南门内
            <span style={{ opacity: 0.35 }}>·</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="9" stroke={theme.textDim} strokeWidth="1.8"/>
              <path d="M12 7v5l3 2" stroke={theme.textDim} strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            06:00 – 23:00
          </div>
          {/* tag chips */}
          <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
            <span className="chip" style={{ background: `${theme.success}18`, color: theme.success, borderColor: `${theme.success}44`, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: 999, background: theme.success, flexShrink: 0 }} className="blink"/>
              营业中
            </span>
            <span className="chip">有雨棚</span>
            <span className="chip">自动断电</span>
          </div>
          {/* stats row */}
          <div style={{
            marginTop: 16,
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            background: theme.surface,
            border: `1px solid ${theme.line}`,
            borderRadius: 10,
            overflow: 'hidden',
          }}>
            {[
              { label: '空闲桩位', value: '4', unit: '/12', accent: true },
              { label: '充电中',   value: '8', unit: '个' },
              { label: '距我',     value: '128', unit: 'm' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '11px 0 12px',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                borderRight: i < 2 ? `1px solid ${theme.line}` : 'none',
              }}>
                <span style={{ fontSize: 10, color: theme.textDim, marginBottom: 4, letterSpacing: 0.2 }}>{s.label}</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                  <span className="mono" style={{ fontSize: 22, fontWeight: 800, color: s.accent ? theme.primary : theme.text, lineHeight: 1 }}>{s.value}</span>
                  <span style={{ fontSize: 11, color: theme.textMuted }}>{s.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── pricing card ── */}
        <div style={{ padding: '14px 16px 0' }}>
          <Card theme={theme} padded={false}>
            {/* header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 14px',
              background: theme.surfaceTint,
              borderBottom: `1px solid ${theme.line}`,
              borderRadius: '10px 10px 0 0',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="coin" size={14} color="#fff"/>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>本站充电价格</span>
              </div>
              <span onClick={() => nav('pricing')} style={{ fontSize: 12, color: theme.primary, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}>
                完整规则
                <svg width="5" height="8" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke={theme.primary} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>
            {/* rate rows */}
            <div style={{ padding: '4px 14px 8px' }}>
              {[
                { watt: '0–100 W',   rate: '0.40', tier: '一' },
                { watt: '101–200 W', rate: '0.50', tier: '二' },
                { watt: '201–300 W', rate: '0.60', tier: '三' },
                { watt: '301–400 W', rate: '0.70', tier: '四' },
              ].map((t, i) => {
                const barW = [38, 54, 70, 88][i];
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0',
                    borderBottom: i < 3 ? `1px solid ${theme.lineSoft}` : 'none',
                  }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: 5, flexShrink: 0, fontSize: 10, fontWeight: 700,
                      background: `${theme.primary}18`, color: theme.primary,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{t.tier}</span>
                    <span style={{ fontSize: 12, color: theme.textMuted, width: 80, flexShrink: 0 }}>{t.watt}</span>
                    <div style={{ flex: 1, height: 4, borderRadius: 2, background: theme.bg0, overflow: 'hidden' }}>
                      <div style={{ width: `${barW}%`, height: '100%', borderRadius: 2, background: theme.primary, opacity: 0.45 + i * 0.14 }}/>
                    </div>
                    <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: theme.text, flexShrink: 0 }}>
                      ¥{t.rate}<span style={{ fontSize: 10, fontWeight: 400, color: theme.textMuted }}>/h</span>
                    </span>
                  </div>
                );
              })}
            </div>
            {/* footer: electricity + warning */}
            <div style={{ margin: '0 14px 12px', borderRadius: 8, background: theme.bg0, border: `1px solid ${theme.line}`, overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 12px', borderBottom: `1px solid ${theme.line}` }}>
                <span style={{ fontSize: 12, color: theme.textMuted }}>电费（统一单价）</span>
                <span className="mono" style={{ fontSize: 13, fontWeight: 800, color: theme.text }}>¥0.60<span style={{ fontSize: 10, fontWeight: 400, color: theme.textMuted }}>/度</span></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 12px' }}>
                <Icon name="warn" size={13} color={theme.warning} filled/>
                <span style={{ fontSize: 11, color: theme.textMuted }}>
                  开启充电需余额 ≥ <span className="mono" style={{ fontWeight: 700, color: theme.text }}>¥3.00</span>
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* ── socket matrix ── */}
        <SectionTitle theme={theme} right={
          <div style={{ display: 'flex', gap: 10, fontSize: 11, color: theme.textMuted }}>
            <span><span style={{ color: theme.success }}>●</span> 空闲 4</span>
            <span><span style={{ color: theme.primary }}>●</span> 充电 7</span>
            <span><span style={{ color: theme.danger }}>●</span> 故障 1</span>
          </div>
        }>桩位状态</SectionTitle>
        <div style={{ padding: '0 16px' }}>
          <Card theme={theme}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 7 }}>
              {SLOT_STATES.map((s, i) => {
                const isFree = s === 'free', isFault = s === 'fault';
                const accent = isFree ? theme.success : isFault ? theme.danger : theme.primary;
                return (
                  <div key={i} style={{
                    borderRadius: 8, padding: '9px 4px 7px',
                    background: `${accent}10`, border: `1px solid ${accent}28`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                    position: 'relative', cursor: isFree ? 'pointer' : 'default',
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 2v4M15 2v4" stroke={accent} strokeWidth="1.8" strokeLinecap="round"/>
                      <rect x="6" y="6" width="12" height="7" rx="2" stroke={accent} strokeWidth="1.5" fill={`${accent}15`}/>
                      <path d="M12 13v5" stroke={accent} strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                    <span className="mono" style={{ fontSize: 10, fontWeight: 700, color: accent }}>A-{String(i+1).padStart(2,'0')}</span>
                    <span style={{ fontSize: 9, color: theme.textDim }}>{isFree ? '空闲' : isFault ? '故障' : '充电中'}</span>
                    {s === 'charging' && <span style={{ position: 'absolute', top: 4, right: 4, width: 4, height: 4, borderRadius: 999, background: theme.primary }} className="blink"/>}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* ── station info ── */}
        <SectionTitle theme={theme}>站点信息</SectionTitle>
        <div style={{ padding: '0 16px 24px' }}>
          <Card theme={theme} padded={false}>
            {[
              { icon: 'pin',    l: '地址',    v: '金牛区金牛苑 12 栋南侧' },
              { icon: 'clock',  l: '营业时间', v: '06:00 – 23:00' },
              { icon: 'shield', l: '设施',    v: '雨棚 · 自动断电 · 烟感' },
              { icon: 'phone',  l: '运营方',  v: '蓝鲨能源 · 400-xxx-xxxx', arrow: true },
            ].map((r, i, a) => (
              <div key={r.l} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px',
                borderBottom: i < a.length-1 ? `1px solid ${theme.lineSoft}` : 'none',
              }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, flexShrink: 0, background: theme.bg0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={r.icon} size={14} color={theme.textMuted}/>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, color: theme.textDim }}>{r.l}</div>
                  <div style={{ marginTop: 2, fontSize: 13, color: theme.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.v}</div>
                </div>
                {r.arrow && <svg width="6" height="10" viewBox="0 0 6 10" fill="none" style={{ opacity: 0.25, flexShrink: 0 }}><path d="M1 1l4 4-4 4" stroke={theme.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
            ))}
          </Card>
        </div>

        {/* ── bottom actions ── */}
        <div style={{ padding: '0 16px 32px', display: 'flex', gap: 10 }}>
          <Button kind="ghost" theme={theme} style={{ flex: 1 }}>导航到这里</Button>
          <Button kind="primary" theme={theme} style={{ flex: 1.4 }} onClick={() => nav('scan')}>
            <Icon name="scan" size={16} color="#fff"/>扫码充电
          </Button>
        </div>
      </ScreenBody>
    </>
  );
}

// ─── PricingScreen (H5) — full rule detail ────────────────────────
function PricingScreen({ theme, nav }) {
  return (
    <>
      <NativeTitleBar title="充电价格" theme={theme} onBack={() => nav('station')}/>
      <ScreenBody theme={theme}>
        <div style={{ padding: '14px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* price hero */}
          <Card theme={theme} style={{ background: theme.surfaceTint }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: theme.text, marginBottom: 12 }}>服务费（按功率档位）</div>
            {[
              { tier: '档位一', range: '0 – 100 W',   rate: '¥0.40', unit: '/小时' },
              { tier: '档位二', range: '101 – 200 W', rate: '¥0.50', unit: '/小时' },
              { tier: '档位三', range: '201 – 300 W', rate: '¥0.60', unit: '/小时' },
              { tier: '档位四', range: '301 – 400 W', rate: '¥0.70', unit: '/小时' },
            ].map((t, i) => (
              <div key={t.tier} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 0',
                borderBottom: i === 0 ? `1px solid ${theme.line}` : 'none',
              }}>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: theme.text }}>{t.tier}</span>
                  <span style={{ fontSize: 11, color: theme.textMuted, marginLeft: 8 }}>{t.range}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="mono" style={{ fontSize: 20, fontWeight: 800, color: theme.text }}>{t.rate}</span>
                  <span style={{ fontSize: 11, color: theme.textMuted }}>{t.unit}</span>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${theme.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: theme.textMuted }}>电费（统一单价）</span>
              <div>
                <span className="mono" style={{ fontSize: 20, fontWeight: 800, color: theme.text }}>¥0.60</span>
                <span style={{ fontSize: 11, color: theme.textMuted }}>/度</span>
              </div>
            </div>
          </Card>

          {/* how it works */}
          <SectionTitle theme={theme}>计费说明</SectionTitle>
          <Card theme={theme} padded={false}>
            {[
              { l: '总费用', v: '服务费 + 电费，结束时一次结算' },
              { l: '功率检测', v: '充电期间实时检测功率，按当前功率对应的档位计算服务费' },
              { l: '用电计量', v: '电表实时读数，充完结算，四舍五入到分' },
              { l: '充满自停', v: '检测到电流低于阈值自动断电' },
              { l: '超时保留', v: '断电后可继续占用，不额外收费' },
            ].map((r, i, a) => (
              <div key={r.l} style={{
                padding: '14px 16px',
                borderBottom: i < a.length - 1 ? `1px solid ${theme.line}` : 'none',
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12,
              }}>
                <span style={{ fontSize: 13, color: theme.textMuted, flexShrink: 0 }}>{r.l}</span>
                <span style={{ fontSize: 13, color: theme.text, textAlign: 'right' }}>{r.v}</span>
              </div>
            ))}
          </Card>

          {/* 最低余额 */}
          <SectionTitle theme={theme}>开启条件</SectionTitle>
          <Card theme={theme} style={{ borderColor: `${theme.warning}66` }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${theme.warning}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="warn" size={20} color={theme.warning} filled/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>最低余额 ¥3.00</div>
                <div style={{ marginTop: 6, fontSize: 12, color: theme.textMuted, lineHeight: 1.6 }}>
                  开始充电时账户余额需 ≥ ¥3.00；余额不足将无法启动，请先充值。月卡用户不受此限制。
                </div>
                <div style={{
                  marginTop: 10, padding: 10, borderRadius: 8,
                  background: theme.bg0, border: `1px solid ${theme.line}`,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div>
                    <div style={{ fontSize: 11, color: theme.textMuted }}>当前余额</div>
                    <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: theme.text, marginTop: 2 }}>¥ 28.40</div>
                  </div>
                  <span className="chip" style={{ background: `${theme.success}20`, color: theme.success, borderColor: `${theme.success}55` }}>
                    <Icon name="check" size={12} color={theme.success}/> 满足
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card theme={theme} padded={false}>
            {[
              { l: '过流保护', v: '> 5A 自动断电并推送告警' },
              { l: '优惠叠加', v: '券 + 月卡可叠加；不可与活动同享' },
            ].map((r, i, a) => (
              <div key={r.l} style={{
                padding: '14px 16px',
                borderBottom: i < a.length - 1 ? `1px solid ${theme.line}` : 'none',
              }}>
                <div style={{ fontSize: 13, color: theme.text, fontWeight: 600 }}>{r.l}</div>
                <div style={{ marginTop: 4, fontSize: 11, color: theme.textMuted }}>{r.v}</div>
              </div>
            ))}
          </Card>

          <Button kind="primary" theme={theme} full onClick={() => nav('confirm')}>
            知道了，开始充电
          </Button>
        </div>
      </ScreenBody>
    </>
  );
}

function AdCard({ theme }) {
  return (
    <div style={{
      borderRadius: 16,
      background: theme.surface,
      border: `1px solid ${theme.line}`,
      position: 'relative', padding: 14,
      display: 'flex', alignItems: 'center', gap: 12,
      }}>  
      {/* ad label */}
      <span style={{
        position: 'absolute', top: 8, right: 10,
        fontSize: 9, color: theme.textDim, letterSpacing: 0.5,
        border: `1px solid ${theme.line}`,
        padding: '1px 5px', borderRadius: 3,
      }}>广告</span>
      {/* brand icon */}
      <div style={{
        width: 52, height: 52, borderRadius: 12, flexShrink: 0,
        background: '#FF6B35',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: 20, fontWeight: 800, color: '#fff', lineHeight: 1 }}>永</span>
        <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.85)', marginTop: 2 }}>超市</span>
      </div>
      {/* copy */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>充电等待，购物不误</div>
        <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 3 }}>永辉超市 · 附近 200m · 满 50 减 10</div>
      </div>
      {/* CTA */}
      <div style={{
        fontSize: 12, fontWeight: 600, color: theme.primary, flexShrink: 0,
        border: `1px solid ${theme.primary}55`,
        padding: '5px 12px', borderRadius: 999,
        background: theme.surfaceTint,
      }}>领券</div>
    </div>
  );
}

Object.assign(window, {
  BannerCarousel, HomeScreen, ScanScreen, MapScreen, StationScreen, PricingScreen,
  NEARBY_STATIONS, StationCard,
});
