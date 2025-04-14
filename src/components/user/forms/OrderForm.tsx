'use client';
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { orderSchema, OrderSchema } from '@/lib/schemas/orderSchema';


type OrderFormProps = {
  onOrderSubmit: (data: OrderSchema) => Promise<void>;
  isSubmitting?: boolean;
}

export default function OrderForm({ onOrderSubmit, isSubmitting = false }: OrderFormProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<OrderSchema>({
    resolver: zodResolver(orderSchema),
    mode: 'onTouched',
    defaultValues: {
      paymentMethod: "CASH_ON_DELIVERY"
    }
  });

  const onSubmit = async (data: OrderSchema) => {
    try {
      await onOrderSubmit(data);
      setFormSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error al crear la orden:', error);
    }
  };

  return (
    <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-dark mb-6 text-center">Información de Envío</h2>

      {formSubmitted ? (
        <div className="text-center">
          <p className="text-green-600 font-bold mb-4">¡Tu orden ha sido creada exitosamente!</p>
          <button
            onClick={() => setFormSubmitted(false)}
            className="bg-green-dark text-whiteygreen px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Crear otra orden
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                id="firstName"
                {...register('firstName')}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-light focus:outline-none"
                placeholder="Tu nombre"
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
              <input
                type="text"
                id="lastName"
                {...register('lastName')}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-light focus:outline-none"
                placeholder="Tu apellido"
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input
              type="text"
              id="phone"
              {...register('phone')}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-light focus:outline-none"
              placeholder="3XXXXXXXXX"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="nationalId" className="block text-sm font-medium text-gray-700 mb-1">Documento de Identidad (opcional)</label>
            <input
              type="text"
              id="nationalId"
              {...register('nationalId')}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-light focus:outline-none"
              placeholder="Número de documento"
            />
            {errors.nationalId && <p className="text-red-500 text-xs mt-1">{errors.nationalId.message}</p>}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Dirección de Envío</label>
            <input
              type="text"
              id="address"
              {...register('address')}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-light focus:outline-none"
              placeholder="Tu dirección completa"
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
            <input
              type="text"
              id="city"
              {...register('city')}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-light focus:outline-none"
              placeholder="Tu ciudad"
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Método de Pago</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  value="CASH_ON_DELIVERY"
                  {...register('paymentMethod')}
                  className="h-4 w-4 text-green-dark focus:ring-green-light"
                />
                <label htmlFor="cashOnDelivery" className="ml-2 block text-sm text-gray-700">
                  Pago contra entrega
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="mobilePayment"
                  value="MOBILE_PAYMENT"
                  {...register('paymentMethod')}
                  className="h-4 w-4 text-green-dark focus:ring-green-light"
                />
                <label htmlFor="mobilePayment" className="ml-2 block text-sm text-gray-700">
                  Transferencia bancaria
                </label>
              </div>
            </div>
            {errors.paymentMethod && <p className="text-red-500 text-xs mt-1">{errors.paymentMethod.message}</p>}
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notas (opcional)</label>
            <textarea
              id="notes"
              {...register('notes')}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-light focus:outline-none"
              placeholder="Instrucciones especiales para la entrega..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-dark text-whiteygreen py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Procesando...' : 'Confirmar Pedido'}
          </button>
        </form>
      )}
    </div>
  );
}