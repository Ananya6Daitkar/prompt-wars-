import { motion } from 'framer-motion'

const screens = [
  {
    id: 'home', title: 'Event Overview', color: '#00d9ff',
    content: (
      <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ textAlign: 'center', marginBottom: 4 }}>
          <div style={{ color: '#f0f4ff', fontSize: 11, fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }}>Champions League Final</div>
          <div style={{ color: 'rgba(240,244,255,0.4)', fontSize: 9, fontFamily: 'Inter, sans-serif' }}>Tonight · 20:45 · Wembley</div>
        </div>
        <div style={{ background: 'rgba(0,217,255,0.08)', border: '1px solid rgba(0,217,255,0.2)', borderRadius: 8, padding: '8px 10px' }}>
          <div style={{ color: 'rgba(240,244,255,0.4)', fontSize: 9, fontFamily: 'Inter, sans-serif', marginBottom: 2 }}>Your Gate</div>
          <div style={{ color: '#00d9ff', fontSize: 13, fontWeight: 800, fontFamily: 'Montserrat, sans-serif' }}>Gate C — East</div>
          <div style={{ color: 'rgba(240,244,255,0.45)', fontSize: 9, fontFamily: 'Inter, sans-serif' }}>8 min wait · Recommended</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
          {[{ l: 'Seat', v: 'Block 114', c: '#f0f4ff' }, { l: 'Fans', v: '18,420', c: '#00ff88' }].map(i => (
            <div key={i.l} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '7px 8px' }}>
              <div style={{ color: 'rgba(240,244,255,0.35)', fontSize: 9, fontFamily: 'Inter, sans-serif' }}>{i.l}</div>
              <div style={{ color: i.c, fontSize: 12, fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }}>{i.v}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(0,217,255,0.1)', border: '1px solid rgba(0,217,255,0.2)', borderRadius: 8, padding: '7px 10px' }}>
          <div style={{ color: '#00d9ff', fontSize: 10, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>→ Navigate to Gate C</div>
        </div>
      </div>
    ),
  },
  {
    id: 'gate', title: 'Gate Recommendation', color: '#00ff88',
    content: (
      <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ color: '#f0f4ff', fontSize: 11, fontWeight: 700, fontFamily: 'Montserrat, sans-serif', marginBottom: 4 }}>Entry Gates</div>
        {[{ n: 'Gate C', w: 8, rec: true }, { n: 'Gate G', w: 11 }, { n: 'Gate D', w: 15 }, { n: 'Gate B', w: 28 }].map(g => (
          <div key={g.n} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 9px', borderRadius: 8, background: g.rec ? 'rgba(0,255,136,0.08)' : 'rgba(255,255,255,0.04)', border: g.rec ? '1px solid rgba(0,255,136,0.22)' : '1px solid transparent' }}>
            <div>
              <div style={{ color: '#f0f4ff', fontSize: 11, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{g.n}</div>
              {g.rec && <div style={{ color: '#00ff88', fontSize: 9, fontFamily: 'Inter, sans-serif' }}>Best option</div>}
            </div>
            <div style={{ color: g.w < 12 ? '#00ff88' : g.w < 20 ? '#f59e0b' : '#f43f5e', fontSize: 12, fontWeight: 800, fontFamily: 'Montserrat, sans-serif' }}>{g.w}m</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'map', title: 'Live Venue Map', color: '#b366ff',
    content: (
      <div style={{ padding: '6px 8px' }}>
        <div style={{ color: '#f0f4ff', fontSize: 11, fontWeight: 700, fontFamily: 'Montserrat, sans-serif', marginBottom: 6 }}>Venue Map</div>
        <svg viewBox="0 0 160 130" style={{ width: '100%' }}>
          <ellipse cx="80" cy="65" rx="72" ry="58" fill="#0f1535" stroke="#00d9ff" strokeWidth="0.8" strokeOpacity="0.3" />
          <ellipse cx="80" cy="65" rx="50" ry="38" fill="#00ff88" fillOpacity="0.04" stroke="#00ff88" strokeWidth="0.5" strokeOpacity="0.2" />
          {[{ cx:80,cy:20,c:'#f43f5e' },{ cx:80,cy:110,c:'#f59e0b' },{ cx:140,cy:65,c:'#00ff88' },{ cx:20,cy:65,c:'#00ff88' }].map((z,i) => (
            <motion.circle key={i} cx={z.cx} cy={z.cy} r="8" fill={z.c} fillOpacity="0.2" stroke={z.c} strokeWidth="0.8"
              animate={{ r:[8,11,8] }} transition={{ duration:2, repeat:Infinity, delay:i*0.5 }} />
          ))}
          <motion.path d="M 20 65 Q 50 65 80 65" stroke="#00d9ff" strokeWidth="1.5" fill="none" strokeDasharray="4 3"
            initial={{ pathLength:0 }} animate={{ pathLength:1 }} transition={{ duration:1.5, repeat:Infinity, repeatDelay:1 }} />
          {[{x:80,y:7},{x:148,y:65},{x:80,y:123},{x:12,y:65}].map((g,i) => (
            <circle key={i} cx={g.x} cy={g.y} r="3" fill="#00d9ff" />
          ))}
        </svg>
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          {[{ c:'#00ff88',l:'Low' },{ c:'#f59e0b',l:'Med' },{ c:'#f43f5e',l:'High' }].map(i => (
            <div key={i.l} style={{ display:'flex', alignItems:'center', gap:3 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:i.c }} />
              <span style={{ color:'rgba(240,244,255,0.35)', fontSize:9, fontFamily:'Inter, sans-serif' }}>{i.l}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'queue', title: 'Concession Lines', color: '#f59e0b',
    content: (
      <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ color: '#f0f4ff', fontSize: 11, fontWeight: 700, fontFamily: 'Montserrat, sans-serif', marginBottom: 4 }}>Nearest Concessions</div>
        {[{ n:'Stand C2 — Level 1', w:22 },{ n:'Stand B4 — Level 2', w:8, alt:true },{ n:'East Wing Kiosk', w:5, alt:true }].map(q => (
          <div key={q.n} style={{ padding:'8px 9px', borderRadius:8, background: q.alt ? 'rgba(0,255,136,0.06)' : 'rgba(255,255,255,0.04)', border: q.alt ? '1px solid rgba(0,255,136,0.18)' : '1px solid transparent' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ color:'#f0f4ff', fontSize:10, fontFamily:'Inter, sans-serif' }}>{q.n}</div>
              <div style={{ color: q.w>15?'#f43f5e':q.w>8?'#f59e0b':'#00ff88', fontSize:11, fontWeight:800, fontFamily:'Montserrat, sans-serif' }}>{q.w}m</div>
            </div>
            {q.alt && <div style={{ color:'#00ff88', fontSize:9, fontFamily:'Inter, sans-serif', marginTop:2 }}>Recommended</div>}
          </div>
        ))}
        <div style={{ background:'rgba(0,217,255,0.08)', border:'1px solid rgba(0,217,255,0.2)', borderRadius:8, padding:'7px 9px' }}>
          <div style={{ color:'#00d9ff', fontSize:10, fontWeight:600, fontFamily:'Inter, sans-serif' }}>Order ahead — skip the queue →</div>
        </div>
      </div>
    ),
  },
  {
    id: 'order', title: 'Order Ahead', color: '#00ff88',
    content: (
      <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ color: '#f0f4ff', fontSize: 11, fontWeight: 700, fontFamily: 'Montserrat, sans-serif', marginBottom: 4 }}>Order Ahead</div>
        {[{ n:'Classic Burger', p:'£9', t:'8 min' },{ n:'Hot Dog', p:'£6', t:'5 min' },{ n:'Nachos', p:'£7', t:'6 min' }].map(item => (
          <div key={item.n} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 9px', borderRadius:8, background:'rgba(255,255,255,0.04)' }}>
            <div>
              <div style={{ color:'#f0f4ff', fontSize:11, fontWeight:600, fontFamily:'Inter, sans-serif' }}>{item.n}</div>
              <div style={{ color:'rgba(240,244,255,0.35)', fontSize:9, fontFamily:'Inter, sans-serif' }}>Ready in {item.t}</div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <span style={{ color:'rgba(240,244,255,0.55)', fontSize:11, fontFamily:'Inter, sans-serif' }}>{item.p}</span>
              <button style={{ background:'rgba(0,217,255,0.15)', color:'#00d9ff', border:'none', borderRadius:6, padding:'3px 8px', fontSize:9, fontWeight:700, cursor:'pointer' }}>Add</button>
            </div>
          </div>
        ))}
        <div style={{ background:'rgba(0,255,136,0.1)', border:'1px solid rgba(0,255,136,0.25)', borderRadius:8, padding:'8px 10px' }}>
          <div style={{ color:'#00ff88', fontSize:11, fontWeight:700, fontFamily:'Montserrat, sans-serif' }}>Cart: 1 item · £9</div>
          <div style={{ color:'rgba(0,255,136,0.6)', fontSize:9, fontFamily:'Inter, sans-serif' }}>Pickup: Stand B4 · 8 min</div>
        </div>
      </div>
    ),
  },
  {
    id: 'restroom', title: 'Restroom Finder', color: '#00d9ff',
    content: (
      <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ color: '#f0f4ff', fontSize: 11, fontWeight: 700, fontFamily: 'Montserrat, sans-serif', marginBottom: 4 }}>Nearest Restrooms</div>
        {[{ n:'North — Level 1', w:18, d:'2 min walk' },{ n:'East — Level 2', w:4, d:'3 min walk', rec:true },{ n:'West — Level 1', w:6, d:'4 min walk', rec:true }].map(r => (
          <div key={r.n} style={{ padding:'8px 9px', borderRadius:8, background: r.rec ? 'rgba(0,217,255,0.06)' : 'rgba(255,255,255,0.04)', border: r.rec ? '1px solid rgba(0,217,255,0.18)' : '1px solid transparent' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div style={{ color:'#f0f4ff', fontSize:10, fontFamily:'Inter, sans-serif' }}>{r.n}</div>
                <div style={{ color:'rgba(240,244,255,0.35)', fontSize:9, fontFamily:'Inter, sans-serif' }}>{r.d}</div>
              </div>
              <div style={{ color: r.w>12?'#f43f5e':r.w>6?'#f59e0b':'#00ff88', fontSize:11, fontWeight:800, fontFamily:'Montserrat, sans-serif' }}>{r.w}m</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'exit', title: 'Exit Routing', color: '#b366ff',
    content: (
      <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:4 }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'#00ff88', display:'inline-block', animation:'pulse 2s infinite' }} />
          <div style={{ color:'#f0f4ff', fontSize:11, fontWeight:700, fontFamily:'Montserrat, sans-serif' }}>Post-Game Exit</div>
        </div>
        {[{ n:'Exit A — North', t:25, d:'Blocked', c:'#f43f5e' },{ n:'Exit B — East', t:12, d:'Busy', c:'#f59e0b' },{ n:'Exit C — West', t:4, d:'Clear', c:'#00ff88', rec:true }].map(e => (
          <div key={e.n} style={{ padding:'8px 9px', borderRadius:8, background: e.rec ? 'rgba(0,255,136,0.06)' : 'rgba(255,255,255,0.04)', border: e.rec ? '1px solid rgba(0,255,136,0.22)' : '1px solid transparent' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div style={{ color:'#f0f4ff', fontSize:10, fontWeight:600, fontFamily:'Inter, sans-serif' }}>{e.n}</div>
                <div style={{ color:e.c, fontSize:9, fontFamily:'Inter, sans-serif' }}>{e.d}</div>
              </div>
              <div style={{ color:e.c, fontSize:11, fontWeight:800, fontFamily:'Montserrat, sans-serif' }}>{e.t}m</div>
            </div>
            {e.rec && <div style={{ color:'#00ff88', fontSize:9, fontFamily:'Inter, sans-serif', marginTop:2 }}>→ Fastest route active</div>}
          </div>
        ))}
      </div>
    ),
  },
]

function Phone({ screen, i }: { screen: typeof screens[0]; i: number }) {
  return (
    <motion.div
      whileHover={{ scale: 1.06, y: -10 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      style={{ flexShrink: 0, width: 158, transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)` }}
    >
      <div style={{
        borderRadius: 30, border: '2px solid rgba(255,255,255,0.12)',
        background: '#0a0e27', overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
      }}>
        {/* Notch */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 4px' }}>
          <div style={{ width: 60, height: 16, background: '#000', borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
            <div style={{ width: 20, height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.08)' }} />
          </div>
        </div>
        {/* Screen */}
        <div style={{ background: '#0a0e27', minHeight: 260 }}>
          {/* Status bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 12px 4px' }}>
            <span style={{ color: 'rgba(240,244,255,0.4)', fontSize: 9, fontFamily: 'Inter, sans-serif' }}>9:41</span>
            <div style={{ width: 24, height: 10, border: '1px solid rgba(255,255,255,0.25)', borderRadius: 3, display: 'flex', alignItems: 'center', padding: '1px 2px' }}>
              <div style={{ width: '70%', height: '100%', background: '#00ff88', borderRadius: 2 }} />
            </div>
          </div>
          {/* App header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px 8px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ width: 16, height: 16, borderRadius: 5, background: 'rgba(0,217,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00d9ff' }} />
            </div>
            <span style={{ color: '#00d9ff', fontSize: 10, fontWeight: 800, fontFamily: 'Montserrat, sans-serif' }}>CrowdIQ</span>
          </div>
          {screen.content}
        </div>
        {/* Home bar */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0', background: '#0a0e27' }}>
          <div style={{ width: 40, height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 99 }} />
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: 12, color: 'rgba(240,244,255,0.45)', fontSize: 11, fontFamily: 'Inter, sans-serif' }}>{screen.title}</div>
    </motion.div>
  )
}

export default function MobileShowcase() {
  return (
    <section id="mobile" style={{ padding: '96px 0', background: '#0a0e27', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div className="orb-violet" style={{ width: 700, height: 500, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(179,102,255,0.08)', border: '1px solid rgba(179,102,255,0.2)', borderRadius: 999, padding: '6px 16px', marginBottom: 20 }}>
            <span style={{ color: '#b366ff', fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Mobile App</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 14 }}>In every fan's pocket</h2>
          <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: 17, fontFamily: 'Inter, sans-serif', maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>
            A native-quality experience that works from parking lot to final whistle.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 20, paddingTop: 10, scrollbarWidth: 'none' }}
          className="scrollbar-hide">
          {screens.map((s, i) => <Phone key={s.id} screen={s} i={i} />)}
        </motion.div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }`}</style>
    </section>
  )
}
