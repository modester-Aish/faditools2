/**
 * Script to create missing WordPress pages
 * Run: node scripts/create-wordpress-pages.js
 */

// Try to load dotenv if available
try {
  require('dotenv').config({ path: '.env.local' })
} catch (e) {
  // dotenv not available, use process.env directly
}

const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL || 'https://app.faditools.com'
const WORDPRESS_USERNAME = process.env.WORDPRESS_USERNAME || ''
const WORDPRESS_PASSWORD = process.env.WORDPRESS_APPLICATION_PASSWORD || ''

const pagesToCreate = [
  {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    content: `
<h2>Privacy Policy</h2>
<p>Last updated: ${new Date().toLocaleDateString()}</p>

<h3>1. Information We Collect</h3>
<p>We collect information that you provide directly to us when you:</p>
<ul>
  <li>Create an account</li>
  <li>Make a purchase</li>
  <li>Subscribe to our newsletter</li>
  <li>Contact us for support</li>
</ul>

<h3>2. How We Use Your Information</h3>
<p>We use the information we collect to:</p>
<ul>
  <li>Provide, maintain, and improve our services</li>
  <li>Process transactions and send related information</li>
  <li>Send you technical notices and support messages</li>
  <li>Respond to your comments and questions</li>
</ul>

<h3>3. Information Sharing</h3>
<p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
<ul>
  <li>With your consent</li>
  <li>To comply with legal obligations</li>
  <li>To protect our rights and safety</li>
</ul>

<h3>4. Data Security</h3>
<p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

<h3>5. Your Rights</h3>
<p>You have the right to:</p>
<ul>
  <li>Access your personal data</li>
  <li>Correct inaccurate data</li>
  <li>Request deletion of your data</li>
  <li>Object to processing of your data</li>
</ul>

<h3>6. Contact Us</h3>
<p>If you have questions about this Privacy Policy, please contact us at: <a href="/pages/contact">Contact Page</a></p>
    `.trim(),
    excerpt: 'Our Privacy Policy explains how we collect, use, and protect your personal information when you use our services.'
  },
  {
    title: 'Terms of Service',
    slug: 'terms-of-service',
    content: `
<h2>Terms of Service</h2>
<p>Last updated: ${new Date().toLocaleDateString()}</p>

<h3>1. Acceptance of Terms</h3>
<p>By accessing and using FadiTools, you accept and agree to be bound by the terms and provision of this agreement.</p>

<h3>2. Use License</h3>
<p>Permission is granted to temporarily access the materials on FadiTools for personal, non-commercial transitory viewing only.</p>

<h3>3. Account Registration</h3>
<p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>

<h3>4. Payment Terms</h3>
<p>All payments are processed securely. Refunds are subject to our refund policy. Subscription fees are charged on a recurring basis unless cancelled.</p>

<h3>5. Prohibited Uses</h3>
<p>You may not use our service:</p>
<ul>
  <li>For any unlawful purpose</li>
  <li>To violate any laws or regulations</li>
  <li>To transmit harmful code or malware</li>
  <li>To interfere with the service's operation</li>
</ul>

<h3>6. Intellectual Property</h3>
<p>All content, features, and functionality of the service are owned by FadiTools and are protected by international copyright, trademark, and other intellectual property laws.</p>

<h3>7. Limitation of Liability</h3>
<p>FadiTools shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.</p>

<h3>8. Contact Information</h3>
<p>For questions about these Terms of Service, please contact us at: <a href="/pages/contact">Contact Page</a></p>
    `.trim(),
    excerpt: 'These Terms of Service govern your use of FadiTools and outline your rights and responsibilities as a user.'
  },
  {
    title: 'About Us',
    slug: 'about-us',
    content: `
<h2>About FadiTools</h2>

<h3>Who We Are</h3>
<p>FadiTools is a leading provider of premium SEO tools through group buy access. We make expensive digital marketing tools accessible to everyone by offering them at a fraction of the original cost.</p>

<h3>Our Mission</h3>
<p>Our mission is to democratize access to premium SEO and digital marketing tools. We believe that every marketer, agency, and business should have access to the best tools without breaking the bank.</p>

<h3>What We Offer</h3>
<ul>
  <li><strong>Group Buy Access:</strong> Get access to premium tools like AHREF$, SEMRU$H, Moz Pro, and more at up to 90% discount</li>
  <li><strong>99% Uptime:</strong> We guarantee reliable access to all tools</li>
  <li><strong>Instant Access:</strong> Start using tools immediately after purchase</li>
  <li><strong>24/7 Support:</strong> Our team is always ready to help</li>
</ul>

<h3>Why Choose FadiTools?</h3>
<ul>
  <li>Save thousands of dollars on premium SEO tools</li>
  <li>Access multiple tools with a single subscription</li>
  <li>Perfect for agencies, marketers, and small businesses</li>
  <li>Regular updates and new tool additions</li>
</ul>

<h3>Our Team</h3>
<p>We are a dedicated team of digital marketing professionals who understand the challenges of running a business. We've built FadiTools to solve the problem of expensive tool subscriptions.</p>

<h3>Contact Us</h3>
<p>Have questions? Visit our <a href="/pages/contact">Contact Page</a> to get in touch with our team.</p>
    `.trim(),
    excerpt: 'Learn about FadiTools, our mission, and how we make premium SEO tools accessible to everyone.'
  },
  {
    title: 'Contact Us',
    slug: 'contact',
    content: `
<h2>Contact Us</h2>
<p>We'd love to hear from you! Get in touch with our team using any of the methods below.</p>

<h3>Get in Touch</h3>
<p>Whether you have a question about our services, need technical support, or want to provide feedback, we're here to help.</p>

<h3>Contact Methods</h3>
<ul>
  <li><strong>Email:</strong> support@faditools.com</li>
  <li><strong>Live Chat:</strong> Available on our website (bottom right corner)</li>
  <li><strong>Response Time:</strong> We typically respond within 24 hours</li>
</ul>

<h3>Support Hours</h3>
<p>Our support team is available 24/7 to assist you with any questions or issues.</p>

<h3>Frequently Asked Questions</h3>
<p>Before contacting us, you might find answers to common questions in our <a href="/blog">Blog</a> or check our FAQ section.</p>

<h3>Business Inquiries</h3>
<p>For business partnerships, bulk orders, or enterprise solutions, please email us at: business@faditools.com</p>

<h3>Technical Support</h3>
<p>If you're experiencing technical issues with any of our tools, please include:</p>
<ul>
  <li>Your account email</li>
  <li>Description of the issue</li>
  <li>Screenshots (if applicable)</li>
  <li>Tool name and version</li>
</ul>
    `.trim(),
    excerpt: 'Contact FadiTools for support, questions, or business inquiries. We are here to help 24/7.'
  },
  {
    title: 'Authors & Team',
    slug: 'authors-team',
    content: `
<h2>Our Authors & Team</h2>
<p>Meet the talented individuals behind FadiTools who work tirelessly to bring you the best SEO tools and content.</p>

<h3>Editorial Team</h3>
<p>Our editorial team consists of experienced SEO professionals, digital marketers, and content creators who are passionate about helping you succeed.</p>

<h3>Content Writers</h3>
<p>Our content writers have years of experience in SEO, digital marketing, and technology. They create comprehensive guides, tutorials, and blog posts to help you make the most of your tools.</p>

<h3>Technical Team</h3>
<p>Our technical team ensures that all tools are running smoothly and that you have the best possible experience using our platform.</p>

<h3>Support Team</h3>
<p>Our support team is available 24/7 to help you with any questions or issues. They're knowledgeable, friendly, and always ready to assist.</p>

<h3>Contributing Authors</h3>
<p>We work with industry experts and guest authors who share their knowledge and insights on our blog.</p>

<h3>Join Our Team</h3>
<p>Interested in joining our team? We're always looking for talented individuals who are passionate about SEO and digital marketing. Contact us at: careers@faditools.com</p>

<h3>Editorial Guidelines</h3>
<p>Our content follows strict editorial guidelines to ensure accuracy, relevance, and value. Learn more about our <a href="/pages/editorial-guidelines">Editorial Guidelines</a>.</p>
    `.trim(),
    excerpt: 'Meet the FadiTools team of SEO experts, content creators, and support professionals dedicated to your success.'
  },
  {
    title: 'Editorial Guidelines',
    slug: 'editorial-guidelines',
    content: `
<h2>Editorial Guidelines</h2>
<p>At FadiTools, we maintain high standards for all our content. These guidelines ensure that our articles, guides, and tutorials are accurate, helpful, and trustworthy.</p>

<h3>Content Standards</h3>
<ul>
  <li><strong>Accuracy:</strong> All information must be factually correct and up-to-date</li>
  <li><strong>Relevance:</strong> Content must be relevant to our audience of SEO professionals and digital marketers</li>
  <li><strong>Clarity:</strong> Articles should be well-structured and easy to understand</li>
  <li><strong>Originality:</strong> All content must be original or properly attributed</li>
</ul>

<h3>Writing Style</h3>
<ul>
  <li>Use clear, concise language</li>
  <li>Avoid jargon unless necessary, and always explain technical terms</li>
  <li>Use headings and subheadings to organize content</li>
  <li>Include examples and practical tips when possible</li>
</ul>

<h3>Research Requirements</h3>
<ul>
  <li>All claims must be backed by reliable sources</li>
  <li>Cite sources when referencing statistics or studies</li>
  <li>Test tools and methods before recommending them</li>
  <li>Update content regularly to reflect changes</li>
</ul>

<h3>SEO Best Practices</h3>
<ul>
  <li>Optimize content for relevant keywords</li>
  <li>Use descriptive headings and meta descriptions</li>
  <li>Include internal and external links where appropriate</li>
  <li>Optimize images with alt text</li>
</ul>

<h3>Review Process</h3>
<p>All content goes through a rigorous review process:</p>
<ol>
  <li>Initial draft by author</li>
  <li>Fact-checking and editing</li>
  <li>SEO review</li>
  <li>Final approval</li>
</ol>

<h3>Updates and Corrections</h3>
<p>We regularly review and update our content to ensure accuracy. If you notice any errors or outdated information, please contact us.</p>

<h3>Contact</h3>
<p>For questions about our editorial guidelines or to submit content, please contact: editorial@faditools.com</p>
    `.trim(),
    excerpt: 'Our editorial guidelines ensure that all FadiTools content is accurate, helpful, and trustworthy.'
  }
]

async function createWordPressPage(pageData) {
  try {
    const url = `${WORDPRESS_BASE_URL}/wp-json/wp/v2/pages`
    const auth = Buffer.from(`${WORDPRESS_USERNAME}:${WORDPRESS_PASSWORD}`).toString('base64')
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
      body: JSON.stringify({
        title: pageData.title,
        slug: pageData.slug,
        content: pageData.content,
        excerpt: pageData.excerpt,
        status: 'publish',
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }

    const createdPage = await response.json()
    return { success: true, page: createdPage }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

async function checkIfPageExists(slug) {
  try {
    const url = `${WORDPRESS_BASE_URL}/wp-json/wp/v2/pages?slug=${slug}`
    const response = await fetch(url)
    
    if (!response.ok) {
      return false
    }
    
    const pages = await response.json()
    return pages && pages.length > 0
  } catch (error) {
    return false
  }
}

async function main() {
  console.log('🔄 Starting WordPress pages creation...\n')
  
  if (!WORDPRESS_USERNAME || !WORDPRESS_PASSWORD) {
    console.error('❌ Error: WordPress credentials not configured!')
    console.log('\n📝 Please add these to .env.local:')
    console.log('WORDPRESS_USERNAME=your_username')
    console.log('WORDPRESS_APPLICATION_PASSWORD=your_app_password')
    console.log('\n💡 To create Application Password:')
    console.log('1. Go to WordPress Admin → Users → Your Profile')
    console.log('2. Scroll to "Application Passwords"')
    console.log('3. Create new password and add to .env.local')
    process.exit(1)
  }

  console.log(`📍 WordPress URL: ${WORDPRESS_BASE_URL}`)
  console.log(`👤 Username: ${WORDPRESS_USERNAME}\n`)

  const results = []

  for (const pageData of pagesToCreate) {
    console.log(`🔍 Checking page: ${pageData.title} (${pageData.slug})...`)
    
    // Check if page already exists
    const exists = await checkIfPageExists(pageData.slug)
    
    if (exists) {
      console.log(`✅ Page already exists: ${pageData.slug}`)
      results.push({
        title: pageData.title,
        slug: pageData.slug,
        success: true,
        message: 'Already exists'
      })
    } else {
      console.log(`📝 Creating page: ${pageData.title}...`)
      const result = await createWordPressPage(pageData)
      
      if (result.success) {
        console.log(`✅ Created successfully: ${pageData.slug}`)
        results.push({
          title: pageData.title,
          slug: pageData.slug,
          success: true,
          message: 'Created'
        })
      } else {
        console.log(`❌ Failed: ${result.error}`)
        results.push({
          title: pageData.title,
          slug: pageData.slug,
          success: false,
          error: result.error
        })
      }
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('')
  }

  // Summary
  console.log('\n📊 Summary:')
  const successCount = results.filter(r => r.success).length
  const failedCount = results.filter(r => !r.success).length
  
  console.log(`✅ Success: ${successCount}/${pagesToCreate.length}`)
  console.log(`❌ Failed: ${failedCount}/${pagesToCreate.length}`)
  
  if (failedCount > 0) {
    console.log('\n❌ Failed pages:')
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.title}: ${r.error}`)
    })
  }
  
  console.log('\n✨ Done!')
}

main().catch(error => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})

