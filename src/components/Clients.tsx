import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Star, TrendingUp } from 'lucide-react';

const Clients = () => {
  // Sample client logos - in real implementation, these would be actual company logos
  const clients = [
    { name: 'Microsoft', industry: 'Technology' },
    { name: 'Goldman Sachs', industry: 'Finance' },
    { name: 'Nike', industry: 'Sports & Lifestyle' },
    { name: 'Tesla', industry: 'Automotive' },
    { name: 'Amazon', industry: 'E-commerce' },
    { name: 'Google', industry: 'Technology' },
    { name: 'JP Morgan', industry: 'Finance' },
    { name: 'Coca-Cola', industry: 'Beverages' },
    { name: 'IBM', industry: 'Technology' },
    { name: 'Samsung', industry: 'Electronics' },
    { name: 'Mercedes-Benz', industry: 'Automotive' },
    { name: 'Adobe', industry: 'Software' }
  ];

  const testimonials = [
    {
      quote: "Gevents transformed our annual conference into an unforgettable experience. Their attention to detail and creative vision exceeded all expectations.",
      author: "Sarah Johnson",
      title: "Global Events Director",
      company: "Microsoft",
      rating: 5
    },
    {
      quote: "Working with Gevents was seamless. They handled every aspect of our product launch flawlessly, allowing us to focus on what we do best.",
      author: "Marcus Chen",
      title: "VP of Marketing",
      company: "Tesla",
      rating: 5
    },
    {
      quote: "The team's professionalism and innovative approach made our charity gala a tremendous success. We raised 40% more than our target.",
      author: "Emma Rodriguez",
      title: "Development Director",
      company: "Global Foundation",
      rating: 5
    }
  ];

  const stats = [
    { icon: Building2, number: '150+', label: 'Fortune 500 Clients' },
    { icon: Users, number: '500K+', label: 'Event Attendees' },
    { icon: Star, number: '4.9/5', label: 'Client Rating' },
    { icon: TrendingUp, number: '95%', label: 'Client Retention' }
  ];

  return (
    <section id="clients" className="section-padding bg-background relative overflow-hidden" style={{ paddingTop: '8rem' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-hero-gradient mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From Fortune 500 companies to innovative startups, we've had the privilege of creating 
            exceptional experiences for the world's most respected organizations.
          </p>
        </motion.div>

        {/* Client Logos Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                className="card-premium p-6 flex flex-col items-center justify-center text-center group hover:shadow-glow transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{client.name}</h3>
                <p className="text-xs text-muted-foreground">{client.industry}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gradient-soft rounded-3xl p-12 mb-20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-accent" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">What Our Clients Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="card-premium p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Star Rating */}
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-muted-foreground italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="border-t border-border pt-6">
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                  <div className="text-sm text-accent font-medium">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-hero rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Join Our Success Stories?</h3>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Let's create an extraordinary event that showcases your brand and exceeds your expectations.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-ghost-hero"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Project
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;