// @component LoginPage
const LP = '#2E5BFF'
const LP_H = '#5A7CFF'
const LP_DARK = '#0c1929'
const LP_TEXT_P = '#303133'
const LP_TEXT_S = '#606266'
const LP_TEXT_PH = '#c0c4cc'
const LP_BORDER = '#dcdfe6'
const LP_BODY_BG = '#f0f2f5'

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

function LoginInput({ label, type, placeholder, value, onChange, icon, rightEl, error }) {
  const [focused, setFocused] = React.useState(false)
  return (
    <div style={{ marginBottom: error ? 6 : 20 }}>
      <label style={{ display:'block', fontSize:13, color:LP_TEXT_S, marginBottom:6, fontWeight:500 }}>{label}</label>
      <div style={{
        display:'flex', alignItems:'center',
        height:42, borderRadius:6, border:`1px solid ${focused ? LP : error ? '#f56c6c' : LP_BORDER}`,
        background:'#fff', boxShadow: focused ? `0 0 0 2px ${LP}22` : 'none',
        transition:'border .15s, box-shadow .15s', overflow:'hidden',
      }}>
        <div style={{ padding:'0 10px 0 12px', color: focused ? LP : LP_TEXT_PH, flexShrink:0, display:'flex', transition:'color .15s' }}>
          {icon}
        </div>
        <input
          type={type || 'text'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex:1, border:'none', outline:'none', fontSize:14,
            color:LP_TEXT_P, background:'transparent',
            padding: rightEl ? '0 4px 0 0' : '0 12px 0 0',
          }}
        />
        {rightEl && <div style={{ padding:'0 12px 0 0', flexShrink:0, cursor:'pointer' }}>{rightEl}</div>}
      </div>
      {error && <div style={{ fontSize:12, color:'#f56c6c', marginTop:4 }}>{error}</div>}
    </div>
  )
}

function LoginSpinner() {
  return (
    <div style={{
      width:16, height:16, borderRadius:'50%',
      border:'2px solid rgba(255,255,255,0.3)',
      borderTopColor:'#fff',
      animation:'lpSpin .7s linear infinite',
      flexShrink:0,
    }}/>
  )
}

function LoginPage({ onLogin }) {
  const [account,  setAccount]  = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPwd,  setShowPwd]  = React.useState(false)
  const [remember, setRemember] = React.useState(false)
  const [loading,  setLoading]  = React.useState(false)
  const [errors,   setErrors]   = React.useState({})
  const [shake,    setShake]    = React.useState(false)

  React.useEffect(() => {
    const saved = localStorage.getItem('admin_remember_account')
    if (saved) { setAccount(saved); setRemember(true) }
  }, [])

  function validate() {
    const e = {}
    if (!account.trim())  e.account  = '请输入账号'
    if (!password.trim()) e.password = '请输入密码'
    return e
  }

  function handleLogin(e) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); triggerShake(); return }

    const valid = (account === 'admin' && password === 'admin123') ||
                  (account.trim().length > 0 && password.trim().length > 0)
    if (!valid) {
      setErrors({ password: '账号或密码错误，请重试' })
      triggerShake()
      return
    }

    setErrors({})
    setLoading(true)
    if (remember) localStorage.setItem('admin_remember_account', account)
    else          localStorage.removeItem('admin_remember_account')

    setTimeout(() => {
      localStorage.setItem('admin_logged_in', '1')
      localStorage.setItem('admin_screen', 'dashboard')
      onLogin()
    }, 900)
  }

  function triggerShake() {
    setShake(true)
    setTimeout(() => setShake(false), 500)
  }

  const EyeIcon = ({ open }) => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={LP_TEXT_PH} strokeWidth="1.6" strokeLinecap="round">
      {open
        ? <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
        : <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
      }
    </svg>
  )

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden' }}>
      {/* ── Left branding panel ── */}
      <div style={{
        width:'45%', flexShrink:0, background:LP_DARK,
        position:'relative', overflow:'hidden',
        display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
      }}>
        <GridLines/>
        <div style={{
          position:'absolute', top:-80, right:-80,
          width:280, height:280, borderRadius:'50%',
          background:`radial-gradient(circle, ${LP}33 0%, transparent 70%)`,
          pointerEvents:'none',
        }}/>
        <div style={{
          position:'absolute', bottom:-60, left:-60,
          width:220, height:220, borderRadius:'50%',
          background:`radial-gradient(circle, #00d4ff22 0%, transparent 70%)`,
          pointerEvents:'none',
        }}/>
        <div style={{
          position:'absolute', top:28, left:28,
          display:'flex', alignItems:'center', gap:10,
        }}>
          <div style={{
            width:36, height:36, borderRadius:9, background:LP,
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
          }}>
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
          <div style={{ fontSize:13, color:'rgba(255,255,255,0.38)', marginTop:8, lineHeight:1.6 }}>
            实时监控 · 智能调度 · 数据驱动
          </div>
        </div>
      </div>

      {/* ── Right login panel ── */}
      <div style={{
        flex:1, background:LP_BODY_BG,
        display:'flex', alignItems:'center', justifyContent:'center',
        padding:24,
      }}>
        <div style={{
          width:'100%', maxWidth:400,
          animation: shake ? 'lpShake .45s ease' : 'none',
        }}>
          <div style={{
            background:'#fff', borderRadius:10,
            border:`1px solid ${LP_BORDER}`,
            boxShadow:'0 4px 24px rgba(0,21,41,0.07)',
            padding:'36px 36px 32px',
          }}>
            <div style={{ marginBottom:28 }}>
              <h1 style={{ fontSize:22, fontWeight:700, color:LP_TEXT_P, letterSpacing:0.3 }}>账号登录</h1>
              <p style={{ fontSize:13, color:LP_TEXT_S, marginTop:6 }}>欢迎回来，请输入您的管理员凭据</p>
            </div>

            <form onSubmit={handleLogin} noValidate>
              <LoginInput
                label="账号"
                placeholder="请输入账号"
                value={account}
                onChange={e => { setAccount(e.target.value); setErrors(v => ({...v, account:null})) }}
                error={errors.account}
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.8 3.6-6.5 8-6.5s8 2.7 8 6.5"/>
                  </svg>
                }
              />
              <LoginInput
                label="密码"
                type={showPwd ? 'text' : 'password'}
                placeholder="请输入密码"
                value={password}
                onChange={e => { setPassword(e.target.value); setErrors(v => ({...v, password:null})) }}
                error={errors.password}
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                }
                rightEl={
                  <div onClick={() => setShowPwd(v => !v)}>
                    <EyeIcon open={showPwd}/>
                  </div>
                }
              />

              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24, marginTop:-4 }}>
                <label style={{ display:'flex', alignItems:'center', gap:7, cursor:'pointer', userSelect:'none' }}>
                  <div
                    onClick={() => setRemember(v => !v)}
                    style={{
                      width:16, height:16, borderRadius:3, flexShrink:0,
                      border:`1.5px solid ${remember ? LP : LP_BORDER}`,
                      background: remember ? LP : '#fff',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      transition:'all .15s',
                    }}
                  >
                    {remember && (
                      <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                        <path d="M1 3.5l2.5 2.5 5.5-5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span style={{ fontSize:13, color:LP_TEXT_S }}>记住账号</span>
                </label>
                <a href="#" onClick={e => e.preventDefault()} style={{ fontSize:13, color:LP, textDecoration:'none' }}
                  onMouseEnter={e => e.target.style.textDecoration='underline'}
                  onMouseLeave={e => e.target.style.textDecoration='none'}
                >忘记密码？</a>
              </div>

              <button type="submit" disabled={loading} style={{
                width:'100%', height:44, borderRadius:6,
                background: loading ? LP+'99' : LP,
                color:'#fff', border:'none', fontSize:15, fontWeight:600,
                cursor: loading ? 'not-allowed' : 'pointer',
                display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                transition:'background .15s, transform .1s',
                letterSpacing:1,
              }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = LP_H }}
                onMouseLeave={e => { if (!loading) e.currentTarget.style.background = LP }}
                onMouseDown={e  => { if (!loading) e.currentTarget.style.transform = 'scale(0.985)' }}
                onMouseUp={e    => { e.currentTarget.style.transform = 'scale(1)' }}
              >
                {loading ? <><LoginSpinner/> 登录中…</> : '登 录'}
              </button>
            </form>

            <div style={{
              marginTop:20, padding:'10px 14px', borderRadius:6,
              background:'#f0f9eb', border:'1px solid #c2e7b0',
              fontSize:12.5, color:'#529b2e', lineHeight:1.6,
            }}>
              <strong>演示账号：</strong>admin &nbsp;·&nbsp; <strong>密码：</strong>admin123
            </div>
          </div>

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
        @keyframes lpSpin { to { transform:rotate(360deg) } }
      `}</style>
    </div>
  )
}

Object.assign(window, { LoginPage })
