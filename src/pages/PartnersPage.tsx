import { motion } from 'framer-motion';
import { ArrowLeft, Factory, Recycle, TreePine, Star, Award, Globe, Users, TrendingUp, Calendar, MapPin, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

interface PartnersPageProps {
  onBackToHome: () => void;
}

interface Partner {
  id: number;
  name: string;
  logo: string;
  description: string;
  established: string;
  headquarters: string;
  products: string[];
  achievements: string[];
  ecoInitiatives: string[];
  stats: {
    recyclingRate: number;
    ecoProducts: number;
    partnerships: number;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  color: string;
  bgGradient: string;
}

const partners: Partner[] = [
  {
    id: 1,
    name: "PEPSI",
    logo: "https://public.youware.com/users-website-assets/prod/613f21f3-3a0f-4d5a-bb62-6225722725a8/13098977cd984ed6bae80935b09dac19.jpeg",
    description: "Dunyodagi eng yirik ichimlik brendlaridan biri. Pepsi 125 yildan ortiq vaqt davomida sifatli mahsulotlar ishlab chiqaradi.",
    established: "1898",
    headquarters: "New York, AQSh",
    products: ["Pepsi Cola", "Pepsi Max", "Pepsi Zero", "Katta hajmli idishlar"],
    achievements: [
      "Dunyodagi 200+ mamlakatda mavjud",
      "Yiliga 70 milliard dollar daromad", 
      "250,000+ xodim"
    ],
    ecoInitiatives: [
      "100% qayta ishlanadigan plastik qadoqlash",
      "Karbon emissiyasini 40% kamaytirish",
      "Suv sarfini 25% tejash"
    ],
    stats: {
      recyclingRate: 85,
      ecoProducts: 12,
      partnerships: 45
    },
    contact: {
      phone: "+1-800-433-2652",
      email: "info@pepsi.com",
      website: "www.pepsi.com"
    },
    color: "blue-400",
    bgGradient: "from-blue-900/30 to-blue-800/20"
  },
  {
    id: 2,
    name: "COCA-COLA",
    logo: "https://public.youware.com/users-website-assets/prod/613f21f3-3a0f-4d5a-bb62-6225722725a8/2d16bd3a353f48bfba0801b87165451c.jpg",
    description: "Dunyodagi eng mashhur ichimlik brendi. Coca-Cola 135 yildan beri odamlarni birlashtiruvchi ta'm yaratadi.",
    established: "1886",
    headquarters: "Atlanta, AQSh",
    products: ["Coca-Cola Classic", "Coca-Cola Zero", "Diet Coke", "Katta hajmli butilkalar"],
    achievements: [
      "Dunyodagi eng qimmat brend",
      "200+ mamlakatda sotiladi",
      "700,000+ xodim"
    ],
    ecoInitiatives: [
      "World Without Waste dasturi",
      "2030-yilgacha butilkalarni 100% qayta ishlash",
      "Suvni tejash va muhofaza qilish"
    ],
    stats: {
      recyclingRate: 90,
      ecoProducts: 15,
      partnerships: 52
    },
    contact: {
      phone: "+1-800-438-2653",
      email: "contact@coca-cola.com", 
      website: "www.coca-cola.com"
    },
    color: "red-400",
    bgGradient: "from-red-900/30 to-red-800/20"
  },
  {
    id: 3,
    name: "TOZA SUV",
    logo: "https://public.youware.com/users-website-assets/prod/613f21f3-3a0f-4d5a-bb62-6225722725a8/369133014e934a17862b48b37e7c9f0f.jpeg",
    description: "Toza va sog'lom suv yechimlari. Ekologik toza suv mahsulotlari ishlab chiqarish bo'yicha yetakchi kompaniya.",
    established: "2005",
    headquarters: "Toshkent, O'zbekiston",
    products: ["5L katta idishlar", "Mineral suv", "Toza ichimlik suvi", "Ofis uchun dispenserlar"],
    achievements: [
      "O'zbekistondagi eng yirik suv ishlab chiqaruvchisi",
      "ISO 9001 sertifikati",
      "1000+ mijoz"
    ],
    ecoInitiatives: [
      "Qayta ishlatilgan materiallar",
      "Suv manbalarini muhofaza qilish", 
      "Ekologik toza ishlab chiqarish"
    ],
    stats: {
      recyclingRate: 95,
      ecoProducts: 8,
      partnerships: 25
    },
    contact: {
      phone: "+998-71-123-4567",
      email: "info@tozasuv.uz",
      website: "www.tozasuv.uz"
    },
    color: "cyan-400",
    bgGradient: "from-cyan-900/30 to-cyan-800/20"
  }
];

export default function PartnersPage({ onBackToHome }: PartnersPageProps) {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-gray-900 via-green-900 to-blue-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.button
            onClick={onBackToHome}
            className="flex items-center gap-3 text-white hover:text-green-400 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="font-medium">Bosh sahifa</span>
          </motion.button>
          
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hamkor Brendlar
          </motion.div>
          
          <div className="w-24"></div>
        </div>
      </header>

      {!selectedPartner ? (
        /* Partners Grid */
        <section className="pt-32 pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Bizning Hamkorlarimiz
              </h1>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
                Ekologiya sohasida faoliyat yurituvchi dunyodagi yetakchi brendlar bilan hamkorlik
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  className={`bg-gradient-to-b ${partner.bgGradient} rounded-3xl p-8 border-2 border-${partner.color}/30 backdrop-blur-sm cursor-pointer group`}
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  onClick={() => setSelectedPartner(partner)}
                >
                  <motion.div
                    className="relative mb-8"
                    animate={{
                      y: [0, -10, 0],
                      rotateY: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 6 + index,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-64 h-80 object-contain mx-auto shadow-2xl drop-shadow-2xl group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute -top-4 -right-4 bg-gradient-to-r from-${partner.color} to-${partner.color} text-white text-sm px-4 py-2 rounded-full font-bold shadow-lg`}>
                      HAMKOR BREND
                    </div>
                  </motion.div>
                  
                  <h3 className={`text-4xl font-bold text-${partner.color} mb-4 text-center`}>
                    {partner.name}
                  </h3>
                  
                  <p className="text-lg text-gray-300 mb-6 text-center line-clamp-3">
                    {partner.description}
                  </p>
                  
                  <div className="flex justify-center items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-300">{partner.established}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-300">{partner.headquarters}</span>
                    </div>
                  </div>
                  
                  <motion.button
                    className={`w-full bg-gradient-to-r from-${partner.color} to-${partner.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Batafsil ma'lumot
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* Partner Details */
        <section className="pt-32 pb-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.button
              onClick={() => setSelectedPartner(null)}
              className="flex items-center gap-3 text-white hover:text-green-400 transition-colors mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Hamkorlar ro'yxatiga qaytish</span>
            </motion.button>

            <motion.div
              className={`bg-gradient-to-b ${selectedPartner.bgGradient} rounded-3xl p-12 border-2 border-${selectedPartner.color}/30 backdrop-blur-sm`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Partner Header */}
              <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
                <motion.div
                  className="relative"
                  animate={{
                    y: [0, -10, 0],
                    rotateY: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <img
                    src={selectedPartner.logo}
                    alt={selectedPartner.name}
                    className="w-80 h-96 object-contain shadow-2xl drop-shadow-2xl"
                  />
                </motion.div>
                
                <div className="flex-1 text-center md:text-left">
                  <h1 className={`text-6xl font-bold text-${selectedPartner.color} mb-6`}>
                    {selectedPartner.name}
                  </h1>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    {selectedPartner.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-400">Tashkil etilgan</span>
                      </div>
                      <p className="text-lg font-semibold text-white">{selectedPartner.established}</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-400">Bosh ofis</span>
                      </div>
                      <p className="text-lg font-semibold text-white">{selectedPartner.headquarters}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <motion.div
                  className="text-center bg-white/10 rounded-2xl p-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Recycle className={`w-12 h-12 text-${selectedPartner.color} mx-auto mb-4`} />
                  <div className={`text-4xl font-bold text-${selectedPartner.color} mb-2`}>
                    {selectedPartner.stats.recyclingRate}%
                  </div>
                  <p className="text-gray-300">Qayta ishlash foizi</p>
                </motion.div>
                
                <motion.div
                  className="text-center bg-white/10 rounded-2xl p-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <TreePine className={`w-12 h-12 text-${selectedPartner.color} mx-auto mb-4`} />
                  <div className={`text-4xl font-bold text-${selectedPartner.color} mb-2`}>
                    {selectedPartner.stats.ecoProducts}
                  </div>
                  <p className="text-gray-300">Ekologik mahsulotlar</p>
                </motion.div>
                
                <motion.div
                  className="text-center bg-white/10 rounded-2xl p-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Users className={`w-12 h-12 text-${selectedPartner.color} mx-auto mb-4`} />
                  <div className={`text-4xl font-bold text-${selectedPartner.color} mb-2`}>
                    {selectedPartner.stats.partnerships}
                  </div>
                  <p className="text-gray-300">Hamkorliklar</p>
                </motion.div>
              </div>

              {/* Products & Achievements */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <motion.div
                  className="bg-white/10 rounded-2xl p-8"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Factory className={`w-8 h-8 text-${selectedPartner.color}`} />
                    Mahsulotlar
                  </h3>
                  <ul className="space-y-3">
                    {selectedPartner.products.map((product, index) => (
                      <li key={index} className="text-gray-300 flex items-center gap-3">
                        <Star className={`w-5 h-5 text-${selectedPartner.color}`} />
                        {product}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div
                  className="bg-white/10 rounded-2xl p-8"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Award className={`w-8 h-8 text-${selectedPartner.color}`} />
                    Yutuqlar
                  </h3>
                  <ul className="space-y-3">
                    {selectedPartner.achievements.map((achievement, index) => (
                      <li key={index} className="text-gray-300 flex items-center gap-3">
                        <TrendingUp className={`w-5 h-5 text-${selectedPartner.color}`} />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Eco Initiatives */}
              <motion.div
                className="bg-white/10 rounded-2xl p-8 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Globe className={`w-8 h-8 text-${selectedPartner.color}`} />
                  Ekologik Tashabbuslar
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {selectedPartner.ecoInitiatives.map((initiative, index) => (
                    <div key={index} className={`bg-${selectedPartner.color}/20 rounded-xl p-4`}>
                      <p className={`text-${selectedPartner.color} font-semibold`}>
                        {initiative}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                className="bg-white/10 rounded-2xl p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Aloqa ma'lumotlari</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <Phone className={`w-6 h-6 text-${selectedPartner.color}`} />
                    <div>
                      <p className="text-sm text-gray-400">Telefon</p>
                      <p className="text-white">{selectedPartner.contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className={`w-6 h-6 text-${selectedPartner.color}`} />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white">{selectedPartner.contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className={`w-6 h-6 text-${selectedPartner.color}`} />
                    <div>
                      <p className="text-sm text-gray-400">Veb-sayt</p>
                      <p className="text-white">{selectedPartner.contact.website}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}