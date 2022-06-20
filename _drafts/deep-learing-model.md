---
layout: post
title: Loss of deep learning model remains constant?
---

In a deep learning model, the loss value is a measure of model's fit on training. The loss values is essentially represented as the summation of errors in a deep learning model. 

* If the *errors* are high, the *loss* will be high, which implies the model does not fit data.
* If the *errors* are low, the *loss* will be low, which implies the model fits data.

However, in certain situations the *errors* of the deep learning may stay consistent through out the trainings. Moreover, the consistent level on not unchanging errors are often fluctuating with regards to k-fold cross validation.

### What if during the training of a deep learning model stays constant?

The training loss is a metric used to assess how a deep learning models fits the training.
The loss value is represented as the summation of errors in a deep learning model.
It measures how well (or bad) our model is doing. If the errors are high, the loss will be high, which means that the model does not do a good job. Otherwise, the lower it is, the better our model works. And, if the errors are constant, than any learning change is the model is as good as previous one.

To calculate the loss, a loss or cost function is used. There are several different cost functions to use. Each penalizes errors in different ways, and the problem determines which one is better to use. Cross-Entropy and Mean Squared Error are the most commonly used for classification and regression problems, respectively.

But how do we know if the loss is high or low?  Well, it depends on the problem and the cost function being used.

### 1. K-fold cross validation for if the results are random:

### 2. Interpretability methods:

### 3. Understanding the training aspect of the model.


# Reference:

1. [37 reasons why your neural network is not working](https://blog.slavv.com/37-reasons-why-your-neural-network-is-not-working-4020854bd607)
