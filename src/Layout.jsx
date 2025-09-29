
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/entities/User";
import { CartItem } from "@/entities/CartItem";
import { Gem, ShoppingBag, User as UserIcon, LogIn, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = React.useState(null);
  const [cartCount, setCartCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const loadCartCount = React.useCallback(async () => {
    if (!user) return;
    try {
      const cartItems = await CartItem.filter({ user_email: user.email });
      const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    } catch (error) {
      console.error("Error loading cart count:", error);
    }
  }, [user]);

  React.useEffect(() => {
    loadUser();
  }, []);

  React.useEffect(() => {
    if (user) {
      loadCartCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadUser = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    User.loginWithRedirect(window.location.href);
  };

  const handleLogout = async () => {
    await User.logout();
    setUser(null);
    setCartCount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50">
      <style jsx>{`
        :root {
          --luxury-gold: #D4AF37;
          --champagne: #F7E7CE;
          --deep-gold: #B8860B;
          --pearl-white: #FEFDF8;
        }
        
        .luxury-shadow {
          box-shadow: 0 10px 25px -5px rgba(212, 175, 55, 0.1), 0 10px 10px -5px rgba(212, 175, 55, 0.04);
        }
        
        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.95);
        }
      `}</style>

      {/* Header */}
      <header className="glass-effect border-b border-amber-200/50 luxury-shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-105">
                <Gem className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                  לוקסוריה תכשיטים
                </h1>
                <p className="text-sm text-amber-600/80 font-medium">תכשיטים יוקרתיים</p>
              </div>
            </Link>

            {/* Navigation & User Menu */}
            <div className="flex items-center space-x-4" dir="rtl">
              {/* Admin Link */}
              {!isLoading && user && user.role === 'admin' && (
                <Link to={createPageUrl("AdminDashboard")}>
                  <Button
                    variant="ghost"
                    className="hover:bg-amber-100/50 transition-colors flex items-center gap-2 text-amber-700"
                  >
                    <Wrench className="w-5 h-5" />
                    <span className="hidden sm:inline">ניהול</span>
                  </Button>
                </Link>
              )}

              {/* Cart */}
              <Link to={createPageUrl("Cart")}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-amber-100/50 transition-colors"
                >
                  <ShoppingBag className="w-6 h-6 text-amber-700" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center bg-amber-500 hover:bg-amber-500 text-white text-xs">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* User Menu */}
              {!isLoading && (
                user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-amber-100/50 transition-colors"
                      >
                        <UserIcon className="w-6 h-6 text-amber-700" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 glass-effect border-amber-200">
                      <div className="px-4 py-3 border-b border-amber-200/50">
                        <p className="font-medium text-amber-900">{user.full_name}</p>
                        <p className="text-sm text-amber-600">{user.email}</p>
                      </div>
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-amber-700 hover:bg-amber-50 cursor-pointer"
                      >
                        התנתק
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    onClick={handleLogin}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    התחבר
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Gem className="w-4 h-4 text-amber-200" />
              </div>
              <h3 className="text-2xl font-bold text-amber-100">לוקסוריה תכשיטים</h3>
            </div>
            <p className="text-amber-200 mb-6 max-w-md mx-auto">
              תכשיטים יוקרתיים בעיצוב מיוחד, עם חומרים איכותיים ועבודת יד מעולה
            </p>
            <div className="border-t border-amber-700/50 pt-6">
              <p className="text-amber-300 text-sm">
                &copy; 2024 לוקסוריה תכשיטים. כל הזכויות שמורות.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
