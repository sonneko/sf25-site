import { readFileSync } from "fs";
import { Booth, boothSchema } from "../types/booth";

let booths: Booth[] | null = null;

function getBooths(): Booth[] {
    if (booths !== null) return booths;

    const ids = readFileSync(process.cwd() + "/assets/booths/allIds.txt", "utf8").split(",");
    const files = ids.map(id => readFileSync(process.cwd() + "/assets/booths/" + id + ".json", "utf8"));
    booths = [];
    files.forEach(file => {
        const parsed = JSON.parse(file);
        if (parsed["not-complete"]) return;
        const booth = boothSchema.parse(JSON.parse(file));
        (booths as Booth[]).push(booth);
    });
    return booths;
}

export function getBoothsById(id: string): Booth | undefined {
    return getBooths().find(booth => booth.booth_id === id);
}

export function getAllBooths(): Booth[] {
    return getBooths();
}

export function getAllBoothsIDs(): string[] {
    return getBooths().map(booth => booth.booth_id);
}

