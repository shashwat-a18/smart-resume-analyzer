import formidable from 'formidable';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Form parsing failed' });
    }

    try {
      const jobDescription = fields.jobDescription?.[0];
      const resumeFile = files.resume?.[0];

      if (!resumeFile || !jobDescription) {
        return res.status(400).json({ error: 'Missing resume or job description' });
      }

      // Send to ML service
      const formData = new FormData();
      formData.append('resume', fs.createReadStream(resumeFile.filepath));
      formData.append('job_description', jobDescription);

      const mlResponse = await axios.post(process.env.ML_SERVICE_URL, formData, {
        headers: formData.getHeaders(),
      });

      // Fetch job listings
      const jobResponse = await axios.get('https://jsearch.p.rapidapi.com/search', {
        params: { query: mlResponse.data.resume_skills.join(','), num_pages: '1' },
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        },
      });

      // Simulate course recommendations
      const courses = mlResponse.data.missing_skills.map(skill => ({
        title: `Learn ${skill.charAt(0).toUpperCase() + skill.slice(1)}`,
        link: `https://www.udemy.com/courses/search/?q=${skill}`,
        duration: 'Varies',
      }));

      // Clean up uploaded file
      fs.unlinkSync(resumeFile.filepath);

      res.status(200).json({
        analysis: mlResponse.data,
        jobs: jobResponse.data.data.slice(0, 5),
        courses,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Analysis failed' });
    }
  });
}