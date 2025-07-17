import React, { useState } from 'react';
import { useEmployees } from '../hooks/useSupabase';
import { 
  Users, 
  Clock, 
  Calendar, 
  Phone, 
  Mail, 
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Award,
  DollarSign,
  Save,
  X
} from 'lucide-react';

const Staff = () => {
  const { employees, loading, createEmployee } = useEmployees();
  
  const [selectedTab, setSelectedTab] = useState('employees');
  const [showNewEmployee, setShowNewEmployee] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    department: '',
    phone: '',
    email: '',
    hourly_rate: 0,
    hire_date: new Date().toISOString().split('T')[0]
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const shifts = [
    { id: 1, employee: 'Sarah Johnson', date: '2024-01-15', startTime: '10:00 AM', endTime: '6:00 PM', position: 'Head Chef' },
    { id: 2, employee: 'Mike Rodriguez', date: '2024-01-15', startTime: '5:00 PM', endTime: '11:00 PM', position: 'Server' },
    { id: 3, employee: 'Lisa Chen', date: '2024-01-15', startTime: '2:00 PM', endTime: '10:00 PM', position: 'Sous Chef' },
    { id: 4, employee: 'David Thompson', date: '2024-01-15', startTime: '6:00 PM', endTime: '12:00 AM', position: 'Bartender' },
    { id: 5, employee: 'Emma Wilson', date: '2024-01-15', startTime: '4:00 PM', endTime: '10:00 PM', position: 'Host' }
  ];

  const departments = ['All', 'Kitchen', 'Front of House', 'Bar', 'Management'];
  const positions = ['Head Chef', 'Sous Chef', 'Cook', 'Server', 'Bartender', 'Host', 'Manager'];

  const handleCreateEmployee = async () => {
    try {
      if (!newEmployee.name || !newEmployee.position || !newEmployee.department) {
        alert('Please fill in all required fields');
        return;
      }

      await createEmployee({
        restaurant_id: '550e8400-e29b-41d4-a716-446655440000',
        ...newEmployee,
        status: 'active'
      });
      
      setShowNewEmployee(false);
      setNewEmployee({
        name: '',
        position: '',
        department: '',
        phone: '',
        email: '',
        hourly_rate: 0,
        hire_date: new Date().toISOString().split('T')[0]
      });
      alert('Employee added successfully!');
    } catch (error) {
      console.error('Failed to create employee:', error);
      alert('Failed to add employee. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'on_leave':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPayroll = employees.reduce((sum, emp) => {
    // Calculate weekly hours from shifts (mock data for now)
    const weeklyHours = 40; // This would come from actual shift data
    return sum + ((emp.hourly_rate || 0) * weeklyHours * 4); // Monthly calculation
  }, 0);

  // Format currency in Kenyan Shillings
  const formatKES = (amount) => {
    return `KES ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600">Manage employees, schedules, and performance</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowSchedule(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Schedule
          </button>
          <button
            onClick={() => setShowNewEmployee(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Payroll</p>
              <p className="text-2xl font-bold text-gray-900">{formatKES(totalPayroll)}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Hours</p>
              <p className="text-2xl font-bold text-gray-900">
                {employees.length * 40} {/* Mock calculation */}
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-full">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Performance</p>
              <p className="text-2xl font-bold text-gray-900">
                {employees.filter(emp => emp.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-500">Active employees</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {['employees', 'schedule', 'performance'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  selectedTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
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
                  placeholder="Search employees..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Filter className="h-5 w-5 text-gray-400" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {selectedTab === 'employees' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Employee</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Position</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Hours/Week</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Rate</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Performance</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">Started: {employee.hire_date}</div>
                      </td>
                      <td className="py-4 px-4 text-gray-900">{employee.position}</td>
                      <td className="py-4 px-4 text-gray-900">{employee.department}</td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">{employee.phone}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </td>
                      <td className="py-4 px-4 text-gray-900">40</td> {/* Mock hours */}
                      <td className="py-4 px-4 text-gray-900">{formatKES(employee.hourly_rate || 0)}/hr</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                          {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          Good
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedTab === 'schedule' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Add Shift
                </button>
              </div>
              <div className="grid gap-4">
                {shifts.map((shift) => (
                  <div key={shift.id} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900">{shift.employee}</div>
                      <div className="text-sm text-gray-600">{shift.position}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900">{shift.startTime} - {shift.endTime}</div>
                      <div className="text-sm text-gray-600">{shift.date}</div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'performance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {employees.filter(emp => emp.status === 'active').length}
                    </div>
                    <div className="text-sm text-green-800">Active</div>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {employees.filter(emp => emp.status === 'inactive').length}
                    </div>
                    <div className="text-sm text-blue-800">Inactive</div>
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {employees.filter(emp => emp.status === 'on_leave').length}
                    </div>
                    <div className="text-sm text-yellow-800">On Leave</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {employees.map((employee) => (
                  <div key={employee.id} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900">{employee.name}</div>
                      <div className="text-sm text-gray-600">{employee.position}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">This Week</div>
                      <div className="font-medium text-gray-900">40 hours</div>
                    </div>
                    <div>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        Good
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Employee Modal */}
      {showNewEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Employee</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <select
                    value={newEmployee.position}
                    onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Position</option>
                    {positions.map(position => (
                      <option key={position} value={position}>{position}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    value={newEmployee.department}
                    onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Department</option>
                    {departments.slice(1).map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={newEmployee.phone}
                  onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="employee@restaurant.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate (KES)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newEmployee.hourly_rate}
                    onChange={(e) => setNewEmployee({...newEmployee, hourly_rate: parseFloat(e.target.value) || 0})}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="500.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newEmployee.hire_date}
                    onChange={(e) => setNewEmployee({...newEmployee, hire_date: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowNewEmployee(false);
                  setNewEmployee({
                    name: '',
                    position: '',
                    department: '',
                    phone: '',
                    email: '',
                    hourly_rate: 0,
                    hire_date: new Date().toISOString().split('T')[0]
                  });
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateEmployee}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={!newEmployee.name || !newEmployee.position || !newEmployee.department}
              >
                Add Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;