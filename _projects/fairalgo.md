---
layout: post
title: FairAlgo
description: Understanding the effects of changing values of sensitive variables on fairness metric
date: 2023-12-10
---

# fairalgo
<h2 align='center'>
   Understanding the effect of changing values of sensitive variables on fariness metrics
</h2>

### 🎯 Objective
- Machine learning models are adept at learning sophisticated patterns from large and complex datasets. However, the very ability to recognize patterns in a large and complex dataset can also learn historical discrimination and bias that is within a dataset. The discrimination and bias in the dataset may vary from group to individual. 
- Researchers have defined various measurements to measure unfairness in training and testing the models to ensure that deployed models are not discriminatory or biased. 
- Researchers have explored that this short-term vision of accounting for fairness does not translate to fairness over time. 
- As models are not flexible in changing data distribution, the earlier learned representation of fairness by models is insufficient to make accurate and fair decisions. 
- There is a lack of understanding of how the data's changing distribution affects models' fair decision-making. 
- Developing machine learning models that incorporate a fair representation of data from a new stream of data remains mostly unexplored. 
- This research study proposes a novel method to systematically detect and profile the dependency of attributes of the dataset to the fairness measure through simulation to understand the effects of changing data distribution on fairness. 
- Machine learning deployment strategies can be guided depending on the understanding of the data changing distribution over time.

### 🎬 Getting started
The following are the steps to setup this project:

####  To download fairalgo
```zsh
git clone https://github.com/kaleoyster/fairalgo.git
```

####  To run fairalgo
```zsh
cd fairalgo
python simulate.py
```


