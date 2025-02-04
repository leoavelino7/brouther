import { describe, expect, test } from "vitest";
import { remapQueryStringParams, transformData } from "../src/utils";

describe("Should test data transformer", () => {
    test("Should test only one date", () => {
        const q = new URLSearchParams();
        const now = new Date();
        q.set("n", now.toISOString());
        const r: any = transformData(q, remapQueryStringParams("/path?n=date"));
        expect(r.n instanceof Date).toBe(true);
        const isSame = r.n.toISOString() === now.toISOString();
        expect(isSame).toBe(true);
    });

    test("Should test an array of dates", () => {
        const q = new URLSearchParams();
        const now = new Date();
        q.set("n", now.toISOString());
        q.append("n", now.toISOString());
        q.append("n", now.toISOString());
        const r: any = transformData(q, remapQueryStringParams("/path?n=date"));
        expect(Array.isArray(r.n)).toBe(true);
        r.n.forEach((x: any) => {
            expect(x instanceof Date).toBe(true);
        });
    });

    test("Should test an object", () => {
        const q = new URLSearchParams();
        const now = new Date();
        q.set("name", "brouther");
        q.set("version", "4.0.0");
        q.set("published", "false");
        q.set("createdAt", now.toISOString());
        q.append("tags", "javascript");
        q.append("tags", "router");
        q.append("tags", "typescript");
        const r: any = transformData(q, remapQueryStringParams("/?name=string&version=string&published=boolean&createdAt=date&tags=string[]"));
        expect(r).toStrictEqual({
            name: "brouther",
            version: "4.0.0",
            published: false,
            createdAt: now,
            tags: ["javascript", "router", "typescript"],
        });
    });
});
