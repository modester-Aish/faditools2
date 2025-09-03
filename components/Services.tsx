'use client'

import { useRef } from 'react'
import { 
  Globe, 
  Smartphone, 
  Palette, 
  Megaphone, 
  Cloud, 
  Settings,
  ArrowRight 
} from 'lucide-react'

const Services = () => {
  const ref = useRef(null)

  const services = [
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies and best practices.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications for iOS and Android platforms.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces that enhance user experience and engagement.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Megaphone,
      title: 'Digital Marketing',
      description: 'Strategic digital marketing campaigns to increase brand awareness and drive conversions.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment solutions for modern applications.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Settings,
      title: 'Consulting',
      description: 'Expert consultation to help you make informed decisions about your digital strategy.',
      color: 'from-pink-500 to-pink-600'
    }
  ]



  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="animate-fade-in"
        >
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Comprehensive digital solutions to grow your business
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card group animate-fade-in-up hover:-translate-y-2 transition-transform duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`service-icon bg-gradient-to-r ${service.color}`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-secondary-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group-hover:translate-x-2 hover:translate-x-1 transition-transform duration-300"
                >
                  Learn More 
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
