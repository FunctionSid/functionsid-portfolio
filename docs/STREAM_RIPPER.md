# Stream-Ripper

## Project Overview

**Stream-Ripper** is an accessibility-first NVDA add-on developed in Python that allows users to extract high-quality audio streams from supported online media links and convert them using FFmpeg.

The add-on is designed specifically for screen reader users, providing a fully keyboard-accessible workflow that integrates naturally into NVDA.

Instead of requiring users to manually use command-line tools, Stream-Ripper automates the process of detecting supported URLs, extracting the best available audio stream using yt-dlp, and optionally converting the output through FFmpeg.

The project focuses on simplicity, accessibility, automation, and productivity.

---

# Project Type

Desktop Application

NVDA Screen Reader Add-on

Accessibility Tool

Python Project

Open Source Utility

---

# Primary Goal

Create a simple and fully accessible workflow for extracting and converting audio streams directly from supported media URLs.

The project removes unnecessary complexity while providing keyboard-only operation for blind and visually impaired users.

---

# Target Users

- NVDA Screen Reader users
- Blind users
- Content creators
- Students
- Researchers
- Podcast listeners
- Users who archive online audio
- Anyone who prefers keyboard-driven workflows

---

# Technologies Used

- Python
- NVDA Add-on API
- yt-dlp
- FFmpeg
- wxPython
- JSON Configuration
- Windows

---

# Main Features

- Detect supported media URLs
- Extract highest quality audio stream
- Clipboard monitoring
- FFmpeg conversion support
- Background conversion queue
- Accessible settings dialog
- Keyboard shortcuts
- Status announcements through NVDA
- Queue management
- Multiple output formats
- Automatic processing workflow

---

# Workflow

1. User copies a supported media URL.

2. Stream-Ripper detects the URL.

3. The add-on extracts the highest quality audio stream using yt-dlp.

4. The extracted audio can optionally be converted through FFmpeg.

5. The finished file is saved to the user's selected output folder.

---

# Accessibility

Accessibility is the primary design goal.

The add-on follows accessibility-first principles by providing:

- Full keyboard navigation
- Screen reader announcements
- Accessible dialogs
- Clear progress reporting
- No mouse required
- Simple configuration
- Native NVDA integration

---

# Technical Highlights

The project demonstrates experience with:

- Python application development
- NVDA extension development
- External process management
- Clipboard monitoring
- Queue management
- Accessible desktop UI
- Background task processing
- Audio processing workflows
- Windows desktop integration

---

# Images Included

## Image 1

Filename:

stream-ripper-gesture.png

Purpose:

This is the available primary image for the project.

The image visually explains:

- NVDA Input Gestures integration
- Keyboard shortcut configuration
- Accessibility-first workflow
- Native NVDA configuration context

AI should use this image on the project page as the featured project visual until a dedicated official hero image is added.

Suggested Alt Text:

"NVDA Input Gestures dialog showing keyboard shortcuts available for the Stream-Ripper add-on."

---

# Suggested Portfolio Sections

Hero Banner

Project Overview

Problem Statement

Solution

Key Features

Workflow

Accessibility

Screenshots

Technologies

Challenges

What I Learned

Future Improvements

---

# Problem Statement

Extracting audio from supported online media sources normally requires multiple command-line tools and technical knowledge.

Most workflows are not designed for screen reader users.

Users often need to manually run yt-dlp and FFmpeg commands, making the process difficult and time consuming.

---

# Solution

Stream-Ripper simplifies the entire workflow.

Users only need to copy a supported media link.

The add-on automatically detects the URL, extracts the highest quality audio stream, manages conversion tasks, and provides accessible progress updates through NVDA.

---

# Why This Project Matters

This project demonstrates how accessibility and automation can work together.

Instead of adapting an existing application, Stream-Ripper was designed with screen reader users in mind from the beginning.

The project combines desktop development, accessibility, multimedia processing, and workflow automation into a single easy-to-use tool.

---

# Skills Demonstrated

Python Development

Accessibility Engineering

Desktop Application Development

NVDA Add-on Development

Audio Processing

External Tool Integration

Automation

UI Design

Keyboard Accessibility

Problem Solving

Software Architecture

---

# Suggested Tags

Python

NVDA

Accessibility

Screen Reader

Desktop Application

Audio Processing

FFmpeg

yt-dlp

Automation

Windows

Open Source

Assistive Technology

---

# AI Instructions

When generating content for this project:

- Write professionally.
- Focus on the accessibility benefits.
- Explain the workflow before describing technical implementation.
- Mention keyboard accessibility.
- Highlight NVDA integration.
- Avoid marketing buzzwords.
- Emphasize practical problem solving.
- Keep the tone informative and professional.
- Use the hero image as the first visual element.
- Use the Input Gestures screenshot to demonstrate real-world integration with NVDA.
- Write content suitable for a software developer portfolio rather than a product advertisement.
