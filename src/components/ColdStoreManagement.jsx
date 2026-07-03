import './DigitalFactory.css'

export default function ColdStoreManagement({ onBack }) {
  return (
    <section className="digital-factory" style={{paddingTop:60,paddingBottom:60}}>
      <div className="df-inner">
        <header className="df-header">
          <h2 className="df-heading">
            <span className="df-our">COLD STORE</span>
            <span className="df-title">Management</span>
            <span className="df-underline" aria-hidden></span>
            <span className="df-dot" aria-hidden></span>
          </h2>
          <p className="df-subtitle">Inventory tracking, pallet locations, stock movement, shipment control and cold storage monitoring.</p>
        </header>

        <div style={{maxWidth:980,margin:'0 auto',color:'#333'}}>
          <h3 style={{fontFamily:'Playfair Display, serif',color:'#111827'}}>Overview</h3>
          <p style={{color:'#666',lineHeight:1.8}}>This dedicated Cold Store Management dashboard provides pallet-level visibility, temperature monitoring, shipment scheduling, and audit-ready logs. It integrates with warehouse management systems and supports role-based operational views for handlers, supervisors, and logistics.</p>

          <h4 style={{marginTop:18,color:'#111827'}}>Key Capabilities</h4>
          <ul style={{color:'#666',lineHeight:1.8}}>
            <li>Pallet-level inventory with slot mapping and QR scanning</li>
            <li>Real-time temperature & humidity telemetry with alerting</li>
            <li>Stock movement history and FIFO management</li>
            <li>Shipment staging, allocations and dispatch control</li>
            <li>Audit trail, exportable reports, and role-based access</li>
          </ul>

          <div style={{marginTop:28}}>
            <button onClick={onBack} className="df-btn">Back to Platform</button>
          </div>
        </div>
      </div>
    </section>
  )
}
