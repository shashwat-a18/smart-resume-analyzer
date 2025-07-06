# Smart Resume Analyzer & Job Matcher

A full-stack web application that analyzes resumes, matches them to job descriptions, and provides personalized job listings and course recommendations using NLP and APIs.

## Features
- **Resume Analysis**: Upload a PDF resume to extract skills using spaCy.
- **Job Description Input**: Enter a job description to compare with the resume.
- **Match Score**: Calculate a similarity score using TF-IDF and BERT embeddings.
- **Keyword Analysis**: Identify missing skills with suggestions for improvement.
- **Job Listings**: Fetch relevant jobs via the JSearch API (RapidAPI).
- **Course Recommendations**: Suggest online courses for skill gaps (simulated).

## Tech Stack
- **Frontend & Backend**: Next.js, TailwindCSS
- **ML/NLP Service**: Python (Flask, spaCy, PyPDF2, sentence-transformers)
- **APIs**: JSearch API (RapidAPI)
- **Deployment**: Vercel (Next.js), Railway/Render (ML service)

## Project Structure