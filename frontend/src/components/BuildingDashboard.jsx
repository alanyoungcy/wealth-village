import { useState, useEffect } from 'react'
import './BuildingDashboard.css'

export default function BuildingDashboard({ building, onClose }) {
  const [data, setData] = useState(null)
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/${building.dataType}`)
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('Error fetching building data:', error)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 3000)

    return () => clearInterval(interval)
  }, [building.dataType])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const renderPortfolioData = () => {
    if (!data) return null

    return (
      <div className="dashboard-content">
        <div className="hero-metric">
          <div className="hero-label">Total Portfolio Value</div>
          <div className="hero-value">{formatCurrency(data.totalValue)}</div>
          <div className={`hero-change ${data.dailyChange >= 0 ? 'positive' : 'negative'}`}>
            {data.dailyChange >= 0 ? '↑' : '↓'} {Math.abs(data.dailyChange).toFixed(2)}% today
          </div>
        </div>

        <div className="section-title">Asset Allocation</div>
        <div className="assets-grid">
          {data.assets.map((asset, i) => (
            <div key={i} className="asset-card">
              <div className="asset-name">{asset.name}</div>
              <div className="asset-details">
                <div className="asset-value">{formatCurrency(asset.value)}</div>
                <div className="asset-allocation">{asset.allocation}% of portfolio</div>
              </div>
              <div className={`asset-change ${asset.change >= 0 ? 'positive' : 'negative'}`}>
                {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>

        <div className="section-title">Performance History</div>
        <div className="performance-chart">
          {data.performance.map((point, i) => (
            <div key={i} className="chart-bar">
              <div
                className="bar"
                style={{
                  height: `${(point.value / data.totalValue) * 100}%`,
                  backgroundColor: '#10b981'
                }}
              />
              <div className="bar-label">{point.month}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderResearchData = () => {
    if (!data) return null

    return (
      <div className="dashboard-content">
        <div className="section-title">Market Analysis</div>
        <div className="sentiment-display">
          <div className="sentiment-item bullish">
            <div className="sentiment-icon">🐂</div>
            <div className="sentiment-label">Bullish</div>
            <div className="sentiment-value">{data.marketTrends.bullish}%</div>
          </div>
          <div className="sentiment-item bearish">
            <div className="sentiment-icon">🐻</div>
            <div className="sentiment-label">Bearish</div>
            <div className="sentiment-value">{data.marketTrends.bearish}%</div>
          </div>
          <div className="sentiment-item neutral">
            <div className="sentiment-icon">➖</div>
            <div className="sentiment-label">Neutral</div>
            <div className="sentiment-value">{data.marketTrends.neutral}%</div>
          </div>
        </div>

        <div className="section-title">Top Recommendations</div>
        <div className="recommendations-list">
          {data.recommendations.map((rec, i) => (
            <div key={i} className="recommendation-card">
              <div className="rec-header">
                <div className="rec-symbol">{rec.symbol}</div>
                <div className={`rec-rating rating-${rec.rating.toLowerCase().replace(' ', '-')}`}>
                  {rec.rating}
                </div>
              </div>
              <div className="rec-name">{rec.name}</div>
              <div className="rec-prices">
                <div className="price-item">
                  <span>Current:</span>
                  <span>${rec.currentPrice.toFixed(2)}</span>
                </div>
                <div className="price-item">
                  <span>Target:</span>
                  <span>${rec.targetPrice.toFixed(2)}</span>
                </div>
              </div>
              <div className="rec-analyst">Analyst: {rec.analyst}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderRiskData = () => {
    if (!data) return null

    return (
      <div className="dashboard-content">
        <div className="risk-overview">
          <div className="risk-score-large">
            <div className="risk-score-value">{data.riskScore.toFixed(1)}</div>
            <div className="risk-score-label">Risk Score (out of {data.maxRiskScore})</div>
          </div>
          <div className="risk-metrics-grid">
            <div className="metric-card">
              <div className="metric-label">Volatility</div>
              <div className="metric-value">{data.volatility.toFixed(1)}%</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Sharpe Ratio</div>
              <div className="metric-value">{data.sharpeRatio.toFixed(2)}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Beta</div>
              <div className="metric-value">{data.beta.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="section-title">Value at Risk (VaR)</div>
        <div className="var-grid">
          <div className="var-card">
            <div className="var-period">1 Day</div>
            <div className="var-value">{formatCurrency(data.varMetrics.oneDay)}</div>
          </div>
          <div className="var-card">
            <div className="var-period">1 Week</div>
            <div className="var-value">{formatCurrency(data.varMetrics.oneWeek)}</div>
          </div>
          <div className="var-card">
            <div className="var-period">1 Month</div>
            <div className="var-value">{formatCurrency(data.varMetrics.oneMonth)}</div>
          </div>
        </div>

        <div className="section-title">Risk Factors</div>
        <div className="risk-factors">
          {data.riskFactors.map((factor, i) => (
            <div key={i} className="risk-factor-item">
              <div className="factor-name">{factor.factor}</div>
              <div className="factor-bar">
                <div
                  className="factor-fill"
                  style={{
                    width: `${(factor.level / 10) * 100}%`,
                    backgroundColor: factor.color
                  }}
                />
              </div>
              <div className="factor-level">{factor.level.toFixed(1)}/10</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderTaxData = () => {
    if (!data) return null

    return (
      <div className="dashboard-content">
        <div className="tax-summary">
          <div className="tax-card">
            <div className="tax-label">Taxable Income</div>
            <div className="tax-value">{formatCurrency(data.taxableIncome)}</div>
          </div>
          <div className="tax-card">
            <div className="tax-label">Estimated Tax</div>
            <div className="tax-value danger">{formatCurrency(data.estimatedTax)}</div>
          </div>
          <div className="tax-card highlight">
            <div className="tax-label">Potential Savings</div>
            <div className="tax-value success">{formatCurrency(data.taxSavings.potential)}</div>
          </div>
        </div>

        <div className="section-title">Capital Gains</div>
        <div className="gains-grid">
          <div className="gains-card">
            <div className="gains-type">Short-term</div>
            <div className="gains-value">{formatCurrency(data.capitalGains.shortTerm)}</div>
          </div>
          <div className="gains-card">
            <div className="gains-type">Long-term</div>
            <div className="gains-value">{formatCurrency(data.capitalGains.longTerm)}</div>
          </div>
        </div>

        <div className="section-title">Tax Deductions</div>
        <div className="deductions-list">
          {data.deductions.map((deduction, i) => (
            <div key={i} className="deduction-item">
              <div className="deduction-name">{deduction.name}</div>
              <div className="deduction-amount">{formatCurrency(deduction.amount)}</div>
            </div>
          ))}
        </div>

        <div className="section-title">Quarterly Estimates</div>
        <div className="quarters-grid">
          {data.quarterlyEstimates.map((q, i) => (
            <div key={i} className={`quarter-card ${q.paid >= q.due ? 'paid' : 'pending'}`}>
              <div className="quarter-name">{q.quarter}</div>
              <div className="quarter-due">Due: {formatCurrency(q.due)}</div>
              <div className="quarter-paid">Paid: {formatCurrency(q.paid)}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (building.dataType) {
      case 'portfolio':
        return renderPortfolioData()
      case 'research':
        return renderResearchData()
      case 'risk':
        return renderRiskData()
      case 'tax':
        return renderTaxData()
      default:
        return <div>No data available</div>
    }
  }

  return (
    <div className="building-dashboard-overlay">
      <div className="building-dashboard">
        <div className="dashboard-header">
          <div>
            <h1>{building.label}</h1>
            <p className="building-subtitle">Detailed Financial Overview</p>
          </div>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        {data ? renderContent() : (
          <div className="loading">
            <div className="spinner"></div>
            <div>Loading data...</div>
          </div>
        )}
      </div>
    </div>
  )
}
