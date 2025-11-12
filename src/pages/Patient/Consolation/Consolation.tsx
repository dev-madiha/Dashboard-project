

import { Video, Mic, CheckCircle, Wifi, UserCheck } from "lucide-react";
const Consultation = () => {
    
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
//     }, 600);
//     return () => clearInterval(timer);
//   }, []);

  return (

    <div className="min-h-screen  flex justify-center p-6">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-[34px] text-blue-600 font-semibold">
            Connecting to Doctor
          </h1>
          <p className="text-gray-500 text-sm">
            Please wait while we find an available doctor for you.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <UserCheck size={26} className="mx-auto text-blue-500 mb-2" />
            <h2 className="text-gray-700 font-semibold text-lg">
              Queue Position
            </h2>
            <p className="text-gray-500 text-sm">Next</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <Wifi size={26} className="mx-auto text-purple-500 mb-2" />
            <h2 className="text-gray-700 font-semibold text-lg">
              Estimated Wait
            </h2>
            <p className="text-gray-500 text-sm">5 min</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-gray-700 font-semibold mb-3">
            Finding available doctor...
          </h2>

          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
            <div
              className="h-3 bg-blue-500 rounded-full transition-all duration-500"
             
            ></div>
          </div>

          <div className="flex justify-end text-sm text-gray-500 mt-1">
            %
          </div>

          <div className="mt-6">
            <h3 className="text-gray-800 font-semibold mb-3">While You Wait</h3>
            <ul className="space-y-4 text-sm text-gray-600 ">
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-green-500 mt-0.5" />
                <span>
                  <strong>Camera & Microphone Ready</strong> — Please ensure
                  your camera and microphone are working properly.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-green-500 mt-0.5" />
                <span>
                  <strong>Stable Internet Connection</strong> — A good
                  connection ensures the best consultation experience.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-green-500 mt-0.5" />
                <span>
                  <strong>Private Space</strong> — Find a quiet and private
                  location for your consultation.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm">
          <div className="flex flex-col items-center">
            <Video size={30} className="text-orange-500 mb-2" />
            <p className="text-gray-700 font-medium">Camera</p>
            <p className="text-green-500 text-sm font-semibold">Ready</p>
          </div>

          <div className="flex flex-col items-center">
            <Mic size={30} className="text-purple-500 mb-2" />
            <p className="text-gray-700 font-medium">Microphone</p>
            <p className="text-green-500 text-sm font-semibold">Ready</p>
          </div>

          <div className="flex flex-col items-center">
            <CheckCircle size={30} className="text-green-500 mb-2" />
            <p className="text-gray-700 font-medium">Private Space</p>
            <p className="text-green-500 text-sm font-semibold">Ready</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Consultation;
