# 🏰 Virtual Wealth Village

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-Latest-black.svg)](https://threejs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.142-green.svg)](https://fastapi.tiangolo.com/)

An immersive **3D interactive financial dashboard** built as a low-poly village world. Explore a beautiful village with walking NPCs, animated animals, and clickable buildings that reveal detailed financial insights.

## ✨ Features

### 🚶 Living Village
- **6 Walking NPCs** - Financial team members patrol the village with realistic animations
- **14 Animated Animals** - Cows, sheep, and chickens graze and walk around
- **140+ Trees** - Dense forests with seasonal changes (summer ↔ autumn)
- **Organic Natural Lake** - Beautiful water with reflections, boats, and lily pads

### 🏢 Interactive Buildings
- **Click any building** to view detailed financial dashboards
- **6 Financial Services**:
  - 🏦 Wealth Bank (Portfolio Management)
  - 📊 Trading Post (Market Research)
  - 💰 Treasury (Asset Management)
  - 📜 Tax Office (Tax Planning)
  - 💼 Investments (Advisory)
  - ⚠️ Risk Management

### 🎨 Advanced Graphics
- **Post-processing effects** - Bloom and SSAO
- **Reflective water** - Metallic surface with wave animations
- **Enhanced materials** - Realistic wood, metal, and glass
- **Dynamic lighting** - Multiple light sources with shadows
- **Season Toggle** - Instant transformation between summer and autumn

### 📊 Real-time Data
- Live portfolio values and performance
- Market sentiment analysis
- Risk metrics and VaR calculations
- Tax optimization insights
- Updated every 3-5 seconds

## 🎮 Demo

![Village Overview](screenshots/village-overview.jpg)
*Explore the beautiful low-poly village*

![Clickable Buildings](screenshots/building-interaction.jpg)
*Click buildings for detailed dashboards*

![Walking NPCs](screenshots/walking-npcs.jpg)
*6 financial advisors patrol the village*

![Organic Lake](screenshots/organic-lake.jpg)
*Natural shaped lake with reflections*

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- [uv](https://github.com/astral-sh/uv) (Python package manager)

### Installation

```bash
# Clone the repository
git clone https://github.com/alanyoungcy/wealth-village.git
cd wealth-village

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
uv sync
```

### Running the Application

**Option 1: Use the startup script**
```bash
./start.sh
```

**Option 2: Manual start**

Terminal 1 - Backend:
```bash
cd backend
uv run python main.py
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

### Access
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 🎮 Controls

- **Left Click + Drag**: Rotate camera
- **Right Click + Drag**: Pan around
- **Scroll Wheel**: Zoom in/out
- **Click Buildings**: View detailed dashboards
- **Season Button**: Toggle summer/autumn (top-right)

## 🏗️ Project Structure

```
wealth-village/
├── frontend/                 # React + Three.js
│   ├── src/
│   │   ├── components/
│   │   │   ├── WealthScene.jsx      # Main 3D scene
│   │   │   ├── Villager.jsx         # Walking NPCs
│   │   │   ├── Animal.jsx           # Animated animals
│   │   │   ├── Building.jsx         # Clickable buildings
│   │   │   ├── Water.jsx            # Organic lake
│   │   │   ├── Tree.jsx             # Seasonal trees
│   │   │   ├── BuildingDashboard.jsx # Focused view
│   │   │   └── DashboardUI.jsx      # Main UI overlay
│   │   └── App.jsx
│   └── package.json
├── backend/                  # Python FastAPI
│   ├── main.py              # API endpoints
│   └── pyproject.toml
├── README.md
└── .gitignore
```

## 🎨 Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite 8** - Build tool
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers
- **@react-three/postprocessing** - Effects (Bloom, SSAO)

### Backend
- **Python 3.14** - Runtime
- **FastAPI 0.142** - Web framework
- **Uvicorn** - ASGI server
- **uv** - Package management

## 📊 Features Deep Dive

### Walking NPCs
Each of the 6 financial team members has:
- Realistic walking animations (legs, arms, body bobbing)
- Unique patrol paths around the village
- Name labels and role badges
- Colorful business attire
- Smooth path-following AI

### Animated Animals
- **Cows** (4): Black and white spots, walking patterns, detailed features
- **Sheep** (4): Fluffy wool, grazing behavior
- **Chickens** (6): Faster movement, pecking animations

### Organic Lake
- Irregular natural shape (not rectangular!)
- 32-point bezier curve shoreline
- Wave animations with vertex displacement
- 35 rocks along irregular shore
- 18 lily pads scattered naturally
- 45 reeds in clusters
- 3 detailed boats with sails
- Wooden dock with railings

### Interactive Dashboards
Click any labeled building to see:
- **Portfolio**: Asset allocation, performance charts
- **Research**: Market sentiment, top recommendations
- **Risk**: Risk scores, VaR metrics, factor analysis
- **Tax**: Income, deductions, quarterly payments

### Seasonal System
Toggle between:
- **Summer**: Bright green trees and grass
- **Autumn**: Golden, orange, and brown foliage

## 🎯 API Endpoints

- `GET /` - API information
- `GET /api/portfolio` - Portfolio data
- `GET /api/research` - Research recommendations
- `GET /api/risk` - Risk metrics
- `GET /api/tax` - Tax information
- `GET /api/agents` - Village team members
- `GET /api/health` - Health check

## 🔮 Future Enhancements

- [ ] First-person walking mode
- [ ] Day/night cycle
- [ ] Weather effects (rain, snow)
- [ ] More building types
- [ ] Minimap navigation
- [ ] Voice interactions
- [ ] Real financial API integration
- [ ] User authentication
- [ ] Historical data charts
- [ ] Mobile responsive

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with the **3dviz-pro-max** workflow principles
- Low-poly art style inspired by modern isometric village games
- Financial data models based on industry standards

## 📧 Contact

**Alan Young** - [@alanyoungcy](https://github.com/alanyoungcy)

Project Link: [https://github.com/alanyoungcy/wealth-village](https://github.com/alanyoungcy/wealth-village)

---

⭐ **Star this repo** if you find it interesting!

Built with ❤️ using React Three Fiber and Three.js

