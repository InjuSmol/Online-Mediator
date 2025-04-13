import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <img src="/logo.png" alt="Logo" className="w-25 h-18" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-sans font-bold" style={{color: '#FFFFFF',
                textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                fontFamily: 'Kameron',}}>Welcome to Online Mediator!</h2>
        <p className="text-base-content/60" style={{color: '#FFFFFF',
                textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                fontFamily: 'Kameron',}}>
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;