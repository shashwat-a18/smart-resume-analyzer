import { useRouter } from 'next/router';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import JobCard from '../src/components/JobCard';
import CourseCard from '../src/components/CourseCard';

export default function Results() {
  const router = useRouter();
  const { data } = router.query;
  const result = data ? JSON.parse(data) : null;

  if (!result) {
    return (
      <div className="min-h-screen bg-secondary flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto p-6 text-center">
          <p className="text-lg text-gray-600">No analysis data available. Please try again.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const { analysis, jobs, courses } = result;

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Analysis Results
        </h2>

        {/* Match Score */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Match Score</h3>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-primary h-4 rounded-full transition-all duration-500"
              style={{ width: `${analysis.match_score}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{analysis.match_score}% Match</p>
        </section>

        {/* Resume Skills */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Skills</h3>
          <ul className="list-disc pl-6 text-gray-600">
            {analysis.resume_skills.length > 0 ? (
              analysis.resume_skills.map((skill, i) => (
                <li key={i} className="text-sm">{skill}</li>
              ))
            ) : (
              <li className="text-sm">No skills detected</li>
            )}
          </ul>
        </section>

        {/* Missing Skills */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Missing Skills</h3>
          <ul className="list-disc pl-6 text-gray-600">
            {analysis.missing_skills.length > 0 ? (
              analysis.missing_skills.map((skill, i) => (
                <li key={i} className="text-sm">{skill}</li>
              ))
            ) : (
              <li className="text-sm">No missing skills detected</li>
            )}
          </ul>
        </section>

        {/* Suggestions */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Suggestions</h3>
          <ul className="list-disc pl-6 text-gray-600">
            {analysis.suggestions.length > 0 ? (
              analysis.suggestions.map((suggestion, i) => (
                <li key={i} className="text-sm">{suggestion}</li>
              ))
            ) : (
              <li className="text-sm">No suggestions available</li>
            )}
          </ul>
        </section>

        {/* Job Listings */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommended Jobs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.length > 0 ? (
              jobs.map((job, i) => <JobCard key={i} job={job} />)
            ) : (
              <p className="text-sm text-gray-600">No jobs found</p>
            )}
          </div>
        </section>

        {/* Course Recommendations */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommended Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.length > 0 ? (
              courses.map((course, i) => <CourseCard key={i} course={course} />)
            ) : (
              <p className="text-sm text-gray-600">No courses recommended</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}