// admin-screens-4.jsx — 报表中心

// ── 日期标签生成 ──────────────────────────────────────────────────
function buildDateLabels(n) {
  const base = new Date(2026, 5, 10)
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(base)
    d.setDate(base.getDate() - (n - 1 - i))
    return `${d.getMonth()+1}/${String(d.getDate()).padStart(2,'0')}`
  })
}

// ── 固定趋势数据（确定性，不随机） ──────────────────────────────
const LABELS_7  = buildDateLabels(7)
const LABELS_30 = buildDateLabels(30)
const LABELS_90 = buildDateLabels(90)

// 收入序列（元）
const REV_7  = [820, 950, 880, 1120, 980, 1040, 1150]
function genRevSeries(n) {
  return Array.from({ length: n }, (_, i) =>
    Math.round(950 + 170 * Math.sin(i * 0.38 + 1.2) + i * 1.6)
  )
}
const REV_30 = genRevSeries(30)
const REV_90 = genRevSeries(90)

// 订单量序列
const ORD_7  = [284, 328, 305, 391, 342, 362, 401]
const ORD_30 = REV_30.map(v => Math.round(v / 2.82))
const ORD_90 = REV_90.map(v => Math.round(v / 2.80))

// 设备在线率序列（%）
const ONLINE_7  = [91.2, 92.5, 90.8, 93.1, 91.8, 92.0, 91.5]
const ONLINE_30 = Array.from({ length: 30 }, (_, i) => +(91 + 2.1 * Math.sin(i * 0.5)).toFixed(1))
const ONLINE_90 = Array.from({ length: 90 }, (_, i) => +(91 + 2.4 * Math.sin(i * 0.3 + 0.5)).toFixed(1))

// 新增用户序列
const USR_7  = [48, 55, 42, 68, 60, 52, 64]
const USR_30 = Array.from({ length: 30 }, (_, i) => Math.round(52 + 18 * Math.sin(i * 0.44)))
const USR_90 = Array.from({ length: 90 }, (_, i) => Math.round(50 + 20 * Math.sin(i * 0.32 + 0.8) + i * 0.08))

// 高峰时段（0-23时，全天订单分布）
const HOUR_DATA = [
  {label:'0时',v:12},{label:'1时',v:8},{label:'2时',v:5},{label:'3时',v:3},
  {label:'4时',v:4},{label:'5时',v:18},{label:'6时',v:45},{label:'7时',v:82},
  {label:'8时',v:95},{label:'9时',v:78},{label:'10时',v:60},{label:'11时',v:48},
  {label:'12时',v:42},{label:'13时',v:38},{label:'14时',v:35},{label:'15时',v:32},
  {label:'16时',v:38},{label:'17时',v:52},{label:'18时',v:65},{label:'19时',v:80},
  {label:'20时',v:92},{label:'21时',v:88},{label:'22时',v:72},{label:'23时',v:38},
]

// 站点报表数据
const STATION_REPORT = [
  { name:'天府软件园D区',  util:87, rev7:1842, ord7:634, online:94 },
  { name:'滨河新村东区',   util:78, rev7:1620, ord7:558, online:100 },
  { name:'九眼桥公租房',   util:74, rev7:1540, ord7:531, online:96 },
  { name:'金牛苑南门车棚', util:72, rev7:1498, ord7:516, online:96 },
  { name:'蓝桥科技园B座',  util:65, rev7:1350, ord7:465, online:89 },
  { name:'锦官城小区',     util:58, rev7:1205, ord7:415, online:92 },
  { name:'双楠实验小学',   util:54, rev7:1124, ord7:387, online:100 },
  { name:'玉林东路菜市场', util:52, rev7:1082, ord7:372, online:97 },
  { name:'三圣乡社区中心', util:48, rev7: 998, ord7:344, online:100 },
  { name:'新津农贸市场',   util:18, rev7: 284, ord7: 98, online: 58 },
]

// ── 数据聚合 helpers ──────────────────────────────────────────────
function periodData(period) {
  if (period === '7d')  return { labels: LABELS_7,  rev: REV_7,  ord: ORD_7,  online: ONLINE_7,  usr: USR_7  }
  if (period === '30d') return { labels: LABELS_30, rev: REV_30, ord: ORD_30, online: ONLINE_30, usr: USR_30 }
  return                       { labels: LABELS_90, rev: REV_90, ord: ORD_90, online: ONLINE_90, usr: USR_90 }
}

function sum(arr) { return arr.reduce((s, v) => s + v, 0) }
function avg(arr) { return arr.reduce((s, v) => s + v, 0) / arr.length }

function periodKPIs(period, station) {
  const { rev, ord, online } = periodData(period)
  // station filter: apply station-specific multiplier
  const sFactor = station === 'all' ? 1
    : (() => {
        const s = STATION_REPORT.find(x => x.name === station)
        return s ? s.rev7 / sum(STATION_REPORT.map(x => x.rev7)) : 1
      })()

  const totalRev   = Math.round(sum(rev) * sFactor)
  const elecFee    = Math.round(totalRev * 0.40)
  const svcFee     = Math.round(totalRev * 0.60)
  const discount   = Math.round(totalRev * 0.018)
  const totalOrd   = Math.round(sum(ord) * sFactor)
  const avgPerOrd  = totalOrd > 0 ? (totalRev / totalOrd).toFixed(2) : '0.00'
  const completeR  = 94.2
  const abnormalR  = 3.1
  const onlineR    = avg(online).toFixed(1)

  return { totalRev, elecFee, svcFee, discount, totalOrd, avgPerOrd, completeR, abnormalR, onlineR }
}

function chartSeries(period, station) {
  const { labels, rev, ord, online, usr } = periodData(period)
  const sFactor = station === 'all' ? 1
    : (() => {
        const s = STATION_REPORT.find(x => x.name === station)
        return s ? s.rev7 / sum(STATION_REPORT.map(x => x.rev7)) : 1
      })()
  // for 30/90d, thin out labels to avoid crowding
  const step = period === '90d' ? 6 : period === '30d' ? 2 : 1
  const idxs = labels.map((_, i) => i).filter(i => i % step === 0 || i === labels.length - 1)
  const thin = arr => idxs.map(i => arr[i])
  return {
    revChart:    thin(labels).map((label, j) => ({ label, v: Math.round(rev[idxs[j]] * sFactor) })),
    ordChart:    thin(labels).map((label, j) => ({ label, v: Math.round(ord[idxs[j]] * sFactor) })),
    onlineChart: thin(labels).map((label, j) => ({ label, v: online[idxs[j]] })),
    usrChart:    thin(labels).map((label, j) => ({ label, v: Math.round(usr[idxs[j]] * sFactor) })),
  }
}

// ── 水平进度条 ────────────────────────────────────────────────────
function HorizBar({ label, value, max, color, suffix, secondary }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
      <div style={{ width:130, fontSize:12.5, color:ADMIN.textRegular, textAlign:'right', flexShrink:0,
        whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{label}</div>
      <div style={{ flex:1, height:7, background:ADMIN.borderLight, borderRadius:4, overflow:'hidden' }}>
        <div style={{ width:`${pct}%`, height:'100%', background:color, borderRadius:4,
          transition:'width .4s ease' }}/>
      </div>
      <div style={{ width:70, fontSize:12.5, fontWeight:600, color:ADMIN.textPrimary,
        fontVariantNumeric:'tabular-nums', flexShrink:0 }}>
        {value}{suffix}
        {secondary != null && <span style={{ fontWeight:400, color:ADMIN.textSecondary, fontSize:11.5 }}> {secondary}</span>}
      </div>
    </div>
  )
}

// ── MetricTooltip ────────────────────────────────────────────────
function MetricTooltip({ text }) {
  const [pos, setPos] = React.useState(null)
  const ref = React.useRef(null)

  const handleEnter = () => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setPos({ x: r.left + r.width / 2, y: r.top })
  }
  const handleLeave = () => setPos(null)

  const show = pos !== null
  const TIP_W = 230

  // 水平钳制：不超出视口左右各 8px
  const clampedX = pos
    ? Math.min(Math.max(pos.x, TIP_W / 2 + 8), window.innerWidth - TIP_W / 2 - 8)
    : 0
  const arrowOffset = pos ? pos.x - clampedX : 0   // 箭头微调跟随原始位置

  return (
    <span
      ref={ref}
      style={{ display:'inline-flex', alignItems:'center', marginLeft:3, verticalAlign:'middle' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span style={{
        width:14, height:14, borderRadius:'50%',
        border:`1px solid ${show ? ADMIN.primary : ADMIN.border}`,
        display:'inline-flex', alignItems:'center', justifyContent:'center',
        fontSize:9.5, fontWeight:700,
        color: show ? ADMIN.primary : ADMIN.textSecondary,
        cursor:'default', flexShrink:0, lineHeight:1,
        background:'#fff',
        transition:'border-color .15s, color .15s',
        userSelect:'none',
      }}>?</span>

      {show && ReactDOM.createPortal(
        <div style={{
          position:'fixed',
          left: clampedX,
          top: pos.y - 8,
          transform:'translate(-50%, -100%)',
          background:'#1e2d40',
          color:'#e8edf3',
          borderRadius:6,
          padding:'9px 12px',
          fontSize:12,
          lineHeight:1.65,
          width:TIP_W,
          zIndex:99999,
          boxShadow:'0 6px 20px rgba(0,0,0,0.25)',
          pointerEvents:'none',
          whiteSpace:'normal',
          textWrap:'pretty',
        }}>
          {text}
          <div style={{
            position:'absolute', top:'100%',
            left:`calc(50% + ${arrowOffset}px)`,
            transform:'translateX(-50%)',
            width:0, height:0,
            borderLeft:'5px solid transparent',
            borderRight:'5px solid transparent',
            borderTop:'5px solid #1e2d40',
          }}/>
        </div>,
        document.body
      )}
    </span>
  )
}

// ── KPI 卡片（报表专用，简洁型） ─────────────────────────────────
function ReportKPI({ label, value, sub, color, tooltip }) {
  return (
    <ElCard padding="16px 20px">
      <div style={{ fontSize:12, color:ADMIN.textSecondary, marginBottom:6, display:'flex', alignItems:'center' }}>
        {label}
        {tooltip && <MetricTooltip text={tooltip}/>}
      </div>
      <div style={{ fontSize:24, fontWeight:700, color:color || ADMIN.textPrimary,
        fontVariantNumeric:'tabular-nums', lineHeight:1.2 }}>{value}</div>
      {sub && <div style={{ fontSize:11.5, color:ADMIN.textSecondary, marginTop:4 }}>{sub}</div>}
    </ElCard>
  )
}

// ── 图例行 ────────────────────────────────────────────────────────
function Legend({ items }) {
  return (
    <div style={{ display:'flex', flexWrap:'wrap', gap:'6px 16px', marginTop:8 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:ADMIN.textSecondary }}>
          <div style={{ width:10, height:10, borderRadius:2, background:item.color, flexShrink:0 }}/>
          <span>{item.label}</span>
          <span style={{ color:ADMIN.textPrimary, fontWeight:600 }}>{item.value}</span>
        </div>
      ))}
    </div>
  )
}

// ── 空图提示 ──────────────────────────────────────────────────────
function ChartTitle({ children, tooltip }) {
  return (
    <div style={{ fontSize:13, fontWeight:600, color:ADMIN.textPrimary, marginBottom:12,
      display:'flex', alignItems:'center', gap:0 }}>
      {children}
      {tooltip && <MetricTooltip text={tooltip}/>}
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// Tab 1: 收入报表
// ════════════════════════════════════════════════════════════════
function RevenueTab({ period, station }) {
  const kpi = periodKPIs(period, station)
  const { revChart } = chartSeries(period, station)
  // 服务费占总用户实付约 42%，趋势图只追踪平台服务费
  const svcRatio = kpi.totalRev > 0 ? kpi.svcFee / kpi.totalRev : 0.42
  const svcChart = revChart.map(d => ({ label: d.label, v: Math.round(d.v * svcRatio) }))

  const stationRevData = station === 'all' ? STATION_REPORT : STATION_REPORT.filter(s => s.name === station)
  const maxRev = Math.max(...stationRevData.map(s => s.rev7))

  const donutSegs = [
    { label:'净服务费', value: kpi.svcFee - kpi.discount, color: ADMIN.primary },
    { label:'优惠抵扣', value: kpi.discount,              color: '#e6a23c'    },
  ]
  const donutTotal = kpi.svcFee

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      {/* KPI row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}>
        <ReportKPI label="服务费收入" value={`¥${kpi.svcFee.toLocaleString()}`} color={ADMIN.primary}
          sub="平台实际收入"
          tooltip="统计周期内所有已完成订单中收取的服务费总额。服务费是平台的实际收入来源，不含电费。"/>
        <ReportKPI label="净服务费" value={`¥${(kpi.svcFee - kpi.discount).toLocaleString()}`} color={ADMIN.successColor}
          sub="扣除优惠后"
          tooltip="服务费收入减去本期全部优惠抵扣后的实际入账金额，是平台最终到手的收入。"/>
        <ReportKPI label="优惠抵扣" value={`¥${kpi.discount.toLocaleString()}`}
          sub={`占服务费 ${(kpi.discount/kpi.svcFee*100).toFixed(1)}%`}
          tooltip="统计周期内优惠券、满减活动等各类折扣的总抵扣金额，已从用户实付中扣除，不计入平台收入。"/>
        <ReportKPI label="代收电费" value={`¥${kpi.elecFee.toLocaleString()}`}
          sub="代收代付，非平台收入"
          tooltip="向用户收取后转付给电力公司的电费，属于过路款，不计入平台服务费收入。此处仅作参考展示。"/>
      </div>

      {/* 趋势 + 构成 */}
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:14 }}>
        <ElCard padding="18px 20px">
          <ChartTitle tooltip="统计周期内每日平台服务费收入（不含代收电费）的变化趋势，用于观察业务增长或异常波动。">服务费趋势</ChartTitle>
          <LineChart data={svcChart} height={160} color={ADMIN.primary}/>
        </ElCard>
        <ElCard padding="18px 20px">
          <ChartTitle tooltip="将本期服务费收入拆分为实收净额与优惠抵扣两部分，直观显示优惠活动对收入的影响程度。电费为代收不计入。">收入构成</ChartTitle>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', paddingTop:8 }}>
            <div style={{ position:'relative', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
              <MiniDonut segments={donutSegs} size={120}/>
              <div style={{ position:'absolute', textAlign:'center' }}>
                <div style={{ fontSize:11, color:ADMIN.textSecondary }}>服务费</div>
                <div style={{ fontSize:14, fontWeight:700, color:ADMIN.textPrimary }}>¥{kpi.svcFee.toLocaleString()}</div>
              </div>
            </div>
            <Legend items={donutSegs.map(s => ({
              color: s.color,
              label: s.label,
              value: `¥${s.value.toLocaleString()} (${(s.value/donutTotal*100).toFixed(0)}%)`
            }))}/>
          </div>
        </ElCard>
      </div>

      {/* 站点收入排行 */}
      <ElCard padding="18px 20px">
        <ChartTitle tooltip="各站点本期已完成订单的收入总额从高到低排列，右侧显示该站点对应的订单笔数。">站点收入排行</ChartTitle>
        {stationRevData.map((s, i) => (
          <HorizBar key={i} label={s.name}
            value={`¥${s.rev7.toLocaleString()}`} max={maxRev}
            color={i < 3 ? ADMIN.primary : ADMIN.infoBg.replace ? ADMIN.primary : '#91c4f9'}
            suffix="" secondary={`${s.ord7} 单`}/>
        ))}
      </ElCard>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// Tab 2: 订单报表
// ════════════════════════════════════════════════════════════════
function OrdersTab({ period, station }) {
  const kpi = periodKPIs(period, station)
  const { ordChart } = chartSeries(period, station)

  const statusSegs = [
    { label:'已完成', value:Math.round(kpi.totalOrd * 0.942), color:ADMIN.successColor },
    { label:'待结算', value:Math.round(kpi.totalOrd * 0.031), color:ADMIN.warningColor },
    { label:'已退款', value:Math.round(kpi.totalOrd * 0.018), color:ADMIN.primary      },
    { label:'异常',   value:Math.round(kpi.totalOrd * 0.009), color:'#f56c6c'          },
  ]
  const stopReasons = [
    { label:'正常完成', value:88, color:ADMIN.successColor },
    { label:'用户停止', value:6,  color:ADMIN.primary      },
    { label:'超时断电', value:3,  color:'#e6a23c'          },
    { label:'设备异常', value:3,  color:'#f56c6c'          },
  ]

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      {/* KPI */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}>
        <ReportKPI label="订单量" value={kpi.totalOrd.toLocaleString()} color={ADMIN.primary} sub="笔"
          tooltip="统计周期内发起的全部充电订单数，包含已完成、待结算、已退款及异常终止各种状态。"/>
        <ReportKPI label="完成率" value={`${kpi.completeR}%`} color={ADMIN.successColor} sub="正常结算"
          tooltip="正常完成结算的订单数 ÷ 本期全部已结束订单数 × 100%。待结算中的订单不参与计算。"/>
        <ReportKPI label="平均客单价" value={`¥${kpi.avgPerOrd}`} sub="已完成订单均值"
          tooltip="本期总收入 ÷ 已完成订单数，反映用户单次充电的平均消费金额。"/>
        <ReportKPI label="异常终止率" value={`${kpi.abnormalR}%`} color="#f56c6c" sub="含设备故障"
          tooltip="因设备故障、断电、网络中断等非用户主动操作导致充电中途终止的订单占比。该比率偏高通常意味着需要排查设备问题。"/>
      </div>

      {/* 趋势 + 状态 */}
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:14 }}>
        <ElCard padding="18px 20px">
          <ChartTitle tooltip="以统计周期内每日（或每周）的订单创建数量绘制柱状图，可观察充电需求的高峰期与低谷期。">订单量趋势</ChartTitle>
          <BarChart data={ordChart} height={160} color={ADMIN.successColor}/>
        </ElCard>
        <ElCard padding="18px 20px">
          <ChartTitle tooltip="将本期所有订单按最终状态分为已完成、待结算、已退款、异常四类，展示各类占比。异常占比偏高时需重点关注。">订单状态分布</ChartTitle>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', paddingTop:8 }}>
            <div style={{ position:'relative', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
              <MiniDonut segments={statusSegs} size={120}/>
              <div style={{ position:'absolute', textAlign:'center' }}>
                <div style={{ fontSize:11, color:ADMIN.textSecondary }}>总计</div>
                <div style={{ fontSize:14, fontWeight:700, color:ADMIN.textPrimary }}>{kpi.totalOrd.toLocaleString()}</div>
              </div>
            </div>
            <Legend items={statusSegs.map(s => ({ color:s.color, label:s.label, value:s.value.toLocaleString() }))}/>
          </div>
        </ElCard>
      </div>

      {/* 高峰时段 + 终止原因 */}
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:14 }}>
        <ElCard padding="18px 20px">
          <ChartTitle tooltip="统计本期内按小时分组的订单创建量，显示全天 24 小时的充电需求分布，可用于判断补充设备或投放优惠券的最佳时段。">充电高峰时段分布</ChartTitle>
          <BarChart data={HOUR_DATA} height={140} color={ADMIN.primary}/>
        </ElCard>
        <ElCard padding="18px 20px">
          <ChartTitle tooltip="将本期已结束的充电会话按终止原因归类：正常完成、用户主动停止、超时自动断电、设备异常。设备异常占比偏高时建议及时排查。">充电终止原因</ChartTitle>
          <div style={{ marginTop:10 }}>
            {stopReasons.map((r, i) => (
              <HorizBar key={i} label={r.label} value={r.value} max={100} color={r.color} suffix="%"/>
            ))}
          </div>
        </ElCard>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// Tab 3: 设备报表
// ════════════════════════════════════════════════════════════════
function DevicesTab({ period, station }) {
  const { onlineChart } = chartSeries(period, station)

  const stationData = station === 'all' ? STATION_REPORT : STATION_REPORT.filter(s => s.name === station)
  const maxUtil = Math.max(...stationData.map(s => s.util))

  const tickets = period === '7d' ? 7 : period === '30d' ? 22 : 58

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      {/* KPI */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
        <ReportKPI label="端口平均利用率" value="63.4%" color={ADMIN.primary} sub="充电时长/可用时长"
          tooltip="统计周期内所有端口实际在充电的时长，占全部端口可用总时长的比例。数值越高说明设备越忙碌，低于 30% 可考虑缩减该站点投入。"/>
        <ReportKPI label="平均充电时长" value="1h 54m" sub="已完成会话"
          tooltip="本期正常完成的充电会话，从开始到结束的平均时长。中途异常终止的会话不计入，以免拉低均值。"/>
        <ReportKPI label="本期故障工单" value={String(tickets)} color="#f56c6c" sub="已处理 + 待处理"
          tooltip="本期内产生的故障工单总数，包含设备自动报警和运维人员手动记录的两类，以及已处理和待处理的工单。"/>
      </div>

      {/* 利用率排行 + 故障趋势 */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
        <ElCard padding="18px 20px">
          <ChartTitle tooltip="各站点本期端口实际充电时长占可用总时长的比例，从高到低排列。低于 30% 的站点可考虑调整设备配置或运营策略。">各站端口利用率</ChartTitle>
          {stationData.map((s, i) => (
            <HorizBar key={i} label={s.name} value={s.util} max={100}
              color={s.util >= 70 ? ADMIN.successColor : s.util >= 40 ? ADMIN.primary : '#f56c6c'}
              suffix="%"/>
          ))}
        </ElCard>
        <ElCard padding="18px 20px">
          <ChartTitle tooltip="统计周期内端口平均利用率的每日变化折线，可用于观察是否存在周期性规律或异常下滑。">端口利用率趋势</ChartTitle>
          <LineChart data={onlineChart} height={160} color={ADMIN.primary}/>
        </ElCard>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// Tab 4: 用户报表
// ════════════════════════════════════════════════════════════════
function UsersTab({ period }) {
  const { usrChart } = chartSeries(period, 'all')

  const periodMult = period === '7d' ? 1 : period === '30d' ? 4.28 : 12.86
  const newUsers   = Math.round(389 * periodMult)
  const activeUsers = period === '7d' ? 4812 : period === '30d' ? 9240 : 12650

  const spendSegs = [
    { label:'<¥50',    value:38, color:'#c0d8f5' },
    { label:'¥50-200', value:32, color:ADMIN.primary },
    { label:'¥200-500',value:18, color:'#2d7dd2'  },
    { label:'>¥500',   value:12, color:'#1a4f8f'  },
  ]

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      {/* KPI */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}>
        <ReportKPI label="注册用户" value="15,284" sub="累计"
          tooltip="截至统计截止日，累计通过微信扫码登录过平台的用户总数，含注册后从未充电的用户。"/>
        <ReportKPI label="活跃用户" value={activeUsers.toLocaleString()} color={ADMIN.primary}
          sub={`本期充电 ≥1 次`}
          tooltip="本期内至少完成过 1 次充电的不重复用户数。同一用户充电多次只算 1 人。"/>
        <ReportKPI label="本期新增" value={newUsers.toLocaleString()} color={ADMIN.successColor}
          sub="首次扫码充电"
          tooltip="本期内首次完成充电的用户数。以用户在平台的第一笔充电订单时间落在本期为准，仅注册但未充电的用户不计入。"/>
        <ReportKPI label="复购率" value="71.4%" color={ADMIN.primary} sub="本期充电 ≥2 次用户"
          tooltip="本期充电 2 次及以上的用户数 ÷ 本期活跃用户数 × 100%。反映用户对平台的依赖程度和充电习惯养成情况。"/>
      </div>

      {/* 新增趋势 + 消费分层 */}
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:14 }}>
        <ElCard padding="18px 20px">
          <ChartTitle tooltip="统计周期内每日首次完成充电的用户数变化折线，反映平台的拉新效果与增长节奏。">新增用户趋势</ChartTitle>
          <LineChart data={usrChart} height={160} color={ADMIN.successColor}/>
        </ElCard>
        <ElCard padding="18px 20px">
          <ChartTitle tooltip="将本期活跃用户按累计消费金额分为四档，展示各档占比。高消费用户占比越高，说明平台用户质量越好。">用户消费分层</ChartTitle>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', paddingTop:8 }}>
            <div style={{ position:'relative', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
              <MiniDonut segments={spendSegs} size={120}/>
              <div style={{ position:'absolute', textAlign:'center' }}>
                <div style={{ fontSize:11, color:ADMIN.textSecondary }}>消费层</div>
                <div style={{ fontSize:12, fontWeight:700, color:ADMIN.textPrimary }}>4 档</div>
              </div>
            </div>
            <Legend items={spendSegs.map(s => ({ color:s.color, label:s.label, value:`${s.value}%` }))}/>
          </div>
        </ElCard>
      </div>

      {/* 高峰时段（用户视角） */}
      <ElCard padding="18px 20px">
        <ChartTitle tooltip="同订单报表中的高峰时段图，此处从用户视角统计各时段独立充电用户数，与订单量趋势对比可观察用户复充情况。">用户充电高峰时段</ChartTitle>
        <BarChart data={HOUR_DATA} height={130} color={ADMIN.primary}/>
      </ElCard>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// 主组件: ReportsScreen
// ════════════════════════════════════════════════════════════════
function ReportsScreen() {
  const [tab,     setTab]     = React.useState('revenue')
  const [period,  setPeriod]  = React.useState('7d')
  const [station, setStation] = React.useState('all')

  const TABS = [
    { id:'revenue', label:'收入报表' },
    { id:'orders',  label:'订单报表' },
    { id:'devices', label:'设备报表' },
    { id:'users',   label:'用户报表' },
  ]

  const stationOptions = [
    { value:'all', label:'全部站点' },
    ...STATION_REPORT.map(s => ({ value:s.name, label:s.name })),
  ]

  return (
    <div>
      {/* 工具栏：tab + 筛选 + 导出 */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
        marginBottom:18, flexWrap:'wrap', gap:10 }}>

        {/* Tab 切换 */}
        <div style={{ display:'flex', border:`1px solid ${ADMIN.border}`, borderRadius:4, overflow:'hidden' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding:'6px 18px', fontSize:13, border:'none', cursor:'pointer',
              background: tab === t.id ? ADMIN.primary : '#fff',
              color:       tab === t.id ? '#fff' : ADMIN.textRegular,
              fontWeight:  tab === t.id ? 600 : 400,
              transition:'background .15s, color .15s',
            }}>{t.label}</button>
          ))}
        </div>

        {/* 右侧：期间 + 站点 + 导出 */}
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          {/* 期间切换 */}
          <div style={{ display:'flex', border:`1px solid ${ADMIN.border}`, borderRadius:4, overflow:'hidden' }}>
            {[{k:'7d',l:'近7日'},{k:'30d',l:'近30日'},{k:'90d',l:'近90日'}].map(({k,l}) => (
              <button key={k} onClick={() => setPeriod(k)} style={{
                padding:'5px 12px', fontSize:12.5, border:'none', cursor:'pointer',
                background: period === k ? '#f0f7ff' : '#fff',
                color:       period === k ? ADMIN.primary : ADMIN.textRegular,
                fontWeight:  period === k ? 600 : 400,
                borderRight: `1px solid ${ADMIN.border}`,
                transition:'background .12s',
              }}>{l}</button>
            ))}
          </div>

          {/* 站点筛选（设备报表/收入/订单适用，用户报表可不用） */}
          {tab !== 'users' && (
            <ElSelect value={station} onChange={setStation}
              options={stationOptions} width={150}/>
          )}

          {/* 导出 */}
          <ElButton>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ marginRight:4 }}>
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                stroke={ADMIN.textRegular} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            导出
          </ElButton>
        </div>
      </div>

      {/* Tab 内容 */}
      {tab === 'revenue' && <RevenueTab  period={period} station={station}/>}
      {tab === 'orders'  && <OrdersTab   period={period} station={station}/>}
      {tab === 'devices' && <DevicesTab  period={period} station={station}/>}
      {tab === 'users'   && <UsersTab    period={period}/>}
    </div>
  )
}

Object.assign(window, { ReportsScreen })
