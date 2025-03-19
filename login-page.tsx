"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, User, Lock, CheckCircle, Rocket, X, Shield, FileText, AlertTriangle } from "lucide-react"
import { cn } from "./lib/utils"
import { useMobile } from "./hooks/use-mobile"

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
  const isMobile = useMobile()

  // Check for saved credentials on component mount
  useEffect(() => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (rememberMe) {
      const userData = { cedula, password }
      const token = btoa(JSON.stringify(userData))
      localStorage.setItem("sao6_auth_token", token)
    } else {
      localStorage.removeItem("sao6_auth_token")
    }

    setTimeout(() => {
      setLoginSuccess(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }, 2000)
  }

  // Modal component for Terms and Privacy Policy
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
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {title.includes("Términos") ? <FileText className="text-green-600" /> : <Shield className="text-green-600" />}
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {children}
            </div>
            {title.includes("Términos") && (
              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end space-x-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAcceptTerms}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Aceptar términos
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            animate={{
              x: [0, Math.random() * 20 - 10, 0],
              y: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              width: `${150 + i * 50}px`,
              height: `${150 + i * 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(40px)",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl relative"
      >
        {/* Cloud-like shapes */}
        <div className="absolute top-0 right-0 w-full h-32 bg-white">
          <svg viewBox="0 0 600 100" className="absolute -bottom-1 left-0 w-full fill-white">
            <path d="M0,100 C150,30 350,30 600,100 L600,0 L0,0 Z"></path>
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-full h-32 bg-white">
          <svg viewBox="0 0 600 100" className="absolute -top-1 left-0 w-full fill-white rotate-180">
            <path d="M0,100 C150,30 350,30 600,100 L600,0 L0,0 Z"></path>
          </svg>
        </div>

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
              {isLoading && loginSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-50"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="w-16 h-16 text-green-600"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                          d="M20 6L9 17l-5-5"
                        />
                      </svg>
                    </motion.div>
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-6 text-xl font-bold text-green-700"
                  >
                    ¡Inicio de sesión exitoso!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-2 text-gray-600"
                  >
                    Redirigiendo al portal...
                  </motion.p>
                </motion.div>
              ) : isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-50"
                >
                  <div className="relative">
                    {/* Outer spinning circle */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-24 h-24 rounded-full border-4 border-green-200 border-t-green-600 flex items-center justify-center"
                    />

                    {/* Middle spinning circle (opposite direction) */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="absolute inset-0 m-auto w-16 h-16 rounded-full border-4 border-green-100 border-b-green-500 flex items-center justify-center"
                    />

                    {/* Inner pulsing circle */}
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-600"
                    />

                    {/* SAO6 Logo in center */}
                    <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      <span className="text-xs font-bold text-green-600">S6</span>
                    </div>
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 text-gray-600"
                  >
                    Verificando credenciales...
                  </motion.p>

                  {/* Loading dots */}
                  <div className="flex mt-2">
                    {[0, 1, 2].map((dot) => (
                      <motion.div
                        key={dot}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: dot * 0.3,
                          ease: "easeInOut",
                        }}
                        className="w-2 h-2 mx-1 rounded-full bg-green-500"
                      />
                    ))}
                  </div>
                </motion.div>
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
                      <motion.div
                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: cedula ? "100%" : "0%" }}
                        transition={{ duration: 0.3 }}
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
                      <motion.div
                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: password ? "100%" : "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="relative">
                        <input
                          id="remember-me"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={handleRememberMeChange}
                          className="h-5 w-5 text-green-500 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={rememberMe ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </motion.div>
                      </div>
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

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      type="submit"
                      className="w-full py-4 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-xl transition-all hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg shadow-green-200"
                    >
                      INICIAR SESIÓN
                    </button>
                  </motion.div>

                  {/* Mobile version of the welcome message */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-6 md:hidden"
                  >
                    <div className="bg-green-50 p-5 rounded-xl border border-green-100">
                      <h3 className="text-green-800 font-bold text-lg text-center mb-2">¡Bienvenido a SAO6!</h3>
                      <p className="text-green-800 text-sm text-center mb-2">Donde juntos movemos el futuro 🚀</p>
                      <p className="text-green-700 text-xs text-center">
                        En SAO6 creemos en la innovación y el compromiso. Cada día avanzamos para transformar la
                        movilidad y hacer la diferencia.
                      </p>
                    </div>
                  </motion.div>
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
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-100 rounded-full opacity-50"></div>
              <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-green-200 rounded-full opacity-40"></div>

              <div className="relative">
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
                    <p className="text-green-800 mt-4 font-medium">
                      Aquí el progreso nunca se detiene. ¡Sigamos adelante! 🚀
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
                  <div className="mt-4 text-white/90">
                    <p>
                      Transformamos la movilidad con soluciones innovadoras y sostenibles que mejoran la calidad de vida
                      de las personas y el medio ambiente.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/80 text-xs hidden lg:block">
        © {new Date().getFullYear()} SAO6 Technologies. Todos los derechos reservados.
      </div>

      {/* Terms and Conditions Modal */}
      <Modal
        show={showTerms}
        onClose={() => setShowTerms(false)}
        title="Términos y Condiciones - Recordar Credenciales"
      >
        <div className="space-y-6 text-gray-600">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
            <p className="text-sm">
              Al activar la opción "Recordarme", usted acepta las siguientes condiciones para el almacenamiento de sus credenciales:
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">1. Almacenamiento de Datos</h3>
            <p className="text-sm">
              Sus credenciales se almacenarán de forma segura en su dispositivo local. Esta información incluye:
            </p>
            <ul className="list-disc pl-5 text-sm space-y-2">
              <li>Número de cédula</li>
              <li>Contraseña (encriptada)</li>
            </ul>

            <h3 className="font-semibold text-gray-800">2. Seguridad</h3>
            <p className="text-sm">
              - Los datos se almacenan únicamente en su dispositivo
              <br />
              - La información se encripta antes de almacenarse
              <br />
              - No compartimos sus credenciales con terceros
            </p>

            <h3 className="font-semibold text-gray-800">3. Riesgos</h3>
            <p className="text-sm">
              Al permitir que se recuerden sus credenciales, debe ser consciente de que:
            </p>
            <ul className="list-disc pl-5 text-sm space-y-2">
              <li>Otras personas con acceso a su dispositivo podrían acceder a su cuenta</li>
              <li>Es su responsabilidad mantener su dispositivo seguro</li>
              <li>Debe cerrar sesión en dispositivos compartidos</li>
            </ul>

            <h3 className="font-semibold text-gray-800">4. Revocación del Consentimiento</h3>
            <p className="text-sm">
              Puede revocar este permiso en cualquier momento:
            </p>
            <ul className="list-disc pl-5 text-sm space-y-2">
              <li>Desactivando la opción "Recordarme"</li>
              <li>Cerrando sesión en su cuenta</li>
              <li>Limpiando los datos del navegador</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal
        show={showPrivacyPolicy}
        onClose={() => setShowPrivacyPolicy(false)}
        title="Política de Privacidad"
      >
        <div className="space-y-6 text-gray-600">
          <h3 className="font-semibold text-gray-800">Protección de Datos Personales</h3>
          <p className="text-sm">
            En SAO6 Technologies, la protección de sus datos personales es una prioridad. Esta política describe cómo recopilamos, usamos y protegemos su información cuando utiliza nuestro portal.
          </p>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">1. Información que Recopilamos</h4>
            <ul className="list-disc pl-5 text-sm space-y-2">
              <li>Número de cédula</li>
              <li>Datos de acceso y autenticación</li>
              <li>Información de uso del portal</li>
            </ul>

            <h4 className="font-medium text-gray-700">2. Uso de la Información</h4>
            <p className="text-sm">
              Utilizamos su información para:
            </p>
            <ul className="list-disc pl-5 text-sm space-y-2">
              <li>Autenticar su identidad</li>
              <li>Proporcionar acceso al portal</li>
              <li>Mejorar nuestros servicios</li>
              <li>Mantener la seguridad de su cuenta</li>
            </ul>

            <h4 className="font-medium text-gray-700">3. Protección de Datos</h4>
            <p className="text-sm">
              Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos, incluyendo:
            </p>
            <ul className="list-disc pl-5 text-sm space-y-2">
              <li>Encriptación de datos sensibles</li>
              <li>Acceso restringido a la información</li>
              <li>Monitoreo continuo de seguridad</li>
            
            </ul>

            <h4 className="font-medium text-gray-700">4. Sus Derechos</h4>
            <p className="text-sm">
              Usted tiene derecho a:
            </p>
            <ul className="list-disc pl-5 text-sm space-y-2">
              <li>Acceder a sus datos personales</li>
              <li>Rectificar información incorrecta</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Revocar su consentimiento</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  )
}