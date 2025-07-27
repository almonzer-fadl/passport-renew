import { useEffect } from "react";


export function AppView(props){
    const passportData = props.passport
   

   
  return (

    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <div className="bg-white border-2 border-blue-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-800 text-white text-center py-3">
          <h1 className="text-xl font-bold">REPUBLIC OF SUDAN</h1>
          <h2 className="text-lg">جمهورية السودان</h2>
          <h3 className="text-base mt-1">PASSPORT - جواز السفر</h3>
        </div>

        {/* Main Content */}
        <div className="p-6 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="grid grid-cols-3 gap-6">
            
            {/* Left Section - Personal Information */}
            <div className="col-span-2 space-y-4">
              
              {/* Passport Number */}
              <div className="mb-6">
                <div className="text-xs text-gray-600 mb-1">PASSPORT NO. / رقم جواز السفر</div>
                <div className="text-2xl font-bold text-blue-800 tracking-wider">
                  {passportData.passportNo}
                </div>
              </div>

              {/* Full Name in Arabic */}
              <div>
                <div className="text-xs text-gray-600 mb-1">الاسم الكامل</div>
                <div className="text-lg font-semibold text-right" dir="rtl">
                  {passportData.fullnameAr}
                </div>
              </div>

              {/* Full Name in English */}
              <div>
                <div className="text-xs text-gray-600 mb-1">FULL NAME</div>
                <div className="text-lg font-semibold uppercase">
                  {passportData.fullnameEn}
                </div>
              </div>

              {/* Birth Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-600 mb-1">DATE OF BIRTH / تاريخ الميلاد</div>
                  <div className="text-base font-medium">
                    {passportData.birthday}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">PLACE OF BIRTH / مكان الميلاد</div>
                  <div className="text-base font-medium">
                    {passportData.birthPlace}
                  </div>
                </div>
              </div>

              {/* Additional passport details */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <div className="text-xs text-gray-600 mb-1">DATE OF ISSUE / تاريخ الإصدار</div>
                  <div className="text-base font-medium">{passportData.issueDate.toISOString().split('T')[0]}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">DATE OF EXPIRY / تاريخ الانتهاء</div>
                  <div className="text-base font-medium">{passportData.expiryDate.toISOString().split('T')[0]}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-600 mb-1">SEX / الجنس</div>
                  <div className="text-base font-medium">{passportData.gender.toUpperCase()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">NATIONALITY / الجنسية</div>
                  <div className="text-base font-medium">SUDANESE</div>
                </div>
              </div>
            </div>

            {/* Right Section - Photo and Signature */}
            <div className="col-span-1 space-y-4">
              {/* Personal Photo */}
              <div className="text-center">
                <div className="text-xs text-gray-600 mb-2">PHOTO / الصورة</div>
                <div className="border-2 border-gray-300 p-2 bg-white">
                  <img 
                    src={passportData.personalPhoto} 
                    alt="Passport Photo" 
                    className="w-32 h-40 object-cover mx-auto"
                  />
                </div>
              </div>

              {/* Signature */}
              <div className="text-center">
                <div className="text-xs text-gray-600 mb-2">SIGNATURE / التوقيع</div>
                <div className="border border-gray-300 p-2 bg-white h-16 flex items-center justify-center">
                  <img 
                    src={passportData.signature} 
                    alt="Signature" 
                    className="max-w-full max-h-full"
                  />
                </div>
              </div>

              {/* Authority */}
              <div className="text-center mt-6">
                <div className="text-xs text-gray-600 mb-1">ISSUING AUTHORITY</div>
                <div className="text-xs">السلطة المصدرة</div>
                <div className="text-sm font-medium mt-1">MINISTRY OF INTERIOR</div>
              </div>
            </div>
          </div>

          {/* Machine Readable Zone */}
          <div className="mt-8 pt-4 border-t-2 border-dashed border-gray-400">
            <div className="text-xs text-gray-600 mb-2">MACHINE READABLE ZONE</div>
            <div className="bg-gray-100 p-2 font-mono text-xs">
              <div>P&lt;SDN{passportData.fullnameEn.replace(/\s+/g, '&lt;&lt;')}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
              <div>{passportData.passportNo}0SDN9003155M1408072&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;02</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}