from flask import Flask, request, jsonify
from utils.nlp_processor import extract_text_from_pdf, extract_skills, calculate_match_score, find_missing_skills
import os

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze_resume():
    if 'resume' not in request.files or 'job_description' not in request.form:
        return jsonify({'error': 'Missing resume or job description'}), 400
    
    resume_file = request.files['resume']
    job_description = request.form['job_description']
    
    resume_path = 'temp_resume.pdf'
    resume_file.save(resume_path)
    
    resume_text = extract_text_from_pdf(resume_path)
    resume_skills = extract_skills(resume_text)
    
    match_score = calculate_match_score(resume_text, job_description)
    missing_skills = find_missing_skills(resume_skills, job_description)
    
    os.remove(resume_path)
    
    return jsonify({
        'match_score': match_score,
        'resume_skills': resume_skills,
        'missing_skills': missing_skills,
        'suggestions': [f'Consider adding {skill} to your resume or learning it.' for skill in missing_skills]
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)