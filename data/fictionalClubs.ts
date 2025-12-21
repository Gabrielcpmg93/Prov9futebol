
export const fictionalClubs = [
  "Olympique de Aethelgard",
  "FC Valeriana Rovers",
  "Seraphina United",
  "Zephyria FC",
  "Drakonheim Dragons",
  "Silverpeak Rangers",
  "Ironport FC",
  "Coralheim Mariners",
  "Stormwind City",
  "Novagard Athletic",
  "Solara Sporting",
  "Crimson Dynamo FC",
  "Azure FC",
  "Veridian Foresters",
  "Obsidian FC",
  "Helios Wanderers",
];

export const getFictionalClubs = (count: number): string[] => {
    const shuffled = [...fictionalClubs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
