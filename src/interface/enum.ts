export const EntityType = {
    Polygon: "Polygon",
    Points: "Points",
} as const;

export type EntityType = typeof EntityType[keyof typeof EntityType];
