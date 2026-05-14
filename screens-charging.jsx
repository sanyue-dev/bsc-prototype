// screens-charging.jsx — 车主端充电流程
//   ConfirmScreen   确认充电 / 选档位 (H5)
//   ChargingScreen  充电中实时状态 (原生)
//   CompleteScreen  充电完成结算 (原生)
//   OrdersScreen    订单记录 (H5)
//   OrderDetailScreen 订单详情 (H5)

// ─── ConfirmScreen: 选择计费档位 + 余额校验 + 启动 (H5) ───────────
function ConfirmScreen({ theme, nav }) {
  const [mode, setMode] = React.useState('time');
  const [pack, setPack] = React.useState('4h');
  const [useCoupon, setUseCoupon] = React.useState(true);

  const modes = [
    { id: 'time', label: '按时长', sub: '¥1.0/h', detail: '建议短时' },
    { id: 'kwh',  label: '按电量', sub: '¥0.6/度', detail: '推荐' },
    { id: 'pack', label: '档位套餐', sub: '一口价', detail: '不退余额' },
  ];
  const packs = [
    { id: '2h', t: '2 小时', p: '¥2.0' },
    { id: '4h', t: '4 小时', p: '¥3.5' },
    { id: '8h', t: '通宵 8h', p: '¥5.5' },
  ];

  const estimate = mode === 'time' ? '约 ¥4.00 / 4h'
                 : mode === 'kwh'  ? '约 ¥2.40 / 4h（4度）'
                 :                   packs.find(p => p.id === pack).p;

  return (
    <>
      <WeChatH5Header title="确认充电" theme={theme} onBack={() => nav('station')}/>
      <ScreenBody theme={theme}>
        <div style={{ padding: '14px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* device summary */}
          <Card theme={theme} glow>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: `linear-gradient(135deg, ${theme.primary2}, ${theme.primary})`,
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

          {/* mode picker */}
          <SectionTitle theme={theme}>选择计费方式</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {modes.map(m => {
              const on = mode === m.id;
              return (
                <div key={m.id} onClick={() => setMode(m.id)} style={{
                  padding: '14px 10px', borderRadius: 14, cursor: 'pointer',
                  background: on ? `${theme.primary}25` : theme.surface,
                  border: `1.5px solid ${on ? theme.primary : theme.line}`,
                  boxShadow: on ? `0 8px 24px -8px ${theme.glow}` : 'none',
                  position: 'relative', transition: 'all .15s',
                }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: on ? '#fff' : theme.text }}>{m.label}</div>
                  <div className="mono" style={{ fontSize: 14, color: on ? theme.accent : theme.textMuted, marginTop: 6 }}>{m.sub}</div>
                  <div style={{ fontSize: 10, color: theme.textDim, marginTop: 4 }}>{m.detail}</div>
                  {on && (
                    <div style={{
                      position: 'absolute', top: 6, right: 6,
                      width: 18, height: 18, borderRadius: 999, background: theme.primary,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon name="check" size={12} color="#fff"/>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* pack picker (if pack) */}
          {mode === 'pack' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {packs.map(p => {
                const on = pack === p.id;
                return (
                  <div key={p.id} onClick={() => setPack(p.id)} style={{
                    padding: '12px 8px', borderRadius: 12, textAlign: 'center', cursor: 'pointer',
                    background: on ? `${theme.accent}18` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${on ? theme.accent : theme.line}`,
                  }}>
                    <div style={{ fontSize: 12, color: theme.textMuted }}>{p.t}</div>
                    <div className="mono" style={{ fontSize: 17, fontWeight: 800, color: on ? theme.accent : theme.text, marginTop: 4 }}>{p.p}</div>
                  </div>
                );
              })}
            </div>
          )}

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
              <span className="mono" style={{ fontSize: 16, fontWeight: 700, color: theme.accent }}>{estimate}</span>
            </div>
          </Card>

          {/* min balance check */}
          <Card theme={theme} style={{
            background: `linear-gradient(135deg, ${theme.success}18, ${theme.surface})`,
            border: `1px solid ${theme.success}44`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, color: theme.textMuted }}>余额校验 · 最低要求 ¥3.00</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 6 }}>
                  <span className="mono" style={{ fontSize: 22, fontWeight: 800, color: theme.success }}>¥28.40</span>
                  <span style={{ fontSize: 11, color: theme.success }}>· 满足</span>
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
  const minutes = 38 + Math.floor(tick / 6);
  const seconds = (24 + tick) % 60;
  const cost = (1.20 + tick * 0.0166).toFixed(2);
  const kwh = (2.08 + tick * 0.012).toFixed(2);
  const power = (1.2 + Math.sin(tick / 4) * 0.18).toFixed(2);

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
          {/* outer rotating ring */}
          <svg width="260" height="260" viewBox="0 0 260 260" style={{ position: 'absolute', inset: 0, animation: 'ringSpin 22s linear infinite' }}>
            <defs>
              <linearGradient id="ringG" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={theme.primary}/>
                <stop offset="100%" stopColor={theme.accent}/>
              </linearGradient>
            </defs>
            <circle cx="130" cy="130" r="118" fill="none" stroke="url(#ringG)" strokeWidth="2"
              strokeDasharray="6 4" strokeLinecap="round"/>
          </svg>
          {/* progress arc */}
          <svg width="260" height="260" viewBox="0 0 260 260" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
            <circle cx="130" cy="130" r="104" fill="none" stroke={theme.line} strokeWidth="14"/>
            <circle cx="130" cy="130" r="104" fill="none"
              stroke="url(#ringG)" strokeWidth="14" strokeLinecap="round"
              strokeDasharray={`${(minutes / 240) * 653} 999`}
              style={{ filter: `drop-shadow(0 0 12px ${theme.glow})` }}
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
              textShadow: `0 0 24px ${theme.glow}`,
            }}>
              {String(minutes).padStart(2, '0')}<span style={{ color: theme.textMuted }}>:</span>{String(seconds).padStart(2, '0')}
            </div>
            <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 4 }}>已充电时长</div>
            <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: theme.success, boxShadow: `0 0 8px ${theme.success}` }} className="blink"/>
              <span className="mono" style={{ fontSize: 12, color: theme.success, fontWeight: 700, letterSpacing: 0.5 }}>{power}A · 220V</span>
            </div>
          </div>
        </div>
      </div>

      {/* live stats */}
      <div style={{ padding: '20px 16px 0' }}>
        <Card theme={theme}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <Stat label="已消费"   value={`¥${cost}`} theme={theme} accent/>
            <Stat label="已充电量" value={kwh} unit="度" theme={theme}/>
            <Stat label="预计剩余" value="≈3:22" theme={theme}/>
          </div>
          {/* mini bar */}
          <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', fontSize: 10, color: theme.textMuted }}>
            <span>已用 38 / 240 分钟</span>
            <span className="mono" style={{ color: theme.text }}>16%</span>
          </div>
          <div style={{ marginTop: 4, height: 6, background: '#F4F7FC', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{
              width: `${(minutes / 240) * 100}%`, height: '100%',
              background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`,
              boxShadow: `0 0 12px ${theme.glow}`,
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
            <span className="mono data-tick" style={{ fontSize: 11, color: theme.accent }}>● LIVE</span>
          </div>
          <Waveform theme={theme} tick={tick}/>
        </Card>
      </div>

      {/* meta row */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <MetaPill theme={theme} label="桩号" value="A-03"/>
          <MetaPill theme={theme} label="档位" value="电量档"/>
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
      background: '#F4F7FC', border: `1px solid ${theme.line}`,
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
            background: isLast
              ? `linear-gradient(180deg, ${theme.accent}, ${theme.primary})`
              : `linear-gradient(180deg, ${theme.primary2}, ${theme.primary})`,
            opacity: isLast ? 1 : 0.55 + (i / bars) * 0.4,
            boxShadow: isLast ? `0 0 8px ${theme.glow}` : 'none',
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
            background: `radial-gradient(120% 120% at 30% 20%, ${theme.success}, ${theme.bg1} 80%)`,
            border: `2px solid ${theme.success}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 40px ${theme.success}55`,
          }} className="pulse-glow">
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
              fontSize: 36, fontWeight: 800, color: theme.accent,
              textShadow: `0 0 18px ${theme.accent}66`,
            }}>¥7.50</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: theme.textMuted, marginTop: 8 }}>
            <span>用券抵扣 ¥1.00</span>
            <span className="mono">已扣余额 ¥7.50</span>
          </div>

          {/* dashed divider */}
          <div style={{ borderTop: `1px dashed ${theme.line}`, margin: '14px -4px' }}/>

          {/* line items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
            {[
              ['桩号', 'A-03 · 金牛苑南门'],
              ['计费方式', '电量档 ¥0.6/度'],
              ['开始时间', '08:30:12'],
              ['结束时间', '12:38:45'],
              ['总时长', '4:08:33'],
              ['总电量', '14.18 度'],
              ['原价', '¥8.50'],
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
            background: '#F4F7FC',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: 12, color: theme.textMuted }}>剩余余额</span>
            <span className="mono" style={{ fontSize: 16, fontWeight: 700, color: theme.success }}>¥20.90</span>
          </div>
        </div>

        {/* footprint */}
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          <FootCard theme={theme} icon="bolt" label="本次电量" value="14.18度"/>
          <FootCard theme={theme} icon="clock" label="充电时长" value="4h 08m"/>
          <FootCard theme={theme} icon="shield" label="碳减排" value="≈14kg"/>
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
      <WeChatH5Header title="我的订单" theme={theme} onBack={() => nav('home')}/>
      <ScreenBody theme={theme}>
        {/* filter tabs */}
        <div style={{ display: 'flex', gap: 6, padding: '12px 16px', overflowX: 'auto' }} className="noscroll">
          {['全部', '充电中', '已完成', '退款', '异常'].map(f => {
            const on = filter === f;
            return (
              <span key={f} onClick={() => setFilter(f)} className="chip" style={{
                cursor: 'pointer', whiteSpace: 'nowrap',
                background: on ? `${theme.primary}30` : 'rgba(255,255,255,0.04)',
                borderColor: on ? theme.primary : theme.line,
                color: on ? '#fff' : theme.textMuted,
              }}>{f}</span>
            );
          })}
        </div>

        {/* summary */}
        <div style={{ padding: '0 16px 6px' }}>
          <Card theme={theme} style={{
            background: `linear-gradient(135deg, ${theme.primary}20, ${theme.surface})`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Stat label="本月订单" value="14" theme={theme}/>
              <Stat label="本月消费" value="¥86.20" theme={theme} accent/>
              <Stat label="本月电量" value="142度" theme={theme}/>
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
                                : '#F4F7FC',
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
                    color: o.status === '充电中' ? theme.primary2 : theme.text,
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
  { id: 'CG20260514-0938', station: '金牛苑南门车棚', status: '充电中', plug: 'A-03', mode: '电量档', duration: '00:38:24', date: '今天 08:30', amount: '¥1.20', kwh: '2.08度' },
  { id: 'CG20260513-1842', station: '蓝桥科技园 B 座', status: '已完成', plug: 'B-07', mode: '套餐 4h', duration: '04:00:00', date: '昨天 14:20', amount: '¥3.50', kwh: '套餐档' },
  { id: 'CG20260512-2210', station: '金牛苑南门车棚', status: '已完成', plug: 'A-01', mode: '时长档', duration: '02:15:30', date: '5月12日', amount: '¥2.30', kwh: '—' },
  { id: 'CG20260510-0712', station: '滨河新村东区',   status: '异常',   plug: 'C-04', mode: '电量档', duration: '00:08:12', date: '5月10日', amount: '¥0.20', kwh: '0.32度' },
  { id: 'CG20260508-1606', station: '蓝桥科技园 B 座', status: '已完成', plug: 'B-12', mode: '电量档', duration: '03:42:00', date: '5月8日',  amount: '¥6.40', kwh: '10.67度' },
];

// ─── OrderDetailScreen (H5) ──────────────────────────────────────
function OrderDetailScreen({ theme, nav }) {
  return (
    <>
      <WeChatH5Header title="订单详情" theme={theme} onBack={() => nav('orders')}/>
      <ScreenBody theme={theme}>
        <div style={{ padding: '14px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* status hero */}
          <Card theme={theme} glow style={{ background: `linear-gradient(135deg, ${theme.primary}30, ${theme.surface})` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span className="chip" style={{ background: `${theme.success}20`, color: theme.success, borderColor: `${theme.success}55` }}>已完成</span>
                <div className="mono" style={{ fontSize: 36, fontWeight: 800, color: theme.primary, marginTop: 8 }}>¥3.50</div>
                <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>套餐档 · 4 小时</div>
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
                background: `linear-gradient(180deg, ${theme.primary}, ${theme.success})`,
              }}/>
              {[
                { t: '14:20:12', label: '扫码开始充电', sub: 'B-07 · 电量档', dot: theme.primary },
                { t: '14:32:00', label: '电流稳定', sub: '功率 1.18A · 220V', dot: theme.primary2 },
                { t: '16:48:15', label: '电池接近充满', sub: '电流降至 0.4A', dot: theme.accent },
                { t: '18:20:08', label: '自动断电完成', sub: '总电量 10.67 度', dot: theme.success },
              ].map((e, i) => (
                <div key={i} style={{ position: 'relative', paddingBottom: 14 }}>
                  <div style={{
                    position: 'absolute', left: -22, top: 4,
                    width: 12, height: 12, borderRadius: 999,
                    background: e.dot, boxShadow: `0 0 8px ${e.dot}`,
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
              ['计费规则', 'RULE-B / 蓝鲨标准'],
              ['计费方式', '套餐档 · 4 小时'],
              ['总时长', '04:00:00'],
              ['总电量', '10.67 度'],
              ['原价', '¥3.50'],
              ['优惠', '无'],
              ['实付', '¥3.50（余额）'],
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
