// screens-charging.jsx — 车主端充电流程
//   ConfirmScreen   确认充电 / 选档位 (H5)
//   ChargingScreen  充电中实时状态 (原生)
//   CompleteScreen  充电完成结算 (原生)
//   OrdersScreen    订单记录 (H5)
//   OrderDetailScreen 订单详情 (H5)

// ─── ConfirmScreen: 选择计费档位 + 余额校验 + 启动 (H5) ───────────
function ConfirmScreen({ theme, nav }) {
  const [useCoupon, setUseCoupon] = React.useState(true);

  return (
    <>
      <NativeTitleBar title="确认充电" theme={theme} onBack={() => nav('station')}/>
      <ScreenBody theme={theme}>
        <div style={{ padding: '14px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* device summary */}
          <Card theme={theme} glow>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: '#F0F0F0',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                position: 'relative',
              }}>
                <Icon name="plug" size={26} color="#fff" filled/>
                <span className="blink" style={{
                  position: 'absolute', top: 4, right: 4,
                  width: 6, height: 6, borderRadius: 999,
                  background: theme.success, boxShadow: `0 0 6px ${theme.success}`,
                }}/>
              </div>
              <div style={{ flex: 1 }}>
                <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: theme.text }}>A-03</div>
                <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 2 }}>金牛苑南门车棚</div>
                <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
                  <span className="chip" style={{ background: `${theme.success}20`, color: theme.success, borderColor: `${theme.success}55` }}>设备在线</span>
                  <span className="chip">220V · 5A 上限</span>
                </div>
              </div>
            </div>
          </Card>

          {/* billing info */}
          <SectionTitle theme={theme}>本次计费方式</SectionTitle>
          <Card theme={theme} padded={false}>
            <div style={{ padding: '12px 16px', borderBottom: `1px solid ${theme.line}` }}>
              <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 8 }}>服务费（按功率档位）</div>
              {[
                { tier: '档位一 · 0–100W',    rate: '¥0.40/小时' },
                { tier: '档位二 · 101–200W',  rate: '¥0.50/小时' },
                { tier: '档位三 · 201–300W',  rate: '¥0.60/小时' },
                { tier: '档位四 · 301–400W',  rate: '¥0.70/小时' },
              ].map(t => (
                <div key={t.tier} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: theme.textDim }}>{t.tier}</span>
                  <span className="mono" style={{ fontSize: 11, color: theme.text }}>{t.rate}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: theme.textMuted }}>电费（统一单价）</span>
              <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: theme.accent }}>¥0.60/度</span>
            </div>
          </Card>

          {/* coupon row */}
          <Card theme={theme} padded={false}>
            <div onClick={() => setUseCoupon(!useCoupon)} style={{
              display: 'flex', alignItems: 'center', padding: '14px 16px', cursor: 'pointer',
              borderBottom: `1px solid ${theme.line}`,
            }}>
              <Icon name="coupon" size={18} color={theme.primary2}/>
              <div style={{ flex: 1, marginLeft: 12 }}>
                <div style={{ fontSize: 13, color: theme.text, fontWeight: 600 }}>新人券 · 立减 ¥1.0</div>
                <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>满 2 元可用 · 5 月 31 日到期</div>
              </div>
              <div style={{
                width: 38, height: 22, borderRadius: 999, position: 'relative',
                background: useCoupon ? theme.primary : 'rgba(255,255,255,0.10)',
                transition: 'background .2s',
              }}>
                <div style={{
                  position: 'absolute', top: 2, left: useCoupon ? 18 : 2,
                  width: 18, height: 18, borderRadius: 999, background: '#fff',
                  transition: 'left .2s',
                }}/>
              </div>
            </div>
            <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: theme.text }}>预估费用</span>
              <span className="mono" style={{ fontSize: 16, fontWeight: 700, color: theme.accent }}>约 ¥0.72 / 4h（1.2 度）</span>
            </div>
          </Card>

          {/* min balance check */}
          <Card theme={theme} style={{
            background: `${theme.success}12`,
            border: `1px solid ${theme.success}44`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, color: theme.textMuted }}>余额校验 · 最低要求 ¥3.00</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 6 }}>
                  <span className="mono" style={{ fontSize: 22, fontWeight: 800, color: theme.text }}>¥28.40</span>
                  <span style={{ fontSize: 11, color: theme.textMuted }}>· 满足</span>
                </div>
              </div>
              <Icon name="check" size={28} color={theme.success}/>
            </div>
          </Card>

          {/* CTA */}
          <Button kind="primary" theme={theme} full onClick={() => nav('charging')}>
            <Icon name="bolt" size={18} color="#fff" filled/>
            立即开始充电
          </Button>
          <div style={{ fontSize: 11, color: theme.textDim, textAlign: 'center' }}>
            点击即表示同意《充电服务协议》
          </div>
        </div>
      </ScreenBody>
    </>
  );
}

// ─── ChargingScreen (原生) — 实时充电中 ───────────────────────────
function ChargingScreen({ theme, nav }) {
  // simulate live counters with state
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 1000);
    return () => clearInterval(t);
  }, []);
  // base values + small drift
  const minutes = 138 + Math.floor(tick / 60);
  const seconds = tick % 60;
  const kwh = (0.37 + tick * (0.160 / 3600)).toFixed(3);
  const tier = watts <= 100 ? '档位一' : watts <= 200 ? '档位二' : watts <= 300 ? '档位三' : '档位四';
  const serviceFee = (1.15 + tick * (0.50 / 3600)).toFixed(2);
  const elecFee = (parseFloat(kwh) * 0.60).toFixed(2);
  const cost = (parseFloat(serviceFee) + parseFloat(elecFee)).toFixed(2);
  const watts = Math.round(160 + Math.sin(tick / 8) * 14);

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: theme.bg1,
      position: 'relative', overflow: 'hidden',
    }}>
      <NativeTitleBar title="正在充电" theme={theme} onBack={() => nav('home')}/>

      {/* radial dial */}
      <div style={{ padding: '0 16px', position: 'relative' }}>
        <div style={{
          margin: '8px auto 0', width: 260, height: 260, position: 'relative',
        }}>
          {/* progress arc */}
          <svg width="260" height="260" viewBox="0 0 260 260" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
            <circle cx="130" cy="130" r="104" fill="none" stroke={theme.line} strokeWidth="14"/>
            <circle cx="130" cy="130" r="104" fill="none"
              stroke={theme.primary} strokeWidth="14" strokeLinecap="round"
              strokeDasharray={`${(minutes / 240) * 653} 999`}
            />
          </svg>
          {/* inner */}
          <div style={{
            position: 'absolute', inset: 26, borderRadius: 999,
            background: '#fff',
            border: `1px solid ${theme.line}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ fontSize: 10, color: theme.accent, letterSpacing: 2, fontWeight: 700 }}>CHARGING</div>
            <div className="mono" style={{
              fontSize: 48, fontWeight: 800, color: theme.text, marginTop: 6, letterSpacing: -0.6,
            }}>
              {String(minutes).padStart(2, '0')}<span style={{ color: theme.textMuted }}>:</span>{String(seconds).padStart(2, '0')}
            </div>
            <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 4 }}>已充电时长</div>
            <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: theme.success, boxShadow: `0 0 8px ${theme.success}` }} className="blink"/>
              <span className="mono" style={{ fontSize: 12, color: theme.success, fontWeight: 700, letterSpacing: 0.5 }}>{watts}W · 档位一</span>
            </div>
          </div>
        </div>
      </div>

      {/* live stats */}
      <div style={{ padding: '20px 16px 0' }}>
        <Card theme={theme}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 12, color: theme.text, fontWeight: 600 }}>已消费</span>
            <span className="mono" style={{ fontSize: 24, fontWeight: 800, color: theme.text }}>¥{cost}</span>
          </div>
          <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, background: theme.bg0, border: `1px solid ${theme.line}` }}>
              <div style={{ fontSize: 10, color: theme.textMuted }}>服务费</div>
              <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: theme.text, marginTop: 2 }}>¥{serviceFee}</div>
            </div>
            <div style={{ flex: 1, padding: '8px 10px', borderRadius: 8, background: theme.bg0, border: `1px solid ${theme.line}` }}>
              <div style={{ fontSize: 10, color: theme.textMuted }}>电费 · {kwh}度</div>
              <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: theme.text, marginTop: 2 }}>¥{elecFee}</div>
            </div>
          </div>
          {/* mini bar */}
          <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', fontSize: 10, color: theme.textMuted }}>
            <span>已充 {minutes} 分钟 · 预计还需 ≈60 分钟</span>
            <span className="mono" style={{ color: theme.textMuted }}>约 70%</span>
          </div>
          <div style={{ marginTop: 4, height: 6, background: theme.bg0, borderRadius: 999, overflow: 'hidden' }}>
            <div style={{
              width: '70%', height: '100%',
              background: theme.primary,
              transition: 'width 1s linear',
            }}/>
          </div>
        </Card>
      </div>

      {/* live waveform */}
      <div style={{ padding: '14px 16px 0' }}>
        <Card theme={theme}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 12, color: theme.text, fontWeight: 600 }}>实时功率</span>
            <span className="mono data-tick" style={{ fontSize: 11, color: theme.textMuted }}>● LIVE</span>
          </div>
          <Waveform theme={theme} tick={tick}/>
        </Card>
      </div>

      {/* meta row */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <MetaPill theme={theme} label="桩号" value="A-03"/>
          <MetaPill theme={theme} label="功率" value={`${watts}W`}/>
          <MetaPill theme={theme} label="设备温度" value="28°C"/>
        </div>
      </div>

      {/* bottom actions */}
      <div style={{ flex: 1 }}/>
      <div style={{ padding: '14px 16px 28px', display: 'flex', gap: 10 }}>
        <Button kind="ghost" theme={theme} style={{ flex: 1 }}>
          <Icon name="pause" size={16} color={theme.text}/>
          暂停
        </Button>
        <Button kind="danger" theme={theme} style={{ flex: 1.4 }} onClick={() => nav('complete')}>
          <Icon name="stop" size={14} color="#fff"/>
          结束充电
        </Button>
      </div>
    </div>
  );
}

function MetaPill({ theme, label, value }) {
  return (
    <div style={{
      flex: 1, padding: '8px 10px', borderRadius: 10,
      background: theme.bg0, border: `1px solid ${theme.line}`,
    }}>
      <div style={{ fontSize: 10, color: theme.textMuted }}>{label}</div>
      <div className="mono" style={{ fontSize: 13, color: theme.text, fontWeight: 700, marginTop: 2 }}>{value}</div>
    </div>
  );
}

function Waveform({ theme, tick }) {
  const bars = 40;
  return (
    <div style={{ marginTop: 10, height: 60, display: 'flex', alignItems: 'flex-end', gap: 3 }}>
      {Array.from({ length: bars }).map((_, i) => {
        const h = 18 + Math.abs(Math.sin((i + tick) * 0.4) * 32) + Math.abs(Math.cos((i + tick) * 0.18) * 12);
        const isLast = i >= bars - 4;
        return (
          <div key={i} style={{
            flex: 1, height: h, borderRadius: 2,
            background: isLast ? theme.accent : theme.primary,
            opacity: isLast ? 1 : 0.55 + (i / bars) * 0.4,
            transition: 'height .4s ease',
          }}/>
        );
      })}
    </div>
  );
}

// ─── CompleteScreen (原生) — 充电完成结算 ─────────────────────────
function CompleteScreen({ theme, nav }) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: theme.bg1,
    }}>
      <NativeTitleBar title="充电完成" theme={theme}/>

      <div style={{ padding: '8px 16px 0', flex: 1, overflowY: 'auto' }} className="noscroll">
        {/* check badge */}
        <div style={{ textAlign: 'center', padding: '12px 0 18px' }}>
          <div style={{
            width: 88, height: 88, borderRadius: 999, margin: '0 auto',
            background: theme.success,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="check" size={42} color="#fff"/>
          </div>
          <div style={{ marginTop: 14, fontSize: 18, fontWeight: 700, color: theme.text }}>充电完成 · 已自动断电</div>
          <div style={{ marginTop: 4, fontSize: 12, color: theme.textMuted }}>2026/05/14 · 完成时间 12:38</div>
        </div>

        {/* settlement ticket */}
        <div style={{
          position: 'relative',
          background: theme.surface,
          border: `1px solid ${theme.line}`,
          borderRadius: 18,
          padding: '18px 18px 14px',
        }}>
          {/* 票根 notch */}
          <div style={{
            position: 'absolute', left: -6, top: '50%', width: 12, height: 12, borderRadius: 999,
            background: theme.bg1, border: `1px solid ${theme.line}`,
          }}/>
          <div style={{
            position: 'absolute', right: -6, top: '50%', width: 12, height: 12, borderRadius: 999,
            background: theme.bg1, border: `1px solid ${theme.line}`,
          }}/>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <div style={{ fontSize: 11, color: theme.accent, letterSpacing: 1, fontWeight: 700 }}>SETTLEMENT</div>
              <div style={{ fontSize: 15, color: theme.text, fontWeight: 700, marginTop: 4 }}>本次结算</div>
            </div>
            <div className="mono" style={{
              fontSize: 36, fontWeight: 800, color: theme.text,
            }}>¥1.48</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: theme.textMuted, marginTop: 8 }}>
            <span>用券抵扣 ¥1.00</span>
            <span className="mono">已扣余额 ¥1.48</span>
          </div>

          {/* dashed divider */}
          <div style={{ borderTop: `1px dashed ${theme.line}`, margin: '14px -4px' }}/>

          {/* line items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
            {[
              ['桩号', 'A-03 · 金牛苑南门'],
              ['功率档位', '档位一 · 160W'],
              ['开始时间', '08:30:12'],
              ['结束时间', '12:38:45'],
              ['总时长', '4h 08m 33s'],
              ['服务费', '¥2.08（2h 29m · 档位二）'],
              ['总用电', '0.66 度'],
              ['电费', '¥0.40'],
              ['小计', '¥2.48'],
              ['优惠券', '−¥1.00'],
            ].map(r => (
              <div key={r[0]} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: theme.textMuted }}>{r[0]}</span>
                <span className="mono" style={{ color: theme.text }}>{r[1]}</span>
              </div>
            ))}
          </div>

          {/* refund / balance */}
          <div style={{
            marginTop: 14, padding: '10px 12px', borderRadius: 10,
            background: theme.bg0,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: 12, color: theme.textMuted }}>剩余余额</span>
            <span className="mono" style={{ fontSize: 16, fontWeight: 700, color: theme.text }}>¥26.92</span>
          </div>
        </div>

        {/* footprint */}
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          <FootCard theme={theme} icon="bolt" label="本次电量" value="0.66度"/>
          <FootCard theme={theme} icon="clock" label="充电时长" value="4h 09m"/>
          <FootCard theme={theme} icon="shield" label="碳减排" value="≈0.7kg"/>
        </div>
      </div>

      {/* bottom CTA */}
      <div style={{ padding: '14px 16px 28px', display: 'flex', gap: 10 }}>
        <Button kind="ghost" theme={theme} style={{ flex: 1 }} onClick={() => nav('orders')}>查看订单</Button>
        <Button kind="primary" theme={theme} style={{ flex: 1.4 }} onClick={() => nav('home')}>完成</Button>
      </div>
    </div>
  );
}

function FootCard({ theme, icon, label, value }) {
  return (
    <Card theme={theme} padded={false} style={{ padding: 10 }}>
      <Icon name={icon} size={16} color={theme.accent}/>
      <div style={{ fontSize: 10, color: theme.textMuted, marginTop: 4 }}>{label}</div>
      <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: theme.text, marginTop: 2 }}>{value}</div>
    </Card>
  );
}

// ─── OrdersScreen (H5) ────────────────────────────────────────────
function OrdersScreen({ theme, nav }) {
  const [filter, setFilter] = React.useState('全部');
  return (
    <>
      <NativeTitleBar title="我的订单" theme={theme} onBack={() => nav('home')}/>
      <ScreenBody theme={theme}>
        {/* filter tabs */}
        <div style={{ display: 'flex', gap: 6, padding: '12px 16px', overflowX: 'auto' }} className="noscroll">
          {['全部', '充电中', '已完成', '退款', '异常'].map(f => {
            const on = filter === f;
            return (
              <span key={f} onClick={() => setFilter(f)} className="chip" style={{
                cursor: 'pointer', whiteSpace: 'nowrap',
                background: on ? theme.primary : '#fff',
                borderColor: on ? theme.primary : theme.line,
                color: on ? '#fff' : theme.textMuted,
              }}>{f}</span>
            );
          })}
        </div>

        {/* summary */}
        <div style={{ padding: '0 16px 6px' }}>
          <Card theme={theme} style={{
            background: theme.surface,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Stat label="本月订单" value="14" theme={theme}/>
              <Stat label="本月消费" value="¥86.20" theme={theme} accent/>
              <Stat label="本月电量" value="24度" theme={theme}/>
            </div>
          </Card>
        </div>

        {/* list */}
        <div style={{ padding: '8px 16px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ORDERS.map(o => (
            <Card key={o.id} theme={theme} onClick={() => nav('order')}
              padded={false} style={{ padding: 14, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{o.station}</span>
                    <span className="chip" style={{
                      background: o.status === '充电中' ? theme.primary
                                : o.status === '异常'   ? `${theme.danger}15`
                                : theme.bg0,
                      color: o.status === '充电中' ? '#fff'
                           : o.status === '异常'   ? theme.danger : theme.textMuted,
                      borderColor: o.status === '充电中' ? theme.primary
                                 : o.status === '异常'   ? `${theme.danger}55` : theme.line,
                      fontWeight: o.status === '充电中' ? 700 : 500,
                    }}>{o.status}</span>
                  </div>
                  <div className="mono" style={{ fontSize: 11, color: theme.textDim, marginTop: 4 }}>{o.id}</div>
                  <div style={{ marginTop: 8, display: 'flex', gap: 12, fontSize: 11, color: theme.textMuted }}>
                    <span>桩 {o.plug}</span>
                    <span>·</span>
                    <span>{o.mode}</span>
                    <span>·</span>
                    <span className="mono">{o.duration}</span>
                  </div>
                  <div style={{ fontSize: 10, color: theme.textDim, marginTop: 4 }}>{o.date}</div>
                </div>
                <div style={{ textAlign: 'right', marginLeft: 8 }}>
                  <div className="mono" style={{
                    fontSize: 18, fontWeight: 700,
                    color: theme.text,
                  }}>{o.amount}</div>
                  <div style={{ fontSize: 10, color: theme.textMuted, marginTop: 2 }}>{o.kwh}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScreenBody>
    </>
  );
}

const ORDERS = [
  { id: 'CG20260514-0938', station: '金牛苑南门车棚', status: '充电中', plug: 'A-03', duration: '02:18:24', date: '今天 08:30', amount: '¥1.37', kwh: '0.37度' },
  { id: 'CG20260513-1842', station: '蓝桥科技园 B 座', status: '已完成', plug: 'B-07', duration: '04:00:00', date: '昨天 14:20', amount: '¥2.43', kwh: '0.72度' },
  { id: 'CG20260512-2210', station: '金牛苑南门车棚', status: '已完成', plug: 'A-01', duration: '02:15:30', date: '5月12日', amount: '¥1.33', kwh: '0.34度' },
  { id: 'CG20260510-0712', station: '滨河新村东区',   status: '异常',   plug: 'C-04', duration: '00:08:12', date: '5月10日', amount: '¥0.09', kwh: '0.03度' },
  { id: 'CG20260508-1606', station: '蓝桥科技园 B 座', status: '已完成', plug: 'B-12', duration: '03:42:00', date: '5月8日',  amount: '¥2.25', kwh: '0.67度' },
];

// ─── OrderDetailScreen (H5) ──────────────────────────────────────
function OrderDetailScreen({ theme, nav }) {
  return (
    <>
      <NativeTitleBar title="订单详情" theme={theme} onBack={() => nav('orders')}/>
      <ScreenBody theme={theme}>
        <div style={{ padding: '14px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* status hero */}
          <Card theme={theme} style={{ background: theme.surface }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span className="chip" style={{ background: `${theme.success}20`, color: theme.success, borderColor: `${theme.success}55` }}>已完成</span>
                <div className="mono" style={{ fontSize: 36, fontWeight: 800, color: theme.text, marginTop: 8 }}>¥2.43</div>
                <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>蓝桥科技园 B 座 · B-07 · 180W</div>
              </div>
              <div style={{
                width: 72, height: 72, borderRadius: 18,
                background: `${theme.success}20`, border: `1px solid ${theme.success}55`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="check" size={34} color={theme.success}/>
              </div>
            </div>
          </Card>

          {/* timeline */}
          <SectionTitle theme={theme}>充电过程</SectionTitle>
          <Card theme={theme}>
            <div style={{ position: 'relative', paddingLeft: 24 }}>
              <div style={{
                position: 'absolute', left: 8, top: 6, bottom: 6, width: 2,
                background: theme.primary,
              }}/>
              {[
                { t: '14:20:12', label: '扫码开始充电', sub: 'B-07 · 1.2A · 220V', dot: theme.primary },
                { t: '14:32:00', label: '电流稳定', sub: '功率 1.18A · 220V', dot: theme.primary2 },
                { t: '16:48:15', label: '电池接近充满', sub: '电流降至 0.4A', dot: theme.accent },
                { t: '18:20:08', label: '自动断电完成', sub: '总电量 1.68 度', dot: theme.success },
              ].map((e, i) => (
                <div key={i} style={{ position: 'relative', paddingBottom: 14 }}>
                  <div style={{
                    position: 'absolute', left: -22, top: 4,
                    width: 12, height: 12, borderRadius: 999,
                    background: e.dot,
                    border: `2px solid ${theme.bg1}`,
                  }}/>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: theme.text, fontWeight: 600 }}>{e.label}</span>
                    <span className="mono" style={{ fontSize: 11, color: theme.textMuted }}>{e.t}</span>
                  </div>
                  <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 3 }}>{e.sub}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* details list */}
          <SectionTitle theme={theme}>订单信息</SectionTitle>
          <Card theme={theme} padded={false}>
            {[
              ['订单号', 'CG20260513-1842'],
              ['站点', '蓝桥科技园 B 座'],
              ['桩号', 'B-07'],
              ['功率档位', '档位一 · 180W'],
              ['总时长', '04:00:00'],
              ['服务费', '¥2.00（4h · 档位二）'],
              ['总用电', '0.72 度'],
              ['电费', '¥0.43（0.72度）'],
              ['优惠', '无'],
              ['实付', '¥2.43（余额）'],
            ].map((r, i, a) => (
              <div key={r[0]} style={{
                padding: '12px 16px',
                borderBottom: i < a.length - 1 ? `1px solid ${theme.line}` : 'none',
                display: 'flex', justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: 12, color: theme.textMuted }}>{r[0]}</span>
                <span className="mono" style={{ fontSize: 12, color: theme.text }}>{r[1]}</span>
              </div>
            ))}
          </Card>

          <div style={{ display: 'flex', gap: 10 }}>
            <Button kind="ghost" theme={theme} style={{ flex: 1 }} onClick={() => nav('fault')}>申请报修</Button>
            <Button kind="ghost" theme={theme} style={{ flex: 1 }}>申请开票</Button>
          </div>
        </div>
      </ScreenBody>
    </>
  );
}

Object.assign(window, {
  ConfirmScreen, ChargingScreen, CompleteScreen,
  OrdersScreen, OrderDetailScreen,
});
