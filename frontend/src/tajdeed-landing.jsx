import React from 'react';
import { CheckCircle, Clock, MapPin, Shield, Camera, FileText, ArrowRight, Users, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TajdeedLanding() {
  const navigate = useNavigate()

  const startApp = ()=>{
    navigate('/home')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Tajdeed</h1>
                <p className="text-sm text-gray-500">تجديد</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How It Works</a>
              {/* <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a> */}
            </nav>
            <button 
            onClick={startApp}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                Renew Your Sudanese Passport
                <span className="block text-blue-600">Anytime, Anywhere</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Skip the long lines and endless waiting. Tajdeed makes passport renewal simple, fast, and secure with advanced AI validation and an intuitive online process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button onClick={startApp} className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center">
                  Start Renewal Process
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                {/* <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors">
                  Learn More
                </button> */}
              </div>
              {/* <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  10,000+ renewals processed
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  4.9/5 user rating
                </div>
              </div> */}
            </div>
            {/* <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Application Preview</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-green-800">Personal Information</span>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-green-800">Document Upload</span>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="text-blue-800">AI Validation</span>
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">Average completion time</p>
                  <p className="text-2xl font-bold text-blue-600">8 minutes</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Traditional Passport Renewal is Broken
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand the frustration of outdated government processes. Here's how Tajdeed solves these problems.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-8">The Old Way</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Hours of Waiting in Lines</h4>
                    <p className="text-gray-600">Stand in long queues for hours, disrupting your entire day and work schedule.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Limited Office Hours & Locations</h4>
                    <p className="text-gray-600">Restricted to specific times and places, making it difficult to fit into your schedule.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FileText className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Weeks of Processing Time</h4>
                    <p className="text-gray-600">Extended waiting periods with uncertain timelines and limited tracking.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-8">The Tajdeed Way</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Apply in Minutes, Not Hours</h4>
                    <p className="text-gray-600">Complete your entire application online in under 10 minutes from the comfort of your home.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">24/7 Availability</h4>
                    <p className="text-gray-600">Apply anytime, anywhere. No more taking time off work or rushing to beat closing hours.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">AI-Powered Validation</h4>
                    <p className="text-gray-600">Advanced technology ensures your documents are perfect before submission, reducing delays.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powered by Advanced Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our cutting-edge features ensure the highest security and easiest experience for your passport renewal.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Photo Validation</h3>
              <p className="text-gray-600 mb-6">
                Using FaceJS technology, we automatically validate that your passport photo meets all official requirements. Our AI checks for proper lighting, background, face positioning, and official standards compliance.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Automatic face detection and positioning
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Background and lighting validation
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Real-time feedback and suggestions
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Document Processing</h3>
              <p className="text-gray-600 mb-6">
                TesseractJS OCR technology automatically extracts and validates information from your existing passport and ID documents, ensuring 100% accuracy and preventing human error.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Automatic data extraction from documents
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Cross-validation of personal information
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Anti-tampering detection
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple 3-Step Process
            </h2>
            <p className="text-xl text-gray-600">
              Get your passport renewed in just a few minutes with our guided process
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fill Information</h3>
              <p className="text-gray-600">
                Complete the simple form with guided assistance. Our smart validation helps you avoid common mistakes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Upload Documents</h3>
              <p className="text-gray-600">
                Take photos of your documents and passport photo. Our AI validates everything automatically in real-time.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Track Progress</h3>
              <p className="text-gray-600">
                Submit your application and track its progress in real-time through your personal dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Renew Your Passport?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of Sudanese citizens who have already experienced the easiest passport renewal process ever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
            onClick={startApp}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Your Application
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              View Sample Application
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-1 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Tajdeed</h3>
                  <p className="text-sm text-gray-400">تجديد</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Making passport renewal simple, fast, and secure for all Sudanese citizens.
              </p>
            </div>
            
            {/* <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div> */}
            
            {/* <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div> */}
            
            {/* <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div> */}
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Tajdeed. All rights reserved. Made with ❤️ for Sudan.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}