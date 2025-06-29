'use client'
import React from 'react';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaClock, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function ContactoPage() {
  const whatsappNumber = "573208680091";
  const whatsappMessage = "¡Hola! Me interesa conocer más sobre los productos de Natuvida";

  const contactMethods = [
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      description: "Chatea con nosotros ahora",
      value: "+57 320 868 0091",
      action: () => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank'),
      bgColor: "bg-green-500 hover:bg-green-600",
      textColor: "text-white"
    },
    {
      icon: FaFacebookF,
      title: "Facebook",
      description: "Síguenos en Facebook",
      value: "@NatuVida",
      action: () => window.open('https://www.facebook.com/profile.php?id=61558785675468', '_blank'),
      bgColor: "bg-blue-600 hover:bg-blue-700",
      textColor: "text-white"
    },
    {
      icon: FaInstagram,
      title: "Instagram",
      description: "Mira nuestros productos",
      value: "@natuvidatiendaonline_",
      action: () => window.open('https://www.instagram.com/natuvidatiendaonline_?igsh=b3IxbTFtNDExNjBw', '_blank'),
      bgColor: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
      textColor: "text-white"
    },
    {
      icon: MdEmail,
      title: "Email",
      description: "Envíanos un correo",
      value: "ventas@natuvida.com",
      action: () => window.location.href = 'mailto:ventas@natuvida.com?subject=Consulta sobre productos Natuvida',
      bgColor: "bg-gray-600 hover:bg-gray-700",
      textColor: "text-white"
    }
  ];

  const businessInfo = [
    {
      icon: FaClock,
      title: "Horarios de Atención",
      value: "Lunes a Viernes: 8:00 AM - 6:00 PM\nSábados: 9:00 AM - 4:00 PM"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Ubicación",
      value: "Medellín, Colombia\nEnvíos a todo el país"
    },
    {
      icon: FaPhone,
      title: "Teléfono",
      value: "+57 (1) 234-5678"
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-nv-green-light mb-6">
            ¿Necesitas ayuda?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Estamos aquí para ayudarte con cualquier pregunta sobre nuestros productos naturales para tu bienestar
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              onClick={method.action}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 overflow-hidden"
            >
              <div className={`${method.bgColor} ${method.textColor} p-6 text-center transition-colors duration-300`}>
                <method.icon className="w-12 h-12 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">{method.title}</h3>
                <p className="text-sm opacity-90">{method.description}</p>
              </div>
              <div className="p-4 text-center">
                <p className="font-semibold text-gray-700">{method.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick WhatsApp CTA */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 text-center">
          <div className="max-w-2xl mx-auto">
            <FaWhatsapp className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-nv-green-light mb-4">
              ¡Contáctanos por WhatsApp!
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              La forma más rápida de resolver tus dudas y conocer nuestros productos
            </p>
            <button
              onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank')}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Chatear Ahora
            </button>
          </div>
        </div>

        {/* Business Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {businessInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <info.icon className="w-10 h-10 text-nv-green-light mx-auto mb-4" />
              <h3 className="font-bold text-lg text-gray-800 mb-3">{info.title}</h3>
              <p className="text-gray-600 whitespace-pre-line">{info.value}</p>
            </div>
          ))}
        </div>

        {/* Footer Message */}
        <div className="text-center mt-16">
          <div className="rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-nv-green-light mb-4">
              Tu bienestar es nuestra prioridad
            </h3>
            <p className="text-gray-600 text-lg">
              En Natuvida estamos comprometidos con brindarte la mejor atención y productos de calidad para mejorar tu salud natural
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}