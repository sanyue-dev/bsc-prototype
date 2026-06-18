// 蓝鲨充电 · Vue 3 + Element Plus 管理端原型
// 破坏性迁移版本：入口只加载 Vue 3 与 Element Plus。

;(function () {
  const { createApp, computed, defineComponent, onMounted, ref } = Vue
  const El = ElementPlus

  const ADMIN = {
    primary: '#1677ff',
    bodyBg: '#f5f5f5',
    cardBg: '#ffffff',
    border: '#d9d9d9',
    borderLight: '#f0f0f0',
    textPrimary: 'rgba(0,0,0,0.88)',
    textRegular: 'rgba(0,0,0,0.65)',
    textSecondary: 'rgba(0,0,0,0.45)',
    success: '#52c41a',
    warning: '#faad14',
    danger: '#ff4d4f',
  }

  const navGroups = [
    { id: 'dashboard', label: '运营看板' },
    { id: 'reports', label: '报表中心' },
    { id: 'charging', label: '充电业务', children: [
      { id: 'orders', label: '充电订单' },
      { id: 'sessions', label: '充电会话' },
    ] },
    { id: 'operations', label: '运营资产', children: [
      { id: 'stations', label: '站点管理' },
      { id: 'devices', label: '设备管理' },
      { id: 'tickets', label: '故障工单' },
    ] },
    { id: 'settings', label: '配置与用户', children: [
      { id: 'pricing', label: '计费配置' },
      { id: 'users', label: '用户管理' },
      { id: 'coupons', label: '优惠券管理' },
    ] },
    { id: 'system', label: '系统管理', children: [
      { id: 'roles', label: '角色管理' },
      { id: 'perms', label: '权限管理' },
    ] },
  ]

  const titles = {
    dashboard: '运营看板',
    reports: '报表中心',
    orders: '充电订单',
    sessions: '充电会话',
    stations: '站点管理',
    devices: '设备管理',
    tickets: '故障工单',
    pricing: '计费配置',
    users: '用户管理',
    coupons: '优惠券管理',
    roles: '角色管理',
    perms: '权限管理',
  }

  const stations = [
    { id: 'ST-001', name: '金牛苑南门车棚', address: '成都市金牛区花照壁中横街', sockets: 48, online: 44, status: '运营中', revenue: 2381 },
    { id: 'ST-002', name: '锦江万达东侧车棚', address: '成都市锦江区成龙大道', sockets: 60, online: 53, status: '运营中', revenue: 3127 },
    { id: 'ST-003', name: '高新云谷 B 区', address: '成都市高新区天府五街', sockets: 36, online: 29, status: '维护中', revenue: 1268 },
    { id: 'ST-004', name: '青羊书院路社区', address: '成都市青羊区书院街', sockets: 42, online: 37, status: '运营中', revenue: 1834 },
  ]

  const devices = Array.from({ length: 14 }, (_, i) => {
    const station = stations[i % stations.length]
    const status = i % 7 === 0 ? '维护中' : (i % 5 === 0 ? '离线' : '在线')
    return {
      id: `DEV-${String(i + 1).padStart(4, '0')}`,
      station: station.name,
      status,
      ports: 12,
      activePorts: status === '在线' ? 5 + (i % 6) : 0,
      rule: i % 3 === 0 ? '夜间优惠规则' : '标准规则 A',
      lastSeen: `2026-06-18 ${String(9 + i).padStart(2, '0')}:24`,
    }
  })

  const orders = Array.from({ length: 28 }, (_, i) => {
    const station = stations[i % stations.length]
    const done = i % 4 !== 0
    return {
      id: `ORD20260618${String(i + 1).padStart(4, '0')}`,
      user: ['张师傅', '李女士', '王先生', '陈师傅'][i % 4],
      phone: `138****${String(6200 + i).slice(-4)}`,
      station: station.name,
      device: devices[i % devices.length].id,
      status: done ? '已完成' : '充电中',
      amount: done ? (2.4 + i * 0.38).toFixed(2) : '-',
      kwh: (0.8 + i * 0.11).toFixed(2),
      createdAt: `2026-06-18 ${String(8 + (i % 10)).padStart(2, '0')}:${String(10 + i).padStart(2, '0')}`,
    }
  })

  const sessions = orders.map((order, i) => ({
    id: `SES-${order.id.slice(-6)}`,
    orderId: order.id,
    user: order.user,
    station: order.station,
    device: order.device,
    status: order.status === '充电中' ? '进行中' : '已结束',
    duration: order.status === '充电中' ? '进行中' : `${26 + i} 分钟`,
    power: `${(120 + i * 7).toFixed(0)} W`,
    startedAt: order.createdAt,
  }))

  const tickets = [
    { id: 'TK-2401', priority: '高', status: '待处理', station: stations[0].name, device: devices[0].id, issue: '插口过温告警', assignee: '未派工' },
    { id: 'TK-2402', priority: '中', status: '处理中', station: stations[2].name, device: devices[2].id, issue: '设备离线超过 15 分钟', assignee: '刘运维' },
    { id: 'TK-2403', priority: '低', status: '已完成', station: stations[1].name, device: devices[4].id, issue: '用户反馈扫码失败', assignee: '陈运维' },
    { id: 'TK-2404', priority: '高', status: '待处理', station: stations[3].name, device: devices[7].id, issue: '漏保跳闸', assignee: '未派工' },
  ]

  const pricingRules = [
    { id: 'R-STD', name: '标准规则 A', version: 'v3', status: '已发布', electricity: '0.60 元/度', service: '0.04/0.05/0.06/0.07 元/小时', devices: 9 },
    { id: 'R-NIGHT', name: '夜间优惠规则', version: 'v2', status: '已发布', electricity: '0.52 元/度', service: '0.03/0.04/0.05/0.06 元/小时', devices: 4 },
    { id: 'R-CBD', name: '商圈高峰规则', version: 'v1', status: '草稿', electricity: '0.68 元/度', service: '0.06/0.07/0.08/0.09 元/小时', devices: 1 },
  ]

  const users = Array.from({ length: 18 }, (_, i) => ({
    id: `U${String(1000 + i)}`,
    name: ['张师傅', '李女士', '王先生', '陈师傅', '赵女士', '周先生'][i % 6],
    phone: `13${8 + (i % 2)}****${String(6100 + i).slice(-4)}`,
    registeredAt: `2026-0${1 + (i % 6)}-${String(8 + i).padStart(2, '0')}`,
    orders: 8 + i * 3,
    balance: (18 + i * 2.6).toFixed(2),
    status: i % 9 === 0 ? '禁用' : '正常',
  }))

  const coupons = [
    { id: 'CP-01', name: '新用户 3 元券', type: '满减券', value: '满 5 减 3', stock: 5000, used: 1288, status: '进行中' },
    { id: 'CP-02', name: '夜间充电 8 折', type: '折扣券', value: '20:00-07:00 可用', stock: 3000, used: 742, status: '进行中' },
    { id: 'CP-03', name: '月卡权益包', type: '月卡', value: '30 天服务费 8 折', stock: 800, used: 216, status: '即将到期' },
  ]

  const permissionDirs = [
    { id: 'root', label: '-' },
    { id: 'charging', label: '充电业务' },
    { id: 'operations', label: '运营资产' },
    { id: 'settings', label: '配置与用户' },
    { id: 'system', label: '系统管理' },
  ]
  const permissionModules = [
    { id: 'dashboard', dir: 'root', label: '运营看板', perms: ['查看看板'] },
    { id: 'reports', dir: 'root', label: '报表中心', perms: ['查看报表', '导出报表'] },
    { id: 'orders', dir: 'charging', label: '充电订单', perms: ['查看列表', '订单详情', '导出数据'] },
    { id: 'sessions', dir: 'charging', label: '充电会话', perms: ['查看会话'] },
    { id: 'stations', dir: 'operations', label: '站点管理', perms: ['查看站点', '新增站点', '编辑站点', '删除站点'] },
    { id: 'devices', dir: 'operations', label: '设备管理', perms: ['查看设备', '添加设备', '编辑设备', '维护操作', '发起报修'] },
    { id: 'tickets', dir: 'operations', label: '故障工单', perms: ['查看工单', '新建工单', '派工处理'] },
    { id: 'pricing', dir: 'settings', label: '计费配置', perms: ['查看规则', '编辑规则', '发布版本'] },
    { id: 'users', dir: 'settings', label: '用户管理', perms: ['查看用户', '用户详情', '调整余额', '禁用/启用'] },
    { id: 'coupons', dir: 'settings', label: '优惠券管理', perms: ['查看列表', '新建优惠券', '编辑优惠券', '停用优惠券'] },
    { id: 'roles', dir: 'system', label: '角色管理', perms: ['查看角色', '新建角色', '编辑角色', '删除角色'] },
    { id: 'perms', dir: 'system', label: '权限管理', perms: ['查看权限'] },
  ]
  const allPermCount = permissionModules.reduce((sum, item) => sum + item.perms.length, 0)

  const roleSeed = [
    { id: 'role_super', name: '超级管理员', desc: '拥有全部权限，系统内置角色', builtin: true, userCount: 2, status: '启用', permCount: allPermCount },
    { id: 'role_ops', name: '运营专员', desc: '负责日常充电业务运营', builtin: false, userCount: 5, status: '启用', permCount: 9 },
    { id: 'role_maint', name: '运维工程师', desc: '站点及设备运维与工单处理', builtin: false, userCount: 8, status: '启用', permCount: 8 },
    { id: 'role_finance', name: '财务专员', desc: '收入报表与计费规则管理', builtin: false, userCount: 2, status: '启用', permCount: 6 },
    { id: 'role_viewer', name: '数据观察员', desc: '只读权限，仅供数据查阅', builtin: false, userCount: 1, status: '禁用', permCount: 9 },
  ]

  function statusType(value) {
    if (['在线', '运营中', '正常', '已完成', '已结束', '启用', '已发布', '进行中'].includes(value)) return 'success'
    if (['维护中', '处理中', '即将到期', '草稿'].includes(value)) return 'warning'
    if (['待处理', '高', '禁用'].includes(value)) return 'danger'
    return 'info'
  }

  function includes(row, keyword) {
    if (!keyword) return true
    const q = keyword.trim().toLowerCase()
    return Object.values(row).some(v => String(v).toLowerCase().includes(q))
  }

  const LoginPage = defineComponent({
    emits: ['login'],
    setup(_, { emit }) {
      const form = ref({ account: localStorage.getItem('admin_remember_account') || '', password: '', remember: !!localStorage.getItem('admin_remember_account') })
      const loading = ref(false)
      function login() {
        loading.value = true
        if (form.value.remember) localStorage.setItem('admin_remember_account', form.value.account)
        else localStorage.removeItem('admin_remember_account')
        setTimeout(() => {
          localStorage.setItem('admin_logged_in', '1')
          localStorage.setItem('admin_screen', 'dashboard')
          loading.value = false
          emit('login')
        }, 500)
      }
      return { form, loading, login }
    },
    template: `
      <div class="login-page">
        <section class="login-brand">
          <div class="brand-logo"><span>⚡</span><div><b>蓝鲨充电</b><small>运营管理平台</small></div></div>
          <div class="brand-device">
            <div class="device-head">87%</div>
            <div class="device-body">
              <div v-for="i in 12" :key="i" class="device-port" :class="{active:i%3!==0}"></div>
            </div>
          </div>
          <div class="float-card income"><small>今日充电收入</small><strong>¥ 24,381</strong><span>+8.3% 较昨日</span></div>
          <div class="float-card online"><small>在线设备</small><strong>312 <em>/ 340</em></strong><i></i></div>
          <h2>智慧充电，一站掌控</h2>
          <p>实时监控 · 智能调度 · 数据驱动</p>
        </section>
        <section class="login-panel">
          <el-card class="login-card" shadow="never">
            <h1>账号登录</h1>
            <p>欢迎回来，请输入您的管理员凭据</p>
            <el-form :model="form" label-position="top" size="large" @submit.prevent>
              <el-form-item label="账号">
                <el-input v-model="form.account" placeholder="请输入账号" />
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="form.password" placeholder="请输入密码" type="password" show-password />
              </el-form-item>
              <div class="login-row">
                <el-checkbox v-model="form.remember">记住账号</el-checkbox>
                <a href="#" @click.prevent>忘记密码？</a>
              </div>
              <el-button type="primary" :loading="loading" class="login-btn" @click="login">登 录</el-button>
            </el-form>
            <el-alert type="success" :closable="false" show-icon>
              <strong>演示账号：</strong>admin &nbsp;·&nbsp; <strong>密码：</strong>admin123
            </el-alert>
          </el-card>
          <footer>© 2026 蓝鲨充电科技有限公司 · 运营管理平台 v3.2</footer>
        </section>
      </div>
    `,
  })

  const DashboardScreen = defineComponent({
    setup() {
      const now = ref(new Date())
      onMounted(() => setInterval(() => { now.value = new Date() }, 1000))
      const stats = computed(() => [
        { label: '在线设备', value: devices.filter(d => d.status === '在线').length, unit: `/ ${devices.length} 台`, color: ADMIN.primary },
        { label: '充电中端口', value: orders.filter(o => o.status === '充电中').length * 3, unit: '个', color: ADMIN.success },
        { label: '活跃故障工单', value: tickets.filter(t => t.status !== '已完成').length, unit: '单', color: ADMIN.danger },
        { label: '今日营收', value: '9,847', unit: '元', color: ADMIN.warning },
      ])
      return { now, stats, orders, tickets, devices }
    },
    template: `
      <div>
        <div class="screen-head"><div><b>设备状态</b><span>{{ now.toLocaleTimeString('zh-CN', { hour12:false }) }} 更新</span></div></div>
        <div class="stat-grid">
          <el-card v-for="item in stats" :key="item.label" shadow="never" class="stat-card">
            <div class="stat-icon" :style="{background:item.color + '1f', color:item.color}">●</div>
            <div><small>{{ item.label }}</small><strong>{{ item.value }} <em>{{ item.unit }}</em></strong></div>
          </el-card>
        </div>
        <div class="dash-grid">
          <el-card shadow="never"><template #header>经营数据</template><div class="big-number">¥ 24,381</div><p>今日收入，较昨日 +8.3%</p><div class="bar"><i style="width:72%"></i></div></el-card>
          <el-card shadow="never"><template #header>设备在线率</template><div class="big-number">86.4%</div><p>在线 {{ devices.filter(d=>d.status==='在线').length }} 台，维护 {{ devices.filter(d=>d.status==='维护中').length }} 台</p><div class="bar green"><i style="width:86%"></i></div></el-card>
        </div>
        <el-card shadow="never" class="table-card"><template #header>最新工单</template>
          <el-table :data="tickets" size="small">
            <el-table-column prop="id" label="工单号" width="110" />
            <el-table-column prop="issue" label="问题" />
            <el-table-column prop="station" label="站点" />
            <el-table-column prop="status" label="状态" width="100"><template #default="{ row }"><el-tag :type="row.status === '已完成' ? 'success' : row.status === '处理中' ? 'warning' : 'danger'">{{ row.status }}</el-tag></template></el-table-column>
          </el-table>
        </el-card>
      </div>
    `,
  })

  const DataScreen = defineComponent({
    props: ['kind'],
    setup(props) {
      const keyword = ref('')
      const status = ref('all')
      const page = ref(1)
      const pageSize = ref(10)
      const config = computed(() => {
        const map = {
          reports: { title: '报表中心', data: [
            { metric: '营收', today: '¥24,381', week: '¥168,420', month: '¥682,900', trend: '+8.3%' },
            { metric: '完成订单', today: '3,216', week: '21,805', month: '88,410', trend: '+5.1%' },
            { metric: '用电量', today: '8,742 kWh', week: '60,120 kWh', month: '241,730 kWh', trend: '+6.7%' },
          ], columns: ['metric:指标', 'today:今日', 'week:近 7 日', 'month:近 30 日', 'trend:趋势'] },
          orders: { title: '充电订单', data: orders, columns: ['id:订单号', 'user:用户', 'station:站点', 'device:设备', 'status:状态', 'amount:金额', 'kwh:用电量', 'createdAt:创建时间'] },
          sessions: { title: '充电会话', data: sessions, columns: ['id:会话号', 'orderId:订单号', 'user:用户', 'station:站点', 'device:设备', 'status:状态', 'duration:时长', 'power:实时功率'] },
          stations: { title: '站点管理', data: stations, columns: ['id:编号', 'name:站点名称', 'address:地址', 'sockets:插座数', 'online:在线插座', 'status:状态', 'revenue:今日收入'] },
          devices: { title: '设备管理', data: devices, columns: ['id:设备编号', 'station:所属站点', 'status:状态', 'ports:端口数', 'activePorts:充电中', 'rule:计费规则', 'lastSeen:最后在线'] },
          tickets: { title: '故障工单', data: tickets, columns: ['id:工单号', 'priority:优先级', 'status:状态', 'station:站点', 'device:设备', 'issue:问题', 'assignee:处理人'] },
          pricing: { title: '计费配置', data: pricingRules, columns: ['id:规则ID', 'name:规则名称', 'version:版本', 'status:状态', 'electricity:电费', 'service:服务费阶梯', 'devices:关联设备'] },
          users: { title: '用户管理', data: users, columns: ['id:用户ID', 'name:昵称', 'phone:手机号', 'registeredAt:注册日期', 'orders:累计订单', 'balance:余额', 'status:状态'] },
          coupons: { title: '优惠券管理', data: coupons, columns: ['id:券ID', 'name:优惠券名称', 'type:类型', 'value:优惠内容', 'stock:总量', 'used:已使用', 'status:状态'] },
        }
        return map[props.kind]
      })
      const filtered = computed(() => config.value.data.filter(row => includes(row, keyword.value) && (status.value === 'all' || row.status === status.value)))
      const pageRows = computed(() => filtered.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value))
      const columns = computed(() => config.value.columns.map(item => {
        const [prop, label] = item.split(':')
        return { prop, label }
      }))
      const statuses = computed(() => Array.from(new Set(config.value.data.map(row => row.status).filter(Boolean))))
      function reset() { keyword.value = ''; status.value = 'all'; page.value = 1 }
      return { keyword, status, page, pageSize, config, filtered, pageRows, columns, statuses, statusType, reset }
    },
    template: `
      <div>
        <el-card shadow="never" class="query-card">
          <el-space wrap>
            <el-input v-model="keyword" clearable placeholder="搜索关键字" style="width:220px" @input="page=1" />
            <el-select v-if="statuses.length" v-model="status" style="width:160px" @change="page=1">
              <el-option label="全部状态" value="all" />
              <el-option v-for="item in statuses" :key="item" :label="item" :value="item" />
            </el-select>
            <el-button @click="reset">重置</el-button>
            <el-button v-if="kind==='reports' || kind==='orders'" type="primary">导出</el-button>
            <el-button v-if="['stations','devices','tickets','pricing','coupons'].includes(kind)" type="primary">新增</el-button>
          </el-space>
        </el-card>
        <el-card shadow="never" class="table-card">
          <template #header><div class="card-head"><b>{{ config.title }}</b><span>共 {{ filtered.length }} 条</span></div></template>
          <el-table :data="pageRows" stripe>
            <el-table-column v-for="col in columns" :key="col.prop" :prop="col.prop" :label="col.label" min-width="120">
              <template #default="{ row }">
                <el-tag v-if="col.prop==='status' || col.prop==='priority'" :type="statusType(row[col.prop])">{{ row[col.prop] }}</el-tag>
                <span v-else>{{ row[col.prop] }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="130" fixed="right">
              <template #default><el-button link type="primary">详情</el-button><el-button link>编辑</el-button></template>
            </el-table-column>
          </el-table>
          <div class="pager"><el-pagination v-model:current-page="page" v-model:page-size="pageSize" layout="total, sizes, prev, pager, next" :total="filtered.length" /></div>
        </el-card>
      </div>
    `,
  })

  const RolesScreen = defineComponent({
    setup() {
      const roles = ref(roleSeed.map(r => ({ ...r })))
      const dialogOpen = ref(false)
      const editing = ref(null)
      const form = ref({ name: '', desc: '', permCount: 6 })
      function open(role) {
        editing.value = role || null
        form.value = role ? { name: role.name, desc: role.desc, permCount: role.permCount } : { name: '', desc: '', permCount: 6 }
        dialogOpen.value = true
      }
      function save() {
        if (editing.value) Object.assign(editing.value, form.value)
        else roles.value.unshift({ id: `role_${Date.now()}`, ...form.value, builtin: false, userCount: 0, status: '启用' })
        dialogOpen.value = false
        El.ElMessage.success(editing.value ? '角色已更新' : '角色创建成功')
      }
      function toggle(row) {
        row.status = row.status === '启用' ? '禁用' : '启用'
        El.ElMessage.success(`角色已${row.status}`)
      }
      function remove(row) {
        roles.value = roles.value.filter(item => item.id !== row.id)
        El.ElMessage.success('角色已删除')
      }
      return { roles, dialogOpen, editing, form, open, save, toggle, remove, statusType, allPermCount }
    },
    template: `
      <div>
        <el-card shadow="never" class="table-card">
          <template #header><div class="card-head"><b>角色列表</b><el-button type="primary" @click="open()">新建角色</el-button></div></template>
          <el-table :data="roles" stripe>
            <el-table-column prop="name" label="角色名称" min-width="160">
              <template #default="{ row }"><b>{{ row.name }}</b> <el-tag v-if="row.builtin" size="small">内置</el-tag><p>{{ row.desc }}</p></template>
            </el-table-column>
            <el-table-column prop="permCount" label="权限数量" width="120"><template #default="{ row }">{{ row.permCount }} / {{ allPermCount }}</template></el-table-column>
            <el-table-column prop="userCount" label="关联用户" width="120" />
            <el-table-column prop="status" label="状态" width="100"><template #default="{ row }"><el-tag :type="statusType(row.status)">{{ row.status }}</el-tag></template></el-table-column>
            <el-table-column label="操作" width="220">
              <template #default="{ row }">
                <el-button link type="primary" @click="open(row)">编辑权限</el-button>
                <el-button v-if="!row.builtin" link @click="toggle(row)">{{ row.status === '启用' ? '禁用' : '启用' }}</el-button>
                <el-button v-if="!row.builtin" link type="danger" @click="remove(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-dialog v-model="dialogOpen" :title="editing ? '编辑角色' : '新建角色'" width="760">
          <el-form :model="form" label-position="top">
            <el-form-item label="角色名称"><el-input v-model="form.name" :disabled="editing && editing.builtin" /></el-form-item>
            <el-form-item label="角色说明"><el-input v-model="form.desc" :disabled="editing && editing.builtin" /></el-form-item>
            <el-form-item label="权限范围">
              <el-slider v-model="form.permCount" :min="1" :max="allPermCount" show-input />
            </el-form-item>
          </el-form>
          <template #footer><el-button @click="dialogOpen=false">取消</el-button><el-button type="primary" @click="save">保存</el-button></template>
        </el-dialog>
      </div>
    `,
  })

  const PermissionsScreen = defineComponent({
    setup() {
      const dir = ref('all')
      const keyword = ref('')
      const dirMap = Object.fromEntries(permissionDirs.map(item => [item.id, item.label]))
      const rows = computed(() => permissionModules
        .filter(item => dir.value === 'all' || item.dir === dir.value)
        .filter(item => includes(item, keyword.value) || item.perms.some(p => p.includes(keyword.value))))
      return { dir, keyword, rows, permissionDirs, dirMap }
    },
    template: `
      <div>
        <el-card shadow="never" class="query-card">
          <el-space wrap>
            <el-select v-model="dir" style="width:180px"><el-option label="全部目录" value="all" /><el-option v-for="item in permissionDirs" :key="item.id" :label="item.label" :value="item.id" /></el-select>
            <el-input v-model="keyword" clearable placeholder="搜索权限" style="width:220px" />
          </el-space>
        </el-card>
        <el-card shadow="never" class="table-card">
          <template #header><div class="card-head"><b>权限列表</b><span>共 {{ rows.reduce((sum,row)=>sum+row.perms.length,0) }} 个权限</span></div></template>
          <el-table :data="rows" border>
            <el-table-column label="目录" width="140"><template #default="{ row }">{{ dirMap[row.dir] }}</template></el-table-column>
            <el-table-column prop="label" label="功能模块" width="160" />
            <el-table-column label="操作权限"><template #default="{ row }"><el-space wrap><el-tag v-for="perm in row.perms" :key="perm">{{ perm }}</el-tag></el-space></template></el-table-column>
          </el-table>
        </el-card>
      </div>
    `,
  })

  const AdminLayout = defineComponent({
    props: ['screen'],
    emits: ['nav', 'logout'],
    setup(props, { emit }) {
      const activeTitle = computed(() => titles[props.screen] || '运营看板')
      const defaultOpeneds = computed(() => navGroups.filter(group => group.children && group.children.some(item => item.id === props.screen)).map(group => group.id))
      function select(key) { emit('nav', key) }
      function logout() {
        localStorage.removeItem('admin_logged_in')
        localStorage.removeItem('admin_screen')
        emit('logout')
      }
      return { navGroups, activeTitle, defaultOpeneds, select, logout }
    },
    template: `
      <div class="admin-shell">
        <header class="admin-header">
          <div class="admin-brand"><span>⚡</span><b>蓝鲨充电</b></div>
          <el-dropdown>
            <div class="admin-user"><el-avatar size="small">张</el-avatar><span>张运营</span></div>
            <template #dropdown><el-dropdown-menu><el-dropdown-item>个人信息</el-dropdown-item><el-dropdown-item>修改密码</el-dropdown-item><el-dropdown-item divided @click="logout">退出登录</el-dropdown-item></el-dropdown-menu></template>
          </el-dropdown>
        </header>
        <aside class="admin-sidebar">
          <el-menu :default-active="screen" :default-openeds="defaultOpeneds" @select="select">
            <template v-for="item in navGroups" :key="item.id">
              <el-sub-menu v-if="item.children" :index="item.id">
                <template #title>{{ item.label }}</template>
                <el-menu-item v-for="child in item.children" :key="child.id" :index="child.id">{{ child.label }}</el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="item.id">{{ item.label }}</el-menu-item>
            </template>
          </el-menu>
        </aside>
        <main class="admin-main">
          <el-breadcrumb separator="/" class="crumb"><el-breadcrumb-item>蓝鲨充电</el-breadcrumb-item><el-breadcrumb-item>{{ activeTitle }}</el-breadcrumb-item></el-breadcrumb>
          <slot></slot>
        </main>
      </div>
    `,
  })

  const AdminApp = defineComponent({
    components: { AdminLayout, DashboardScreen, DataScreen, RolesScreen, PermissionsScreen },
    setup() {
      const loggedIn = ref(!!localStorage.getItem('admin_logged_in'))
      const screen = ref(localStorage.getItem('admin_screen') || 'dashboard')
      function nav(id) {
        screen.value = id
        localStorage.setItem('admin_screen', id)
      }
      return { loggedIn, screen, nav }
    },
    template: `
      <login-page v-if="!loggedIn" @login="loggedIn=true" />
      <admin-layout v-else :screen="screen" @nav="nav" @logout="loggedIn=false">
        <dashboard-screen v-if="screen==='dashboard'" />
        <roles-screen v-else-if="screen==='roles'" />
        <permissions-screen v-else-if="screen==='perms'" />
        <data-screen v-else :kind="screen" />
      </admin-layout>
    `,
  })

  const style = document.createElement('style')
  style.textContent = `
    .login-page{height:100vh;display:flex;overflow:hidden;background:#f0f2f5}.login-brand{width:45%;position:relative;background:#071225;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden}.brand-logo{position:absolute;top:28px;left:28px;display:flex;gap:10px;align-items:center}.brand-logo>span,.admin-brand>span{width:34px;height:34px;border-radius:8px;background:${ADMIN.primary};display:inline-flex;align-items:center;justify-content:center}.brand-logo small{display:block;color:rgba(255,255,255,.45);font-size:11px;margin-top:2px}.brand-device{width:250px;border-radius:24px;background:#10213a;border:1px solid rgba(255,255,255,.12);padding:22px;box-shadow:0 20px 60px rgba(0,0,0,.3)}.device-head{text-align:center;font-size:42px;font-weight:800;margin-bottom:18px}.device-body{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.device-port{height:42px;border-radius:8px;background:rgba(255,255,255,.12)}.device-port.active{background:#21c47b;box-shadow:0 0 14px rgba(33,196,123,.45)}.float-card{position:absolute;padding:14px 16px;border-radius:10px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(12px)}.float-card small{display:block;color:rgba(255,255,255,.55);margin-bottom:6px}.float-card strong{display:block;font-size:22px}.float-card span{color:#67c23a;font-size:12px}.float-card em{font-size:12px;color:rgba(255,255,255,.45);font-style:normal}.income{right:70px;top:180px}.online{left:70px;bottom:210px}.online i{display:block;height:4px;border-radius:4px;background:#21c47b;width:92%;margin-top:8px}.login-brand h2{margin:32px 0 8px;font-size:22px}.login-brand p{color:rgba(255,255,255,.45)}.login-panel{flex:1;display:flex;align-items:center;justify-content:center;flex-direction:column}.login-card{width:400px;border-radius:10px}.login-card .el-card__body{padding:36px}.login-card h1{font-size:22px;margin:0 0 6px}.login-card p{color:${ADMIN.textSecondary};margin:0 0 28px}.login-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px}.login-row a{color:${ADMIN.primary};text-decoration:none}.login-btn{width:100%;height:44px;margin-bottom:20px}footer{margin-top:20px;color:rgba(0,0,0,.3);font-size:12px}.admin-shell{min-height:100%;background:${ADMIN.bodyBg};color:${ADMIN.textPrimary}.admin-header{position:fixed;left:0;right:0;top:0;height:56px;background:#fff;border-bottom:1px solid ${ADMIN.borderLight};display:flex;align-items:center;justify-content:space-between;padding:0 24px;z-index:20}.admin-brand{display:flex;align-items:center;gap:10px;font-size:17px}.admin-brand>span{color:#fff}.admin-user{display:flex;align-items:center;gap:8px;cursor:pointer}.admin-sidebar{position:fixed;top:56px;bottom:0;left:0;width:220px;background:#fff;border-right:1px solid ${ADMIN.borderLight};overflow:auto}.admin-sidebar .el-menu{border-right:0}.admin-main{margin-left:220px;padding:80px 24px 32px;min-height:100vh}.crumb{margin-bottom:18px}.screen-head{display:flex;justify-content:space-between;margin-bottom:16px}.screen-head b{font-size:16px}.screen-head span,.card-head span{margin-left:10px;color:${ADMIN.textSecondary};font-size:13px}.stat-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-bottom:16px}.stat-card .el-card__body{display:flex;align-items:center;gap:14px}.stat-icon{width:44px;height:44px;border-radius:8px;display:flex;align-items:center;justify-content:center}.stat-card small{display:block;color:${ADMIN.textSecondary};margin-bottom:5px}.stat-card strong{font-size:22px}.stat-card em{font-size:12px;color:${ADMIN.textSecondary};font-style:normal}.dash-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}.big-number{font-size:32px;font-weight:800;margin-bottom:8px}.bar{height:8px;border-radius:8px;background:#eef2f7;overflow:hidden}.bar i{display:block;height:100%;background:${ADMIN.primary}}.bar.green i{background:${ADMIN.success}}.query-card{margin-bottom:16px}.table-card{margin-bottom:16px}.card-head{display:flex;align-items:center;justify-content:space-between}.pager{display:flex;justify-content:flex-end;padding-top:14px}.el-table p{margin:4px 0 0;color:${ADMIN.textSecondary};font-size:12px}@media(max-width:900px){.login-brand{display:none}.stat-grid,.dash-grid{grid-template-columns:1fr}.admin-sidebar{width:180px}.admin-main{margin-left:180px}}`
  document.head.appendChild(style)

  document.addEventListener('DOMContentLoaded', () => {
    createApp(AdminApp).use(El).component('LoginPage', LoginPage).mount('#root')
  })
})()
