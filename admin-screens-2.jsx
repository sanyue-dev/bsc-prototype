// admin-screens-2.jsx — Pricing, Users, Coupons

// ─── mock data ────────────────────────────────────────────────────
const USERS_DATA = [
  { id: 'U100234', name: '王小明', phone: '138****8821', regDate: '2023-08-12', totalSpend: '¥2,341', balance: '¥120.50', status: '正常' },
  { id: 'U100235', name: '李佳丽', phone: '139****6622', regDate: '2023-10-05', totalSpend: '¥1,820', balance: '¥45.00',  status: '正常' },
  { id: 'U100236', name: '张大勇', phone: '150****3312', regDate: '2024-01-18', totalSpend: '¥980',   balance: '¥200.00', status: '正常' },
  { id: 'U100237', name: '赵雪梅', phone: '186****4401', regDate: '2024-02-28', totalSpend: '¥450',   balance: '¥30.00',  status: '正常' },
  { id: 'U100238', name: '陈浩天', phone: '155****2290', regDate: '2024-03-14', totalSpend: '¥3,680', balance: '¥500.00', status: '正常' },
  { id: 'U100239', name: '刘思远', phone: '177****8834', regDate: '2023-06-21', totalSpend: '¥5,120', balance: '¥88.00',  status: '正常' },
  { id: 'U100240', name: '周天宇', phone: '182****1156', regDate: '2024-04-02', totalSpend: '¥230',   balance: '¥0.00',   status: '禁用' },
  { id: 'U100241', name: '吴玲玲', phone: '133****5573', regDate: '2023-09-15', totalSpend: '¥1,240', balance: '¥60.00',  status: '正常' },
  { id: 'U100242', name: '孙浩宇', phone: '188****9920', regDate: '2024-05-01', totalSpend: '¥120',   balance: '¥100.00', status: '正常' },
  { id: 'U100243', name: '郑雅芸', phone: '159****6645', regDate: '2024-05-22', totalSpend: '¥60',    balance: '¥50.00',  status: '正常' },
]

const COUPONS_DATA = [
  { id: 'CP-001', name: '新用户立减券',   type: '满减券', value: '满50减10',     issued: 3200,  claimed: 2841, valid: '2024-07-31', status: '进行中' },
  { id: 'CP-002', name: '充电5折体验券',  type: '折扣券', value: '5折（上限20元）', issued: 500, claimed: 498,  valid: '2024-06-30', status: '即将到期' },
  { id: 'CP-003', name: '双节感恩满减',   type: '满减券', value: '满100减20',    issued: 10000, claimed: 6420, valid: '2024-10-08', status: '进行中' },
  { id: 'CP-004', name: '六一充值赠金券', type: '赠金券', value: '充100送20',    issued: 2000,  claimed: 1882, valid: '2024-06-30', status: '即将到期' },
  { id: 'CP-005', name: '年度会员专属券', type: '折扣券', value: '9折（无上限）', issued: 800,  claimed: 800,  valid: '2024-12-31', status: '进行中' },
  { id: 'CP-006', name: '元旦新年活动券', type: '满减券', value: '满30减5',      issued: 5000,  claimed: 5000, valid: '2024-01-15', status: '已结束' },
]

const ACTIVITIES_DATA = [
  { id: 'AC-001', name: '端午节充电优惠', type: '节假日活动', range: '2024-06-08 ~ 2024-06-10', participants: 1240, status: '进行中' },
  { id: 'AC-002', name: '畅充月卡推广',   type: '会员活动',   range: '2024-06-01 ~ 2024-06-30', participants: 3820, status: '进行中' },
  { id: 'AC-003', name: '五一劳动节特惠', type: '节假日活动', range: '2024-05-01 ~ 2024-05-05', participants: 2156, status: '已结束' },
]

// ─── PricingScreen mock data ─────────────────────────────────────
const PRICING_RULES_DATA = [
  { id: 'R001', name: '标准规则 A', desc: '适用于住宅小区慢充场景', status: 'active', currentVer: 'v1.2', updatedAt: '2026-05-18', stationCount: 4,
    versions: [
      { ver: 'v1.2', date: '2026-05-18', by: '张运营', note: '调整档位三服务费', elec: '0.60', tiers: ['0.40','0.50','0.65','0.70'], overTime: '0.10', minBalance: '3.00' },
      { ver: 'v1.1', date: '2026-03-02', by: '张运营', note: '上调电费单价',       elec: '0.58', tiers: ['0.40','0.50','0.60','0.70'], overTime: '0.10', minBalance: '3.00' },
      { ver: 'v1.0', date: '2025-11-10', by: '系统',   note: '初始版本',           elec: '0.55', tiers: ['0.35','0.45','0.55','0.65'], overTime: '0.00', minBalance: '2.00' },
    ]
  },
  { id: 'R002', name: '峰谷差价规则', desc: '商业园区峰谷分时计费', status: 'active', currentVer: 'v2.0', updatedAt: '2026-04-01', stationCount: 2,
    versions: [
      { ver: 'v2.0', date: '2026-04-01', by: '李管理', note: '重构峰谷两档',   elec: '0.72', tiers: ['0.30','0.45','0.60','0.80'], overTime: '0.15', minBalance: '5.00' },
      { ver: 'v1.0', date: '2025-09-15', by: '系统',   note: '初始版本',       elec: '0.65', tiers: ['0.40','0.55','0.70','0.85'], overTime: '0.10', minBalance: '3.00' },
    ]
  },
  { id: 'R003', name: '优惠试点规则', desc: '新站点开业促销，限时低价', status: 'draft', currentVer: 'v1.0', updatedAt: '2026-06-08', stationCount: 0,
    versions: [
      { ver: 'v1.0', date: '2026-06-08', by: '张运营', note: '草稿，待审批', elec: '0.50', tiers: ['0.30','0.38','0.48','0.58'], overTime: '0.00', minBalance: '2.00' },
    ]
  },
]

const STATION_BILLING_DATA = [
  { id: 'S001', name: '金牛苑南门车棚',   ruleId: 'R001', since: '2026-05-18' },
  { id: 'S002', name: '蓝桥科技园B座',    ruleId: 'R002', since: '2026-04-01' },
  { id: 'S003', name: '滨河新村东区',     ruleId: 'R001', since: '2026-05-18' },
  { id: 'S005', name: '天府软件园D区',    ruleId: 'R001', since: '2026-05-18' },
  { id: 'S010', name: '玉林东路菜市场',   ruleId: 'R002', since: '2026-04-01' },
  { id: 'S012', name: '桂溪生态公园西门', ruleId: 'R001', since: '2026-05-18' },
]

const TIER_ROWS = [
  { label: '档位一', range: '0 – 100W',   dot: ADMIN.successColor },
  { label: '档位二', range: '101 – 200W', dot: ADMIN.primary },
  { label: '档位三', range: '201 – 300W', dot: ADMIN.warningColor },
  { label: '档位四', range: '301 – 400W', dot: ADMIN.dangerColor },
]

// ─── RuleEditModal ────────────────────────────────────────────────
function RuleEditModal({ rule, onClose, onPublish, onDraft }) {
  const initVer  = rule ? rule.versions[0] : null
  const [name,        setName]        = React.useState(rule ? rule.name : '')
  const [desc,        setDesc]        = React.useState(rule ? rule.desc : '')
  const [elec,        setElec]        = React.useState(initVer ? initVer.elec : '0.60')
  const [tiers,       setTiers]       = React.useState(initVer ? [...initVer.tiers] : ['0.40','0.50','0.60','0.70'])
  const [overTime,    setOverTime]    = React.useState(initVer ? initVer.overTime : '0.10')
  const [minBalance,  setMinBalance]  = React.useState(initVer ? initVer.minBalance : '3.00')
  const [showConfirm, setShowConfirm] = React.useState(false)
  const [saving,      setSaving]      = React.useState(false)
  const [versionNote, setVersionNote] = React.useState('')

  const inStyle = { height: 30, borderRadius: 4, border: `1px solid ${ADMIN.border}`, padding: '0 8px', fontSize: 13, color: ADMIN.textPrimary, outline: 'none', background: '#fff' }

  function doPublish() {
    setSaving(true)
    setTimeout(() => { setSaving(false); setShowConfirm(false); onPublish({ name, desc, elec, tiers, overTime, minBalance, note: versionNote }) }, 900)
  }

  return (
    <div style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(0,0,0,0.45)', display:'flex', alignItems:'center', justifyContent:'center' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background:'#fff', borderRadius:8, width:600, maxHeight:'90vh', overflow:'hidden', display:'flex', flexDirection:'column', boxShadow:'0 12px 40px rgba(0,21,41,0.18)', animation:'dropIn .18s ease' }}>
        {/* Header */}
        <div style={{ padding:'18px 24px', borderBottom:`1px solid ${ADMIN.borderLight}`, display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
          <div style={{ fontSize:15, fontWeight:600, color:ADMIN.textPrimary }}>{rule ? `编辑规则 · ${rule.name}` : '新建计费规则'}</div>
          <div onClick={onClose} style={{ cursor:'pointer', color:ADMIN.textSecondary, display:'flex' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </div>
        </div>
        {/* Body */}
        <div style={{ flex:1, overflowY:'auto', padding:'20px 24px' }}>
          {/* Basic info */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 16px', marginBottom:20 }}>
            <div>
              <label style={{ display:'block', fontSize:12.5, color:ADMIN.textSecondary, marginBottom:5 }}>规则名称</label>
              <input value={name} onChange={e=>setName(e.target.value)} style={{ ...inStyle, width:'100%' }} placeholder="如：标准规则 A"/>
            </div>
            <div>
              <label style={{ display:'block', fontSize:12.5, color:ADMIN.textSecondary, marginBottom:5 }}>备注说明</label>
              <input value={desc} onChange={e=>setDesc(e.target.value)} style={{ ...inStyle, width:'100%' }} placeholder="适用场景简述"/>
            </div>
          </div>
          {/* Elec price */}
          <div style={{ marginBottom:20, padding:'14px 16px', background:ADMIN.bodyBg, borderRadius:6 }}>
            <div style={{ fontSize:13, fontWeight:600, color:ADMIN.textPrimary, marginBottom:10 }}>电费单价</div>
            <div style={{ display:'flex', alignItems:'center', gap:10, fontSize:13 }}>
              <span style={{ color:ADMIN.textRegular }}>统一单价（元 / 度）</span>
              <input value={elec} onChange={e=>setElec(e.target.value)} style={{ ...inStyle, width:80 }}/>
              <span style={{ fontSize:12, color:ADMIN.textSecondary }}>按实际用电量计费</span>
            </div>
          </div>
          {/* Tier fees */}
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:13, fontWeight:600, color:ADMIN.textPrimary, marginBottom:10 }}>阶梯服务费（元 / 小时）</div>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead>
                <tr style={{ background:'#f5f7fa' }}>
                  {['档位','功率范围','服务费（元/时）','参考合计（元/时）'].map((h,i)=>(
                    <th key={i} style={{ padding:'8px 12px', textAlign:'left', fontWeight:600, color:ADMIN.textPrimary, borderBottom:`1px solid ${ADMIN.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIER_ROWS.map((row,i)=>{
                  const midW=[50,150,250,350][i]
                  const kwh=(midW/1000)
                  const ec=(kwh*parseFloat(elec||0)).toFixed(3)
                  const sc=parseFloat(tiers[i]||0)
                  const tot=(parseFloat(ec)+sc).toFixed(2)
                  return (
                    <tr key={i} style={{ borderBottom:`1px solid ${ADMIN.borderLight}` }}>
                      <td style={{ padding:'9px 12px' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                          <div style={{ width:8, height:8, borderRadius:2, background:row.dot, flexShrink:0 }}/>
                          <span style={{ fontWeight:500, color:ADMIN.textPrimary }}>{row.label}</span>
                        </div>
                      </td>
                      <td style={{ padding:'9px 12px', color:ADMIN.textRegular }}>{row.range}</td>
                      <td style={{ padding:'9px 12px' }}>
                        <input value={tiers[i]} onChange={e=>setTiers(t=>t.map((v,pi)=>pi===i?e.target.value:v))} style={{ ...inStyle, width:72 }}/>
                      </td>
                      <td style={{ padding:'9px 12px', fontSize:12, color:ADMIN.textSecondary }}>
                        ¥{ec} + ¥{tiers[i]} = <span style={{ fontWeight:600, color:ADMIN.primary }}>¥{tot}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {/* Extra rules */}
          <div style={{ padding:'14px 16px', background:ADMIN.bodyBg, borderRadius:6, marginBottom:4 }}>
            <div style={{ fontSize:13, fontWeight:600, color:ADMIN.textPrimary, marginBottom:12 }}>附加规则</div>
            <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
              {[
                { label:'超时占用费（元/分钟）', val:overTime, set:setOverTime, hint:'断电 30 分钟后开始计费，0 表示不收取' },
                { label:'最低预存余额（元）',     val:minBalance, set:setMinBalance, hint:'低于此余额不可启动充电' },
              ].map((r,i)=>(
                <div key={i} style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <label style={{ fontSize:13, color:ADMIN.textRegular, width:148, flexShrink:0 }}>{r.label}</label>
                  <input value={r.val} onChange={e=>r.set(e.target.value)} style={{ ...inStyle, width:80 }}/>
                  <span style={{ fontSize:12, color:ADMIN.textSecondary }}>{r.hint}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Footer */}
        <div style={{ padding:'14px 24px', borderTop:`1px solid ${ADMIN.borderLight}`, display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
          <ElButton onClick={onDraft}>保存草稿</ElButton>
          <div style={{ display:'flex', gap:10 }}>
            <ElButton onClick={onClose}>取消</ElButton>
            <ElButton type="primary" onClick={()=>setShowConfirm(true)}>发布新版本</ElButton>
          </div>
        </div>
      </div>

      {/* Publish confirm */}
      {showConfirm && (
        <div style={{ position:'fixed', inset:0, zIndex:1100, background:'rgba(0,0,0,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}
          onClick={e=>{ if(e.target===e.currentTarget) setShowConfirm(false) }}>
          <div style={{ background:'#fff', borderRadius:8, width:420, boxShadow:'0 12px 40px rgba(0,21,41,0.18)', animation:'dropIn .15s ease', overflow:'hidden' }}>
            <div style={{ padding:'18px 24px 0', display:'flex', gap:12 }}>
              <div style={{ width:36, height:36, borderRadius:999, flexShrink:0, background:ADMIN.warningBg, border:`1px solid ${ADMIN.warningBorder}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke={ADMIN.warningColor} strokeWidth="1.6" fill="none" strokeLinejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke={ADMIN.warningColor} strokeWidth="1.6" strokeLinecap="round"/><circle cx="12" cy="17" r="1" fill={ADMIN.warningColor}/></svg>
              </div>
              <div>
                <div style={{ fontSize:15, fontWeight:600, color:ADMIN.textPrimary, marginBottom:6 }}>确认发布新版本？</div>
                <div style={{ fontSize:13, color:ADMIN.textRegular, lineHeight:1.7 }}>发布后将生成新版本号。新规则在用户<strong>下一次开启充电</strong>时生效，正在进行中的订单继续按原费率计费。</div>
              </div>
            </div>
            <div style={{ margin:'14px 24px 0', padding:'11px 14px', borderRadius:6, background:ADMIN.bodyBg, border:`1px solid ${ADMIN.borderLight}` }}>
              <label style={{ fontSize:12.5, color:ADMIN.textSecondary, display:'block', marginBottom:5 }}>版本备注（选填）</label>
              <input value={versionNote} onChange={e=>setVersionNote(e.target.value)} placeholder="简述本次改动内容…" style={{ width:'100%', height:30, borderRadius:4, border:`1px solid ${ADMIN.border}`, padding:'0 8px', fontSize:13, outline:'none' }}/>
            </div>
            <div style={{ padding:'14px 24px 18px', display:'flex', justifyContent:'flex-end', gap:10 }}>
              <ElButton onClick={()=>setShowConfirm(false)} disabled={saving}>取消</ElButton>
              <ElButton type="primary" onClick={doPublish} disabled={saving}>{saving?'发布中…':'确认发布'}</ElButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── AssignRuleModal ──────────────────────────────────────────────
function AssignRuleModal({ station, rules, onClose, onAssign }) {
  const [selected, setSelected] = React.useState(station.ruleId)
  const [saving,   setSaving]   = React.useState(false)

  function doAssign() {
    setSaving(true)
    setTimeout(()=>{ setSaving(false); onAssign(station.id, selected) }, 700)
  }

  return (
    <div style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(0,0,0,0.45)', display:'flex', alignItems:'center', justifyContent:'center' }}
      onClick={e=>{ if(e.target===e.currentTarget) onClose() }}>
      <div style={{ background:'#fff', borderRadius:8, width:440, boxShadow:'0 12px 40px rgba(0,21,41,0.18)', animation:'dropIn .18s ease', overflow:'hidden' }}>
        <div style={{ padding:'18px 24px', borderBottom:`1px solid ${ADMIN.borderLight}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontSize:15, fontWeight:600, color:ADMIN.textPrimary }}>更换计费规则</div>
            <div style={{ fontSize:12.5, color:ADMIN.textSecondary, marginTop:2 }}>{station.name}</div>
          </div>
          <div onClick={onClose} style={{ cursor:'pointer', color:ADMIN.textSecondary, display:'flex' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </div>
        </div>
        <div style={{ padding:'16px 24px' }}>
          <div style={{ fontSize:12.5, color:ADMIN.textSecondary, marginBottom:10 }}>选择要挂载的计费规则，站点将始终使用该规则的最新发布版本</div>
          <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:16 }}>
            {rules.filter(r=>r.status==='active').map(rule=>(
              <div key={rule.id}
                onClick={()=>setSelected(rule.id)}
                style={{ padding:'12px 14px', borderRadius:6, border:`1.5px solid ${selected===rule.id ? ADMIN.primary : ADMIN.border}`, background: selected===rule.id ? ADMIN.primaryLight : '#fff', cursor:'pointer', transition:'all .12s' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:3 }}>
                  <span style={{ fontSize:13.5, fontWeight:600, color: selected===rule.id ? ADMIN.primary : ADMIN.textPrimary }}>{rule.name}</span>
                  <span style={{ fontFamily:'monospace', fontSize:12, color:ADMIN.textSecondary, background:ADMIN.bodyBg, padding:'1px 7px', borderRadius:3 }}>当前版本 {rule.currentVer}</span>
                </div>
                <div style={{ fontSize:12, color:ADMIN.textSecondary }}>{rule.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ padding:'10px 12px', borderRadius:6, background:ADMIN.warningBg, border:`1px solid ${ADMIN.warningBorder}`, fontSize:12.5, color:ADMIN.warningDark }}>
            更换后新规则将在该站点用户<strong>下一次开启充电</strong>时生效，进行中订单不受影响。
          </div>
        </div>
        <div style={{ padding:'12px 24px 18px', borderTop:`1px solid ${ADMIN.borderLight}`, display:'flex', justifyContent:'flex-end', gap:10 }}>
          <ElButton onClick={onClose}>取消</ElButton>
          <ElButton type="primary" onClick={doAssign} disabled={saving}>{saving?'保存中…':'确认更换'}</ElButton>
        </div>
      </div>
    </div>
  )
}

// ─── ReassignConfirmModal ───────────────────────────────────────
function ReassignConfirmModal({ devices, targetRuleName, onCancel, onConfirm }) {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:1200, background:'rgba(0,0,0,0.3)',
      display:'flex', alignItems:'center', justifyContent:'center' }}
      onClick={e => { if (e.target === e.currentTarget) onCancel() }}>
      <div style={{ background:'#fff', borderRadius:8, width:420, overflow:'hidden',
        boxShadow:'0 12px 40px rgba(0,21,41,0.18)', animation:'dropIn .15s ease' }}>
        <div style={{ padding:'18px 24px 0', display:'flex', gap:12 }}>
          <div style={{ width:36, height:36, borderRadius:999, flexShrink:0, background:ADMIN.warningBg,
            border:`1px solid ${ADMIN.warningBorder}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                stroke={ADMIN.warningColor} strokeWidth="1.6" fill="none" strokeLinejoin="round"/>
              <line x1="12" y1="9" x2="12" y2="13" stroke={ADMIN.warningColor} strokeWidth="1.6" strokeLinecap="round"/>
              <circle cx="12" cy="17" r="1" fill={ADMIN.warningColor}/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize:15, fontWeight:600, color:ADMIN.textPrimary, marginBottom:6 }}>确认切换规则？</div>
            <div style={{ fontSize:13, color:ADMIN.textRegular, lineHeight:1.7 }}>
              以下设备当前已绑定其他规则，确认后将切换到「{targetRuleName}」：
            </div>
          </div>
        </div>
        <div style={{ margin:'12px 24px 0', padding:'10px 14px', borderRadius:5,
          background:ADMIN.bodyBg, border:`1px solid ${ADMIN.borderLight}` }}>
          {devices.map((d, i) => (
            <div key={i} style={{ fontSize:13, color:ADMIN.textRegular, lineHeight:2 }}>
              · <span style={{ fontFamily:'monospace', fontWeight:500, color:ADMIN.textPrimary }}>{d.id}</span>
              <span style={{ color:ADMIN.textSecondary }}> （当前：{d.currentRule}）</span>
            </div>
          ))}
        </div>
        <div style={{ padding:'14px 24px 18px', display:'flex', justifyContent:'flex-end', gap:10 }}>
          <ElButton onClick={onCancel}>取消</ElButton>
          <ElButton type="primary" onClick={onConfirm}>确认切换</ElButton>
        </div>
      </div>
    </div>
  )
}

// ─── DeviceSelectorModal ──────────────────────────────────────────
function DeviceSelectorModal({ currentRuleId, billingMap, allRules, onClose, onConfirm }) {
  const allDevices = window.DEVICES_DATA || []
  const [selected,       setSelected]       = React.useState(new Set())
  const [idFilter,       setIdFilter]       = React.useState('')
  const [stationFilter,  setStationFilter]  = React.useState('')
  const [showReassign,   setShowReassign]   = React.useState(false)

  const filtered = allDevices.filter(d =>
    d.id.toLowerCase().includes(idFilter.toLowerCase()) &&
    d.station.includes(stationFilter)
  )

  function getRuleStatus(deviceId) {
    const rId = billingMap[deviceId]
    if (rId === currentRuleId) return { type: 'current', label: '已绑定此规则' }
    if (!rId) return { type: 'none', label: '未绑定' }
    const rule = allRules.find(r => r.id === rId)
    return { type: 'other', label: `当前：${rule ? rule.name : rId}` }
  }

  function toggle(deviceId) {
    if (getRuleStatus(deviceId).type === 'current') return
    setSelected(prev => { const n = new Set(prev); n.has(deviceId) ? n.delete(deviceId) : n.add(deviceId); return n })
  }

  const reassignIds = [...selected].filter(id => getRuleStatus(id).type === 'other')
  const currentRuleName = (allRules.find(r => r.id === currentRuleId) || {}).name || ''

  function handlePrimary() {
    if (selected.size === 0) return
    if (reassignIds.length > 0) setShowReassign(true)
    else onConfirm([...selected])
  }

  const statusColors = { '正常':'success', '故障':'danger', '离线':'info' }

  return (
    <div style={{ position:'fixed', inset:0, zIndex:1100, background:'rgba(0,0,0,0.35)',
      display:'flex', alignItems:'center', justifyContent:'center' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background:'#fff', borderRadius:8, width:620, maxHeight:'76vh',
        display:'flex', flexDirection:'column',
        boxShadow:'0 12px 40px rgba(0,21,41,0.18)', animation:'dropIn .18s ease' }}>

        {/* Header */}
        <div style={{ padding:'16px 24px', borderBottom:`1px solid ${ADMIN.borderLight}`, flexShrink:0 }}>
          <div style={{ fontSize:15, fontWeight:600, color:ADMIN.textPrimary }}>添加关联设备</div>
          <div style={{ fontSize:12.5, color:ADMIN.textSecondary, marginTop:3 }}>
            {selected.size > 0
              ? <span>已选 <strong style={{ color:ADMIN.primary }}>{selected.size}</strong> 台
                  {reassignIds.length > 0 && <span style={{ color:ADMIN.warningDark }}>（其中 {reassignIds.length} 台将从其他规则迁移）</span>}
                </span>
              : '勾选要绑定到此规则的设备'}
          </div>
        </div>

        {/* Filter bar */}
        <div style={{ padding:'10px 20px', borderBottom:`1px solid ${ADMIN.borderLight}`,
          display:'flex', gap:10, flexShrink:0 }}>
          <ElInput placeholder="搜索设备编号" value={idFilter}
            onChange={e => setIdFilter(e.target.value)} width={160}/>
          <ElInput placeholder="搜索站点名称" value={stationFilter}
            onChange={e => setStationFilter(e.target.value)} width={160}/>
        </div>

        {/* Device list */}
        <div style={{ flex:1, overflowY:'auto' }}>
          {filtered.map(d => {
            const rs = getRuleStatus(d.id)
            const isCurrent = rs.type === 'current'
            const isSelected = selected.has(d.id)
            return (
              <div key={d.id} onClick={() => toggle(d.id)}
                style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 20px',
                  borderBottom:`1px solid ${ADMIN.borderLight}`,
                  opacity: isCurrent ? 0.45 : 1,
                  cursor: isCurrent ? 'default' : 'pointer',
                  background: isSelected ? ADMIN.primaryLight : '#fff',
                  transition:'background .1s' }}
                onMouseEnter={e => { if (!isCurrent && !isSelected) e.currentTarget.style.background='#f9fafc' }}
                onMouseLeave={e => { if (!isCurrent && !isSelected) e.currentTarget.style.background='#fff' }}>
                <input type="checkbox" checked={isCurrent || isSelected} disabled={isCurrent}
                  onChange={() => {}} style={{ cursor: isCurrent ? 'default' : 'pointer', flexShrink:0 }}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:'monospace', fontSize:13, fontWeight:500,
                    color: isCurrent ? ADMIN.textSecondary : ADMIN.textPrimary }}>{d.id}</div>
                  <div style={{ fontSize:11.5, color:ADMIN.textSecondary, marginTop:1 }}>{d.station}</div>
                </div>
                <ElTag type={statusColors[d.status] || 'info'}>{d.status}</ElTag>
                {isCurrent ? (
                  <span style={{ fontSize:12, color:ADMIN.textSecondary, minWidth:148, textAlign:'right' }}>已绑定此规则</span>
                ) : rs.type === 'other' ? (
                  <span style={{ fontSize:12, padding:'2px 8px', borderRadius:3, minWidth:148, textAlign:'right',
                    color:ADMIN.warningDark, background:ADMIN.warningBg, border:`1px solid ${ADMIN.warningBorder}` }}>
                    {rs.label}
                  </span>
                ) : (
                  <span style={{ fontSize:12, color:ADMIN.textSecondary, minWidth:148, textAlign:'right' }}>未绑定</span>
                )}
              </div>
            )
          })}
          {filtered.length === 0 && (
            <div style={{ padding:48, textAlign:'center', color:ADMIN.textSecondary }}>无匹配设备</div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding:'12px 24px', borderTop:`1px solid ${ADMIN.borderLight}`,
          display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
          <span style={{ fontSize:13, color:ADMIN.textSecondary }}>共 {allDevices.length} 台设备</span>
          <div style={{ display:'flex', gap:8 }}>
            <ElButton onClick={onClose}>取消</ElButton>
            <ElButton type="primary" disabled={selected.size === 0} onClick={handlePrimary}>
              添加{selected.size > 0 ? ` ${selected.size} 台` : ''}设备
            </ElButton>
          </div>
        </div>
      </div>

      {showReassign && (
        <ReassignConfirmModal
          devices={reassignIds.map(id => ({
            id,
            currentRule: (allRules.find(r => r.id === billingMap[id]) || {}).name || billingMap[id]
          }))}
          targetRuleName={currentRuleName}
          onCancel={() => setShowReassign(false)}
          onConfirm={() => { setShowReassign(false); onConfirm([...selected]) }}
        />
      )}
    </div>
  )
}

// ─── RuleDevicesModal ─────────────────────────────────────────────
function RuleDevicesModal({ rule, onClose }) {
  const allRules   = window.PRICING_RULES_DATA || []
  const allDevices = window.DEVICES_DATA || []

  const [billingMap,  setBillingMap]  = React.useState(() => window.getDeviceBillingMap ? window.getDeviceBillingMap() : {})
  const [idFilter,    setIdFilter]    = React.useState('')
  const [stFilter,    setStFilter]    = React.useState('')
  const [showAdd,     setShowAdd]     = React.useState(false)
  const [removeTgt,   setRemoveTgt]   = React.useState(null)
  const [toast,       setToast]       = React.useState(null)

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
    const m = { ...billingMap, [deviceId]: null }
    window.saveDeviceBillingMap(m); setBillingMap(m); setRemoveTgt(null)
    flash('已移除设备')
  }

  function doAdd(ids) {
    const m = { ...billingMap }; ids.forEach(id => { m[id] = rule.id })
    window.saveDeviceBillingMap(m); setBillingMap(m); setShowAdd(false)
    flash(`已添加 ${ids.length} 台设备`)
  }

  function flash(msg) { setToast(msg); setTimeout(() => setToast(null), 2500) }

  const statusColors = { '正常':'success', '故障':'danger', '离线':'info' }

  return (
    <div style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(0,0,0,0.45)',
      display:'flex', alignItems:'center', justifyContent:'center' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background:'#fff', borderRadius:8, width:740, maxHeight:'82vh',
        display:'flex', flexDirection:'column',
        boxShadow:'0 12px 40px rgba(0,21,41,0.18)', animation:'dropIn .18s ease' }}>

        {/* Header */}
        <div style={{ padding:'18px 24px', borderBottom:`1px solid ${ADMIN.borderLight}`,
          display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
          <div>
            <div style={{ fontSize:15, fontWeight:600, color:ADMIN.textPrimary }}>关联设备 · {rule.name}</div>
            <div style={{ fontSize:12.5, color:ADMIN.textSecondary, marginTop:3 }}>
              当前版本&nbsp;
              <span style={{ color:ADMIN.primary, fontFamily:'monospace' }}>{rule.currentVer}</span>
              &nbsp;·&nbsp;共&nbsp;
              <span style={{ color:ADMIN.textPrimary, fontWeight:600 }}>{boundDevices.length}</span>
              &nbsp;台设备使用此规则
            </div>
          </div>
          <div onClick={onClose} style={{ cursor:'pointer', color:ADMIN.textSecondary, display:'flex' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{ padding:'11px 24px', borderBottom:`1px solid ${ADMIN.borderLight}`,
          display:'flex', gap:10, alignItems:'center', flexShrink:0 }}>
          <ElInput placeholder="搜索设备编号" value={idFilter}
            onChange={e => setIdFilter(e.target.value)} width={160}/>
          <ElInput placeholder="搜索站点名称" value={stFilter}
            onChange={e => setStFilter(e.target.value)} width={160}/>
          <div style={{ flex:1 }}/>
          <ElButton type="primary" onClick={() => setShowAdd(true)}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M5.5 1v9M1 5.5h9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            添加设备
          </ElButton>
        </div>

        {/* Table */}
        <div style={{ flex:1, overflowY:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
            <thead>
              <tr style={{ background:'#f5f7fa' }}>
                {['设备编号','所属站点','设备状态','设备类型','操作'].map((h,i) => (
                  <th key={i} style={{ padding:'10px 16px', textAlign:'left', fontWeight:600,
                    color:ADMIN.textPrimary, borderBottom:`1px solid ${ADMIN.border}`, whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={5} style={{ padding:48, textAlign:'center', color:ADMIN.textSecondary }}>
                  {boundDevices.length === 0 ? '暂无关联设备，点击右上角「添加设备」开始绑定' : '无匹配结果'}
                </td></tr>
              )}
              {filtered.map(d => (
                <tr key={d.id} style={{ borderBottom:`1px solid ${ADMIN.borderLight}`, background:'#fff' }}
                  onMouseEnter={e => e.currentTarget.style.background=ADMIN.primaryLight}
                  onMouseLeave={e => e.currentTarget.style.background='#fff'}>
                  <td style={{ padding:'10px 16px' }}>
                    <span style={{ fontFamily:'monospace', fontSize:13, fontWeight:500, color:ADMIN.primary }}>{d.id}</span>
                  </td>
                  <td style={{ padding:'10px 16px', color:ADMIN.textRegular }}>{d.station}</td>
                  <td style={{ padding:'10px 16px' }}><ElTag type={statusColors[d.status] || 'info'}>{d.status}</ElTag></td>
                  <td style={{ padding:'10px 16px', color:ADMIN.textSecondary, fontSize:12.5 }}>{d.type}</td>
                  <td style={{ padding:'10px 16px' }}>
                    <ElButton type="danger" size="small" onClick={() => setRemoveTgt(d)}>移除</ElButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{ padding:'12px 24px', borderTop:`1px solid ${ADMIN.borderLight}`,
          display:'flex', justifyContent:'flex-end', flexShrink:0 }}>
          <ElButton onClick={onClose}>关闭</ElButton>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position:'fixed', top:20, left:'50%', transform:'translateX(-50%)', zIndex:2200,
          background:ADMIN.successBg, border:`1px solid ${ADMIN.successBorder}`,
          color:ADMIN.successDark, padding:'9px 18px', borderRadius:6, fontSize:13.5, fontWeight:500,
          boxShadow:'0 4px 16px rgba(0,0,0,0.1)', display:'flex', alignItems:'center', gap:7 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          {toast}
        </div>
      )}

      {/* DeviceSelectorModal */}
      {showAdd && (
        <DeviceSelectorModal
          currentRuleId={rule.id}
          billingMap={billingMap}
          allRules={allRules}
          onClose={() => setShowAdd(false)}
          onConfirm={doAdd}
        />
      )}

      {/* Remove confirm */}
      {removeTgt && (
        <div style={{ position:'fixed', inset:0, zIndex:1100, background:'rgba(0,0,0,0.3)',
          display:'flex', alignItems:'center', justifyContent:'center' }}
          onClick={e => { if (e.target === e.currentTarget) setRemoveTgt(null) }}>
          <div style={{ background:'#fff', borderRadius:8, width:400, overflow:'hidden',
            boxShadow:'0 12px 40px rgba(0,21,41,0.18)', animation:'dropIn .15s ease' }}>
            <div style={{ padding:'18px 24px 0', display:'flex', gap:12 }}>
              <div style={{ width:36, height:36, borderRadius:999, flexShrink:0, background:ADMIN.dangerBg,
                border:`1px solid ${ADMIN.dangerBorder}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <polyline points="3 6 5 6 21 6" stroke={ADMIN.dangerColor} strokeWidth="1.6" strokeLinecap="round"/>
                  <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke={ADMIN.dangerColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 11v6M14 11v6" stroke={ADMIN.dangerColor} strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize:15, fontWeight:600, color:ADMIN.textPrimary, marginBottom:6 }}>确认移除设备？</div>
                <div style={{ fontSize:13, color:ADMIN.textRegular, lineHeight:1.7 }}>
                  将设备 <span style={{ fontFamily:'monospace', fontWeight:600 }}>{removeTgt.id}</span> 从「{rule.name}」规则中移除，移除后该设备不使用任何计费规则，直到重新分配。
                </div>
              </div>
            </div>
            <div style={{ padding:'14px 24px 18px', display:'flex', justifyContent:'flex-end', gap:10 }}>
              <ElButton onClick={() => setRemoveTgt(null)}>取消</ElButton>
              <ElButton type="danger" onClick={() => doRemove(removeTgt.id)}>确认移除</ElButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── PricingScreen ────────────────────────────────────────────────
function PricingScreen() {
  const [rules,        setRules]        = React.useState(PRICING_RULES_DATA)
  const [expandedRule, setExpandedRule] = React.useState(null)
  const [editRule,     setEditRule]     = React.useState(null)  // null | 'new' | rule obj
  const [toast,        setToast]        = React.useState(null)
  const [deviceRuleModal, setDeviceRuleModal] = React.useState(null)
  const [billingMap,    setBillingMap]    = React.useState(() =>
    window.getDeviceBillingMap ? window.getDeviceBillingMap() : {}
  )

  React.useEffect(() => {
    function onChg() { if (window.getDeviceBillingMap) setBillingMap(window.getDeviceBillingMap()) }
    window.addEventListener('deviceBillingChanged', onChg)
    return () => window.removeEventListener('deviceBillingChanged', onChg)
  }, [])

  function getDeviceCount(ruleId) {
    return (window.DEVICES_DATA || []).filter(d => billingMap[d.id] === ruleId).length
  }

  function showToast(msg, type='success') {
    setToast({ msg, type })
    setTimeout(()=>setToast(null), 2800)
  }

  function handlePublish({ name, desc, elec, tiers, overTime, minBalance, note }) {
    const today = new Date().toISOString().slice(0,10)
    setRules(prev => prev.map(r => {
      if (editRule === 'new' || r.id !== editRule.id) return r
      const nextMinor = r.versions.length + 1
      const base = r.currentVer.split('.')[0]
      const newVer = `${base}.${nextMinor}`
      const newVerObj = { ver: newVer, date: today, by: '张运营', note: note || '更新规则', elec, tiers, overTime, minBalance }
      return { ...r, name, desc, currentVer: newVer, updatedAt: today, versions: [newVerObj, ...r.versions] }
    }))
    setEditRule(null)
    showToast('新版本已发布')
  }

  function handleDraft() {
    setEditRule(null)
    showToast('已保存为草稿', 'info')
  }

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div style={{ position:'fixed', top:20, left:'50%', transform:'translateX(-50%)', zIndex:2000,
          background: toast.type==='success' ? ADMIN.successBg : ADMIN.primaryLight,
          border: `1px solid ${toast.type==='success' ? ADMIN.successBorder : '#c5d3ff'}`,
          color: toast.type==='success' ? ADMIN.successDark : ADMIN.primary,
          padding:'9px 18px', borderRadius:6, fontSize:13.5, fontWeight:500,
          boxShadow:'0 4px 16px rgba(0,0,0,0.1)', animation:'dropIn .2s ease',
          display:'flex', alignItems:'center', gap:7 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          {toast.msg}
        </div>
      )}

      <PageHeader>
        <ElButton type="primary" onClick={()=>setEditRule('new')}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          新建规则
        </ElButton>
      </PageHeader>

      <ElCard padding={0}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
            <thead>
              <tr style={{ background:'#f5f7fa' }}>
                {['规则名称','当前版本','状态','关联设备','最近更新','操作'].map((h,i)=>{
                  <th key={i} style={{ padding:'10px 16px', textAlign: i>=3?'center':'left', fontWeight:600, color:ADMIN.textPrimary, borderBottom:`1px solid ${ADMIN.border}`, whiteSpace:'nowrap' }}>{h}</th>
                })}
              </tr>
            </thead>
            <tbody>
              {rules.map(rule => (
                <React.Fragment key={rule.id}>
                  <tr style={{ borderBottom:`1px solid ${ADMIN.borderLight}`, background:'#fff' }}
                    onMouseEnter={e=>e.currentTarget.style.background='#f9fafc'}
                    onMouseLeave={e=>e.currentTarget.style.background='#fff'}>
                    <td style={{ padding:'12px 16px' }}>
                      <div style={{ fontWeight:600, color:ADMIN.textPrimary }}>{rule.name}</div>
                      <div style={{ fontSize:12, color:ADMIN.textSecondary, marginTop:2 }}>{rule.desc}</div>
                    </td>
                    <td style={{ padding:'12px 16px' }}>
                      <span style={{ fontFamily:'monospace', fontSize:12.5, color:ADMIN.primary, background:ADMIN.primaryLight, padding:'2px 8px', borderRadius:4 }}>{rule.currentVer}</span>
                    </td>
                    <td style={{ padding:'12px 16px' }}>
                      <ElTag type={rule.status==='active'?'success':'warning'}>{rule.status==='active'?'已发布':'草稿'}</ElTag>
                    </td>
                    <td style={{ padding:'12px 16px', textAlign:'center' }}>
                      <span style={{ fontWeight:600, color:ADMIN.textPrimary }}>{getDeviceCount(rule.id)}</span>
                      <span style={{ fontSize:12, color:ADMIN.textSecondary }}> 台</span>
                    </td>
                    <td style={{ padding:'12px 16px', textAlign:'center', color:ADMIN.textSecondary }}>{rule.updatedAt}</td>
                    <td style={{ padding:'12px 16px', textAlign:'center' }}>
                      <div style={{ display:'flex', gap:6, justifyContent:'center' }}>
                        <ElButton size="small" onClick={()=>setEditRule(rule)}>编辑</ElButton>
                        <ElButton size="small" type="text" onClick={()=>setDeviceRuleModal(rule)}>关联设备</ElButton>
                        <ElButton size="small" type="text"
                          onClick={()=>setExpandedRule(expandedRule===rule.id ? null : rule.id)}>
                          {expandedRule===rule.id ? '收起' : '版本历史'}
                        </ElButton>
                      </div>
                    </td>
                  </tr>
                  {/* Version history expansion */}
                  {expandedRule===rule.id && (
                    <tr>
                      <td colSpan={6} style={{ padding:'0 0 0 32px', background:'#f9fafc', borderBottom:`1px solid ${ADMIN.borderLight}` }}>
                        <div style={{ padding:'12px 16px 12px 0' }}>
                          <div style={{ fontSize:12.5, fontWeight:600, color:ADMIN.textSecondary, marginBottom:8 }}>版本历史</div>
                          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12.5 }}>
                            <thead>
                              <tr>
                                {['版本号','发布时间','操作人','备注'].map((h,i)=>(
                                  <th key={i} style={{ padding:'6px 12px', textAlign:'left', color:ADMIN.textSecondary, fontWeight:500, borderBottom:`1px solid ${ADMIN.borderLight}` }}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {rule.versions.map((v,vi)=>(
                                <tr key={vi} style={{ borderBottom:`1px solid ${ADMIN.borderLight}` }}>
                                  <td style={{ padding:'7px 12px' }}>
                                    <span style={{ fontFamily:'monospace', color: vi===0 ? ADMIN.primary : ADMIN.textRegular, fontWeight: vi===0 ? 600 : 400 }}>{v.ver}</span>
                                    {vi===0 && <span style={{ marginLeft:6, fontSize:11, color:ADMIN.successDark, background:ADMIN.successBg, border:`1px solid ${ADMIN.successBorder}`, padding:'1px 6px', borderRadius:3 }}>当前</span>}
                                  </td>
                                  <td style={{ padding:'7px 12px', color:ADMIN.textSecondary }}>{v.date}</td>
                                  <td style={{ padding:'7px 12px', color:ADMIN.textSecondary }}>{v.by}</td>
                                  <td style={{ padding:'7px 12px', color:ADMIN.textRegular }}>{v.note}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </ElCard>

      {/* Modals */}
      {editRule && (
        <RuleEditModal
          rule={editRule==='new' ? null : editRule}
          onClose={()=>setEditRule(null)}
          onPublish={handlePublish}
          onDraft={handleDraft}
        />
      )}
      {deviceRuleModal && (
        <RuleDevicesModal
          rule={deviceRuleModal}
          onClose={() => setDeviceRuleModal(null)}
        />
      )}
    </div>
  )
}

// ─── UsersScreen ──────────────────────────────────────────────────
function UsersScreen() {
  const [nameFilter,   setNameFilter]   = React.useState('')
  const [phoneFilter,  setPhoneFilter]  = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState('all')
  const [page, setPage]                 = React.useState(1)

  const filtered = USERS_DATA.filter(u =>
    (statusFilter === 'all' || u.status === statusFilter) &&
    u.name.includes(nameFilter) &&
    u.phone.includes(phoneFilter)
  )

  function doReset() { setNameFilter(''); setPhoneFilter(''); setStatusFilter('all'); setPage(1) }

  return (
    <div>
      <PageHeader>
        <ElButton type="default">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke={ADMIN.textRegular} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          导出
        </ElButton>
      </PageHeader>
      <ElCard padding={0}>
        <div style={{ padding: '14px 20px', borderBottom: `1px solid ${ADMIN.borderLight}` }}>
          <FilterBar>
            <ElInput placeholder="用户昵称" value={nameFilter}
              onChange={e => { setNameFilter(e.target.value); setPage(1) }}
              width={140}/>
            <ElInput placeholder="手机号" value={phoneFilter}
              onChange={e => { setPhoneFilter(e.target.value); setPage(1) }}
              width={150}/>
            <ElSelect value={statusFilter} onChange={v => { setStatusFilter(v); setPage(1) }} options={[
              { value: 'all', label: '全部状态' },
              { value: '正常', label: '正常' },
              { value: '禁用', label: '禁用' },
            ]} width={120}/>
            <ElButton onClick={doReset}>重置</ElButton>
          </FilterBar>
        </div>
        <DataTable
          data={filtered}
          columns={[
            { key: 'id',         title: '用户ID',   render: v => <span style={{ fontSize: 12, color: ADMIN.textSecondary, fontFamily: 'monospace' }}>{v}</span> },
            { key: 'name',       title: '昵称',     render: v => <span style={{ color: ADMIN.textPrimary, fontWeight: 500 }}>{v}</span> },
            { key: 'phone',      title: '手机号' },
            { key: 'regDate',    title: '注册日期' },
            { key: 'totalSpend', title: '累计消费', render: v => <span style={{ color: ADMIN.primary, fontWeight: 600 }}>{v}</span> },
            { key: 'balance',    title: '账户余额' },
            { key: 'status',     title: '状态',     render: v => <ElTag type={v === '正常' ? 'success' : 'danger'}>{v}</ElTag> },
            { key: 'id',         title: '操作',     render: () => (
              <div style={{ display: 'flex', gap: 2 }}>
                <ElButton type="text" size="small">详情</ElButton>
                <ElButton type="text" size="small">调整余额</ElButton>
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

// ─── CouponsScreen ────────────────────────────────────────────────
function CouponsScreen() {
  const [tab, setTab]   = React.useState('coupons')
  const [page, setPage] = React.useState(1)

  const statusTag = v => {
    const t = { '进行中': 'success', '即将到期': 'warning', '已结束': 'info' }
    return <ElTag type={t[v] || 'info'}>{v}</ElTag>
  }

  return (
    <div>
      <PageHeader>
        <ElButton type="primary">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1v9M1 5.5h9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
          {tab === 'coupons' ? '新建优惠券' : '新建活动'}
        </ElButton>
      </PageHeader>

      {/* tabs */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${ADMIN.border}`, marginBottom: 16 }}>
        {[{ key: 'coupons', label: '优惠券' }, { key: 'activities', label: '营销活动' }].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            padding: '10px 20px', border: 'none', background: 'transparent', cursor: 'pointer',
            fontSize: 14, color: tab === t.key ? ADMIN.primary : ADMIN.textRegular,
            fontWeight: tab === t.key ? 600 : 400,
            borderBottom: `2px solid ${tab === t.key ? ADMIN.primary : 'transparent'}`,
            marginBottom: -1,
          }}>{t.label}</button>
        ))}
      </div>

      {tab === 'coupons' ? (
        <ElCard padding={0}>
          <DataTable
            data={COUPONS_DATA}
            columns={[
              { key: 'id',      title: '券ID',     render: v => <span style={{ fontSize: 12, color: ADMIN.textSecondary, fontFamily: 'monospace' }}>{v}</span> },
              { key: 'name',    title: '优惠券名称', render: v => <span style={{ color: ADMIN.textPrimary, fontWeight: 500 }}>{v}</span> },
              { key: 'type',    title: '类型',      render: v => <ElTag type="primary">{v}</ElTag> },
              { key: 'value',   title: '优惠内容' },
              { key: 'issued',  title: '总量',      align: 'center' },
              { key: 'claimed', title: '已领取',    align: 'center', render: (v, row) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ flex: 1, height: 4, background: ADMIN.borderLight, borderRadius: 999, minWidth: 60 }}>
                    <div style={{ width: `${Math.round(v / row.issued * 100)}%`, height: '100%', background: ADMIN.primary, borderRadius: 999 }}/>
                  </div>
                  <span style={{ fontSize: 12, color: ADMIN.textSecondary, minWidth: 24 }}>{v}</span>
                </div>
              )},
              { key: 'valid',   title: '有效期至' },
              { key: 'status',  title: '状态', render: v => statusTag(v) },
              { key: 'id',      title: '操作', render: () => (
                <div style={{ display: 'flex', gap: 2 }}>
                  <ElButton type="text" size="small">编辑</ElButton>
                  <ElButton type="danger" size="small">停用</ElButton>
                </div>
              )},
            ]}
          />
          <div style={{ padding: '0 20px 16px' }}>
            <Pagination total={COUPONS_DATA.length} page={page} pageSize={10} onPageChange={setPage}/>
          </div>
        </ElCard>
      ) : (
        <ElCard padding={0}>
          <DataTable
            data={ACTIVITIES_DATA}
            columns={[
              { key: 'id',           title: '活动ID' },
              { key: 'name',         title: '活动名称',  render: v => <span style={{ color: ADMIN.textPrimary, fontWeight: 500 }}>{v}</span> },
              { key: 'type',         title: '活动类型',  render: v => <ElTag type="primary">{v}</ElTag> },
              { key: 'range',        title: '活动时间' },
              { key: 'participants', title: '参与人数', align: 'center' },
              { key: 'status',       title: '状态', render: v => statusTag(v) },
              { key: 'id',           title: '操作', render: () => (
                <div style={{ display: 'flex', gap: 2 }}>
                  <ElButton type="text" size="small">编辑</ElButton>
                  <ElButton type="text" size="small">数据</ElButton>
                </div>
              )},
            ]}
          />
        </ElCard>
      )}
    </div>
  )
}

Object.assign(window, {
  PricingScreen, UsersScreen, CouponsScreen, AssignRuleModal,
  PRICING_RULES_DATA, STATION_BILLING_DATA,
  RuleDevicesModal, DeviceSelectorModal, ReassignConfirmModal,
})
