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
    role: 'Machine Learning Engineer',
    org: 'Kiewit Corporation',
    orgLogo: '/logo/kiewit.png',
    logoScale: 1.6,
    period: 'April 2024 – Present',
    summaryPoints: [
      'Designed, deployed, and monitored production ML models that identified over 65% of safety incidents across 400+ large-scale construction projects',
      'Built end-to-end ML pipelines in Python using Pandas, Polars, Scikit-Learn, Statsmodels, Snowflake, and SQL — from feature engineering through deployment and monitoring',
      'Designed and deployed LLM-powered applications and AI agents for schedule analysis, enterprise knowledge retrieval, and operational decision-support',
    ],
    points: [
      'Designed, deployed, and monitored production machine learning models that identified over 65% of safety incidents across 400+ large-scale construction projects using historical and real-time operational data',
      'Built end-to-end machine learning pipelines in Python using Pandas, Polars, Scikit-Learn, Statsmodels, Snowflake, and SQL, covering feature engineering, model training, deployment, monitoring, and performance evaluation',
      'Developed scalable MLOps workflows using Docker, Dagster, and cloud infrastructure to automate data ingestion, model execution, reporting, and production deployments',
      'Designed and deployed LLM-powered applications and AI agents to automate schedule analysis, enterprise knowledge retrieval, and operational decision-support workflows',
      'Built interpretable AI solutions and executive dashboards using Explainable AI (XAI) techniques, enabling stakeholders to understand model predictions and operational risk',
      'Led large-scale analytical studies on schedule performance, labor productivity, and indirect cost forecasting, delivering executive reports that informed enterprise planning and operational strategy',
    ],
  },
  {
    role: 'Research Assistant',
    org: 'University of Nebraska Omaha',
    orgLogo: '/logo/uno.svg',
    logoScale: 1.6,
    period: 'January 2017 – April 2024',
    summaryPoints: [
      'Conducted research in Explainable AI (XAI), developing methodologies to improve transparency, interpretability, and trustworthiness of ML systems',
      'Proposed novel interpretability approaches integrating SHAP, Partial Dependence Plots, Wasserstein Distance, and Formal Concept Analysis (FCA)',
      'Designed scalable ML pipelines integrating heterogeneous datasets exceeding 21M+ records; authored 4 peer-reviewed publications',
    ],
    points: [
      'Conducted research in Explainable Artificial Intelligence (XAI), developing methodologies to improve the transparency, interpretability, and trustworthiness of machine learning systems',
      'Proposed and evaluated novel approaches for model interpretability, integrating SHAP, Partial Dependence Plots (PDP), Wasserstein Distance, and Formal Concept Analysis (FCA) to compare and explain machine learning models',
      'Designed scalable machine learning pipelines and data engineering workflows, integrating heterogeneous datasets exceeding 21M+ records to support predictive maintenance research',
      'Authored 4 peer-reviewed publications spanning XAI, human-in-the-loop AI, interactive visualization, and predictive analytics, presenting findings at academic and technical conferences',
    ],
  },
];
