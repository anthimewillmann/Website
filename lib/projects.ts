export type Project = {
  slug: string;
  name: string;
  description: string;
  href: string;
  linkLabel: string;
  image: string;
  gallery: string[];
  portrait?: boolean;
  overviewImageWidth?: string;
};

export const projects: Project[] = [
  {
    slug: "culinaro",
    name: "Culinaro",
    description:
      "AI-powered iOS recipe manager built with SwiftUI, Foundation Models, and Vision OCR for recipe generation, scanning, and guided cooking.",
    href: "https://apps.apple.com/us/app/culinaro/id6764299394",
    linkLabel: "App Store",
    image: "/culinaro-recipes.png",
    overviewImageWidth: "w-[59.8%]",
    gallery: [
      "/culinaro-recipes.png",
      "/culinaro-new-recipe.png",
      "/culinaro-ingredients.png",
      "/culinaro-lessons.png",
      "/culinaro-shopping.png",
      "/culinaro-nutrition.png",
      "/culinaro-overview.png",
      "/culinaro-step-1.jpeg",
      "/culinaro-step-3.jpeg",
      "/culinaro-step-5.jpeg",
      "/culinaro-enjoy.jpeg",
    ],
    portrait: true,
  },
  {
    slug: "sumari",
    name: "Sumari",
    description:
        "Safari Web Extension for AI-powered webpage summaries and follow-up questions using Apple Foundation Models.",
    href: "https://github.com/anthimewillmann/Sumari",
    linkLabel: "GitHub",
    image: "/sumari-mobile-light.jpeg",
    overviewImageWidth: "w-[59.8%]",
    gallery: [
      "/sumari-mobile-light.jpeg",
      "/sumari-mobile-dark.jpeg",
      "/sumari-desktop-light.png",
      "/sumari-desktop-dark.png",
      "/sumari-sheet-dark.jpeg",
      "/sumari-sheet-light.jpeg",
    ],
    portrait: true,
  },
  {
    slug: "kiel-traffic-analysis",
    name: "Kiel Traffic Analysis",
    description:
        "Data Science Project: The Personal Traffic around Kiel in the past five years",
    href: "https://kiel-traffic-analysis-7q4iyxxr2obfcxkxzmuq2k.streamlit.app/",
    linkLabel: "Website",
    image: "/Kiel-Traffic-Analysis.png",
    gallery: [
      "/C53FA7C2-E98F-4C43-AB77-57001220F97E_1_102_o.jpeg",
      "/3D3AF0B9-EABA-4FEF-8139-403EFC439801_1_102_o.jpeg",
      "/9A24D034-A8CC-45E9-BE1B-71B9174C64E3_1_102_o.jpeg",
      "/9E8F8BFA-8D23-425B-AA18-2C9A7149FB8F_1_102_o.jpeg",
      "/32F31E6D-5CFE-4C74-986E-3B6CC75DEF3C_1_102_o.jpeg",
      "/68EA4AEC-A47C-4059-B5BA-94C691EACEEB_1_102_o.jpeg",
      "/80867CCE-106F-4D42-A62C-521D6AB4A7FC_1_102_o.jpeg",
      "/25395077-1C97-47C8-9B14-A72B62F931A1_1_102_o.jpeg",
      "/B2CE9AD7-648F-4D53-B11B-198822BE7607_1_102_o.jpeg",
      "/B5F1EC35-B0C2-4EC9-AC90-B7DB18F63C7E_1_102_o.jpeg",
      "/BC6CE1FC-A25E-4075-A1A1-5012A3BAEB0D_1_102_o.jpeg",
      "/DA12020E-92B3-4BBD-BC30-8912B8A5FA72_1_102_o.jpeg",
      "/FB85450D-7F68-4555-A23C-B98CFC7C8E57_1_102_o.jpeg",
      "/FC867FBB-7660-44B6-A720-2B6CEF97BBB7_1_102_o.jpeg",
    ],
  },
  {
    slug: "labyrinth",
    name: "Labyrinth",
    description:
        "Java Swing maze game with difficulty modes, keyboard controls, and Dijkstra-based pursuers.",
    href: "https://github.com/anthimewillmann/Labyrinth",
    linkLabel: "GitHub",
    image: "/Labyrinth.jpeg",
    // Das Bild ist nahezu quadratisch. Mit 59,8 % der Spaltenbreite erhält
    // es dieselbe sichtbare Höhe wie das breitere Kiel-Traffic-Bild.
    overviewImageWidth: "w-[59.8%]",
    gallery: [
      "/8FC66A68-585E-46BE-BEAA-61A29CDA8E5B_1_105_c.jpeg",
      "/36716257-209C-49AA-AC09-DC9556C7EA3E_1_105_c.jpeg",
      "/4819A453-B7F8-4846-879A-4507EA97CCB3_1_201_a.jpeg",
      "/A98B3016-FBE9-4954-85A0-DB975F25E4DE_1_105_c.jpeg",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
