// screens-operator.jsx — 运营商端
//   OpDashboardScreen   数据看板
//   OpStationsScreen    站点管理
//   OpDevicesScreen     设备监控
//   OpTicketsScreen     故障工单

// ─── OpDashboardScreen ────────────────────────────────────────────
function OpDashboardScreen({ theme, nav }) {
  return (
    <>
      <NativeTitleBar title="运营看板" theme={theme}/>
      <ScreenBody theme={theme}>
        {/* greeting */}
        <div style={{ padding: '8px 16px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: 12, color: theme.textMuted }}>蓝鲨能源 · 西区</div>
              <div style={{ fontSize: 18, color: theme.text, fontWeight: 700, marginTop: 4 }}>张运营，早上好</div>
            </div>
            <span className="chip" style={{ background: `${theme.success}20`, color: theme.success, borderColor: `${theme.success}55` }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: theme.success }} className="blink"/>
              在线 187
            </span>
          </div>
        </div>

        {/* hero — today */}
        <div style={{ padding: '14px 16px 0' }}>
          <Card theme={theme} padded={false} glow style={{
            padding: 18,
            background: `linear-gradient(135deg, ${theme.primary2} 0%, ${theme.primary} 60%, ${theme.primaryDark} 100%)`,
            border: '1px solid rgba(255,255,255,0.18)',
            position: 'relative', overflow: 'hidden',
          }}>
            <svg style={{ position: 'absolute', right: -20, top: -20, opacity: 0.18 }} width="180" height="180" viewBox="0 0 180 180">
              <path d="M10 170 Q40 100 80 120 T150 60 T170 10" stroke="#fff" strokeWidth="1.5" fill="none"/>
              <path d="M10 170 Q40 130 80 140 T150 90 T170 30" stroke="#fff" strokeWidth="1" fill="none" opacity="0.6"/>
            </svg>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', letterSpacing: 1, fontWeight: 700 }}>TODAY · 截至 12:00</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
              <span className="mono" style={{ fontSize: 38, fontWeight: 800, color: '#fff' }}>¥1,284</span>
              <span style={{ fontSize: 12, color: theme.success, fontWeight: 700 }}>
                <Icon name="arrow-up" size={11} color={theme.success}/> 12.4%
              </span>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 4 }}>今日营收 · 较昨日同时段</div>
            {/* mini sparkline */}
            <div style={{ marginTop: 14, display: 'flex', gap: 4, alignItems: 'flex-end', height: 36 }}>
              {[26, 14, 32, 48, 22, 56, 70, 44, 60, 80, 96, 88].map((h, i) => (
                <div key={i} style={{
                  flex: 1, height: h, borderRadius: 2,
                  background: i >= 8 ? '#fff' : 'rgba(255,255,255,0.45)',
                  boxShadow: i >= 8 ? `0 0 8px ${theme.glow}` : 'none',
                }}/>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>
              <span>00</span><span>06</span><span>12</span><span>18</span><span>24</span>
            </div>
          </Card>
        </div>

        {/* KPI grid */}
        <div style={{ padding: '14px 16px 0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          <KpiCard theme={theme} label="今日订单" value="362" delta="+8%" up icon="list"/>
          <KpiCard theme={theme} label="充电度数" value="1,847" unit="度" delta="+15%" up icon="bolt"/>
          <KpiCard theme={theme} label="设备在线率" value="98.2" unit="%" delta="−0.3%" up={false} icon="plug"/>
          <KpiCard theme={theme} label="故障工单" value="4" delta="+2" up={false} icon="ticket" warn/>
        </div>

        {/* station ranking */}
        <SectionTitle theme={theme} right={<span style={{ color: theme.accent }}>导出 →</span>}>站点 TOP 5</SectionTitle>
        <div style={{ padding: '0 16px' }}>
          <Card theme={theme} padded={false}>
            {[
              { n: 1, name: '金牛苑南门车棚', v: 386, b: 100 },
              { n: 2, name: '蓝桥科技园 B 座', v: 318, b: 82 },
              { n: 3, name: '滨河新村东区',   v: 246, b: 64 },
              { n: 4, name: '万达广场西门',   v: 188, b: 49 },
              { n: 5, name: '电子科大北区',   v: 146, b: 38 },
            ].map((r, i, a) => (
              <div key={r.name} style={{
                padding: '12px 14px',
                borderBottom: i < a.length - 1 ? `1px solid ${theme.line}` : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: 6,
                    background: r.n <= 3 ? `${theme.accent}25` : 'rgba(255,255,255,0.05)',
                    color: r.n <= 3 ? theme.accent : theme.textMuted,
                    fontSize: 11, fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }} className="mono">{r.n}</span>
                  <span style={{ flex: 1, fontSize: 13, color: theme.text }}>{r.name}</span>
                  <span className="mono" style={{ fontSize: 13, color: theme.text, fontWeight: 700 }}>¥{r.v}</span>
                </div>
                <div style={{ marginTop: 6, height: 4, background: '#F4F7FC', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{
                    width: `${r.b}%`, height: '100%',
                    background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`,
                    boxShadow: `0 0 6px ${theme.glow}`,
                  }}/>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* alerts */}
        <SectionTitle theme={theme}>实时告警</SectionTitle>
        <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { tint: theme.danger, t: '设备过流', sub: 'C-04 滨河新村东区 · 5.8A 已自动断电', when: '2 分钟前' },
            { tint: theme.warning, t: '设备离线', sub: '蓝桥科技园 B-09 · 离线 18 分钟', when: '18 分钟前' },
            { tint: theme.warning, t: '余额告警', sub: '17 个站点收益账户余额不足', when: '今天 10:30' },
          ].map((a, i) => (
            <Card key={i} theme={theme} padded={false} style={{
              padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
              borderLeft: `3px solid ${a.tint}`,
            }}>
              <Icon name="warn" size={16} color={a.tint} filled/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: theme.text, fontWeight: 600 }}>{a.t}</div>
                <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>{a.sub}</div>
              </div>
              <span style={{ fontSize: 10, color: theme.textDim }}>{a.when}</span>
            </Card>
          ))}
        </div>
      </ScreenBody>
      <OperatorTabBar active="op-dashboard" onTab={nav} theme={theme}/>
    </>
  );
}

function KpiCard({ theme, label, value, unit, delta, up, icon, warn }) {
  return (
    <Card theme={theme} padded={false} style={{ padding: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: warn ? `${theme.danger}20` : `${theme.primary}20`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={icon} size={14} color={warn ? theme.danger : theme.primary2}/>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 600,
          color: up ? theme.success : theme.danger,
        }}>{delta}</span>
      </div>
      <div style={{ marginTop: 12, display: 'flex', alignItems: 'baseline', gap: 3 }}>
        <span className="mono" style={{ fontSize: 24, fontWeight: 800, color: theme.text, letterSpacing: -0.5 }}>{value}</span>
        {unit && <span style={{ fontSize: 11, color: theme.textMuted }}>{unit}</span>}
      </div>
      <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>{label}</div>
    </Card>
  );
}

// ─── OpStationsScreen ─────────────────────────────────────────────
function OpStationsScreen({ theme, nav }) {
  const [filter, setFilter] = React.useState('全部');
  const stations = [
    { name: '金牛苑南门车棚', code: 'BS-001', status: 'ok', online: 12, total: 12, rev: '¥386', alert: 0 },
    { name: '蓝桥科技园 B 座', code: 'BS-014', status: 'warn', online: 15, total: 16, rev: '¥318', alert: 1 },
    { name: '滨河新村东区',   code: 'BS-007', status: 'err', online: 6, total: 8, rev: '¥246', alert: 2 },
    { name: '万达广场西门',   code: 'BS-022', status: 'ok', online: 10, total: 10, rev: '¥188', alert: 0 },
    { name: '电子科大北区',   code: 'BS-031', status: 'ok', online: 14, total: 14, rev: '¥146', alert: 0 },
    { name: '阳光花园西区',   code: 'BS-018', status: 'warn', online: 5, total: 6, rev: '¥122', alert: 1 },
  ];
  return (
    <>
      <NativeTitleBar title="站点管理" theme={theme} right/>
      <ScreenBody theme={theme}>
        {/* search */}
        <div style={{ padding: '8px 16px 0' }}>
          <div style={{
            height: 40, borderRadius: 12, padding: '0 14px',
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#F4F7FC', border: `1px solid ${theme.line}`,
          }}>
            <Icon name="search" size={16} color={theme.textMuted}/>
            <span style={{ flex: 1, fontSize: 13, color: theme.textDim }}>搜索站点名称 / 编号</span>
            <Icon name="filter" size={16} color={theme.textMuted}/>
          </div>
        </div>

        {/* summary */}
        <div style={{ padding: '12px 16px 0' }}>
          <Card theme={theme}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Stat label="站点数" value="32" theme={theme}/>
              <Stat label="正常" value="29" theme={theme} accent/>
              <Stat label="告警" value="3" theme={theme}/>
              <Stat label="离线" value="0" theme={theme}/>
            </div>
          </Card>
        </div>

        {/* filter */}
        <div style={{ display: 'flex', gap: 6, padding: '12px 16px', overflowX: 'auto' }} className="noscroll">
          {['全部', '正常', '告警', '离线', '维护中'].map(f => {
            const on = filter === f;
            return (
              <span key={f} onClick={() => setFilter(f)} className="chip" style={{
                cursor: 'pointer', whiteSpace: 'nowrap',
                background: on ? `${theme.primary}30` : 'rgba(255,255,255,0.04)',
                borderColor: on ? theme.primary : theme.line,
                color: on ? '#fff' : theme.textMuted, fontWeight: on ? 700 : 500,
              }}>{f}</span>
            );
          })}
        </div>

        {/* list */}
        <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {stations.map(s => {
            const tone = s.status === 'ok' ? theme.success : s.status === 'warn' ? theme.warning : theme.danger;
            return (
              <Card key={s.code} theme={theme} padded={false} style={{ padding: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: tone, boxShadow: `0 0 6px ${tone}` }}/>
                      <span style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{s.name}</span>
                      {s.alert > 0 && (
                        <span className="chip" style={{ background: `${tone}20`, color: tone, borderColor: `${tone}55` }}>
                          {s.alert} 告警
                        </span>
                      )}
                    </div>
                    <div className="mono" style={{ fontSize: 11, color: theme.textDim, marginTop: 4 }}>{s.code}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 10 }}>
                      <div>
                        <div style={{ fontSize: 10, color: theme.textMuted }}>桩位</div>
                        <div className="mono" style={{ fontSize: 13, color: theme.text, fontWeight: 600, marginTop: 2 }}>
                          <span style={{ color: tone }}>{s.online}</span>/{s.total}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: theme.textMuted }}>今日收益</div>
                        <div className="mono" style={{ fontSize: 13, color: theme.accent, fontWeight: 600, marginTop: 2 }}>{s.rev}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: theme.textMuted }}>利用率</div>
                        <div className="mono" style={{ fontSize: 13, color: theme.text, fontWeight: 600, marginTop: 2 }}>{Math.round(s.online / s.total * 100)}%</div>
                      </div>
                    </div>
                  </div>
                  <Icon name="right" size={14} color={theme.textDim}/>
                </div>
              </Card>
            );
          })}
        </div>
      </ScreenBody>
      <OperatorTabBar active="op-stations" onTab={nav} theme={theme}/>
    </>
  );
}

// ─── OpDevicesScreen ─────────────────────────────────────────────
function OpDevicesScreen({ theme, nav }) {
  // simulate live tick
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 1200);
    return () => clearInterval(t);
  }, []);
  return (
    <>
      <NativeTitleBar title="设备监控" theme={theme}/>
      <ScreenBody theme={theme}>
        {/* heatmap header */}
        <div style={{ padding: '8px 16px 0' }}>
          <Card theme={theme}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <div style={{ fontSize: 11, color: theme.accent, letterSpacing: 1, fontWeight: 700 }}>LIVE · 当前在线</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 6 }}>
                  <span className="mono" style={{ fontSize: 30, fontWeight: 800, color: '#fff' }}>187</span>
                  <span style={{ fontSize: 13, color: theme.textMuted }}>/ 190 设备</span>
                </div>
                <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 4 }}>当前正在充电 142 台 · 空闲 45 台</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: theme.success }}>98.2%</div>
                <div style={{ fontSize: 11, color: theme.textMuted }}>在线率</div>
              </div>
            </div>
            {/* device grid heatmap */}
            <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gap: 3 }}>
              {Array.from({ length: 80 }).map((_, i) => {
                const r = (i * 7 + tick) % 100;
                const s = r < 70 ? 'charge' : r < 90 ? 'free' : r < 95 ? 'off' : 'err';
                const c = s === 'charge' ? theme.primary
                       : s === 'free'   ? theme.success
                       : s === 'off'    ? theme.textDim
                       :                  theme.danger;
                return (
                  <div key={i} style={{
                    aspectRatio: '1/1', borderRadius: 2,
                    background: `${c}${s === 'off' ? '40' : '88'}`,
                    boxShadow: s === 'err' ? `0 0 4px ${c}` : 'none',
                    transition: 'background .8s ease',
                  }}/>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 12, fontSize: 11, color: theme.textMuted }}>
              <span><span style={{ color: theme.primary }}>■</span> 充电中</span>
              <span><span style={{ color: theme.success }}>■</span> 空闲</span>
              <span><span style={{ color: theme.textDim }}>■</span> 离线</span>
              <span><span style={{ color: theme.danger }}>■</span> 故障</span>
            </div>
          </Card>
        </div>

        {/* power chart */}
        <SectionTitle theme={theme}>当前总负载</SectionTitle>
        <div style={{ padding: '0 16px' }}>
          <Card theme={theme}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <div className="mono" style={{ fontSize: 26, fontWeight: 800, color: theme.accent }}>184.6</div>
                <div style={{ fontSize: 11, color: theme.textMuted }}>kW · 总输出功率</div>
              </div>
              <span className="chip" style={{ background: `${theme.accent}15`, color: theme.accent, borderColor: `${theme.accent}55` }}>
                <span className="data-tick">●</span> 实时
              </span>
            </div>
            {/* line chart */}
            <LineChart theme={theme} tick={tick}/>
          </Card>
        </div>

        {/* fault devices */}
        <SectionTitle theme={theme}>异常设备</SectionTitle>
        <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { id: 'C-04', station: '滨河新村东区', err: '过流自动断电', t: '12 min ago', tone: theme.danger },
            { id: 'B-09', station: '蓝桥科技园 B 座', err: '设备离线', t: '18 min ago', tone: theme.warning },
            { id: 'A-12', station: '阳光花园西区', err: '通讯异常', t: '42 min ago', tone: theme.warning },
          ].map((d, i) => (
            <Card key={d.id} theme={theme} padded={false} style={{
              padding: 14, display: 'flex', gap: 12, alignItems: 'center',
              borderLeft: `3px solid ${d.tone}`,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: `${d.tone}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="plug" size={18} color={d.tone}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{d.id}</span>
                  <span style={{ fontSize: 11, color: theme.textMuted }}>{d.station}</span>
                </div>
                <div style={{ fontSize: 11, color: d.tone, marginTop: 4, fontWeight: 600 }}>{d.err}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 10, color: theme.textDim }}>{d.t}</span>
                <div style={{
                  marginTop: 6, padding: '3px 10px', borderRadius: 999,
                  background: `${theme.primary}30`, color: '#fff',
                  fontSize: 11, fontWeight: 600, cursor: 'pointer',
                }}>派单</div>
              </div>
            </Card>
          ))}
        </div>
      </ScreenBody>
      <OperatorTabBar active="op-devices" onTab={nav} theme={theme}/>
    </>
  );
}

function LineChart({ theme, tick }) {
  const W = 320, H = 110;
  const data = Array.from({ length: 24 }).map((_, i) => 60 + Math.sin((i + tick * 0.5) / 2) * 20 + (i / 24) * 30);
  const max = Math.max(...data) + 10;
  const pts = data.map((v, i) => [i / (data.length - 1) * W, H - (v / max) * H]);
  const d  = 'M' + pts.map(p => p.join(',')).join(' L');
  const da = 'M0,' + H + ' L' + pts.map(p => p.join(',')).join(' L') + ` L${W},${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H + 16}`} width="100%" height="120" style={{ marginTop: 10 }}>
      <defs>
        <linearGradient id="lcFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={theme.primary} stopOpacity="0.5"/>
          <stop offset="100%" stopColor={theme.primary} stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* grid lines */}
      {[0.25, 0.5, 0.75].map(y => (
        <line key={y} x1="0" y1={H * y} x2={W} y2={H * y} stroke={theme.line} strokeWidth="0.5" strokeDasharray="2 4"/>
      ))}
      <path d={da} fill="url(#lcFill)"/>
      <path d={d} stroke={theme.accent} strokeWidth="2" fill="none" strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 6px ${theme.accent}88)` }}/>
      {/* leading dot */}
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="4" fill={theme.accent}/>
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="8" fill={theme.accent} opacity="0.25" className="pulse-glow"/>
      {/* axis labels */}
      {['00', '06', '12', '18', '24'].map((t, i) => (
        <text key={t} x={i * W / 4} y={H + 14} fill={theme.textDim} fontSize="9" textAnchor={i === 0 ? 'start' : i === 4 ? 'end' : 'middle'}>{t}</text>
      ))}
    </svg>
  );
}

// ─── OpTicketsScreen ─────────────────────────────────────────────
function OpTicketsScreen({ theme, nav }) {
  const [tab, setTab] = React.useState('待处理');
  return (
    <>
      <NativeTitleBar title="故障工单" theme={theme}/>
      <ScreenBody theme={theme}>
        {/* status row */}
        <div style={{ padding: '8px 16px 0' }}>
          <Card theme={theme}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <TicketStat theme={theme} v="4" l="待处理" tint={theme.danger}/>
              <TicketStat theme={theme} v="7" l="处理中" tint={theme.warning}/>
              <TicketStat theme={theme} v="23" l="本周已完成" tint={theme.success}/>
              <TicketStat theme={theme} v="2.1h" l="平均时长" tint={theme.accent}/>
            </div>
          </Card>
        </div>

        {/* tabs */}
        <div style={{ display: 'flex', gap: 6, padding: '12px 16px', overflowX: 'auto' }} className="noscroll">
          {['待处理', '处理中', '已完成', '已关闭'].map(t => {
            const on = tab === t;
            return (
              <span key={t} onClick={() => setTab(t)} className="chip" style={{
                cursor: 'pointer', whiteSpace: 'nowrap',
                background: on ? `${theme.primary}30` : 'rgba(255,255,255,0.04)',
                borderColor: on ? theme.primary : theme.line,
                color: on ? '#fff' : theme.textMuted, fontWeight: on ? 700 : 500,
              }}>{t}</span>
            );
          })}
        </div>

        {/* tickets */}
        <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            {
              id: '#4128', priority: '紧急', tone: theme.danger,
              title: '充电中断 · 持续 3 次', station: '滨河新村东区 C-04',
              user: '陈** (138****4126)', when: '12 分钟前', sla: 'SLA 1h 38min',
            },
            {
              id: '#4127', priority: '高', tone: theme.warning,
              title: '设备过流告警', station: '蓝桥科技园 B-09',
              user: '系统自动上报', when: '18 分钟前', sla: 'SLA 5h 42min',
            },
            {
              id: '#4126', priority: '中', tone: theme.primary2,
              title: '扫码无响应', station: '金牛苑南门 A-07',
              user: '王** (152****0218)', when: '52 分钟前', sla: 'SLA 23h',
            },
            {
              id: '#4124', priority: '低', tone: theme.textMuted,
              title: '外观损坏（用户照片）', station: '万达广场 D-02',
              user: '李** (177****4910)', when: '今天 09:30', sla: 'SLA 47h',
            },
          ].map(t => (
            <Card key={t.id} theme={theme} padded={false} style={{ padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className="mono" style={{ fontSize: 12, color: theme.textMuted }}>{t.id}</span>
                    <span className="chip" style={{ background: `${t.tone}25`, color: t.tone, borderColor: `${t.tone}66` }}>{t.priority}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: theme.text, marginTop: 6 }}>{t.title}</div>
                  <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 6, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <span>📍 {t.station}</span>
                    <span>👤 {t.user}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10, color: theme.textDim }}>{t.when}</div>
                  <div className="mono" style={{ fontSize: 11, color: t.tone, marginTop: 4, fontWeight: 600 }}>{t.sla}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <Button kind="ghost" theme={theme} style={{ flex: 1, height: 36, fontSize: 13 }}>转派</Button>
                <Button kind="primary" theme={theme} style={{ flex: 1.4, height: 36, fontSize: 13 }}>接单处理</Button>
              </div>
            </Card>
          ))}
        </div>
      </ScreenBody>
      <OperatorTabBar active="op-tickets" onTab={nav} theme={theme}/>
    </>
  );
}

function TicketStat({ theme, v, l, tint }) {
  return (
    <div style={{ flex: 1, textAlign: 'center' }}>
      <div className="mono" style={{ fontSize: 22, fontWeight: 800, color: tint }}>{v}</div>
      <div style={{ fontSize: 10, color: theme.textMuted, marginTop: 2 }}>{l}</div>
    </div>
  );
}

Object.assign(window, {
  OpDashboardScreen, OpStationsScreen, OpDevicesScreen, OpTicketsScreen,
});
