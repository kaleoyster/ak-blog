---
layout: post
title: FrameForecast
description: Long-short-term memory architecture have in learning representation of sequence data.
date: 2021-12-09
---

<h2 align='center'>
    A LSTM Deep learning model for predicting and recreating sequence of missing data
</h2>

[Link to the Github Project](https://github.com/kaleoyster/frame-forecast){:target="_blank", style="align:center"}

- **Big idea** -- Classical machine learning models are designed to work with fixed length inputs.
- **Small idea** -- Especially, learning the observation’s temporal ordering can make it challenging to extract features suitable for use as input to supervised learning models.
- **Birds eye view of the idea** -- Long-short-term memory architectures have been useful in learning the representation of sequence data. They have proven useful with a variety of data types such as video, text, and audio sequence data. 
- **Technical details** -- This project builds on top of the concepts of **Autoencoders** to explores challenges in sequence learning and implements the sequence reconstruction model and sequence prediction model on moving MNIST dataset. 
- **What's next** -- The implemented models were able to able to achieve an accuracy of **95.3%** in reconstruction, with reconstruction loss of **0.131** and MSE of **0.035** on the validation set. Simultaneously, the prediction model was able to achieve an accuracy of **95.5%** in reconstruction, with reconstruction loss of 0.155 and MSE of **0.04** on the validation set.

### Performance of the LSTM models

  | Model         | MSE     | Accuracy   | Loss   |
  |:-------------:|:-------:|:----------:|:------:|
  |Reconstruction | 0.035   | 0.953      | 0.131  |
  |Prediction     | 0.04    | 0.955      | 0.155  |

### Preview

![Results of Reconstruction LSTM Autoencoder. Predicted frame on the left and ground truth frame on the right
](../images/lstm-results.png){:target='Apple', style='align:center'}
**Results of Reconstruction LSTM Autoencoder. Predicted frame on the left and ground truth frame on the right**

### 🎯 Objective
- Prediction modeling problems involving sequences data requires to produce a sequence as a prediction, the objective of this research study to developed deep learning network that support the sequence data and learn temporal features.
- Recurrent neural networks (RNN) consist of feedback loops in their recurrent layer, enabling Recurrent neural networks to learn temporal patterns. 

### 💪 Challenge
- However, RNN is difficult to train because of the loss of gradient with time. 

### 🧪 Solution
- Long-short term memory (LSTM) networks are an extension of RNNs that solve the vanishing gradient problem. 
- The architecture of LSTMs can be organized to learn complex prediction problems that involve sequence data of various types and lengths. 
- The autoencoder LSTMs particularly support the variable’s length. 
- In this project, LSTM autoencoder will be the basis for learning a complex step by step temporal representation of sequence data.

### 🎬 Getting started
The following are the steps to setup this project:

####  Clone
```zsh
git clone https://github.com/kaleoyster/frame-forecast.git
```

#### Run requirements.txt

```zsh
pip install -r requirements.txt
```

#### Download dataset

```zsh
wget http://www.cs.toronto.edu/~nitish/unsupervised_video/mnist_test_seq.npy
```

#### Run the LSTM model

```zsh
python3 src/lstm_autoencoder.py
```

#### Alternatively, run bash script 

```zsh
./run_lstm.sh
```

#### View visualization

```zsh
Serving HTTP on :: port 8000 (http://[localhost]:8000/) ...
```

