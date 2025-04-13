import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import Navbar from "../components/Navbar"

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen"
    
    style={{
      background: 'linear-gradient(0deg, #336E42 58%, #92C572 100%)',
    }}>
       <Navbar />
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]"
        style={{
          borderRadius: '40px',
          background: 'rgba(249, 249, 249, 0.20)',
          boxShadow: '0px 7px 4px 0px rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(10px)', // Optional for extra glassy effect
        }}>
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;