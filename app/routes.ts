import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/diverge", "routes/diverge.tsx"),
  route("/tracer-bullet", "routes/tracer-bullet.tsx"),
  route("/agent-planning", "routes/agent-planning.tsx"),
] satisfies RouteConfig;
