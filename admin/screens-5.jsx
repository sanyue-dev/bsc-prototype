// admin/screens-5.jsx — 角色管理 / 权限管理
/* global antd, icons, ADMIN */

// ─── Permission definitions ───────────────────────────────────────
const PERMISSION_MODULES = [
  { id:'dashboard', label:'运营看板',   perms:[
    { key:'dashboard:view',    label:'查看看板'   },
  ]},
  { id:'reports',   label:'报表中心',   perms:[
    { key:'reports:view',      label:'查看报表'   },
    { key:'reports:export',    label:'导出报表'   },
  ]},
  { id:'orders',    label:'充电订单',   perms:[
    { key:'orders:view',       label:'查看列表'   },
    { key:'orders:detail',     label:'订单详情'   },
    { key:'orders:export',     label:'导出数据'   },
  ]},
  { id:'sessions',  label:'充电会话',   perms:[
    { key:'sessions:view',     label:'查看会话'   },
  ]},
  { id:'stations',  label:'站点管理',   perms:[
    { key:'stations:view',     label:'查看站点'   },
    { key:'stations:create',   label:'新增站点'   },
    { key:'stations:edit',     label:'编辑站点'   },
    { key:'stations:delete',   label:'删除站点'   },
  ]},
  { id:'devices',   label:'设备管理',   perms:[
    { key:'devices:view',      label:'查看设备'   },
    { key:'devices:create',    label:'添加设备'   },
    { key:'devices:edit',      label:'编辑设备'   },
    { key:'devices:maintain',  label:'维护操作'   },
    { key:'devices:repair',    label:'发起报修'   },
  ]},
  { id:'tickets',   label:'故障工单',   perms:[
    { key:'tickets:view',      label:'查看工单'   },
    { key:'tickets:create',    label:'新建工单'   },
    { key:'tickets:assign',    label:'派工处理'   },
  ]},
  { id:'pricing',   label:'计费配置',   perms:[
    { key:'pricing:view',      label:'查看规则'   },
    { key:'pricing:edit',      label:'编辑规则'   },
    { key:'pricing:publish',   label:'发布版本'   },
  ]},
  { id:'users',     label:'用户管理',   perms:[
    { key:'users:view',        label:'查看用户'   },
    { key:'users:detail',      label:'用户详情'   },
    { key:'users:balance',     label:'调整余额'   },
    { key:'users:status',      label:'禁用/启用'  },
  ]},
  { id:'coupons',   label:'优惠券管理', perms:[
    { key:'coupons:view',      label:'查看列表'   },
    { key:'coupons:create',    label:'新建优惠券' },
    { key:'coupons:edit',      label:'编辑优惠券' },
    { key:'coupons:disable',   label:'停用优惠券' },
  ]},
  { id:'system',    label:'系统管理',   perms:[
    { key:'roles:view',        label:'查看角色'   },
    { key:'roles:create',      label:'新建角色'   },
    { key:'roles:edit',        label:'编辑角色'   },
    { key:'roles:delete',      label:'删除角色'   },
    { key:'perms:view',        label:'查看权限'   },
  ]},
]

const ALL_PERMS = PERMISSION_MODULES.flatMap(m => m.perms.map(p => p.key))

// ─── Role mock data ───────────────────────────────────────────────
const ROLES_INIT = [
  { id:'role_super',   name:'超级管理员', desc:'拥有全部权限，系统内置角色', builtin:true,  userCount:2, status:'启用',
    perms:[...ALL_PERMS] },
  { id:'role_ops',     name:'运营专员',   desc:'负责日常充电业务运营',       builtin:false, userCount:5, status:'启用',
    perms:['dashboard:view','reports:view','orders:view','orders:detail','orders:export','sessions:view','coupons:view','coupons:create','coupons:edit'] },
  { id:'role_maint',   name:'运维工程师', desc:'站点及设备运维与工单处理',   builtin:false, userCount:8, status:'启用',
    perms:['dashboard:view','stations:view','devices:view','devices:maintain','devices:repair','tickets:view','tickets:create','tickets:assign'] },
  { id:'role_finance', name:'财务专员',   desc:'收入报表与计费规则管理',     builtin:false, userCount:2, status:'启用',
    perms:['dashboard:view','reports:view','reports:export','pricing:view','pricing:edit','pricing:publish'] },
  { id:'role_cs',      name:'客服专员',   desc:'用户投诉与订单异常处理',     builtin:false, userCount:3, status:'启用',
    perms:['orders:view','orders:detail','users:view','users:detail','users:balance','tickets:view'] },
  { id:'role_viewer',  name:'数据观察员', desc:'只读权限，仅供数据查阅',     builtin:false, userCount:1, status:'禁用',
    perms:['dashboard:view','reports:view','orders:view','sessions:view','stations:view','devices:view','tickets:view','users:view','coupons:view'] },
]

// ─── PermissionSelector ───────────────────────────────────────────
function PermissionSelector({ value, onChange }) {
  const permsSet = new Set(value)

  const allChecked     = ALL_PERMS.every(k => permsSet.has(k))
  const someChecked    = ALL_PERMS.some(k => permsSet.has(k))
  const allIndeterminate = someChecked && !allChecked

  function toggleAll(checked) {
    onChange(checked ? [...ALL_PERMS] : [])
  }

  function toggleModule(module, checked) {
    const newSet = new Set(permsSet)
    module.perms.forEach(p => checked ? newSet.add(p.key) : newSet.delete(p.key))
    onChange([...newSet])
  }

  function togglePerm(key, checked) {
    const newSet = new Set(permsSet)
    if (checked) newSet.add(key); else newSet.delete(key)
    onChange([...newSet])
  }

  const cols = [
    {
      title: (
        <antd.Checkbox
          checked={allChecked}
          indeterminate={allIndeterminate}
          onChange={e => toggleAll(e.target.checked)}
        >
          <span style={{ fontSize:13, fontWeight:600, color:ADMIN.textPrimary }}>功能模块</span>
        </antd.Checkbox>
      ),
      dataIndex: 'id',
      width: 148,
      onCell: () => ({ style: { background:ADMIN.bodyBg, verticalAlign:'middle' } }),
      render: (_, module) => {
        const keys  = module.perms.map(p => p.key)
        const mAll  = keys.every(k => permsSet.has(k))
        const mSome = keys.some(k => permsSet.has(k))
        return (
          <antd.Checkbox
            checked={mAll}
            indeterminate={mSome && !mAll}
            onChange={e => toggleModule(module, e.target.checked)}
          >
            <span style={{ fontSize:13, fontWeight:500, color:ADMIN.textPrimary }}>{module.label}</span>
          </antd.Checkbox>
        )
      },
    },
    {
      title: (
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ fontSize:13, fontWeight:600, color:ADMIN.textPrimary }}>操作权限</span>
          <span style={{ fontSize:12, fontWeight:400, color:ADMIN.textSecondary }}>
            已选 {value.length} / {ALL_PERMS.length}
          </span>
        </div>
      ),
      render: (_, module) => (
        <div style={{ display:'flex', flexWrap:'wrap', gap:'6px 24px', padding:'4px 0' }}>
          {module.perms.map(perm => (
            <antd.Checkbox
              key={perm.key}
              checked={permsSet.has(perm.key)}
              onChange={e => togglePerm(perm.key, e.target.checked)}
            >
              <span style={{ fontSize:12.5 }}>{perm.label}</span>
            </antd.Checkbox>
          ))}
        </div>
      ),
    },
  ]

  return (
    <antd.Table
      dataSource={PERMISSION_MODULES}
      rowKey="id"
      columns={cols}
      pagination={false}
      size="small"
      bordered
      scroll={{ y:380 }}
    />
  )
}

// ─── RoleEditModal ────────────────────────────────────────────────
function RoleEditModal({ role, onClose, onSave }) {
  const isNew = !role
  const [form]   = antd.Form.useForm()
  const [perms,  setPerms]  = React.useState(() => role ? [...role.perms] : [])
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    if (role) form.setFieldsValue({ name: role.name, desc: role.desc })
  }, [])

  function doSave() {
    form.validateFields().then(values => {
      setSaving(true)
      setTimeout(() => { setSaving(false); onSave({ ...values, perms }) }, 700)
    }).catch(() => {})
  }

  return (
    <antd.Modal
      open={true}
      title={isNew ? '新建角色' : `编辑角色 · ${role.name}`}
      width={780}
      onCancel={onClose}
      destroyOnClose
      footer={
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontSize:12, color:ADMIN.textSecondary }}>
            {role?.builtin ? '内置角色，仅可调整权限分配' : ''}
          </span>
          <antd.Space>
            <antd.Button onClick={onClose}>取消</antd.Button>
            <antd.Button type="primary" loading={saving} onClick={doSave}>保存</antd.Button>
          </antd.Space>
        </div>
      }
    >
      <antd.Form form={form} layout="vertical" size="small" style={{ marginBottom:18 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 16px' }}>
          <antd.Form.Item name="name" label="角色名称" rules={[{ required:true, message:'请输入角色名称' }]}>
            <antd.Input placeholder="如：运营专员" disabled={!!role?.builtin}/>
          </antd.Form.Item>
          <antd.Form.Item name="desc" label="角色说明">
            <antd.Input placeholder="简述该角色职责" disabled={!!role?.builtin}/>
          </antd.Form.Item>
        </div>
      </antd.Form>

      <div style={{ fontSize:13, fontWeight:600, color:ADMIN.textPrimary, marginBottom:10 }}>
        分配权限
      </div>
      <PermissionSelector value={perms} onChange={setPerms}/>
    </antd.Modal>
  )
}

// ─── RolesScreen ──────────────────────────────────────────────────
function RolesScreen() {
  const [roles,    setRoles]    = React.useState(ROLES_INIT)
  const [editRole, setEditRole] = React.useState(null)  // null | 'new' | role object
  const [delRole,  setDelRole]  = React.useState(null)

  function handleSave(values) {
    if (editRole === 'new') {
      setRoles(prev => [...prev, {
        id: 'role_' + Date.now(), ...values,
        builtin: false, userCount: 0, status: '启用',
      }])
      antd.message.success('角色创建成功')
    } else {
      setRoles(prev => prev.map(r => r.id === editRole.id ? { ...r, ...values } : r))
      antd.message.success('角色已更新')
    }
    setEditRole(null)
  }

  function handleDelete() {
    setRoles(prev => prev.filter(r => r.id !== delRole.id))
    setDelRole(null)
    antd.message.success('角色已删除')
  }

  function toggleStatus(role) {
    const next = role.status === '启用' ? '禁用' : '启用'
    setRoles(prev => prev.map(r => r.id === role.id ? { ...r, status: next } : r))
    antd.message.success(`角色已${next}`)
  }

  const cols = [
    {
      title: '角色名称',
      render: (_, row) => (
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{
            width:34, height:34, borderRadius:7, flexShrink:0,
            background: row.builtin ? ADMIN.primaryLight : ADMIN.bodyBg,
            border:     `1px solid ${row.builtin ? ADMIN.primary : ADMIN.border}`,
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <icons.TeamOutlined style={{ fontSize:15, color: row.builtin ? ADMIN.primary : ADMIN.textSecondary }}/>
          </div>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <span style={{ fontWeight:600, fontSize:13.5, color:ADMIN.textPrimary }}>{row.name}</span>
              {row.builtin && <antd.Tag color="blue" style={{ margin:0, fontSize:11 }}>内置</antd.Tag>}
            </div>
            <div style={{ fontSize:12, color:ADMIN.textSecondary, marginTop:1 }}>{row.desc}</div>
          </div>
        </div>
      ),
    },
    {
      title: '权限数量',
      align: 'center',
      width: 110,
      render: (_, row) => (
        <span style={{ fontVariantNumeric:'tabular-nums' }}>
          <span style={{ color:ADMIN.primary, fontWeight:600 }}>{row.perms.length}</span>
          <span style={{ color:ADMIN.textSecondary, fontSize:12 }}> / {ALL_PERMS.length}</span>
        </span>
      ),
    },
    {
      title: '关联用户',
      align: 'center',
      width: 90,
      render: (_, row) => (
        <span style={{ fontVariantNumeric:'tabular-nums' }}>{row.userCount} 人</span>
      ),
    },
    {
      title: '状态',
      align: 'center',
      width: 80,
      render: (_, row) => (
        <antd.Tag color={row.status === '启用' ? 'success' : 'default'}>{row.status}</antd.Tag>
      ),
    },
    {
      title: '操作',
      render: (_, row) => (
        <antd.Space size="small">
          <antd.Button type="link" size="small" onClick={() => setEditRole(row)}>编辑权限</antd.Button>
          {!row.builtin && (
            <>
              <antd.Button type="link" size="small" onClick={() => toggleStatus(row)}>
                {row.status === '启用' ? '禁用' : '启用'}
              </antd.Button>
              <antd.Button type="link" size="small" danger onClick={() => setDelRole(row)}>删除</antd.Button>
            </>
          )}
        </antd.Space>
      ),
    },
  ]

  return (
    <div>
      <TableCard
        title="角色列表"
        extra={
          <antd.Button type="primary" icon={<icons.PlusOutlined/>} onClick={() => setEditRole('new')}>
            新建角色
          </antd.Button>
        }
      >
        <antd.Table
          dataSource={roles}
          rowKey="id"
          columns={cols}
          pagination={false}
          size="middle"
        />
      </TableCard>

      {editRole && (
        <RoleEditModal
          role={editRole === 'new' ? null : editRole}
          onClose={() => setEditRole(null)}
          onSave={handleSave}
        />
      )}

      <antd.Modal
        open={!!delRole}
        title="确认删除角色？"
        onCancel={() => setDelRole(null)}
        onOk={handleDelete}
        okText="确认删除"
        okType="danger"
        cancelText="取消"
        width={420}
      >
        {delRole && (
          <p style={{ fontSize:13, color:ADMIN.textRegular, lineHeight:1.7 }}>
            角色「<strong>{delRole.name}</strong>」将被永久删除，关联的{' '}
            <strong style={{ color:ADMIN.dangerColor }}>{delRole.userCount} 位</strong>{' '}
            用户将失去该角色所有权限，此操作不可撤销。
          </p>
        )}
      </antd.Modal>
    </div>
  )
}

// ─── PermissionsScreen ────────────────────────────────────────────
function PermissionsScreen() {
  const [roles]          = React.useState(ROLES_INIT)
  const [filterModule,   setFilterModule]   = React.useState('all')
  const [filterKeyword,  setFilterKeyword]  = React.useState('')

  const moduleOptions = [
    { value:'all', label:'全部模块' },
    ...PERMISSION_MODULES.map(m => ({ value:m.id, label:m.label })),
  ]

  const visibleModules = PERMISSION_MODULES
    .filter(m => filterModule === 'all' || m.id === filterModule)
    .map(m => ({
      ...m,
      perms: m.perms.filter(p =>
        !filterKeyword || p.key.includes(filterKeyword) || p.label.includes(filterKeyword)
      ),
    }))
    .filter(m => m.perms.length > 0)

  // flatten into rows; each row is one permission with module merge metadata
  const tableData = visibleModules.flatMap(mod =>
    mod.perms.map((p, i) => ({
      ...p,
      _moduleLabel: mod.label,
      _moduleId:    mod.id,
      _isFirst:     i === 0,
      _moduleSize:  mod.perms.length,
    }))
  )

  const cols = [
    {
      title: '功能模块',
      dataIndex: '_moduleLabel',
      width: 110,
      onCell: row => ({
        rowSpan: row._isFirst ? row._moduleSize : 0,
        style: { background:ADMIN.bodyBg, fontWeight:600, verticalAlign:'middle', textAlign:'center' },
      }),
      render: v => <span style={{ fontSize:13, fontWeight:600, color:ADMIN.textPrimary }}>{v}</span>,
    },
    {
      title: '权限标识',
      dataIndex: 'key',
      width: 200,
      render: v => (
        <code style={{
          fontSize:12, color:ADMIN.primary,
          background:ADMIN.primaryLight,
          padding:'2px 7px', borderRadius:4,
          fontFamily:'monospace',
        }}>{v}</code>
      ),
    },
    {
      title: '权限说明',
      dataIndex: 'label',
      width: 120,
      render: v => <span style={{ fontWeight:500, fontSize:13 }}>{v}</span>,
    },
    {
      title: '拥有此权限的角色',
      render: (_, perm) => {
        const matched = roles.filter(r => r.status === '启用' && r.perms.includes(perm.key))
        return (
          <antd.Space size={[4,4]} wrap>
            {matched.map(r => (
              <antd.Tag key={r.id} color={r.builtin ? 'blue' : 'default'} style={{ margin:0 }}>
                {r.name}
              </antd.Tag>
            ))}
            {matched.length === 0 && (
              <span style={{ fontSize:12, color:ADMIN.textSecondary }}>暂无角色</span>
            )}
          </antd.Space>
        )
      },
    },
  ]

  function doReset() { setFilterModule('all'); setFilterKeyword('') }

  return (
    <div>
      <QueryPanel>
        <ElSelect value={filterModule} onChange={v => { setFilterModule(v); setFilterKeyword('') }} options={moduleOptions} width={150}/>
        <ElInput placeholder="搜索权限名称或标识" value={filterKeyword} onChange={e => setFilterKeyword(e.target.value)} width={200}/>
        <antd.Button onClick={doReset}>重置</antd.Button>
      </QueryPanel>

      <TableCard
        title={
          <span>
            权限列表
            <span style={{ fontSize:12.5, fontWeight:400, color:ADMIN.textSecondary, marginLeft:8 }}>
              共 {tableData.length} 个权限
            </span>
          </span>
        }
      >
        <antd.Table
          dataSource={tableData}
          rowKey="key"
          columns={cols}
          pagination={false}
          size="middle"
          bordered
        />
      </TableCard>
    </div>
  )
}

Object.assign(window, { RolesScreen, PermissionsScreen })
