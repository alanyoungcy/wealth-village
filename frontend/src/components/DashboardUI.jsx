import { useState, useEffect } from 'react'
import './DashboardUI.css'

export default function DashboardUI() {
  const [portfolioData, setPortfolioData] = useState(null)
  const [researchData, setResearchData] = useState(null)
  const [riskData, setRiskData] = useState(null)
  const [taxData, setTaxData] = useState(null)

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portfolio, research, risk, tax] = await Promise.all([
          fetch(`${API_BASE}/api/portfolio`).then(r => r.json()),
          fetch(`${API_BASE}/api/research`).then(r => r.json()),
          fetch(`${API_BASE}/api/risk`).then(r => r.json()),
          fetch(`${API_BASE}/api/tax`).then(r => r.json()),
        ])

        setPortfolioData(portfolio)
        setResearchData(research)
        setRiskData(risk)
        setTaxData(tax)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 5000)

    return () => clearInterval(interval)
  }, [])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="dashboard-overlay village-theme">
      {/* Title - Village Bank */}
      <div className="village-title">
        <h1>🏦 Virtual Wealth Village</h1>
        <p className="subtitle">Your Financial Adventure Awaits</p>
      </div>

      {/* Top Left - Portfolio */}
      <div className="panel village-panel top-left-panel">
        <h2>💰 Bank Vault</h2>
        {portfolioData && (
          <div className="panel-content">
            <div className="metric-large">
              <div className="value">{formatCurrency(portfolioData.totalValue)}</div>
              <div className={`change ${portfolioData.dailyChange >= 0 ? 'positive' : 'negative'}`}>
                {portfolioData.dailyChange >= 0 ? '↑' : '↓'} {Math.abs(portfolioData.dailyChange).toFixed(2)}%
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Top Right - Research */}
      <div className="panel village-panel top-right-panel">
        <h2>📊 Trading Post</h2>
        {researchData && (
          <div className="panel-content">
            <div className="market-sentiment">
              <div className="sentiment-bar">
                <div className="bull" style={{ width: `${researchData.marketTrends.bullish}%` }}>
                  🐂 {researchData.marketTrends.bullish}%
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Left - Risk */}
      <div className="panel village-panel bottom-left-panel">
        <h2>⚠️ Risk Watch</h2>
        {riskData && (
          <div className="panel-content">
            <div className="risk-score-container">
              <div className="risk-score">
                <div className="score-value">{riskData.riskScore.toFixed(1)}</div>
                <div className="score-label">Risk Score</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Right - Tax */}
      <div className="panel village-panel bottom-right-panel">
        <h2>📜 Tax Office</h2>
        {taxData && (
          <div className="panel-content">
            <div className="metric">
              <span>Tax Due</span>
              <span className="value">{formatCurrency(taxData.estimatedTax)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="dashboard-overlay village-theme">
      {/* Title - Village Bank */}
      <div className="village-title">
        <h1>🏦 Virtual Wealth Village</h1>
        <p className="subtitle">Your Financial Adventure Awaits</p>
      </div>

      {/* Top Left - Portfolio */}
      <div className="panel village-panel top-left-panel">
        <h2>💰 Bank Vault</h2>
        {portfolioData && (
          <div className="panel-content">
            <div className="metric-large">
              <div className="value">{formatCurrency(portfolioData.totalValue)}</div>
              <div className={`change ${portfolioData.dailyChange >= 0 ? 'positive' : 'negative'}`}>
                {portfolioData.dailyChange >= 0 ? '↑' : '↓'} {Math.abs(portfolioData.dailyChange).toFixed(2)}%
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Top Right - Research */}
      <div className="panel village-panel top-right-panel">
        <h2>📊 Trading Post</h2>
        {researchData && (
          <div className="panel-content">
            <div className="market-sentiment">
              <div className="sentiment-bar">
                <div className="bull" style={{ width: `${researchData.marketTrends.bullish}%` }}>
                  🐂 {researchData.marketTrends.bullish}%
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Left - Risk */}
      <div className="panel village-panel bottom-left-panel">
        <h2>⚠️ Risk Watch</h2>
        {riskData && (
          <div className="panel-content">
            <div className="risk-score-container">
              <div className="risk-score">
                <div className="score-value">{riskData.riskScore.toFixed(1)}</div>
                <div className="score-label">Risk Score</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Right - Tax */}
      <div className="panel village-panel bottom-right-panel">
        <h2>📜 Tax Office</h2>
        {taxData && (
          <div className="panel-content">
            <div className="metric">
              <span>Tax Due</span>
              <span className="value">{formatCurrency(taxData.estimatedTax)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

