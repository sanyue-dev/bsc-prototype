// screens-h5.jsx — H5 工具页 (车主端)
//   WalletScreen, CouponsScreen, MessagesScreen, ProfileScreen, FaultScreen, ServiceScreen

// ─── WalletScreen — 钱包/余额/充值 ────────────────────────────────
function WalletScreen({ theme, nav }) {
  const [amt, setAmt] = React.useState('50');
  const packs = [
    { v: '20', bonus: null },
    { v: '50', bonus: '送3元', hot: true },
    { v: '100', bonus: '送10元' },
    { v: '200', bonus: '送25元' },
  ];
  return (
    <>
      <WeChatH5Header title="我的钱包" theme={theme} onBack={() => nav('profile')}/>
      <ScreenBody theme={theme}>
        {/* balance hero */}
        <div style={{ padding: '14px 16px 0' }}>
          <Card theme={theme} padded={false} glow style={{
            padding: '20px 20px 16px', position: 'relative', overflow: 'hidden',
            background: `linear-gradient(135deg, ${theme.primary2} 0%, ${theme.primary} 50%, ${theme.primaryDark} 100%)`,
            border: '1px solid rgba(255,255,255,0.18)',
          }}>
            {/* decorative ring */}
            <svg style={{ position: 'absolute', top: -40, right: -40, opacity: 0.25 }} width="160" height="160" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="60" stroke="#fff" strokeWidth="1.5" fill="none" strokeDasharray="2 4"/>
              <circle cx="80" cy="80" r="40" stroke="#fff" strokeWidth="1" fill="none"/>
            </svg>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>账户余额（元）</div>
            <div className="mono" style={{
              fontSize: 44, fontWeight: 800, color: '#fff', marginTop: 4, letterSpacing: -1,
              textShadow: '0 4px 18px rgba(0,0,0,0.3)',
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
                <div key={p.v} onClick={() => setAmt(p.v)} style={{
                  position: 'relative', padding: '14px 14px', borderRadius: 14, cursor: 'pointer',
                  background: on ? `${theme.primary}28` : theme.surface,
                  border: `1.5px solid ${on ? theme.primary : theme.line}`,
                  boxShadow: on ? `0 10px 24px -10px ${theme.glow}` : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span className="mono" style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>¥{p.v}</span>
                  </div>
                  {p.bonus && (
                    <div style={{ fontSize: 11, color: theme.accent, marginTop: 6 }}>{p.bonus}</div>
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
          <Card theme={theme} padded={false} style={{ marginTop: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="mono" style={{ fontSize: 18, color: theme.textMuted }}>¥</span>
            <input value="" placeholder="自定义金额，最低 5 元" style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: theme.text, fontSize: 15,
            }} onChange={() => {}}/>
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
            充值 ¥{amt}.00
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
                  background: r.sign === 'in' ? `${theme.success}20` : 'rgba(255,255,255,0.05)',
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
                  color: r.sign === 'in' ? theme.success : theme.text,
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
      <WeChatH5Header title="优惠券 / 月卡" theme={theme} onBack={() => nav('profile')}/>
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
                background: on ? `${theme.primary}30` : 'rgba(255,255,255,0.04)',
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
              background: `linear-gradient(135deg, ${theme.primary2}, ${theme.primary})`,
              border: '1px solid rgba(255,255,255,0.2)',
              position: 'relative', overflow: 'hidden',
            }}>
              <svg style={{ position: 'absolute', top: -30, right: -30, opacity: 0.18 }} width="150" height="150" viewBox="0 0 150 150">
                <path d="M75 10L20 50v45c0 35 25 50 55 50s55-15 55-50V50L75 10z" stroke="#fff" strokeWidth="2" fill="none"/>
              </svg>
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
                  <div className="mono" style={{ fontSize: 22, fontWeight: 800, color: theme.accent }}>¥{p.p}</div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {tab === 'used' && (
          <div style={{ padding: '0 16px 24px', textAlign: 'center', color: theme.textMuted, fontSize: 13, paddingTop: 40 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 999, margin: '0 auto 12px',
              background: '#F4F7FC', border: `1px solid ${theme.line}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="coupon" size={28} color={theme.textDim}/>
            </div>
            暂无已使用记录
          </div>
        )}
      </ScreenBody>
    </>
  );
}

const COUPONS = [
  { id: 'c1', value: '5.0', cond: '满 10 元可用', t: '电量档专属券', exp: '2026-05-31', tag: '推荐', primary: true },
  { id: 'c2', value: '1.0', cond: '无门槛',       t: '新人立减券',   exp: '2026-05-25', tag: null,    primary: false },
  { id: 'c3', value: '20%', cond: '套餐档可用', t: '套餐 8 折券',  exp: '2026-06-10', tag: null,    primary: false, percent: true },
];

function CouponTicket({ c, theme }) {
  return (
    <div style={{
      position: 'relative', display: 'flex',
      borderRadius: 16, overflow: 'hidden',
      background: theme.surface, border: `1px solid ${theme.line}`,
      boxShadow: c.primary ? `0 14px 30px -16px ${theme.glow}, 0 2px 6px rgba(15,27,54,0.04)` : '0 2px 6px rgba(15,27,54,0.04)',
    }}>
      {/* left value */}
      <div style={{
        width: 116, padding: '18px 0',
        background: c.primary
          ? `linear-gradient(135deg, ${theme.primary2}, ${theme.primary})`
          : `linear-gradient(135deg, ${theme.surfaceTint}, #fff)`,
        color: c.primary ? '#fff' : theme.primaryDark,
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
      <WeChatH5Header title="消息通知" theme={theme} onBack={() => nav('profile')}/>
      <ScreenBody theme={theme}>
        <div style={{ padding: '12px 16px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { type: 'charge', icon: 'bolt', tint: theme.success, t: '充电完成', sub: '订单 CG…1842 已自动断电，本次消费 ¥3.50', when: '今天 18:20', unread: true },
            { type: 'warn',   icon: 'warn',  tint: theme.warning, t: '余额不足提醒', sub: '当前余额 ¥3.20 即将无法启动充电，建议充值', when: '今天 09:15', unread: true },
            { type: 'coupon', icon: 'coupon',tint: theme.primary2,t: '新券到账', sub: '获得 1 张「电量档 ¥5 抵扣券」，5 月 31 日到期', when: '昨天 10:30', unread: false },
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
function ProfileScreen({ theme, nav }) {
  return (
    <>
      <ScreenBody theme={theme}>
        {/* hero */}
        <div style={{
          padding: '60px 18px 24px',
          background: `linear-gradient(135deg, ${theme.primary2}, ${theme.primary})`,
          position: 'relative',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 999,
              background: 'rgba(255,255,255,0.22)',
              border: '2px solid rgba(255,255,255,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>陈</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>陈一蓝</div>
              <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.78)', marginTop: 4 }}>UID 2086 4192</div>
              <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '3px 10px', borderRadius: 999,
                  fontSize: 11, fontWeight: 600,
                  background: 'rgba(255,255,255,0.22)',
                  border: '1px solid rgba(255,255,255,0.32)',
                  color: '#fff',
                }}>月卡用户</span>
                <span style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '3px 10px', borderRadius: 999,
                  fontSize: 11,
                  background: 'rgba(255,255,255,0.18)',
                  border: '1px solid rgba(255,255,255,0.28)',
                  color: 'rgba(255,255,255,0.92)',
                }}>认证车辆 ×1</span>
              </div>
            </div>
            <Icon name="gear" size={20} color="rgba(255,255,255,0.85)"/>
          </div>

          {/* mini stats (on colored hero → white text) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 18 }}>
            <HeroStat label="累计充电" value="148" unit="次"/>
            <HeroStat label="累计电量" value="1.2k" unit="度"/>
            <HeroStat label="累计节省" value="¥86"/>
          </div>
        </div>

        {/* shortcut row */}
        <div style={{ padding: '14px 16px 0' }}>
          <Card theme={theme}>
            <div style={{ display: 'flex' }}>
              {[
                { id: 'wallet', icon: 'wallet', label: '钱包', sub: '¥28.40' },
                { id: 'coupons', icon: 'coupon', label: '券/月卡', sub: '3张' },
                { id: 'messages', icon: 'bell', label: '消息', sub: '2新' },
                { id: 'orders', icon: 'list', label: '订单', sub: '本月14' },
              ].map(s => (
                <div key={s.id} onClick={() => nav(s.id)} style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  cursor: 'pointer',
                }}>
                  <Icon name={s.icon} size={22} color={theme.primary2}/>
                  <span style={{ fontSize: 11, color: theme.text }}>{s.label}</span>
                  <span className="mono" style={{ fontSize: 10, color: theme.accent }}>{s.sub}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* service list */}
        <SectionTitle theme={theme}>服务与设置</SectionTitle>
        <div style={{ padding: '0 16px 24px' }}>
          <Card theme={theme} padded={false}>
            {[
              { id: 'fault',   icon: 'wrench',  label: '设备故障报修', sub: '上报问题，最快 2h 响应' },
              { id: 'service', icon: 'headset', label: '在线客服',     sub: '7×24 小时人工 + AI' },
              { id: null,      icon: 'cam',     label: '我的车辆',     sub: '已绑定 1 辆' },
              { id: null,      icon: 'shield',  label: '保险与权益',   sub: '充电意外险 已生效' },
              { id: null,      icon: 'coin',    label: '发票',         sub: '可开 ¥86.20' },
              { id: null,      icon: 'info',    label: '关于我们',     sub: 'v 1.4.2' },
            ].map((r, i, a) => (
              <div key={r.label} onClick={() => r.id && nav(r.id)} style={{
                display: 'flex', alignItems: 'center', padding: '14px 16px',
                borderBottom: i < a.length - 1 ? `1px solid ${theme.line}` : 'none',
                cursor: r.id ? 'pointer' : 'default',
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: `${theme.primary}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginRight: 12,
                }}>
                  <Icon name={r.icon} size={16} color={theme.primary2}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: theme.text }}>{r.label}</div>
                  <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>{r.sub}</div>
                </div>
                <Icon name="right" size={14} color={theme.textDim}/>
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
      <WeChatH5Header title="设备报修" theme={theme} onBack={() => nav('profile')}/>
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
                background: `linear-gradient(135deg, ${theme.surfaceTint}, #FFFFFF)`,
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
                    background: i === 1 ? `${theme.warning}25` : 'rgba(255,255,255,0.04)',
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
      <WeChatH5Header title="客服中心" theme={theme} onBack={() => nav('profile')}/>
      <ScreenBody theme={theme}>
        <div style={{ padding: '14px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* hero entrance */}
          <Card theme={theme} glow style={{ background: `linear-gradient(135deg, ${theme.primary2}, ${theme.primary})`, border: '1px solid rgba(255,255,255,0.18)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: '#E5EAF3', border: '1px solid rgba(255,255,255,0.25)',
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
              '充电桩扫码无反应怎么办？',
              '为什么充满后没有自动断电？',
              '套餐档可以中途结束并退款吗？',
              '月卡用户的最低余额还生效吗？',
              '订单计费看起来不对，怎么申诉？',
            ].map((q, i, a) => (
              <div key={q} style={{
                display: 'flex', alignItems: 'center', padding: '14px 16px',
                borderBottom: i < a.length - 1 ? `1px solid ${theme.line}` : 'none',
              }}>
                <span style={{
                  width: 20, height: 20, borderRadius: 999,
                  background: i < 2 ? `${theme.primary}30` : 'rgba(255,255,255,0.04)',
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
      <div className="mono" style={{ fontSize: 12, color: theme.accent, marginTop: 4 }}>{sub}</div>
      <div style={{ fontSize: 10, color: theme.textMuted, marginTop: 2 }}>{sub2}</div>
    </Card>
  );
}

Object.assign(window, {
  WalletScreen, CouponsScreen, MessagesScreen, ProfileScreen, FaultScreen, ServiceScreen,
  HeroStat,
});
