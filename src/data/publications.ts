export interface Extra {
  label: string;
  href: string;
}

export interface Pub {
  title: string;
  meta: string;
  href: string;
  year: number;
  extras?: Extra[];
}

export interface PubGroup {
  name: string;
  type: string;
  items: Pub[];
}

// Single source of truth for the /publications page and the nav badge count.
export const journal: Pub[] = [
  {
    title: 'Model-Cart: A Machine Learning Meta-Framework with Explainability and Human-in-the-Loop',
    meta: 'V Singh, Y Kassa, <strong>A Kale</strong>, B Ricks, R Gandhi · International Conference on Computer Safety, Reliability, and Security, Springer · 2025',
    href: 'https://link.springer.com/chapter/10.1007/978-3-031-89063-5_27',
    year: 2025,
  },
  {
    title: 'A Comparative Assessment of Bridge Deck Wearing Surfaces: Performance, Deterioration, and Maintenance',
    meta: '<strong>A Kale</strong>, Y Kassa, B Ricks, R Gandhi · Applied Sciences, Vol. 13(19), 10883 · 2023',
    href: 'https://www.mdpi.com/2076-3417/13/19/10883',
    year: 2023,
  },
  {
    title: 'New Measure to Understand and Compare Bridge Conditions Based on Inspections Time-Series Data',
    meta: '<strong>A Kale</strong>, B Ricks, R Gandhi · Journal of Infrastructure Systems, Vol. 27(4), 04021037 · 2021',
    href: 'https://ascelibrary.org/doi/full/10.1061/%28ASCE%29IS.1943-555X.0000633',
    year: 2021,
  },
];

export const conference: Pub[] = [
  {
    title: 'Toward Interactive Visualizations for Explaining Machine Learning Models',
    meta: 'A Ramsey, <strong>A Kale</strong>, Y Kassa, R Gandhi, B Ricks · 2023',
    href: 'http://idl.iscram.org/files/ramsey/2023/2570_Ramsey_etal2023.pdf',
    year: 2023,
    extras: [
      { label: 'Interactive heatmap →', href: 'https://repairs.ricks.io/tree.html?state=IL&features=designatedInspectionFrequency&repair=substructure&eg=Entropy' },
      { label: 'Interactive 2D matrix →', href: 'https://repairs.ricks.io/twoFeatureMatrix.html' },
    ],
  },
];

export const posters: Pub[] = [
  { title: 'How to Select Simple-Yet-Accurate Model of Bridge Maintenance?', meta: 'A Kale, Y Kassa, B Ricks, R Gandhi · 2023', href: 'https://digitalcommons.unomaha.edu/cgi/viewcontent.cgi?article=1067&context=isqafacproc', year: 2023 },
  { title: 'Progress in a New Visualization Strategy for ML Models', meta: 'A Wissing, B Ricks, R Gandhi, Y Kassa, A Kale · 2023', href: 'https://digitalcommons.unomaha.edu/cgi/viewcontent.cgi?article=1066&context=isqafacproc', year: 2023 },
  { title: 'Building Interpretable Methods For Identifying Bridge Maintenance Patterns', meta: 'A Kale · 2022', href: 'https://digitalcommons.unomaha.edu/srcaf/2022/schedule/116/', year: 2022 },
  { title: 'Temporal Analysis of Disinformation', meta: 'A Kale, D Abeyrathna · 2020', href: 'https://digitalcommons.unomaha.edu/srcaf/2020/schedule/103/', year: 2020 },
  { title: 'Understanding the Effects of Precipitation on Bridge Health in the US', meta: 'A Kale · 2019', href: 'https://digitalcommons.unomaha.edu/srcaf/2019/Schedule/139/', year: 2019 },
];

export const thesis: Pub[] = [
  { title: 'Identifying Predictors of Bridge Deterioration in the United States from a Data Science Perspective', meta: 'A Kale · University of Nebraska at Omaha · 2019', href: 'https://www.proquest.com/docview/2218468585?pq-origsite=gscholar&fromopenview=true', year: 2019 },
];

export const dissertation: Pub[] = [
  { title: 'A Comparative Framework for Evaluating Machine Learning Model Explanations', meta: 'A Kale · University of Nebraska at Omaha · 2024', href: 'https://www.proquest.com/openview/cc973a983790196d6446abebaf9d85e3/1?pq-origsite=gscholar&cbl=18750&diss=y', year: 2024 },
];

export const research: Pub[] = [
  { title: 'Baseline Difference Score', meta: '<strong>A Kale</strong> · A time-series metric to evaluate performance · 2021', href: '/research/baseline-difference-score', year: 2021 },
];

export const publicationGroups: PubGroup[] = [
  { name: 'Journal Papers', type: 'Journal', items: journal },
  { name: 'Conference Papers', type: 'Conference', items: conference },
  { name: 'Research', type: 'Research', items: research },
  { name: 'Posters', type: 'Poster', items: posters },
  { name: "Master's Thesis", type: 'Thesis', items: thesis },
  { name: 'Ph.D. Dissertation', type: 'Dissertation', items: dissertation },
];

export const publicationsCount = publicationGroups.reduce((n, g) => n + g.items.length, 0);
