export default function TermsPage() {
  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
        <img src="/icon-128.png" alt="Vigil" style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
        <span style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '0.2em' }}>VIGIL</span>
      </div>
      <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '24px' }}>Terms of Service</h1>
      <p style={{ color: '#888', marginBottom: '32px' }}>Last updated: June 27, 2026</p>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px' }}>1. Acceptance of Terms</h2>
        <p style={{ color: '#aaa', lineHeight: 1.7 }}>By using Vigil (&quot;the Service&quot;), you agree to these Terms of Service. If you do not agree, do not use the Service.</p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px' }}>2. Description of Service</h2>
        <p style={{ color: '#aaa', lineHeight: 1.7 }}>Vigil is a price-tracking and alert platform that monitors product prices across online retailers and notifies users when prices drop to their target levels.</p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px' }}>3. Affiliate Disclosure</h2>
        <p style={{ color: '#aaa', lineHeight: 1.7 }}>Vigil earns affiliate commissions when users click product links and make purchases. This is how we keep the service free. Affiliate links are clearly disclosed on all product pages.</p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px' }}>4. User Responsibilities</h2>
        <p style={{ color: '#aaa', lineHeight: 1.7 }}>You agree to use the Service only for lawful purposes. You may not misuse the Service, attempt to gain unauthorized access, or use automated tools to scrape our data.</p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px' }}>5. Disclaimer of Warranties</h2>
        <p style={{ color: '#aaa', lineHeight: 1.7 }}>The Service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee price accuracy or alert delivery times. Price data is sourced from third-party retailers and may vary.</p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px' }}>6. Limitation of Liability</h2>
        <p style={{ color: '#aaa', lineHeight: 1.7 }}>Vigil shall not be liable for any indirect, incidental, or consequential damages arising from use of the Service.</p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px' }}>7. Changes to Terms</h2>
        <p style={{ color: '#aaa', lineHeight: 1.7 }}>We may update these Terms at any time. Continued use of the Service after changes constitutes acceptance of the new Terms.</p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px' }}>8. Contact</h2>
        <p style={{ color: '#aaa', lineHeight: 1.7 }}>For questions about these Terms, contact us at hello@vigildrop.com</p>
      </section>
    </main>
  )
}
