import React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, User, Lock, CheckCircle, Rocket, X, Shield, FileText, AlertTriangle, ExternalLink, BarChart, Loader2, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

// Componente de animación de carga mejorado
const EnhancedLoadingAnimation = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center z-50"
  >
    <motion.div
      className="relative w-40 h-40"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Anillos giratorios */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute inset-0 rounded-full border-4 ${i % 2 === 0 ? 'border-t-green-500' : 'border-b-green-500'} border-green-100`}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{
            duration: 2 - i * 0.5,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ margin: i * 10 }}
        />
      ))}
      
      {/* Logo central pulsante */}
      <motion.div
        className="absolute inset-0 m-auto w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center"
        animate={{
          scale: [1, 1.2, 1],
          boxShadow: [
            "0 0 0 0 rgba(34, 197, 94, 0.4)",
            "0 0 0 20px rgba(34, 197, 94, 0)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Shield className="w-10 h-10 text-white" />
      </motion.div>
    </motion.div>
    
    <motion.div
      className="mt-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
        Verificando credenciales
      </h3>
      <p className="text-gray-600 mt-2">Por favor espere un momento...</p>
    </motion.div>
  </motion.div>
)

// Componente de opciones mejorado
const OptionsModal = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleOptionSelect = async (url: string) => {
    setSelectedOption(url)
    setIsTransitioning(true)
    
    // Simular transición antes de redirigir
    await new Promise(resolve => setTimeout(resolve, 1000))
    window.location.href = url
  }

  const options = [
    {
      title: "Solicitud de Permisos Operacionales",
      description: "Gestione sus solicitudes de permisos de manera eficiente y segura.",
      icon: FileText,
      gradient: "from-blue-500 to-blue-700",
      url: "http://solicitud-permisos.sao6.com.co/",
      available: true
    },
    {
      title: "Indicador de Desempeño",
      description: "Monitoree y analice su desempeño en tiempo real.",
      icon: BarChart,
      gradient: "from-purple-500 to-purple-700",
      url: "#",
      available: false
    }
  ]

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-lg z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden"
          >
            {/* Encabezado */}
            <div className="relative p-8 bg-gradient-to-br from-green-500 to-green-700 text-white">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold">Bienvenido a SAO6</h2>
                <p className="mt-2 text-green-100">Seleccione una opción para continuar</p>
              </motion.div>
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Elementos decorativos */}
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-white/10 rounded-full blur-xl" />
            </div>

            {/* Opciones */}
            <div className="p-8 grid md:grid-cols-2 gap-6">
              {options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full h-full p-6 rounded-2xl text-left relative overflow-hidden transition-all",
                      "group hover:shadow-xl",
                      option.available ? "cursor-pointer" : "cursor-not-allowed opacity-80"
                    )}
                    onClick={() => option.available && handleOptionSelect(option.url)}
                    disabled={!option.available}
                  >
                    {/* Fondo con gradiente */}
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br",
                      option.gradient,
                      "opacity-90 group-hover:opacity-100 transition-opacity"
                    )} />

                    {/* Contenido */}
                    <div className="relative z-10">
                      <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <option.icon className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-2">{option.title}</h3>
                      <p className="text-white/90 mb-4">{option.description}</p>

                      <div className="flex items-center">
                        {option.available ? (
                          <motion.div
                            className="flex items-center text-white"
                            whileHover={{ x: 5 }}
                          >
                            <span className="mr-2">Acceder</span>
                            <ArrowRight className="w-5 h-5" />
                          </motion.div>
                        ) : (
                          <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-white text-sm">
                            Próximamente
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Elementos decorativos */}
                    <motion.div
                      className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Animación de transición */}
          <AnimatePresence>
            {isTransitioning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-white text-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-bold">Redirigiendo</h3>
                  <p className="text-white/80">Por favor espere un momento...</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [cedula, setCedula] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [activeField, setActiveField] = useState<"none" | "cedula" | "password">("none")
  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [isLoadingCookies, setIsLoadingCookies] = useState(true)
  const [showOptions, setShowOptions] = useState(false)
  const isMobile = useMobile()

  // Check for saved credentials
  useEffect(() => {
    setTimeout(() => {
      const savedToken = localStorage.getItem("sao6_auth_token")
      if (savedToken) {
        try {
          const userData = JSON.parse(atob(savedToken))
          setCedula(userData.cedula || "")
          setPassword(userData.password || "")
          setRememberMe(true)
          setAcceptedTerms(true)
        } catch (error) {
          console.error("Error parsing saved token:", error)
          localStorage.removeItem("sao6_auth_token")
        }
      }
      setIsLoadingCookies(false)
    }, 2000)
  }, [])

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    if (checked && !acceptedTerms) {
      setShowTerms(true)
    } else {
      setRememberMe(checked)
    }
  }

  const handleAcceptTerms = () => {
    setAcceptedTerms(true)
    setRememberMe(true)
    setShowTerms(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (rememberMe) {
      const userData = { cedula, password }
      const token = btoa(JSON.stringify(userData))
      localStorage.setItem("sao6_auth_token", token)
    } else {
      localStorage.removeItem("sao6_auth_token")
    }

    // Simular login
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLoginSuccess(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    setShowOptions(true)
  }

  // Cookie Loading Animation
  if (isLoadingCookies) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 relative overflow-hidden"
        >
          <div className="flex flex-col items-center space-y-6">
            <motion.div
              className="relative w-32 h-32"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute inset-0 rounded-full border-4 ${
                    i % 2 === 0 ? 'border-t-green-500' : 'border-b-green-500'
                  } border-green-100`}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{
                    duration: 2 - i * 0.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ margin: i * 10 }}
                />
              ))}
              
              <motion.div
                className="absolute inset-0 m-auto w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(34, 197, 94, 0.4)",
                    "0 0 0 20px rgba(34, 197, 94, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Shield className="w-10 h-10 text-white" />
              </motion.div>
            </motion.div>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                Cargando credenciales guardadas
              </h2>
              <p className="text-gray-600 mt-2">Por favor espere un momento...</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 flex items-center justify-center p-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl relative"
      >
        <div className="grid md:grid-cols-2 min-h-[550px]">
          {/* Left side - Login form */}
          <div className="p-8 md:p-12 flex flex-col justify-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex flex-col items-center md:items-start"
            >
              <div className="flex justify-center md:justify-start w-full">
                <motion.img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sao6-logo.jpg-WN3bii2pN5QVOXkhgoBvtnOVUEGaRa.jpeg"
                  alt="SAO6 Logo"
                  className="h-24 md:h-32 mb-6"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left">Portal del Colaborador</h1>
              <p className="text-gray-600 mt-2 text-lg text-center md:text-left">Inicia sesión en tu cuenta</p>
            </motion.div>

            <AnimatePresence mode="wait">
              {isLoading ? (
                <EnhancedLoadingAnimation />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    className="space-y-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="relative group">
                      <div
                        className={cn(
                          "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200",
                          activeField === "cedula" ? "text-green-600" : "text-green-500",
                        )}
                      >
                        <User size={20} />
                      </div>
                      <input
                        type="text"
                        placeholder="Número de cédula"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                        onFocus={() => setActiveField("cedula")}
                        onBlur={() => setActiveField("none")}
                        className={cn(
                          "w-full py-4 pl-12 pr-4 bg-gray-50 border-2 rounded-2xl transition-all duration-200",
                          "focus:outline-none focus:ring-4 focus:ring-green-100",
                          activeField === "cedula" ? "border-green-500" : "border-gray-100",
                        )}
                        required
                      />
                    </div>

                    <div className="relative group">
                      <div
                        className={cn(
                          "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200",
                          activeField === "password" ? "text-green-600" : "text-green-500",
                        )}
                      >
                        <Lock size={20} />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Número de cédula (confirmar)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setActiveField("password")}
                        onBlur={() => setActiveField("none")}
                        className={cn(
                          "w-full py-4 pl-12 pr-12 bg-gray-50 border-2 rounded-2xl transition-all duration-200",
                          "focus:outline-none focus:ring-4 focus:ring-green-100",
                          activeField === "password" ? "border-green-500" : "border-gray-100",
                        )}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-500 transition-colors"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={handleRememberMeChange}
                        className="h-5 w-5 text-green-500 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                        Recordarme
                      </label>
                    </div>
                    <div className="text-sm">
                      <button
                        type="button"
                        onClick={() => setShowPrivacyPolicy(true)}
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        Política de privacidad
                      </button>
                    </div>
                  </motion.div>

                  <motion.button
                    type="submit"
                    className="w-full py-4 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-xl transition-all hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg shadow-green-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    INICIAR SESIÓN
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </div>

          {/* Right side - Welcome message */}
          <div className="hidden md:flex flex-col justify-center p-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative"
            >
              <h2 className="text-4xl font-bold text-gray-800 leading-tight">¡Bienvenido a SAO6!</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-green-500 to-green-700 rounded-full mt-4"></div>
              <h3 className="text-2xl font-semibold text-green-700 mt-4">Donde juntos movemos el futuro</h3>

              <div className="mt-6 text-gray-700 space-y-4">
                <p className="text-lg">Para ingresar, digita tu número de cédula en ambos espacios.</p>

                <div className="bg-green-50 p-6 rounded-xl border border-green-100 mt-6 shadow-md">
                  <p className="text-green-800 font-medium">
                    En SAO6 creemos en la innovación y el compromiso. Cada día avanzamos para transformar la movilidad
                    y hacer la diferencia.
                  </p>
                </div>
              </div>

              <div className="mt-10 bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-xl text-white shadow-lg">
                <div className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                    <Rocket className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-4">
                    <div className="text-white/80 text-sm">Nuestro compromiso</div>
                    <div className="text-xl font-bold">Innovación en Movimiento</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Terms Modal */}
      <Modal
        show={showTerms}
        onClose={() => setShowTerms(false)}
        title="Términos y Condiciones"
      >
        <div className="space-y-4">
          <p>Al activar "Recordarme", acepta que sus credenciales se almacenen de forma segura en su dispositivo.</p>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-yellow-800">
              <AlertTriangle className="inline-block mr-2" />
              Por favor, no active esta opción en dispositivos compartidos.
            </p>
          </div>
        </div>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal
        show={showPrivacyPolicy}
        onClose={() => setShowPrivacyPolicy(false)}
        title="Política de Privacidad"
      >
        <div className="space-y-4">
          <p>Protegemos su información personal y la utilizamos solo para brindarle acceso seguro al portal.</p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800">
              <Shield className="inline-block mr-2" />
              Sus datos están seguros con nosotros.
            </p>
          </div>
        </div>
      </Modal>

      {/* Options Modal */}
      <OptionsModal show={showOptions} onClose={() => setShowOptions(false)} />
    </div>
  )
}

// Modal component
const Modal = ({ show, onClose, title, children }: { show: boolean; onClose: () => void; title: string; children: React.ReactNode }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-2xl"
        >
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)