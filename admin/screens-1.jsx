// admin/screens-1.jsx — Dashboard, Stations, Devices, Tickets, Orders（antd 重构版）
/* global antd */

// ─── mock data ────────────────────────────────────────────────────
const STATIONS_DATA = [
  { id:'S001', name:'金牛苑南门车棚',  addr:'金牛区金牛苑小区南门停车棚',    cabinets:4, ports:48, online:46, idle:20, charging:26, faultDevices:0, offlineDevices:0 },
  { id:'S002', name:'蓝桥科技园B座',   addr:'高新区蓝桥科技园B座地下车棚',   cabinets:3, ports:36, online:32, idle:14, charging:18, faultDevices:1, offlineDevices:0 },
  { id:'S003', name:'滨河新村东区',    addr:'武侯区滨河新村东区非机动车棚',  cabinets:5, ports:60, online:60, idle:28, charging:32, faultDevices:0, offlineDevices:0 },
  { id:'S004', name:'锦官城小区',      addr:'锦江区锦官城小区B栋停车棚',    cabinets:2, ports:24, online:22, idle:10, charging:12, faultDevices:0, offlineDevices:0 },
  { id:'S005', name:'天府软件园D区',   addr:'高新区天府软件园D区非机动车棚', cabinets:6, ports:72, online:68, idle:30, charging:38, faultDevices:0, offlineDevices:1 },
  { id:'S006', name:'双楠实验小学',    addr:'武侯区双楠路小学东侧车棚',      cabinets:2, ports:24, online:24, idle:12, charging:12, faultDevices:0, offlineDevices:0 },
  { id:'S007', name:'九眼桥公租房',    addr:'锦江区九眼桥公租房非机动车棚',  cabinets:4, ports:48, online:46, idle:22, charging:24, faultDevices:0, offlineDevices:0 },
  { id:'S008', name:'新津农贸市场',    addr:'新津区新津路农贸市场停车棚',    cabinets:2, ports:24, online:14, idle:12, charging: 2, faultDevices:2, offlineDevices:0 },
  { id:'S009', name:'三圣乡社区中心',  addr:'锦江区三圣乡社区活动中心车棚',  cabinets:2, ports:24, online:24, idle:12, charging:12, faultDevices:0, offlineDevices:0 },
  { id:'S010', name:'玉林东路菜市场',  addr:'武侯区玉林东路菜市场旁车棚',    cabinets:3, ports:36, online:35, idle:18, charging:17, faultDevices:0, offlineDevices:0 },
]

const DEVICES_DATA = [
  { id:'CAB-A01', station:'金牛苑南门车棚', type:'充电柜 12口', ports:12, is_online:true,  maintenance_mode:false, orders:28, kwh:8.4,  lastMaint:'2026-05-12' },
  { id:'CAB-A02', station:'金牛苑南门车棚', type:'充电柜 12口', ports:12, is_online:true,  maintenance_mode:false, orders:31, kwh:9.1,  lastMaint:'2026-05-12' },
  { id:'CAB-B01', station:'蓝桥科技园B座',  type:'充电柜 12口', ports:12, is_online:true,  maintenance_mode:false, orders:24, kwh:7.2,  lastMaint:'2026-04-28' },
  { id:'CAB-B02', station:'蓝桥科技园B座',  type:'充电柜 12口', ports:12, is_online:true,  maintenance_mode:false, orders:0,  kwh:0,    lastMaint:'2026-03-15' },
  { id:'CAB-C01', station:'滨河新村东区',   type:'充电柜 12口', ports:12, is_online:true,  maintenance_mode:false, orders:35, kwh:10.2, lastMaint:'2026-05-20' },
  { id:'CAB-C02', station:'滨河新村东区',   type:'充电柜 12口', ports:12, is_online:true,  maintenance_mode:false, orders:22, kwh:6.6,  lastMaint:'2026-05-20' },
  { id:'CAB-D01', station:'天府软件园D区',  type:'充电柜 12口', ports:12, is_online:true,  maintenance_mode:false, orders:42, kwh:12.6, lastMaint:'2026-05-01' },
  { id:'CAB-D02', station:'天府软件园D区',  type:'充电柜 12口', ports:12, is_online:false, maintenance_mode:false, orders:0,  kwh:0,    lastMaint:'2026-04-10' },
  { id:'CAB-E01', station:'双楠实验小学',   type:'充电柜 12口', ports:12, is_online:true,  maintenance_mode:true,  orders:0,  kwh:0,    lastMaint:'2026-05-18' },
  { id:'CAB-F01', station:'九眼桥公租房',   type:'充电柜 12口', ports:12, is_online:true,  maintenance_mode:false, orders:33, kwh:9.9,  lastMaint:'2026-05-14' },
  { id:'CAB-G01', station:'新津农贸市场',   type:'充电柜 12口', ports:12, is_online:true,  maintenance_mode:false, orders:0,  kwh:0,    lastMaint:'2026-02-28' },
  { id:'CAB-G02', station:'新津农贸市场',   type:'充电柜 12口', ports:12, is_online:true,  maintenance_mode:false, orders:0,  kwh:0,    lastMaint:'2026-02-28' },
]

const TICKETS_DATA = [
  { id:'WO-2026-0156', device:'CAB-B02', station:'蓝桥科技园B座',  type:'主板通信故障', reported:'2026-06-08 14:22', status:'处理中', assignee:'李工', priority:'高' },
  { id:'WO-2026-0155', device:'CAB-G01', station:'新津农贸市场',   type:'插座接触不良', reported:'2026-06-08 09:15', status:'处理中', assignee:'王工', priority:'高' },
  { id:'WO-2026-0154', device:'CAB-G02', station:'新津农贸市场',   type:'网络离线',     reported:'2026-06-07 18:43', status:'待处理', assignee:'—',    priority:'中' },
  { id:'WO-2026-0153', device:'CAB-D02', station:'天府软件园D区',  type:'断路器跳闸',   reported:'2026-06-07 11:30', status:'待处理', assignee:'—',    priority:'中' },
  { id:'WO-2026-0152', device:'CAB-E01', station:'双楠实验小学',   type:'计量模块异常', reported:'2026-06-06 16:08', status:'已完成', assignee:'张工', priority:'低' },
  { id:'WO-2026-0151', device:'CAB-A01', station:'金牛苑南门车棚', type:'刷卡模块故障', reported:'2026-06-06 09:44', status:'已完成', assignee:'李工', priority:'低' },
  { id:'WO-2026-0150', device:'CAB-C02', station:'滨河新村东区',   type:'过温保护触发', reported:'2026-06-05 21:12', status:'已完成', assignee:'赵工', priority:'中' },
]

const DEVICE_BILLING_INIT = {
  'CAB-A01':'R001','CAB-A02':'R001','CAB-B01':'R002','CAB-B02':'R002',
  'CAB-C01':'R001','CAB-C02':'R001','CAB-D01':'R001','CAB-D02':'R001',
  'CAB-E01':null,  'CAB-F01':null,  'CAB-G01':null,  'CAB-G02':null,
}

function getDeviceBillingMap() {
  try { const s = localStorage.getItem('device_billing_v1'); if (s) return JSON.parse(s) } catch(e) {}
  return { ...DEVICE_BILLING_INIT }
}
function saveDeviceBillingMap(map) {
  localStorage.setItem('device_billing_v1', JSON.stringify(map))
  try { window.dispatchEvent(new CustomEvent('deviceBillingChanged')) } catch(e) {}
}

function getDeviceDisplayStatus(d, maintenanceSet) {
  const inMaint = maintenanceSet ? maintenanceSet.has(d.id) : d.maintenance_mode
  if (!d.is_online) return '离线'
  if (inMaint)      return '维护中'
  return '在线'
}

const DEVICE_STATUS_COUNTS = (() => {
  const c = { '在线':0, '维护中':0, '离线':0 }
  DEVICES_DATA.forEach(d => { c[getDeviceDisplayStatus(d)]++ })
  return c
})()

// ─── DashboardScreen ──────────────────────────────────────────────
function DashboardScreen({ nav }) {
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
      setLiveOnline(v => Math.min(214, Math.max(180, v + Math.round(Math.random()*4-2))))
      setLiveCharging(v => Math.min(200, Math.max(120, v + Math.round(Math.random()*6-3))))
      setLiveFaults(v => Math.max(3, Math.min(8, v + Math.round(Math.random()*2-1))))
      setLiveAt(new Date()); setRefreshing(false)
    }, 600)
  }

  function fmtTime(d) {
    return d.getHours().toString().padStart(2,'0')+':'+d.getMinutes().toString().padStart(2,'0')+':'+d.getSeconds().toString().padStart(2,'0')
  }

  const T1_DATE='2026-06-09', T1_REVENUE='9,847', T1_ORDERS='3,218', T1_KWH='2,641'
  const revenueData=[{label:'6/3',v:8200},{label:'6/4',v:9100},{label:'6/5',v:7800},{label:'6/6',v:10200},{label:'6/7',v:11400},{label:'6/8',v:9800},{label:'6/9',v:9847}]
  const ordersData=[{label:'6/3',v:2840},{label:'6/4',v:3010},{label:'6/5',v:2660},{label:'6/6',v:3240},{label:'6/7',v:3580},{label:'6/8',v:3120},{label:'6/9',v:3218}]
  const topStations=[
    {rank:1,name:'滨河新村东区',  revenue:'¥2,218',orders:486,util:94},
    {rank:2,name:'天府软件园D区', revenue:'¥2,104',orders:461,util:90},
    {rank:3,name:'金牛苑南门车棚',revenue:'¥1,876',orders:412,util:87},
    {rank:4,name:'九眼桥公租房',  revenue:'¥1,643',orders:360,util:82},
    {rank:5,name:'蓝桥科技园B座', revenue:'¥1,398',orders:307,util:76},
  ]

  function SectionHeader({ title, right }) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
        <span style={{ fontSize:13.5, fontWeight:600, color:ADMIN.textPrimary }}>{title}</span>
        {right && <div>{right}</div>}
      </div>
    )
  }

  const rankingCols = [
    { key:'rank',    title:'排名', align:'center', render: (v,_,i) => (
      <div style={{ width:21,height:21,borderRadius:4,margin:'0 auto',background:i<3?ADMIN.primary:ADMIN.infoBg,color:i<3?'#fff':ADMIN.infoColor,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700 }}>{v}</div>
    )},
    { key:'name',    title:'站点名称', render: v => <span style={{ color:ADMIN.textPrimary, fontWeight:500 }}>{v}</span> },
    { key:'revenue', title:'营收', render: v => <span style={{ color:ADMIN.primary, fontWeight:600 }}>{v}</span> },
    { key:'orders',  title:'订单数' },
    { key:'util',    title:'利用率', render: v => (
      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
        <div style={{ flex:1, height:5, background:ADMIN.borderLight, borderRadius:999 }}>
          <div style={{ width:`${v}%`, height:'100%', background:ADMIN.primary, borderRadius:999 }}/>
        </div>
        <span style={{ fontSize:11.5, color:ADMIN.textSecondary, minWidth:28 }}>{v}%</span>
      </div>
    )},
  ]

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:22 }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>

      <section>
        <SectionHeader title="设备状态" right={
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            {refreshing && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ animation:'spin .8s linear infinite' }}><path d="M12 2a10 10 0 1 0 10 10" stroke={ADMIN.primary} strokeWidth="2" strokeLinecap="round"/></svg>}
            <span style={{ fontSize:11.5, color:ADMIN.textSecondary }}>{fmtTime(liveAt)} 更新</span>
          </div>
        }/>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:10 }}>
          <StatCard label="在线设备" value={String(liveOnline)} unit="/ 214 台" accentColor={ADMIN.panelBlue}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/></svg>}/>
          <StatCard label="充电中端口" value={String(liveCharging)} unit="个" accentColor={ADMIN.panelTeal}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.7"/><path d="M18 10h2a2 2 0 010 4h-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M6 7V5m4 2V5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>}/>
          <StatCard label="活跃故障工单" value={String(liveFaults)} unit="单" accentColor={ADMIN.panelRed}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}/>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
          {[
            {label:'在线',   count:DEVICE_STATUS_COUNTS['在线'],   color:ADMIN.successColor, bg:ADMIN.successBg},
            {label:'维护中', count:DEVICE_STATUS_COUNTS['维护中'], color:'#7c5cbf',           bg:'#f5f3ff'},
            {label:'离线',   count:DEVICE_STATUS_COUNTS['离线'],   color:ADMIN.textSecondary, bg:ADMIN.bodyBg},
          ].map(s => (
            <div key={s.label} style={{ background:s.bg, border:`1px solid ${ADMIN.borderLight}`, borderRadius:6, padding:'10px 0', textAlign:'center' }}>
              <div style={{ fontSize:24, fontWeight:700, color:s.color, fontVariantNumeric:'tabular-nums' }}>{s.count}</div>
              <div style={{ fontSize:11.5, color:ADMIN.textSecondary, marginTop:3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="经营数据" right={<span style={{ fontSize:12, color:ADMIN.textSecondary }}>{T1_DATE}</span>}/>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
          <StatCard label="营收" value={T1_REVENUE} unit="元" delta="+12.4%" up accentColor={ADMIN.panelRed}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M9 8h4.5a2 2 0 010 4H9m0-4v8m0-4h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>}/>
          <StatCard label="完成订单" value={T1_ORDERS} unit="单" delta="+8.2%" up accentColor={ADMIN.panelGreen}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>}/>
          <StatCard label="用电量" value={T1_KWH} unit="kWh" delta="+5.1%" up accentColor={ADMIN.panelTeal}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12.55a11 11 0 0 1 14.08 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M1.42 9a16 16 0 0 1 21.16 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>}/>
        </div>
      </section>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        <ElCard title="营收趋势（近7日）"><BarChart data={revenueData} height={148}/></ElCard>
        <ElCard title="订单量趋势（近7日）"><LineChart data={ordersData} height={148} color={ADMIN.successColor}/></ElCard>
      </div>

      <ElCard title="昨日站点营收排行 TOP 5" padding={0}>
        <DataTable data={topStations} columns={rankingCols}/>
      </ElCard>
    </div>
  )
}

// ─── StationsScreen ───────────────────────────────────────────────
function StationsScreen({ nav }) {
  const [nameFilter, setNameFilter] = React.useState('')
  const [idFilter,   setIdFilter]   = React.useState('')
  const [page,       setPage]       = React.useState(1)
  const [stationBill, setStationBill] = React.useState(() => {
    const billMap = {}
    ;(window.STATION_BILLING_DATA || []).forEach(s => { billMap[s.id] = s })
    return STATIONS_DATA.map(s => billMap[s.id] || { id:s.id, name:s.name, ruleId:null, since:null })
  })
  const [assignStation, setAssignStation] = React.useState(null)

  const filtered = STATIONS_DATA.filter(s => s.name.includes(nameFilter) && s.id.includes(idFilter))

  function doReset() { setNameFilter(''); setIdFilter(''); setPage(1) }

  function handleAssign(stationId, ruleId) {
    setStationBill(prev => prev.map(s => s.id === stationId ? { ...s, ruleId, since: new Date().toISOString().slice(0,10) } : s))
    setAssignStation(null)
    antd.message.success('计费规则已更新')
  }

  const pendingTickets = React.useMemo(() => {
    const map = {}
    TICKETS_DATA.forEach(t => {
      if (t.status !== '已完成' && t.status !== '已关闭') map[t.station] = (map[t.station] || 0) + 1
    })
    return map
  }, [])

  const columns = [
    { key:'id',   title:'编号',   render: v => <span style={{ color:ADMIN.primary, fontWeight:500 }}>{v}</span> },
    { key:'name', title:'站点名称', render: v => <span style={{ color:ADMIN.textPrimary, fontWeight:500 }}>{v}</span> },
    { key:'addr', title:'地址' },
    { key:'ports', title: <span style={{display:'flex',alignItems:'center'}}>插座利用率<InfoTip text="充电中端口数 ÷ 总端口数，反映站点实时负载水平"/></span>,
      render: (_, row) => {
        const pct = Math.round(row.charging / row.ports * 100)
        const color = pct >= 80 ? ADMIN.successColor : pct >= 50 ? ADMIN.primary : ADMIN.textSecondary
        return (
          <div style={{ display:'flex', alignItems:'center', gap:7, minWidth:90 }}>
            <div style={{ flex:1, height:4, background:ADMIN.borderLight, borderRadius:999 }}>
              <div style={{ width:`${pct}%`, height:'100%', background:color, borderRadius:999, transition:'width .3s' }}/>
            </div>
            <span style={{ fontSize:12, color, fontWeight:600, minWidth:32, textAlign:'right' }}>{pct}%</span>
          </div>
        )
      }
    },
    { key:'name', title:'待处理工单', align:'center', render: name => {
      const cnt = pendingTickets[name] || 0
      if (cnt === 0) return <span style={{ color:ADMIN.textSecondary }}>—</span>
      return <antd.Button size="small" danger onClick={() => nav('tickets')}>{cnt} 单</antd.Button>
    }},
    { key:'id', title:'计费规则', render: id => {
      const bill = stationBill.find(s => s.id === id)
      const rules = window.PRICING_RULES_DATA || []
      const rule = bill && bill.ruleId ? rules.find(r => r.id === bill.ruleId) : null
      if (!rule) return <span style={{ fontSize:12, color:ADMIN.textSecondary }}>未分配</span>
      return <span style={{ fontSize:12.5, color:ADMIN.textRegular }}>{rule.name}</span>
    }},
    { key:'id', title:'操作', render: (_, row) => (
      <antd.Space size="small">
        <antd.Button type="link" size="small" onClick={() => nav('devices')}>设备</antd.Button>
        <antd.Button type="link" size="small">编辑</antd.Button>
        <antd.Button type="link" size="small" onClick={() => {
          const bill = stationBill.find(s => s.id === row.id) || { id:row.id, name:row.name, ruleId:null, since:null }
          setAssignStation(bill)
        }}>计费</antd.Button>
      </antd.Space>
    )},
  ]

  return (
    <div>
      <PageHeader>
        <antd.Button type="primary" icon={<svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1v9M1 5.5h9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>}>新增站点</antd.Button>
      </PageHeader>
      <ElCard padding={0}>
        <div style={{ padding:'14px 20px', borderBottom:`1px solid ${ADMIN.borderLight}` }}>
          <FilterBar>
            <ElInput placeholder="站点名称" value={nameFilter} onChange={e => { setNameFilter(e.target.value); setPage(1) }} width={160}/>
            <ElInput placeholder="站点编号（如 S001）" value={idFilter} onChange={e => { setIdFilter(e.target.value); setPage(1) }} width={160}/>
            <antd.Button onClick={doReset}>重置</antd.Button>
          </FilterBar>
        </div>
        <DataTable data={filtered} columns={columns}/>
        <div style={{ padding:'0 20px 16px' }}>
          <Pagination total={filtered.length} page={page} pageSize={10} onPageChange={setPage}/>
        </div>
      </ElCard>
      {assignStation && (() => {
        const AssignModal = window.AssignRuleModal
        const rules = window.PRICING_RULES_DATA || []
        return AssignModal ? <AssignModal station={assignStation} rules={rules} onClose={() => setAssignStation(null)} onAssign={handleAssign}/> : null
      })()}
    </div>
  )
}

// ─── DeviceRuleAssignModal ────────────────────────────────────────
function DeviceRuleAssignModal({ device, billingMap, onClose, onAssign }) {
  const rules = (window.PRICING_RULES_DATA || []).filter(r => r.status === 'active')
  const currentRuleId = billingMap[device.id] != null ? billingMap[device.id] : null
  const [selected, setSelected] = React.useState(currentRuleId)
  const [saving,   setSaving]   = React.useState(false)

  function doSave() {
    setSaving(true)
    setTimeout(() => { setSaving(false); onAssign(device.id, selected) }, 600)
  }

  return (
    <antd.Modal
      open={true}
      title={
        <div>
          <div>设备计费规则</div>
          <div style={{ fontSize:12.5, color:ADMIN.textSecondary, fontWeight:400, marginTop:2 }}>
            <span style={{ fontFamily:'monospace' }}>{device.id}</span> · {device.station}
          </div>
        </div>
      }
      onCancel={onClose}
      width={440}
      footer={
        <div style={{ display:'flex', justifyContent:'flex-end', gap:8 }}>
          <antd.Button onClick={onClose}>取消</antd.Button>
          <antd.Button type="primary" loading={saving} disabled={selected === currentRuleId} onClick={doSave}>确认</antd.Button>
        </div>
      }
    >
      <p style={{ fontSize:12.5, color:ADMIN.textSecondary, marginBottom:12 }}>选择此设备使用的计费规则</p>
      <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:14 }}>
        <div onClick={() => setSelected(null)} style={{ padding:'10px 14px', borderRadius:6, cursor:'pointer', border:`1.5px solid ${selected===null ? ADMIN.primary : ADMIN.border}`, background:selected===null ? ADMIN.primaryLight : '#fff', transition:'all .12s' }}>
          <span style={{ fontSize:13, color:selected===null ? ADMIN.primary : ADMIN.textSecondary }}>— 不使用任何规则</span>
        </div>
        {rules.map(rule => (
          <div key={rule.id} onClick={() => setSelected(rule.id)} style={{ padding:'12px 14px', borderRadius:6, cursor:'pointer', border:`1.5px solid ${selected===rule.id ? ADMIN.primary : ADMIN.border}`, background:selected===rule.id ? ADMIN.primaryLight : '#fff', transition:'all .12s' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:3 }}>
              <span style={{ fontSize:13.5, fontWeight:600, color:selected===rule.id ? ADMIN.primary : ADMIN.textPrimary }}>{rule.name}</span>
              <antd.Tag color="blue">{rule.currentVer}</antd.Tag>
            </div>
            <div style={{ fontSize:12, color:ADMIN.textSecondary }}>{rule.desc}</div>
          </div>
        ))}
      </div>
      {selected !== currentRuleId && (
        <antd.Alert type="warning" showIcon={false} message="更换后新规则将在用户下一次开启充电时生效。" style={{ fontSize:12.5 }}/>
      )}
    </antd.Modal>
  )
}

// ─── DevicesScreen ────────────────────────────────────────────────
function DevicesScreen({ nav }) {
  const [statusFilter,  setStatusFilter]  = React.useState('all')
  const [idFilter,      setIdFilter]      = React.useState('')
  const [stationFilter, setStationFilter] = React.useState([])
  const [page,          setPage]          = React.useState(1)
  const [billingMap,    setBillingMap]    = React.useState(() => getDeviceBillingMap())
  const [assignDevice,  setAssignDevice]  = React.useState(null)
  const [maintenanceOverrides, setMaintenanceOverrides] = React.useState(
    () => new Set(DEVICES_DATA.filter(d => d.maintenance_mode).map(d => d.id))
  )

  function toggleMaintenance(deviceId) {
    setMaintenanceOverrides(prev => { const next = new Set(prev); next.has(deviceId) ? next.delete(deviceId) : next.add(deviceId); return next })
  }
  const getDs = d => getDeviceDisplayStatus(d, maintenanceOverrides)

  React.useEffect(() => {
    function onChanged() { setBillingMap(getDeviceBillingMap()) }
    window.addEventListener('deviceBillingChanged', onChanged)
    return () => window.removeEventListener('deviceBillingChanged', onChanged)
  }, [])

  function handleDeviceAssign(deviceId, ruleId) {
    const newMap = { ...billingMap, [deviceId]: ruleId }
    saveDeviceBillingMap(newMap); setBillingMap(newMap); setAssignDevice(null)
  }

  const ALL_STATION_OPTIONS = STATIONS_DATA.map(s => ({ value:s.name, label:s.name }))
  function fetchStationOptions(query) {
    return new Promise(resolve => setTimeout(() => resolve(ALL_STATION_OPTIONS.filter(o => !query || o.label.includes(query))), query ? 300 : 0))
  }

  const filtered = DEVICES_DATA.filter(d => {
    const ds = getDs(d)
    const matchStatus = statusFilter==='all' || (statusFilter==='online' && ds==='在线') || (statusFilter==='offline' && ds==='离线') || (statusFilter==='maintenance' && ds==='维护中')
    return matchStatus && d.id.includes(idFilter) && (stationFilter.length===0 || stationFilter.includes(d.station))
  })

  const pendingTicketsByDevice = React.useMemo(() => {
    const map = {}
    TICKETS_DATA.forEach(t => { if (t.status==='待处理' || t.status==='处理中') map[t.device] = (map[t.device]||0)+1 })
    return map
  }, [])

  function doReset() { setIdFilter(''); setStationFilter([]); setStatusFilter('all'); setPage(1) }

  const statusTag = v => {
    if (v==='在线')   return <antd.Tag color="success">在线</antd.Tag>
    if (v==='维护中') return <antd.Tag color="purple">维护中</antd.Tag>
    return <antd.Tag>离线</antd.Tag>
  }

  const columns = [
    { key:'id',      title:'设备编号', render: v => <span style={{ color:ADMIN.primary, fontWeight:500, fontFamily:'monospace' }}>{v}</span> },
    { key:'station', title:'所属站点' },
    { key:'type',    title:'设备类型' },
    { key:'ports',   title:'口数', align:'center' },
    { key:'is_online', title:'设备状态', render: (_, row) => {
      const ds = getDs(row)
      const pending = pendingTicketsByDevice[row.id] || 0
      return (
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          {statusTag(ds)}
          {pending > 0 && <antd.Badge count={pending} size="small" style={{ backgroundColor: ADMIN.dangerColor }}/>}
        </div>
      )
    }},
    { key:'lastMaint', title:'上次维护' },
    { key:'id', title:'计费规则', render: id => {
      const ruleId = billingMap[id]
      if (!ruleId) return <span style={{ fontSize:12, color:ADMIN.textSecondary }}>未分配</span>
      const rule = (window.PRICING_RULES_DATA||[]).find(r => r.id===ruleId)
      return <span style={{ fontSize:12.5, color:ADMIN.textRegular }}>{rule ? rule.name : '—'}</span>
    }},
    { key:'id', title:'操作', render: (_, row) => (
      <antd.Space size="small">
        <antd.Button type="link" size="small">详情</antd.Button>
        <antd.Button type="link" size="small" onClick={() => nav('tickets')}>报修</antd.Button>
        <antd.Button type={maintenanceOverrides.has(row.id) ? 'primary' : 'link'} size="small" onClick={() => toggleMaintenance(row.id)}>
          {maintenanceOverrides.has(row.id) ? '取消维护' : '维护'}
        </antd.Button>
        <antd.Button type="link" size="small" onClick={() => setAssignDevice(row)}>计费</antd.Button>
      </antd.Space>
    )},
  ]

  return (
    <div>
      <PageHeader>
        <antd.Button type="primary" icon={<svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1v9M1 5.5h9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>}>添加设备</antd.Button>
      </PageHeader>
      <ElCard padding={0}>
        <div style={{ padding:'14px 20px', borderBottom:`1px solid ${ADMIN.borderLight}` }}>
          <FilterBar>
            <ElInput placeholder="设备编号（如 CAB-A01）" value={idFilter} onChange={e => { setIdFilter(e.target.value); setPage(1) }} width={180}/>
            <SearchableMultiSelect value={stationFilter} onChange={v => { setStationFilter(v); setPage(1) }} fetchOptions={fetchStationOptions} placeholder="所属站点" width={220}/>
            <ElSelect value={statusFilter} onChange={v => { setStatusFilter(v); setPage(1) }} width={130}
              options={[{value:'all',label:'全部状态'},{value:'online',label:'在线'},{value:'maintenance',label:'维护中'},{value:'offline',label:'离线'}]}/>
            <antd.Button onClick={doReset}>重置</antd.Button>
          </FilterBar>
        </div>
        <DataTable data={filtered} columns={columns}/>
        <div style={{ padding:'0 20px 16px' }}>
          <Pagination total={filtered.length} page={page} pageSize={10} onPageChange={setPage}/>
        </div>
      </ElCard>
      {assignDevice && (
        <DeviceRuleAssignModal device={assignDevice} billingMap={billingMap} onClose={() => setAssignDevice(null)} onAssign={handleDeviceAssign}/>
      )}
    </div>
  )
}

// ─── TicketsScreen ────────────────────────────────────────────────
function TicketsScreen({ nav }) {
  const [statusFilter, setStatusFilter] = React.useState('all')
  const [page,         setPage]         = React.useState(1)
  const [idFilter,     setIdFilter]     = React.useState('')
  const [stationSel,   setStationSel]   = React.useState('all')

  const counts = {
    all:'全部', '待处理':'待处理', '处理中':'处理中', '已完成':'已完成',
  }
  const ticketStations = [...new Set(TICKETS_DATA.map(t => t.station))]
  const filtered = TICKETS_DATA.filter(t =>
    (statusFilter==='all' || t.status===statusFilter) &&
    (stationSel==='all' || t.station===stationSel) &&
    t.id.includes(idFilter)
  )

  function doReset() { setIdFilter(''); setStationSel('all'); setStatusFilter('all'); setPage(1) }

  const priorityTag = v => <antd.Tag color={{高:'error',中:'warning',低:'default'}[v]}>{v}</antd.Tag>
  const statusTag   = v => <antd.Tag color={{待处理:'error',处理中:'warning',已完成:'success'}[v]}>{v}</antd.Tag>

  const statCards = [
    {label:'全部工单', count:TICKETS_DATA.length, color:ADMIN.primary},
    {label:'待处理',   count:TICKETS_DATA.filter(t=>t.status==='待处理').length, color:ADMIN.dangerColor},
    {label:'处理中',   count:TICKETS_DATA.filter(t=>t.status==='处理中').length, color:ADMIN.warningColor},
    {label:'已完成',   count:TICKETS_DATA.filter(t=>t.status==='已完成').length, color:ADMIN.successColor},
  ]

  const columns = [
    { key:'id',       title:'工单号', render: v => <span style={{ fontSize:12, color:ADMIN.primary, fontWeight:500, fontFamily:'monospace' }}>{v}</span> },
    { key:'device',   title:'设备编号' },
    { key:'station',  title:'所属站点' },
    { key:'type',     title:'故障类型' },
    { key:'priority', title:'优先级', render: v => priorityTag(v) },
    { key:'reported', title:'上报时间' },
    { key:'status',   title:'状态', render: v => statusTag(v) },
    { key:'assignee', title:'负责人' },
    { key:'id', title:'操作', render: (_, row) => (
      <antd.Space size="small">
        {row.status !== '已完成' && <antd.Button type="primary" size="small">派工</antd.Button>}
        <antd.Button type="link" size="small">详情</antd.Button>
      </antd.Space>
    )},
  ]

  return (
    <div>
      <PageHeader>
        <antd.Button type="primary" icon={<svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1v9M1 5.5h9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>}>新建工单</antd.Button>
      </PageHeader>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:18 }}>
        {statCards.map((s,i) => (
          <ElCard key={i} padding="16px 20px">
            <div style={{ fontSize:13, color:ADMIN.textSecondary, marginBottom:6 }}>{s.label}</div>
            <div style={{ fontSize:28, fontWeight:700, color:s.color }}>{s.count}</div>
          </ElCard>
        ))}
      </div>
      <ElCard padding={0}>
        <div style={{ padding:'14px 20px', borderBottom:`1px solid ${ADMIN.borderLight}` }}>
          <FilterBar>
            <ElInput placeholder="工单号（如 WO-2026-0156）" value={idFilter} onChange={e => { setIdFilter(e.target.value); setPage(1) }} width={200}/>
            <ElSelect value={stationSel} onChange={v => { setStationSel(v); setPage(1) }} width={150}
              options={[{value:'all',label:'全部站点'},...ticketStations.map(s=>({value:s,label:s}))]}/>
            <ElSelect value={statusFilter} onChange={v => { setStatusFilter(v); setPage(1) }} width={120}
              options={[{value:'all',label:'全部状态'},{value:'待处理',label:'待处理'},{value:'处理中',label:'处理中'},{value:'已完成',label:'已完成'}]}/>
            <antd.Button onClick={doReset}>重置</antd.Button>
          </FilterBar>
        </div>
        <DataTable data={filtered} columns={columns}/>
        <div style={{ padding:'0 20px 16px' }}>
          <Pagination total={filtered.length} page={page} pageSize={10} onPageChange={setPage}/>
        </div>
      </ElCard>
    </div>
  )
}

// ─── OrdersScreen（screens-1 版，被 screens-3 覆盖） ────────────
const ORDERS_DATA_S1 = [
  { id:'ORD-20260610-8821', user:'王小明', phone:'138****8821', station:'金牛苑南门车棚', device:'CAB-A01', port:'05', startTime:'2026-06-10 08:14', endTime:'2026-06-10 10:32', duration:'2h 18m', kwh:1.84, amount:'¥3.20', status:'已完成' },
  { id:'ORD-20260610-3312', user:'张大勇', phone:'150****3312', station:'天府软件园D区',  device:'CAB-D01', port:'11', startTime:'2026-06-10 09:05', endTime:'',               duration:'—',      kwh:0.92, amount:'¥1.66', status:'充电中' },
  { id:'ORD-20260610-4401', user:'赵雪梅', phone:'186****4401', station:'蓝桥科技园B座',  device:'CAB-B01', port:'08', startTime:'2026-06-10 06:30', endTime:'2026-06-10 08:28', duration:'1h 58m', kwh:1.52, amount:'¥2.74', status:'已完成' },
  { id:'ORD-20260610-2290', user:'陈浩天', phone:'155****2290', station:'九眼桥公租房',   device:'CAB-F01', port:'02', startTime:'2026-06-10 10:00', endTime:'',               duration:'—',      kwh:0.48, amount:'¥0.86', status:'充电中' },
  { id:'ORD-20260609-4412', user:'王小明', phone:'138****8821', station:'金牛苑南门车棚', device:'CAB-A01', port:'05', startTime:'2026-06-09 20:10', endTime:'2026-06-09 22:08', duration:'1h 58m', kwh:1.52, amount:'¥2.74', status:'已完成' },
  { id:'ORD-20260609-7730', user:'陈浩天', phone:'155****2290', station:'天府软件园D区',  device:'CAB-D01', port:'03', startTime:'2026-06-09 19:00', endTime:'2026-06-09 21:00', duration:'2h 00m', kwh:1.60, amount:'¥2.88', status:'已完成' },
]

function OrdersScreen() {
  const [idFilter,      setIdFilter]      = React.useState('')
  const [nameFilter,    setNameFilter]    = React.useState('')
  const [statusFilter,  setStatusFilter]  = React.useState('all')
  const [stationFilter, setStationFilter] = React.useState('all')
  const [dateFilter,    setDateFilter]    = React.useState('today')
  const [page,          setPage]          = React.useState(1)
  const [pageSize,      setPageSize]      = React.useState(10)
  const [detailOrder,   setDetailOrder]   = React.useState(null)

  const stationOptions = [{value:'all',label:'全部站点'},...Array.from(new Set(ORDERS_DATA_S1.map(o=>o.station))).map(s=>({value:s,label:s}))]
  const todayOrders  = ORDERS_DATA_S1.filter(o => o.id.includes('20260610'))
  const activeOrders = dateFilter==='today' ? todayOrders : ORDERS_DATA_S1
  const filtered = activeOrders.filter(o =>
    (statusFilter==='all' || o.status===statusFilter) &&
    (stationFilter==='all' || o.station===stationFilter) &&
    o.id.includes(idFilter) && o.user.includes(nameFilter)
  )
  const paginated = filtered.slice((page-1)*pageSize, page*pageSize)

  function reset() { setIdFilter(''); setNameFilter(''); setStatusFilter('all'); setStationFilter('all'); setPage(1) }

  const statusTag = v => <antd.Tag color={{已完成:'success',充电中:'processing'}[v]||'default'}>{v}</antd.Tag>

  const columns = [
    { key:'id',        title:'订单号', render: v => <span style={{ fontSize:12, color:ADMIN.primary, fontFamily:'monospace', fontWeight:500 }}>{v}</span> },
    { key:'user',      title:'用户', render: (v,row) => <div><div style={{ fontWeight:500 }}>{v}</div><div style={{ fontSize:11.5, color:ADMIN.textSecondary }}>{row.phone}</div></div> },
    { key:'station',   title:'站点' },
    { key:'device',    title:'设备/插口', render: (v,row) => <span><span style={{ fontFamily:'monospace', fontSize:12 }}>{v}</span><span style={{ marginLeft:5, fontSize:12, color:ADMIN.textSecondary }}>#{row.port}</span></span> },
    { key:'startTime', title:'开始时间' },
    { key:'duration',  title:'时长', render: (v,row) => row.status==='充电中' ? <span style={{ color:ADMIN.warningColor, fontWeight:500 }}>进行中</span> : v },
    { key:'kwh',       title:'用电量', render: v => <span><span style={{ fontWeight:500 }}>{v}</span> <span style={{ fontSize:11.5, color:ADMIN.textSecondary }}>kWh</span></span> },
    { key:'amount',    title:'金额', render: v => <span style={{ color:ADMIN.primary, fontWeight:600 }}>{v}</span> },
    { key:'status',    title:'状态', render: v => statusTag(v) },
    { key:'id',        title:'操作', render: (_,row) => <antd.Button type="link" size="small" onClick={() => setDetailOrder(row)}>详情</antd.Button> },
  ]

  return (
    <div>
      <PageHeader>
        <antd.Button icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke={ADMIN.textRegular} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}>导出</antd.Button>
      </PageHeader>
      <ElCard padding={0}>
        <div style={{ padding:'14px 20px', borderBottom:`1px solid ${ADMIN.borderLight}` }}>
          <FilterBar>
            <antd.Segmented size="small" value={dateFilter} onChange={v => { setDateFilter(v); setPage(1) }}
              options={[{label:'今日',value:'today'},{label:'全部',value:'all'}]}/>
            <ElInput placeholder="订单号" value={idFilter} onChange={e => { setIdFilter(e.target.value); setPage(1) }} width={150}/>
            <ElInput placeholder="用户昵称" value={nameFilter} onChange={e => { setNameFilter(e.target.value); setPage(1) }} width={120}/>
            <ElSelect value={statusFilter} onChange={v => { setStatusFilter(v); setPage(1) }} options={[{value:'all',label:'全部状态'},{value:'充电中',label:'充电中'},{value:'已完成',label:'已完成'}]} width={110}/>
            <ElSelect value={stationFilter} onChange={v => { setStationFilter(v); setPage(1) }} options={stationOptions} width={150}/>
            <antd.Button onClick={reset}>重置</antd.Button>
          </FilterBar>
        </div>
        <DataTable data={paginated} columns={columns}/>
        <div style={{ padding:'0 20px 16px' }}>
          <Pagination total={filtered.length} page={page} pageSize={pageSize} onPageChange={p=>setPage(p)} onPageSizeChange={s=>{setPageSize(s);setPage(1)}}/>
        </div>
      </ElCard>

      {detailOrder && (
        <antd.Modal
          open={true}
          title={
            <div>
              <div>订单详情</div>
              <div style={{ fontSize:12, fontFamily:'monospace', color:ADMIN.textSecondary, fontWeight:400, marginTop:2 }}>{detailOrder.id}</div>
            </div>
          }
          onCancel={() => setDetailOrder(null)}
          width={500}
          footer={
            <div style={{ display:'flex', justifyContent:'flex-end', gap:8 }}>
              {detailOrder.status==='充电中' && <antd.Button danger size="small">强制停止</antd.Button>}
              <antd.Button onClick={() => setDetailOrder(null)}>关闭</antd.Button>
            </div>
          }
        >
          <div style={{ textAlign:'center', padding:'12px 0 20px', borderBottom:`1px solid ${ADMIN.borderLight}`, marginBottom:20 }}>
            <div style={{ fontSize:12, color:ADMIN.textSecondary, marginBottom:4 }}>实付金额</div>
            <div style={{ fontSize:36, fontWeight:700, color:ADMIN.primary, letterSpacing:-1 }}>{detailOrder.amount}</div>
          </div>
          <antd.Descriptions bordered size="small" column={2}>
            <antd.Descriptions.Item label="用户">{detailOrder.user}（{detailOrder.phone}）</antd.Descriptions.Item>
            <antd.Descriptions.Item label="站点">{detailOrder.station}</antd.Descriptions.Item>
            <antd.Descriptions.Item label="设备">{detailOrder.device}</antd.Descriptions.Item>
            <antd.Descriptions.Item label="插口">#{detailOrder.port}</antd.Descriptions.Item>
            <antd.Descriptions.Item label="开始时间">{detailOrder.startTime}</antd.Descriptions.Item>
            <antd.Descriptions.Item label="结束时间">{detailOrder.endTime || '充电中…'}</antd.Descriptions.Item>
            <antd.Descriptions.Item label="时长">{detailOrder.status==='充电中' ? '进行中' : detailOrder.duration}</antd.Descriptions.Item>
            <antd.Descriptions.Item label="用电量">{detailOrder.kwh} kWh</antd.Descriptions.Item>
          </antd.Descriptions>
        </antd.Modal>
      )}
    </div>
  )
}

Object.assign(window, {
  DashboardScreen, StationsScreen, DevicesScreen, TicketsScreen, OrdersScreen,
  DEVICES_DATA, getDeviceBillingMap, saveDeviceBillingMap,
})
