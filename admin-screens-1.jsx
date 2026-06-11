// admin-screens-1.jsx — Dashboard, Stations, Devices, Tickets

// ─── mock data ────────────────────────────────────────────────────
const STATIONS_DATA = [
  { id: 'S001', name: '金牛苑南门车棚',   addr: '金牛区金牛苑小区南门停车棚',    cabinets: 4, ports: 48, online: 46, idle: 20, charging: 26, alert: 0, status: '正常' },
  { id: 'S002', name: '蓝桥科技园B座',    addr: '高新区蓝桥科技园B座地下车棚',   cabinets: 3, ports: 36, online: 32, idle: 14, charging: 18, alert: 1, status: '告警' },
  { id: 'S003', name: '滨河新村东区',     addr: '武侯区滨河新村东区非机动车棚',  cabinets: 5, ports: 60, online: 60, idle: 28, charging: 32, alert: 0, status: '正常' },
  { id: 'S004', name: '锦官城小区',       addr: '锦江区锦官城小区B栋停车棚',    cabinets: 2, ports: 24, online: 22, idle: 10, charging: 12, alert: 0, status: '正常' },
  { id: 'S005', name: '天府软件园D区',    addr: '高新区天府软件园D区非机动车棚', cabinets: 6, ports: 72, online: 68, idle: 30, charging: 38, alert: 2, status: '告警' },
  { id: 'S006', name: '双楠实验小学',     addr: '武侯区双楠路小学东侧车棚',      cabinets: 2, ports: 24, online: 24, idle: 12, charging: 12, alert: 0, status: '正常' },
  { id: 'S007', name: '九眼桥公租房',     addr: '锦江区九眼桥公租房非机动车棚',  cabinets: 4, ports: 48, online: 46, idle: 22, charging: 24, alert: 0, status: '正常' },
  { id: 'S008', name: '新津农贸市场',     addr: '新津区新津路农贸市场停车棚',    cabinets: 2, ports: 24, online: 14, idle: 12, charging:  2, alert: 3, status: '故障' },
  { id: 'S009', name: '三圣乡社区中心',   addr: '锦江区三圣乡社区活动中心车棚',  cabinets: 2, ports: 24, online: 24, idle: 12, charging: 12, alert: 0, status: '正常' },
  { id: 'S010', name: '玉林东路菜市场',   addr: '武侯区玉林东路菜市场旁车棚',    cabinets: 3, ports: 36, online: 35, idle: 18, charging: 17, alert: 0, status: '正常' },
]

const DEVICES_DATA = [
  { id: 'CAB-A01', station: '金牛苑南门车棚',  type: '充电柜 12口', ports: 12, status: '正常', orders: 28, kwh: 8.4,  lastMaint: '2026-05-12' },
  { id: 'CAB-A02', station: '金牛苑南门车棚',  type: '充电柜 12口', ports: 12, status: '正常', orders: 31, kwh: 9.1,  lastMaint: '2026-05-12' },
  { id: 'CAB-B01', station: '蓝桥科技园B座',   type: '充电柜 12口', ports: 12, status: '正常', orders: 24, kwh: 7.2,  lastMaint: '2026-04-28' },
  { id: 'CAB-B02', station: '蓝桥科技园B座',   type: '充电柜 12口', ports: 12, status: '故障', orders: 0,  kwh: 0,    lastMaint: '2026-03-15' },
  { id: 'CAB-C01', station: '滨河新村东区',    type: '充电柜 12口', ports: 12, status: '正常', orders: 35, kwh: 10.2, lastMaint: '2026-05-20' },
  { id: 'CAB-C02', station: '滨河新村东区',    type: '充电柜 12口', ports: 12, status: '正常', orders: 29, kwh: 8.7,  lastMaint: '2026-05-20' },
  { id: 'CAB-D01', station: '天府软件园D区',   type: '充电柜 12口', ports: 12, status: '正常', orders: 42, kwh: 12.6, lastMaint: '2026-05-01' },
  { id: 'CAB-D02', station: '天府软件园D区',   type: '充电柜 12口', ports: 12, status: '离线', orders: 0,  kwh: 0,    lastMaint: '2026-04-10' },
  { id: 'CAB-E01', station: '双楠实验小学',    type: '充电柜 12口', ports: 12, status: '正常', orders: 18, kwh: 5.4,  lastMaint: '2026-05-18' },
  { id: 'CAB-F01', station: '九眼桥公租房',    type: '充电柜 12口', ports: 12, status: '正常', orders: 33, kwh: 9.9,  lastMaint: '2026-05-14' },
  { id: 'CAB-G01', station: '新津农贸市场',    type: '充电柜 12口', ports: 12, status: '故障', orders: 0,  kwh: 0,    lastMaint: '2026-02-28' },
  { id: 'CAB-G02', station: '新津农贸市场',    type: '充电柜 12口', ports: 12, status: '故障', orders: 0,  kwh: 0,    lastMaint: '2026-02-28' },
]

const TICKETS_DATA = [
  { id: 'WO-2026-0156', device: 'CAB-B02', station: '蓝桥科技园B座',  type: '主板通信故障',  reported: '2026-06-08 14:22', status: '处理中', assignee: '李工', priority: '高' },
  { id: 'WO-2026-0155', device: 'CAB-G01', station: '新津农贸市场',   type: '插座接触不良',  reported: '2026-06-08 09:15', status: '处理中', assignee: '王工', priority: '高' },
  { id: 'WO-2026-0154', device: 'CAB-G02', station: '新津农贸市场',   type: '网络离线',      reported: '2026-06-07 18:43', status: '待处理', assignee: '—',    priority: '中' },
  { id: 'WO-2026-0153', device: 'CAB-D02', station: '天府软件园D区',  type: '断路器跳闸',    reported: '2026-06-07 11:30', status: '待处理', assignee: '—',    priority: '中' },
  { id: 'WO-2026-0152', device: 'CAB-E01', station: '双楠实验小学',   type: '计量模块异常',  reported: '2026-06-06 16:08', status: '已完成', assignee: '张工', priority: '低' },
  { id: 'WO-2026-0151', device: 'CAB-A01', station: '金牛苑南门车棚', type: '刷卡模块故障',  reported: '2026-06-06 09:44', status: '已完成', assignee: '李工', priority: '低' },
  { id: 'WO-2026-0150', device: 'CAB-C02', station: '滨河新村东区',   type: '过温保护触发',  reported: '2026-06-05 21:12', status: '已完成', assignee: '赵工', priority: '中' },
]

// ─── Device Billing State (shared) ───────────────────────────────
// billing_rule_id 外键在 devices 侧，这里是唯一的真相来源
// 双向 UI（规则侧/设备侧）都读写同一份 localStorage，不循环依赖
const DEVICE_BILLING_INIT = {
  'CAB-A01': 'R001', 'CAB-A02': 'R001',
  'CAB-B01': 'R002', 'CAB-B02': 'R002',
  'CAB-C01': 'R001', 'CAB-C02': 'R001',
  'CAB-D01': 'R001', 'CAB-D02': 'R001',
  'CAB-E01': null,   'CAB-F01': null,
  'CAB-G01': null,   'CAB-G02': null,
}
function getDeviceBillingMap() {
  try {
    const s = localStorage.getItem('device_billing_v1')
    if (s) return JSON.parse(s)
  } catch(e) {}
  return { ...DEVICE_BILLING_INIT }
}
function saveDeviceBillingMap(map) {
  localStorage.setItem('device_billing_v1', JSON.stringify(map))
  try { window.dispatchEvent(new CustomEvent('deviceBillingChanged')) } catch(e) {}
}

// ─── DashboardScreen ──────────────────────────────────────────────
function DashboardScreen({ nav }) {

  // ════════════════════════════════════════════
  // 实时数据（每30秒轮询）
  // ════════════════════════════════════════════
  const [liveOnline,   setLiveOnline]   = React.useState(187)
  const [liveCharging, setLiveCharging] = React.useState(156)
  const [liveFaults,   setLiveFaults]   = React.useState(5)
  const [liveAt,       setLiveAt]       = React.useState(new Date())
  const [refreshing,   setRefreshing]   = React.useState(false)

  React.useEffect(() => {
    const id = setInterval(doLiveRefresh, 30000)
    return () => clearInterval(id)
  }, [])

  function doLiveRefresh() {
    setRefreshing(true)
    setTimeout(() => {
      setLiveOnline(v => Math.min(214, Math.max(180, v + Math.round(Math.random() * 4 - 2))))
      setLiveCharging(v => Math.min(200, Math.max(120, v + Math.round(Math.random() * 6 - 3))))
      setLiveFaults(v => Math.max(3, Math.min(8, v + Math.round(Math.random() * 2 - 1))))
      setLiveAt(new Date())
      setRefreshing(false)
    }, 600)
  }

  function fmtTime(d) {
    return d.getHours().toString().padStart(2,'0') + ':' +
           d.getMinutes().toString().padStart(2,'0') + ':' +
           d.getSeconds().toString().padStart(2,'0')
  }

  // ════════════════════════════════════════════
  // T-1 结算数据（昨日固定值，T+0日凌晨跑批后写入）
  // ════════════════════════════════════════════
  const T1_DATE    = '2026-06-09'
  const T1_REVENUE = '9,847'
  const T1_ORDERS  = '3,218'
  const T1_KWH     = '2,641'

  // ════════════════════════════════════════════
  // 图表数据（近7日历史，截至昨日 T-1）
  // ════════════════════════════════════════════
  const revenueData = [
    { label: '6/3', v: 8200 }, { label: '6/4', v: 9100 }, { label: '6/5', v: 7800 },
    { label: '6/6', v: 10200 }, { label: '6/7', v: 11400 }, { label: '6/8', v: 9800 },
    { label: '6/9', v: 9847 },
  ]
  const ordersData = [
    { label: '6/3', v: 2840 }, { label: '6/4', v: 3010 }, { label: '6/5', v: 2660 },
    { label: '6/6', v: 3240 }, { label: '6/7', v: 3580 }, { label: '6/8', v: 3120 },
    { label: '6/9', v: 3218 },
  ]
  const chargeTypes = [
    { label: '直流快充', value: 62, color: ADMIN.primary },
    { label: '交流慢充', value: 28, color: ADMIN.successColor },
    { label: '超充',     value: 10, color: ADMIN.warningColor },
  ]

  // ════════════════════════════════════════════
  // 昨日站点营收排行（T-1，跑批数据）
  // ════════════════════════════════════════════
  const topStations = [
    { rank: 1, name: '滨河新村东区',   revenue: '¥2,218', orders: 486, util: 94 },
    { rank: 2, name: '天府软件园D区',  revenue: '¥2,104', orders: 461, util: 90 },
    { rank: 3, name: '金牛苑南门车棚', revenue: '¥1,876', orders: 412, util: 87 },
    { rank: 4, name: '九眼桥公租房',   revenue: '¥1,643', orders: 360, util: 82 },
    { rank: 5, name: '蓝桥科技园B座',  revenue: '¥1,398', orders: 307, util: 76 },
  ]

  function SectionHeader({ title, right }) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: ADMIN.textPrimary }}>{title}</span>
        {right && <div>{right}</div>}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <style>{`
        @keyframes dashPulse { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(2.8);opacity:0} }
        @keyframes spin { to { transform: rotate(360deg) } }
      `}</style>

      {/* ══════════════ 区块 A：设备状态 ══════════════ */}
      <section>
        <SectionHeader
          title="设备状态"

        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          <StatCard
            label="在线设备" value={String(liveOnline)} unit={`/ 214 台`}
            accentColor={ADMIN.panelBlue}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/></svg>}
          />
          <StatCard
            label="充电中端口" value={String(liveCharging)} unit="个"
            accentColor={ADMIN.panelTeal}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.7"/><path d="M18 10h2a2 2 0 010 4h-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M6 7V5m4 2V5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>}
          />
          <StatCard
            label="活跃故障工单" value={String(liveFaults)} unit="单"
            accentColor={ADMIN.panelRed}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}
          />
        </div>
      </section>

      {/* ══════════════ 区块 B：经营数据 ══════════════ */}
      <section>
        <SectionHeader title="经营数据" right={
          <span style={{ fontSize: 12, color: ADMIN.textSecondary }}>{T1_DATE}</span>
        }/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          <StatCard
            label="营收" value={T1_REVENUE} unit="元"
            delta="+12.4%" up accentColor={ADMIN.panelRed}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M9 8h4.5a2 2 0 010 4H9m0-4v8m0-4h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>}
          />
          <StatCard
            label="完成订单" value={T1_ORDERS} unit="单"
            delta="+8.2%" up accentColor={ADMIN.panelGreen}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>}
          />
          <StatCard
            label="用电量" value={T1_KWH} unit="kWh"
            delta="+5.1%" up accentColor={ADMIN.panelTeal}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12.55a11 11 0 0 1 14.08 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M1.42 9a16 16 0 0 1 21.16 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>}
          />
        </div>
      </section>

      {/* ══════════════ 区块 C：趋势图 ══════════════ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <ElCard title="营收趋势（近7日）">
          <BarChart data={revenueData} height={148}/>
        </ElCard>
        <ElCard title="订单量趋势（近7日）">
          <LineChart data={ordersData} height={148} color={ADMIN.successColor}/>
        </ElCard>

      </div>

      {/* ══════════════ 区块 D：站点排行 ══════════════ */}
      <div>


        <ElCard
          title="昨日站点营收排行 TOP 5"
          padding={0}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f5f7fa' }}>
                {['排名','站点名称','营收','订单数','利用率'].map((h, i) => (
                  <th key={i} style={{
                    padding: '9px 12px', fontWeight: 600, color: ADMIN.textPrimary,
                    borderBottom: `1px solid ${ADMIN.border}`, textAlign: i === 0 ? 'center' : 'left',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topStations.map((s, i) => (
                <tr key={i}
                  style={{ borderBottom: `1px solid ${ADMIN.borderLight}`, background: '#fff' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#ecf5ff'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                >
                  <td style={{ padding: '9px 12px', textAlign: 'center' }}>
                    <div style={{
                      width: 21, height: 21, borderRadius: 4, margin: '0 auto',
                      background: i < 3 ? ADMIN.primary : ADMIN.infoBg,
                      color: i < 3 ? '#fff' : ADMIN.infoColor,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700,
                    }}>{s.rank}</div>
                  </td>
                  <td style={{ padding: '9px 12px', color: ADMIN.textPrimary, fontWeight: 500 }}>{s.name}</td>
                  <td style={{ padding: '9px 12px', color: ADMIN.primary, fontWeight: 600 }}>{s.revenue}</td>
                  <td style={{ padding: '9px 12px', color: ADMIN.textRegular }}>{s.orders}</td>
                  <td style={{ padding: '9px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ flex: 1, height: 5, background: ADMIN.borderLight, borderRadius: 999 }}>
                        <div style={{ width: `${s.util}%`, height: '100%', background: ADMIN.primary, borderRadius: 999 }}/>
                      </div>
                      <span style={{ fontSize: 11.5, color: ADMIN.textSecondary, minWidth: 28 }}>{s.util}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ElCard>
      </div>
    </div>
  )
}

// ─── StationsScreen ───────────────────────────────────────────────
function StationsScreen({ nav }) {
  const [nameFilter,   setNameFilter]   = React.useState('')
  const [idFilter,     setIdFilter]     = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState('all')
  const [page, setPage]                 = React.useState(1)
  const [stationBill,   setStationBill]   = React.useState(() => {
    const billMap = {}
    ;(window.STATION_BILLING_DATA || []).forEach(s => { billMap[s.id] = s })
    return STATIONS_DATA.map(s => billMap[s.id] || { id: s.id, name: s.name, ruleId: null, since: null })
  })
  const [assignStation, setAssignStation] = React.useState(null)
  const [stationToast,  setStationToast]  = React.useState(null)

  const filtered = STATIONS_DATA.filter(s =>
    (statusFilter === 'all' || s.status === statusFilter) &&
    s.name.includes(nameFilter) &&
    s.id.includes(idFilter)
  )

  function doReset() { setNameFilter(''); setIdFilter(''); setStatusFilter('all'); setPage(1) }

  function handleAssign(stationId, ruleId) {
    setStationBill(prev => prev.map(s => s.id === stationId
      ? { ...s, ruleId, since: new Date().toISOString().slice(0,10) }
      : s
    ))
    setAssignStation(null)
    setStationToast('计费规则已更新')
    setTimeout(() => setStationToast(null), 2800)
  }

  const statusTag = v => {
    const t = { '正常': 'success', '告警': 'warning', '故障': 'danger' }
    return <ElTag type={t[v] || 'info'}>{v}</ElTag>
  }

  return (
    <div>
      <PageHeader>
        <ElButton type="primary">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1v9M1 5.5h9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
          新增站点
        </ElButton>
      </PageHeader>
      <ElCard padding={0}>
        <div style={{ padding: '14px 20px', borderBottom: `1px solid ${ADMIN.borderLight}` }}>
          <FilterBar>
            <ElInput placeholder="站点名称" value={nameFilter}
              onChange={e => { setNameFilter(e.target.value); setPage(1) }}
              width={160}/>
            <ElInput placeholder="站点编号（如 S001）" value={idFilter}
              onChange={e => { setIdFilter(e.target.value); setPage(1) }}
              width={160}/>
            <ElSelect value={statusFilter} onChange={v => { setStatusFilter(v); setPage(1) }} options={[
              { value: 'all', label: '全部状态' }, { value: '正常', label: '正常' },
              { value: '告警', label: '告警' },   { value: '故障', label: '故障' },
            ]} width={120}/>
            <ElButton onClick={doReset}>重置</ElButton>
          </FilterBar>
        </div>
        <DataTable
          data={filtered}
          columns={[
            { key: 'id',       title: '编号',   render: v => <span style={{ color: ADMIN.primary, fontWeight: 500 }}>{v}</span> },
            { key: 'name',     title: '站点名称', render: v => <span style={{ color: ADMIN.textPrimary, fontWeight: 500 }}>{v}</span> },
            { key: 'addr',     title: '地址' },
            { key: 'cabinets', title: '充电柜', align: 'center' },
            { key: 'ports',    title: '总口数', align: 'center' },
            { key: 'online',   title: '空闲口', align: 'center', render: v => <span style={{ color: ADMIN.successColor, fontWeight: 600 }}>{v}</span> },
            { key: 'charging', title: '充电中', align: 'center', render: v => <span style={{ color: ADMIN.primary }}>{v}</span> },
            { key: 'alert',    title: '告警', align: 'center', render: v => v > 0 ? <ElTag type="warning">{v}</ElTag> : <span style={{ color: ADMIN.textSecondary }}>—</span> },
            { key: 'status',   title: '状态', render: v => statusTag(v) },
            { key: 'id',       title: '计费规则', render: (id) => {
              const bill  = stationBill.find(s => s.id === id)
              const rules = window.PRICING_RULES_DATA || []
              const rule  = bill && bill.ruleId ? rules.find(r => r.id === bill.ruleId) : null
              if (!rule) return <span style={{ fontSize: 12, color: ADMIN.textSecondary }}>未分配</span>
              return (
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ fontSize: 12.5, color: ADMIN.textRegular }}>{rule.name}</span>
                  <span style={{ fontSize: 11, fontFamily: 'monospace', color: ADMIN.primary, background: ADMIN.primaryLight, padding: '1px 5px', borderRadius: 3 }}>{rule.currentVer}</span>
                </div>
              )
            }},
            { key: 'id',       title: '操作', render: (_, row) => (
              <div style={{ display: 'flex', gap: 2 }}>
                <ElButton type="text" size="small" onClick={() => nav('devices')}>设备</ElButton>
                <ElButton type="text" size="small">编辑</ElButton>
                <ElButton type="text" size="small" onClick={() => {
                  const bill = stationBill.find(s => s.id === row.id) || { id: row.id, name: row.name, ruleId: null, since: null }
                  setAssignStation(bill)
                }}>计费</ElButton>
              </div>
            )},
          ]}
        />
        <div style={{ padding: '0 20px 16px' }}>
          <Pagination total={filtered.length} page={page} pageSize={10} onPageChange={setPage}/>
        </div>
      </ElCard>

      {stationToast && (
        <div style={{ position:'fixed', top:20, left:'50%', transform:'translateX(-50%)', zIndex:2000,
          background: ADMIN.successBg, border: `1px solid ${ADMIN.successBorder}`,
          color: ADMIN.successDark, padding:'9px 18px', borderRadius:6, fontSize:13.5, fontWeight:500,
          boxShadow:'0 4px 16px rgba(0,0,0,0.1)', display:'flex', alignItems:'center', gap:7 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          {stationToast}
        </div>
      )}
      {assignStation && (() => {
        const AssignModal = window.AssignRuleModal
        const rules = window.PRICING_RULES_DATA || []
        return AssignModal ? (
          <AssignModal
            station={assignStation}
            rules={rules}
            onClose={() => setAssignStation(null)}
            onAssign={handleAssign}
          />
        ) : null
      })()}
    </div>
  )
}

// ─── DeviceRuleAssignModal ───────────────────────────────────────
function DeviceRuleAssignModal({ device, billingMap, onClose, onAssign }) {
  const rules = (window.PRICING_RULES_DATA || []).filter(r => r.status === 'active')
  const currentRuleId = billingMap[device.id] != null ? billingMap[device.id] : null
  const [selected, setSelected] = React.useState(currentRuleId)
  const [saving, setSaving]     = React.useState(false)

  function doSave() {
    setSaving(true)
    setTimeout(() => { setSaving(false); onAssign(device.id, selected) }, 600)
  }

  return (
    <div style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(0,0,0,0.45)',
      display:'flex', alignItems:'center', justifyContent:'center' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background:'#fff', borderRadius:8, width:440, overflow:'hidden',
        boxShadow:'0 12px 40px rgba(0,21,41,0.18)', animation:'dropIn .18s ease' }}>
        {/* Header */}
        <div style={{ padding:'18px 24px', borderBottom:`1px solid ${ADMIN.borderLight}`,
          display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontSize:15, fontWeight:600, color:ADMIN.textPrimary }}>设备计费规则</div>
            <div style={{ fontSize:12.5, color:ADMIN.textSecondary, marginTop:2 }}>
              <span style={{ fontFamily:'monospace' }}>{device.id}</span> · {device.station}
            </div>
          </div>
          <div onClick={onClose} style={{ cursor:'pointer', color:ADMIN.textSecondary, display:'flex' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </div>
        </div>
        {/* Body */}
        <div style={{ padding:'16px 24px' }}>
          <div style={{ fontSize:12.5, color:ADMIN.textSecondary, marginBottom:12 }}>选择此设备使用的计费规则</div>
          {/* 无规则 */}
          <div onClick={() => setSelected(null)}
            style={{ padding:'10px 14px', borderRadius:6, marginBottom:6,
              border:`1.5px solid ${selected === null ? ADMIN.primary : ADMIN.border}`,
              background: selected === null ? ADMIN.primaryLight : '#fff', cursor:'pointer', transition:'all .12s' }}>
            <span style={{ fontSize:13, color: selected === null ? ADMIN.primary : ADMIN.textSecondary }}>
              — 不使用任何规则
            </span>
          </div>
          {/* 已发布规则 */}
          {rules.map(rule => (
            <div key={rule.id} onClick={() => setSelected(rule.id)}
              style={{ padding:'12px 14px', borderRadius:6, marginBottom:6,
                border:`1.5px solid ${selected===rule.id ? ADMIN.primary : ADMIN.border}`,
                background: selected===rule.id ? ADMIN.primaryLight : '#fff', cursor:'pointer', transition:'all .12s' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:3 }}>
                <span style={{ fontSize:13.5, fontWeight:600,
                  color: selected===rule.id ? ADMIN.primary : ADMIN.textPrimary }}>{rule.name}</span>
                <span style={{ fontFamily:'monospace', fontSize:12, color:ADMIN.textSecondary,
                  background:ADMIN.bodyBg, padding:'1px 7px', borderRadius:3 }}>{rule.currentVer}</span>
              </div>
              <div style={{ fontSize:12, color:ADMIN.textSecondary }}>{rule.desc}</div>
            </div>
          ))}
          {selected !== currentRuleId && (
            <div style={{ marginTop:10, padding:'9px 12px', borderRadius:5,
              background:ADMIN.warningBg, border:`1px solid ${ADMIN.warningBorder}`,
              fontSize:12.5, color:ADMIN.warningDark }}>
              更换后新规则将在用户<strong>下一次开启充电</strong>时生效。
            </div>
          )}
        </div>
        {/* Footer */}
        <div style={{ padding:'12px 24px 18px', borderTop:`1px solid ${ADMIN.borderLight}`,
          display:'flex', justifyContent:'flex-end', gap:10 }}>
          <ElButton onClick={onClose}>取消</ElButton>
          <ElButton type="primary" onClick={doSave}
            disabled={saving || selected === currentRuleId}>
            {saving ? '保存中…' : '确认'}
          </ElButton>
        </div>
      </div>
    </div>
  )
}

// ─── DevicesScreen ────────────────────────────────────────────────
function DevicesScreen({ nav }) {
  const [statusTab,    setStatusTab]    = React.useState('all')
  const [idFilter,     setIdFilter]     = React.useState('')
  const [stationInput, setStationInput] = React.useState('')
  const [page,         setPage]         = React.useState(1)
  const [billingMap,   setBillingMap]   = React.useState(() => getDeviceBillingMap())
  const [assignDevice, setAssignDevice] = React.useState(null)

  React.useEffect(() => {
    function onChanged() { setBillingMap(getDeviceBillingMap()) }
    window.addEventListener('deviceBillingChanged', onChanged)
    return () => window.removeEventListener('deviceBillingChanged', onChanged)
  }, [])

  function handleDeviceAssign(deviceId, ruleId) {
    const newMap = { ...billingMap, [deviceId]: ruleId }
    saveDeviceBillingMap(newMap)
    setBillingMap(newMap)
    setAssignDevice(null)
  }

  const tabs = ['all', '正常', '故障', '离线']
  const tabLabel = { all: '全部', '正常': '正常', '故障': '故障', '离线': '离线' }

  const filtered = DEVICES_DATA.filter(d =>
    (statusTab === 'all' || d.status === statusTab) &&
    d.id.includes(idFilter) &&
    d.station.includes(stationInput)
  )

  function doReset() { setIdFilter(''); setStationInput(''); setStatusTab('all'); setPage(1) }

  const statusTag = v => {
    const t = { '正常': 'success', '故障': 'danger', '离线': 'info' }
    return <ElTag type={t[v] || 'info'}>{v}</ElTag>
  }

  return (
    <div>
      <PageHeader>
        <ElButton type="primary">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1v9M1 5.5h9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
          添加设备
        </ElButton>
      </PageHeader>

      <ElCard padding={0}>
        <div style={{ padding: '14px 20px', borderBottom: `1px solid ${ADMIN.borderLight}`, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <ElInput placeholder="设备编号（如 CAB-A01）" value={idFilter}
            onChange={e => { setIdFilter(e.target.value); setPage(1) }}
            width={180}/>
          <ElInput placeholder="所属站点" value={stationInput}
            onChange={e => { setStationInput(e.target.value); setPage(1) }}
            width={160}/>
          <ElSelect value={statusTab} onChange={v => { setStatusTab(v); setPage(1) }} width={120}
            options={tabs.map(t => ({ value: t, label: t === 'all' ? '全部状态' : tabLabel[t] }))}/>
          <ElButton onClick={doReset}>重置</ElButton>
        </div>
        <DataTable
          data={filtered}
          columns={[
            { key: 'id',        title: '设备编号', render: v => <span style={{ color: ADMIN.primary, fontWeight: 500 }}>{v}</span> },
            { key: 'station',   title: '所属站点' },
            { key: 'type',  title: '设备类型' },
            { key: 'ports', title: '口数', align: 'center' },
            { key: 'status',   title: '设备状态', render: v => statusTag(v) },
            { key: 'lastMaint', title: '上次维护' },
            { key: 'id', title: '计费规则', render: id => {
              const ruleId = billingMap[id]
              if (!ruleId) return <span style={{ fontSize:12, color:ADMIN.textSecondary }}>未分配</span>
              const rule = (window.PRICING_RULES_DATA || []).find(r => r.id === ruleId)
              if (!rule) return <span style={{ fontSize:12, color:ADMIN.textSecondary }}>—</span>
              return (
                <div>
                  <div style={{ fontSize:12.5, color:ADMIN.textRegular }}>{rule.name}</div>
                  <div style={{ fontSize:11, fontFamily:'monospace', color:ADMIN.primary }}>{rule.currentVer}</div>
                </div>
              )
            }},
            { key: 'id',        title: '操作', render: (_, row) => (
              <div style={{ display: 'flex', gap: 2 }}>
                {(row.status === '故障' || row.status === '离线')
                  ? <ElButton type="danger" size="small" onClick={() => nav('tickets')}>报修</ElButton>
                  : <ElButton type="text" size="small">详情</ElButton>}
                <ElButton type="text" size="small">维护</ElButton>
                <ElButton type="text" size="small" onClick={() => setAssignDevice(row)}>计费</ElButton>
              </div>
            )},
          ]}
        />
        <div style={{ padding: '0 20px 16px' }}>
          <Pagination total={filtered.length} page={page} pageSize={10} onPageChange={setPage}/>
        </div>
      </ElCard>

      {assignDevice && (
        <DeviceRuleAssignModal
          device={assignDevice}
          billingMap={billingMap}
          onClose={() => setAssignDevice(null)}
          onAssign={handleDeviceAssign}
        />
      )}
    </div>
  )
}

// ─── TicketsScreen ────────────────────────────────────────────────
function TicketsScreen({ nav }) {
  const [statusFilter, setStatusFilter] = React.useState('all')
  const [page, setPage]                 = React.useState(1)
  const [idFilter,     setIdFilter]     = React.useState('')
  const [stationSel,   setStationSel]   = React.useState('all')

  const counts = {
    all: TICKETS_DATA.length,
    '待处理': TICKETS_DATA.filter(t => t.status === '待处理').length,
    '处理中': TICKETS_DATA.filter(t => t.status === '处理中').length,
    '已完成': TICKETS_DATA.filter(t => t.status === '已完成').length,
  }
  const ticketStations = [...new Set(TICKETS_DATA.map(t => t.station))]

  const filtered = TICKETS_DATA.filter(t =>
    (statusFilter === 'all' || t.status === statusFilter) &&
    (stationSel   === 'all' || t.station === stationSel) &&
    t.id.includes(idFilter)
  )

  function doReset() { setIdFilter(''); setStationSel('all'); setStatusFilter('all'); setPage(1) }

  const priorityTag = v => <ElTag type={{ '高': 'danger', '中': 'warning', '低': 'info' }[v]}>{v}</ElTag>
  const statusTag   = v => <ElTag type={{ '待处理': 'danger', '处理中': 'warning', '已完成': 'success' }[v]}>{v}</ElTag>

  return (
    <div>
      <PageHeader>
        <ElButton type="primary">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1v9M1 5.5h9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
          新建工单
        </ElButton>
      </PageHeader>

      {/* stat mini cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 18 }}>
        {[
          { label: '全部工单',  count: counts.all,       color: ADMIN.primary },
          { label: '待处理',    count: counts['待处理'], color: ADMIN.dangerColor },
          { label: '处理中',    count: counts['处理中'], color: ADMIN.warningColor },
          { label: '已完成',    count: counts['已完成'], color: ADMIN.successColor },
        ].map((s, i) => (
          <ElCard key={i} padding="16px 20px">
            <div style={{ fontSize: 13, color: ADMIN.textSecondary, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.count}</div>
          </ElCard>
        ))}
      </div>

      <ElCard padding={0}>
        <div style={{ padding: '14px 20px', borderBottom: `1px solid ${ADMIN.borderLight}`, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <ElInput placeholder="工单号（如 WO-2026-0156）" value={idFilter}
            onChange={e => { setIdFilter(e.target.value); setPage(1) }}
            width={200}/>
          <ElSelect value={stationSel} onChange={v => { setStationSel(v); setPage(1) }} width={150}
            options={[{ value: 'all', label: '全部站点' }, ...ticketStations.map(s => ({ value: s, label: s }))]}/>
          <ElSelect value={statusFilter} onChange={v => { setStatusFilter(v); setPage(1) }} width={120}
            options={[
              { value: 'all', label: '全部状态' },
              { value: '待处理', label: '待处理' },
              { value: '处理中', label: '处理中' },
              { value: '已完成', label: '已完成' },
            ]}/>
          <ElButton onClick={doReset}>重置</ElButton>
        </div>
        <DataTable
          data={filtered}
          columns={[
            { key: 'id',       title: '工单号',   render: v => <span style={{ fontSize: 12, color: ADMIN.primary, fontWeight: 500 }}>{v}</span> },
            { key: 'device',   title: '设备编号' },
            { key: 'station',  title: '所属站点' },
            { key: 'type',     title: '故障类型' },
            { key: 'priority', title: '优先级', render: v => priorityTag(v) },
            { key: 'reported', title: '上报时间' },
            { key: 'status',   title: '状态', render: v => statusTag(v) },
            { key: 'assignee', title: '负责人' },
            { key: 'id',       title: '操作', render: (_, row) => (
              <div style={{ display: 'flex', gap: 2 }}>
                {row.status !== '已完成' && <ElButton type="primary" size="small">派工</ElButton>}
                <ElButton type="text" size="small">详情</ElButton>
              </div>
            )},
          ]}
        />
        <div style={{ padding: '0 20px 16px' }}>
          <Pagination total={filtered.length} page={page} pageSize={10} onPageChange={setPage}/>
        </div>
      </ElCard>
    </div>
  )
}

// ─── OrdersScreen ─────────────────────────────────────────────────
const ORDERS_DATA = [
  { id: 'ORD-20260610-8821', user: '王小明', phone: '138****8821', station: '金牛苑南门车棚',  device: 'CAB-A01', port: '05', startTime: '2026-06-10 08:14', endTime: '2026-06-10 10:32', duration: '2h 18m', kwh: 1.84, amount: '¥3.20', status: '已完成' },
  { id: 'ORD-20260610-6622', user: '李佳丽', phone: '139****6622', station: '滨河新村东区',    device: 'CAB-C01', port: '03', startTime: '2026-06-10 07:50', endTime: '2026-06-10 09:50', duration: '2h 00m', kwh: 1.60, amount: '¥2.88', status: '已完成' },
  { id: 'ORD-20260610-3312', user: '张大勇', phone: '150****3312', station: '天府软件园D区',   device: 'CAB-D01', port: '11', startTime: '2026-06-10 09:05', endTime: '',                   duration: '—',      kwh: 0.92, amount: '¥1.66', status: '充电中' },
  { id: 'ORD-20260610-4401', user: '赵雪梅', phone: '186****4401', station: '蓝桥科技园B座',   device: 'CAB-B01', port: '08', startTime: '2026-06-10 06:30', endTime: '2026-06-10 08:28', duration: '1h 58m', kwh: 1.52, amount: '¥2.74', status: '已完成' },
  { id: 'ORD-20260610-2290', user: '陈浩天', phone: '155****2290', station: '九眼桥公租房',    device: 'CAB-F01', port: '02', startTime: '2026-06-10 10:00', endTime: '',                   duration: '—',      kwh: 0.48, amount: '¥0.86', status: '充电中' },
  { id: 'ORD-20260610-8834', user: '刘思远', phone: '177****8834', station: '金牛苑南门车棚',  device: 'CAB-A02', port: '07', startTime: '2026-06-10 07:22', endTime: '2026-06-10 09:18', duration: '1h 56m', kwh: 1.48, amount: '¥2.66', status: '已完成' },
  { id: 'ORD-20260610-1156', user: '周天宇', phone: '182****1156', station: '双楠实验小学',    device: 'CAB-E01', port: '01', startTime: '2026-06-10 05:45', endTime: '2026-06-10 07:45', duration: '2h 00m', kwh: 1.60, amount: '¥2.88', status: '已完成' },
  { id: 'ORD-20260610-5573', user: '吴玲玲', phone: '133****5573', station: '滨河新村东区',    device: 'CAB-C02', port: '09', startTime: '2026-06-10 08:40', endTime: '2026-06-10 10:40', duration: '2h 00m', kwh: 1.60, amount: '¥2.88', status: '已完成' },
  { id: 'ORD-20260610-9920', user: '孙浩宇', phone: '188****9920', station: '玉林东路菜市场',  device: 'CAB-H01', port: '04', startTime: '2026-06-10 09:30', endTime: '',                   duration: '—',      kwh: 0.30, amount: '¥0.54', status: '充电中' },
  { id: 'ORD-20260610-6645', user: '郑雅芸', phone: '159****6645', station: '锦官城小区',      device: 'CAB-L01', port: '06', startTime: '2026-06-10 07:10', endTime: '2026-06-10 09:05', duration: '1h 55m', kwh: 1.44, amount: '¥2.59', status: '已完成' },
  { id: 'ORD-20260609-4412', user: '王小明', phone: '138****8821', station: '金牛苑南门车棚',  device: 'CAB-A01', port: '05', startTime: '2026-06-09 20:10', endTime: '2026-06-09 22:08', duration: '1h 58m', kwh: 1.52, amount: '¥2.74', status: '已完成' },
  { id: 'ORD-20260609-7730', user: '陈浩天', phone: '155****2290', station: '天府软件园D区',   device: 'CAB-D01', port: '03', startTime: '2026-06-09 19:00', endTime: '2026-06-09 21:00', duration: '2h 00m', kwh: 1.60, amount: '¥2.88', status: '已完成' },
  { id: 'ORD-20260609-2281', user: '李佳丽', phone: '139****6622', station: '九眼桥公租房',    device: 'CAB-F01', port: '10', startTime: '2026-06-09 18:30', endTime: '2026-06-09 20:22', duration: '1h 52m', kwh: 1.42, amount: '¥2.56', status: '已完成' },
  { id: 'ORD-20260609-9901', user: '刘思远', phone: '177****8834', station: '蓝桥科技园B座',   device: 'CAB-B01', port: '02', startTime: '2026-06-09 17:45', endTime: '2026-06-09 19:45', duration: '2h 00m', kwh: 1.60, amount: '¥2.88', status: '已完成' },
  { id: 'ORD-20260609-3358', user: '张大勇', phone: '150****3312', station: '滨河新村东区',    device: 'CAB-C01', port: '07', startTime: '2026-06-09 21:00', endTime: '2026-06-09 23:05', duration: '2h 05m', kwh: 1.70, amount: '¥3.06', status: '已完成' },
  { id: 'ORD-20260609-6614', user: '赵雪梅', phone: '186****4401', station: '锦官城小区',      device: 'CAB-L01', port: '01', startTime: '2026-06-09 06:00', endTime: '2026-06-09 08:10', duration: '2h 10m', kwh: 1.74, amount: '¥3.13', status: '已完成' },
  { id: 'ORD-20260609-1127', user: '吴玲玲', phone: '133****5573', station: '金牛苑南门车棚',  device: 'CAB-A02', port: '12', startTime: '2026-06-09 22:30', endTime: '2026-06-10 00:28', duration: '1h 58m', kwh: 1.52, amount: '¥2.74', status: '已完成' },
  { id: 'ORD-20260609-8843', user: '孙浩宇', phone: '188****9920', station: '双楠实验小学',    device: 'CAB-E01', port: '08', startTime: '2026-06-09 07:00', endTime: '2026-06-09 08:58', duration: '1h 58m', kwh: 1.52, amount: '¥2.74', status: '已完成' },
  { id: 'ORD-20260609-5529', user: '郑雅芸', phone: '159****6645', station: '天府软件园D区',   device: 'CAB-D01', port: '06', startTime: '2026-06-09 08:15', endTime: '2026-06-09 10:15', duration: '2h 00m', kwh: 1.60, amount: '¥2.88', status: '已完成' },
  { id: 'ORD-20260609-3310', user: '周天宇', phone: '182****1156', station: '玉林东路菜市场',  device: 'CAB-H01', port: '03', startTime: '2026-06-09 19:30', endTime: '2026-06-09 21:25', duration: '1h 55m', kwh: 1.44, amount: '¥2.59', status: '已完成' },
]

function OrdersScreen() {
  const [idFilter,      setIdFilter]      = React.useState('')
  const [nameFilter,    setNameFilter]    = React.useState('')
  const [phoneFilter,   setPhoneFilter]   = React.useState('')
  const [statusFilter,  setStatusFilter]  = React.useState('all')
  const [stationFilter, setStationFilter] = React.useState('all')
  const [dateFilter,    setDateFilter]    = React.useState('today')
  const [page,          setPage]          = React.useState(1)
  const [pageSize,      setPageSize]      = React.useState(10)
  const [detailOrder,   setDetailOrder]   = React.useState(null)

  const stationOptions = [
    { value: 'all', label: '全部站点' },
    ...Array.from(new Set(ORDERS_DATA.map(o => o.station))).map(s => ({ value: s, label: s }))
  ]

  const todayOrders  = ORDERS_DATA.filter(o => o.id.includes('20260610'))
  const activeOrders = dateFilter === 'today' ? todayOrders : ORDERS_DATA

  const filtered = activeOrders.filter(o =>
    (statusFilter  === 'all' || o.status  === statusFilter) &&
    (stationFilter === 'all' || o.station === stationFilter) &&
    o.id.includes(idFilter) &&
    o.user.includes(nameFilter) &&
    o.phone.includes(phoneFilter)
  )

  function reset() { setIdFilter(''); setNameFilter(''); setPhoneFilter(''); setStatusFilter('all'); setStationFilter('all'); setPage(1) }

  const totalPages   = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paginated    = filtered.slice((page - 1) * pageSize, page * pageSize)

  const totalKwh     = filtered.reduce((s, o) => s + o.kwh, 0).toFixed(2)
  const totalAmount  = filtered.reduce((s, o) => s + parseFloat(o.amount.replace('¥', '')), 0).toFixed(2)
  const chargingCnt  = filtered.filter(o => o.status === '充电中').length
  const doneCnt      = filtered.filter(o => o.status === '已完成').length

  const statusTag = v => <ElTag type={v === '已完成' ? 'success' : v === '充电中' ? 'primary' : 'info'}>{v}</ElTag>



  return (
    <div>
      <PageHeader>
        <ElButton>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke={ADMIN.textRegular} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          导出
        </ElButton>
      </PageHeader>

      {/* 统计小卡 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 18 }}>
        {[
          { label: dateFilter === 'today' ? '今日订单' : '全部订单', value: filtered.length,   unit: '单',  color: ADMIN.primary },
          { label: '充电中',                                         value: chargingCnt,        unit: '单',  color: ADMIN.warningColor },
          { label: '已完成',                                         value: doneCnt,            unit: '单',  color: ADMIN.successColor },
          { label: '累计用电量',                                     value: totalKwh,           unit: 'kWh', color: ADMIN.primary },
        ].map((s, i) => (
          <ElCard key={i} padding="16px 20px">
            <div style={{ fontSize: 12.5, color: ADMIN.textSecondary, marginBottom: 5 }}>{s.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontSize: 26, fontWeight: 700, color: s.color, fontVariantNumeric: 'tabular-nums' }}>{s.value}</span>
              <span style={{ fontSize: 12, color: ADMIN.textSecondary }}>{s.unit}</span>
            </div>
          </ElCard>
        ))}
      </div>

      <ElCard padding={0}>
        {/* 筛选栏 */}
        <div style={{ padding: '14px 20px', borderBottom: `1px solid ${ADMIN.borderLight}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            {/* 日期快选 */}
            <div style={{ display: 'flex', borderRadius: 4, overflow: 'hidden', border: `1px solid ${ADMIN.border}` }}>
              {[{ key: 'today', label: '今日' }, { key: 'all', label: '全部' }].map(({ key, label }) => (
                <button key={key} onClick={() => { setDateFilter(key); setPage(1) }} style={{
                  padding: '5px 14px', fontSize: 13, border: 'none', cursor: 'pointer',
                  background: dateFilter === key ? ADMIN.primary : '#fff',
                  color: dateFilter === key ? '#fff' : ADMIN.textRegular,
                  fontWeight: dateFilter === key ? 600 : 400,
                }}>{label}</button>
              ))}
            </div>
            <ElInput placeholder="订单号" value={idFilter}
              onChange={e => { setIdFilter(e.target.value); setPage(1) }}
              width={160}/>
            <ElInput placeholder="用户昵称" value={nameFilter}
              onChange={e => { setNameFilter(e.target.value); setPage(1) }}
              width={130}/>
            <ElInput placeholder="手机号" value={phoneFilter}
              onChange={e => { setPhoneFilter(e.target.value); setPage(1) }}
              width={130}/>
            <ElSelect value={statusFilter} onChange={v => { setStatusFilter(v); setPage(1) }} options={[
              { value: 'all', label: '全部状态' }, { value: '充电中', label: '充电中' }, { value: '已完成', label: '已完成' },
            ]} width={110}/>
            <ElSelect value={stationFilter} onChange={v => { setStationFilter(v); setPage(1) }}
              options={stationOptions} width={150}/>
            <ElButton onClick={reset}>重置</ElButton>
          </div>
        </div>

        {/* 表格 */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f5f7fa' }}>
                {['订单号','用户','站点','设备/插口','开始时间','时长','用电量','金额','状态','操作'].map((h, i) => (
                  <th key={i} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: ADMIN.textPrimary, borderBottom: `1px solid ${ADMIN.border}`, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 && (
                <tr><td colSpan={11} style={{ padding: '40px', textAlign: 'center', color: ADMIN.textSecondary }}>暂无数据</td></tr>
              )}
              {paginated.map((o, i) => (
                <tr key={i} style={{ background: '#fff', borderBottom: `1px solid ${ADMIN.borderLight}` }}
                  onMouseEnter={e => e.currentTarget.style.background = '#ecf5ff'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                  <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                    <span style={{ fontSize: 12, color: ADMIN.primary, fontFamily: 'monospace', fontWeight: 500 }}>{o.id}</span>
                  </td>
                  <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                    <div style={{ fontWeight: 500, color: ADMIN.textPrimary }}>{o.user}</div>
                    <div style={{ fontSize: 11.5, color: ADMIN.textSecondary }}>{o.phone}</div>
                  </td>
                  <td style={{ padding: '10px 12px', color: ADMIN.textRegular, whiteSpace: 'nowrap' }}>{o.station}</td>
                  <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 12, color: ADMIN.textSecondary }}>{o.device}</span>
                    <span style={{ marginLeft: 5, fontSize: 12, color: ADMIN.textSecondary }}>#{o.port}</span>
                  </td>
                  <td style={{ padding: '10px 12px', color: ADMIN.textRegular, whiteSpace: 'nowrap', fontSize: 12.5 }}>{o.startTime}</td>
                  <td style={{ padding: '10px 12px', color: ADMIN.textRegular, whiteSpace: 'nowrap' }}>
                    {o.status === '充电中'
                      ? <span style={{ color: ADMIN.warningColor, fontWeight: 500 }}>进行中</span>
                      : o.duration}
                  </td>
                  <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                    <span style={{ color: ADMIN.textPrimary, fontWeight: 500 }}>{o.kwh}</span>
                    <span style={{ fontSize: 11.5, color: ADMIN.textSecondary, marginLeft: 2 }}>kWh</span>
                  </td>
                  <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                    <span style={{ color: ADMIN.primary, fontWeight: 600 }}>{o.amount}</span>
                  </td>
                  <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>{statusTag(o.status)}</td>
                  <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                    <ElButton type="text" size="small" onClick={() => setDetailOrder(o)}>详情</ElButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ padding: '0 20px 16px' }}>
          <Pagination total={filtered.length} page={page} pageSize={pageSize}
            onPageChange={p => setPage(p)} onPageSizeChange={s => { setPageSize(s); setPage(1) }}/>
        </div>
      </ElCard>

      {/* 订单详情弹窗 */}
      {detailOrder && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={e => { if (e.target === e.currentTarget) setDetailOrder(null) }}>
          <div style={{ background: '#fff', borderRadius: 8, width: 500, boxShadow: '0 12px 40px rgba(0,21,41,0.18)', overflow: 'hidden', animation: 'dropIn .18s ease' }}>
            {/* header */}
            <div style={{ padding: '18px 24px', borderBottom: `1px solid ${ADMIN.borderLight}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: ADMIN.textPrimary }}>订单详情</div>
                <div style={{ fontSize: 12, fontFamily: 'monospace', color: ADMIN.textSecondary, marginTop: 2 }}>{detailOrder.id}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {statusTag(detailOrder.status)}
                <div onClick={() => setDetailOrder(null)} style={{ cursor: 'pointer', color: ADMIN.textSecondary, display: 'flex' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
              </div>
            </div>
            {/* body */}
            <div style={{ padding: '20px 24px' }}>
              {/* 金额大字 */}
              <div style={{ textAlign: 'center', padding: '12px 0 20px', borderBottom: `1px solid ${ADMIN.borderLight}`, marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: ADMIN.textSecondary, marginBottom: 4 }}>实付金额</div>
                <div style={{ fontSize: 36, fontWeight: 700, color: ADMIN.primary, letterSpacing: -1 }}>{detailOrder.amount}</div>

              </div>
              {/* 详情格 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px' }}>
                {[
                  { label: '用户', value: `${detailOrder.user}（${detailOrder.phone}）` },
                  { label: '站点', value: detailOrder.station },
                  { label: '设备', value: detailOrder.device },
                  { label: '插口', value: `#${detailOrder.port}` },
                  { label: '开始时间', value: detailOrder.startTime },
                  { label: '结束时间', value: detailOrder.endTime || '充电中…' },
                  { label: '充电时长', value: detailOrder.status === '充电中' ? '进行中' : detailOrder.duration },
                  { label: '用电量', value: `${detailOrder.kwh} kWh` },
                ].map(({ label, value }, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 12, color: ADMIN.textSecondary, marginBottom: 3 }}>{label}</div>
                    <div style={{ fontSize: 13, color: ADMIN.textPrimary, fontWeight: 500 }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '12px 24px 18px', borderTop: `1px solid ${ADMIN.borderLight}`, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              {detailOrder.status === '充电中' && <ElButton type="danger" size="small">强制停止</ElButton>}
              <ElButton onClick={() => setDetailOrder(null)}>关闭</ElButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

Object.assign(window, {
  DashboardScreen, StationsScreen, DevicesScreen, TicketsScreen, OrdersScreen,
  DEVICES_DATA, getDeviceBillingMap, saveDeviceBillingMap,
})
