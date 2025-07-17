import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { 
  Home, 
  Calendar, 
  ShoppingCart, 
  CreditCard, 
  Package, 
  Users, 
  BarChart3,
  Settings as SettingsIcon,
  LogOut
} from 'lucide-react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Reservations from './components/Reservations';
import Orders from './components/Orders';
import Billing from './components/Billing';
import Inventory from './components/Inventory';
import Staff from './components/Staff';
import Settings from './components/Settings';
import { supabase } from './lib/supabase';

const navigation = [
  { name: 'Dashboard', icon: Home, key: 'dashboard' },
  { name: 'Reservations', icon: Calendar, key: 'reservations' },
  { name: 'Orders', icon: ShoppingCart, key: 'orders' },
  { name: 'Billing', icon: CreditCard, key: 'billing' },
  { name: 'Inventory', icon: Package, key: 'inventory' },
  { name: 'Staff', icon: Users, key: 'staff' },
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<User | null>(null);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (!user) {
    return <Auth onAuthChange={setUser} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'reservations':
        return <Reservations />;
      case 'orders':
        return <Orders />;
      case 'billing':
        return <Billing />;
      case 'inventory':
        return <Inventory />;
      case 'staff':
        return <Staff />;
      case 'settings':
        return <Settings user={user} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <BarChart3 className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Fork and Flames</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setActiveTab('settings')}
                className={`p-2 transition-colors ${
                  activeTab === 'settings' 
                    ? 'text-blue-600' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <SettingsIcon className="h-5 w-5" />
              </button>
              <button 
                onClick={handleSignOut}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => setActiveTab(item.key)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === item.key
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;