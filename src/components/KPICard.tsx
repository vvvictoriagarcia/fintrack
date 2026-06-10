interface Props {
  label: string
  value: string
  sub?: string
  color?: string
  icon: React.ReactNode
}

export default function KPICard({ label, value, sub, color = '#3b82f6', icon }: Props) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${color}ee, ${color}99)`,
      borderRadius: 14,
      padding: '20px 24px',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      boxShadow: `0 4px 20px ${color}33`,
    }}>
      <div style={{ fontSize: 32, opacity: 0.9 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 26, fontWeight: 700 }}>{value}</div>
        {sub && <div style={{ fontSize: 11, opacity: 0.75, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  )
}
