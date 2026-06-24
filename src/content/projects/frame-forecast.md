---
title: FrameForecast
description: Long-short-term memory architecture for learning representation of sequence data.
date: 2021-12-09
github: https://github.com/kaleoyster/frame-forecast
tags: [Deep Learning, Time-series]
---

## A LSTM Deep Learning Model for Predicting and Recreating Sequences of Missing Data

- **Big idea** — Classical machine learning models are designed to work with fixed length inputs.
- **Small idea** — Learning the observation's temporal ordering can make it challenging to extract features suitable for use as input to supervised learning models.
- **Bird's eye view** — Long-short-term memory architectures have been useful in learning the representation of sequence data, proven useful with video, text, and audio.
- **Technical details** — This project builds on **Autoencoders** to implement a sequence reconstruction model and sequence prediction model on the moving MNIST dataset.
- **What's next** — The models achieved **95.3%** accuracy in reconstruction (loss: 0.131, MSE: 0.035) and **95.5%** in prediction (loss: 0.155, MSE: 0.04) on the validation set.

### Performance

| Model          | MSE   | Accuracy | Loss  |
|:--------------:|:-----:|:--------:|:-----:|
| Reconstruction | 0.035 | 0.953    | 0.131 |
| Prediction     | 0.04  | 0.955    | 0.155 |

### Objective

- Develop deep learning networks that support sequence data and learn temporal features.
- Recurrent neural networks (RNN) consist of feedback loops in their recurrent layer, enabling them to learn temporal patterns.

### Challenge

- RNNs are difficult to train because of the loss of gradient with time.

### Solution

- Long-short term memory (LSTM) networks solve the vanishing gradient problem.
- The architecture of LSTMs can be organized to learn complex prediction problems involving sequence data of various types and lengths.

### Getting Started

#### Clone

```zsh
git clone https://github.com/kaleoyster/frame-forecast.git
```

#### Install dependencies

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
