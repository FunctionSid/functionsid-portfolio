# Project Case Study: LawGPT — Accessible RAG Legal Assistant for Indian Law

## 1. Executive Summary
**LawGPT** is an accessible, AI-powered Retrieval-Augmented Generation (RAG) assistant designed to interpret Indian legal documents—specifically the **Constitution of India** and the **Bharatiya Nyaya Sanhita (BNS), 2023**.

The application translates complex legal statutes into simple, grade-8 English summaries while maintaining full legal accuracy through automated inline citations (`[1]`, `[2]`) linked directly to exact source text blocks. 

The application is built with a keyboard-first, screen-reader-friendly user interface, offering built-in keyboard shortcuts and accessible navigation elements.

---

## 2. Technical Architecture & Tech Stack

### Core Technologies
* **Runtime Environment:** Node.js (v22+)
* **Web Framework:** Express.js (v5)
* **Frontend Engine:** Server-side rendered EJS templates with plain, accessible CSS/JS
* **LLM Engine:** Ola Krutrim API (`gpt-oss-20b`) for factual, simplified summaries
* **Search & Retrieval Pipeline:** Hybrid Search with Reciprocal Rank Fusion (RRF) & Direct Regex Lookups
* **FunctionSid Portfolio Deployment:** LawGPT is presented as a portfolio case study only. It is not deployed as a standalone application inside the FunctionSid Oracle VM.

### Key Backend Mechanisms
1. **Direct Statute Regex Match:** Automatically detects explicit legal references in queries (e.g., `Article 21`, `Section 103`) using capture groups, instantly retrieving exact section texts before vector lookup.
2. **Hybrid RAG Retrieval:** Combines vector embeddings (`Vyakyarth-1-Indic-Embedding` / `all-MiniLM-L6-v2`) with keyword matching.
3. **Dataset Isolation Filter:** A dynamic UI toggle allows switching between *Constitution of India* and *Bharatiya Nyaya Sanhita (BNS)* datasets, ensuring exact source targeting.
4. **Citation Engine:** Context blocks are structured with numbered labels (`[CONTEXT 1]`), instructing the LLM to output mandatory inline citations corresponding directly to the sources rendered below.

---

## 3. UI/UX & Accessibility Features

* **Screen-Reader Optimized Design:** Uncluttered vertical layouts, high contrast, clean headings, and explicit ARIA labels.
* **Keyboard Navigation:** 
  * `Ctrl + Enter` to submit queries.
  * `Alt + I` to jump directly to the input box.
  * `Alt + S` to send query.
  * `Alt + L` to jump to the chat log.
  * `Alt + 1..9` to immediately hear or jump to individual source references.
* **Plain Text Fallback:** Built-in automatic fallback renders top context chunks if the LLM provider API key is unavailable or fails.

---

## 4. Visual Assets & Screenshot Usage Guide

Use the following image mapping instructions when building showcase cards, blog posts, or portfolio pages:

### Asset 1: `lawgpt-home.png`
* **Caption:** *Constitutional Query Showcase — Article 5 & Citizenship Rules*
* **What it demonstrates:**
  * Displays the app performing a Constitution search (`who is citizen of india`).
  * Demonstrates simple, Grade-8 English output broken down into numbered points.
  * Shows inline citations (`[1]`, `[3]`) and the dynamic source list displaying document titles and relevance scores.
  * Highlights the **Constitution of India** radio button filter selected at the bottom.
* **Recommended Placement:** In the **Features** or **Core Capabilities** section of your website.

### Asset 2: `lawgpt-chat.png`
* **Caption:** *Criminal Law Query & Multi-Turn Chat — Bharatiya Nyaya Sanhita (BNS)*
* **What it demonstrates:**
  * Demonstrates continuous multi-turn chat handling queries on criminal law (`right of private defence`).
  * Shows detailed legal synthesis with multiple inline citations (`[1]`, `[2]`, `[4]`).
  * Highlights source transparency with full BNS text file citations and matching relevance scores.
* **Recommended Placement:** In the **RAG Pipeline & Retrieval Mechanics** section of your website.

---

## 5. Deployment & Local Setup Instructions

### Environment Setup (`.env`)
```env
KRUTRIM_API_KEY=your_api_key_here
KRUTRIM_MODEL=gpt-oss-20b
PORT=3000
