import Nav from "./Nav";

export default function AppHeader() {
  return (
    <header className="w-full flex flex-col items-center justify-center gap-4 shadow p-4">
      <h1 className="text-header text-4xl">My Portfolio</h1>
      <Nav />
    </header>
  );
}
