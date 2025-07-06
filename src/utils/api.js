import axios from 'axios';

export const analyzeResume = async (resume, jobDescription) => {
  const formData = new FormData();
  formData.append('resume', resume);
  formData.append('jobDescription', jobDescription);

  const response = await axios.post('/api/analyze', formData);
  return response.data;
};