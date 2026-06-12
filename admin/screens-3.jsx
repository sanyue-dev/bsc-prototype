// admin/screens-3.jsx — 充电会话 + 充电订单（antd 重构版）
/* global antd */

// ─── charging_sessions mock data ─────────────────────────────────
const SESSIONS_DATA = [
  {id:'SES-20260610-003',orderId:'ORD-20260610-3312',deviceId:'CAB-D01',portNo:'11',station:'天府软件园D区', startAt:'2026-06-10 09:05',endAt:'',                duration:'—',      kwh:0.92,peakPower:298,stopReason:'充电中'},
  {id:'SES-20260610-005',orderId:'ORD-20260610-2290',deviceId:'CAB-F01',portNo:'02',station:'九眼桥公租房',  startAt:'2026-06-10 10:00',endAt:'',                duration:'—',      kwh:0.48,peakPower:180,stopReason:'充电中'},
  {id:'SES-20260610-009',orderId:'ORD-20260610-9920',deviceId:'CAB-H01',portNo:'04',station:'玉林东路菜市场',startAt:'2026-06-10 09:30',endAt:'',                duration:'—',      kwh:0.30,peakPower:220,stopReason:'充电中'},
  {id:'SES-20260610-001',orderId:'ORD-20260610-8821',deviceId:'CAB-A01',portNo:'05',station:'金牛苑南门车棚',startAt:'2026-06-10 08:14',endAt:'2026-06-10 10:32',duration:'2h 18m',kwh:1.84,peakPower:320,stopReason:'正常完成'},
  {id:'SES-20260610-002',orderId:'ORD-20260610-6622',deviceId:'CAB-C01',portNo:'03',station:'滨河新村东区',  startAt:'2026-06-10 07:50',endAt:'2026-06-10 09:50',duration:'2h 00m',kwh:1.60,peakPower:275,stopReason:'正常完成'},
  {id:'SES-20260610-004',orderId:'ORD-20260610-4401',deviceId:'CAB-B01',portNo:'08',station:'蓝桥科技园B座', startAt:'2026-06-10 06:30',endAt:'2026-06-10 08:28',duration:'1h 58m',kwh:1.52,peakPower:260,stopReason:'正常完成'},
  {id:'SES-20260610-006',orderId:'ORD-20260610-8834',deviceId:'CAB-A02',portNo:'07',station:'金牛苑南门车棚',startAt:'2026-06-10 07:22',endAt:'2026-06-10 09:18',duration:'1h 56m',kwh:1.48,peakPower:255,stopReason:'正常完成'},
  {id:'SES-20260610-007',orderId:'ORD-20260610-1156',deviceId:'CAB-E01',portNo:'01',station:'双楠实验小学',  startAt:'2026-06-10 05:45',endAt:'2026-06-10 07:45',duration:'2h 00m',kwh:1.60,peakPower:270,stopReason:'用户停止'},
  {id:'SES-20260610-008',orderId:'ORD-20260610-5573',deviceId:'CAB-C02',portNo:'09',station:'滨河新村东区',  startAt:'2026-06-10 08:40',endAt:'2026-06-10 10:40',duration:'2h 00m',kwh:1.60,peakPower:280,stopReason:'正常完成'},
  {id:'SES-20260610-010',orderId:'ORD-20260610-6645',deviceId:'CAB-L01',portNo:'06',station:'锦官城小区',    startAt:'2026-06-10 07:10',endAt:'2026-06-10 09:05',duration:'1h 55m',kwh:1.44,peakPower:250,stopReason:'正常完成'},
  {id:'SES-20260609-001',orderId:'ORD-20260609-4412',deviceId:'CAB-A01',portNo:'05',station:'金牛苑南门车棚',startAt:'2026-06-09 20:10',endAt:'2026-06-09 22:08',duration:'1h 58m',kwh:1.52,peakPower:260,stopReason:'正常完成'},
  {id:'SES-20260609-002',orderId:'ORD-20260609-7730',deviceId:'CAB-D01',portNo:'03',station:'天府软件园D区', startAt:'2026-06-09 19:00',endAt:'2026-06-09 21:00',duration:'2h 00m',kwh:1.60,peakPower:275,stopReason:'正常完成'},
  {id:'SES-20260609-003',orderId:'ORD-20260609-2281',deviceId:'CAB-F01',portNo:'10',station:'九眼桥公租房',  startAt:'2026-06-09 18:30',endAt:'2026-06-09 20:22',duration:'1h 52m',kwh:1.42,peakPower:255,stopReason:'正常完成'},
  {id:'SES-20260609-004',orderId:'ORD-20260609-9901',deviceId:'CAB-B01',portNo:'02',station:'蓝桥科技园B座', startAt:'2026-06-09 17:45',endAt:'2026-06-09 19:45',duration:'2h 00m',kwh:1.60,peakPower:270,stopReason:'正常完成'},
  {id:'SES-20260609-005',orderId:'ORD-20260609-3358',deviceId:'CAB-C01',portNo:'07',station:'滨河新村东区',  startAt:'2026-06-09 21:00',endAt:'2026-06-09 23:05',duration:'2h 05m',kwh:1.70,peakPower:290,stopReason:'正常完成'},
  {id:'SES-20260609-010',orderId:'ORD-20260609-3310',deviceId:'CAB-H01',portNo:'03',station:'玉林东路菜市场',startAt:'2026-06-09 19:30',endAt:'2026-06-09 21:25',duration:'1h 55m',kwh:1.44,peakPower:250,stopReason:'超时断电'},
  {id:'SES-20260609-011',orderId:'—',                deviceId:'CAB-G01',portNo:'01',station:'新津农贸市场',  startAt:'2026-06-09 14:20',endAt:'2026-06-09 14:23',duration:'3m',    kwh:0.02,peakPower:35, stopReason:'设备异常'},
]

// ─── charging_orders mock data ────────────────────────────────────
const ORDERS_DATA = [
  {id:'ORD-20260610-8821',user:'王小明',phone:'138****8821',station:'金牛苑南门车棚',createdAt:'2026-06-10 08:14',settledAt:'2026-06-10 10:32',totalKwh:1.84,elecFee:1.10,serviceFee:2.10,discount:0.00,actualAmount:3.20,pricingRule:'标准规则 A · v1.2',sessionId:'SES-20260610-001',status:'已完成'},
  {id:'ORD-20260610-6622',user:'李佳丽',phone:'139****6622',station:'滨河新村东区',  createdAt:'2026-06-10 07:50',settledAt:'2026-06-10 09:50',totalKwh:1.60,elecFee:0.96,serviceFee:1.92,discount:0.00,actualAmount:2.88,pricingRule:'标准规则 A · v1.2',sessionId:'SES-20260610-002',status:'已完成'},
  {id:'ORD-20260610-3312',user:'张大勇',phone:'150****3312',station:'天府软件园D区', createdAt:'2026-06-10 09:05',settledAt:'',               totalKwh:0.92,elecFee:0.55,serviceFee:1.11,discount:0.00,actualAmount:1.66,pricingRule:'标准规则 A · v1.2',sessionId:'SES-20260610-003',status:'待结算'},
  {id:'ORD-20260610-4401',user:'赵雪梅',phone:'186****4401',station:'蓝桥科技园B座', createdAt:'2026-06-10 06:30',settledAt:'2026-06-10 08:28',totalKwh:1.52,elecFee:0.91,serviceFee:1.83,discount:0.00,actualAmount:2.74,pricingRule:'峰谷差价规则 · v2.0',sessionId:'SES-20260610-004',status:'已完成'},
  {id:'ORD-20260610-2290',user:'陈浩天',phone:'155****2290',station:'九眼桥公租房',  createdAt:'2026-06-10 10:00',settledAt:'',               totalKwh:0.48,elecFee:0.29,serviceFee:0.57,discount:0.00,actualAmount:0.86,pricingRule:'标准规则 A · v1.2',sessionId:'SES-20260610-005',status:'待结算'},
  {id:'ORD-20260610-8834',user:'刘思远',phone:'177****8834',station:'金牛苑南门车棚',createdAt:'2026-06-10 07:22',settledAt:'2026-06-10 09:18',totalKwh:1.48,elecFee:0.89,serviceFee:1.77,discount:0.00,actualAmount:2.66,pricingRule:'标准规则 A · v1.2',sessionId:'SES-20260610-006',status:'已完成'},
  {id:'ORD-20260610-1156',user:'周天宇',phone:'182****1156',station:'双楠实验小学',  createdAt:'2026-06-10 05:45',settledAt:'2026-06-10 07:45',totalKwh:1.60,elecFee:0.96,serviceFee:1.92,discount:0.00,actualAmount:2.88,pricingRule:'标准规则 A · v1.2',sessionId:'SES-20260610-007',status:'已完成'},
  {id:'ORD-20260610-5573',user:'吴玲玲',phone:'133****5573',station:'滨河新村东区',  createdAt:'2026-06-10 08:40',settledAt:'2026-06-10 10:40',totalKwh:1.60,elecFee:0.96,serviceFee:1.92,discount:0.00,actualAmount:2.88,pricingRule:'标准规则 A · v1.2',sessionId:'SES-20260610-008',status:'已完成'},
  {id:'ORD-20260610-9920',user:'孙浩宇',phone:'188****9920',station:'玉林东路菜市场',createdAt:'2026-06-10 09:30',settledAt:'',               totalKwh:0.30,elecFee:0.18,serviceFee:0.36,discount:0.00,actualAmount:0.54,pricingRule:'峰谷差价规则 · v2.0',sessionId:'SES-20260610-009',status:'待结算'},
  {id:'ORD-20260610-6645',user:'郑雅芸',phone:'159****6645',station:'锦官城小区',    createdAt:'2026-06-10 07:10',settledAt:'2026-06-10 09:05',totalKwh:1.44,elecFee:0.86,serviceFee:1.73,discount:0.00,actualAmount:2.59,pricingRule:'标准规则 A · v1.2',sessionId:'SES-20260610-010',status:'已完成'},
  {id:'ORD-20260609-4412',user:'王小明',phone:'138****8821',station:'金牛苑南门车棚',createdAt:'2026-06-09 20:10',settledAt:'2026-06-09 22:08',totalKwh:1.52,elecFee:0.91,serviceFee:1.83,discount:0.50,actualAmount:2.24,pricingRule:'标准规则 A · v1.2',sessionId:'SES-20260609-001',status:'已完成'},
  {id:'ORD-20260609-7730',user:'陈浩天',phone:'155****2290',station:'天府软件园D区', createdAt:'2026-06-09 19:00',settledAt:'2026-06-09 21:00',totalKwh:1.60,elecFee:0.96,serviceFee:1.92,discount:0.00,actualAmount:2.88,pricingRule:'标准规则 A · v1.2',sessionId:'SES-20260609-002',status:'已完成'},
  {id:'ORD-20260609-2281',user:'李佳丽',phone:'139****6622',station:'九眼桥公租房',  createdAt:'2026-06-09 18:30',settledAt:'2026-06-09 20:22',totalKwh:1.42,elecFee:0.85,serviceFee:1.71,discount:0.00,actualAmount:2.56,pricingRule:'标准规则 A · v1.2',sessionId:'SES-20260609-003',status:'已完成'},
  {id:'ORD-20260609-9901',user:'刘思远',phone:'177****8834',station:'蓝桥科技园B座', createdAt:'2026-06-09 17:45',settledAt:'2026-06-09 19:45',totalKwh:1.60,elecFee:0.96,serviceFee:1.92,discount:0.00,actualAmount:2.88,pricingRule:'峰谷差价规则 · v2.0',sessionId:'SES-20260609-004',status:'已完成'},
  {id:'ORD-20260609-3358',user:'张大勇',phone:'150****3312',station:'滨河新村东区',  createdAt:'2026-06-09 21:00',settledAt:'2026-06-09 23:05',totalKwh:1.70,elecFee:1.02,serviceFee:2.04,discount:0.00,actualAmount:3.06,pricingRule:'标准规则 A · v1.2',sessionId:'SES-20260609-005',status:'已完成'},
  {id:'ORD-20260609-1127',user:'吴玲玲',phone:'133****5573',station:'金牛苑南门车棚',createdAt:'2026-06-09 22:30',settledAt:'2026-06-10 00:28',totalKwh:1.52,elecFee:0.91,serviceFee:1.83,discount:0.00,actualAmount:2.74,pricingRule:'标准规则 A · v1.2',sessionId:'SES-20260609-007',status:'已完成'},
  {id:'ORD-20260609-5529',user:'郑雅芸',phone:'159****6645',station:'天府软件园D区', createdAt:'2026-06-09 08:15',settledAt:'2026-06-09 10:15',totalKwh:1.60,elecFee:0.96,serviceFee:1.92,discount:0.00,actualAmount:2.88,pricingRule:'标准规则 A · v1.2',sessionId:'SES-20260609-009',status:'已完成'},
  {id:'ORD-20260609-3310',user:'周天宇',phone:'182****1156',station:'玉林东路菜市场',createdAt:'2026-06-09 19:30',settledAt:'2026-06-09 21:25',totalKwh:1.44,elecFee:0.86,serviceFee:1.73,discount:0.00,actualAmount:2.59,pricingRule:'峰谷差价规则 · v2.0',sessionId:'SES-20260609-010',status:'已完成'},
]

// ─── OrderDetailModal（antd.Modal + antd.Descriptions） ──────────
function OrderDetailModal({ order, onClose }) {
  const statusColor = { '已完成':'success', '待结算':'warning', '已退款':'default', '异常':'error' }
  const unitPrice = order.totalKwh > 0 ? (order.elecFee / order.totalKwh).toFixed(2) : '—'

  return (
    <antd.Modal
      open={true}
      title={
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div>
            <div>订单详情</div>
            <div style={{ fontSize:12, fontFamily:'monospace', color:ADMIN.textSecondary, fontWeight:400, marginTop:2 }}>{order.id}</div>
          </div>
          <antd.Tag color={statusColor[order.status]||'default'}>{order.status}</antd.Tag>
        </div>
      }
      onCancel={onClose}
      width={520}
      footer={
        <div style={{ display:'flex', justifyContent:'flex-end', gap:8 }}>
          {order.status==='已完成' && <antd.Button>申请退款</antd.Button>}
          <antd.Button onClick={onClose}>关闭</antd.Button>
        </div>
      }
    >
      {/* 实付金额 */}
      <div style={{ textAlign:'center', padding:'14px 0 20px', borderBottom:`1px solid ${ADMIN.borderLight}`, marginBottom:18 }}>
        <div style={{ fontSize:12, color:ADMIN.textSecondary, marginBottom:4 }}>
          {order.status==='待结算' ? '预估金额' : '实付金额'}
        </div>
        <div style={{ fontSize:38, fontWeight:700, color:ADMIN.primary, letterSpacing:-1, lineHeight:1 }}>
          ¥{order.actualAmount.toFixed(2)}
        </div>
        {order.status==='待结算' && (
          <div style={{ marginTop:6, fontSize:12, color:ADMIN.warningColor }}>充电进行中，结束后自动结算</div>
        )}
      </div>

      {/* 费用明细 */}
      <div style={{ background:ADMIN.bodyBg, borderRadius:6, padding:'14px 16px', marginBottom:16 }}>
        <div style={{ fontSize:13, fontWeight:600, color:ADMIN.textPrimary, marginBottom:10 }}>费用明细</div>
        <antd.Descriptions column={1} size="small" styles={{ label:{ color:ADMIN.textRegular, width:120 } }}>
          <antd.Descriptions.Item label="用电量">{order.totalKwh} kWh</antd.Descriptions.Item>
          <antd.Descriptions.Item label={<span>电费 <span style={{ fontSize:11, color:ADMIN.textSecondary }}>({order.totalKwh} kWh × ¥{unitPrice}/度)</span></span>}>
            ¥{order.elecFee.toFixed(2)}
          </antd.Descriptions.Item>
          <antd.Descriptions.Item label="服务费">¥{order.serviceFee.toFixed(2)}</antd.Descriptions.Item>
          {order.discount > 0 && (
            <antd.Descriptions.Item label={<span style={{ color:ADMIN.successDark }}>优惠抵扣</span>}>
              <span style={{ color:ADMIN.successDark }}>-¥{order.discount.toFixed(2)}</span>
            </antd.Descriptions.Item>
          )}
          <antd.Descriptions.Item label={<strong>合计</strong>}>
            <strong style={{ color:ADMIN.primary }}>¥{order.actualAmount.toFixed(2)}</strong>
          </antd.Descriptions.Item>
        </antd.Descriptions>
      </div>

      {/* 基本信息 */}
      <antd.Descriptions bordered size="small" column={2}>
        <antd.Descriptions.Item label="用户" span={2}>{order.user}（{order.phone}）</antd.Descriptions.Item>
        <antd.Descriptions.Item label="站点" span={2}>{order.station}</antd.Descriptions.Item>
        <antd.Descriptions.Item label="计费规则" span={2}>{order.pricingRule}</antd.Descriptions.Item>
        <antd.Descriptions.Item label="关联会话"><span style={{ fontFamily:'monospace', fontSize:12 }}>{order.sessionId}</span></antd.Descriptions.Item>
        <antd.Descriptions.Item label="创建时间">{order.createdAt}</antd.Descriptions.Item>
        <antd.Descriptions.Item label="结算时间" span={2}>{order.settledAt || '待结算…'}</antd.Descriptions.Item>
      </antd.Descriptions>
    </antd.Modal>
  )
}

// ─── SessionsScreen ───────────────────────────────────────────────
function SessionsScreen() {
  const [dateFilter,   setDateFilter]   = React.useState('today')
  const [deviceFilter, setDeviceFilter] = React.useState('')
  const [reasonFilter, setReasonFilter] = React.useState('all')
  const [page,         setPage]         = React.useState(1)
  const [pageSize,     setPageSize]     = React.useState(10)

  const todaySessions = SESSIONS_DATA.filter(s => s.id.includes('20260610'))
  const activeData    = dateFilter==='today' ? todaySessions : SESSIONS_DATA
  const filtered = activeData.filter(s =>
    (reasonFilter==='all' || s.stopReason===reasonFilter) &&
    s.deviceId.toLowerCase().includes(deviceFilter.toLowerCase())
  )
  const paginated = filtered.slice((page-1)*pageSize, page*pageSize)

  const allOngoing  = SESSIONS_DATA.filter(s => s.stopReason==='充电中')
  const todayDone   = todaySessions.filter(s => s.stopReason!=='充电中')
  const todayKwh    = todaySessions.reduce((s,v) => s+v.kwh, 0).toFixed(2)

  const reasonTag = r => {
    const colorMap = {'充电中':'processing','正常完成':'success','用户停止':'default','超时断电':'warning','设备异常':'error'}
    return <antd.Tag color={colorMap[r]||'default'}>{r}</antd.Tag>
  }

  function doReset() { setDeviceFilter(''); setReasonFilter('all'); setPage(1) }

  const columns = [
    { key:'id',         title:'会话ID', render: v => <span style={{ fontSize:12, color:ADMIN.primary, fontFamily:'monospace', fontWeight:500 }}>{v}</span> },
    { key:'orderId',    title:'关联订单', render: v => <span style={{ fontSize:11.5, color:v==='—'?ADMIN.dangerColor:ADMIN.textSecondary, fontFamily:'monospace' }}>{v}</span> },
    { key:'deviceId',   title:'设备 / 插口', render: (v,row) => (
      <span><span style={{ fontFamily:'monospace', fontSize:12.5, color:ADMIN.textRegular }}>{v}</span><span style={{ fontSize:12, color:ADMIN.textSecondary, marginLeft:5 }}>#{row.portNo}</span></span>
    )},
    { key:'station',    title:'站点' },
    { key:'startAt',    title:'开始时间', render: v => <span style={{ fontSize:12.5 }}>{v}</span> },
    { key:'duration',   title:'时长', render: (v,row) => row.stopReason==='充电中'
      ? <span style={{ color:ADMIN.warningColor, fontWeight:500, fontSize:12.5 }}>进行中…</span>
      : <span style={{ fontSize:12.5 }}>{v}</span>
    },
    { key:'kwh',        title:'用电量', align:'right', render: v => <span><strong style={{ color:ADMIN.textPrimary }}>{v}</strong><span style={{ fontSize:11, color:ADMIN.textSecondary, marginLeft:3 }}>kWh</span></span> },
    { key:'peakPower',  title:'峰值功率', align:'right', render: v => <span style={{ fontSize:12.5, color:ADMIN.textRegular }}>{v} W</span> },
    { key:'stopReason', title:'状态', render: v => reasonTag(v) },
  ]

  return (
    <div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:18 }}>
        {[
          {label:'进行中',    value:allOngoing.length,  unit:'条', color:ADMIN.warningColor},
          {label:'今日已完成', value:todayDone.length,   unit:'条', color:ADMIN.successColor},
          {label:'今日用电量', value:todayKwh,           unit:'kWh',color:ADMIN.primary},
        ].map((c,i) => (
          <ElCard key={i} padding="16px 20px">
            <div style={{ fontSize:12.5, color:ADMIN.textSecondary, marginBottom:5 }}>{c.label}</div>
            <div style={{ display:'flex', alignItems:'baseline', gap:4 }}>
              <span style={{ fontSize:26, fontWeight:700, color:c.color, fontVariantNumeric:'tabular-nums' }}>{c.value}</span>
              <span style={{ fontSize:12, color:ADMIN.textSecondary }}>{c.unit}</span>
            </div>
          </ElCard>
        ))}
      </div>

      <ElCard padding={0}>
        <div style={{ padding:'14px 20px', borderBottom:`1px solid ${ADMIN.borderLight}` }}>
          <FilterBar>
            <antd.Segmented size="small" value={dateFilter} onChange={v => { setDateFilter(v); setPage(1) }}
              options={[{label:'今日',value:'today'},{label:'全部',value:'all'}]}/>
            <ElInput placeholder="设备编号（如 CAB-A01）" value={deviceFilter}
              onChange={e => { setDeviceFilter(e.target.value); setPage(1) }} width={180}/>
            <ElSelect value={reasonFilter} onChange={v => { setReasonFilter(v); setPage(1) }} width={120}
              options={[
                {value:'all',label:'全部状态'},{value:'充电中',label:'充电中'},
                {value:'正常完成',label:'正常完成'},{value:'用户停止',label:'用户停止'},
                {value:'超时断电',label:'超时断电'},{value:'设备异常',label:'设备异常'},
              ]}/>
            <antd.Button onClick={doReset}>重置</antd.Button>
          </FilterBar>
        </div>
        <DataTable data={paginated} columns={columns}/>
        <div style={{ padding:'0 20px 16px' }}>
          <Pagination total={filtered.length} page={page} pageSize={pageSize}
            onPageChange={p=>setPage(p)} onPageSizeChange={s=>{setPageSize(s);setPage(1)}}/>
        </div>
      </ElCard>
    </div>
  )
}

// ─── OrdersScreen（结算视角，覆盖 screens-1 的版本） ────────────
function OrdersScreen() {
  const [dateFilter,    setDateFilter]    = React.useState('today')
  const [idFilter,      setIdFilter]      = React.useState('')
  const [nameFilter,    setNameFilter]    = React.useState('')
  const [phoneFilter,   setPhoneFilter]   = React.useState('')
  const [statusFilter,  setStatusFilter]  = React.useState('all')
  const [stationFilter, setStationFilter] = React.useState('all')
  const [page,          setPage]          = React.useState(1)
  const [pageSize,      setPageSize]      = React.useState(10)
  const [detailOrder,   setDetailOrder]   = React.useState(null)

  const todayOrders = ORDERS_DATA.filter(o => o.id.includes('20260610'))
  const activeData  = dateFilter==='today' ? todayOrders : ORDERS_DATA

  const stationOptions = [
    {value:'all',label:'全部站点'},
    ...Array.from(new Set(ORDERS_DATA.map(o=>o.station))).map(s=>({value:s,label:s}))
  ]

  const filtered = activeData.filter(o =>
    (statusFilter==='all' || o.status===statusFilter) &&
    (stationFilter==='all' || o.station===stationFilter) &&
    o.id.includes(idFilter) && o.user.includes(nameFilter) && o.phone.includes(phoneFilter)
  )

  function reset() { setIdFilter(''); setNameFilter(''); setPhoneFilter(''); setStatusFilter('all'); setStationFilter('all'); setPage(1) }

  const paginated = filtered.slice((page-1)*pageSize, page*pageSize)

  const statusTag = v => {
    const colorMap = {'已完成':'success','待结算':'warning','已退款':'default','异常':'error'}
    return <antd.Tag color={colorMap[v]||'default'}>{v}</antd.Tag>
  }

  const columns = [
    { key:'id',           title:'订单号', render: v => <span style={{ fontSize:12, color:ADMIN.primary, fontFamily:'monospace', fontWeight:500 }}>{v}</span> },
    { key:'user',         title:'用户', render: (v,row) => (
      <div><div style={{ fontWeight:500, color:ADMIN.textPrimary }}>{v}</div><div style={{ fontSize:11.5, color:ADMIN.textSecondary }}>{row.phone}</div></div>
    )},
    { key:'station',      title:'站点' },
    { key:'createdAt',    title:'创建时间', render: v => <span style={{ fontSize:12.5 }}>{v}</span> },
    { key:'settledAt',    title:'结算时间', render: (v,row) => row.status==='待结算'
      ? <span style={{ color:ADMIN.warningColor, fontSize:12 }}>待结算…</span>
      : <span style={{ fontSize:12.5 }}>{v}</span>
    },
    { key:'totalKwh',     title:'用电量', align:'right', render: v => <span><strong>{v}</strong><span style={{ fontSize:11, color:ADMIN.textSecondary, marginLeft:3 }}>kWh</span></span> },
    { key:'elecFee',      title:'电费', align:'right', render: v => <span style={{ fontSize:12.5, color:ADMIN.textRegular }}>¥{v.toFixed(2)}</span> },
    { key:'serviceFee',   title:'服务费', align:'right', render: v => <span style={{ fontSize:12.5, color:ADMIN.textRegular }}>¥{v.toFixed(2)}</span> },
    { key:'actualAmount', title:'实付', align:'right', render: (v,row) => (
      <div style={{ textAlign:'right' }}>
        <span style={{ color:ADMIN.primary, fontWeight:600 }}>¥{v.toFixed(2)}</span>
        {row.discount > 0 && <div style={{ fontSize:11, color:ADMIN.successDark }}>优惠 -¥{row.discount.toFixed(2)}</div>}
      </div>
    )},
    { key:'status',       title:'状态', render: v => statusTag(v) },
    { key:'id',           title:'操作', render: (_,row) => (
      <antd.Button type="link" size="small" onClick={() => setDetailOrder(row)}>详情</antd.Button>
    )},
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
            <ElInput placeholder="手机号" value={phoneFilter} onChange={e => { setPhoneFilter(e.target.value); setPage(1) }} width={120}/>
            <ElSelect value={statusFilter} onChange={v => { setStatusFilter(v); setPage(1) }} width={120}
              options={[{value:'all',label:'全部状态'},{value:'待结算',label:'待结算'},{value:'已完成',label:'已完成'},{value:'已退款',label:'已退款'},{value:'异常',label:'异常'}]}/>
            <ElSelect value={stationFilter} onChange={v => { setStationFilter(v); setPage(1) }} options={stationOptions} width={150}/>
            <antd.Button onClick={reset}>重置</antd.Button>
          </FilterBar>
        </div>
        <DataTable data={paginated} columns={columns}/>
        <div style={{ padding:'0 20px 16px' }}>
          <Pagination total={filtered.length} page={page} pageSize={pageSize}
            onPageChange={p=>setPage(p)} onPageSizeChange={s=>{setPageSize(s);setPage(1)}}/>
        </div>
      </ElCard>

      {detailOrder && (
        <OrderDetailModal order={detailOrder} onClose={() => setDetailOrder(null)}/>
      )}
    </div>
  )
}

Object.assign(window, { SessionsScreen, OrdersScreen, SESSIONS_DATA, ORDERS_DATA })
