import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const [location, navigate] = useLocation();
  const { user, logoutMutation } = useAuth();
  
  const handleSignIn = () => {
    navigate("/auth");
  };
  
  const handleSignUp = () => {
    navigate("/auth?tab=register");
  };
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  return (
    <header className="bg-white dark:bg-gray-900 py-4 px-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.location.href = '/'}>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <i className="fas fa-list-ul text-white"></i>
          </div>
          <span className="font-bold text-lg text-gray-900 dark:text-white">OutlineGen</span>
        </div>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center space-x-6">
            <Link href="/">
              <div className={`text-sm cursor-pointer ${location === '/' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'} hover:text-primary dark:hover:text-primary-400 transition-colors`}>
                Home
              </div>
            </Link>
            <Link href="/templates">
              <div className={`text-sm cursor-pointer ${location === '/templates' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'} hover:text-primary dark:hover:text-primary-400 transition-colors`}>
                Templates
              </div>
            </Link>
            <Link href="/pricing">
              <div className={`text-sm cursor-pointer ${location === '/pricing' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'} hover:text-primary dark:hover:text-primary-400 transition-colors`}>
                Pricing
              </div>
            </Link>
            <Link href="/help">
              <div className={`text-sm cursor-pointer ${location === '/help' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'} hover:text-primary dark:hover:text-primary-400 transition-colors`}>
                Help
              </div>
            </Link>
            
            {!user ? (
              <>
                <Button size="sm" variant="outline" className="ml-2" onClick={handleSignIn}>
                  Sign In
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:shadow-sm" onClick={handleSignUp}>
                  Sign Up
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold text-primary">{user.credits}</span> credits
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xs">
                        {user.name ? user.name.substring(0, 2).toUpperCase() : user.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      <div className="font-medium">{user.name || user.username}</div>
                      <div className="text-xs text-gray-500 truncate">{user.email || ''}</div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/account')}>Account</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/pricing')}>Upgrade Plan</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500" onClick={handleLogout}>
                      {logoutMutation.isPending ? "Logging out..." : "Log out"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </nav>
        )}
        
        {/* Mobile Menu Button */}
        {isMobile && (
          <button 
            className="p-2 text-gray-600 dark:text-gray-300 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
          </button>
        )}
      </div>
      
      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-md py-4 px-6 border-b border-gray-200 dark:border-gray-800 flex flex-col space-y-4">
          <Link href="/">
            <div className={`text-base cursor-pointer ${location === '/' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'} hover:text-primary dark:hover:text-primary-400 transition-colors`}>
              Home
            </div>
          </Link>
          <Link href="/templates">
            <div className={`text-base cursor-pointer ${location === '/templates' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'} hover:text-primary dark:hover:text-primary-400 transition-colors`}>
              Templates
            </div>
          </Link>
          <Link href="/pricing">
            <div className={`text-base cursor-pointer ${location === '/pricing' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'} hover:text-primary dark:hover:text-primary-400 transition-colors`}>
              Pricing
            </div>
          </Link>
          <Link href="/help">
            <div className={`text-base cursor-pointer ${location === '/help' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'} hover:text-primary dark:hover:text-primary-400 transition-colors`}>
              Help
            </div>
          </Link>
          {!user ? (
            <div className="flex space-x-2 pt-2">
              <Button size="sm" variant="outline" className="flex-1" onClick={handleSignIn}>
                Sign In
              </Button>
              <Button size="sm" className="flex-1 bg-gradient-to-r from-primary to-secondary" onClick={handleSignUp}>
                Sign Up
              </Button>
            </div>
          ) : (
            <div className="border-t pt-4 mt-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                      {user.name ? user.name.substring(0, 2).toUpperCase() : user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.name || user.username}</div>
                    <div className="text-xs text-gray-500">{user.email || ''}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold text-primary">{user.credits}</span> credits
                </div>
              </div>
              
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate('/account')}>
                  <i className="fas fa-user mr-2"></i> Account
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate('/pricing')}>
                  <i className="fas fa-crown mr-2"></i> Upgrade Plan
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>
                  {logoutMutation.isPending ? "Logging out..." : "Log out"}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}