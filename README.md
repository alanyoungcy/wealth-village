# Virtual Wealth Management 3D Dashboard

A 3D interactive virtual wealth management dashboard with walking avatars representing your wealth management team. Built with React, Three.js, and FastAPI.

## Features

- **3D Interactive Environment**: Isometric office layout with 4 zones
- **Walking Avatars**: Animated wealth management team members patrolling their zones
- **Real-time Data**: Live portfolio, research, risk, and tax data
- **Responsive UI**: Beautiful dashboard overlay with real-time metrics
- **4 Management Zones**:
  - 📊 **Portfolio** (Top/North): Track performance and asset allocation
  - 🔍 **Research** (Left/West): Asset research and market recommendations
  - ⚠️ **Risk** (Bottom/South): Risk metrics and volatility monitoring
  - 💰 **Tax** (Right/East): Tax planning and optimization

## Tech Stack

### Frontend
- React + Vite
- Three.js + React Three Fiber
- @react-three/drei for 3D helpers

### Backend
- Python FastAPI
- Managed by `uv`
- CORS enabled for local development

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- uv (Python package manager)

### Installation

1. **Clone the repository**
```bash
cd virtualwealth
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

3. **Install Backend Dependencies**
```bash
cd backend
uv sync
```

### Running the Application

#### Start Backend (Terminal 1)
```bash
cd backend
uv run python main.py
```
The API will be available at `http://localhost:8000`

#### Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
The app will be available at `http://localhost:5173`

## API Endpoints

- `GET /` - API information
- `GET /api/portfolio` - Portfolio performance data
- `GET /api/research` - Asset research and recommendations
- `GET /api/risk` - Risk management metrics
- `GET /api/tax` - Tax management data
- `GET /api/agents` - Wealth management team agents
- `GET /api/health` - Health check

## 3D Scene Structure

The 3D environment consists of:
- **Central Hub**: Main platform connecting all zones
- **4 Office Zones**: Each with desk, monitor, chair, filing cabinet, and plants
- **Walking Avatars**: Animated characters with walking cycles patrolling their zones
- **Dynamic Lighting**: Ambient, directional, and zone-specific lighting
- **Interactive Camera**: Orbit controls for exploring the scene

## Project Structure

```
virtualwealth/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── WealthScene.jsx      # Main 3D scene
│   │   │   ├── WealthAgent.jsx      # Walking avatar component
│   │   │   ├── OfficeZone.jsx       # Office zone component
│   │   │   ├── DashboardUI.jsx      # 2D overlay UI
│   │   │   └── DashboardUI.css      # UI styling
│   │   ├── App.jsx                  # Main app component
│   │   └── App.css                  # App styling
│   ├── package.json
│   └── vite.config.js
└── backend/
    ├── main.py                      # FastAPI application
    ├── pyproject.toml               # Python dependencies
    └── uv.lock                      # Lock file
```

## Customization

### Adding New Agents
Edit `WealthScene.jsx` and add a new `<WealthAgent>` component:
```jsx
<WealthAgent
  position={[x, y, z]}
  color="#hexcolor"
  name="Agent Name"
  zone="zone-name"
/>
```

### Modifying Data
Edit the generator functions in `backend/main.py`:
- `generate_portfolio_data()`
- `generate_research_data()`
- `generate_risk_data()`
- `generate_tax_data()`

### Styling
- UI styles: `frontend/src/components/DashboardUI.css`
- App styles: `frontend/src/App.css`

## Future Enhancements

- [ ] Real financial data integration (APIs)
- [ ] User authentication
- [ ] Historical data visualization
- [ ] Agent interaction (click to get updates)
- [ ] Voice interaction with agents
- [ ] Mobile responsive design
- [ ] Real-time WebSocket updates
- [ ] Advanced analytics and predictions
- [ ] Export reports
- [ ] Multi-user support

## License

MIT

## Credits

Built with the 3dviz-pro-max skill for creating immersive 3D visualizations.
