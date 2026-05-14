// app.jsx — main shell, navigation, tweaks
const { useState, useEffect, useMemo } = React;

// ─── screen registry ─────────────────────────────────────────────
const OWNER_SCREENS = [
  { id: 'home',     label: '01 · 首页',         kind: 'native', group: '主流程',   comp: 'HomeScreen' },
  { id: 'scan',     label: '02 · 扫一扫',       kind: 'native', group: '主流程',   comp: 'ScanScreen' },
  { id: 'map',      label: '03 · 地图找站点',   kind: 'native', group: '主流程',   comp: 'MapScreen' },
  { id: 'station',  label: '04 · 站点详情',     kind: 'h5',     group: '主流程',   comp: 'StationScreen' },
  { id: 'pricing',  label: '05 · 计费规则',     kind: 'h5',     group: '主流程',   comp: 'PricingScreen' },
  { id: 'confirm',  label: '06 · 确认充电',     kind: 'h5',     group: '充电流程', comp: 'ConfirmScreen' },
  { id: 'charging', label: '07 · 充电中',       kind: 'native', group: '充电流程', comp: 'ChargingScreen' },
  { id: 'complete', label: '08 · 充电完成',     kind: 'native', group: '充电流程', comp: 'CompleteScreen' },
  { id: 'orders',   label: '09 · 订单记录',     kind: 'h5',     group: '充电流程', comp: 'OrdersScreen' },
  { id: 'order',    label: '10 · 订单详情',     kind: 'h5',     group: '充电流程', comp: 'OrderDetailScreen' },
  { id: 'wallet',   label: '11 · 钱包/充值',    kind: 'h5',     group: '工具',     comp: 'WalletScreen' },
  { id: 'coupons',  label: '12 · 优惠券/月卡',  kind: 'h5',     group: '工具',     comp: 'CouponsScreen' },
  { id: 'messages', label: '13 · 消息通知',     kind: 'h5',     group: '工具',     comp: 'MessagesScreen' },
  { id: 'profile',  label: '14 · 个人中心',     kind: 'h5',     group: '工具',     comp: 'ProfileScreen' },
  { id: 'fault',    label: '15 · 故障报修',     kind: 'h5',     group: '工具',     comp: 'FaultScreen' },
  { id: 'service',  label: '16 · 客服中心',     kind: 'h5',     group: '工具',     comp: 'ServiceScreen' },
];

const OPERATOR_SCREENS = [
  { id: 'op-dashboard', label: '01 · 数据看板', kind: 'native', group: '运营商', comp: 'OpDashboardScreen' },
  { id: 'op-stations',  label: '02 · 站点管理', kind: 'native', group: '运营商', comp: 'OpStationsScreen' },
  { id: 'op-devices',   label: '03 · 设备监控', kind: 'native', group: '运营商', comp: 'OpDevicesScreen' },
  { id: 'op-tickets',   label: '04 · 故障工单', kind: 'native', group: '运营商', comp: 'OpTicketsScreen' },
];

// ─── App ────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  const theme = THEMES[t.theme] || THEMES.tech;
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
          {/* kind badge */}
          <KindBadge kind={screen.kind} theme={theme}/>
          {/* page body container fills the iOS device content area */}
          <div data-screen-label={screen.label} style={{
            position: 'absolute', inset: 0, paddingTop: 62,
            display: 'flex', flexDirection: 'column',
            background: theme.bg0,
            color: theme.text,
          }}>
            <Screen theme={theme} nav={nav}/>
          </div>
        </IOSDevice>
        {/* caption under phone */}
        <div style={{
          marginTop: 14, textAlign: 'center', fontSize: 12, color: theme.textMuted,
        }}>
          {screen.label} · <span style={{ color: theme.primary, fontWeight: 600 }}>{screen.kind === 'native' ? '原生小程序' : 'H5'}</span>
        </div>
      </div>

      {/* tweaks panel */}
      <TweaksPanel>
        <TweakSection label="主题"/>
        <TweakColor label="主色调"
          value={theme.primary}
          options={[THEMES.tech.primary, THEMES.deep.primary, THEMES.electric.primary]}
          onChange={(c) => {
            const key = c === THEMES.tech.primary ? 'tech'
                      : c === THEMES.deep.primary ? 'deep'
                      : 'electric';
            setTweak('theme', key);
          }}
        />
        <TweakRadio label="配色方案"
          value={t.theme}
          options={[
            { value: 'tech',     label: '科技蓝' },
            { value: 'deep',     label: '深海蓝' },
            { value: 'electric', label: '亮电蓝' },
          ]}
          onChange={(v) => setTweak('theme', v)}
        />
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
      <div style={{ marginBottom: 18 }}>
        <div style={{
          fontSize: 11, color: theme.primary, letterSpacing: 2, fontWeight: 700,
        }}>WECHAT MINI · BLUE SHARK</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: theme.text, marginTop: 6, letterSpacing: 0.3 }}>
          两轮电动车充电桩
        </div>
        <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 4 }}>
          {role === 'owner' ? '车主端 · 16 屏' : '运营商端 · 4 屏'}
        </div>
      </div>

      {/* groups */}
      {Object.entries(grouped).map(([group, list]) => (
        <div key={group} style={{ marginBottom: 18 }}>
          <div style={{
            fontSize: 10, color: theme.textDim,
            letterSpacing: 1, fontWeight: 700, textTransform: 'uppercase',
            marginBottom: 8, paddingLeft: 4,
          }}>{group}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {list.map(s => {
              const on = current === s.id;
              return (
                <div key={s.id} data-screen-jump={s.id} onClick={() => setCurrent(s.id)} style={{
                  padding: '8px 12px', borderRadius: 8, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: on ? theme.surfaceTint : 'transparent',
                  border: `1px solid ${on ? theme.primary + '44' : 'transparent'}`,
                  transition: 'all .15s',
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: 999,
                    background: on ? theme.primary : theme.textDim,
                    flexShrink: 0,
                  }}/>
                  <span style={{
                    flex: 1, fontSize: 13,
                    color: on ? theme.primary : theme.textMuted,
                    fontWeight: on ? 700 : 500,
                  }}>{s.label}</span>
                  <span style={{
                    fontSize: 9, padding: '1px 5px', borderRadius: 4,
                    background: s.kind === 'native' ? theme.primary : '#fff',
                    color: s.kind === 'native' ? '#fff' : theme.primary,
                    border: `1px solid ${s.kind === 'native' ? theme.primary : theme.primary + '55'}`,
                    fontWeight: 700, letterSpacing: 0.5,
                  }}>{s.kind === 'native' ? '原生' : 'H5'}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* legend */}
      <div style={{
        padding: 12, borderRadius: 10, marginTop: 8,
        background: '#fff', border: `1px solid ${theme.line}`,
      }}>
        <div style={{ fontSize: 11, color: theme.text, fontWeight: 700 }}>说明</div>
        <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 6, lineHeight: 1.6 }}>
          • <strong style={{ color: theme.text }}>原生</strong>：扫码、地图、充电状态等性能要求高的页面
          <br/>• <strong style={{ color: theme.primary }}>H5</strong>：钱包、订单、券等内容型页面
          <br/>• 屏幕内交互按钮 / 卡片可点击跳转
        </div>
      </div>
    </div>
  );
}

window.App = App;
