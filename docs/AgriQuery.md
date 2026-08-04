# AgriQuery - Agricultural Commodity Price Chatbot

AgriQuery is an accessible, web-based chatbot application built with Node.js, Express, and SQLite3. It allows users, farmers, and traders across India to check real-time agricultural commodity prices in natural language (English or Hindi synonyms). The system automatically fetches daily price records from official government APIs (`data.gov.in`).

---

## 1. Project Specifications & Architecture

### Technology Stack
* **Backend Framework:** Node.js with Express v5.1.0
* **Database Engine:** SQLite3 (stored locally at `./database/bot.db`)
* **Templating Engine:** EJS (Embedded JavaScript)
* **Task Scheduler:** `node-cron` (Daily auto-fetch at 6:00 AM IST)
* **Environment Configuration:** `dotenv`
* **Text Matching & NLP:** Custom fuzzy matching using `string-similarity` and regex parsing

### Project Folder Structure
---

# Project Overview

AgriQuery is an accessibility-first agricultural commodity price chatbot designed to make official government market price information easy to access through natural language.

Instead of searching large government websites or manually reading market reports, users can simply ask questions such as:

- What is today's onion price?
- Tomato price in Pune
- Wheat price today
- Cotton price in Maharashtra

The chatbot understands common names, synonyms, and natural language to provide relevant market prices quickly.

The primary goal of AgriQuery is to make agricultural market information simple, accessible, and useful for everyone, including farmers, traders, students, and visually impaired users.

---

# Motivation

Many government websites contain valuable agricultural information, but they are often difficult to navigate, especially for screen reader users.

AgriQuery was created to:

• Simplify access to official mandi price information.

• Improve accessibility.

• Reduce the time required to search market prices.

• Demonstrate how AI and accessibility can improve public information systems.

---

# Key Features

• Natural language chatbot

• English and Hindi commodity names

• Fuzzy text matching

• Daily automatic government data updates

• Fast SQLite database queries

• Responsive web interface

• Accessible design

• Keyboard navigation

• Screen reader compatibility

• Mobile friendly interface

---

# Accessibility Features

Accessibility was a major design goal.

The project includes:

• Semantic HTML

• Keyboard-only navigation

• Screen reader friendly interface

• Proper heading structure

• Accessible forms

• High contrast friendly design

• Clear error messages

• Simple language

• Responsive layout

The project follows accessibility-first development principles.

---

# Skills Demonstrated

This project demonstrates experience with:

Node.js

Express.js

SQLite

REST APIs

Government Open Data APIs

JavaScript

Database Design

Accessibility Engineering

Backend Development

Automation

Data Processing

Cron Jobs

Natural Language Processing

Responsive Web Design

---

# Challenges

Some of the challenges encountered during development included:

Understanding government API data.

Handling inconsistent commodity names.

Matching user input with official commodity names.

Creating reliable fuzzy matching.

Designing an accessible interface.

Keeping the database automatically updated every day.

Optimizing SQLite queries for faster responses.

---

# Solutions

These challenges were solved by:

Using fuzzy string matching.

Creating commodity synonym mappings.

Automating daily data downloads.

Normalizing imported government data.

Using SQLite indexes for faster searches.

Building a lightweight Node.js architecture.

Designing accessible user interfaces from the beginning.

---

# Project Outcome

AgriQuery successfully demonstrates how open government data can be transformed into an accessible conversational application.

The project provides users with a simple way to access agricultural market prices while demonstrating modern backend development and accessibility engineering practices.

---

# Future Improvements

Future versions may include:

• Voice interaction

• Multiple Indian languages

• AI-powered recommendations

• Commodity price trends

• Historical price charts

• Weather integration

• Market prediction using machine learning

• Farmer advisory services

• Location-aware market suggestions

---

# Project Status

Current Status

Completed

Maintained for future improvements.

---

# My Role

I designed and developed the complete application.

Responsibilities included:

Project planning

Backend development

Database design

Government API integration

Accessibility implementation

Testing

Documentation

Deployment preparation

---

# Official Project Image

Image Location

public/images/agriquery-home-1.png

This image represents the AgriQuery project homepage.

Use it on:

• Projects page

• Project details page

• Portfolio case study

Do not use it as a homepage background.

---

# Project Category

Web Application

Accessibility

Government Data

Agriculture

Node.js

Database Application

---

# Portfolio Highlight

AgriQuery demonstrates my ability to build accessible, production-ready web applications that integrate real-world government data while maintaining performance, simplicity, and accessibility.

This project highlights backend engineering, accessibility, automation, and database development skills.

---
Project Status: Completed

Project Type: Accessibility First Web Application

Category: Agriculture • Government Open Data • Chatbot

Developed By: Siddharth Kalantri

Brand: FunctionSid

Primary Technologies:
Node.js, Express.js, SQLite3, EJS, JavaScript

Target Platform:
Windows
Oracle Linux
Oracle Cloud Infrastructure

# System Architecture

User

↓

Web Browser

↓

Express.js Application

↓

Natural Language Processing

↓

SQLite Database

↓

Government Market Price Data

↓

Response to User


# Project Assets

Primary Image

public/images/agriquery-home-1.png

Purpose

Projects page card

Project detail page

Portfolio showcase

Accessibility

Provide descriptive alt text.

Recommended Alt Text

AgriQuery project overview showing an accessibility-first chatbot for agricultural commodity prices.


# Portfolio Badges

Accessibility

Node.js

Express.js

SQLite

Government API

Automation

Responsive

Open Data

Backend

Chatbot
