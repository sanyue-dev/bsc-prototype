// screens-h5.jsx — H5 工具页 (车主端)
//   WalletScreen, CouponsScreen, MessagesScreen, ProfileScreen, FaultScreen, ServiceScreen

// ─── WalletScreen — 钱包/余额/充值 ────────────────────────────────
function WalletScreen({ theme, nav }) {
  const [amt, setAmt] = React.useState('50');
  const [customAmt, setCustomAmt] = React.useState('');
  const packs = [
    { v: '20', bonus: null },
    { v: '50', bonus: '送3元', hot: true },
    { v: '100', bonus: '送10元' },
    { v: '200', bonus: '送25元' },
  ];
  return (
    <>
      <NativeTitleBar title="我的钱包" theme={theme} onBack={() => nav('profile')}/>
      <ScreenBody theme={theme}>
        {/* balance hero */}
        <div style={{ padding: '14px 16px 0' }}>
          <Card theme={theme} padded={false} style={{
            padding: '20px 20px 16px', position: 'relative', overflow: 'hidden',
            background: theme.primary,
            border: 'none',
          }}>
            {/* decorative ring */}
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>账户余额（元）</div>
            <div className="mono" style={{
              fontSize: 44, fontWeight: 800, color: '#fff', marginTop: 4, letterSpacing: -1,
            }}>28.40</div>
            <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '4px 10px', borderRadius: 999, fontSize: 11, color: '#fff',
                background: 'rgba(255,255,255,0.22)', border: '1px solid rgba(255,255,255,0.32)',
              }}>
                可用 ¥28.40
              </span>
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '4px 10px', borderRadius: 999, fontSize: 11, color: '#fff',
                background: 'rgba(255,255,255,0.22)', border: '1px solid rgba(255,255,255,0.32)',
              }}>
                冻结 ¥0.00
              </span>
            </div>
          </Card>
        </div>

        {/* recharge */}
        <SectionTitle theme={theme}>快速充值</SectionTitle>
        <div style={{ padding: '0 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {packs.map(p => {
              const on = amt === p.v;
              return (
                <div key={p.v} onClick={() => { setAmt(p.v); setCustomAmt(''); }} style={{
                  position: 'relative', padding: '14px 14px', borderRadius: 14, cursor: 'pointer',
                  background: on ? theme.primary : theme.surface,
                  border: `1.5px solid ${on ? theme.primary : theme.line}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span className="mono" style={{ fontSize: 24, fontWeight: 800, color: on ? '#fff' : theme.text }}>¥{p.v}</span>
                  </div>
                  {p.bonus && (
                    <div style={{ fontSize: 11, color: on ? 'rgba(255,255,255,0.85)' : theme.accent, marginTop: 6 }}>{p.bonus}</div>
                  )}
                  {p.hot && (
                    <span style={{
                      position: 'absolute', top: -8, right: 10,
                      fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 4,
                      background: theme.danger, color: '#fff', letterSpacing: 0.5,
                    }}>热门</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* custom amount */}
          <Card theme={theme} padded={false} style={{ marginTop: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, border: `1.5px solid ${customAmt ? theme.primary : theme.line}` }}>
            <span className="mono" style={{ fontSize: 18, color: theme.textMuted }}>¥</span>
            <input
              value={customAmt}
              placeholder="自定义金额，最低 5 元"
              type="number"
              inputMode="decimal"
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                color: theme.text, fontSize: 15,
              }}
              onChange={e => {
                const v = e.target.value;
                setCustomAmt(v);
                if (v) setAmt(v);
              }}
            />
          </Card>

          {/* pay method */}
          <Card theme={theme} padded={false} style={{ marginTop: 10, padding: '12px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6,
                background: '#1AAD19', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 16, color: '#fff',
              }}>微</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: theme.text, fontWeight: 600 }}>微信支付</div>
                <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>推荐 · 即时到账</div>
              </div>
              <div style={{
                width: 18, height: 18, borderRadius: 999,
                border: `4px solid ${theme.primary}`, background: '#fff',
              }}/>
            </div>
          </Card>

          <Button kind="primary" theme={theme} full style={{ marginTop: 14 }}>
            充值 ¥{parseFloat(amt) > 0 ? parseFloat(amt).toFixed(2) : '--'}
          </Button>
        </div>

        {/* history */}
        <SectionTitle theme={theme} right={<span style={{ color: theme.accent }}>查看全部</span>}>账户明细</SectionTitle>
        <div style={{ padding: '0 16px 24px' }}>
          <Card theme={theme} padded={false}>
            {[
              { t: '充电消费', sub: '蓝桥科技园 B 座', amt: '−3.50', when: '昨天 18:20', sign: 'out' },
              { t: '充值',     sub: '微信支付',         amt: '+50.00', when: '5月10日',   sign: 'in' },
              { t: '充电消费', sub: '金牛苑南门车棚',  amt: '−2.30', when: '5月10日',   sign: 'out' },
              { t: '券抵扣返还', sub: '订单 CG…0712',  amt: '+0.20', when: '5月10日',   sign: 'in' },
            ].map((r, i, a) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', padding: '14px 16px',
                borderBottom: i < a.length - 1 ? `1px solid ${theme.line}` : 'none',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: r.sign === 'in' ? `${theme.success}20` : theme.bg0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12,
                }}>
                  <Icon name={r.sign === 'in' ? 'plus' : 'minus'} size={14}
                    color={r.sign === 'in' ? theme.success : theme.textMuted}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: theme.text }}>{r.t}</div>
                  <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>{r.sub} · {r.when}</div>
                </div>
                <div className="mono" style={{
                  fontSize: 15, fontWeight: 700,
                  color: theme.text,
                }}>{r.amt}</div>
              </div>
            ))}
          </Card>
        </div>
      </ScreenBody>
    </>
  );
}

// ─── CouponsScreen — 优惠券 + 月卡 ───────────────────────────────
function CouponsScreen({ theme, nav }) {
  const [tab, setTab] = React.useState('coupons');
  return (
    <>
      <NativeTitleBar title="优惠券 / 月卡" theme={theme} onBack={() => nav('profile')}/>
      <ScreenBody theme={theme}>
        {/* tabs */}
        <div style={{ display: 'flex', gap: 6, padding: '12px 16px' }}>
          {[
            { id: 'coupons', t: '优惠券', n: 3 },
            { id: 'card',    t: '月卡', n: null },
            { id: 'used',    t: '已使用', n: null },
          ].map(x => {
            const on = tab === x.id;
            return (
              <span key={x.id} onClick={() => setTab(x.id)} className="chip" style={{
                cursor: 'pointer',
                background: on ? theme.primary : '#fff',
                borderColor: on ? theme.primary : theme.line,
                color: on ? '#fff' : theme.textMuted, fontWeight: on ? 700 : 500,
              }}>{x.t} {x.n != null && `· ${x.n}`}</span>
            );
          })}
        </div>

        {tab === 'coupons' && (
          <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {COUPONS.map(c => <CouponTicket key={c.id} c={c} theme={theme}/>)}
          </div>
        )}

        {tab === 'card' && (
          <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Card theme={theme} padded={false} glow style={{
              padding: 18,
              background: theme.primary,
              border: 'none',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.78)', letterSpacing: 1, fontWeight: 700 }}>BLUE SHARK PASS</div>
              <div style={{ fontSize: 22, color: '#fff', fontWeight: 800, marginTop: 6 }}>无限次月卡</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 8 }}>
                每日最长 8h · 全网站点通用 · 已用 18 次
              </div>
              <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>有效期至</div>
                  <div className="mono" style={{ fontSize: 16, color: '#fff', fontWeight: 700, marginTop: 2 }}>2026-05-26</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="mono" style={{ fontSize: 24, color: '#fff', fontWeight: 800 }}>12<span style={{ fontSize: 12, opacity: 0.8 }}>天</span></div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>剩余</div>
                </div>
              </div>
            </Card>

            {/* renewal options */}
            <SectionTitle theme={theme}>续费 / 升级</SectionTitle>
            {[
              { t: '月卡 · 30天', s: '日均 ¥0.5', p: '15', tag: '当前' },
              { t: '季卡 · 90天', s: '日均 ¥0.44', p: '40', tag: '省 5 元' },
              { t: '年卡 · 365天', s: '日均 ¥0.33', p: '120', tag: '送 1 月' },
            ].map(p => (
              <Card key={p.t} theme={theme} padded={false} style={{ padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{p.t}</span>
                    <span className="chip" style={{ color: theme.accent, borderColor: `${theme.accent}55`, background: `${theme.accent}15` }}>{p.tag}</span>
                  </div>
                  <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 4 }}>{p.s}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="mono" style={{ fontSize: 22, fontWeight: 800, color: theme.text }}>¥{p.p}</div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {tab === 'used' && (
          <div style={{ padding: '0 16px 24px', textAlign: 'center', color: theme.textMuted, fontSize: 13, paddingTop: 40 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 999, margin: '0 auto 12px',
              background: theme.bg0, border: `1px solid ${theme.line}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="coupon" size={28} color={theme.textDim}/>
            </div>
            暂无已使用记录
          </div>
        )}
      </ScreenBody>
      <TabBar active="savings" onTab={nav} theme={theme}/>
    </>
  );
}

const COUPONS = [
  { id: 'c1', value: '5.0', cond: '满 10 元可用', t: '充电优惠券', exp: '2026-05-31', tag: '推荐', primary: true },
  { id: 'c2', value: '1.0', cond: '无门槛',       t: '新人立减券', exp: '2026-05-25', tag: null,    primary: false },
  { id: 'c3', value: '2.0', cond: '满 5 元可用',  t: '会员专享券', exp: '2026-06-10', tag: null,    primary: false },
];

function CouponTicket({ c, theme }) {
  return (
    <div style={{
      position: 'relative', display: 'flex',
      borderRadius: 16, overflow: 'hidden',
      background: theme.surface, border: `1px solid ${theme.line}`,
    }}>
      {/* left value */}
      <div style={{
        width: 116, padding: '18px 0',
        background: c.primary
          ? theme.primary
          : theme.surfaceTint,
        color: c.primary ? '#fff' : theme.text,
        position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
        borderRight: c.primary ? 'none' : `1px dashed ${theme.line}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span style={{ fontSize: 16, opacity: 0.85 }}>{c.percent ? '' : '¥'}</span>
          <span className="mono" style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1 }}>{c.value}</span>
          {c.percent && <span style={{ fontSize: 16, opacity: 0.85 }}>%</span>}
        </div>
        <div style={{ fontSize: 11, opacity: c.primary ? 0.85 : 0.75 }}>{c.cond}</div>
        {/* notches */}
        <div style={{ position: 'absolute', right: -7, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 5 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ width: 5, height: 5, borderRadius: 999, background: theme.surface }}/>
          ))}
        </div>
      </div>
      {/* right info */}
      <div style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{c.t}</span>
            {c.tag && <span className="chip" style={{ color: theme.primary, borderColor: `${theme.primary}55`, background: theme.surfaceTint }}>{c.tag}</span>}
          </div>
          <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 6 }}>有效期至 {c.exp}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{
            padding: '5px 14px', borderRadius: 999,
            background: c.primary ? theme.primary : '#fff',
            color: c.primary ? '#fff' : theme.primary,
            fontSize: 12, fontWeight: 600, cursor: 'pointer',
            border: c.primary ? 'none' : `1px solid ${theme.primary}55`,
          }}>立即使用</span>
        </div>
      </div>
    </div>
  );
}

// ─── MessagesScreen — 消息通知 ───────────────────────────────────
function MessagesScreen({ theme, nav }) {
  return (
    <>
      <NativeTitleBar title="消息通知" theme={theme} onBack={() => nav('profile')}/>
      <ScreenBody theme={theme}>
        <div style={{ padding: '12px 16px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { type: 'charge', icon: 'bolt', tint: theme.success, t: '充电完成', sub: '订单 CG…1842 已自动断电，本次消费 ¥3.50', when: '今天 18:20', unread: true },
            { type: 'warn',   icon: 'warn',  tint: theme.warning, t: '余额不足提醒', sub: '当前余额 ¥3.20 即将无法启动充电，建议充值', when: '今天 09:15', unread: true },
            { type: 'coupon', icon: 'coupon',tint: theme.primary2,t: '新券到账', sub: '获得 1 张「充电 ¥5 抵扣券」，5 月 31 日到期', when: '昨天 10:30', unread: false },
            { type: 'sys',    icon: 'info',  tint: theme.accent,  t: '系统通告', sub: '本周六 02:00–04:00 部分站点维护，期间不可用', when: '5月12日',   unread: false },
            { type: 'fault',  icon: 'wrench',tint: theme.danger,  t: '报修已受理', sub: '工单 #4128 已分派至维护组，预计 24h 内处理', when: '5月10日',   unread: false },
          ].map((m, i) => (
            <Card key={i} theme={theme} padded={false} style={{ padding: '14px 14px', display: 'flex', gap: 12 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: `${m.tint}22`, border: `1px solid ${m.tint}55`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <Icon name={m.icon} size={18} color={m.tint}/>
                {m.unread && (
                  <span style={{
                    position: 'absolute', top: -3, right: -3,
                    width: 8, height: 8, borderRadius: 999,
                    background: theme.danger, border: `1.5px solid ${theme.bg1}`,
                  }}/>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, fontWeight: m.unread ? 700 : 500, color: theme.text }}>{m.t}</span>
                  <span style={{ fontSize: 10, color: theme.textDim }}>{m.when}</span>
                </div>
                <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 4, lineHeight: 1.5 }}>{m.sub}</div>
              </div>
            </Card>
          ))}
        </div>
      </ScreenBody>
    </>
  );
}

// ─── ProfileScreen — 个人中心 ────────────────────────────────────
function ProfileScreen({ theme, nav, onRoleSwitch }) {
  return (
    <>
      <NativeTitleBar
        title="我的" theme={theme}
      />

      <ScreenBody theme={theme}>
        {/* ── hero: avatar + name ── */}
        <div style={{
          background: theme.bg0,
          borderBottom: `1px solid ${theme.line}`,
          padding: '16px 16px 18px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* avatar */}
            <div style={{
              width: 58, height: 58, borderRadius: 999, flexShrink: 0,
              background: theme.primary,
              border: `2px solid ${theme.surface}`,
              boxShadow: `0 0 0 1.5px ${theme.line}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>陈</span>
            </div>
            {/* name + uid */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: theme.text, letterSpacing: -0.2 }}>陈一蓝</div>
              <div className="mono" style={{ fontSize: 11, color: theme.textDim, marginTop: 3 }}>UID 2086 4192</div>
              <div style={{ marginTop: 7, display: 'flex', gap: 6 }}>
                <span className="chip" style={{ background: `${theme.primary}15`, color: theme.primary, borderColor: `${theme.primary}30`, fontWeight: 600 }}>月卡用户</span>
                <span className="chip">认证车辆 ×1</span>
              </div>
            </div>
          </div>

          {/* stats row */}
          <div style={{
            marginTop: 16,
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            background: theme.surface,
            border: `1px solid ${theme.line}`,
            borderRadius: 10, overflow: 'hidden',
          }}>
            {[
              { label: '累计充电', value: '148', unit: '次' },
              { label: '累计电量', value: '312', unit: '度' },
              { label: '累计节省', value: '¥86', unit: null },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '10px 0 11px',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                borderRight: i < 2 ? `1px solid ${theme.line}` : 'none',
              }}>
                <span style={{ fontSize: 10, color: theme.textDim, marginBottom: 3 }}>{s.label}</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                  <span className="mono" style={{ fontSize: 20, fontWeight: 800, color: theme.text, lineHeight: 1 }}>{s.value}</span>
                  {s.unit && <span style={{ fontSize: 10, color: theme.textMuted }}>{s.unit}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── shortcut row ── */}
        <div style={{ padding: '14px 16px 0' }}>
          <Card theme={theme} padded={false}>
            <div style={{ display: 'flex' }}>
              {[
                { id: 'wallet',   icon: 'wallet', label: '钱包',   sub: '¥28.40' },
                { id: 'coupons',  icon: 'coupon', label: '券/月卡', sub: '3 张' },
                { id: 'messages', icon: 'bell',   label: '消息',   sub: '2 新' },
                { id: 'orders',   icon: 'list',   label: '订单',   sub: '本月 14' },
              ].map((s, i, a) => (
                <div key={s.id} onClick={() => nav(s.id)} style={{
                  flex: 1, padding: '14px 0 12px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                  cursor: 'pointer',
                  borderRight: i < a.length - 1 ? `1px solid ${theme.lineSoft}` : 'none',
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 9,
                    background: theme.surfaceTint,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon name={s.icon} size={18} color={theme.primary}/>
                  </div>
                  <span style={{ fontSize: 11, color: theme.text, fontWeight: 500 }}>{s.label}</span>
                  <span className="mono" style={{ fontSize: 10, color: theme.primary }}>{s.sub}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ── role switcher ── */}
        <div style={{ padding: '14px 16px 0' }}>
          <div
            onClick={() => onRoleSwitch && onRoleSwitch('operator')}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px', borderRadius: 14,
              background: `linear-gradient(135deg, ${theme.primary}18 0%, ${theme.accent}12 100%)`,
              border: `1px solid ${theme.primary}30`,
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 11, flexShrink: 0,
              background: theme.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="chart" size={20} color="#fff"/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>切换至运营商端</div>
              <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>管理站点 · 查看营收 · 处理工单</div>
            </div>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" style={{ opacity: 0.45, flexShrink: 0 }}>
              <path d="M1 1l4 4-4 4" stroke={theme.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* ── service list ── */}
        <SectionTitle theme={theme}>服务与设置</SectionTitle>
        <div style={{ padding: '0 16px 24px' }}>
          <Card theme={theme} padded={false}>
            {[
              { id: 'fault',   icon: 'wrench',  label: '设备故障报修', sub: '上报问题，最快 2h 响应' },
              { id: 'service', icon: 'headset', label: '在线客服',     sub: '7×24 小时人工 + AI' },
              { id: null,      icon: 'cam',     label: '我的电动车',   sub: '已绑定 1 辆' },
              { id: null,      icon: 'shield',  label: '保险与权益',   sub: '充电意外险 已生效' },
              { id: null,      icon: 'coin',    label: '发票',         sub: '可开 ¥86.20' },
              { id: null,      icon: 'info',    label: '关于我们',     sub: 'v 1.4.2' },
            ].map((r, i, a) => (
              <div key={r.label} onClick={() => r.id && nav(r.id)} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px',
                borderBottom: i < a.length - 1 ? `1px solid ${theme.lineSoft}` : 'none',
                cursor: r.id ? 'pointer' : 'default',
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                  background: theme.bg0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name={r.icon} size={15} color={theme.textMuted}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: theme.text }}>{r.label}</div>
                  <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>{r.sub}</div>
                </div>
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" style={{ opacity: 0.25, flexShrink: 0 }}>
                  <path d="M1 1l4 4-4 4" stroke={theme.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ))}
          </Card>
        </div>
      </ScreenBody>
      <TabBar active="profile" onTab={nav} theme={theme}/>
    </>
  );
}

// helper for stats placed on a colored hero (always white)
function HeroStat({ label, value, unit }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.78)', letterSpacing: 0.3 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
        <span className="mono" style={{ fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{value}</span>
        {unit && <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.78)' }}>{unit}</span>}
      </div>
    </div>
  );
}

// ─── FaultScreen — 设备故障报修 ──────────────────────────────────
function FaultScreen({ theme, nav }) {
  const [type, setType] = React.useState('not-start');
  const [station, setStation] = React.useState('金牛苑南门车棚 · A-03');
  const types = [
    { id: 'not-start', t: '无法启动', icon: 'plug' },
    { id: 'overheat', t: '设备过热', icon: 'warn' },
    { id: 'auto-stop', t: '充电中断', icon: 'pause' },
    { id: 'damaged', t: '外观损坏', icon: 'wrench' },
    { id: 'fee', t: '计费异常', icon: 'coin' },
    { id: 'other', t: '其他', icon: 'info' },
  ];
  return (
    <>
      <NativeTitleBar title="设备报修" theme={theme} onBack={() => nav('profile')}/>
      <ScreenBody theme={theme}>
        <div style={{ padding: '14px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* device selector */}
          <Card theme={theme} padded={false} style={{ padding: '14px 16px' }}>
            <div style={{ fontSize: 12, color: theme.textMuted }}>故障设备</div>
            <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{station}</span>
              <span style={{ color: theme.accent, fontSize: 12, cursor: 'pointer' }}>更换 ›</span>
            </div>
          </Card>

          {/* fault type */}
          <SectionTitle theme={theme}>故障类型</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {types.map(x => {
              const on = type === x.id;
              return (
                <div key={x.id} onClick={() => setType(x.id)} style={{
                  padding: '14px 8px', borderRadius: 12, cursor: 'pointer',
                  background: on ? `${theme.primary}28` : theme.surface,
                  border: `1.5px solid ${on ? theme.primary : theme.line}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                }}>
                  <Icon name={x.icon} size={20} color={on ? theme.accent : theme.textMuted} filled={on}/>
                  <span style={{ fontSize: 12, color: on ? '#fff' : theme.text, fontWeight: on ? 700 : 500 }}>{x.t}</span>
                </div>
              );
            })}
          </div>

          {/* description */}
          <SectionTitle theme={theme} right={<span style={{ color: theme.textDim }}>0 / 200</span>}>详细描述</SectionTitle>
          <Card theme={theme} padded={false} style={{ padding: 14 }}>
            <div style={{
              minHeight: 96,
              fontSize: 13, color: theme.textDim, lineHeight: 1.5,
            }}>请描述故障现象，例如：扫码后桩号识别不到、电流忽大忽小、刷卡无响应等…</div>
          </Card>

          {/* upload photos */}
          <SectionTitle theme={theme}>现场照片（选填）</SectionTitle>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1, 2].map(i => (
              <div key={i} style={{
                width: 84, height: 84, borderRadius: 12,
                background: theme.surfaceTint,
                border: `1px solid ${theme.line}`,
                position: 'relative', overflow: 'hidden',
              }}>
                <svg width="100%" height="100%" viewBox="0 0 84 84" opacity="0.6">
                  <rect width="84" height="84" fill="none" stroke={theme.line} strokeDasharray="4 4"/>
                </svg>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name="gallery" size={20} color={theme.textMuted}/>
                </div>
              </div>
            ))}
            <div style={{
              width: 84, height: 84, borderRadius: 12,
              border: `1.5px dashed ${theme.line}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
              cursor: 'pointer',
            }}>
              <Icon name="plus" size={20} color={theme.textMuted}/>
              <span style={{ fontSize: 10, color: theme.textMuted }}>添加</span>
            </div>
          </div>

          {/* contact */}
          <Card theme={theme} padded={false}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderBottom: `1px solid ${theme.line}` }}>
              <span style={{ fontSize: 13, color: theme.textMuted, width: 80 }}>联系电话</span>
              <span className="mono" style={{ fontSize: 14, color: theme.text, flex: 1 }}>138 **** 4126</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px' }}>
              <span style={{ fontSize: 13, color: theme.textMuted, width: 80 }}>紧急程度</span>
              <div style={{ flex: 1, display: 'flex', gap: 6 }}>
                {['一般', '紧急', '非常紧急'].map((u, i) => (
                  <span key={u} className="chip" style={{
                    background: i === 1 ? `${theme.warning}25` : theme.surface,
                    color: i === 1 ? theme.warning : theme.textMuted,
                    borderColor: i === 1 ? `${theme.warning}66` : theme.line,
                  }}>{u}</span>
                ))}
              </div>
            </div>
          </Card>

          <Button kind="primary" theme={theme} full onClick={() => nav('home')}>提交报修</Button>
          <div style={{ fontSize: 11, color: theme.textDim, textAlign: 'center' }}>
            预计 24h 内处理，进度将通过消息推送
          </div>
        </div>
      </ScreenBody>
    </>
  );
}

// ─── ServiceScreen — 客服 / 帮助 ─────────────────────────────────
function ServiceScreen({ theme, nav }) {
  return (
    <>
      <NativeTitleBar title="客服中心" theme={theme} onBack={() => nav('profile')}/>
      <ScreenBody theme={theme}>
        <div style={{ padding: '14px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* hero entrance */}
          <Card theme={theme} style={{ background: theme.primary, border: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: 'rgba(255,255,255,0.22)', border: '1px solid rgba(255,255,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="message" size={28} color="#fff"/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>蓝鲨小助手</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', marginTop: 4 }}>AI 客服 7×24 在线 · 复杂问题转人工</div>
              </div>
              <Button kind="ghost" theme={theme} style={{
                background: 'rgba(255,255,255,0.22)', border: '1px solid rgba(255,255,255,0.28)', color: '#fff',
              }}>进入</Button>
            </div>
          </Card>

          {/* quick channel */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            <ChannelCard theme={theme} icon="phone" t="电话客服" sub="400-026-0086" sub2="9:00 – 22:00"/>
            <ChannelCard theme={theme} icon="message" t="人工在线" sub="平均等待 1 分钟" sub2="工作时段"/>
          </div>

          {/* hot questions */}
          <SectionTitle theme={theme}>常见问题</SectionTitle>
          <Card theme={theme} padded={false}>
            {[
              '余额不足为什么不能开始充电？',
              '充电柜扫码无反应怎么办？',
              '为什么充满后没有自动断电？',
              '充电途中如何停止充电？',
              '月卡用户的最低余额还生效吗？',
              '用电量怎么查看和核对？',
            ].map((q, i, a) => (
              <div key={q} style={{
                display: 'flex', alignItems: 'center', padding: '14px 16px',
                borderBottom: i < a.length - 1 ? `1px solid ${theme.line}` : 'none',
              }}>
                <span style={{
                  width: 20, height: 20, borderRadius: 999,
                  background: i < 2 ? `${theme.primary}30` : theme.bg0,
                  color: i < 2 ? theme.accent : theme.textMuted,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, marginRight: 12,
                }} className="mono">{i + 1}</span>
                <span style={{ flex: 1, fontSize: 13, color: theme.text }}>{q}</span>
                <Icon name="right" size={14} color={theme.textDim}/>
              </div>
            ))}
          </Card>

          {/* feedback */}
          <Card theme={theme}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon name="message" size={18} color={theme.primary2}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: theme.text, fontWeight: 600 }}>意见反馈</div>
                <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>有想法或建议？告诉我们</div>
              </div>
              <Icon name="right" size={14} color={theme.textDim}/>
            </div>
          </Card>
        </div>
      </ScreenBody>
    </>
  );
}

function ChannelCard({ theme, icon, t, sub, sub2 }) {
  return (
    <Card theme={theme} padded={false} style={{ padding: 14 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: `${theme.primary}25`, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name={icon} size={18} color={theme.primary2}/>
      </div>
      <div style={{ fontSize: 13, color: theme.text, fontWeight: 700, marginTop: 10 }}>{t}</div>
      <div className="mono" style={{ fontSize: 12, color: theme.text, marginTop: 4 }}>{sub}</div>
      <div style={{ fontSize: 10, color: theme.textMuted, marginTop: 2 }}>{sub2}</div>
    </Card>
  );
}

// ─── SavingsScreen — 省钱中心 (tab landing) ──────────────────────
function SavingsScreen({ theme, nav }) {
  const [checkedIn, setCheckedIn] = React.useState(false);
  const dayIdx = 4; // today = 周五 (0-indexed)

  return (
    <>
      <NativeTitleBar title="省钱中心" theme={theme}/>

      <ScreenBody theme={theme}>
        {/* hero */}
        <div style={{ padding: '12px 16px 0' }}>
          <Card theme={theme} padded={false} style={{
            padding: '20px 20px 16px',
            background: theme.primary,
            border: 'none', overflow: 'hidden', position: 'relative',
          }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.78)' }}>本月累计节省</div>
            <div className="mono" style={{ fontSize: 44, fontWeight: 800, color: '#fff', letterSpacing: -1.5, marginTop: 2 }}>¥12.50</div>
            <div style={{ marginTop: 14, display: 'flex', gap: 0 }}>
              {[
                { label: '累计节省',  value: '¥86.40' },
                { label: '积分',  value: '2,480 分' },
                { label: '可兑礼品',  value: '12 件' },
              ].map((s, i) => (
                <React.Fragment key={s.label}>
                  {i > 0 && <div style={{ width: 1, background: 'rgba(255,255,255,0.2)', margin: '0 14px' }}/>}
                  <div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.68)' }}>{s.label}</div>
                    <div className="mono" style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginTop: 3 }}>{s.value}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </Card>
        </div>

        {/* 我的权益 */}
        <SectionTitle theme={theme} right={
          <span onClick={() => nav('coupons')} style={{ color: theme.accent, cursor: 'pointer' }}>全部权益 →</span>
        }>我的权益</SectionTitle>
        <div style={{ padding: '0 16px', display: 'flex', gap: 10 }}>
          {[
            {
              icon: 'coupon', value: '3', unit: '张可用优惠券',
              note: '1张本周到期', noteTint: theme.danger,
              badge: '3张', badgeBg: theme.danger,
              target: 'coupons',
            },
            {
              icon: 'shield', value: '12', unit: '天月卡剩余',
              note: '5月26日到期', noteTint: theme.textMuted,
              badge: '生效中', badgeBg: theme.success,
              target: 'coupons',
            },
          ].map(c => (
            <div key={c.icon} onClick={() => nav(c.target)} style={{ flex: 1, cursor: 'pointer' }}>
              <Card theme={theme} style={{
                background: theme.surfaceTint,
                border: `1.5px solid ${theme.primary}28`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Icon name={c.icon} size={22} color={theme.primary2}/>
                  <span style={{
                    fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 4,
                    background: c.badgeBg, color: '#fff',
                  }}>{c.badge}</span>
                </div>
                <div className="mono" style={{ fontSize: 28, fontWeight: 800, color: theme.primary, marginTop: 10, lineHeight: 1 }}>{c.value}</div>
                <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 4 }}>{c.unit}</div>
                <div style={{ fontSize: 10, color: theme.textMuted, marginTop: 6 }}>{c.note}</div>
              </Card>
            </div>
          ))}
        </div>

        {/* 每日签到 */}
        <SectionTitle theme={theme}>每日签到</SectionTitle>
        <div style={{ padding: '0 16px' }}>
          <Card theme={theme}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div>
                <span style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>连续签到 4 天</span>
                <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 3 }}>明天再签得 50 分 · 连签 7 天得大奖</div>
              </div>
              <Button
                kind={checkedIn ? 'ghost' : 'primary'} theme={theme}
                style={{ height: 34, padding: '0 14px', fontSize: 12 }}
                disabled={checkedIn}
                onClick={() => setCheckedIn(true)}
              >{checkedIn ? '✓ 已签' : '签到 +30分'}</Button>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['一', '二', '三', '四', '五', '六', '日'].map((d, i) => {
                const done = i < dayIdx || (i === dayIdx && checkedIn);
                const today = i === dayIdx;
                return (
                  <div key={d} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                    <div style={{
                      width: '100%', aspectRatio: '1/1', borderRadius: 8,
                      background: done ? theme.primary : today ? `${theme.primary}20` : theme.bg0,
                      border: today && !done ? `1.5px solid ${theme.primary}` : '1.5px solid transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {done
                        ? <Icon name="check" size={11} color="#fff"/>
                        : <Icon name="coin" size={11} color={today ? theme.primary : theme.textDim}/>
                      }
                    </div>
                    <span style={{
                      fontSize: 9,
                      color: done ? theme.primary : today ? theme.primary : theme.textDim,
                      fontWeight: today ? 700 : 400,
                    }}>周{d}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: theme.textMuted, borderTop: `1px solid ${theme.line}`, paddingTop: 10 }}>
              <span>本周累计 <span className="mono" style={{ color: theme.accent }}>+120 分</span></span>
              <span onClick={() => nav('shop')} style={{ color: theme.accent, cursor: 'pointer' }}>积分兑好礼 →</span>
            </div>
          </Card>
        </div>

        {/* 限时活动 */}
        <SectionTitle theme={theme}>限时活动</SectionTitle>
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            {
              tag: '充值返利', title: '充 50 送 5 元赠送金额',
              sub: '本月累计充值 ¥50 即可获赠', timeLeft: '剩余 3 天',
              grad: theme.primary,
              id: 'wallet', action: '去充值',
            },
            {
              tag: '新站开业', title: '蓝桥科技园新站优惠',
              sub: '开业期间充电享 8 折服务费', timeLeft: '剩余 6 天',
              grad: '#10B981',
              id: 'map', action: '查看站点',
            },
          ].map((a, i) => (
            <div key={i} style={{
              borderRadius: 16, padding: '16px 18px',
              background: a.grad, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'relative' }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: 0.6,
                  color: 'rgba(255,255,255,0.9)',
                  background: 'rgba(255,255,255,0.22)', borderRadius: 4, padding: '2px 7px',
                }}>{a.tag}</span>
                <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', marginTop: 8 }}>{a.title}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.78)' }}>{a.sub} · {a.timeLeft}</span>
                  <span onClick={() => nav(a.id)} style={{
                    fontSize: 12, fontWeight: 600, color: '#fff',
                    background: 'rgba(255,255,255,0.22)', borderRadius: 999,
                    padding: '6px 14px', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer',
                  }}>{a.action} →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 推荐有奖 */}
        <SectionTitle theme={theme}>推荐有奖</SectionTitle>
        <div style={{ padding: '0 16px 28px' }}>
          <Card theme={theme} padded={false} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 46, height: 46, borderRadius: 12, flexShrink: 0,
              background: `${theme.primary}22`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="headset" size={22} color={theme.primary2}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>邀请好友注册</div>
              <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 4 }}>
                好友首充即送双方各 <span className="mono" style={{ color: theme.accent }}>¥5.00</span> 券
              </div>
            </div>
            <Button kind="primary" theme={theme} style={{ height: 34, padding: '0 14px', fontSize: 12, flexShrink: 0 }}>
              去邀请
            </Button>
          </Card>
        </div>
      </ScreenBody>
      <TabBar active="savings" onTab={nav} theme={theme}/>
    </>
  );
}

// ─── ShopScreen — 积分商城 (tab landing) ─────────────────────────
const SHOP_ITEMS = [
  { id: 'p1', name: '防水充电口保护套', cat: '充电配件', price: '9.9',  pts: 500,   tag: '热销', sales: '2.3k', icon: 'plug',    tint: '#2E5BFF' },
  { id: 'p2', name: '5m 延长充电线',    cat: '充电配件', price: '29.9', pts: 1500,  tag: '新品', sales: '986',  icon: 'bolt',    tint: '#0099FF' },
  { id: 'p3', name: '智能防盗报警器',   cat: '安全装备', price: '79.9', pts: 4000,  tag: null,   sales: '445',  icon: 'bell',    tint: '#F59E0B' },
  { id: 'p4', name: '轻量防护头盔',     cat: '安全装备', price: '199',  pts: 10000, tag: '精选', sales: '678',  icon: 'shield',  tint: '#EF4444' },
  { id: 'p5', name: '蓝鲨保温水杯',     cat: '车辆周边', price: '39.9', pts: 2000,  tag: '特惠', sales: '1.1k', icon: 'coin',    tint: '#10B981' },
  { id: 'p6', name: '手机防震支架',     cat: '车辆周边', price: '19.9', pts: 1000,  tag: null,   sales: '3.2k', icon: 'gear',    tint: '#5A7CFF' },
];

const FLASH_ITEMS = [
  { id: 'f1', name: '防水保护套', sale: '4.9',  orig: '9.9',  tint: '#2E5BFF', icon: 'plug'   },
  { id: 'f2', name: '防盗链条锁', sale: '39',   orig: '79.9', tint: '#F59E0B', icon: 'shield' },
  { id: 'f3', name: '手机支架',   sale: '9.9',  orig: '19.9', tint: '#5A7CFF', icon: 'gear'   },
];

function ShopScreen({ theme, nav }) {
  const [cat, setCat] = React.useState('全部');
  const [cartN] = React.useState(2);
  const cats = ['全部', '充电配件', '安全装备', '车辆周边', '积分兑换'];
  const filtered = cat === '全部' || cat === '积分兑换' ? SHOP_ITEMS : SHOP_ITEMS.filter(p => p.cat === cat);

  // countdown: hardcoded display value
  const [sec, setSec] = React.useState(2058); // 34:18
  React.useEffect(() => {
    const t = setInterval(() => setSec(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(sec / 60)).padStart(2, '0');
  const ss = String(sec % 60).padStart(2, '0');

  return (
    <>
      <NativeTitleBar
        title="积分商城" theme={theme}
      />

      <ScreenBody theme={theme}>
        {/* search */}
        <div style={{ padding: '8px 16px 6px' }}>
          <div style={{
            height: 38, borderRadius: 999, padding: '0 14px',
            display: 'flex', alignItems: 'center', gap: 8,
            background: theme.surface, border: `1px solid ${theme.line}`,
          }}>
            <Icon name="search" size={15} color={theme.textMuted}/>
            <span style={{ fontSize: 13, color: theme.textDim }}>搜索商品</span>
          </div>
        </div>

        {/* points bar */}
        <div style={{ padding: '0 16px 10px' }}>
          <Card theme={theme} padded={false} style={{
            padding: '12px 16px',
            background: theme.surfaceTint,
            border: `1px solid ${theme.primary}2A`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: 11, color: theme.textMuted }}>我的积分</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginTop: 3 }}>
                <span className="mono" style={{ fontSize: 26, fontWeight: 800, color: theme.text }}>2,480</span>
                <span style={{ fontSize: 11, color: theme.textMuted }}>分</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: theme.textMuted }}>可兑换</div>
              <div className="mono" style={{ fontSize: 15, fontWeight: 700, color: theme.text, marginTop: 2 }}>12 件商品</div>
              <div onClick={() => nav('savings')} style={{ fontSize: 10, color: theme.primary, cursor: 'pointer', marginTop: 4 }}>
                如何获取积分 →
              </div>
            </div>
          </Card>
        </div>

        {/* flash sale */}
        <div style={{ padding: '0 16px 8px' }}>
          <div style={{
            borderRadius: 14, padding: '12px 14px',
            background: theme.primary,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>限时秒杀</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', marginTop: 2 }}>低至 5 折 · 每日 12:00 更新</div>
            </div>
            {/* countdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {[mm, ':', ss].map((s, i) => (
                <span key={i} className="mono" style={{
                  fontSize: s === ':' ? 14 : 15, fontWeight: 800, color: '#fff',
                  background: s === ':' ? 'transparent' : 'rgba(0,0,0,0.22)',
                  borderRadius: s === ':' ? 0 : 5,
                  padding: s === ':' ? '0 1px' : '3px 5px',
                }}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* flash products horizontal */}
        <div style={{ display: 'flex', gap: 10, padding: '0 16px 14px', overflowX: 'auto' }} className="noscroll">
          {FLASH_ITEMS.map(p => (
            <div key={p.id} style={{
              width: 108, flexShrink: 0, borderRadius: 12,
              background: theme.surface, border: `1px solid ${theme.line}`,
              overflow: 'hidden', cursor: 'pointer',
            }}>
              <div style={{
                height: 76,
                background: theme.bg0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: theme.surface, border: `1px solid ${theme.line}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name={p.icon} size={22} color={theme.textDim}/>
                </div>
              </div>
              <div style={{ padding: '8px 10px 10px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: theme.text, lineHeight: 1.3 }}>{p.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginTop: 5 }}>
                  <span className="mono" style={{ fontSize: 14, fontWeight: 800, color: theme.danger }}>¥{p.sale}</span>
                  <span className="mono" style={{ fontSize: 9, color: theme.textDim, textDecoration: 'line-through' }}>¥{p.orig}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* category tabs */}
        <div style={{ display: 'flex', gap: 6, padding: '0 16px 10px', overflowX: 'auto' }} className="noscroll">
          {cats.map(c => {
            const on = cat === c;
            return (
              <span key={c} onClick={() => setCat(c)} className="chip" style={{
                cursor: 'pointer', whiteSpace: 'nowrap',
                background: on ? theme.primary : '#fff',
                borderColor: on ? theme.primary : theme.line,
                color: on ? '#fff' : theme.textMuted,
                fontWeight: on ? 700 : 500,
              }}>{c}</span>
            );
          })}
        </div>

        {/* product grid */}
        <div style={{ padding: '0 16px 28px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {filtered.map(p => (
            <div key={p.id} style={{
              borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
              background: theme.surface, border: `1px solid ${theme.line}`,
              }}>
              <div style={{
                height: 100,
                background: theme.bg0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <div style={{
                  width: 54, height: 54, borderRadius: 14,
                  background: theme.surface, border: `1px solid ${theme.line}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name={p.icon} size={26} color={theme.textDim}/>
                </div>
                {p.tag && (
                  <span style={{
                    position: 'absolute', top: 8, left: 8,
                    fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
                    background: p.tag === '热销' ? theme.danger : p.tag === '新品' ? theme.success : p.tag === '精选' ? theme.primary : theme.accent,
                    color: '#fff',
                  }}>{p.tag}</span>
                )}
              </div>
              <div style={{ padding: '10px 12px 12px' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: theme.text, lineHeight: 1.4 }}>{p.name}</div>
                <div style={{ fontSize: 10, color: theme.textMuted, marginTop: 3 }}>已售 {p.sales}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 8 }}>
                  <div>
                    <div className="mono" style={{ fontSize: 17, fontWeight: 800, color: theme.primary }}>¥{p.price}</div>
                    <div style={{ fontSize: 9, color: theme.textMuted, marginTop: 1 }}>或 {p.pts.toLocaleString()} 积分</div>
                  </div>
                  <div style={{
                    width: 28, height: 28, borderRadius: 6,
                    background: theme.primary,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon name="plus" size={14} color="#fff"/>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScreenBody>
      <TabBar active="shop" onTab={nav} theme={theme}/>
    </>
  );
}

Object.assign(window, {
  WalletScreen, CouponsScreen, MessagesScreen, ProfileScreen, FaultScreen, ServiceScreen,
  SavingsScreen, ShopScreen,
  HeroStat,
});
