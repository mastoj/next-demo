export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="space-y-3 w-full max-w-md px-4">
        <a
          href="/personalization"
          className="block w-full text-center py-2.5 px-5 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium rounded-md shadow-sm transition duration-200"
        >
          Personalization
        </a>
        <a
          href="/flags"
          className="block w-full text-center py-2.5 px-5 bg-green-100 hover:bg-green-200 text-green-700 font-medium rounded-md shadow-sm transition duration-200"
        >
          Flags
        </a>
        <a
          href="/middleware-filter"
          className="block w-full text-center py-2.5 px-5 bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium rounded-md shadow-sm transition duration-200"
        >
          Middleware Filter
        </a>
        <a
          href="/middleware-filter/report"
          className="block w-full text-center py-2.5 px-5 bg-rose-100 hover:bg-rose-200 text-rose-700 font-medium rounded-md shadow-sm transition duration-200"
        >
          Middleware Filter Report
        </a>
      </div>
    </main>
  );
}
