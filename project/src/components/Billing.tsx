import React, { useState } from 'react';
import { useBills, useOrders } from '../hooks/useSupabase';
import { 
  CreditCard, 
  Receipt, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Download,
  Eye,
  Search,
  Filter,
  Plus,
  Printer,
  CheckCircle
} from 'lucide-react';

const Billing = () => {
  const { bills, loading, createBill } = useBills();
  const { orders } = useOrders();
  
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [showBillDetail, setShowBillDetail] = useState(null);
  const [showCreateBill, setShowCreateBill] = useState(false);
  const [newBill, setNewBill] = useState({
    order_id: '',
    payment_method: 'credit_card' as 'cash' | 'credit_card' | 'debit_card' | 'digital_wallet',
    discount_amount: 0,
    tip_amount: 0
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Calculate real-time stats
  const today = new Date().toISOString().split('T')[0];
  const todayBills = bills.filter(bill => 
    bill.created_at.split('T')[0] === today
  );
  
  const paidBills = todayBills.filter(bill => bill.status === 'paid');
  const totalSales = paidBills.reduce((sum, bill) => sum + bill.total_amount, 0);
  const averageTicket = paidBills.length > 0 ? totalSales / paidBills.length : 0;
  const cashPayments = paidBills.filter(bill => bill.payment_method === 'cash').reduce((sum, bill) => sum + bill.total_amount, 0);
  const cardPayments = paidBills.filter(bill => bill.payment_method === 'credit_card' || bill.payment_method === 'debit_card').reduce((sum, bill) => sum + bill.total_amount, 0);

  // Format currency in Kenyan Shillings
  const formatKES = (amount) => {
    return `KES ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Get completed orders that don't have bills yet
  const unbilledOrders = orders.filter(order => 
    order.status === 'delivered' && 
    !bills.some(bill => bill.order_id === order.id)
  );

  const handleCreateBill = async () => {
    try {
      const selectedOrder = orders.find(order => order.id === newBill.order_id);
      if (!selectedOrder) {
        alert('Please select an order');
        return;
      }

      const subtotal = selectedOrder.subtotal;
      const taxAmount = selectedOrder.tax_amount;
      const totalAmount = subtotal + taxAmount - newBill.discount_amount + newBill.tip_amount;

      const billData = {
        restaurant_id: '550e8400-e29b-41d4-a716-446655440000',
        order_id: newBill.order_id,
        customer_id: selectedOrder.customer_id,
        bill_number: `BILL-${Date.now()}`,
        subtotal,
        tax_amount: taxAmount,
        discount_amount: newBill.discount_amount,
        tip_amount: newBill.tip_amount,
        total_amount: totalAmount,
        payment_method: newBill.payment_method,
        status: 'pending' as const
      };

      await createBill(billData);
      
      setShowCreateBill(false);
      setNewBill({
        order_id: '',
        payment_method: 'credit_card',
        discount_amount: 0,
        tip_amount: 0
      });
      alert('Bill created successfully!');
    } catch (error) {
      console.error('Failed to create bill:', error);
      alert('Failed to create bill. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing & Payments</h1>
          <p className="text-gray-600">Manage invoices, payments, and financial reports</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Export Report
          </button>
          <button
            onClick={() => setShowCreateBill(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Bill
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">{formatKES(totalSales)}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-600">+12.5%</span>
            <span className="text-sm text-gray-500 ml-1">from yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Number of Bills</p>
              <p className="text-2xl font-bold text-gray-900">{todayBills.length}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-full">
              <Receipt className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-600">+8.2%</span>
            <span className="text-sm text-gray-500 ml-1">from yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Ticket</p>
              <p className="text-2xl font-bold text-gray-900">{formatKES(averageTicket)}</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-full">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-600">+3.1%</span>
            <span className="text-sm text-gray-500 ml-1">from yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Card Payments</p>
              <p className="text-2xl font-bold text-gray-900">{formatKES(cardPayments)}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-500">Cash: {formatKES(cashPayments)}</span>
          </div>
        </div>
      </div>

      {/* Period Selector and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search bills..."
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5 text-gray-400" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Bills List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Recent Bills</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bill ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Table/Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bills.map((bill) => (
                <tr key={bill.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {bill.bill_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {bill.order?.table?.table_number || bill.order?.order_type}
                    </div>
                    <div className="text-sm text-gray-500">
                      {bill.customer?.name || 'Walk-in Customer'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(bill.created_at).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(bill.created_at).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatKES(bill.total_amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bill.payment_method?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(bill.status)}`}>
                      {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setShowBillDetail(bill)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Printer className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bill Detail Modal */}
      {showBillDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bill Details - {showBillDetail.bill_number}</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Table:</span>
                <span className="font-medium">
                  {showBillDetail.order?.table?.table_number || showBillDetail.order?.order_type}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Customer:</span>
                <span className="font-medium">
                  {showBillDetail.customer?.name || 'Walk-in Customer'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Date & Time:</span>
                <span className="font-medium">
                  {new Date(showBillDetail.created_at).toLocaleDateString()} {new Date(showBillDetail.created_at).toLocaleTimeString()}
                </span>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Items</h4>
                <div className="space-y-2">
                  {showBillDetail.bill_items?.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.menu_item_name}</span>
                      <span>{formatKES(item.total_price)}</span>
                    </div>
                  )) || <p className="text-sm text-gray-500">Loading items...</p>}
                </div>
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>{formatKES(showBillDetail.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>VAT (16%):</span>
                  <span>{formatKES(showBillDetail.tax_amount)}</span>
                </div>
                {showBillDetail.discount_amount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount:</span>
                    <span>-{formatKES(showBillDetail.discount_amount)}</span>
                  </div>
                )}
                {showBillDetail.tip_amount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Tip:</span>
                    <span>{formatKES(showBillDetail.tip_amount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                  <span>Total:</span>
                  <span>{formatKES(showBillDetail.total_amount)}</span>
                </div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">
                  {showBillDetail.payment_method?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'N/A'}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(showBillDetail.status)}`}>
                  {showBillDetail.status}
                </span>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowBillDetail(null)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Print Bill
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Bill Modal */}
      {showCreateBill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Bill</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Order</label>
                <select
                  value={newBill.order_id}
                  onChange={(e) => setNewBill({...newBill, order_id: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an order</option>
                  {unbilledOrders.map(order => (
                    <option key={order.id} value={order.id}>
                      {order.order_number} - {order.table?.table_number || order.order_type} - {formatKES(order.total_amount)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  value={newBill.payment_method}
                  onChange={(e) => setNewBill({...newBill, payment_method: e.target.value as any})}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="credit_card">Credit Card</option>
                  <option value="debit_card">Debit Card</option>
                  <option value="cash">Cash</option>
                  <option value="digital_wallet">Digital Wallet</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount (KES)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newBill.discount_amount}
                    onChange={(e) => setNewBill({...newBill, discount_amount: parseFloat(e.target.value) || 0})}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tip (KES)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newBill.tip_amount}
                    onChange={(e) => setNewBill({...newBill, tip_amount: parseFloat(e.target.value) || 0})}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {newBill.order_id && (
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Bill Summary</h4>
                  {(() => {
                    const selectedOrder = orders.find(order => order.id === newBill.order_id);
                    if (!selectedOrder) return null;
                    
                    const subtotal = selectedOrder.subtotal;
                    const tax = selectedOrder.tax_amount;
                    const total = subtotal + tax - newBill.discount_amount + newBill.tip_amount;
                    
                    return (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>{formatKES(subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>VAT (16%):</span>
                          <span>{formatKES(tax)}</span>
                        </div>
                        {newBill.discount_amount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount:</span>
                            <span>-{formatKES(newBill.discount_amount)}</span>
                          </div>
                        )}
                        {newBill.tip_amount > 0 && (
                          <div className="flex justify-between">
                            <span>Tip:</span>
                            <span>{formatKES(newBill.tip_amount)}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-semibold text-lg border-t pt-2">
                          <span>Total:</span>
                          <span>{formatKES(total)}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateBill(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBill}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={!newBill.order_id}
              >
                Create Bill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;