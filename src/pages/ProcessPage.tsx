import { motion } from 'framer-motion';
import { ArrowLeft, Camera, CheckCircle, Gift } from 'lucide-react';
import { useState } from 'react';

interface ProcessPageProps {
  onBackToHome: () => void;
}

const ProcessPage = ({ onBackToHome }: ProcessPageProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    {
      id: 1,
      title: 'Butilkani joylashtiring',
      description: 'Qaytarish mashinasiga idishni joylashtiring',
      icon: '🥤',
      action: 'Joylashtirish'
    },
    {
      id: 2,
      title: 'QR kodni skanerlang',
      description: 'Mobilingiz bilan QR kodni skanerlang',
      icon: '📱',
      action: 'Skaner qilish'
    },
    {
      id: 3,
      title: 'Bonusni oling',
      description: 'Hisobingizga bonus qo\'shildi',
      icon: '💰',
      action: 'Bonus olish'
    }
  ];

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
      if (stepId < steps.length) {
        setTimeout(() => setCurrentStep(stepId + 1), 1000);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8"
    >
      {/* Header */}
      <div className="container mx-auto px-6 mb-12">
        <motion.button
          onClick={onBackToHome}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Orqaga qaytish
        </motion.button>
        
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4"
        >
          Qaytarish Jarayoni
        </motion.h1>
        
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl text-center text-gray-600 max-w-2xl mx-auto"
        >
          Quyidagi qadamlarni bajarib, bonusni oling
        </motion.p>
      </div>

      {/* Progress Bar */}
      <div className="container mx-auto px-6 mb-16">
        <div className="flex items-center justify-center space-x-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: currentStep >= step.id ? 1.1 : 1,
                  opacity: 1,
                  backgroundColor: completedSteps.includes(step.id) 
                    ? '#10B981' 
                    : currentStep === step.id 
                      ? '#3B82F6' 
                      : '#D1D5DB'
                }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl relative"
              >
                {completedSteps.includes(step.id) ? (
                  <CheckCircle className="w-8 h-8" />
                ) : (
                  <span>{step.id}</span>
                )}
                
                {currentStep === step.id && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-blue-400 opacity-30"
                  />
                )}
              </motion.div>
              
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ 
                    width: completedSteps.includes(step.id) ? '100px' : '100px',
                    backgroundColor: completedSteps.includes(step.id) ? '#10B981' : '#D1D5DB'
                  }}
                  transition={{ duration: 0.5 }}
                  className="h-2 mx-4"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Display */}
      <div className="container mx-auto px-6">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-12 text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-8xl mb-8"
          >
            {steps[currentStep - 1]?.icon}
          </motion.div>
          
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            {steps[currentStep - 1]?.title}
          </h2>
          
          <p className="text-xl text-gray-600 mb-8">
            {steps[currentStep - 1]?.description}
          </p>
          
          {/* Interactive Elements based on current step */}
          {currentStep === 1 && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="space-y-6"
            >
              <div className="bg-gray-100 rounded-2xl p-8 mb-6">
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  🥤➡️🗑️
                </motion.div>
                <p className="text-gray-600">Butilkani mashinaga joylashtiring</p>
              </div>
              
              <motion.button
                onClick={() => handleStepComplete(1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold text-xl px-12 py-4 rounded-full shadow-lg"
              >
                ✅ Joylashtirildi
              </motion.button>
            </motion.div>
          )}
          
          {currentStep === 2 && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="space-y-6"
            >
              <div className="bg-gray-100 rounded-2xl p-8 mb-6 relative">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-32 h-32 bg-black mx-auto mb-4 rounded-xl flex items-center justify-center"
                >
                  <div className="w-24 h-24 bg-white rounded-lg grid grid-cols-3 gap-1 p-2">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`} />
                    ))}
                  </div>
                </motion.div>
                <p className="text-gray-600">QR kodni skanerlang</p>
                
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-4 right-4 text-4xl"
                >
                  📱
                </motion.div>
              </div>
              
              <motion.button
                onClick={() => handleStepComplete(2)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl px-12 py-4 rounded-full shadow-lg flex items-center gap-3 mx-auto"
              >
                <Camera className="w-6 h-6" />
                Skanerlash
              </motion.button>
            </motion.div>
          )}
          
          {currentStep === 3 && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="space-y-6"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 mb-6 relative overflow-hidden"
              >
                <motion.h3
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="text-4xl font-bold text-white mb-2"
                >
                  +10% Bonus!
                </motion.h3>
                <p className="text-white text-xl">Hisobingizga qo'shildi</p>
                
                {/* Falling money animation */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: -50, x: Math.random() * 300, opacity: 0 }}
                      animate={{ 
                        y: 200, 
                        opacity: [0, 1, 1, 0],
                        rotate: 360 
                      }}
                      transition={{ 
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                      className="absolute text-2xl"
                    >
                      💰
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.button
                onClick={() => handleStepComplete(3)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold text-xl px-12 py-4 rounded-full shadow-lg flex items-center gap-3 mx-auto"
              >
                <Gift className="w-6 h-6" />
                Bonusni Qabul Qilish
              </motion.button>
            </motion.div>
          )}
          
          {completedSteps.length === steps.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-8 p-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl text-white"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Tabriklaymiz!</h3>
              <p className="text-lg mb-6">Bonus muvaffaqiyatli olindi</p>
              
              <motion.button
                onClick={onBackToHome}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-600 font-bold px-8 py-3 rounded-full"
              >
                Bosh sahifaga qaytish
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProcessPage;