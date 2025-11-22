---
layout: post
title: SCARED — Child–Parent Symptom Network Analysis
description: Network-based modeling to understand child–parent discrepancies in anxiety symptoms.
date: 2025-11-20
---

<h2 align='center'>
    A Network Science Approach to Understanding Child–Parent Discrepancies in Anxiety Symptoms
</h2>

[Link to the Github Project](https://github.com/kaleoyster/scared-network){:target="_blank", style="align:center"}

- **Big idea** — Traditional psychological scoring methods collapse symptoms into a single number, losing the *relationships* between symptoms and the *discrepancies* between child and parent reports.
- **Small idea** — Network analysis treats each symptom as a node and the relationships between symptoms as edges, allowing us to detect central, influential, or bridging symptoms in child–parent pairs.
- **Bird’s eye view of the idea** — By modeling the SCARED questionnaire responses as a symptom network, we can quantify hubs, clusters, and pathways of anxiety — and compare how children and parents perceive them differently.
- **Technical details** — This project uses **Graph Theory**, **Centrality Metrics (degree, betweenness, closeness, eigenvector)**, **community detection**, and **arc diagram visualization** to map 41 symptoms and 451 edges from a sample of 31 child–parent dyads.
- **What’s next** — These networks can guide future clinical interpretation, automated discrepancy detection, and targeted interventions focused on the most influential symptoms.

---

### 📊 Network Metrics Summary

| Metric              | Meaning                                                                 |
|--------------------|--------------------------------------------------------------------------|
| **Degree centrality** | How many symptoms a given symptom is directly connected to.             |
| **Betweenness**       | How often a symptom lies on the shortest path between other symptoms.  |
| **Closeness**         | How near a symptom is—on average—to all other symptoms.                |
| **Eigenvector**       | Influence: a symptom connected to other highly influential symptoms.   |

---

### 🧠 Snapshot of Findings

- **41 nodes** representing SCARED anxiety symptoms  
- **451 edges** representing correlations between symptom responses  
- **Top hub symptoms** appear consistently in both child and parent networks but with notable magnitude differences  
- Eigenvector centrality highlights *influential “core anxiety” symptoms*  
- Arc diagram shows strong clustering in Generalized Anxiety and Social Anxiety items  
- Parent reports show *stronger symptom clustering* than child reports  
- Child reports show *more variability and weaker adjacency patterns*

---

### 🌀 Preview (Mock Arc Diagram)

> *Arc diagram preview placeholder — visualization shows symptom clusters by subscale, with children displaying more dispersed connections than parents.*

![Mock Arc Diagram](../images/scared-arc-diagram.png){:target='Apple', style='align:center'}
**Arc diagram mock-up of symptom relationships across the SCARED survey**

---

### 🎯 Objective

- Understand the **structure of anxiety symptoms** in children using a network science lens  
- Compare **child vs. parent symptom networks** to identify discrepancy patterns  
- Use network metrics to identify **core, influential, or bridging symptoms**  
- Build a framework for **quantifying disagreement** in mental health assessments  

---

### 💪 Challenge

- Parents and children often report anxiety symptoms **very differently**  
- Traditional scoring does not capture **inter-symptom connectivity**  
- Small sample sizes (e.g., *31 child–parent dyads*) challenge robustness  
- Symptom-level analysis requires nuanced statistical and network modeling  

---

### 🧪 Solution

- Construct **correlation networks** for child reports and parent reports  
- Use **centrality measures** to identify important symptoms  
- Compute **discrepancy metrics** for each symptom pair  
- Visualize relationships using **arc diagrams**, **force-directed graphs**, and **heatmaps**  
- Evaluate how network topology changes across reporting sources  

---

### 📁 Data Source

- SCARED (Screen for Child Anxiety Related Emotional Disorders)  
- 41-item questionnaire completed by **children (n=31)** and **parents (n=31)**  
- Responses standardized, cleaned, and merged into dyadic networks  

---

### 📐 Metrics

```markdown
- **Centrality Metrics**
  - Degree
  - Betweenness
  - Closeness
  - Eigenvector

- **Discrepancy Metrics**
  - Absolute score difference per symptom
  - Rank-order difference
  - Network distance difference

- **Community Metrics**
  - Subscale clustering
  - Modularity score