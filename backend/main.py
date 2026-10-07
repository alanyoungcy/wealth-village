from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List
from datetime import datetime
import random

app = FastAPI(title="Virtual Wealth Management API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://frontend-blphun18r-alanyoungcys-projects.vercel.app",
        "https://frontend-nine-kappa-77.vercel.app",
        "https://*.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock data generators
def generate_portfolio_data():
    """Generate portfolio performance data"""
    return {
        "totalValue": 1250000 + random.uniform(-50000, 50000),
        "dailyChange": random.uniform(-2.5, 3.5),
        "assets": [
            {"name": "Stocks", "value": 650000, "allocation": 52, "change": random.uniform(-1, 2)},
            {"name": "Bonds", "value": 300000, "allocation": 24, "change": random.uniform(-0.5, 1)},
            {"name": "Real Estate", "value": 200000, "allocation": 16, "change": random.uniform(0, 1.5)},
            {"name": "Crypto", "value": 100000, "allocation": 8, "change": random.uniform(-5, 8)},
        ],
        "performance": [
            {"month": "Jan", "value": 1100000},
            {"month": "Feb", "value": 1150000},
            {"month": "Mar", "value": 1180000},
            {"month": "Apr", "value": 1220000},
            {"month": "May", "value": 1250000},
        ]
    }

def generate_research_data():
    """Generate asset research data"""
    assets = ["AAPL", "TSLA", "BTC", "ETH", "NVDA", "MSFT"]
    return {
        "recommendations": [
            {
                "symbol": asset,
                "name": f"Asset {asset}",
                "rating": random.choice(["Strong Buy", "Buy", "Hold", "Sell"]),
                "targetPrice": random.uniform(100, 500),
                "currentPrice": random.uniform(80, 450),
                "analyst": f"Analyst {i+1}"
            }
            for i, asset in enumerate(assets)
        ],
        "marketTrends": {
            "bullish": random.randint(40, 70),
            "bearish": random.randint(10, 40),
            "neutral": random.randint(10, 30),
        }
    }

def generate_risk_data():
    """Generate risk management data"""
    return {
        "riskScore": random.uniform(3.5, 7.5),
        "maxRiskScore": 10,
        "volatility": random.uniform(12, 18),
        "sharpeRatio": random.uniform(1.2, 2.5),
        "beta": random.uniform(0.8, 1.3),
        "varMetrics": {
            "oneDay": random.uniform(15000, 25000),
            "oneWeek": random.uniform(40000, 60000),
            "oneMonth": random.uniform(80000, 120000),
        },
        "riskFactors": [
            {"factor": "Market Risk", "level": random.uniform(4, 8), "color": "#ff6b6b"},
            {"factor": "Credit Risk", "level": random.uniform(2, 5), "color": "#ffd93d"},
            {"factor": "Liquidity Risk", "level": random.uniform(1, 4), "color": "#6bcf7f"},
            {"factor": "Currency Risk", "level": random.uniform(3, 6), "color": "#4dabf7"},
        ]
    }

def generate_tax_data():
    """Generate tax management data"""
    return {
        "taxableIncome": 185000,
        "estimatedTax": 45000,
        "effectiveRate": 24.3,
        "capitalGains": {
            "shortTerm": 12000,
            "longTerm": 35000,
        },
        "taxSavings": {
            "current": 8500,
            "potential": 12000,
        },
        "deductions": [
            {"name": "Retirement Contributions", "amount": 19500},
            {"name": "Mortgage Interest", "amount": 15000},
            {"name": "Charitable Donations", "amount": 5000},
            {"name": "State Taxes", "amount": 8000},
        ],
        "quarterlyEstimates": [
            {"quarter": "Q1", "paid": 11250, "due": 11250},
            {"quarter": "Q2", "paid": 11250, "due": 11250},
            {"quarter": "Q3", "paid": 0, "due": 11250},
            {"quarter": "Q4", "paid": 0, "due": 11250},
        ]
    }

# API Endpoints
@app.get("/")
async def root():
    return {"message": "Virtual Wealth Management API", "version": "1.0.0"}

@app.get("/api/portfolio")
async def get_portfolio():
    """Get portfolio performance data"""
    return generate_portfolio_data()

@app.get("/api/research")
async def get_research():
    """Get asset research and recommendations"""
    return generate_research_data()

@app.get("/api/risk")
async def get_risk():
    """Get risk management data"""
    return generate_risk_data()

@app.get("/api/tax")
async def get_tax():
    """Get tax management data"""
    return generate_tax_data()

@app.get("/api/agents")
async def get_agents():
    """Get virtual wealth management team agents"""
    return {
        "agents": [
            {
                "id": "portfolio-manager",
                "name": "Sarah Chen",
                "role": "Portfolio Manager",
                "position": [0, 0, 10],
                "zone": "portfolio",
                "status": "active",
                "message": "Analyzing market trends..."
            },
            {
                "id": "research-analyst",
                "name": "Michael Brown",
                "role": "Research Analyst",
                "position": [-15, 0, 0],
                "zone": "research",
                "status": "active",
                "message": "Evaluating tech sector..."
            },
            {
                "id": "risk-manager",
                "name": "Emily Davis",
                "role": "Risk Manager",
                "position": [0, 0, -10],
                "zone": "risk",
                "status": "monitoring",
                "message": "Monitoring volatility levels..."
            },
            {
                "id": "tax-advisor",
                "name": "David Wilson",
                "role": "Tax Advisor",
                "position": [15, 0, 0],
                "zone": "tax",
                "status": "active",
                "message": "Optimizing tax strategy..."
            }
        ]
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
