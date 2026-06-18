// 蓝鲨充电 · Vue 3 移动端原型
// 破坏性迁移版本：入口只加载 Vue 3 与 Element Plus。

;(function () {
  const { createApp, computed, defineComponent, onMounted, onUnmounted, ref } = Vue
  const El = ElementPlus

  const theme = {
    primary: '#1A9E6E',
    primary2: '#28B47E',
    bg0: '#F0F5F2',
    bg1: '#F5F8F6',
    surface: '#FFFFFF',
    surfaceHi: '#FAFCFA',
    line: '#DCE8E1',
    lineSoft: '#EBF2EE',
    text: '#111816',
    muted: '#566961',
    dim: '#96A69D',
    warning: '#B07010',
    danger: '#C43030',
    dark: '#060F0B',
  }

  const ownerScreens = [
    { id: 'home', label: '01 · 首页', group: '主流程' },
    { id: 'scan', label: '02 · 扫一扫', group: '主流程' },
    { id: 'map', label: '03 · 地图找站点', group: '主流程' },
    { id: 'station', label: '04 · 站点详情', group: '主流程' },
    { id: 'pricing', label: '05 · 计费规则', group: '主流程' },
    { id: 'confirm', label: '06 · 确认充电', group: '充电流程' },
    { id: 'charging', label: '07 · 充电中', group: '充电流程' },
    { id: 'complete', label: '08 · 充电完成', group: '充电流程' },
    { id: 'orders', label: '09 · 订单记录', group: '充电流程' },
    { id: 'order', label: '10 · 订单详情', group: '充电流程' },
    { id: 'savings', label: '11 · 省钱中心', group: '工具' },
    { id: 'shop', label: '12 · 积分商城', group: '工具' },
    { id: 'wallet', label: '13 · 钱包/充值', group: '工具' },
    { id: 'coupons', label: '14 · 优惠券/月卡', group: '工具' },
    { id: 'messages', label: '15 · 消息通知', group: '工具' },
    { id: 'profile', label: '16 · 个人中心', group: '工具' },
    { id: 'fault', label: '17 · 故障报修', group: '工具' },
    { id: 'service', label: '18 · 客服中心', group: '工具' },
  ]

  const operatorScreens = [
    { id: 'op-dashboard', label: '01 · 数据看板', group: '运营商' },
    { id: 'op-stations', label: '02 · 站点管理', group: '运营商' },
    { id: 'op-devices', label: '03 · 设备监控', group: '运营商' },
    { id: 'op-tickets', label: '04 · 故障工单', group: '运营商' },
    { id: 'op-pricing', label: '05 · 计费配置', group: '运营商' },
  ]

  const stations = [
    { id: 'st-1', name: '金牛苑南门车棚', distance: '320m', address: '金牛区花照壁中横街', available: 18, total: 24, price: '0.60 元/度', service: '0.04 起/小时' },
    { id: 'st-2', name: '锦江万达东侧车棚', distance: '1.1km', address: '锦江区成龙大道', available: 9, total: 30, price: '0.62 元/度', service: '0.05 起/小时' },
    { id: 'st-3', name: '高新云谷 B 区', distance: '2.4km', address: '高新区天府五街', available: 5, total: 18, price: '0.58 元/度', service: '0.04 起/小时' },
  ]

  const orders = [
    { id: 'ORD-8421', station: '金牛苑南门车棚', status: '充电中', amount: '预计 ¥4.80', time: '今天 14:22', kwh: '1.28 kWh' },
    { id: 'ORD-8398', station: '锦江万达东侧车棚', status: '已完成', amount: '¥3.60', time: '昨天 19:08', kwh: '0.94 kWh' },
    { id: 'ORD-8312', station: '高新云谷 B 区', status: '已完成', amount: '¥5.20', time: '06-16 08:40', kwh: '1.52 kWh' },
  ]

  const messages = [
    { title: '充电即将完成', text: '当前电量已达 92%，预计 18 分钟后结束。', time: '2 分钟前' },
    { title: '优惠券到账', text: '新用户 3 元充电券已发放至账户。', time: '今天 09:20' },
    { title: '工单已受理', text: '你提交的插口异常反馈已进入处理队列。', time: '昨天 20:12' },
  ]

  function groupScreens(screens) {
    return screens.reduce((acc, item) => {
      if (!acc[item.group]) acc[item.group] = []
      acc[item.group].push(item)
      return acc
    }, {})
  }

  const Sidebar = defineComponent({
    props: ['screens', 'current', 'role'],
    emits: ['jump'],
    setup(props) {
      const grouped = computed(() => groupScreens(props.screens))
      return { grouped }
    },
    template: `
      <aside class="side thinscroll">
        <div class="side-title">
          <b>蓝鲨充电</b>
          <span>{{ role === 'owner' ? '车主端 · 18 屏' : '运营商端 · 5 屏' }}</span>
        </div>
        <section v-for="(list, group) in grouped" :key="group" class="side-group">
          <h3>{{ group }}</h3>
          <button v-for="item in list" :key="item.id" :class="{active: current===item.id}" @click="$emit('jump', item.id)">
            <i></i><span>{{ item.label }}</span>
          </button>
        </section>
        <div class="side-note">屏幕内交互按钮 / 卡片可点击跳转</div>
      </aside>
    `,
  })

  const PhoneShell = defineComponent({
    props: ['label'],
    template: `
      <div class="phone-wrap">
        <div class="phone">
          <div class="phone-notch"></div>
          <div class="phone-status"><span>9:41</span><span>5G ▰</span></div>
          <div class="phone-content noscroll"><slot></slot></div>
          <div class="home-indicator"></div>
        </div>
        <div class="screen-label">{{ label }}</div>
      </div>
    `,
  })

  const OwnerScreen = defineComponent({
    props: ['screen'],
    emits: ['nav'],
    setup(props) {
      const chargingSec = ref(2058)
      let timer = null
      onMounted(() => {
        timer = setInterval(() => { if (props.screen === 'charging') chargingSec.value += 1 }, 1000)
      })
      onUnmounted(() => clearInterval(timer))
      const chargeTime = computed(() => {
        const m = Math.floor(chargingSec.value / 60)
        const s = chargingSec.value % 60
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
      })
      return { stations, orders, messages, chargeTime, theme }
    },
    template: `
      <section class="screen">
        <header class="mini-head">
          <button class="ghost-icon" @click="$emit('nav','home')">‹</button>
          <b>{{ ({
            home:'蓝鲨充电', scan:'扫一扫', map:'地图找站点', station:'站点详情', pricing:'计费规则',
            confirm:'确认充电', charging:'充电中', complete:'充电完成', orders:'订单记录', order:'订单详情',
            savings:'省钱中心', shop:'积分商城', wallet:'钱包', coupons:'优惠券/月卡', messages:'消息通知',
            profile:'个人中心', fault:'故障报修', service:'客服中心'
          })[screen] }}</b>
          <button class="ghost-icon" @click="$emit('nav','messages')">⋯</button>
        </header>

        <main class="screen-scroll">
          <template v-if="screen==='home'">
            <div class="hero-card">
              <small>当前推荐</small>
              <h1>附近可用插口 18 个</h1>
              <p>金牛苑南门车棚 · 320m · 低峰电价</p>
              <button class="primary" @click="$emit('nav','scan')">扫码充电</button>
            </div>
            <div class="quick-grid">
              <button @click="$emit('nav','map')">找站点</button><button @click="$emit('nav','orders')">订单</button><button @click="$emit('nav','wallet')">钱包</button><button @click="$emit('nav','coupons')">优惠</button>
            </div>
            <StationList @nav="$emit('nav',$event)" />
          </template>

          <template v-else-if="screen==='scan'">
            <div class="scan-box"><div class="scan-line"></div><span>对准充电柜二维码</span></div>
            <button class="primary wide" @click="$emit('nav','confirm')">模拟扫码成功</button>
            <button class="plain wide" @click="$emit('nav','map')">手动选择站点</button>
          </template>

          <template v-else-if="screen==='map'">
            <div class="map-view"><i v-for="n in 5" :key="n" :style="{left:20+n*12+'%', top:18+n*10+'%'}"></i></div>
            <StationList @nav="$emit('nav',$event)" />
          </template>

          <template v-else-if="screen==='station'">
            <div class="section-card"><h2>{{ stations[0].name }}</h2><p>{{ stations[0].address }}</p><div class="slots"><span v-for="n in 24" :key="n" :class="{on:n<=18}"></span></div></div>
            <InfoRows :rows="[['距离',stations[0].distance],['可用插口',stations[0].available + ' / ' + stations[0].total],['电价',stations[0].price],['服务费',stations[0].service]]" />
            <button class="primary wide" @click="$emit('nav','pricing')">查看计费规则</button>
          </template>

          <template v-else-if="screen==='pricing'">
            <div class="price-card"><h2>标准规则 A</h2><strong>¥0.60 <em>/度</em></strong><p>服务费按功率阶梯计费，低功率 0.04 元/小时起。</p></div>
            <InfoRows :rows="[['0-150W','0.04 元/小时'],['150-300W','0.05 元/小时'],['300-500W','0.06 元/小时'],['500W 以上','0.07 元/小时']]" />
            <button class="primary wide" @click="$emit('nav','confirm')">继续充电</button>
          </template>

          <template v-else-if="screen==='confirm'">
            <InfoRows :rows="[['站点','金牛苑南门车棚'],['设备','A-03'],['插口','#08'],['余额','¥32.80'],['优惠券','新用户 3 元券']]" />
            <button class="primary wide" @click="$emit('nav','charging')">确认开始充电</button>
          </template>

          <template v-else-if="screen==='charging'">
            <div class="charging-panel"><div class="ring"><span>{{ chargeTime }}</span></div><h2>正在安全充电</h2><p>实时功率 186W · 已用电 1.28 kWh</p></div>
            <InfoRows :rows="[['预计费用','¥4.80'],['当前电压','220V'],['温度','32°C'],['设备','A-03 #08']]" />
            <button class="danger wide" @click="$emit('nav','complete')">结束充电</button>
          </template>

          <template v-else-if="screen==='complete'">
            <div class="done">✓<h2>充电完成</h2><p>本次用电 1.32 kWh，共计 ¥4.60</p></div>
            <button class="primary wide" @click="$emit('nav','order')">查看订单详情</button>
            <button class="plain wide" @click="$emit('nav','home')">返回首页</button>
          </template>

          <template v-else-if="screen==='orders'">
            <OrderList @nav="$emit('nav',$event)" />
          </template>

          <template v-else-if="screen==='order'">
            <InfoRows :rows="[['订单号','ORD-8421'],['站点','金牛苑南门车棚'],['设备插口','A-03 #08'],['用电量','1.32 kWh'],['优惠抵扣','-¥3.00'],['实付金额','¥4.60']]" />
            <button class="plain wide" @click="$emit('nav','fault')">对此订单报修</button>
          </template>

          <template v-else-if="['savings','coupons'].includes(screen)">
            <div class="coupon" v-for="item in ['新用户 3 元券','夜间充电 8 折','月卡服务费 8 折']" :key="item"><b>{{ item }}</b><span>立即可用</span></div>
          </template>

          <template v-else-if="screen==='shop'">
            <div class="shop-grid"><div v-for="item in ['骑行雨衣','手机支架','充电月卡','安全头盔']" :key="item"><b>{{ item }}</b><span>积分兑换</span></div></div>
          </template>

          <template v-else-if="screen==='wallet'">
            <div class="balance">¥32.80<small>账户余额</small></div>
            <div class="amount-grid"><button v-for="n in [20,50,100,200]" :key="n">¥{{ n }}</button></div>
            <button class="primary wide">立即充值</button>
          </template>

          <template v-else-if="screen==='messages'">
            <div class="msg" v-for="item in messages" :key="item.title"><b>{{ item.title }}</b><p>{{ item.text }}</p><span>{{ item.time }}</span></div>
          </template>

          <template v-else-if="screen==='profile'">
            <div class="profile"><div class="avatar">张</div><h2>张师傅</h2><p>累计充电 42 次 · 节省 ¥86.40</p></div>
            <InfoRows :rows="[['手机号','138****6208'],['会员等级','蓝鲨银卡'],['常用站点','金牛苑南门车棚'],['账户状态','正常']]" />
          </template>

          <template v-else-if="screen==='fault'">
            <InfoRows :rows="[['关联设备','A-03 #08'],['问题类型','插口异常'],['联系方式','138****6208']]" />
            <textarea placeholder="描述遇到的问题"></textarea>
            <button class="primary wide">提交报修</button>
          </template>

          <template v-else-if="screen==='service'">
            <div class="section-card"><h2>客服中心</h2><p>7x12 小时在线支持</p></div>
            <button class="plain wide">在线客服</button><button class="plain wide">拨打 400-800-1024</button>
          </template>
        </main>

        <nav class="tabbar">
          <button :class="{on:screen==='home'}" @click="$emit('nav','home')">首页</button>
          <button :class="{on:screen==='map'}" @click="$emit('nav','map')">站点</button>
          <button :class="{on:screen==='orders'}" @click="$emit('nav','orders')">订单</button>
          <button :class="{on:screen==='profile'}" @click="$emit('nav','profile')">我的</button>
        </nav>
      </section>
    `,
  })

  const StationList = defineComponent({
    emits: ['nav'],
    setup() { return { stations } },
    template: `
      <div class="list">
        <button v-for="item in stations" :key="item.id" class="station-row" @click="$emit('nav','station')">
          <b>{{ item.name }}</b><span>{{ item.distance }} · 可用 {{ item.available }}/{{ item.total }}</span><em>{{ item.price }}</em>
        </button>
      </div>
    `,
  })

  const OrderList = defineComponent({
    emits: ['nav'],
    setup() { return { orders } },
    template: `
      <div class="list">
        <button v-for="item in orders" :key="item.id" class="order-row" @click="$emit('nav','order')">
          <b>{{ item.station }}</b><span>{{ item.id }} · {{ item.time }}</span><em>{{ item.amount }}</em><i>{{ item.status }}</i>
        </button>
      </div>
    `,
  })

  const InfoRows = defineComponent({
    props: ['rows'],
    template: `<div class="info-rows"><div v-for="row in rows" :key="row[0]"><span>{{ row[0] }}</span><b>{{ row[1] }}</b></div></div>`,
  })

  const OperatorScreen = defineComponent({
    props: ['screen'],
    setup() {
      const kpis = [
        ['今日营收', '¥24,381', '+8.3%'],
        ['在线设备', '312/340', '91.7%'],
        ['充电中端口', '156', '实时'],
        ['待处理工单', '2', '需派工'],
      ]
      return { kpis, stations, devices: [
        { id: 'DEV-001', station: '金牛苑南门车棚', status: '在线', temp: '32°C', power: '186W' },
        { id: 'DEV-002', station: '锦江万达东侧车棚', status: '离线', temp: '-', power: '-' },
        { id: 'DEV-003', station: '高新云谷 B 区', status: '维护中', temp: '38°C', power: '0W' },
      ], tickets: [
        { id: 'TK-2401', title: '插口过温告警', status: '待处理' },
        { id: 'TK-2402', title: '设备离线超过 15 分钟', status: '处理中' },
      ] }
    },
    template: `
      <section class="screen">
        <header class="mini-head"><b>{{ ({'op-dashboard':'数据看板','op-stations':'站点管理','op-devices':'设备监控','op-tickets':'故障工单','op-pricing':'计费配置'})[screen] }}</b><span></span></header>
        <main class="screen-scroll operator">
          <template v-if="screen==='op-dashboard'">
            <div class="op-grid"><div v-for="item in kpis" :key="item[0]"><span>{{ item[0] }}</span><b>{{ item[1] }}</b><em>{{ item[2] }}</em></div></div>
            <div class="section-card"><h2>实时趋势</h2><div class="mini-chart"><i v-for="n in [40,68,52,76,90,64,82]" :key="n" :style="{height:n+'%'}"></i></div></div>
          </template>
          <template v-else-if="screen==='op-stations'"><StationList /></template>
          <template v-else-if="screen==='op-devices'">
            <div class="device-row" v-for="item in devices" :key="item.id"><b>{{ item.id }}</b><span>{{ item.station }}</span><em>{{ item.status }} · {{ item.temp }} · {{ item.power }}</em></div>
          </template>
          <template v-else-if="screen==='op-tickets'">
            <div class="msg" v-for="item in tickets" :key="item.id"><b>{{ item.title }}</b><p>{{ item.id }}</p><span>{{ item.status }}</span></div>
          </template>
          <template v-else>
            <div class="price-card"><h2>标准规则 A</h2><strong>0.60 元/度</strong><p>服务费按功率阶梯：0.04 / 0.05 / 0.06 / 0.07 元/小时</p></div>
            <button class="primary wide">保存配置</button>
          </template>
        </main>
      </section>
    `,
  })

  const App = defineComponent({
    components: { Sidebar, PhoneShell, OwnerScreen, OperatorScreen },
    setup() {
      const role = ref((window.TWEAK_DEFAULTS && window.TWEAK_DEFAULTS.role) || 'owner')
      const current = ref(role.value === 'owner' ? 'home' : 'op-dashboard')
      const screens = computed(() => role.value === 'owner' ? ownerScreens : operatorScreens)
      const screen = computed(() => screens.value.find(item => item.id === current.value) || screens.value[0])
      function setRole(next) {
        role.value = next
        current.value = next === 'owner' ? 'home' : 'op-dashboard'
      }
      function jump(id) {
        if (screens.value.some(item => item.id === id)) current.value = id
      }
      return { role, current, screens, screen, setRole, jump }
    },
    template: `
      <div class="mobile-stage">
        <Sidebar :screens="screens" :current="current" :role="role" @jump="jump" />
        <PhoneShell :label="screen.label">
          <OwnerScreen v-if="role==='owner'" :screen="current" @nav="jump" />
          <OperatorScreen v-else :screen="current" />
        </PhoneShell>
        <aside class="tweaks">
          <b>角色</b>
          <button :class="{active:role==='owner'}" @click="setRole('owner')">车主端</button>
          <button :class="{active:role==='operator'}" @click="setRole('operator')">运营商端</button>
          <b>导航</b>
          <select v-model="current">
            <option v-for="item in screens" :key="item.id" :value="item.id">{{ item.label }}</option>
          </select>
        </aside>
      </div>
    `,
  })

  const style = document.createElement('style')
  style.textContent = `
    .mobile-stage{min-height:100vh;display:flex;align-items:flex-start;justify-content:center;gap:28px;padding:32px 24px 60px}.side{width:240px;flex-shrink:0;position:sticky;top:32px;max-height:calc(100vh - 64px);overflow:auto;padding-right:8px}.side-title{margin-bottom:20px}.side-title b{display:block;font-size:16px;font-weight:900;color:${theme.text}}.side-title span{display:block;font-size:11px;color:${theme.muted};margin-top:8px}.side-group{margin-bottom:18px}.side-group h3{font-size:9px;color:${theme.dim};letter-spacing:1.5px;margin:0 0 6px 4px}.side button{width:100%;border:0;background:transparent;text-align:left;padding:7px 10px;border-radius:6px;display:flex;align-items:center;gap:8px;cursor:pointer;color:${theme.muted}}.side button i{width:5px;height:5px;border-radius:99px;background:${theme.dim}}.side button.active{background:${theme.text};color:#fff;font-weight:700}.side button.active i{background:${theme.primary}}.side-note{padding:12px;border-radius:10px;background:${theme.surface};border:1px solid ${theme.line};font-size:11px;color:${theme.muted};line-height:1.6}.phone-wrap{position:relative}.phone{width:402px;height:874px;border-radius:44px;background:#111;padding:14px;box-shadow:0 28px 70px rgba(0,0,0,.18);position:relative}.phone:before{content:'';position:absolute;inset:8px;border-radius:38px;border:1px solid rgba(255,255,255,.1);pointer-events:none}.phone-notch{position:absolute;left:50%;top:17px;transform:translateX(-50%);width:118px;height:28px;border-radius:0 0 18px 18px;background:#050505;z-index:5}.phone-status{position:absolute;top:18px;left:31px;right:31px;color:#111;z-index:4;display:flex;justify-content:space-between;font-size:12px;font-weight:700}.phone-content{position:absolute;inset:14px;border-radius:34px;background:${theme.bg1};overflow:hidden;color:${theme.text}}.home-indicator{position:absolute;left:50%;bottom:22px;transform:translateX(-50%);width:134px;height:5px;border-radius:5px;background:#111;z-index:5}.screen-label{text-align:center;margin-top:14px;font-size:12px;color:${theme.muted}}.screen{height:100%;padding-top:62px;display:flex;flex-direction:column}.mini-head{height:48px;display:flex;align-items:center;justify-content:space-between;padding:0 18px;flex-shrink:0}.mini-head b{font-size:17px}.ghost-icon{width:30px;height:30px;border:0;background:transparent;font-size:22px;color:${theme.text}}.screen-scroll{flex:1;overflow:auto;padding:10px 18px 84px}.hero-card,.section-card,.price-card,.charging-panel,.done,.balance{border-radius:18px;background:${theme.surface};border:1px solid ${theme.line};padding:18px;margin-bottom:14px}.hero-card{background:${theme.dark};color:#fff}.hero-card small{color:rgba(255,255,255,.55)}.hero-card h1{font-size:26px;margin:8px 0}.hero-card p{color:rgba(255,255,255,.62);font-size:13px}.primary,.plain,.danger{border:0;border-radius:12px;padding:12px 16px;font-weight:800;cursor:pointer}.primary{background:${theme.primary};color:#fff}.danger{background:${theme.danger};color:#fff}.plain{background:${theme.surface};border:1px solid ${theme.line};color:${theme.text}}.wide{width:100%;margin:8px 0}.quick-grid,.amount-grid,.op-grid,.shop-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:14px}.quick-grid button,.amount-grid button,.shop-grid>div,.op-grid>div{border:1px solid ${theme.line};background:${theme.surface};border-radius:14px;padding:16px;text-align:left;color:${theme.text}}.list{display:flex;flex-direction:column;gap:10px}.station-row,.order-row,.device-row,.msg,.coupon{display:block;width:100%;border:1px solid ${theme.line};background:${theme.surface};border-radius:14px;padding:14px;text-align:left;color:${theme.text};position:relative}.station-row b,.order-row b,.msg b,.coupon b,.device-row b{display:block;font-size:14px}.station-row span,.order-row span,.msg p,.device-row span,.coupon span{display:block;color:${theme.muted};font-size:12px;margin-top:5px}.station-row em,.order-row em,.device-row em{display:block;color:${theme.primary};font-style:normal;font-size:12px;margin-top:8px}.order-row i{position:absolute;right:14px;top:14px;font-style:normal;color:${theme.primary};font-size:12px}.scan-box{height:300px;border-radius:24px;background:${theme.dark};margin:24px 0;display:flex;align-items:center;justify-content:center;color:#fff;position:relative;overflow:hidden}.scan-box:before{content:'';width:210px;height:210px;border:2px solid rgba(255,255,255,.55);border-radius:18px}.scan-box span{position:absolute;bottom:34px;color:rgba(255,255,255,.68)}.scan-line{position:absolute;width:220px;height:2px;background:${theme.primary};animation:scanLine 2s ease-in-out infinite}.map-view{height:230px;border-radius:20px;background:linear-gradient(135deg,#dce8e1,#f7faf8);position:relative;margin-bottom:14px;overflow:hidden}.map-view i{position:absolute;width:18px;height:18px;border-radius:50%;background:${theme.primary};box-shadow:0 0 0 6px rgba(26,158,110,.16)}.slots{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;margin-top:16px}.slots span{height:30px;border-radius:8px;background:${theme.lineSoft}}.slots span.on{background:${theme.primary}}.info-rows{background:${theme.surface};border:1px solid ${theme.line};border-radius:16px;overflow:hidden;margin-bottom:14px}.info-rows div{display:flex;justify-content:space-between;padding:13px 14px;border-bottom:1px solid ${theme.lineSoft};font-size:13px}.info-rows div:last-child{border-bottom:0}.info-rows span{color:${theme.muted}}.price-card strong,.balance{font-size:32px;font-weight:900;color:${theme.primary}}.price-card em{font-size:14px;color:${theme.muted};font-style:normal}.charging-panel{text-align:center}.ring{width:156px;height:156px;border-radius:50%;margin:8px auto 18px;border:12px solid ${theme.primary};display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:900}.done{text-align:center;font-size:48px;color:${theme.primary}}.done h2{font-size:24px;color:${theme.text};margin:8px 0}.balance{text-align:center}.balance small{display:block;font-size:12px;color:${theme.muted};margin-top:6px}textarea{width:100%;min-height:120px;border-radius:14px;border:1px solid ${theme.line};padding:14px;font:inherit;resize:none}.profile{text-align:center;background:${theme.surface};border:1px solid ${theme.line};border-radius:18px;padding:20px;margin-bottom:14px}.avatar{width:64px;height:64px;border-radius:50%;background:${theme.primary};color:#fff;display:flex;align-items:center;justify-content:center;margin:0 auto 10px;font-size:24px;font-weight:900}.tabbar{position:absolute;left:14px;right:14px;bottom:14px;height:68px;background:#fff;border-top:1px solid ${theme.line};display:grid;grid-template-columns:repeat(4,1fr);border-radius:0 0 34px 34px}.tabbar button{border:0;background:transparent;color:${theme.muted};font-size:12px}.tabbar button.on{color:${theme.primary};font-weight:800}.tweaks{width:220px;position:sticky;top:32px;border:1px solid ${theme.line};background:#fff;border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:10px}.tweaks b{font-size:12px;color:${theme.muted};margin-top:4px}.tweaks button,.tweaks select{height:34px;border-radius:8px;border:1px solid ${theme.line};background:#fff;padding:0 10px}.tweaks button.active{background:${theme.text};color:#fff}.operator .op-grid div span{display:block;color:${theme.muted};font-size:12px}.operator .op-grid div b{display:block;font-size:22px;margin:8px 0}.operator .op-grid div em{font-style:normal;color:${theme.primary};font-size:12px}.mini-chart{height:130px;display:flex;align-items:end;gap:8px}.mini-chart i{flex:1;background:${theme.primary};border-radius:6px 6px 0 0}.screen-scroll::-webkit-scrollbar{width:0}@media(max-width:980px){.side,.tweaks{display:none}.mobile-stage{padding:16px}}`
  document.head.appendChild(style)

  document.addEventListener('DOMContentLoaded', () => {
    createApp(App)
      .use(El)
      .component('StationList', StationList)
      .component('OrderList', OrderList)
      .component('InfoRows', InfoRows)
      .mount('#root')
  })
})()
