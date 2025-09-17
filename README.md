# Promptfy

**Stop wrestling with AI, start directing it.**

Promptfy is a web application that provides three battle-tested methodologies to transform vague AI conversations into precise, actionable results. Whether you're planning a project, exploring solutions, or expanding existing code, Promptfy helps you pick the right approach for what you're trying to achieve.

## 🛠️ Tech Stack

- **Framework**: [React Router](https://reactrouter.com/) v7 with SSR
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite
- **Deployment**: Docker ready

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd promptfy
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript type checking

### Project Structure

```
app/
├── components/ui/          # Reusable UI components (shadcn/ui)
├── lib/                    # Utilities and animations
├── routes/                 # Page components and routing
│   ├── home.tsx           # Landing page with methodology cards
│   ├── agent-planning.tsx # Agent Planning methodology
│   ├── diverge.tsx        # Diverge methodology
│   └── tracer-bullet.tsx  # Tracer Bullet methodology
├── root.tsx               # Root layout component
└── routes.ts              # Route configuration
```

## 🚢 Deployment

### Docker Deployment

Build and run using Docker:

```bash
docker build -t promptfy .
docker run -p 3000:3000 promptfy
```

### Platform Deployment

The application can be deployed to any platform supporting Node.js or Docker:

- **Vercel/Netlify**: Deploy directly from Git
- **Railway/Fly.io**: Docker-based deployment  
- **AWS/GCP/Azure**: Container or serverless deployment

Deploy the output of `npm run build`:

```
build/
├── client/    # Static assets
└── server/    # Server-side code
```

## 🎨 Design Philosophy

Promptfy follows a minimalist design approach:

- **Clean Typography**: Monospace fonts for technical feel
- **Restrained Color Palette**: Monochrome with subtle accents
- **Generous Whitespace**: Focus on content over decoration
- **Smooth Interactions**: Subtle animations that enhance UX
- **Mobile-First**: Responsive design for all screen sizes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ by [Fernando Abolafio](https://www.linkedin.com/in/fernandoabolafio)**

Connect: [LinkedIn](https://www.linkedin.com/in/fernandoabolafio) • [Twitter](https://x.com/oxfernando)