import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, DollarSign, Users, Briefcase } from 'lucide-react'

export default function AboutPage() {
  const [width, setWidth] = useState(0)
  const carouselRef = useRef(null)

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    }
  }, [])

  const reviews = [
    { id: 1, name: "Ana García", text: "EduPay me ayudó a gestionar mis gastos universitarios de manera eficiente.", image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Carlos Rodríguez", text: "Gracias a EduPay, pude encontrar trabajos de medio tiempo relacionados con mi carrera.", image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Laura Martínez", text: "La plataforma es intuitiva y me ha ahorrado mucho tiempo en la gestión de mis finanzas.", image: "/placeholder.svg?height=100&width=100" },
    { id: 4, name: "Diego López", text: "EduPay me ha permitido concentrarme en mis estudios sin preocuparme por el manejo de mi dinero.", image: "/placeholder.svg?height=100&width=100" },
    { id: 5, name: "Sofía Hernández", text: "Recomiendo EduPay a todos mis compañeros de universidad. ¡Es genial!", image: "/placeholder.svg?height=100&width=100" },
  ]

  const features = [
    { icon: DollarSign, title: "Gestión Financiera", description: "Administra tus gastos y ahorros fácilmente" },
    { icon: Users, title: "Comunidad Estudiantil", description: "Conecta con otros estudiantes y comparte recursos" },
    { icon: Briefcase, title: "Oportunidades Laborales", description: "Encuentra trabajos de medio tiempo adaptados a tu horario" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="py-16 text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Bienvenido a EduPay</h1>
        <p className="text-xl text-blue-600">Tu marketplace financiero para estudiantes</p>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold text-blue-800 mb-10 text-center">Descubre EduPay</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="mb-4">
              <img 
                src="/images/Finanzas.jpg" 
                alt="Grupo de estudiantes" 
                className="rounded-lg w-full h-auto"
              />
            </div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Simplifica tus finanzas</h3>
            <p className="text-gray-600">EduPay te ayuda a manejar tu dinero de forma inteligente mientras te enfocas en tus estudios.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="mb-4">
              <img 
                src="/images/Oportunidades.jpg" 
                alt="Grupo de estudiantes" 
                className="rounded-lg w-full h-auto"
              />
            </div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Encuentra oportunidades</h3>
            <p className="text-gray-600">Accede a trabajos de medio tiempo que se ajustan a tu horario y habilidades.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="mb-4">
              <img 
                src="/images/Comunidad.jpg" 
                alt="Grupo de estudiantes" 
                className="rounded-lg w-full h-auto"
              />
            </div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Únete a la comunidad</h3>
            <p className="text-gray-600">Conecta con otros estudiantes, comparte recursos y crece juntos.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-blue-50">
        <h2 className="text-3xl font-semibold text-blue-800 mb-10 text-center">Características principales</h2>
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <feature.icon size={48} className="text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-blue-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-semibold text-blue-800 mb-8 text-center">Lo que dicen nuestros usuarios</h2>
        <motion.div ref={carouselRef} className="cursor-grab overflow-hidden mx-auto max-w-6xl px-4">
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }} 
            className="flex"
          >
            {reviews.map((review) => (
              <motion.div key={review.id} className="min-w-[300px] bg-white p-6 rounded-lg shadow-lg mx-4">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{review.name}</h3>
                <p className="text-gray-600">{review.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => carouselRef.current?.scrollBy(-300, 0)} 
            className="bg-blue-500 text-white p-2 rounded-full mr-4 hover:bg-blue-600 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => carouselRef.current?.scrollBy(300, 0)} 
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>
    </div>
  )
}