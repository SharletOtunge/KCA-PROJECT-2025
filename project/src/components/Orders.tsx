import React, { useState } from 'react';
import { useOrders, useMenuItems, useTables, useEmployees } from '../hooks/useSupabase';
import { 
  ShoppingCart, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Plus,
  Minus,
  Search,
  Filter,
  ChefHat,
  Truck,
  Receipt,
  User,
  Percent
} from 'lucide-react';

const Orders = () => {
  const { orders, loading, createOrder, updateOrderStatus } = useOrders();
  const { menuItems } = useMenuItems();
  const { tables } = useTables();
  const { employees } = useEmployees();
  
  const [selectedTab, setSelectedTab] = useState('active');
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [showReceipt, setShowReceipt] = useState<any>(null);
  const [newOrder, setNewOrder] = useState({
    table_id: '',
    order_type: 'dine_in' as 'dine_in' | 'takeout' | 'delivery',
    items: [] as Array<{id: string, name: string, price: number, quantity: number}>,
    special_instructions: '',
    discount_percentage: 0
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Group menu items by category
  const groupedMenuItems = menuItems.reduce((acc, item) => {
    const categoryName = item.category?.name || 'Uncategorized';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  const addItemToOrder = (item: {id: string, name: string, price: number} | any) => {
    const existingItem = newOrder.items.find(orderItem => orderItem.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      newOrder.items.push({ id: item.id, name: item.name, price: item.price, quantity: 1 });
    }
    setNewOrder({
      ...newOrder
    });
  };

  const removeItemFromOrder = (itemName: string) => {
    const updatedItems = newOrder.items.filter(item => item.name !== itemName);
    setNewOrder({
      ...newOrder,
      items: updatedItems
    });
  };

  const updateQuantity = (itemName: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItemFromOrder(itemName);
      return;
    }
    
    const updatedItems = newOrder.items.map(item =>
      item.name === itemName ? { ...item, quantity: newQuantity } : item
    );
    setNewOrder({
      ...newOrder,
      items: updatedItems
    });
  };

  const handleCreateOrder = async () => {
    try {
      if (newOrder.items.length === 0) {
        alert('Please add items to the order');
        return;
      }

      if (newOrder.order_type === 'dine_in' && !newOrder.table_id) {
        alert('Please select a table for dine-in orders');
        return;
      }

      const subtotal = newOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const taxAmount = subtotal * 0.16; // 16% VAT in Kenya
      const discountAmount = subtotal * (newOrder.discount_percentage / 100);
      const totalAmount = subtotal + taxAmount - discountAmount;

      const orderData = {
        restaurant_id: '550e8400-e29b-41d4-a716-446655440000',
        table_id: newOrder.order_type === 'dine_in' ? newOrder.table_id || undefined : undefined,
        order_number: `ORD-${Date.now()}`,
        order_type: newOrder.order_type,
        status: 'pending' as const,
        subtotal,
        tax_amount: taxAmount,
        discount_amount: discountAmount,
        total_amount: totalAmount,
        special_instructions: newOrder.special_instructions
      };

      await createOrder(orderData);
      
      setShowNewOrder(false);
      setNewOrder({
        table_id: '',
        order_type: 'dine_in',
        items: [],
        special_instructions: '',
        discount_percentage: 0
      });
      alert('Order created successfully!');
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  const handleStatusUpdate = async (orderId: string, status: string) => {
    await updateOrderStatus(orderId, status as any);
    
    // Show receipt when order is delivered
    if (status === 'delivered') {
      const order = orders.find(o => o.id === orderId);
      if (order) {
        setShowReceipt(order);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter orders based on selected tab
  const filteredOrders = orders.filter(order => {
    switch (selectedTab) {
      case 'active':
        return ['pending', 'confirmed', 'preparing'].includes(order.status);
      case 'ready':
        return order.status === 'ready';
      case 'completed':
        return ['delivered', 'cancelled'].includes(order.status);
      default:
        return true;
    }
  });

  // Format currency in Kenyan Shillings
  const formatKES = (amount: number) => {
    return `KES ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Get current server (employee)
  const getCurrentServer = () => {
    return employees.find(emp => emp.status === 'active') || { name: 'Staff Member' };
  };

  // Generate receipt
  const generateReceipt = (order: any) => {
    const server = getCurrentServer();
    const currentTime = new Date().toLocaleString('en-US', {
      timeZone: 'Africa/Nairobi',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    return {
      ...order,
      server: server.name,
      servedAt: currentTime,
      receiptNumber: `RCP-${Date.now()}`,
      businessDetails: {
        name: 'Fork and Flames',
        address: 'Nairobi, Kenya',
        phone: '0759311571',
        email: 'sharletfina2@gmail.com',
        vatReg: 'P051234567M',
        pin: 'A012345678Z'
      }
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Manage customer orders and kitchen operations</p>
        </div>
        <button
          onClick={() => setShowNewOrder(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Order
        </button>
      </div>

      {/* Order Status Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {['active', 'ready', 'completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  selectedTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab} Orders
              </button>
            ))}
          </nav>
        </div>

        {/* Filter Bar */}
        <div className="p-6 border-b">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Filter className="h-5 w-5 text-gray-400" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="divide-y divide-gray-200">
          {filteredOrders.map((order) => (
            <div key={order.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{order.order_number}</h3>
                  <p className="text-sm text-gray-600">
                    {order.table?.table_number || order.order_type} • 
                    {new Date(order.created_at).toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
                  <div className="space-y-1">
                    {order.order_items?.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.quantity}x {item.menu_item?.name}</span>
                        <span>${item.total_price.toFixed(2)}</span>
                      </div>
                    )) || <p className="text-sm text-gray-500">Loading items...</p>}
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">Total: {formatKES(order.total_amount)}</p>
                  <div className="flex justify-end space-x-2 mt-2">
                    {order.status === 'pending' && (
                      <button 
                        onClick={() => handleStatusUpdate(order.id, 'confirmed')}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Confirm
                      </button>
                    )}
                    {order.status === 'confirmed' && (
                      <button 
                        onClick={() => handleStatusUpdate(order.id, 'preparing')}
                        className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 flex items-center"
                      >
                        <ChefHat className="h-3 w-3 mr-1" />
                        Start Cooking
                      </button>
                    )}
                    {order.status === 'preparing' && (
                      <button 
                        onClick={() => handleStatusUpdate(order.id, 'ready')}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 flex items-center"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Mark Ready
                      </button>
                    )}
                    {order.status === 'ready' && (
                      <button 
                        onClick={() => handleStatusUpdate(order.id, 'delivered')}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center"
                      >
                        <Truck className="h-3 w-3 mr-1" />
                        Mark Delivered
                      </button>
                    )}
                    {order.status === 'delivered' && (
                      <button 
                        onClick={() => setShowReceipt(generateReceipt(order))}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 flex items-center"
                      >
                        <Receipt className="h-3 w-3 mr-1" />
                        View Receipt
                      </button>
                    )}
                    <button 
                      onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 flex items-center"
                    >
                      <XCircle className="h-3 w-3 mr-1" />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Order Modal */}
      {showNewOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Order</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Menu Items */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Menu Items</h4>
                <div className="space-y-4">
                  {Object.entries(groupedMenuItems).map(([categoryName, items]) => (
                    <div key={categoryName}>
                      <h5 className="font-medium text-gray-700 mb-2">{categoryName}</h5>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center p-2 border rounded hover:bg-gray-50">
                            <div>
                              <p className="font-medium text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-600">{formatKES(item.price)}</p>
                            </div>
                            <button
                              onClick={() => addItemToOrder(item)}
                              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                            >
                              Add
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
                <div className="border rounded-lg p-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Table</label>
                    <select
                      value={newOrder.order_type}
                      onChange={(e) => setNewOrder({...newOrder, order_type: e.target.value as any})}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="dine_in">Dine In</option>
                      <option value="takeout">Takeout</option>
                      <option value="delivery">Delivery</option>
                    </select>
                  </div>

                  {newOrder.order_type === 'dine_in' && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Select Table</label>
                      <select
                        value={newOrder.table_id}
                        onChange={(e) => setNewOrder({...newOrder, table_id: e.target.value})}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Table</option>
                        {tables.map(table => (
                          <option key={table.id} value={table.id}>{table.table_number} (Capacity: {table.capacity})</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                    <textarea
                      value={newOrder.special_instructions}
                      onChange={(e) => setNewOrder({...newOrder, special_instructions: e.target.value})}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                      placeholder="Any special instructions..."
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={newOrder.discount_percentage}
                        onChange={(e) => setNewOrder({...newOrder, discount_percentage: parseFloat(e.target.value) || 0})}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {newOrder.items.map((item) => (
                      <div key={item.name} className="flex justify-between items-center">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">{formatKES(item.price)} each</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.name, item.quantity - 1)}
                            className="p-1 rounded-full hover:bg-gray-200"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.name, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-gray-200"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => removeItemFromOrder(item.name)}
                            className="p-1 rounded-full hover:bg-red-200 text-red-600"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {newOrder.items.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No items added to order</p>
                  )}

                  <div className="border-t pt-4 mt-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>{formatKES(newOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0))}</span>
                      </div>
                      {newOrder.discount_percentage > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount ({newOrder.discount_percentage}%):</span>
                          <span>-{formatKES(newOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) * (newOrder.discount_percentage / 100))}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>VAT (16%):</span>
                        <span>{formatKES(newOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.16)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total:</span>
                      <span>{formatKES(
                        (() => {
                          const subtotal = newOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                          const discount = subtotal * (newOrder.discount_percentage / 100);
                          const tax = subtotal * 0.16;
                          return subtotal + tax - discount;
                        })()
                      )}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowNewOrder(false);
                  setNewOrder({ table_id: '', order_type: 'dine_in', items: [], special_instructions: '', discount_percentage: 0 });
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateOrder}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={newOrder.items.length === 0}
              >
                Create Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">{showReceipt.businessDetails?.name || 'RestaurantPro Kenya'}</h3>
              <p className="text-sm text-gray-600">{showReceipt.businessDetails?.address || 'Nairobi, Kenya'}</p>
              <p className="text-sm text-gray-600">{showReceipt.businessDetails?.phone || '+254 700 123 456'}</p>
              <p className="text-sm text-gray-600">Official Receipt</p>
              <p className="text-xs text-gray-500">Receipt #: {showReceipt.receiptNumber}</p>
              <div className="border-b my-3"></div>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span>Order Number:</span>
                <span className="font-medium">{showReceipt.order_number}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Customer:</span>
                <span>{showReceipt.customer?.name || 'Walk-in Customer'}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Date & Time:</span>
                <span>{showReceipt.servedAt}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Served by:</span>
                <span className="font-medium">{showReceipt.server}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Table/Type:</span>
                <span>{showReceipt.table?.table_number || showReceipt.order_type}</span>
              </div>
              
              {showReceipt.special_instructions && (
                <div className="flex justify-between">
                  <span>Special Instructions:</span>
                  <span className="text-right max-w-32">{showReceipt.special_instructions}</span>
                </div>
              )}
              
              <div className="border-t pt-3">
                <h4 className="font-medium mb-2">Items Ordered:</h4>
                {showReceipt.order_items?.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.quantity}x {item.menu_item?.name}</span>
                    <span>{formatKES(item.total_price)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-3 space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatKES(showReceipt.subtotal)}</span>
                </div>
                {showReceipt.discount_amount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-{formatKES(showReceipt.discount_amount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>VAT (16%):</span>
                  <span>{formatKES(showReceipt.tax_amount)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total Paid:</span>
                  <span>{formatKES(showReceipt.total_amount)}</span>
                </div>
              </div>
              
              <div className="text-center text-xs text-gray-500 mt-4 pt-3 border-t">
                <p>Thank you for dining with us!</p>
                <p>VAT Reg: {showReceipt.businessDetails?.vatReg || 'P051234567M'}</p>
                <p>PIN: {showReceipt.businessDetails?.pin || 'A012345678Z'}</p>
                <p>Email: {showReceipt.businessDetails?.email || 'info@restaurantpro.co.ke'}</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowReceipt(null)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;