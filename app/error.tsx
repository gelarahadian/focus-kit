"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="p-10 text-center">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
    </div>
  );
}
