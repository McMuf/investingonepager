import cors from "cors";
import express from "express";
import { onepagerRouter } from "./routes/onepager.js";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/onepager", onepagerRouter);

app.listen(PORT, () => {
  console.log(`investingonepager backend listening on http://localhost:${PORT}`);
});
