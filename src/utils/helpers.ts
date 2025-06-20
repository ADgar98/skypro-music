import { TrackType } from "@/sherdTypes/sheredTypes";

export function getUniqueValuesByKey(
    arr: TrackType[],
    key: keyof TrackType,
): string[] {
const uniqueValues = new Set<string>();

arr.forEach((item) => {
    const value = item[key]

    if (Array.isArray(value)) {
        value.forEach((v) => {
            if (v) {
                uniqueValues.add(v);
            }
        })
    }
    else if (typeof value === 'string') {
        uniqueValues.add(value);
    }
})
return Array.from(uniqueValues)
}