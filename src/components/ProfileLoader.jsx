import React from 'react'

const ProfileLoader = () => {
  return (
    <div className="profile-outer w-full md:py-7 py-3 px-5 mx-auto animate-pulse">
      <div className="profile-inner space-y-3">
        {/* Profile Picture Header */}
        <div className="h-8 w-48 bg-gray-200 rounded"></div>

        {/* Profile Picture Section */}
        <div className="pic-btn flex space-x-7">
          {/* Avatar Circle */}
          <div className="rounded-full h-32 w-32 bg-gray-200 flex-shrink-0"></div>
          
          {/* Edit Profile Button */}
          <div className="btn flex items-center">
            <div className="h-10 w-28 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="profile-form">
          <div className="profile-details space-y-5 md:w-4/6 w-full mx-auto md:mx-0">
            {/* Full Name */}
            <div className="profile-name space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-8 w-full bg-gray-200 rounded-md"></div>
            </div>

            {/* Username */}
            <div className="profile-uname space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-8 w-full bg-gray-200 rounded-md"></div>
              <div className="h-3 w-32 bg-gray-200 rounded"></div>
            </div>

            {/* Billing Address */}
            <div className="profile-address space-y-2">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-8 w-full bg-gray-200 rounded-md"></div>
            </div>

            {/* Email */}
            <div className="profile-email space-y-2">
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
              <div className="h-8 w-full bg-gray-200 rounded-md"></div>
            </div>

            {/* Phone */}
            <div className="profile-phone space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-8 w-full bg-gray-200 rounded-md"></div>
            </div>

            {/* Action Buttons */}
            <div className="submit-btns pt-3 flex space-x-3">
              <div className="h-9 w-32 bg-gray-200 rounded-full"></div>
              <div className="h-9 w-32 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileLoader