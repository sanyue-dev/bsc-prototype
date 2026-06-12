// admin/screens-2.jsx — Pricing, Users, Coupons（antd 重构版）
/* global antd */

// ─── mock data ────────────────────────────────────────────────────
const USERS_DATA = [
  { id:'U100234', name:'王小明', phone:'138****8821', regDate:'2023-08-12', totalSpend:'¥2,341', balance:'¥120.50', status:'正常' },
  { id:'U100235', name:'李佳丽', phone:'139****6622', regDate:'2023-10-05', totalSpend:'¥1,820', balance:'¥45.00',  status:'正常' },
  { id:'U100236', name:'张大勇', phone:'150****3312', regDate:'2024-01-18', totalSpend:'¥980',   balance:'¥200.00', status:'正常' },
  { id:'U100237', name:'赵雪梅', phone:'186****4401', regDate:'2024-02-28', totalSpend:'¥450',   balance:'¥30.00',  status:'正常' },
  { id:'U100238', name:'陈浩天', phone:'155****2290', regDate:'2024-03-14', totalSpend:'¥3,680', balance:'¥500.00', status:'正常' },
  { id:'U100239', name:'刘思远', phone:'177****8834', regDate:'2023-06-21', totalSpend:'¥5,120', balance:'¥88.00',  status:'正常' },
  { id:'U100240', name:'周天宇', phone:'182****1156', regDate:'2024-04-02', totalSpend:'¥230',   balance:'¥0.00',   status:'禁用' },
  { id:'U100241', name:'吴玲玲', phone:'133****5573', regDate:'2023-09-15', totalSpend:'¥1,240', balance:'¥60.00',  status:'正常' },
  { id:'U100242', name:'孙浩宇', phone:'188****9920', regDate:'2024-05-01', totalSpend:'¥120',   balance:'¥100.00', status:'正常' },
  { id:'U100243', name:'郑雅芸', phone:'159****6645', regDate:'2024-05-22', totalSpend:'¥60',    balance:'¥50.00',  status:'正常' },
]

const COUPONS_DATA = [
  { id:'CP-001', name:'新用户立减券',  type:'满减券', value:'满50减10',       issued:3200,  claimed:2841, valid:'2024-07-31', status:'进行中'   },
  { id:'CP-002', name:'充电5折体验券', type:'折扣券', value:'5折（上限20元）', issued:500,   claimed:498,  valid:'2024-06-30', status:'即将到期' },
  { id:'CP-003', name:'双节感恩满减',  type:'满减券', value:'满100减20',      issued:10000, claimed:6420, valid:'2024-10-08', status:'进行中'   },
  { id:'CP-004', name:'六一充值赠金券',type:'赠金券', value:'充100送20',      issued:2000,  claimed:1882, valid:'2024-06-30', status:'即将到期' },
  { id:'CP-005', name:'年度会员专属券',type:'折扣券', value:'9折（无上限）',  issued:800,   claimed:800,  valid:'2024-12-31', status:'进行中'   },
  { id:'CP-006', name:'元旦新年活动券',type:'满减券', value:'满30减5',        issued:5000,  claimed:5000, valid:'2024-01-15', status:'已结束'   },
]

const ACTIVITIES_DATA = [
  { id:'AC-001', name:'端午节充电优惠', type:'节假日活动', range:'2024-06-08 ~ 2024-06-10', participants:1240, status:'进行中' },
  { id:'AC-002', name:'畅充月卡推广',   type:'会员活动',   range:'2024-06-01 ~ 2024-06-30', participants:3820, status:'进行中' },
  { id:'AC-003', name:'五一劳动节特惠', type:'节假日活动', range:'2024-05-01 ~ 2024-05-05', participants:2156, status:'已结束' },
]

const PRICING_RULES_DATA = [
  { id:'R001', name:'标准规则 A', desc:'适用于住宅小区慢充场景', status:'active', currentVer:'v1.2', updatedAt:'2026-05-18', stationCount:4,
    versions:[
      {ver:'v1.2', date:'2026-05-18', by:'张运营', note:'调整档位三服务费', elec:'0.60', tiers:['0.40','0.50','0.65','0.70'], overTime:'0.10', minBalance:'3.00'},
      {ver:'v1.1', date:'2026-03-02', by:'张运营', note:'上调电费单价',     elec:'0.58', tiers:['0.40','0.50','0.60','0.70'], overTime:'0.10', minBalance:'3.00'},
      {ver:'v1.0', date:'2025-11-10', by:'系统',   note:'初始版本',         elec:'0.55', tiers:['0.35','0.45','0.55','0.65'], overTime:'0.00', minBalance:'2.00'},
    ]
  },
  { id:'R002', name:'峰谷差价规则', desc:'商业园区峰谷分时计费', status:'active', currentVer:'v2.0', updatedAt:'2026-04-01', stationCount:2,
    versions:[
      {ver:'v2.0', date:'2026-04-01', by:'李管理', note:'重构峰谷两档', elec:'0.72', tiers:['0.30','0.45','0.60','0.80'], overTime:'0.15', minBalance:'5.00'},
      {ver:'v1.0', date:'2025-09-15', by:'系统',   note:'初始版本',     elec:'0.65', tiers:['0.40','0.55','0.70','0.85'], overTime:'0.10', minBalance:'3.00'},
    ]
  },
  { id:'R003', name:'优惠试点规则', desc:'新站点开业促销，限时低价', status:'draft', currentVer:'v1.0', updatedAt:'2026-06-08', stationCount:0,
    versions:[
      {ver:'v1.0', date:'2026-06-08', by:'张运营', note:'草稿，待审批', elec:'0.50', tiers:['0.30','0.38','0.48','0.58'], overTime:'0.00', minBalance:'2.00'},
    ]
  },
]

const STATION_BILLING_DATA = [
  {id:'S001', name:'金牛苑南门车棚',   ruleId:'R001', since:'2026-05-18'},
  {id:'S002', name:'蓝桥科技园B座',    ruleId:'R002', since:'2026-04-01'},
  {id:'S003', name:'滨河新村东区',     ruleId:'R001', since:'2026-05-18'},
  {id:'S005', name:'天府软件园D区',    ruleId:'R001', since:'2026-05-18'},
  {id:'S010', name:'玉林东路菜市场',   ruleId:'R002', since:'2026-04-01'},
  {id:'S012', name:'桂溪生态公园西门', ruleId:'R001', since:'2026-05-18'},
]

const TIER_ROWS = [
  {label:'档位一', range:'0 – 100W',   dot:ADMIN.successColor},
  {label:'档位二', range:'101 – 200W', dot:ADMIN.primary},
  {label:'档位三', range:'201 – 300W', dot:ADMIN.warningColor},
  {label:'档位四', range:'301 – 400W', dot:ADMIN.dangerColor},
]

// 本地辅助：从 is_online + maintenance_mode 派生显示状态
function _devStatus(d) {
  if (!d.is_online) return '离线'
  if (d.maintenance_mode) return '维护中'
  return '在线'
}

// ─── SearchIcon / PlusIcon ────────────────────────────────────────
const SearchIcon2 = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ADMIN.textSecondary} strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
)

// ─── RuleEditModal ────────────────────────────────────────────────
function RuleEditModal({ rule, onClose, onPublish, onDraft }) {
  const [form] = antd.Form.useForm()
  const initVer = rule && rule.versions ? rule.versions[0] : null
  const [tiers,       setTiers]       = React.useState(initVer ? [...initVer.tiers] : ['0.40','0.50','0.60','0.70'])
  const [showConfirm, setShowConfirm] = React.useState(false)
  const [saving,      setSaving]      = React.useState(false)
  const [versionNote, setVersionNote] = React.useState('')
  const [elecVal,     setElecVal]     = React.useState(initVer ? initVer.elec : '0.60')

  React.useEffect(() => {
    if (initVer) {
      form.setFieldsValue({ name:rule.name, desc:rule.desc, elec:initVer.elec, overTime:initVer.overTime, minBalance:initVer.minBalance })
    }
  }, [])

  function doPublish() {
    setSaving(true)
    const values = form.getFieldsValue()
    setTimeout(() => { setSaving(false); setShowConfirm(false); onPublish({ ...values, tiers, note:versionNote }) }, 900)
  }

  const tierTableData = TIER_ROWS.map((row, i) => {
    const midW = [50,150,250,350][i]
    const ec   = ((midW/1000) * parseFloat(elecVal||0)).toFixed(3)
    const tot  = (parseFloat(ec) + parseFloat(tiers[i]||0)).toFixed(2)
    return { ...row, key:i, idx:i, ec, tot }
  })

  const tierColumns = [
    { title:'档位', dataIndex:'label', render:(v,row) => (
      <div style={{ display:'flex', alignItems:'center', gap:7 }}>
        <div style={{ width:8, height:8, borderRadius:2, background:row.dot, flexShrink:0 }}/>
        <span style={{ fontWeight:500 }}>{v}</span>
      </div>
    )},
    { title:'功率范围', dataIndex:'range' },
    { title:'服务费（元/时）', render:(_,row) => (
      <antd.Input size="small" value={tiers[row.idx]} style={{ width:80 }}
        onChange={e => setTiers(t => t.map((v,pi) => pi===row.idx ? e.target.value : v))}/>
    )},
    { title:'参考合计（元/时）', render:(_,row) => (
      <span style={{ fontSize:12, color:ADMIN.textSecondary }}>
        ¥{row.ec} + ¥{tiers[row.idx]} = <strong style={{ color:ADMIN.primary }}>¥{row.tot}</strong>
      </span>
    )},
  ]

  return (
    <>
      <antd.Modal
        open={true}
        title={rule ? `编辑规则 · ${rule.name}` : '新建计费规则'}
        width={620}
        onCancel={onClose}
        destroyOnClose
        footer={
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <antd.Button onClick={onDraft}>保存草稿</antd.Button>
            <antd.Space>
              <antd.Button onClick={onClose}>取消</antd.Button>
              <antd.Button type="primary" onClick={() => setShowConfirm(true)}>发布新版本</antd.Button>
            </antd.Space>
          </div>
        }
      >
        <antd.Form form={form} layout="vertical" size="small"
          onValuesChange={(changed) => { if (changed.elec !== undefined) setElecVal(changed.elec) }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 16px' }}>
            <antd.Form.Item name="name" label="规则名称" rules={[{required:true,message:'请输入规则名称'}]}>
              <antd.Input placeholder="如：标准规则 A"/>
            </antd.Form.Item>
            <antd.Form.Item name="desc" label="备注说明">
              <antd.Input placeholder="适用场景简述"/>
            </antd.Form.Item>
          </div>
          <div style={{ padding:'12px 14px', background:ADMIN.bodyBg, borderRadius:6, marginBottom:16 }}>
            <div style={{ fontSize:13, fontWeight:600, color:ADMIN.textPrimary, marginBottom:10 }}>电费单价</div>
            <div style={{ display:'flex', alignItems:'center', gap:10, fontSize:13 }}>
              <span style={{ color:ADMIN.textRegular }}>统一单价（元 / 度）</span>
              <antd.Form.Item name="elec" noStyle><antd.Input style={{ width:80 }}/></antd.Form.Item>
              <span style={{ fontSize:12, color:ADMIN.textSecondary }}>按实际用电量计费</span>
            </div>
          </div>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:13, fontWeight:600, color:ADMIN.textPrimary, marginBottom:10 }}>阶梯服务费（元 / 小时）</div>
            <antd.Table size="small" pagination={false} dataSource={tierTableData} columns={tierColumns} bordered rowKey="key"/>
          </div>
          <div style={{ padding:'12px 14px', background:ADMIN.bodyBg, borderRadius:6 }}>
            <div style={{ fontSize:13, fontWeight:600, color:ADMIN.textPrimary, marginBottom:12 }}>附加规则</div>
            <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
              {[
                {name:'overTime',   label:'超时占用费（元/分钟）', hint:'断电 30 分钟后开始计费，0 表示不收取'},
                {name:'minBalance', label:'最低预存余额（元）',     hint:'低于此余额不可启动充电'},
              ].map(r => (
                <div key={r.name} style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <label style={{ fontSize:13, color:ADMIN.textRegular, width:160, flexShrink:0 }}>{r.label}</label>
                  <antd.Form.Item name={r.name} noStyle><antd.Input style={{ width:80 }}/></antd.Form.Item>
                  <span style={{ fontSize:12, color:ADMIN.textSecondary }}>{r.hint}</span>
                </div>
              ))}
            </div>
          </div>
        </antd.Form>
      </antd.Modal>

      <antd.Modal
        open={showConfirm}
        title="确认发布新版本？"
        width={440}
        onCancel={() => setShowConfirm(false)}
        onOk={doPublish}
        confirmLoading={saving}
        okText="确认发布"
        cancelText="取消"
        zIndex={1100}
      >
        <antd.Alert type="warning" showIcon
          message="发布后将生成新版本号。新规则在用户下一次开启充电时生效，进行中的订单继续按原费率计费。"
          style={{ marginBottom:14 }}/>
        <div>
          <div style={{ fontSize:12.5, color:ADMIN.textSecondary, marginBottom:6 }}>版本备注（选填）</div>
          <antd.Input value={versionNote} onChange={e=>setVersionNote(e.target.value)} placeholder="简述本次改动内容…"/>
        </div>
      </antd.Modal>
    </>
  )
}

// ─── AssignRuleModal ──────────────────────────────────────────────
function AssignRuleModal({ station, rules, onClose, onAssign }) {
  const [selected, setSelected] = React.useState(station.ruleId)
  const [saving,   setSaving]   = React.useState(false)

  function doAssign() { setSaving(true); setTimeout(() => { setSaving(false); onAssign(station.id, selected) }, 700) }

  return (
    <antd.Modal
      open={true}
      title={
        <div>
          <div>更换计费规则</div>
          <div style={{ fontSize:12.5, color:ADMIN.textSecondary, fontWeight:400, marginTop:2 }}>{station.name}</div>
        </div>
      }
      onCancel={onClose}
      width={440}
      footer={
        <div style={{ display:'flex', justifyContent:'flex-end', gap:8 }}>
          <antd.Button onClick={onClose}>取消</antd.Button>
          <antd.Button type="primary" loading={saving} onClick={doAssign}>确认更换</antd.Button>
        </div>
      }
    >
      <p style={{ fontSize:12.5, color:ADMIN.textSecondary, marginBottom:12 }}>
        选择要挂载的计费规则，站点将始终使用该规则的最新发布版本
      </p>
      <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:14 }}>
        {rules.filter(r => r.status==='active').map(rule => (
          <div key={rule.id} onClick={() => setSelected(rule.id)}
            style={{ padding:'12px 14px', borderRadius:6, cursor:'pointer',
              border:`1.5px solid ${selected===rule.id ? ADMIN.primary : ADMIN.border}`,
              background:selected===rule.id ? ADMIN.primaryLight : '#fff', transition:'all .12s' }}>
            <div style={{ fontSize:13.5, fontWeight:600, color:selected===rule.id ? ADMIN.primary : ADMIN.textPrimary, marginBottom:3 }}>{rule.name}</div>
            <div style={{ fontSize:12, color:ADMIN.textSecondary }}>{rule.desc}</div>
          </div>
        ))}
      </div>
      <antd.Alert type="warning" showIcon={false}
        message="更换后新规则将在该站点用户下一次开启充电时生效，进行中订单不受影响。"
        style={{ fontSize:12.5 }}/>
    </antd.Modal>
  )
}

// ─── ReassignConfirmModal ─────────────────────────────────────────
function ReassignConfirmModal({ devices, targetRuleName, onCancel, onConfirm }) {
  return (
    <antd.Modal
      open={true}
      title="确认切换规则？"
      onCancel={onCancel}
      onOk={onConfirm}
      okText="确认切换"
      cancelText="取消"
      width={420}
      zIndex={1200}
    >
      <p style={{ fontSize:13, color:ADMIN.textRegular, lineHeight:1.7, marginBottom:12 }}>
        以下设备当前已绑定其他规则，确认后将切换到「{targetRuleName}」：
      </p>
      <div style={{ padding:'10px 14px', borderRadius:5, background:ADMIN.bodyBg, border:`1px solid ${ADMIN.borderLight}` }}>
        {devices.map((d,i) => (
          <div key={i} style={{ fontSize:13, color:ADMIN.textRegular, lineHeight:2 }}>
            · <span style={{ fontFamily:'monospace', fontWeight:500, color:ADMIN.textPrimary }}>{d.id}</span>
            <span style={{ color:ADMIN.textSecondary }}> （当前：{d.currentRule}）</span>
          </div>
        ))}
      </div>
    </antd.Modal>
  )
}

// ─── DeviceSelectorModal ──────────────────────────────────────────
function DeviceSelectorModal({ currentRuleId, billingMap, allRules, onClose, onConfirm }) {
  const allDevices = window.DEVICES_DATA || []
  const [selectedKeys, setSelectedKeys] = React.useState([])
  const [idFilter,     setIdFilter]     = React.useState('')
  const [stFilter,     setStFilter]     = React.useState('')
  const [showReassign, setShowReassign] = React.useState(false)

  function getRuleStatus(deviceId) {
    const rId = billingMap[deviceId]
    if (rId === currentRuleId) return { type:'current' }
    if (!rId) return { type:'none' }
    const rule = allRules.find(r => r.id === rId)
    return { type:'other', label: rule ? rule.name : rId }
  }

  const filtered = allDevices.filter(d =>
    d.id.toLowerCase().includes(idFilter.toLowerCase()) && d.station.includes(stFilter)
  )

  const reassignIds = selectedKeys.filter(id => getRuleStatus(id).type === 'other')
  const currentRuleName = (allRules.find(r => r.id === currentRuleId)||{}).name || ''

  function handlePrimary() {
    if (selectedKeys.length === 0) return
    if (reassignIds.length > 0) setShowReassign(true)
    else onConfirm(selectedKeys)
  }

  const devCols = [
    { title:'', width:40, render:(_,record) => {
      const rs = getRuleStatus(record.id)
      const isCurrent = rs.type === 'current'
      const isSel = selectedKeys.includes(record.id)
      return (
        <antd.Checkbox
          checked={isSel || isCurrent}
          disabled={isCurrent}
          onChange={e => {
            if (e.target.checked) setSelectedKeys(p => [...p, record.id])
            else setSelectedKeys(p => p.filter(k => k !== record.id))
          }}
        />
      )
    }},
    { title:'设备编号', dataIndex:'id', render: v => <span style={{ fontFamily:'monospace', fontSize:13, fontWeight:600, color:ADMIN.primary }}>{v}</span> },
    { title:'所属站点', dataIndex:'station' },
    { title:'状态', render:(_,record) => {
      const ds = _devStatus(record)
      const colorMap = {'在线':'success','维护中':'warning','离线':'default'}
      return <antd.Tag color={colorMap[ds]||'default'}>{ds}</antd.Tag>
    }},
    { title:'计费规则', render:(_,record) => {
      const rs = getRuleStatus(record.id)
      if (rs.type==='current') return <antd.Tag color="success">已绑定此规则</antd.Tag>
      if (rs.type==='other') return <span style={{ fontSize:12, color:ADMIN.warningDark }}>{rs.label}</span>
      return <span style={{ fontSize:12, color:ADMIN.textSecondary }}>未绑定</span>
    }},
  ]

  return (
    <>
      <antd.Modal
        open={true}
        title={
          <div>
            <div>添加关联设备</div>
            {selectedKeys.length > 0 && (
              <div style={{ fontSize:13, color:ADMIN.textSecondary, fontWeight:400, marginTop:2 }}>
                已选 {selectedKeys.length} 台
                {reassignIds.length > 0 && <span style={{ color:ADMIN.warningDark }}> · 其中 {reassignIds.length} 台将从其他规则迁移</span>}
              </div>
            )}
          </div>
        }
        width={680}
        onCancel={onClose}
        footer={
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize:13, color:ADMIN.textSecondary }}>共 {allDevices.length} 台设备</span>
            <antd.Space>
              <antd.Button onClick={onClose}>取消</antd.Button>
              <antd.Button type="primary" disabled={selectedKeys.length===0} onClick={handlePrimary}>
                {selectedKeys.length > 0 ? `添加 ${selectedKeys.length} 台设备` : '请选择设备'}
              </antd.Button>
            </antd.Space>
          </div>
        }
      >
        <antd.Space style={{ marginBottom:14, width:'100%' }}>
          <antd.Input placeholder="搜索设备编号" value={idFilter} onChange={e=>setIdFilter(e.target.value)}
            allowClear prefix={<SearchIcon2/>} style={{ width:280 }}/>
          <antd.Input placeholder="搜索站点名称" value={stFilter} onChange={e=>setStFilter(e.target.value)}
            allowClear prefix={<SearchIcon2/>} style={{ width:280 }}/>
        </antd.Space>
        <antd.Table size="small" dataSource={filtered} rowKey="id" columns={devCols}
          pagination={false} scroll={{ y:360 }} locale={{ emptyText:'无匹配设备' }}/>
      </antd.Modal>

      {showReassign && (
        <ReassignConfirmModal
          devices={reassignIds.map(id=>({ id, currentRule:(allRules.find(r=>r.id===billingMap[id])||{}).name||billingMap[id] }))}
          targetRuleName={currentRuleName}
          onCancel={() => setShowReassign(false)}
          onConfirm={() => { setShowReassign(false); onConfirm(selectedKeys) }}
        />
      )}
    </>
  )
}

// ─── RuleDevicesModal ─────────────────────────────────────────────
function RuleDevicesModal({ rule, onClose }) {
  const allRules   = window.PRICING_RULES_DATA || []
  const allDevices = window.DEVICES_DATA || []
  const [billingMap, setBillingMap] = React.useState(() => window.getDeviceBillingMap ? window.getDeviceBillingMap() : {})
  const [idFilter,   setIdFilter]   = React.useState('')
  const [stFilter,   setStFilter]   = React.useState('')
  const [showAdd,    setShowAdd]    = React.useState(false)
  const [removeTgt,  setRemoveTgt]  = React.useState(null)

  React.useEffect(() => {
    function onChg() { if (window.getDeviceBillingMap) setBillingMap(window.getDeviceBillingMap()) }
    window.addEventListener('deviceBillingChanged', onChg)
    return () => window.removeEventListener('deviceBillingChanged', onChg)
  }, [])

  const boundDevices = allDevices.filter(d => billingMap[d.id] === rule.id)
  const filtered = boundDevices.filter(d =>
    d.id.toLowerCase().includes(idFilter.toLowerCase()) && d.station.includes(stFilter)
  )

  function doRemove(deviceId) {
    const m = { ...billingMap, [deviceId]:null }
    window.saveDeviceBillingMap(m); setBillingMap(m); setRemoveTgt(null)
    antd.message.success('已移除设备')
  }

  function doAdd(ids) {
    const m = { ...billingMap }; ids.forEach(id => { m[id] = rule.id })
    window.saveDeviceBillingMap(m); setBillingMap(m); setShowAdd(false)
    antd.message.success(`已添加 ${ids.length} 台设备`)
  }

  const devCols = [
    { title:'设备编号', dataIndex:'id', render: v => <span style={{ fontFamily:'monospace', fontSize:13, fontWeight:700, color:ADMIN.primary }}>{v}</span> },
    { title:'所属站点', dataIndex:'station' },
    { title:'设备类型', dataIndex:'type' },
    { title:'状态', render:(_,record) => {
      const ds = _devStatus(record)
      return <antd.Tag color={{'在线':'success','维护中':'warning','离线':'default'}[ds]||'default'}>{ds}</antd.Tag>
    }},
    { title:'操作', render:(_,record) => (
      <antd.Button type="link" danger size="small" onClick={() => setRemoveTgt(record)}>移除</antd.Button>
    )},
  ]

  return (
    <>
      <antd.Modal
        open={true}
        title={
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              关联设备
              <antd.Tag color="blue">{rule.currentVer}</antd.Tag>
            </div>
            <div style={{ marginTop:4 }}>
              <span style={{ fontSize:13.5, fontWeight:600, color:ADMIN.textPrimary }}>{rule.name}</span>
              <span style={{ fontSize:12.5, fontWeight:400, color:ADMIN.textSecondary, marginLeft:8 }}>{boundDevices.length} 台设备</span>
            </div>
          </div>
        }
        width={780}
        onCancel={onClose}
        footer={<antd.Button onClick={onClose}>关闭</antd.Button>}
      >
        <div style={{ display:'flex', gap:10, marginBottom:14, alignItems:'center' }}>
          <antd.Input placeholder="搜索设备编号" value={idFilter} onChange={e=>setIdFilter(e.target.value)}
            allowClear prefix={<SearchIcon2/>} style={{ flex:1 }}/>
          <antd.Input placeholder="搜索站点名称" value={stFilter} onChange={e=>setStFilter(e.target.value)}
            allowClear prefix={<SearchIcon2/>} style={{ flex:1 }}/>
          <antd.Button type="primary" onClick={() => setShowAdd(true)}
            icon={<svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1v9M1 5.5h9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>}>
            添加设备
          </antd.Button>
        </div>
        <antd.Table size="small" dataSource={filtered} rowKey="id" columns={devCols}
          pagination={false} scroll={{ y:380 }}
          locale={{ emptyText: boundDevices.length===0 ? '暂无关联设备，点击「添加设备」开始绑定' : '无匹配结果' }}/>
      </antd.Modal>

      {showAdd && (
        <DeviceSelectorModal currentRuleId={rule.id} billingMap={billingMap} allRules={allRules}
          onClose={() => setShowAdd(false)} onConfirm={doAdd}/>
      )}

      <antd.Modal
        open={!!removeTgt}
        title="确认移除设备？"
        onCancel={() => setRemoveTgt(null)}
        onOk={() => doRemove(removeTgt?.id)}
        okText="确认移除" okType="danger" cancelText="取消"
        width={400} zIndex={1100}
      >
        {removeTgt && (
          <p style={{ fontSize:13, color:ADMIN.textRegular, lineHeight:1.7 }}>
            设备 <strong style={{ fontFamily:'monospace' }}>{removeTgt.id}</strong> 将从「{rule.name}」规则中移除，移除后不使用任何计费规则，直到重新分配。
          </p>
        )}
      </antd.Modal>
    </>
  )
}

// ─── PricingScreen ────────────────────────────────────────────────
function PricingScreen() {
  const [rules,       setRules]       = React.useState(PRICING_RULES_DATA)
  const [expandedKeys,setExpandedKeys]= React.useState([])
  const [editRule,    setEditRule]    = React.useState(null)
  const [devModal,    setDevModal]    = React.useState(null)
  const [billingMap,  setBillingMap]  = React.useState(() => window.getDeviceBillingMap ? window.getDeviceBillingMap() : {})

  React.useEffect(() => {
    function onChg() { if (window.getDeviceBillingMap) setBillingMap(window.getDeviceBillingMap()) }
    window.addEventListener('deviceBillingChanged', onChg)
    return () => window.removeEventListener('deviceBillingChanged', onChg)
  }, [])

  function getDeviceCount(ruleId) {
    return (window.DEVICES_DATA||[]).filter(d => billingMap[d.id]===ruleId).length
  }

  function handlePublish({ name, desc, elec, tiers, overTime, minBalance, note }) {
    const today = new Date().toISOString().slice(0,10)
    setRules(prev => prev.map(r => {
      if (r.id !== editRule?.id) return r
      const newVer = `${r.currentVer.split('.')[0]}.${r.versions.length+1}`
      return { ...r, name, desc, currentVer:newVer, updatedAt:today, versions:[{ver:newVer, date:today, by:'张运营', note:note||'更新规则', elec, tiers, overTime, minBalance}, ...r.versions] }
    }))
    setEditRule(null); antd.message.success('新版本已发布')
  }

  function handleDraft() { setEditRule(null); antd.message.info('已保存为草稿') }

  const expandedRowRender = rule => (
    <div style={{ padding:'8px 16px 8px 48px' }}>
      <div style={{ fontSize:12.5, fontWeight:600, color:ADMIN.textSecondary, marginBottom:8 }}>版本历史</div>
      {rule.versions.map((v,i) => (
        <div key={i} style={{ display:'flex', gap:12, alignItems:'center', paddingBottom:7, fontSize:12.5 }}>
          <antd.Tag color={i===0?'blue':'default'} style={{ minWidth:40 }}>{v.ver}</antd.Tag>
          <span style={{ color:ADMIN.textSecondary, minWidth:80 }}>{v.date}</span>
          <span style={{ color:ADMIN.textSecondary }}>by {v.by}</span>
          <span style={{ color:ADMIN.textRegular }}>{v.note}</span>
          <span style={{ color:ADMIN.textSecondary }}>电费 ¥{v.elec}/度</span>
        </div>
      ))}
    </div>
  )

  const columns = [
    { title:'规则名称', render:(_,rule) => (
      <div>
        <div style={{ fontWeight:600, color:ADMIN.textPrimary }}>{rule.name}</div>
        <div style={{ fontSize:12, color:ADMIN.textSecondary, marginTop:2 }}>{rule.desc}</div>
      </div>
    )},
    { title:'当前版本', dataIndex:'currentVer', align:'center', render: v => <antd.Tag color="blue">{v}</antd.Tag> },
    { title:'状态', dataIndex:'status', align:'center', render: v => <antd.Tag color={v==='active'?'success':'default'}>{v==='active'?'已发布':'草稿'}</antd.Tag> },
    { title:'关联设备', align:'center', render:(_,rule) => (
      <antd.Button type="link" size="small" onClick={() => setDevModal(rule)}>{getDeviceCount(rule.id)} 台</antd.Button>
    )},
    { title:'最近更新', dataIndex:'updatedAt' },
    { title:'操作', render:(_,rule) => (
      <antd.Space size="small">
        <antd.Button type="link" size="small" onClick={() => setEditRule(rule)}>编辑</antd.Button>
        <antd.Button type="link" size="small" onClick={() => setDevModal(rule)}>关联设备</antd.Button>
      </antd.Space>
    )},
  ]

  return (
    <div>
      <PageHeader>
        <antd.Button type="primary"
          icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>}
          onClick={() => setEditRule('new')}>新建规则</antd.Button>
      </PageHeader>
      <antd.Card styles={{ body:{ padding:0 } }}>
        <antd.Table
          dataSource={rules} rowKey="id" columns={columns} pagination={false} size="middle"
          expandable={{ expandedRowRender, expandedRowKeys:expandedKeys, onExpandedRowsChange: keys => setExpandedKeys([...keys]) }}
        />
      </antd.Card>

      {editRule && editRule !== 'new' && (
        <RuleEditModal rule={editRule} onClose={() => setEditRule(null)} onPublish={handlePublish} onDraft={handleDraft}/>
      )}
      {devModal && <RuleDevicesModal rule={devModal} onClose={() => setDevModal(null)}/>}
    </div>
  )
}

// ─── UsersScreen ─────────────────────────────────────────────────
function UsersScreen() {
  const [nameFilter, setNameFilter] = React.useState('')
  const [phoneFilter,setPhoneFilter]= React.useState('')
  const [page,       setPage]       = React.useState(1)

  const filtered = USERS_DATA.filter(u => u.name.includes(nameFilter) && u.phone.includes(phoneFilter))

  function doReset() { setNameFilter(''); setPhoneFilter(''); setPage(1) }

  const columns = [
    { key:'id',         title:'用户ID', render: v => <span style={{ fontFamily:'monospace', fontSize:12, color:ADMIN.textSecondary }}>{v}</span> },
    { key:'name',       title:'昵称', render: v => <span style={{ fontWeight:500, color:ADMIN.textPrimary }}>{v}</span> },
    { key:'phone',      title:'手机号' },
    { key:'regDate',    title:'注册日期' },
    { key:'totalSpend', title:'累计消费' },
    { key:'balance',    title:'账户余额', render: v => <span style={{ color:ADMIN.primary, fontWeight:500 }}>{v}</span> },
    { key:'status',     title:'状态', render: v => <antd.Tag color={v==='正常'?'success':'error'}>{v}</antd.Tag> },
    { key:'id', title:'操作', render: () => (
      <antd.Space size="small">
        <antd.Button type="link" size="small">详情</antd.Button>
        <antd.Button type="link" size="small">调整余额</antd.Button>
      </antd.Space>
    )},
  ]

  return (
    <div>
      <ElCard padding={0}>
        <div style={{ padding:'14px 20px', borderBottom:`1px solid ${ADMIN.borderLight}` }}>
          <FilterBar>
            <ElInput placeholder="用户昵称" value={nameFilter} onChange={e => { setNameFilter(e.target.value); setPage(1) }} width={150}/>
            <ElInput placeholder="手机号" value={phoneFilter} onChange={e => { setPhoneFilter(e.target.value); setPage(1) }} width={150}/>
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

// ─── CouponsScreen ────────────────────────────────────────────────
function CouponsScreen() {
  const [page,      setPage]      = React.useState(1)
  const [activeTab, setActiveTab] = React.useState('coupons')

  const statusTag = v => <antd.Tag color={{进行中:'success',即将到期:'warning',已结束:'default'}[v]||'default'}>{v}</antd.Tag>

  const couponsCols = [
    { key:'id',      title:'券ID', render: v => <span style={{ fontSize:12, color:ADMIN.textSecondary, fontFamily:'monospace' }}>{v}</span> },
    { key:'name',    title:'优惠券名称', render: v => <span style={{ color:ADMIN.textPrimary, fontWeight:500 }}>{v}</span> },
    { key:'type',    title:'类型', render: v => <antd.Tag color="processing">{v}</antd.Tag> },
    { key:'value',   title:'优惠内容' },
    { key:'issued',  title:'总量', align:'center' },
    { key:'claimed', title:'已领取', align:'center', render: (v,row) => (
      <div style={{ display:'flex', alignItems:'center', gap:7 }}>
        <div style={{ flex:1, height:4, background:ADMIN.borderLight, borderRadius:999, minWidth:60 }}>
          <div style={{ width:`${Math.round(v/row.issued*100)}%`, height:'100%', background:ADMIN.primary, borderRadius:999 }}/>
        </div>
        <span style={{ fontSize:12, color:ADMIN.textSecondary, minWidth:24 }}>{v}</span>
      </div>
    )},
    { key:'valid',  title:'有效期至' },
    { key:'status', title:'状态', render: v => statusTag(v) },
    { key:'id', title:'操作', render: () => (
      <antd.Space size="small">
        <antd.Button type="link" size="small">编辑</antd.Button>
        <antd.Button type="link" danger size="small">停用</antd.Button>
      </antd.Space>
    )},
  ]

  const activitiesCols = [
    { key:'id',           title:'活动ID' },
    { key:'name',         title:'活动名称', render: v => <span style={{ color:ADMIN.textPrimary, fontWeight:500 }}>{v}</span> },
    { key:'type',         title:'活动类型', render: v => <antd.Tag color="processing">{v}</antd.Tag> },
    { key:'range',        title:'活动时间' },
    { key:'participants', title:'参与人数', align:'center' },
    { key:'status',       title:'状态', render: v => statusTag(v) },
    { key:'id', title:'操作', render: () => (
      <antd.Space size="small">
        <antd.Button type="link" size="small">编辑</antd.Button>
        <antd.Button type="link" size="small">数据</antd.Button>
      </antd.Space>
    )},
  ]

  const tabItems = [
    {
      key:'coupons', label:'优惠券',
      children: (
        <antd.Card styles={{ body:{padding:0} }}>
          <DataTable data={COUPONS_DATA} columns={couponsCols}/>
          <div style={{ padding:'0 20px 16px' }}>
            <Pagination total={COUPONS_DATA.length} page={page} pageSize={10} onPageChange={setPage}/>
          </div>
        </antd.Card>
      ),
    },
    {
      key:'activities', label:'营销活动',
      children: (
        <antd.Card styles={{ body:{padding:0} }}>
          <DataTable data={ACTIVITIES_DATA} columns={activitiesCols}/>
        </antd.Card>
      ),
    },
  ]

  return (
    <antd.Tabs
      activeKey={activeTab}
      onChange={setActiveTab}
      items={tabItems}
      tabBarExtraContent={
        <antd.Button type="primary"
          icon={<svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1v9M1 5.5h9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>}>
          {activeTab==='coupons' ? '新建优惠券' : '新建活动'}
        </antd.Button>
      }
    />
  )
}

Object.assign(window, {
  PricingScreen, UsersScreen, CouponsScreen, AssignRuleModal,
  PRICING_RULES_DATA, STATION_BILLING_DATA,
  RuleDevicesModal, DeviceSelectorModal, ReassignConfirmModal,
})
