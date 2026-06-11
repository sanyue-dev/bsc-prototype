// app.jsx — main shell, navigation, tweaks
const { useState, useEffect, useMemo } = React;

// ─── screen registry ─────────────────────────────────────────────
const OWNER_SCREENS = [
  { id: 'home',     label: '01 · 首页',         group: '主流程',   comp: 'HomeScreen' },
  { id: 'scan',     label: '02 · 扫一扫',       group: '主流程',   comp: 'ScanScreen' },
  { id: 'map',      label: '03 · 地图找站点',   group: '主流程',   comp: 'MapScreen' },
  { id: 'station',  label: '04 · 站点详情',     group: '主流程',   comp: 'StationScreen' },
  { id: 'pricing',  label: '05 · 计费规则',     group: '主流程',   comp: 'PricingScreen' },
  { id: 'confirm',  label: '06 · 确认充电',     group: '充电流程', comp: 'ConfirmScreen' },
  { id: 'charging', label: '07 · 充电中',       group: '充电流程', comp: 'ChargingScreen' },
  { id: 'complete', label: '08 · 充电完成',     group: '充电流程', comp: 'CompleteScreen' },
  { id: 'orders',   label: '09 · 订单记录',     group: '充电流程', comp: 'OrdersScreen' },
  { id: 'order',    label: '10 · 订单详情',     group: '充电流程', comp: 'OrderDetailScreen' },
  { id: 'savings',  label: '11 · 省钱中心',    group: '工具',     comp: 'SavingsScreen' },
  { id: 'shop',     label: '12 · 积分商城',    group: '工具',     comp: 'ShopScreen' },
  { id: 'wallet',   label: '13 · 钱包/充值',    group: '工具',     comp: 'WalletScreen' },
  { id: 'coupons',  label: '14 · 优惠券/月卡',  group: '工具',     comp: 'CouponsScreen' },
  { id: 'messages', label: '15 · 消息通知',     group: '工具',     comp: 'MessagesScreen' },
  { id: 'profile',  label: '16 · 个人中心',     group: '工具',     comp: 'ProfileScreen' },
  { id: 'fault',    label: '17 · 故障报修',     group: '工具',     comp: 'FaultScreen' },
  { id: 'service',  label: '18 · 客服中心',     group: '工具',     comp: 'ServiceScreen' },
];

const OPERATOR_SCREENS = [
  { id: 'op-dashboard', label: '01 · 数据看板', group: '运营商', comp: 'OpDashboardScreen' },
  { id: 'op-stations',  label: '02 · 站点管理', group: '运营商', comp: 'OpStationsScreen' },
  { id: 'op-devices',   label: '03 · 设备监控', group: '运营商', comp: 'OpDevicesScreen' },
  { id: 'op-tickets',   label: '04 · 故障工单', group: '运营商', comp: 'OpTicketsScreen' },
  { id: 'op-pricing',   label: '05 · 计费配置', group: '运营商', comp: 'OpPricingScreen' },
];

// ─── App ────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  const theme = THEMES.eco;
  const role = t.role || 'owner';
  const screens = role === 'owner' ? OWNER_SCREENS : OPERATOR_SCREENS;

  const [current, setCurrent] = useState(role === 'owner' ? 'home' : 'op-dashboard');

  // when role flips, jump to that role's first screen
  useEffect(() => {
    setCurrent(role === 'owner' ? 'home' : 'op-dashboard');
  }, [role]);

  const screen = screens.find(s => s.id === current) || screens[0];
  const Screen = window[screen.comp];

  // navigate handler – supports tab IDs that also live in the registry
  const nav = (id) => {
    if (!id) return;
    // owner tab bar uses 'home','map','orders','profile'
    // operator uses 'op-…'
    if (screens.find(s => s.id === id)) setCurrent(id);
    else console.warn('unknown nav target', id);
  };

  // group screens for sidebar
  const grouped = useMemo(() => {
    const g = {};
    screens.forEach(s => { (g[s.group] ||= []).push(s); });
    return g;
  }, [screens]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      gap: 28, padding: '32px 24px 60px',
    }}>
      {/* sidebar: screen index */}
      <Sidebar
        screens={screens} grouped={grouped} current={current} setCurrent={setCurrent}
        theme={theme} role={role}
      />

      {/* phone */}
      <div style={{ position: 'relative' }}>
        <IOSDevice height={874} width={402}>

          {/* page body container fills the iOS device content area */}
          <div data-screen-label={screen.label} style={{
            position: 'absolute', inset: 0, paddingTop: 62,
            display: 'flex', flexDirection: 'column',
            background: theme.bg1,
            color: theme.text,
          }}>
            <Screen theme={theme} nav={nav}/>
          </div>
        </IOSDevice>
        <div style={{
          marginTop: 14, textAlign: 'center', fontSize: 12, color: theme.textMuted,
        }}>
          {screen.label}
        </div>
      </div>

      {/* tweaks panel */}
      <TweaksPanel>
        <TweakSection label="角色"/>
        <TweakRadio label="端"
          value={t.role}
          options={[
            { value: 'owner',    label: '车主端' },
            { value: 'operator', label: '运营商端' },
          ]}
          onChange={(v) => setTweak('role', v)}
        />
        <TweakSection label="导航"/>
        <TweakSelect label="跳转至"
          value={current}
          options={screens.map(s => ({ value: s.id, label: s.label }))}
          onChange={setCurrent}
        />
      </TweaksPanel>
    </div>
  );
}

// ─── Sidebar — screen index w/ tap-to-jump ────────────────────────
function Sidebar({ screens, grouped, current, setCurrent, theme, role }) {
  return (
    <div style={{
      width: 240, flexShrink: 0, position: 'sticky', top: 32,
      maxHeight: 'calc(100vh - 64px)', overflowY: 'auto',
      paddingRight: 8,
    }} className="thinscroll">
      {/* title */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 16, fontWeight: 900, color: theme.text, letterSpacing: -0.5 }}>蓝鲨充电</span>
        </div>
        <div style={{ fontSize: 11, color: theme.textMuted, letterSpacing: 0.3 }}>
          {role === 'owner' ? '车主端 · 18 屏' : '运营商端 · 5 屏'}
        </div>
      </div>

      {/* groups */}
      {Object.entries(grouped).map(([group, list]) => (
        <div key={group} style={{ marginBottom: 18 }}>
          <div style={{
            fontSize: 9, color: theme.textDim,
            letterSpacing: 1.5, fontWeight: 700, textTransform: 'uppercase',
            marginBottom: 6, paddingLeft: 4,
          }}>{group}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {list.map(s => {
              const on = current === s.id;
              return (
                <div key={s.id} data-screen-jump={s.id} onClick={() => setCurrent(s.id)} style={{
                  padding: '7px 10px', borderRadius: 6, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: on ? theme.text : 'transparent',
                  border: 'none',
                  transition: 'all .12s',
                }}>
                  <span style={{
                    width: 5, height: 5, borderRadius: 999,
                    background: on ? theme.primary : theme.textDim,
                    flexShrink: 0,
                  }}/>
                  <span style={{
                    flex: 1, fontSize: 12,
                    color: on ? '#FFFFFF' : theme.textMuted,
                    fontWeight: on ? 700 : 400,
                    letterSpacing: 0.1,
                  }}>{s.label}</span>

                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div style={{
        padding: 12, borderRadius: 10, marginTop: 8,
        background: theme.surface, border: `1px solid ${theme.line}`,
      }}>
        <div style={{ fontSize: 11, color: theme.textMuted, lineHeight: 1.6 }}>
          屏幕内交互按钮 / 卡片可点击跳转
        </div>
      </div>
    </div>
  );
}

window.App = App;
