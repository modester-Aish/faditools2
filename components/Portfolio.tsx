'use client'
import { useRef } from 'react'
import { ExternalLink } from 'lucide-react'

const Portfolio = () => {
  const ref = useRef(null)

  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'Modern online shopping experience',
      gradient: 'from-blue-500 to-purple-600',
      delay: 0
    },
    {
      title: 'Mobile Banking App',
      description: 'Secure financial management',
      gradient: 'from-green-500 to-blue-600',
      delay: 0.1
    },
    {
      title: 'Corporate Website',
      description: 'Professional business presence',
      gradient: 'from-purple-500 to-pink-600',
      delay: 0.2
    },
    {
      title: 'Restaurant App',
      description: 'Food delivery platform',
      gradient: 'from-orange-500 to-red-600',
      delay: 0.3
    },
    {
      title: 'Educational Platform',
      description: 'Online learning system',
      gradient: 'from-indigo-500 to-purple-600',
      delay: 0.4
    },
    {
      title: 'Healthcare Portal',
      description: 'Patient management system',
      gradient: 'from-teal-500 to-blue-600',
      delay: 0.5
    }
  ]



  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="animate-fade-in"
        >
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
              Our Portfolio
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Showcasing our best work and successful projects
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="portfolio-item group animate-fade-in-up hover:-translate-y-2 transition-transform duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`portfolio-image bg-gradient-to-br ${project.gradient}`}>
                  <div className="portfolio-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm mb-4 opacity-90">{project.description}</p>
                    <a
                      href="#"
                      className="inline-flex items-center bg-white text-secondary-900 px-4 py-2 rounded-lg font-medium hover:bg-secondary-100 hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                      View Project
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <button className="btn btn-primary hover:scale-105 active:scale-95 transition-transform duration-200">
              View All Projects
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Portfolio
