import React, { useState } from 'react';
import { useReservations, useTables, useCustomers } from '../hooks/useSupabase';
import { 
  Calendar, 
  Clock, 
  Users, 
  Phone, 
  Mail, 
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Edit
} from 'lucide-react';

const Reservations = () => {
  const { reservations, loading, createReservation, updateReservation, deleteReservation } = useReservations();
  const { tables } = useTables();
  const { customers, createCustomer } = useCustomers();
  
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showNewReservation, setShowNewReservation] = useState(false);
  const [newReservation, setNewReservation] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    party_size: 2,
    reservation_date: new Date().toISOString().split('T')[0],
    reservation_time: '18:00',
    table_id: '',
    special_requests: ''
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const timeSlots = [
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', 
    '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'
  ];

  const handleCreateReservation = async () => {
    try {
      // Validate required fields
      if (!newReservation.customer_name || !newReservation.reservation_date || !newReservation.reservation_time) {
        alert('Please fill in all required fields');
        return;
      }

      // Check for table conflicts
      const conflictingReservation = reservations.find(r => 
        r.reservation_date === newReservation.reservation_date &&
        r.reservation_time === newReservation.reservation_time &&
        r.table_id === newReservation.table_id &&
        r.status !== 'cancelled'
      );

      if (conflictingReservation && newReservation.table_id) {
        alert('This table is already reserved for the selected time. Please choose a different table or time.');
        return;
      }

      await createReservation({
        restaurant_id: '550e8400-e29b-41d4-a716-446655440000', // Demo restaurant ID
        ...newReservation,
        status: 'pending'
      });
      
      setShowNewReservation(false);
      setNewReservation({
        customer_name: '',
        customer_phone: '',
        customer_email: '',
        party_size: 2,
        reservation_date: new Date().toISOString().split('T')[0],
        reservation_time: '18:00',
        table_id: '',
        special_requests: ''
      });
      alert('Reservation created successfully!');
    } catch (error) {
      console.error('Failed to create reservation:', error);
      alert('Failed to create reservation. Please try again.');
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await updateReservation(id, { status: status as any });
    } catch (error) {
      console.error('Failed to update reservation:', error);
    }
  };

  const handleDeleteReservation = async (id: string) => {
    try {
      await deleteReservation(id);
    } catch (error) {
      console.error('Failed to delete reservation:', error);
    }
  };

  // Filter reservations by selected date
  const filteredReservations = reservations.filter(reservation => 
    reservation.reservation_date === selectedDate
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
          <p className="text-gray-600">Manage table bookings and customer reservations</p>
        </div>
        <button
          onClick={() => setShowNewReservation(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Reservation
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search reservations..."
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5 text-gray-400" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Reservations List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Today's Reservations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Party Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Table
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
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
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{reservation.customer_name}</div>
                      {reservation.special_requests && (
                        <div className="text-sm text-gray-500">{reservation.special_requests}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{reservation.party_size}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{reservation.reservation_time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {reservation.table?.table_number || 'TBD'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{reservation.customer_phone || 'N/A'}</div>
                    <div className="text-sm text-gray-500">{reservation.customer_email || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleUpdateStatus(reservation.id, reservation.status === 'pending' ? 'confirmed' : 'pending')}
                      className="text-blue-600 hover:text-blue-900 mr-3 flex items-center"
                    >
                      {reservation.status === 'pending' ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Confirm
                        </>
                      ) : (
                        <>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </>
                      )}
                    </button>
                    <button 
                      onClick={() => handleDeleteReservation(reservation.id)}
                      className="text-red-600 hover:text-red-900 flex items-center"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Reservation Modal */}
      {showNewReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">New Reservation</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  value={newReservation.customer_name}
                  onChange={(e) => setNewReservation({...newReservation, customer_name: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter customer name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Party Size</label>
                  <select 
                    value={newReservation.party_size}
                    onChange={(e) => setNewReservation({...newReservation, party_size: parseInt(e.target.value)})}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={newReservation.reservation_time}
                    onChange={(e) => setNewReservation({...newReservation, reservation_time: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newReservation.reservation_date}
                  onChange={(e) => setNewReservation({...newReservation, reservation_date: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Table</label>
                <select 
                  value={newReservation.table_id}
                  onChange={(e) => setNewReservation({...newReservation, table_id: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Table</option>
                  {tables.map(table => (
                    <option key={table.id} value={table.id}>{table.table_number} (Capacity: {table.capacity})</option>
                    ))}
                  </select>
                </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={newReservation.customer_phone}
                  onChange={(e) => setNewReservation({...newReservation, customer_phone: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newReservation.customer_email}
                  onChange={(e) => setNewReservation({...newReservation, customer_email: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="customer@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Notes</label>
                <textarea
                  value={newReservation.special_requests}
                  onChange={(e) => setNewReservation({...newReservation, special_requests: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Any special requests or notes..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowNewReservation(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateReservation}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={!newReservation.customer_name || !newReservation.reservation_date || !newReservation.reservation_time}
              >
                Create Reservation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservations;