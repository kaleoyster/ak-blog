---
title: FairAlgo
description: Understanding the effects of changing values of sensitive variables on fairness metrics.
date: 2023-12-10
github: https://github.com/kaleoyster/fairalgo
tags: [XAI, Fairness]
---

## Understanding the Effect of Changing Values of Sensitive Variables on Fairness Metrics

### Objective

- Machine learning models are adept at learning sophisticated patterns from large and complex datasets. However, the very ability to recognize patterns in a large and complex dataset can also learn historical discrimination and bias that is within a dataset. The discrimination and bias in the dataset may vary from group to individual.
- Researchers have defined various measurements to measure unfairness in training and testing the models to ensure that deployed models are not discriminatory or biased.
- Researchers have explored that this short-term vision of accounting for fairness does not translate to fairness over time.
- As models are not flexible in changing data distribution, the earlier learned representation of fairness by models is insufficient to make accurate and fair decisions.
- There is a lack of understanding of how the data's changing distribution affects models' fair decision-making.
- Developing machine learning models that incorporate a fair representation of data from a new stream of data remains mostly unexplored.
- This research study proposes a novel method to systematically detect and profile the dependency of attributes of the dataset to the fairness measure through simulation to understand the effects of changing data distribution on fairness.
- Machine learning deployment strategies can be guided depending on the understanding of the data changing distribution over time.

### Getting Started

#### Clone the repository

```zsh
git clone https://github.com/kaleoyster/fairalgo.git
```

#### Run the simulation

```zsh
cd fairalgo
python simulate.py
```
