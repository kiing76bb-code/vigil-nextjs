export default function Loading() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .skel { animation: pulse 1.4s ease-in-out infinite; background: #f0f0f0; border-radius: 6px; }
        .deal-load-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          max-width: 900px;
          margin: 0 auto;
          padding: 32px 20px;
        }
        @media (max-width: 768px) {
          .deal-load-grid { grid-template-columns: 1fr; gap: 24px; }
        }
      `}</style>

      {/* Nav skeleton */}
      <div style={{ background: '#0a0a0a', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ color: '#fff', fontWeight: '900', letterSpacing: '0.2em', fontSize: '1.1rem' }}>VIGIL</div>
        <span style={{ color: '#444' }}>›</span>
        <div className="skel" style={{ width: '48px', height: '14px', background: '#222' }} />
        <span style={{ color: '#444' }}>›</span>
        <div className="skel" style={{ width: '120px', height: '14px', background: '#222' }} />
      </div>

      <div className="deal-load-grid">

        {/* Left — image skeleton */}
        <div className="skel" style={{ aspectRatio: '1', borderRadius: '16px', width: '100%' }} />

        {/* Right — details skeleton */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '4px' }}>
          {/* Badge */}
          <div className="skel" style={{ width: '120px', height: '24px', borderRadius: '999px' }} />
          {/* Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="skel" style={{ height: '28px', width: '100%' }} />
            <div className="skel" style={{ height: '28px', width: '75%' }} />
          </div>
          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="skel" style={{ width: '100px', height: '44px', borderRadius: '8px' }} />
            <div className="skel" style={{ width: '60px', height: '24px', borderRadius: '8px' }} />
            <div className="skel" style={{ width: '72px', height: '28px', borderRadius: '999px' }} />
          </div>
          {/* Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="skel" style={{ height: '16px', width: '100%' }} />
            <div className="skel" style={{ height: '16px', width: '90%' }} />
            <div className="skel" style={{ height: '16px', width: '70%' }} />
          </div>
          {/* Buy button */}
          <div className="skel" style={{ height: '52px', borderRadius: '10px', width: '100%' }} />
          {/* Alert form */}
          <div className="skel" style={{ height: '100px', borderRadius: '10px', width: '100%' }} />
          {/* Share buttons */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[80, 90, 60, 80, 80].map((w, i) => (
              <div key={i} className="skel" style={{ width: `${w}px`, height: '32px', borderRadius: '8px' }} />
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
