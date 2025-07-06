import spacy
import PyPDF2
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

nlp = spacy.load("en_core_web_sm")
model = SentenceTransformer('all-MiniLM-L6-v2')

def extract_text_from_pdf(pdf_file_path):
    try:
        with open(pdf_file_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for page in reader.pages:
                text += page.extract_text() or ""
        return text
    except Exception as e:
        return str(e)

def extract_skills(text):
    doc = nlp(text)
    skills = []
    # Simplified skill extraction (extend with a skills database for production)
    for token in doc:
        if token.pos_ in ['NOUN', 'PROPN'] and token.text.lower() in [
            'python', 'javascript', 'react', 'sql', 'java', 'aws', 'docker', 'git'
        ]:
            skills.append(token.text.lower())
    return list(set(skills))

def calculate_match_score(resume_text, job_text):
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform([resume_text, job_text])
    cosine_sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
    
    embeddings = model.encode([resume_text, job_text])
    bert_sim = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]
    
    match_score = (cosine_sim + bert_sim) / 2 * 100
    return round(match_score, 2)

def find_missing_skills(resume_skills, job_text):
    job_doc = nlp(job_text)
    job_skills = extract_skills(job_text)
    missing = [skill for skill in job_skills if skill not in resume_skills]
    return missing