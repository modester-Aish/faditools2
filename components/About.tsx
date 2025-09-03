'use client'
import { useRef, useState, useEffect } from 'react'

const About = () => {
  const ref = useRef(null)
  const [counts, setCounts] = useState({ projects: 0, clients: 0, years: 0 })

  const stats = [
    { key: 'projects', target: 500, suffix: '+' },
    { key: 'clients', target: 50, suffix: '+' },
    { key: 'years', target: 5, suffix: '+' }
  ]

  useEffect(() => {
    // Start counter animation after a short delay to match CSS animations
    const timer = setTimeout(() => {
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      stats.forEach((stat, index) => {
        let current = 0
        const increment = stat.target / steps

        const counterTimer = setInterval(() => {
          current += increment
          if (current >= stat.target) {
            current = stat.target
            clearInterval(counterTimer)
          }
          setCounts(prev => ({ ...prev, [stat.key]: Math.floor(current) }))
        }, stepDuration)
      })
    }, 1000) // Start after 1 second to match CSS animation delays

    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-16 items-center animate-fade-in"
        >
          {/* Content */}
          <div className="animate-slide-in-left">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              About DigitalVision
            </h2>
            <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
              We are a team of passionate digital professionals dedicated to creating exceptional digital experiences. 
              With years of experience in web development, design, and digital marketing, we help businesses thrive 
              in the digital landscape.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.key}
                  className="text-center animate-fade-in-up"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <h3 className="text-4xl font-bold text-primary-600 mb-2 animate-scale-in" style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
                    {counts[stat.key as keyof typeof counts]}{stat.suffix}
                  </h3>
                  <p className="text-secondary-600 font-medium">
                    {stat.key === 'projects' && 'Projects Completed'}
                    {stat.key === 'clients' && 'Happy Clients'}
                    {stat.key === 'years' && 'Years Experience'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative animate-slide-in-right">
            <div className="relative h-96 lg:h-[500px]">
              {/* Team Members */}
              <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg animate-scale-in" style={{ animationDelay: '0.6s' }}>
                Designer
              </div>

              <div className="absolute top-20 right-10 w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg animate-scale-in" style={{ animationDelay: '0.8s' }}>
                Developer
              </div>

              <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg animate-scale-in" style={{ animationDelay: '1.0s' }}>
                Marketer
              </div>

              {/* Central Element */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-scale-in" style={{ animationDelay: '1.2s' }}>
                <div className="w-32 h-32 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-600">DV</span>
                  </div>
                </div>
              </div>

              {/* Connecting Lines */}
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ zIndex: -1 }}
              >
                <line
                  x1="20%"
                  y1="20%"
                  x2="50%"
                  y2="50%"
                  stroke="url(#gradient1)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-draw-line"
                  style={{ animationDelay: '1.4s' }}
                />
                <line
                  x1="80%"
                  y1="30%"
                  x2="50%"
                  y2="50%"
                  stroke="url(#gradient2)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-draw-line"
                  style={{ animationDelay: '1.6s' }}
                />
                <line
                  x1="30%"
                  y1="80%"
                  x2="50%"
                  y2="50%"
                  stroke="url(#gradient3)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-draw-line"
                  style={{ animationDelay: '1.8s' }}
                />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
