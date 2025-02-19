import fs from "fs";
import path from "path";
import { convertStatsData } from "@/utils/dataUtils";

export async function GET() {
  const filePath = path.join(process.cwd(), "public/data/stats.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const rawData = JSON.parse(fileContents);
  const stats = convertStatsData(rawData);

  return new Response(JSON.stringify(stats), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
