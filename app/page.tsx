"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Check, ChevronRight, Menu, X, Mail, MapPin, Github, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    numero: "",
    mensaje: "",
  })

  const sections = useRef([])

  // Actualizar el formulario de contacto para usar Formspree
  // Primero, actualizar el estado y las funciones de manejo del formulario
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    error: false,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({ submitted: false, submitting: true, error: false })

    try {
      // Enviar a Formspree - reemplazar "xxxx" con tu ID de formulario de Formspree
      const response = await fetch("https://formspree.io/f/xjkwobgl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormStatus({ submitted: true, submitting: false, error: false })
        setFormData({ nombre: "", email: "", numero: "", mensaje: "" })
      } else {
        throw new Error("Error al enviar el formulario")
      }
    } catch (error) {
      console.error(error)
      setFormStatus({ submitted: false, submitting: false, error: true })
    }
  }

  // Función para actualizar el estado del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Efecto para detectar la sección activa durante el scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      sections.current.forEach((section) => {
        if (!section) return

        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id)
        }
      })
    }

    // Inicializar las referencias a las secciones
    sections.current = [
      document.getElementById("inicio"),
      document.getElementById("servicios"),
      document.getElementById("portfolio"),
      document.getElementById("nosotros"),
      document.getElementById("contacto"),
    ]

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Verificar la sección activa al cargar

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Función para cerrar el menú móvil al hacer clic en un enlace
  const handleNavLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="UIZA Logo" width={1200} height={48} className="h-12 w-auto" />
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#inicio" isActive={activeSection === "inicio"}>
              Inicio
            </NavLink>
            <NavLink href="#servicios" isActive={activeSection === "servicios"}>
              Servicios
            </NavLink>
            <NavLink href="#portfolio" isActive={activeSection === "portfolio"}>
              Portfolio
            </NavLink>
            <NavLink href="#nosotros" isActive={activeSection === "nosotros"}>
              Nosotros
            </NavLink>
            <NavLink href="#contacto" isActive={activeSection === "contacto"}>
              Contacto
            </NavLink>
          </nav>

          {/* Botón de menú móvil */}
          <button
            className="md:hidden text-gray-700 hover:text-violet-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <MobileNavLink href="#inicio" onClick={handleNavLinkClick}>
                Inicio
              </MobileNavLink>
              <MobileNavLink href="#servicios" onClick={handleNavLinkClick}>
                Servicios
              </MobileNavLink>
              <MobileNavLink href="#portfolio" onClick={handleNavLinkClick}>
                Portfolio
              </MobileNavLink>
              <MobileNavLink href="#nosotros" onClick={handleNavLinkClick}>
                Nosotros
              </MobileNavLink>
              <MobileNavLink href="#contacto" onClick={handleNavLinkClick}>
                Contacto
              </MobileNavLink>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section
          id="inicio"
          className="relative py-20 md:py-32 bg-gradient-to-br from-violet-50 to-white overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-violet-100 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-violet-100 rounded-full opacity-50 blur-3xl"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Creamos sitios web modernos, rápidos y accesibles para todos
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Diseño y desarrollo web profesional para hacer crecer tu negocio en el mundo digital
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-8">
                  <Link href="#servicios">
                    Ver servicios <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                  <Link href="#contacto">Contáctanos</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services/Pricing Section */}
        <section id="servicios" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
              <div className="w-20 h-1 bg-violet-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Ofrecemos soluciones web a medida para cada necesidad y presupuesto
              </p>
            </div>

            {/* Mejorar la navegación por pestañas para hacerla más clara y visualmente separada */}
            <Tabs defaultValue="landing-pages" className="max-w-5xl mx-auto">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 p-1 bg-gray-100 rounded-lg">
                <TabsTrigger
                  value="landing-pages"
                  className="text-lg py-3 rounded-md data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm"
                >
                  Landing Pages
                </TabsTrigger>
                <TabsTrigger
                  value="tiendas-online"
                  className="text-lg py-3 rounded-md data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm"
                >
                  Tiendas Online
                </TabsTrigger>
              </TabsList>

              <TabsContent value="landing-pages">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <PricingCard
                    title="Básico"
                    price="$35.000"
                    description="Diseño simple, responsive, botón WhatsApp, redes sociales."
                    features={[
                      "Diseño responsive",
                      "Botón de WhatsApp",
                      "Integración redes sociales",
                      "Formulario de contacto",
                      "Optimizado para móviles",
                    ]}
                  />
                  <PricingCard
                    title="Intermedio"
                    price="$60.000"
                    description="Sitio multisección, diseño personalizado, SEO básico."
                    features={[
                      "Diseño personalizado",
                      "Múltiples secciones",
                      "SEO básico",
                      "Integración Google Analytics",
                      "Formulario de contacto avanzado",
                      "Optimización de imágenes",
                    ]}
                  />
                  <PricingCard
                    title="Avanzado"
                    price="$90.000"
                    description="Animaciones, backend básico con Node.js, rendimiento optimizado."
                    features={[
                      "Diseño premium personalizado",
                      "Animaciones y transiciones",
                      "Backend básico con Node.js",
                      "Optimización de rendimiento",
                      "SEO avanzado",
                      "Panel de administración",
                      "Soporte técnico (1 mes)",
                    ]}
                  />
                </div>
              </TabsContent>

              <TabsContent value="tiendas-online">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  <PricingCard
                    title="Básico"
                    price="$90.000"
                    description="Hasta 20 productos, diseño responsive, pasarelas de pago locales."
                    features={[
                      "Hasta 20 productos",
                      "Diseño responsive",
                      "Pasarelas de pago locales",
                      "Panel de administración",
                      "Gestión de inventario básica",
                      "SEO básico",
                      "Hosting estatico",
                      "Ideal para emprendimientos pequeños",
                    ]}
                  />
                   <PricingCard
                    title="Intermedio"
                    price="$135.000"
                    description="Hasta 50 productos, diseño personalizado, SEO mejorado, ideal para tiendas medianas."
                    features={[
                      "Hasta 50 productos",
                      "Diseño responsive",
                      "Pasarelas de pago locales",
                      "Panel de administración",
                      "Gestión de inventario intermedia",
                      "SEO mejorado",
                      "Hosting optimizado o VPS parcial",
                      "Ideal para tiendas medianas",
                    ]}
                  />
                  <PricingCard
                    title="Avanzado"
                    price="$180.000"
                    description="Hasta 150 productos, diseño a medida, integracion completa, soporte tecnico."
                    features={[
                      "Hasta 150 productos",
                      "Diseño totalmente personalizado",
                      "Sistema de reviews",
                      "Optimización de velocidad",
                      "Integración con redes sociales",
                      "SEO avanzado",
                      "Múltiples pasarelas de pago",
                      "Soporte técnico (3 meses)",
                      "VPS dedicado",
                      "Ideal para negocios que quieren escalar",
                    ]}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestro Trabajo</h2>
              <div className="w-20 h-1 bg-violet-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Conoce nuestro proyecto destacado</p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    TravelMate: App de Viajes con Calendario Inteligente
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Desarrollamos una aplicación móvil para viajeros que incluye un calendario inteligente y sistema de
                    reservas para restaurantes, hoteles y actividades turísticas.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <FeatureItem>Interfaz intuitiva y moderna</FeatureItem>
                    <FeatureItem>Sistema de reservas en tiempo real</FeatureItem>
                    <FeatureItem>Calendario inteligente con sugerencias</FeatureItem>
                    <FeatureItem>Integración con mapas y navegación</FeatureItem>
                    <FeatureItem>Modo offline para viajeros sin conexión</FeatureItem>
                  </ul>
                </div>
                <div className="order-1 md:order-2 flex justify-center">
                  <div className="relative w-[280px] h-[560px] bg-gray-900 rounded-[36px] p-2 shadow-xl">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-900 rounded-b-xl"></div>
                    <div className="w-full h-full bg-white rounded-[30px] overflow-hidden flex items-center justify-center p-4">
                      <Image
                        src="/images/travelmate-logo.png"
                        alt="TravelMate App"
                        width={200}
                        height={400}
                        className="w-auto h-auto max-h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="nosotros" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sobre Nosotros</h2>
              <div className="w-20 h-1 bg-violet-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Somos un equipo pequeño pero ambicioso, enfocado en crear soluciones web eficientes y creativas
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <TeamMember
                name="Thiago Piñeyro"
                role="Front-end Developer"
                description="Desarrollador que transforma los diseños en sitios web funcionales. Especialista en tecnologías modernas como React, Node.js y bases de datos."
              />
              <TeamMember
                name="Berenice Frontini"
                role="UI/UX Designer"
                description="Diseñadora UI/UX especializada en Figma. Crea el diseño visual y la estructura de las páginas, enfocándose en la experiencia del usuario y la estética."
              />
            </div>

            <div className="mt-16 bg-violet-50 p-8 rounded-2xl max-w-5xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Visión</h3>
              <p className="text-gray-600 mb-6">
                En UIZA, nos dedicamos a ofrecer soluciones web rápidas, responsivas y estéticamente refinadas para
                empresas e individuos. Combinamos experiencia técnica con diseño creativo para construir sitios web que
                no solo se vean geniales, sino que también funcionen excepcionalmente bien.
              </p>
              <p className="text-gray-600">
                Creemos en la simplicidad, la eficiencia y la innovación. Nuestro objetivo es ayudar a nuestros clientes
                a establecer una presencia en línea sólida que impulse su crecimiento y éxito.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contáctanos</h2>
              <div className="w-20 h-1 bg-violet-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                ¿Listo para comenzar tu proyecto? Ponte en contacto con nosotros hoy mismo
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div>
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                        Nombre
                      </label>
                      <Input
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Tu nombre"
                        required
                        className="w-full"
                        disabled={formStatus.submitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Tu email"
                        required
                        className="w-full"
                        disabled={formStatus.submitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="numero" className="block text-sm font-medium text-gray-700">
                        Numero de telefono (en el caso de extranjeros usar codigo de pais)
                      </label>
                      <Input
                        id="numero"
                        name="numero"
                        type="numero"
                        value={formData.numero}
                        onChange={handleInputChange}
                        placeholder="Tu numero de telefono"
                        required
                        className="w-full"
                        disabled={formStatus.submitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">
                        Mensaje
                      </label>
                      <Textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleInputChange}
                        placeholder="Tu mensaje"
                        required
                        className="w-full min-h-[150px]"
                        disabled={formStatus.submitting}
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        type="submit"
                        className="flex-1 bg-violet-600 hover:bg-violet-700 text-white"
                        disabled={formStatus.submitting}
                      >
                        {formStatus.submitting
                          ? "Enviando..."
                          : formStatus.submitted
                            ? "¡Enviado!"
                            : "Enviar por Email"}
                        <Mail className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                        onClick={() =>
                          window.open(
                            `https://wa.me/5491144081542?text=${encodeURIComponent(`Hola, mi nombre es ${formData.nombre}. ${formData.mensaje}`)}`,
                            "_blank",
                          )
                        }
                      >
                        Enviar por WhatsApp
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-2 h-4 w-4"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </Button>
                    </div>
                    {formStatus.error && (
                      <p className="text-red-500 text-sm">
                        Hubo un error al enviar el formulario. Por favor, intenta nuevamente.
                      </p>
                    )}
                  </form>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
                  <div className="space-y-6">
                    <ContactInfo
                      icon={
                        <div className="bg-green-500 text-white p-1.5 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </div>
                      }
                      title="WhatsApp"
                      content="+54 9 11 4408-1542"
                      href="https://wa.me/5491144081542?text=Hola,%20quiero%20hacer%20una%20consulta..."
                    />
                    <ContactInfo
                      icon={<Mail className="h-6 w-6 text-violet-600" />}
                      title="Email"
                      content="uituzaingo@gmail.com"
                      href="mailto:uituzaingo@gmail.com"
                    />
                    <ContactInfo
                      icon={<MapPin className="h-6 w-6 text-violet-600" />}
                      title="Ubicación"
                      content="Buenos Aires, Argentina"
                    />
                  </div>
                </div>

                <div className="bg-violet-600 text-white p-8 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">¿Por qué elegirnos?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-violet-200" />
                      <span>Diseño personalizado y único</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-violet-200" />
                      <span>Optimización para dispositivos móviles</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-violet-200" />
                      <span>Precios transparentes sin costos ocultos</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-violet-200" />
                      <span>Soporte técnico continuo</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-violet-200" />
                      <span>Entrega rápida y eficiente</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Image
                src="/images/logo.png"
                alt="UIZA Logo"
                width={100}
                height={40}
                className="h-10 w-auto brightness-0 invert mb-4"
              />
              <p className="text-gray-400 max-w-md">
                Diseño y desarrollo web profesional para hacer crecer tu negocio en el mundo digital.
              </p>
            </div>
            <div className="flex space-x-4">
              <SocialLink icon={<Github size={20} />} href="https://github.com/UIZAIT" />
              <SocialLink icon={<Twitter size={20} />} href="https://x.com/UIZA_IT" />
              <SocialLink icon={<Instagram size={20} />} href="https://www.instagram.com/uiza.it/" />
              <SocialLink
                icon={<Linkedin size={20} />}
                href="https://www.linkedin.com/in/thiago-pi%C3%B1eyro-b58669336/"
              />
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} UIZA. Todos los derechos reservados.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Política de Privacidad
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/5491144081542"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg transition-transform hover:scale-110 z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
    </div>
  )
}

// Componente de enlace de navegación para desktop
function NavLink({ href, isActive, children }) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors ${
        isActive ? "text-violet-600" : "text-gray-700 hover:text-violet-600"
      }`}
    >
      {children}
    </Link>
  )
}

// Componente de enlace de navegación para móvil
function MobileNavLink({ href, onClick, children }) {
  return (
    <Link href={href} className="text-gray-700 hover:text-violet-600 transition-colors text-lg" onClick={onClick}>
      {children}
    </Link>
  )
}

// 1. Modificar el componente PricingCard para que el botón "Contratar" redireccione a la sección de contacto
function PricingCard({ title, price, description, features }) {
  return (
    <div className="rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-violet-100 group border border-gray-200 shadow-lg bg-white">
      <div className="p-6 bg-gray-50 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">{price}</span>
          <span className="ml-1 text-sm opacity-80">ARS</span>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-6">{description}</p>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 mr-2 text-gray-400 group-hover:text-violet-600 transition-colors duration-300" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          asChild
          className="w-full bg-white text-gray-900 border border-gray-200 group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600 transition-all duration-300"
        >
          <Link href="#contacto">Contratar</Link>
        </Button>
      </div>
    </div>
  )
}

// Componente de elemento de característica
function FeatureItem({ children }) {
  return (
    <li className="flex items-center">
      <Check className="h-5 w-5 mr-2 text-violet-600" />
      <span className="text-gray-600">{children}</span>
    </li>
  )
}

// Componente de miembro del equipo
function TeamMember({ name, role, description }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
      <div className="w-32 h-32 bg-violet-100 rounded-full overflow-hidden flex-shrink-0">
        <Image
          src={`/placeholder.svg?height=128&width=128&text=${name.split(" ")[0][0]}${name.split(" ")[1][0]}`}
          alt={name}
          width={128}
          height={128}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center md:text-left">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-violet-600 mb-3">{role}</p>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}

// Reemplazar el icono de teléfono con el logo de WhatsApp y actualizar la sección de contacto
function ContactInfo({ icon, title, content, href }) {
  return (
    <div className="flex items-start">
      <div className="mr-4 mt-1">{icon}</div>
      <div>
        <h4 className="font-medium text-gray-900">{title}</h4>
        {href ? (
          <a href={href} className="text-gray-600 hover:text-violet-600 transition-colors">
            {content}
          </a>
        ) : (
          <p className="text-gray-600">{content}</p>
        )}
      </div>
    </div>
  )
}

// Componente de enlace social
function SocialLink({ icon, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-violet-600 transition-colors"
    >
      {icon}
    </a>
  )
}
