import ChatWindow from "./components/ChatWindow";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <main className="flex h-screen overflow-hidden">
      <Sidebar />
      <ChatWindow />
    </main>
  );
}
