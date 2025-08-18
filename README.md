# Booth-Bizz

[![Docker Pulls](https://img.shields.io/docker/pulls/rushikesh1505/booth-bizz?logo=docker)](https://hub.docker.com/r/rushikesh1505/booth-bizz)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](#license)

Booth-Bizz is an **online booth management tool** that helps small business owners manage their booths at expos/events and forecast current-year sales using a simple ML linear regression model.

---

## Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Local Dev](#installation--local-dev)
- [Docker Usage](#docker-usage)
- [Usage Overview](#usage-overview)
- [License](#license)

---

## About
Booth-Bizz enables entrepreneurs to plan, organize, and operate event booths efficiently. It includes streamlined management UI components and a lightweight ML model that predicts current-year selling trends based on provided data.

---

## Features
- **Booth management UI** built with modern React components and **Lucide-React** icons.
- **Global state** handled via **Redux** alongside the **React Context API**.
- **Sales prediction** using a **linear regression** model (for current-year estimates).

---

## Tech Stack
- **Framework/Build:** React + Vite  
- **State Management:** Redux + React Context API  
- **Icons:** Lucide-React  
- **ML:** Linear Regression (JS implementation)  
- **Containerization:** Docker (published on Docker Hub)

---

## Installation & Local Dev

```bash
# 1) Clone the repository
git clone https://github.com/Rushikesh-purohit-0503/Booth-Bizz.git
cd Booth-Bizz

# 2) Install dependencies
npm install

# 3) Start the dev server
npm run dev
```
---

## Or If you don't want to install all things locally then use 

---

## Docker Usage
- **Use the prebuilt image from Docker Hub:**
- ```bash 
  # Pull the image
  docker pull rushikesh1505/booth-bizz

  # Run the container (maps container port 3000 to host 3000)
  docker run -dp 3000:3000 rushikesh1505/booth-bizz
  ```
- **Then open: http://localhost:3000**

---

## Usage Overview

- **Manage Booths**: Add, arrange, and update booth information for upcoming or ongoing events.  
- **Predict Sales**: Use the integrated linear regression model to estimate current-year sales based on input data.  
- **Clean UI**: Intuitive, icon-driven interface for faster workflows at events.  

---
