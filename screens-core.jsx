// screens-core.jsx — 车主端核心 5 屏
//   HomeScreen   (原生)  首页
//   ScanScreen   (原生)  扫一扫
//   MapScreen    (原生)  地图找站点
//   StationScreen        站点详情 (H5)
//   PricingScreen        计费规则 (H5)

// ─── HomeScreen (原生) ────────────────────────────────────────────
function HomeScreen({ theme, nav }) {
  return (
    <>
      <NativeTitleBar title="蓝鲨充电" theme={theme} />
      <ScreenBody theme={theme}>
        {/* hero: balance + scan CTA */}
        <div style={{ position: 'relative', padding: '4px 16px 20px' }}>
          <Card theme={theme} padded={false} glow style={{
            padding: '18px 18px 16px',
            background: `linear-gradient(135deg, ${theme.primary2} 0%, ${theme.primary} 55%, ${theme.primaryDark} 100%)`,
            border: '1px solid rgba(255,255,255,0.18)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.78)', letterSpacing: 0.4 }}>账户余额 · 蓝鲨币</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 6 }}>
                  <span className="mono" style={{ fontSize: 30, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>28.40</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>元</span>
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  <span className="chip" style={{
                    background: 'rgba(255,255,255,0.22)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff',
                  }}>月卡 · 剩 12 天</span>
                  <span className="chip" style={{
                    background: 'rgba(255,255,255,0.22)', borderColor: 'rgba(255,255,255,0.3)', color: '#fff',
                  }}>3 张券</span>
                </div>
              </div>
              <div onClick={() => nav('wallet')}
                style={{
                  padding: '7px 12px', borderRadius: 999,
                  background: 'rgba(255,255,255,0.22)', color: '#fff', fontSize: 12, fontWeight: 600,
                  border: '1px solid rgba(255,255,255,0.25)', cursor: 'pointer',
                }}>充值</div>
            </div>
          </Card>

          {/* big scan CTA */}
          <div onClick={() => nav('scan')} style={{
            marginTop: 14, height: 122, borderRadius: 22,
            background: `linear-gradient(135deg, ${theme.primary2} 0%, ${theme.primary} 65%, ${theme.primaryDark} 100%)`,
            border: '1px solid rgba(255,255,255,0.18)',
            position: 'relative', overflow: 'hidden', cursor: 'pointer',
            boxShadow: `0 14px 28px -14px ${theme.glow}`,
          }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="lines" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.32"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#lines)"/>
              </svg>
            </div>
            <div style={{
              position: 'absolute', inset: 0, padding: '18px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.78)', letterSpacing: 1.2, fontWeight: 700 }}>SCAN · 扫码即充</div>
                <div style={{ fontSize: 22, color: '#fff', fontWeight: 700, marginTop: 4, letterSpacing: 0.4 }}>对准充电桩二维码</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>识别后自动绑定计费规则</div>
              </div>
              <div style={{
                width: 72, height: 72, borderRadius: 18,
                background: 'rgba(255,255,255,0.22)',
                border: '1px solid rgba(255,255,255,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                }} className="pulse-glow">
                <Icon name="scan" size={36} color="#fff"/>
              </div>
            </div>
          </div>

          {/* quick actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 14 }}>
            {[
              { id: 'map', icon: 'pin', label: '附近站点' },
              { id: 'coupons', icon: 'coupon', label: '优惠券' },
              { id: 'fault', icon: 'wrench', label: '报修' },
              { id: 'service', icon: 'headset', label: '客服' },
            ].map(q => (
              <div key={q.id} onClick={() => nav(q.id)} style={{
                aspectRatio: '1/1', borderRadius: 14,
                background: '#fff',
                border: `1px solid ${theme.line}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 6, cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(15,27,54,0.04)',
              }}>
                <Icon name={q.icon} size={22} color={theme.primary}/>
                <span style={{ fontSize: 11, color: theme.text }}>{q.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* nearby */}
        <SectionTitle theme={theme} right={<span onClick={() => nav('map')} style={{ cursor: 'pointer', color: theme.accent }}>查看地图 →</span>}>附近站点</SectionTitle>
        <div style={{ padding: '0 16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {NEARBY_STATIONS.map(s => (
            <div key={s.id} onClick={() => nav('station', { stationId: s.id })}>
              <StationCard station={s} theme={theme}/>
            </div>
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
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: theme.success, boxShadow: `0 0 8px ${theme.success}` }} className="blink"/>
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
  { id: 'st-1', name: '金牛苑南门车棚', dist: '128m', free: 4, total: 12, hours: '06:00 – 23:00', tag: '推荐', img: 'A' },
  { id: 'st-2', name: '蓝桥科技园 B 座', dist: '432m', free: 2, total: 16, hours: '24小时',     tag: '高速',  img: 'B' },
  { id: 'st-3', name: '滨河新村东区',     dist: '780m', free: 0, total: 8,  hours: '06:00 – 22:30', tag: '已满',  img: 'C' },
];

function StationCard({ station, theme }) {
  const full = station.free === 0;
  return (
    <Card theme={theme} padded={false} style={{ padding: 14, display: 'flex', gap: 12 }}>
      {/* thumb */}
      <div style={{
        width: 60, height: 60, borderRadius: 14, flexShrink: 0,
        background: `linear-gradient(135deg, ${theme.primary2}, ${theme.primary})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        <Icon name="station" size={26} color="#fff" filled/>
        <span style={{
          position: 'absolute', top: -4, right: -4,
          fontSize: 9, fontWeight: 700, padding: '2px 5px', borderRadius: 4,
          background: full ? theme.danger : theme.success, color: '#fff',
        }}>{full ? '满' : '空'}</span>
      </div>
      {/* info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: theme.text }}>{station.name}</span>
          {station.tag && <span className="chip" style={{
            color: full ? theme.danger : theme.accent,
            borderColor: full ? `${theme.danger}55` : `${theme.accent}55`,
            background: full ? `${theme.danger}15` : `${theme.accent}15`,
          }}>{station.tag}</span>}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 12, color: theme.textMuted }}>
          <span className="mono">{station.dist}</span>
          <span>·</span>
          <span><span className="mono" style={{ color: full ? theme.danger : theme.success }}>{station.free}</span>/{station.total} 空闲</span>
          <span>·</span>
          <span>{station.hours}</span>
        </div>
        <div style={{ marginTop: 8, height: 4, background: '#F4F7FC', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{
            width: `${(station.free / station.total) * 100}%`, height: '100%',
            background: full ? theme.danger : `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`,
            transition: 'width .5s ease',
          }}/>
        </div>
      </div>
    </Card>
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
        background: `
          radial-gradient(ellipse at 30% 30%, ${theme.surfaceTint} 0%, ${theme.bg1} 55%, #DDE5F0 100%)
        `,
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

      {/* top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, padding: '8px 12px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        zIndex: 5,
      }}>
        <div onClick={() => nav('home')} style={{
          width: 36, height: 36, borderRadius: 999,
          background: '#fff', border: `1px solid ${theme.line}`,
          boxShadow: '0 2px 8px rgba(15,27,54,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}>
          <svg width="10" height="16" viewBox="0 0 10 16"><path d="M9 1L1 8l8 7" stroke={theme.text} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, color: theme.text }}>扫一扫</div>
        <div style={{
          width: 36, height: 36, borderRadius: 999,
          background: '#fff', border: `1px solid ${theme.line}`,
          boxShadow: '0 2px 8px rgba(15,27,54,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}>
          <Icon name="flash" size={18} color={theme.text}/>
        </div>
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
            boxShadow: `0 0 16px ${theme.glow}`,
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
            filter: `drop-shadow(0 0 10px ${theme.glow})`,
          }}/>
        </div>
      </div>

      {/* helper text */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 'calc(50% + 164px)',
        textAlign: 'center', color: theme.text, fontSize: 13, letterSpacing: 0.4, fontWeight: 500,
      }}>
        将充电桩二维码 / 桩号置于框内
      </div>

      {/* tip card */}
      <div style={{
        position: 'absolute', left: 16, right: 16, top: 'calc(50% + 195px)',
        padding: '12px 14px', borderRadius: 14,
        background: '#fff', border: `1px solid ${theme.line}`,
        boxShadow: '0 6px 18px rgba(15,27,54,0.06)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <Icon name="info" size={16} color={theme.primary}/>
        <div style={{ flex: 1, fontSize: 12, color: theme.textMuted, lineHeight: 1.5 }}>
          请勿在车辆充电过程中扫描，先停止当前充电
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
        boxShadow: '0 4px 12px rgba(15,27,54,0.08)',
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
          boxShadow: '0 4px 14px rgba(15,27,54,0.08)',
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
            boxShadow: '0 2px 6px rgba(15,27,54,0.06)',
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
              boxShadow: on
                ? `0 0 0 4px ${theme.primary}33, 0 6px 14px rgba(15,27,54,0.18)`
                : '0 6px 14px rgba(15,27,54,0.15)',
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
              filter: 'drop-shadow(0 2px 1px rgba(15,27,54,0.15))',
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
          boxShadow: `0 4px 14px ${theme.glow}, 0 0 0 2px ${theme.primary}33`,
        }}/>
        <div className="pulse-glow" style={{
          position: 'absolute', inset: -16, borderRadius: 999,
          border: `2px solid ${theme.primary}`, opacity: 0.35,
        }}/>
      </div>

      {/* recenter button */}
      <div style={{
        position: 'absolute', right: 16, bottom: 220, zIndex: 5,
        width: 42, height: 42, borderRadius: 999,
        background: '#fff',
        border: `1px solid ${theme.line}`,
        boxShadow: '0 4px 14px rgba(15,27,54,0.10)',
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
                <span><span className="mono" style={{ color: theme.success, fontWeight: 700 }}>{station.free}</span>/{station.total} 空闲</span>
                <span>·</span>
                <span className="mono">{station.dist}</span>
                <span>·</span>
                <span>步行 2 分钟</span>
              </div>
              <div style={{ marginTop: 8, fontSize: 11, color: theme.textMuted }}>
                时长档 <span className="mono" style={{ color: theme.text }}>¥1.0/h</span> · 电量档 <span className="mono" style={{ color: theme.text }}>¥0.6/度</span> · 4h 套餐 <span className="mono" style={{ color: theme.text }}>¥3.5</span>
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
  return (
    <>
      <WeChatH5Header title="站点详情" theme={theme} onBack={() => nav('home')} onClose={() => nav('home')}/>
      <ScreenBody theme={theme}>
        {/* hero */}
        <GridBg theme={theme} height={170}>
          <div style={{ padding: '18px 18px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: theme.text, letterSpacing: 0.4 }}>金牛苑南门车棚</div>
                <div style={{ marginTop: 6, fontSize: 12, color: theme.textMuted }}>金牛苑社区南门内 · 06:00 – 23:00</div>
                <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                  <span className="chip" style={{ background: `${theme.success}20`, color: theme.success, borderColor: `${theme.success}55` }}>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: theme.success }} className="blink"/>
                    营业中
                  </span>
                  <span className="chip">有雨棚</span>
                  <span className="chip">自动断电</span>
                </div>
              </div>
              <div style={{
                width: 60, height: 60, borderRadius: 14,
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 8px 22px ${theme.glow}`,
              }}>
                <Icon name="station" size={28} color="#fff" filled/>
              </div>
            </div>
            {/* live stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 16 }}>
              <Stat label="空闲桩位" value="4" unit="/12" theme={theme} accent/>
              <Stat label="充电中"  value="8" theme={theme}/>
              <Stat label="距离"   value="128" unit="m" theme={theme}/>
            </div>
          </div>
        </GridBg>

        {/* pricing rule bound to station */}
        <div style={{ padding: '14px 16px 0' }}>
          <Card theme={theme} style={{ background: `linear-gradient(135deg, ${theme.primary}18, ${theme.surface})` }} glow>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${theme.primary}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="coin" size={18} color={theme.primary2}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>本站计费规则</span>
                  <span onClick={() => nav('pricing')} style={{ fontSize: 12, color: theme.accent, cursor: 'pointer' }}>详情 →</span>
                </div>
                <div style={{ marginTop: 4, fontSize: 11, color: theme.textMuted }}>RULE-B / 蓝鲨标准</div>
                {/* 3 modes */}
                <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                  {[
                    { t: '时长', v: '1.0', u: '/h' },
                    { t: '电量', v: '0.6', u: '/度' },
                    { t: '4h档', v: '3.5', u: '元' },
                  ].map(m => (
                    <div key={m.t} style={{
                      flex: 1, padding: 10, borderRadius: 10,
                      background: '#F4F7FC',
                      border: `1px solid ${theme.line}`,
                    }}>
                      <div style={{ fontSize: 10, color: theme.textMuted }}>{m.t}</div>
                      <div className="mono" style={{ fontSize: 16, fontWeight: 700, color: theme.text, marginTop: 2 }}>
                        ¥{m.v}<span style={{ fontSize: 10, color: theme.textMuted, marginLeft: 1 }}>{m.u}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* min balance */}
                <div style={{
                  marginTop: 10, padding: '8px 10px', borderRadius: 8,
                  background: `${theme.warning}15`,
                  border: `1px solid ${theme.warning}40`,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <Icon name="warn" size={14} color={theme.warning} filled/>
                  <span style={{ fontSize: 11, color: theme.text }}>
                    开启充电需余额 ≥ <span className="mono" style={{ color: theme.warning, fontWeight: 700 }}>¥3.00</span>
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* socket matrix */}
        <SectionTitle theme={theme} right={<span style={{ color: theme.success }}>● 空闲</span>}>桩位状态</SectionTitle>
        <div style={{ padding: '0 16px 0' }}>
          <Card theme={theme}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {Array.from({ length: 12 }).map((_, i) => {
                const states = ['free', 'charging', 'free', 'free', 'charging', 'fault', 'free', 'charging', 'charging', 'charging', 'charging', 'charging'];
                const s = states[i];
                const isFree = s === 'free', isFault = s === 'fault';
                const bg = isFree ? `${theme.success}18` : isFault ? `${theme.danger}18` : `${theme.primary}25`;
                const bd = isFree ? `${theme.success}55` : isFault ? `${theme.danger}55` : `${theme.primary}66`;
                const c  = isFree ? theme.success : isFault ? theme.danger : theme.primary2;
                return (
                  <div key={i} style={{
                    aspectRatio: '1/1', borderRadius: 10,
                    background: bg, border: `1px solid ${bd}`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
                    position: 'relative',
                  }}>
                    <div className="mono" style={{ fontSize: 12, fontWeight: 700, color: c }}>A-{String(i+1).padStart(2, '0')}</div>
                    <div style={{ fontSize: 9, color: theme.textMuted }}>
                      {isFree ? '空闲' : isFault ? '故障' : '充电中'}
                    </div>
                    {s === 'charging' && (
                      <div style={{ position: 'absolute', top: 4, right: 4, width: 5, height: 5, borderRadius: 999, background: theme.primary, boxShadow: `0 0 4px ${theme.primary}` }} className="blink"/>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 12, fontSize: 11, color: theme.textMuted }}>
              <span><span style={{ color: theme.success }}>●</span> 空闲 4</span>
              <span><span style={{ color: theme.primary }}>●</span> 充电 7</span>
              <span><span style={{ color: theme.danger }}>●</span> 故障 1</span>
            </div>
          </Card>
        </div>

        {/* meta list */}
        <SectionTitle theme={theme}>站点信息</SectionTitle>
        <div style={{ padding: '0 16px 24px' }}>
          <Card theme={theme} padded={false}>
            {[
              { l: '地址', v: '金牛区金牛苑 12 栋南侧' },
              { l: '营业时间', v: '06:00 – 23:00' },
              { l: '设施', v: '雨棚 · 自动断电 · 烟感' },
              { l: '运营方', v: '蓝鲨能源 · 客服 400-xxx' },
            ].map((r, i, a) => (
              <div key={r.l} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '14px 16px',
                borderBottom: i < a.length - 1 ? `1px solid ${theme.line}` : 'none',
              }}>
                <span style={{ fontSize: 12, color: theme.textMuted }}>{r.l}</span>
                <span style={{ fontSize: 13, color: theme.text }}>{r.v}</span>
              </div>
            ))}
          </Card>
        </div>

        {/* sticky bottom action */}
        <div style={{ padding: '0 16px 24px', display: 'flex', gap: 10 }}>
          <Button kind="ghost" theme={theme} style={{ flex: 1 }}>导航到这里</Button>
          <Button kind="primary" theme={theme} style={{ flex: 1.4 }} onClick={() => nav('scan')}>
            <Icon name="scan" size={16} color="#fff"/>
            扫码充电
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
      <WeChatH5Header title="计费规则" theme={theme} onBack={() => nav('station')}/>
      <ScreenBody theme={theme}>
        <div style={{ padding: '14px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* rule header */}
          <Card theme={theme} style={{ background: `linear-gradient(135deg, ${theme.primary}30, ${theme.surface})` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, color: theme.accent, letterSpacing: 1, fontWeight: 700 }}>RULE / B</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: theme.text, marginTop: 4 }}>蓝鲨标准 · B 档</div>
                <div style={{ marginTop: 6, fontSize: 12, color: theme.textMuted }}>适用 21 个站点 · 240 个桩位</div>
              </div>
              <span className="chip" style={{ background: `${theme.success}20`, color: theme.success, borderColor: `${theme.success}55` }}>启用中</span>
            </div>
          </Card>

          {/* 3 计费方式 */}
          <SectionTitle theme={theme}>三种计费方式</SectionTitle>
          {[
            { id: 'time', t: '按时长', sub: '单价计费，适合短时充电', price: '¥1.00', unit: '/小时', detail: '满 60 分钟取整结算，不足按分钟换算' },
            { id: 'kwh',  t: '按电量', sub: '按实际度数，长时间更划算', price: '¥0.60', unit: '/度', detail: '电表读数计费，结束时四舍五入到分' },
            { id: 'pack', t: '按档位套餐', sub: '一口价，到时自动断电', price: '¥3.50', unit: '/4小时', detail: '可选 2/4/8h 套餐，提前结束不退余额' },
          ].map((m, i) => (
            <Card key={m.id} theme={theme}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      width: 24, height: 24, borderRadius: 6,
                      background: `${theme.primary}30`, color: theme.primary2,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700,
                    }} className="mono">{i + 1}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: theme.text }}>{m.t}</span>
                  </div>
                  <div style={{ marginTop: 6, fontSize: 12, color: theme.textMuted }}>{m.sub}</div>
                  <div style={{ marginTop: 8, fontSize: 11, color: theme.textDim }}>{m.detail}</div>
                </div>
                <div style={{ textAlign: 'right', marginLeft: 12 }}>
                  <div className="mono" style={{
                    fontSize: 22, fontWeight: 800, color: theme.accent,
                    textShadow: `0 0 14px ${theme.accent}55`,
                  }}>{m.price}</div>
                  <div style={{ fontSize: 11, color: theme.textMuted }}>{m.unit}</div>
                </div>
              </div>
            </Card>
          ))}

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
                  background: '#F4F7FC', border: `1px solid ${theme.line}`,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div>
                    <div style={{ fontSize: 11, color: theme.textMuted }}>当前余额</div>
                    <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: theme.success, marginTop: 2 }}>¥ 28.40</div>
                  </div>
                  <span className="chip" style={{ background: `${theme.success}20`, color: theme.success, borderColor: `${theme.success}55` }}>
                    <Icon name="check" size={12} color={theme.success}/> 满足
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* additional rules */}
          <Card theme={theme} padded={false}>
            {[
              { l: '充满自停', v: '检测到电流低于阈值自动断电' },
              { l: '过流保护', v: '> 5A 自动断电并推送告警' },
              { l: '退款规则', v: '套餐档不退；时长/电量按实结算' },
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

Object.assign(window, {
  HomeScreen, ScanScreen, MapScreen, StationScreen, PricingScreen,
  NEARBY_STATIONS, StationCard,
});
