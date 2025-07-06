export default function CourseCard({ course }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 truncate">{course.title}</h3>
      <p className="text-sm text-gray-600 mt-1">Duration: {course.duration || 'Varies'}</p>
      <a
        href={course.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 text-primary hover:text-blue-600 font-medium text-sm hover:underline"
      >
        Enroll Now
      </a>
    </div>
  );
}