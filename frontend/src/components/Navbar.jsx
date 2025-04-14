import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-base-100 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    style={{
      background: '#7DB268',
    }}
    >
      <div className="container mx-auto px-4 h-16"
      style={{
        background: '#7DB268',
      }}>
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="w-25 h-18" />
              </div>
              <h1 className="text-xl font-bold" style={{color: '#265F34',
                textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                fontFamily: 'Kameron',}}>Online Mediator</h1>
            </Link>
          </div>
{/*}
          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
*/}
            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-1 items-center px-3 py-2 rounded text-white" onClick={logout}
                  style={{
                    background: '#7DB268',
                  }}
                >
                  <LogOut className="size-5"  />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
    </header>
  );
};
export default Navbar;