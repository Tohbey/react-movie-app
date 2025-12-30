import { exec } from "child_process";
import { promisify } from "util";
import type { Plugin } from "vite";

const execAsync = promisify(exec);

export function generateTypes(): Plugin {
  return {
    name: "generate-types",
    async closeBundle() {
      console.log("Generating type definitions...");
      try {
        await execAsync("npm run build:types");
        console.log("✓ Type definitions generated");
      } catch (error) {
        console.error("✗ Failed to generate types:", error);
      }
    },
  };
}
