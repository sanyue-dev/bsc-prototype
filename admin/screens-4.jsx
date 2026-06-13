// admin/screens-4.jsx — 报表中心（重构版）
/* global antd, icons */

// ── 日期标签 ──────────────────────────────────────────────────────
function buildDateLabels(n) {
  const base = new Date(2026, 5, 10)
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(base); d.setDate(base.getDate() - (n - 1 - i))
    return `${d.getMonth() + 1}/${String(d.getDate()).padStart(2, '0')}`
  })
}

const LABELS_7  = buildDateLabels(7)
const LABELS_30 = buildDateLabels(30)
const LABELS_90 = buildDateLabels(90)

function genSeries(n, base, amp, phase = 0) {
  return Array.from({ length: n }, (_, i) =>
    Math.round(base + amp * Math.sin(i * 0.38 + phase + 1.2) + i * (base * 0.003))
  )
}

const REV_7  = [820, 950, 880, 1120, 980, 1040, 1150]
const REV_30 = genSeries(30, 950, 170, 0)
const REV_90 = genSeries(90, 950, 170, 0.5)
const ORD_7  = [284, 328, 305, 391, 342, 362, 401]
const ORD_30 = REV_30.map(v => Math.round(v / 2.82))
const ORD_90 = REV_90.map(v => Math.round(v / 2.80))

// 设备利用率：~60–65%，与 KPI 一致
const UTIL_7  = [61.2, 63.5, 60.8, 65.1, 62.8, 63.0, 63.4]
const UTIL_30 = Array.from({ length: 30 }, (_, i) => +( 62 + 5 * Math.sin(i * 0.5)).toFixed(1))
const UTIL_90 = Array.from({ length: 90 }, (_, i) => +( 61 + 6 * Math.sin(i * 0.3 + 0.5)).toFixed(1))

const USR_7  = [48, 55, 42, 68, 60, 52, 64]
const USR_30 = Array.from({ length: 30 }, (_, i) => Math.round(52 + 18 * Math.sin(i * 0.44)))
const USR_90 = Array.from({ length: 90 }, (_, i) => Math.round(50 + 20 * Math.sin(i * 0.32 + 0.8) + i * 0.08))

const HOUR_DATA = [
  { label: '0时', v: 12 }, { label: '1时', v: 8  }, { label: '2时', v: 5  }, { label: '3时', v: 3  },
  { label: '4时', v: 4  }, { label: '5时', v: 18 }, { label: '6时', v: 45 }, { label: '7时', v: 82 },
  { label: '8时', v: 95 }, { label: '9时', v: 78 }, { label: '10时', v: 60 }, { label: '11时', v: 48 },
  { label: '12时', v: 42 }, { label: '13时', v: 38 }, { label: '14时', v: 35 }, { label: '15时', v: 32 },
  { label: '16时', v: 38 }, { label: '17时', v: 52 }, { label: '18时', v: 65 }, { label: '19时', v: 80 },
  { label: '20时', v: 92 }, { label: '21时', v: 88 }, { label: '22时', v: 72 }, { label: '23时', v: 38 },
]

const STATION_REPORT = [
  { name: '天府软件园D区',   util: 87, rev7: 1842, ord7: 634 },
  { name: '滨河新村东区',    util: 78, rev7: 1620, ord7: 558 },
  { name: '九眼桥公租房',    util: 74, rev7: 1540, ord7: 531 },
  { name: '金牛苑南门车棚',  util: 72, rev7: 1498, ord7: 516 },
  { name: '蓝桥科技园B座',   util: 65, rev7: 1350, ord7: 465 },
  { name: '锦官城小区',      util: 58, rev7: 1205, ord7: 415 },
  { name: '双楠实验小学',    util: 54, rev7: 1124, ord7: 387 },
  { name: '玉林东路菜市场',  util: 52, rev7: 1082, ord7: 372 },
  { name: '三圣乡社区中心',  util: 48, rev7:  998, ord7: 344 },
  { name: '新津农贸市场',    util: 18, rev7:  284, ord7:  98 },
]

// 环比趋势（对比上一周期）
const TRENDS = {
  '7d':  { rev: '+12.4%', revUp: true,  ord: '+8.7%',  ordUp: true,  util: '+1.2pp', utilUp: true,  usr: '+14.3%', usrUp: true  },
  '30d': { rev: '+6.8%',  revUp: true,  ord: '+5.2%',  ordUp: true,  util: '−0.8pp', utilUp: false, usr: '+9.1%',  usrUp: true  },
  '90d': { rev: '+18.2%', revUp: true,  ord: '+15.4%', ordUp: true,  util: '+2.6pp', utilUp: true,  usr: '+22.7%', usrUp: true  },
}

// ── 数据计算 ──────────────────────────────────────────────────────
function sum(arr) { return arr.reduce((s, v) => s + v, 0) }

function stationFactor(station) {
  if (station === 'all') return 1
  const s = STATION_REPORT.find(x => x.name === station)
  return s ? s.rev7 / sum(STATION_REPORT.map(x => x.rev7)) : 1
}

function periodData(period) {
  if (period === '7d')  return { labels: LABELS_7,  rev: REV_7,  ord: ORD_7,  util: UTIL_7,  usr: USR_7  }
  if (period === '30d') return { labels: LABELS_30, rev: REV_30, ord: ORD_30, util: UTIL_30, usr: USR_30 }
  return                       { labels: LABELS_90, rev: REV_90, ord: ORD_90, util: UTIL_90, usr: USR_90 }
}

function periodKPIs(period, station) {
  const { rev, ord } = periodData(period)
  const sf = stationFactor(station)
  const totalRev  = Math.round(sum(rev) * sf)
  const svcFee    = Math.round(totalRev * 0.60)
  const elecFee   = Math.round(totalRev * 0.40)
  const discount  = Math.round(svcFee * 0.018)
  const totalOrd  = Math.round(sum(ord) * sf)
  const avgPerOrd = totalOrd > 0 ? (totalRev / totalOrd).toFixed(2) : '0.00'
  return { totalRev, svcFee, elecFee, discount, totalOrd, avgPerOrd, completeR: 94.2, abnormalR: 3.1 }
}

function chartSeries(period, station) {
  const { labels, rev, ord, util, usr } = periodData(period)
  const sf   = stationFactor(station)
  const step = period === '90d' ? 6 : period === '30d' ? 2 : 1
  const idxs = labels.map((_, i) => i).filter(i => i % step === 0 || i === labels.length - 1)
  const thin = arr => idxs.map(i => arr[i])
  return {
    revChart:  thin(labels).map((label, j) => ({ label, v: Math.round(rev[idxs[j]]  * sf) })),
    ordChart:  thin(labels).map((label, j) => ({ label, v: Math.round(ord[idxs[j]]  * sf) })),
    utilChart: thin(labels).map((label, j) => ({ label, v: util[idxs[j]] })),
    usrChart:  thin(labels).map((label, j) => ({ label, v: Math.round(usr[idxs[j]]  * sf) })),
  }
}

// ── 共用子组件 ────────────────────────────────────────────────────

function TrendBadge({ value, up }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 2,
      background: up ? ADMIN.successBg : ADMIN.dangerBg,
      color:      up ? ADMIN.successColor : ADMIN.dangerColor,
      borderRadius: 4, padding: '1px 6px',
      fontSize: 11, fontWeight: 500, flexShrink: 0,
    }}>
      {up ? '↑' : '↓'} {value}
    </span>
  )
}

function ReportKPI({ label, value, sub, color, tooltip, trend, trendUp }) {
  return (
    <ElCard padding="18px 20px">
      <div style={{ fontSize: 12, color: ADMIN.textSecondary, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 3 }}>
        {label}
        {tooltip && <InfoTip text={tooltip} />}
      </div>
      <div style={{
        fontSize: 26, fontWeight: 700, lineHeight: 1.15,
        color: color || ADMIN.textPrimary,
        fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.5px',
      }}>
        {value}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, minHeight: 20 }}>
        {sub && <span style={{ fontSize: 11.5, color: ADMIN.textSecondary }}>{sub}</span>}
        {trend != null && <TrendBadge value={trend} up={trendUp} />}
      </div>
    </ElCard>
  )
}

function ChartCard({ title, tooltip, extra, children, style }) {
  return (
    <ElCard style={style} padding="18px 20px">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: ADMIN.textPrimary, display: 'flex', alignItems: 'center', gap: 3 }}>
          {title}
          {tooltip && <InfoTip text={tooltip} />}
        </div>
        {extra && <span style={{ fontSize: 12, color: ADMIN.textSecondary }}>{extra}</span>}
      </div>
      {children}
    </ElCard>
  )
}

function Legend({ items }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', marginTop: 10 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: ADMIN.textSecondary }}>
          <div style={{ width: 9, height: 9, borderRadius: 2, background: item.color, flexShrink: 0 }} />
          <span>{item.label}</span>
          <span style={{ color: ADMIN.textPrimary, fontWeight: 600 }}>{item.value}</span>
        </div>
      ))}
    </div>
  )
}

function DonutCard({ title, tooltip, segments, centerLabel, centerValue }) {
  return (
    <ChartCard title={title} tooltip={tooltip}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <MiniDonut segments={segments} size={120} />
          <div style={{ position: 'absolute', textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: ADMIN.textSecondary }}>{centerLabel}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: ADMIN.textPrimary }}>{centerValue}</div>
          </div>
        </div>
        <Legend items={segments} />
      </div>
    </ChartCard>
  )
}

function HorizBar({ label, value, max, color, suffix, secondary }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
      <div style={{ width: 130, fontSize: 12.5, color: ADMIN.textRegular, textAlign: 'right', flexShrink: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {label}
      </div>
      <div style={{ flex: 1, height: 6, background: ADMIN.borderLight, borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 3, transition: 'width .4s ease' }} />
      </div>
      <div style={{ width: 90, fontSize: 12.5, fontWeight: 600, color: ADMIN.textPrimary, fontVariantNumeric: 'tabular-nums', flexShrink: 0, textAlign: 'right' }}>
        {value}{suffix}
        {secondary != null && <span style={{ fontWeight: 400, color: ADMIN.textSecondary, fontSize: 11.5, marginLeft: 4 }}>{secondary}</span>}
      </div>
    </div>
  )
}

// ── Tab 1: 收入报表 ───────────────────────────────────────────────
function RevenueTab({ period, station }) {
  const kpi = periodKPIs(period, station)
  const { revChart } = chartSeries(period, station)
  const t = TRENDS[period]
  const svcRatio = kpi.totalRev > 0 ? kpi.svcFee / kpi.totalRev : 0.6
  const svcChart = revChart.map(d => ({ label: d.label, v: Math.round(d.v * svcRatio) }))
  const stationData = station === 'all' ? STATION_REPORT : STATION_REPORT.filter(s => s.name === station)
  const maxRev = Math.max(...stationData.map(s => s.rev7))

  const donutSegs = [
    { label: '净服务费', value: kpi.svcFee - kpi.discount, color: ADMIN.primary,
      value: `¥${(kpi.svcFee - kpi.discount).toLocaleString()}` },
    { label: '优惠抵扣', value: kpi.discount, color: '#e6a23c',
      value: `¥${kpi.discount.toLocaleString()} (${(kpi.discount / kpi.svcFee * 100).toFixed(0)}%)` },
  ]
  // 重建避免 value 键冲突
  const donutSegsFixed = [
    { label: '净服务费', value: kpi.svcFee - kpi.discount, displayVal: `¥${(kpi.svcFee - kpi.discount).toLocaleString()}`, color: ADMIN.primary },
    { label: '优惠抵扣', value: kpi.discount,               displayVal: `¥${kpi.discount.toLocaleString()} (${(kpi.discount / kpi.svcFee * 100).toFixed(0)}%)`, color: '#e6a23c' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <ReportKPI label="服务费收入" value={`¥${kpi.svcFee.toLocaleString()}`} color={ADMIN.primary}
          sub="平台实际收入" trend={t.rev} trendUp={t.revUp}
          tooltip="统计周期内所有已完成订单中收取的服务费总额。服务费是平台的实际收入来源，不含电费。" />
        <ReportKPI label="净服务费" value={`¥${(kpi.svcFee - kpi.discount).toLocaleString()}`} color={ADMIN.successColor}
          sub="扣除优惠后"
          tooltip="服务费收入减去本期全部优惠抵扣后的实际入账金额。" />
        <ReportKPI label="优惠抵扣" value={`¥${kpi.discount.toLocaleString()}`}
          sub={`占服务费 ${(kpi.discount / kpi.svcFee * 100).toFixed(1)}%`}
          tooltip="统计周期内优惠券、满减活动等各类折扣的总抵扣金额。" />
        <ReportKPI label="代收电费" value={`¥${kpi.elecFee.toLocaleString()}`}
          sub="代收代付，非平台收入"
          tooltip="向用户收取后转付给电力公司的电费，属于过路款，不计入平台服务费收入。" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>
        <ChartCard title="服务费趋势" tooltip="统计周期内每日平台服务费收入变化趋势。">
          <LineChart data={svcChart} height={160} color={ADMIN.primary} />
        </ChartCard>
        <DonutCard title="收入构成" tooltip="将本期服务费收入拆分为实收净额与优惠抵扣两部分。"
          segments={donutSegsFixed.map(s => ({ label: s.label, value: s.displayVal, color: s.color, _n: s.value }))}
          centerLabel="服务费" centerValue={`¥${kpi.svcFee.toLocaleString()}`} />
      </div>

      <ChartCard title="站点收入排行" tooltip="各站点本期已完成订单的收入总额从高到低排列。">
        {stationData.map((s, i) => (
          <HorizBar key={i} label={s.name} value={`¥${s.rev7.toLocaleString()}`}
            max={maxRev} color={i < 3 ? ADMIN.primary : '#91c4f9'} suffix="" secondary={`${s.ord7} 单`} />
        ))}
      </ChartCard>
    </div>
  )
}

// ── Tab 2: 订单报表 ───────────────────────────────────────────────
function OrdersTab({ period, station }) {
  const kpi = periodKPIs(period, station)
  const { ordChart } = chartSeries(period, station)
  const t = TRENDS[period]

  const statusSegs = [
    { label: '已完成', value: Math.round(kpi.totalOrd * 0.942).toLocaleString(), color: ADMIN.successColor,  _n: Math.round(kpi.totalOrd * 0.942) },
    { label: '待结算', value: Math.round(kpi.totalOrd * 0.031).toLocaleString(), color: ADMIN.warningColor, _n: Math.round(kpi.totalOrd * 0.031) },
    { label: '已退款', value: Math.round(kpi.totalOrd * 0.018).toLocaleString(), color: ADMIN.primary,       _n: Math.round(kpi.totalOrd * 0.018) },
    { label: '异常',   value: Math.round(kpi.totalOrd * 0.009).toLocaleString(), color: '#f56c6c',           _n: Math.round(kpi.totalOrd * 0.009) },
  ]

  const stopReasons = [
    { label: '正常完成', value: 88, color: ADMIN.successColor },
    { label: '用户停止', value: 6,  color: ADMIN.primary },
    { label: '超时断电', value: 3,  color: '#e6a23c' },
    { label: '设备异常', value: 3,  color: '#f56c6c' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <ReportKPI label="订单量" value={kpi.totalOrd.toLocaleString()} color={ADMIN.primary}
          sub="笔" trend={t.ord} trendUp={t.ordUp}
          tooltip="统计周期内发起的全部充电订单数。" />
        <ReportKPI label="完成率" value={`${kpi.completeR}%`} color={ADMIN.successColor}
          sub="正常结算"
          tooltip="正常完成结算的订单数 ÷ 本期全部已结束订单数 × 100%。" />
        <ReportKPI label="平均客单价" value={`¥${kpi.avgPerOrd}`}
          sub="已完成订单均值"
          tooltip="本期总收入 ÷ 已完成订单数。" />
        <ReportKPI label="异常终止率" value={`${kpi.abnormalR}%`} color="#f56c6c"
          sub="含设备故障"
          tooltip="因设备故障、断电、网络中断等非用户主动操作导致充电中途终止的订单占比。" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>
        <ChartCard title="订单量趋势" tooltip="统计周期内每日的订单创建数量。">
          <BarChart data={ordChart} height={160} color={ADMIN.successColor} />
        </ChartCard>
        <DonutCard title="订单状态分布" tooltip="将本期所有订单按最终状态分类展示各类占比。"
          segments={statusSegs.map(s => ({ label: s.label, value: s.value, color: s.color, _n: s._n }))}
          centerLabel="总计" centerValue={kpi.totalOrd.toLocaleString()} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>
        <ChartCard title="充电高峰时段" tooltip="统计本期内按小时分组的订单创建量。">
          <BarChart data={HOUR_DATA} height={140} color={ADMIN.primary} />
        </ChartCard>
        <ChartCard title="充电终止原因" tooltip="将本期已结束的充电会话按终止原因归类。">
          <div style={{ marginTop: 10 }}>
            {stopReasons.map((r, i) => (
              <HorizBar key={i} label={r.label} value={r.value} max={100} color={r.color} suffix="%" />
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  )
}

// ── Tab 3: 设备报表 ───────────────────────────────────────────────
function DevicesTab({ period, station }) {
  const { utilChart } = chartSeries(period, station)
  const t = TRENDS[period]
  const stationData = station === 'all' ? STATION_REPORT : STATION_REPORT.filter(s => s.name === station)
  const tickets = period === '7d' ? 7 : period === '30d' ? 22 : 58

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
        <ReportKPI label="端口平均利用率" value="63.4%" color={ADMIN.primary}
          sub="充电时长 / 可用时长" trend={t.util} trendUp={t.utilUp}
          tooltip="统计周期内所有端口实际在充电的时长，占全部端口可用总时长的比例。低于 30% 可考虑缩减投入。" />
        <ReportKPI label="平均充电时长" value="1h 54m"
          sub="已完成会话"
          tooltip="本期正常完成的充电会话，从开始到结束的平均时长。" />
        <ReportKPI label="本期故障工单" value={String(tickets)} color="#f56c6c"
          sub="已处理 + 待处理"
          tooltip="本期内产生的故障工单总数。" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <ChartCard title="各站端口利用率" tooltip="各站点本期端口实际充电时长占可用总时长的比例。">
          {stationData.map((s, i) => (
            <HorizBar key={i} label={s.name} value={s.util} max={100}
              color={s.util >= 70 ? ADMIN.successColor : s.util >= 40 ? ADMIN.primary : '#f56c6c'} suffix="%" />
          ))}
        </ChartCard>
        <ChartCard title="端口利用率趋势" tooltip="统计周期内端口平均利用率的每日变化折线。">
          <LineChart data={utilChart} height={160} color={ADMIN.primary} />
        </ChartCard>
      </div>
    </div>
  )
}

// ── Tab 4: 用户报表 ───────────────────────────────────────────────
function UsersTab({ period }) {
  const { usrChart } = chartSeries(period, 'all')
  const t = TRENDS[period]
  const periodMult  = period === '7d' ? 1 : period === '30d' ? 4.28 : 12.86
  const newUsers    = Math.round(389 * periodMult)
  const activeUsers = period === '7d' ? 4812 : period === '30d' ? 9240 : 12650

  const spendSegs = [
    { label: '< ¥50',    value: '38%', color: '#c0d8f5', _n: 38 },
    { label: '¥50–200',  value: '32%', color: ADMIN.primary, _n: 32 },
    { label: '¥200–500', value: '18%', color: '#2d7dd2', _n: 18 },
    { label: '> ¥500',   value: '12%', color: '#1a4f8f', _n: 12 },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <ReportKPI label="注册用户" value="15,284" sub="累计"
          tooltip="截至统计截止日，累计通过微信扫码登录过平台的用户总数。" />
        <ReportKPI label="活跃用户" value={activeUsers.toLocaleString()} color={ADMIN.primary}
          sub="本期充电 ≥1 次"
          tooltip="本期内至少完成过 1 次充电的不重复用户数。" />
        <ReportKPI label="本期新增" value={newUsers.toLocaleString()} color={ADMIN.successColor}
          sub="首次扫码充电" trend={t.usr} trendUp={t.usrUp}
          tooltip="本期内首次完成充电的用户数。" />
        <ReportKPI label="复购率" value="71.4%" color={ADMIN.primary}
          sub="本期充电 ≥2 次用户"
          tooltip="本期充电 2 次及以上的用户数 ÷ 本期活跃用户数 × 100%。" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>
        <ChartCard title="新增用户趋势" tooltip="统计周期内每日首次完成充电的用户数变化折线。">
          <LineChart data={usrChart} height={160} color={ADMIN.successColor} />
        </ChartCard>
        <DonutCard title="用户消费分层" tooltip="将本期活跃用户按累计消费金额分为四档。"
          segments={spendSegs}
          centerLabel="消费层" centerValue="4 档" />
      </div>

      <ChartCard title="用户充电高峰时段" tooltip="从用户视角统计各时段独立充电用户数。">
        <BarChart data={HOUR_DATA} height={130} color={ADMIN.primary} />
      </ChartCard>
    </div>
  )
}

// ── ReportsScreen ─────────────────────────────────────────────────
function ReportsScreen() {
  const [tab,     setTab]     = React.useState('revenue')
  const [period,  setPeriod]  = React.useState('7d')
  const [station, setStation] = React.useState('all')

  const stationOptions = [
    { value: 'all', label: '全部站点' },
    ...STATION_REPORT.map(s => ({ value: s.name, label: s.name })),
  ]

  const exportMenu = {
    items: [
      { key: 'csv',   label: '导出 CSV',   icon: React.createElement(icons.FileTextOutlined)  },
      { key: 'excel', label: '导出 Excel', icon: React.createElement(icons.TableOutlined) },
    ],
    onClick: ({ key }) => antd.message.success(`${key === 'csv' ? 'CSV' : 'Excel'} 文件准备中，稍后自动下载`),
  }

  const tabItems = [
    { key: 'revenue', label: '收入报表', children: <RevenueTab period={period} station={station} /> },
    { key: 'orders',  label: '订单报表', children: <OrdersTab  period={period} station={station} /> },
    { key: 'devices', label: '设备报表', children: <DevicesTab period={period} station={station} /> },
    { key: 'users',   label: '用户报表', children: <UsersTab   period={period} /> },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* 筛选栏 */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: '#fff', borderRadius: 8, padding: '11px 20px',
        border: `1px solid ${ADMIN.borderLight}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        <span style={{ fontSize: 13, color: ADMIN.textSecondary }}>
          数据截止&nbsp;
          <span style={{ color: ADMIN.textPrimary, fontWeight: 500 }}>2026-06-10</span>
          ，T-1 日结算
        </span>
        <antd.Space size={10}>
          <antd.Segmented
            value={period}
            onChange={setPeriod}
            options={[
              { label: '近 7 日',  value: '7d'  },
              { label: '近 30 日', value: '30d' },
              { label: '近 90 日', value: '90d' },
            ]}
          />
          {tab !== 'users' && (
            <antd.Select
              value={station}
              onChange={setStation}
              options={stationOptions}
              style={{ width: 160 }}
            />
          )}
          <antd.Dropdown menu={exportMenu} trigger={['click']}>
            <antd.Button icon={React.createElement(icons.DownloadOutlined)}>导出</antd.Button>
          </antd.Dropdown>
        </antd.Space>
      </div>

      {/* Tabs */}
      <antd.Tabs
        activeKey={tab}
        onChange={setTab}
        items={tabItems}
        destroyInactiveTabPane={false}
        style={{ marginTop: -6 }}
      />
    </div>
  )
}

Object.assign(window, { ReportsScreen })
