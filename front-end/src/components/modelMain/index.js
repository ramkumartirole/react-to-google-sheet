import React from 'react'
import Scene  from "../scene"
import FormSection from "../formSection"

export default function ModelMain() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
    {/* Left - Scene (3/4) */}
    <div style={{ flex: 3}}>
      <Scene />
    </div>

    {/* Right - Form (1/4) */}
    <div style={{ flex: 1, padding: '2rem', background: '#f3f3f3' }}>
      <FormSection />
    </div>
  </div>
  )
}
