// admin/login.jsx — 登录页（antd Form 重构版）
/* global antd */

const LP       = '#2E5BFF'
const LP_DARK  = '#0c1929'
const LP_TEXT_S = '#606266'

function GridLines() {
  const lines = []
  for (let i = 0; i < 8; i++) {
    lines.push(<line key={'h'+i} x1="0" y1={i*80} x2="600" y2={i*80} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>)
    lines.push(<line key={'v'+i} x1={i*80} y1="0" x2={i*80} y2="640" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>)
  }
  return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} preserveAspectRatio="xMidYMid slice" viewBox="0 0 600 640">
      {lines}
    </svg>
  )
}

function StationIllustration() {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none" style={{ filter:'drop-shadow(0 16px 40px rgba(0,0,0,0.35))' }}>
      <rect x="60" y="40" width="100" height="140" rx="12" fill="#1a3258"/>
      <rect x="60" y="40" width="100" height="140" rx="12" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5"/>
      <rect x="74" y="58" width="72" height="50" rx="6" fill="#0e2040"/>
      <rect x="74" y="58" width="72" height="50" rx="6" stroke={LP} strokeWidth="1" opacity="0.6"/>
      <rect x="74" y="58" width="72" height="50" rx="6" fill="url(#lpScreenGlow)" opacity="0.5"/>
      <path d="M112 68l-8 16h7l-6 14 14-20h-8l7-10z" fill={LP} opacity="0.9"/>
      <text x="110" y="101" textAnchor="middle" fontSize="9" fill={LP} fontWeight="700" opacity="0.8">87%</text>
      <rect x="74" y="116" width="22" height="7" rx="3" fill="rgba(255,255,255,0.1)"/>
      <rect x="99" y="116" width="22" height="7" rx="3" fill={LP} opacity="0.7"/>
      <rect x="124" y="116" width="22" height="7" rx="3" fill="rgba(255,255,255,0.1)"/>
      <rect x="88" y="134" width="44" height="24" rx="8" fill="#0e2040" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
      <circle cx="110" cy="146" r="7" stroke={LP} strokeWidth="1.5" fill="none" opacity="0.8"/>
      <circle cx="110" cy="146" r="2.5" fill={LP} opacity="0.6"/>
      <rect x="60" y="40" width="100" height="5" rx="2.5" fill={LP} opacity="0.7"/>
      <rect x="72" y="180" width="76" height="10" rx="5" fill="#112236"/>
      <rect x="82" y="190" width="56" height="6" rx="3" fill="#0d1c30"/>
      <path d="M155 148 Q180 148 180 170 Q180 196 160 196 L140 196" stroke="rgba(255,255,255,0.2)" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <rect x="125" y="192" width="18" height="8" rx="4" fill="#1a3258" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      <circle cx="80" cy="43" r="2.5" fill="#67c23a" opacity="0.9"/>
      <circle cx="88" cy="43" r="2.5" fill={LP} opacity="0.6"/>
      <defs>
        <linearGradient id="lpScreenGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={LP} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={LP} stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

function FloatCard({ style, children }) {
  return (
    <div style={{
      position:'absolute', background:'rgba(255,255,255,0.06)',
      backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.1)',
      borderRadius:10, padding:'10px 14px', ...style,
    }}>
      {children}
    </div>
  )
}

function LoginPage({ onLogin }) {
  const [form]    = antd.Form.useForm()
  const [loading, setLoading] = React.useState(false)
  const [shake,   setShake]   = React.useState(false)

  React.useEffect(() => {
    const saved = localStorage.getItem('admin_remember_account')
    if (saved) form.setFieldsValue({ account: saved, remember: true })
  }, [])

  function handleLogin(values) {
    const { account, password, remember } = values
    setLoading(true)
    if (remember) localStorage.setItem('admin_remember_account', account)
    else          localStorage.removeItem('admin_remember_account')
    setTimeout(() => {
      localStorage.setItem('admin_logged_in', '1')
      localStorage.setItem('admin_screen', 'dashboard')
      onLogin()
    }, 900)
  }

  function handleFailed() {
    setShake(true)
    setTimeout(() => setShake(false), 500)
  }

  const UserIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.8 3.6-6.5 8-6.5s8 2.7 8 6.5"/>
    </svg>
  )
  const LockIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden' }}>

      {/* ── 左侧品牌面板（保持不变） ── */}
      <div style={{
        width:'45%', flexShrink:0, background:LP_DARK,
        position:'relative', overflow:'hidden',
        display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
      }}>
        <GridLines/>
        <div style={{ position:'absolute', top:-80, right:-80, width:280, height:280, borderRadius:'50%', background:`radial-gradient(circle, ${LP}33 0%, transparent 70%)`, pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-60, left:-60, width:220, height:220, borderRadius:'50%', background:`radial-gradient(circle, #00d4ff22 0%, transparent 70%)`, pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:28, left:28, display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:9, background:LP, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize:16, fontWeight:700, color:'#fff', letterSpacing:0.5 }}>蓝鲨充电</div>
            <div style={{ fontSize:10.5, color:'rgba(255,255,255,0.38)', marginTop:1 }}>运营管理平台</div>
          </div>
        </div>
        <div style={{ position:'relative', zIndex:1, marginBottom:8 }}>
          <StationIllustration/>
          <FloatCard style={{ top:10, right:-72, minWidth:110 }}>
            <div style={{ fontSize:10, color:'rgba(255,255,255,0.5)', marginBottom:3 }}>今日充电收入</div>
            <div style={{ fontSize:18, fontWeight:700, color:'#fff', letterSpacing:-0.5 }}>¥ <span>24,381</span></div>
            <div style={{ fontSize:10, color:'#67c23a', marginTop:2, display:'flex', alignItems:'center', gap:2 }}>
              <svg width="8" height="7" viewBox="0 0 10 8" fill="#67c23a"><path d="M5 1l4 6H1l4-6z"/></svg>
              +8.3% 较昨日
            </div>
          </FloatCard>
          <FloatCard style={{ bottom:20, left:-68, minWidth:104 }}>
            <div style={{ fontSize:10, color:'rgba(255,255,255,0.5)', marginBottom:3 }}>在线设备</div>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <span style={{ fontSize:20, fontWeight:700, color:'#fff' }}>312</span>
              <span style={{ fontSize:11, color:'rgba(255,255,255,0.4)' }}>/ 340</span>
            </div>
            <div style={{ marginTop:5, height:3, borderRadius:2, background:'rgba(255,255,255,0.1)' }}>
              <div style={{ width:'91.7%', height:'100%', borderRadius:2, background:LP }}/>
            </div>
          </FloatCard>
        </div>
        <div style={{ position:'relative', zIndex:1, textAlign:'center', marginTop:20 }}>
          <div style={{ fontSize:20, fontWeight:700, color:'#fff', letterSpacing:1 }}>智慧充电，一站掌控</div>
          <div style={{ fontSize:13, color:'rgba(255,255,255,0.38)', marginTop:8, lineHeight:1.6 }}>实时监控 · 智能调度 · 数据驱动</div>
        </div>
      </div>

      {/* ── 右侧登录面板（antd Form） ── */}
      <div style={{ flex:1, background:'#f0f2f5', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
        <div style={{ width:'100%', maxWidth:400, animation: shake ? 'lpShake .45s ease' : 'none' }}>
          <antd.Card
            style={{ borderRadius:10, border:'1px solid #dcdfe6', boxShadow:'0 4px 24px rgba(0,21,41,0.07)' }}
            styles={{ body: { padding:'36px 36px 32px' } }}
          >
            <div style={{ marginBottom:28 }}>
              <h1 style={{ fontSize:22, fontWeight:700, color:'#303133', letterSpacing:0.3, margin:0 }}>账号登录</h1>
              <p style={{ fontSize:13, color:LP_TEXT_S, marginTop:6, marginBottom:0 }}>欢迎回来，请输入您的管理员凭据</p>
            </div>

            <antd.Form
              form={form}
              layout="vertical"
              onFinish={handleLogin}
              onFinishFailed={handleFailed}
              size="large"
            >
              <antd.Form.Item
                name="account"
                label={<span style={{ fontSize:13, fontWeight:500 }}>账号</span>}
                rules={[{ required: true, message: '请输入账号' }]}
              >
                <antd.Input
                  prefix={<UserIcon/>}
                  placeholder="请输入账号"
                />
              </antd.Form.Item>

              <antd.Form.Item
                name="password"
                label={<span style={{ fontSize:13, fontWeight:500 }}>密码</span>}
                rules={[{ required: true, message: '请输入密码' }]}
              >
                <antd.Input.Password
                  prefix={<LockIcon/>}
                  placeholder="请输入密码"
                />
              </antd.Form.Item>

              <antd.Form.Item style={{ marginBottom:24 }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <antd.Form.Item name="remember" valuePropName="checked" noStyle initialValue={false}>
                    <antd.Checkbox>
                      <span style={{ fontSize:13, color:LP_TEXT_S }}>记住账号</span>
                    </antd.Checkbox>
                  </antd.Form.Item>
                  <a href="#" onClick={e => e.preventDefault()}
                    style={{ fontSize:13, color:LP, textDecoration:'none' }}>
                    忘记密码？
                  </a>
                </div>
              </antd.Form.Item>

              <antd.Form.Item style={{ marginBottom:0 }}>
                <antd.Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  style={{ height:44, fontSize:15, fontWeight:600, letterSpacing:1, background:LP, borderColor:LP }}
                >
                  {loading ? '登录中…' : '登 录'}
                </antd.Button>
              </antd.Form.Item>
            </antd.Form>

            <antd.Alert
              style={{ marginTop:20 }}
              type="success"
              message={
                <span style={{ fontSize:12.5 }}>
                  <strong>演示账号：</strong>admin &nbsp;·&nbsp; <strong>密码：</strong>admin123
                </span>
              }
            />
          </antd.Card>

          <div style={{ textAlign:'center', marginTop:20, fontSize:12, color:'rgba(0,0,0,0.3)' }}>
            © 2026 蓝鲨充电科技有限公司 · 运营管理平台 v3.2
          </div>
        </div>
      </div>

      <style>{`
        @keyframes lpShake {
          0%,100%{ transform:translateX(0) }
          18%    { transform:translateX(-8px) }
          36%    { transform:translateX(7px) }
          54%    { transform:translateX(-5px) }
          72%    { transform:translateX(4px) }
        }
      `}</style>
    </div>
  )
}

Object.assign(window, { LoginPage })
