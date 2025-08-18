# Booth-Bizz

[![Docker Pulls](https://img.shields.io/docker/pulls/rushikesh1505/booth-bizz?logo=docker)](https://hub.docker.com/r/rushikesh1505/booth-bizz)  
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](#license)

Booth-Bizz is an **online booth management tool** designed for small business owners to manage their booths at expos or events—including forecasting current-year sales using an integrated ML model.

---

## 📑 Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Local Dev](#installation--local-dev)
- [Docker Usage](#docker-usage)
- [Usage Overview](#usage-overview)
- [License](#license)

---

## 📌 About
Booth-Bizz enables small entrepreneurs to manage and visualize their event booths effortlessly by tracking layout, performance, and visitor engagement, while also leveraging a machine learning-powered sales prediction tool.

---

## ✨ Features
- **Dynamic booth layout** using **Lucide-React** icons for fast, SVG-based visuals that are tree-shakable.  
- **State management** via Redux combined with React’s Context API.  
- **Sales forecasting** through a **linear regression model**, using the `ml-regression` library.  

---

## 🛠 Tech Stack
- **Frontend**: React powered by Vite  
- **State Management**: Redux + Context API  
- **Icons**: Lucide-React (SVG icon library for React)  
- **Machine Learning**: `ml-regression` for regression algorithms  
- **Containerization**: Docker for easy deployment  

---

## ⚙️ Installation & Local Dev
Clone the repo and run locally:

```bash
git clone https://github.com/Rushikesh-purohit-0503/Booth-Bizz.git
cd Booth-Bizz
npm install
npm run dev
```
