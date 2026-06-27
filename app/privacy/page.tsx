export default function PrivacyPage() {
  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
        <img src="/icon-128.png" alt="Vigil" style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
        <span style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '0.2em' }}>VIGIL</span>
      </div>
      <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '24px' }}>Privacy Policy</h1>
      <p style={{ color: '#888', marginBottom: '32px' }}>Last updated: June 27, 2026</p>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px' }}>1. Information We Collect</h2>
        <p style={{ color: '#aaa', lineHeight: 1.7 }}>When you subscribe to price alerts, we collect your email address and the product name you want to track. We do not collect payment information, browsing history, or any other personal data.</p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px' }}>2. How We Use Your Information</h2>
        <p style={{ color: '#aaa', lineHeight: 1.7 }}>Your email address is used solely to send you price drop alerts for products you have subscribed to. We do not sell, rent, or share your email address with third parties for marketing purposes.</p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px' }}>3. Affiliate Links</h2>
        <p style={{ color: '#aaa', lineHeight: 1.7 }}>Vigil uses affiliate links to earn commissions when you click through and make purchases. This does not affect the price you pay. Affiliate relationships are disclosed on all product pages.</p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px' }}>4. Data Storage</h2>
        <p style={{ color: '#aaa', lineHeight: 1.7 }}>Your email address is stored securely in our database. We retain it until you unsubscribe. You can request deletion at any time by emailing hello@vigildrop.com.</p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px' }}>5. Chrome Extension</h2>
        <p style={{ color: '#aaa', lineHeight: 1.7 }}>The Vigil Chrome extension reads product page data (name, price, URL) only on pages you explicitly visit. This data is processed locally and used only to enable price tracking. No browsing data is transmitted to our servers.</p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px' }}>6. Cookies</h2>
        <p style={{ color: '#aaa', lineHeight: 1.7 }}>Our website does not use tracking cookies. We may use essential cookies required for the site to function. We do not use analytics or advertising cookies.</p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px' }}>7. Your Rights</h2>
        <p style={{ color: '#aaa', lineHeight: 1.7 }}>You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at hello@vigildrop.com.</p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px' }}>8. Contact</h2>
        <p style={{ color: '#aaa', lineHeight: 1.7 }}>For privacy questions or data requests, contact us at hello@vigildrop.com</p>
      </section>
    </main>
  )
}
