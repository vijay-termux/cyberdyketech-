import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CYBERDYKE TECH | AI Cybersecurity, Audits, Consulting, Risk Management',
  description: 'CYBERDYKE TECH provides global AI-powered cybersecurity solutions in India. Expert AI-driven threat detection, vulnerability scanning, cloud security, and compliance audits for enterprises.',
  keywords: 'cybersecurity company in India, AI cybersecurity solutions, Cyberdyke Tech, global cybersecurity, enterprise IT security, AI threat detection, vulnerability scanner, cloud security services, ISO 27001 compliance, GDPR security audits, risk management consulting, network security, ethical hacking services, SOC monitoring, Hyderabad cybersecurity',
  authors: [{ name: 'CYBERDYKE TECH' }],
  openGraph: {
    type: 'website',
    url: 'https://www.cyberdyketech.com/',
    title: 'CYBERDYKE TECH | AI Cybersecurity, Audits, Consulting, Risk Management',
    description: 'With over a decade of experience in cybersecurity and enterprise IT, our founder drives AI-powered innovations to protect businesses worldwide.',
    images: [{ url: 'https://www.cyberdyketech.com/assets/images/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: 'https://www.cyberdyketech.com/',
    title: 'CYBERDYKE TECH | AI Cybersecurity, Audits, Consulting, Risk Management',
    description: 'AI-powered global cybersecurity for enterprises, startups, and organizations. Led by decades of experience in IT and cyber defense.',
    images: ['https://www.cyberdyketech.com/assets/images/twitter-image.png'],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-white">
      <head>
        <link rel="icon" href="/CYBER.png" type="image/png" />
        <link rel="apple-touch-icon" href="/CYBER.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Cyberdyke Tech',
            image: 'https://www.cyberdyketech.com/CYBER.png',
            '@id': 'https://www.cyberdyketech.com/',
            url: 'https://www.cyberdyketech.com/',
            telephone: '+919391856552',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Hi-Tech City',
              addressLocality: 'Hyderabad',
              addressRegion: 'Telangana',
              postalCode: '500081',
              addressCountry: 'IN',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 17.4483,
              longitude: 78.3915,
            },
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              opens: '00:00',
              closes: '23:59',
            },
            sameAs: [
              'https://www.linkedin.com/company/cyberdyketech',
              'https://twitter.com/cyberdyketech',
            ],
          })}
        </script>
      </head>
      <body className={`${inter.className} text-gray-800`}>
        {children}
      </body>
    </html>
  )
}
