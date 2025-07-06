export default function JobCard({ job }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 truncate">{job.job_title}</h3>
      <p className="text-sm text-gray-600 mt-1">{job.employer_name} - {job.job_city || 'Remote'}</p>
      <p className="text-sm text-gray-500 mt-2 line-clamp-2">{job.job_description || 'No description available'}</p>
      <a
        href={job.job_apply_link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 text-primary hover:text-blue-600 font-medium text-sm hover:underline"
      >
        Apply Now
      </a>
    </div>
  );
}