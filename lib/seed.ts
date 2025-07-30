import connectDB from './mongodb'
import User from './models/User'
import Service from './models/Service'
import Booking from './models/Booking'
import Review from './models/Review'

export async function seedDatabase() {
  try {
    await connectDB()
    
    console.log('🌱 Starting database seeding...')
    
    // Clear existing data (only in development)
    if (process.env.NODE_ENV === 'development') {
      await User.deleteMany({})
      await Service.deleteMany({})
      await Booking.deleteMany({})
      await Review.deleteMany({})
      console.log('🧹 Cleared existing data')
    }
    
    // Create admin user
    const admin = await User.create({
      email: process.env.ADMIN_EMAIL || 'admin@fixitnow.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      type: 'admin',
      isVerified: true,
      isActive: true
    })
    console.log('👤 Created admin user')
    
    // Create sample services
    const services = [
      {
        name: 'Basic Plumbing Repair',
        category: 'Plumbing',
        description: 'Fix leaks, unclog drains, and basic pipe repairs',
        icon: 'droplets',
        basePrice: 75,
        priceUnit: 'hourly',
        estimatedDuration: 60,
        requirements: ['Basic tools', 'Pipe fittings'],
        popularity: 85
      },
      {
        name: 'Electrical Installation',
        category: 'Electrical',
        description: 'Install outlets, switches, and basic electrical work',
        icon: 'zap',
        basePrice: 85,
        priceUnit: 'hourly',
        estimatedDuration: 90,
        requirements: ['Licensed electrician', 'Safety equipment'],
        popularity: 78
      },
      {
        name: 'HVAC Maintenance',
        category: 'HVAC',
        description: 'AC and heating system maintenance and repairs',
        icon: 'wind',
        basePrice: 95,
        priceUnit: 'hourly',
        estimatedDuration: 120,
        requirements: ['HVAC certification', 'Specialized tools'],
        popularity: 72
      },
      {
        name: 'Furniture Assembly',
        category: 'Carpentry',
        description: 'Assemble furniture and basic carpentry work',
        icon: 'hammer',
        basePrice: 45,
        priceUnit: 'hourly',
        estimatedDuration: 45,
        requirements: ['Basic tools', 'Assembly experience'],
        popularity: 90
      },
      {
        name: 'House Cleaning',
        category: 'Cleaning',
        description: 'Deep cleaning and regular house maintenance',
        icon: 'spray-can',
        basePrice: 35,
        priceUnit: 'hourly',
        estimatedDuration: 180,
        requirements: ['Cleaning supplies', 'Experience'],
        popularity: 95
      },
      {
        name: 'Appliance Repair',
        category: 'Appliance Repair',
        description: 'Fix washing machines, dryers, refrigerators',
        icon: 'settings',
        basePrice: 80,
        priceUnit: 'hourly',
        estimatedDuration: 75,
        requirements: ['Diagnostic tools', 'Parts knowledge'],
        popularity: 68
      }
    ]
    
    const createdServices = await Service.create(services)
    console.log(`🔧 Created ${createdServices.length} services`)
    
    // Create sample customers
    const customers = []
    for (let i = 1; i <= 10; i++) {
      customers.push({
        email: `customer${i}@example.com`,
        password: 'password123',
        firstName: `Customer${i}`,
        lastName: 'User',
        type: 'customer',
        phone: `+1555${String(i).padStart(3, '0')}4567`,
        isVerified: true,
        isActive: true,
        totalBookings: Math.floor(Math.random() * 20),
        totalSpent: Math.floor(Math.random() * 5000)
      })
    }
    
    const createdCustomers = await User.create(customers)
    console.log(`👥 Created ${createdCustomers.length} customers`)
    
    // Create sample providers
    const providers = []
    const businessNames = [
      'Smith Professional Services',
      'Quick Fix Solutions',
      'Expert Home Care',
      'Reliable Repairs Inc',
      'Premium Service Co',
      'Local Heroes LLC',
      'Fast Track Services',
      'Quality First Solutions',
      'Trusted Technicians',
      'Elite Service Group'
    ]
    
    for (let i = 1; i <= 10; i++) {
      providers.push({
        email: `provider${i}@example.com`,
        password: 'password123',
        firstName: `Provider${i}`,
        lastName: 'Professional',
        type: 'provider',
        phone: `+1555${String(i).padStart(3, '0')}7890`,
        businessName: businessNames[i - 1],
        services: services.slice(0, Math.floor(Math.random() * 4) + 1).map(s => s.name),
        rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
        totalReviews: Math.floor(Math.random() * 200) + 50,
        completedJobs: Math.floor(Math.random() * 150) + 25,
        totalEarnings: Math.floor(Math.random() * 50000) + 10000,
        isVerified: true,
        isActive: true,
        availability: {
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
          hours: { start: '09:00', end: '17:00' }
        },
        location: {
          address: `${100 + i} Main St, New York, NY`,
          coordinates: {
            lat: 40.7128 + (Math.random() - 0.5) * 0.1,
            lng: -74.0060 + (Math.random() - 0.5) * 0.1
          },
          serviceRadius: 25
        }
      })
    }
    
    const createdProviders = await User.create(providers)
    console.log(`🏢 Created ${createdProviders.length} providers`)
    
    // Create sample bookings
    const bookings = []
    const statuses = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled']
    const priorities = ['low', 'medium', 'high', 'urgent']
    
    for (let i = 0; i < 50; i++) {
      const customer = createdCustomers[Math.floor(Math.random() * createdCustomers.length)]
      const provider = createdProviders[Math.floor(Math.random() * createdProviders.length)]
      const service = createdServices[Math.floor(Math.random() * createdServices.length)]
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      
      const scheduledDate = new Date()
      scheduledDate.setDate(scheduledDate.getDate() + Math.floor(Math.random() * 30))
      
      bookings.push({
        customer: customer._id,
        provider: provider._id,
        service: service.name,
        description: `Need ${service.name.toLowerCase()} service at my location`,
        status,
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        scheduledDate,
        scheduledTime: `${Math.floor(Math.random() * 8) + 9}:00`,
        estimatedDuration: service.estimatedDuration,
        address: `${Math.floor(Math.random() * 900) + 100} Random St, New York, NY`,
        coordinates: {
          lat: 40.7128 + (Math.random() - 0.5) * 0.2,
          lng: -74.0060 + (Math.random() - 0.5) * 0.2
        },
        estimatedPrice: service.basePrice + Math.floor(Math.random() * 50),
        finalPrice: status === 'completed' ? service.basePrice + Math.floor(Math.random() * 50) : undefined,
        paymentStatus: status === 'completed' ? 'paid' : 'pending',
        actualStartTime: ['in-progress', 'completed'].includes(status) ? scheduledDate : undefined,
        actualEndTime: status === 'completed' ? new Date(scheduledDate.getTime() + service.estimatedDuration * 60000) : undefined
      })
    }
    
    const createdBookings = await Booking.create(bookings)
    console.log(`📅 Created ${createdBookings.length} bookings`)
    
    // Create sample reviews for completed bookings
    const completedBookings = createdBookings.filter(b => b.status === 'completed')
    const reviews = []
    
    for (const booking of completedBookings.slice(0, 30)) {
      const rating = Math.floor(Math.random() * 2) + 4 // 4-5 stars mostly
      const comments = [
        'Excellent service! Very professional and on time.',
        'Great work quality and fair pricing.',
        'Highly recommend! Will use again.',
        'Good service, completed the job efficiently.',
        'Professional and courteous. Job well done.',
        'Quick response and quality work.',
        'Very satisfied with the service provided.',
        'Reliable and trustworthy professional.'
      ]
      
      reviews.push({
        booking: booking._id,
        reviewer: booking.customer,
        reviewee: booking.provider,
        rating,
        comment: comments[Math.floor(Math.random() * comments.length)],
        categories: {
          quality: rating,
          punctuality: rating,
          professionalism: rating,
          communication: rating - Math.floor(Math.random() * 2),
          value: rating
        },
        isVerified: true,
        isVisible: true
      })
    }
    
    await Review.create(reviews)
    console.log(`⭐ Created ${reviews.length} reviews`)
    
    console.log('✅ Database seeding completed successfully!')
    
    return {
      success: true,
      data: {
        users: createdCustomers.length + createdProviders.length + 1,
        services: createdServices.length,
        bookings: createdBookings.length,
        reviews: reviews.length
      }
    }
    
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

// API endpoint for seeding (only in development)
export async function seedHandler() {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('Seeding is only allowed in development environment')
  }
  
  return await seedDatabase()
}