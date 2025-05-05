export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <a href="/auth/login">Login</a>
      <a href="/auth/logout?returnUrl=http://localhost:3000/">Logout</a>
      <a href="/middleware-filter">Middleware Filter</a>
      <a href="/middleware-filter/report">Middleware filter report</a>
    </main>
  );
}
