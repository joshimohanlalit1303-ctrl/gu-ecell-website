const WORDS = ['Innovation','Pitch','Scale','Venture Capital','Build','Launch','Startup','Disrupt','Incubate','Fund','Network','Ideate']

export default function Ticker() {
  const items = [...WORDS, ...WORDS]
  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker-track">
        {items.map((w, i) => (
          <span key={i}>{i % 2 === 0 ? w : null}{i % 2 !== 0 ? null : <span className="ticker-dot" style={{marginLeft:28}}>✦</span>}</span>
        ))}
      </div>
    </div>
  )
}
