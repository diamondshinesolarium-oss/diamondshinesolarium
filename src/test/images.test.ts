import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { galleryImages } from "@/content/gallery";

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(tsx?|css)$/.test(name) && !path.includes("/test/") ? [path] : [];
  });
}

describe("site images work on any host (Vercel included)", () => {
  it("never uses Lovable-only CDN asset URLs or pointers in the site code", () => {
    for (const file of sourceFiles("src")) {
      const text = readFileSync(file, "utf8");
      expect(text, file).not.toContain("__l5e");
      expect(text, file).not.toContain(".asset.json");
    }
  });

  it("shows the 9 current studio photos in the gallery", () => {
    expect(galleryImages).toHaveLength(9);
    expect(galleryImages.map((i) => i.key)).toContain("facade");
  });
});
