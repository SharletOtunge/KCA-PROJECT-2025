import React from 'react';
import { useOrders, useReservations, useBills } from '../hooks/useSupabase';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Clock, 
  CheckCircle 
} from 'lucide-react';

const Dashboard = () => {
  const { orders, loading: ordersLoading } = useOrders();
  const { reservations, loading: reservationsLoading } = useReservations();
  const { bills, loading: billsLoading } = useBills();

  if (ordersLoading || reservationsLoading || billsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Calculate real-time stats
  const activeOrders = orders.filter(order => 
    order.status === 'preparing' || order.status === 'confirmed'
  );
  
  const todayReservations = reservations.filter(reservation => 
    reservation.reservation_date === new Date().toISOString().split('T')[0]
  );
  
  const todayBills = bills.filter(bill => 
    bill.created_at.split('T')[0] === new Date().toISOString().split('T')[0]
  );
  
  const totalRevenue = todayBills
    .filter(bill => bill.status === 'paid')
    .reduce((sum, bill) => sum + bill.total_amount, 0);
  
  const completionRate = orders.length > 0 
    ? (orders.filter(order => order.status === 'delivered').length / orders.length) * 100
    : 0;

  // Format currency in Kenyan Shillings
  const formatKES = (amount) => {
    return `KES ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const stats = [
    {
      name: 'Total Revenue',
      value: formatKES(totalRevenue),
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign
    },
    {
      name: 'Active Orders',
      value: activeOrders.length.toString(),
      change: '+4',
      changeType: 'positive',
      icon: Clock
    },
    {
      name: 'Reservations Today',
      value: todayReservations.length.toString(),
      change: '-2',
      changeType: 'negative',
      icon: Users
    },
    {
      name: 'Completion Rate',
      value: `${completionRate.toFixed(1)}%`,
      change: '+2.1%',
      changeType: 'positive',
      icon: CheckCircle
    }
  ];

  // Get recent orders with real data
  const recentOrders = orders.slice(0, 4).map(order => ({
    id: order.order_number,
    table: order.table?.table_number || order.order_type,
    items: order.order_items?.map(item => item.menu_item?.name).join(', ') || 'Loading...',
    total: formatKES(order.total_amount),
    status: order.status.charAt(0).toUpperCase() + order.status.slice(1)
  }));

  // Get upcoming reservations with real data
  const upcomingReservations = todayReservations.slice(0, 4).map(reservation => ({
    time: new Date(`2000-01-01T${reservation.reservation_time}`).toLocaleTimeString('en-KE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }),
    party: `${reservation.customer_name} (${reservation.party_size})`,
    table: reservation.table?.table_number || 'TBD',
    phone: reservation.customer_phone || 'N/A'
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening at your restaurant today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.changeType === 'positive' ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">from yesterday</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders and Reservations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{order.id} - {order.table}</p>
                    <p className="text-sm text-gray-500">{order.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{order.total}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'Ready' ? 'bg-green-100 text-green-800' :
                      order.status === 'Preparing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Reservations */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Reservations</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingReservations.map((reservation, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{reservation.time} - {reservation.party}</p>
                    <p className="text-sm text-gray-500">{reservation.table} • {reservation.phone}</p>
                  </div>
                  <div className="text-right">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;