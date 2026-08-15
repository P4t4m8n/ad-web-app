export default function Loading() {
  return (
    <div className="loading-container flex justify-center items-center min-h-[70vh]">
      <div className="text-center">
        <div className="spinner mb-3"></div>
        <p>Loading artwork...</p>
      </div>
    </div>
  );
}
