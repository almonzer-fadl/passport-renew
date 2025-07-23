import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../auth/AuthContext'

export const UserDashboard = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate()
  // Sample data - replace with your actual data
  const {user} = useAuth()
  const applications = user.applications

   

  const filters = ['All', 'Approved', 'Pending', 'Rejected'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'rejected':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };



  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <span className="font-medium">Applications</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-2.5">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
           
          </div>
        </div>
      </div>

      <div className="flex">
       


        {/* Main Content */}
        <div className="flex-1">
          {/* Filter Tabs */}
          <div className="border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex space-x-1">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-5 py-2 text-sm font-medium rounded-lg ${
                      activeFilter === filter
                        ? 'bg-green-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <button className="flex items-center space-x-4 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                <span>Filter</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-3">DETAILS</div>
              <div className="col-span-2">STATUS</div>
              <div className="col-span-2">PASSPORT NO.</div>
              <div className="col-span-1">TIME CREATED</div>
              <div className="col-span-2">LOCATION</div>
              <div className="col-span-2">PAYMENT OUTSTANDING</div>
            </div>
          </div>

         

          {/* Table Content */}
          <div className="bg-white">
            
            {applications&&applications.map((app, index) => (
              <div key={user.id} className={`grid grid-cols-12 gap-4 px-5 py-4 border-b border-t border-gray-200 hover:bg-gray-50 overflow-scroll ${index%2==1?"bg-gray-100":"bg-white"}`}>
                {/* Details */}
                <div className="col-span-3 flex items-center space-x-2">
                  <div className="flex-shrink-0">
                    <img
                      className="h-16 w-12 rounded-xl object-cover"
                      src={app.personalPhoto}
                      alt={app.fullName}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">{app.fullname}</p>
                    <p className="text-xs text-gray-500">{app.fullname}</p>
                    <p className="text-xs text-gray-400 font-mono overflow-ellipsis">{app._id}</p>
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-2 flex items-center">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusDot(app.status)}`}></div>
                    <span className={`text-sm font-medium ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                </div>

                {/* Passport ID */}
                <div className="col-span-2 flex items-center">
                  <span className="text-sm text-gray-900">{app.passportNo}</span>
                </div>

                {/* Time Created */}
                <div className="col-span-1 flex items-center">
                  <div>
                    {/* <p className="text-sm text-gray-900">{new Date().toLocaleDateString()}</p> */}
                    <p className="text-xs text-gray-900">{formatDate(app.dateCreated)}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="col-span-2 flex items-center">
                  <div>
                    <p className="text-sm text-gray-900">{app.location}</p>
                    {/* <p className="text-xs text-gray-500">{formatDate(user.dateCreated)}</p> */}
                  </div>
                </div>

                {/* Payment Outstanding */}
                <div className="col-span-1 flex items-center">
                  <div>
                    <p className="text-sm text-gray-900">$0.00</p>
                    {/* <p className="text-xs text-gray-500">{formatDate(user.dateCreated)}</p> */}
                  </div>
                </div>
              </div>
            ))}
             {applications&&applications.length===0 ?(
            <div className='w-full h-full flex flex-col gap-5 justify-center items-center text-gray-600 my-10'>
              <h2 className='text-3xl'>You don't have any applications to see</h2>
              <p>Press the button to start a new application</p>
                              <button className="btn btn-primary" onClick={()=>{navigate('/application')}}>Start New Application</button>

            </div>
          ):<></>}
          </div>
        </div>
      </div>
       
    </div>
    
  );
};

