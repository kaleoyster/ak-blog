---
layout: post
title: Interpreting "loss" values.
---

## What is loss?
The overall goal of a deep learning model is to reduce loss value during the training process. Loss values is essentially represented as the summation of errors in a deep learning model.
> Simply a loss value is a measure of model's fit on training. 


## What is the difference between loss values and accuracy?

|   |Something | other thing |
|---|----------|-------------|
|1. |Something | Other thing |

## What does it mean?
There are only three scenarios with respect to training and loss that can occur:
    * If the *errors* are high, the *loss* will be high, which implies the model does not fit data.
    * If the *errors* are low, the *loss* will be low, which implies the model fits data.
However, in addition to high and low errors, in certain situations the *errors* of the deep learning may stay consistent through out the training of the deep learning. This consistent level of loss through out the training process imply that model is not learning the patterns within the data. Which can either be corrected by generating high quality data, or choosing right parameters for the deep learning models.

# Reference:
1. [37 reasons why your neural network is not working](https://blog.slavv.com/37-reasons-why-your-neural-network-is-not-working-4020854bd607)
