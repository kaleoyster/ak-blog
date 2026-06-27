export interface Job {
  role: string;
  org: string;
  orgLogo?: string;
  logoScale?: number;
  period: string;
  /** Short version shown on the homepage résumé; full detail lives on /experience. */
  summaryPoints: string[];
  points: string[];
}

// Shared by the homepage résumé section and the dedicated /experience page.
export const experience: Job[] = [
  {
    role: 'Data Scientist',
    org: 'Kiewit Corporation',
    orgLogo: '/logo/kiewit.png',
    logoScale: 1.6,
    period: 'April 2024 – Current',
    summaryPoints: [
      'Built machine learning models for safety risk forecasting, productivity prediction, and cost-risk analysis',
      'Supported analytics across scheduling, estimating, indirect cost benchmarking, and craft overrun modeling',
      'Communicated results through dashboards, reports, and executive-level stakeholder presentations',
    ],
    points: [
      'Researched and developed data science solutions across construction safety, scheduling, estimating, cost forecasting, productivity, and project performance',
      'Built machine learning models for safety risk forecasting, productivity prediction, cost-risk analysis, and schedule-based project performance monitoring',
      'Supported a range of analytics projects, including safety risk forecasting, schedule deterioration analysis, estimating intelligence, indirect cost benchmarking, and craft overrun modeling',
      'Translated model outputs into business impact through risk ranking, overrun estimation, peer-group benchmarking, and executive-level reporting',
      'Developed and maintained production-ready data pipelines and model workflows using Azure, Databricks, Dagster, Python, and SQL',
      'Communicated findings through dashboards, visualizations, reports, and stakeholder presentations to support data-driven decision-making',
    ],
  },
  {
    role: 'Machine Learning Engineer',
    org: 'University of Nebraska (UNO)',
    orgLogo: '/logo/uno.svg',
    logoScale: 1.6,
    period: 'January 2017 – May 2024',
    summaryPoints: [
      'Trained machine learning models with 98% accuracy in structural health monitoring',
      'Developed deep learning models for bridge maintenance prediction, resulting in 3 research publications',
      'Built data pipelines collecting over 21 million inspection records',
    ],
    points: [
      'Trained machine learning models with 98% accuracy, an improvement by 10% in comparison to state-of-the-art, in structural health monitoring',
      'Collaborated with engineers, bridge managers, and researchers to develop and implement machine learning and deep learning models for prediction of bridge maintenance, resulting in 3 research publications and other ongoing work',
      'Created web crawlers for scraping environment, population, and inspection records resulting in a collection of over 21 million records',
      'Communicated results analysis through interactive visualizations, written reports, publications, and presentations',
    ],
  },
];
