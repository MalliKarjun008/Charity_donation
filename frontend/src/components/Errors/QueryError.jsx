export default function QueryError({ error, reset }) {
  console.log(error);
  return (
    <div className="p-4 text-center">
      <h2 className="text-red-500 font-bold">Something went wrong</h2>
      <p className="mt-2">{error?.message || "Unknown error occurred"}</p>
      {reset && (
        <button
          onClick={() => reset()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
