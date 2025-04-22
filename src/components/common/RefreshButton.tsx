'use client'

import { useState } from 'react';

interface RefreshButtonProps {
  tag: string;
  label?: string;
}

export function RefreshButton({ tag, label }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setStatus('idle');

    // Llamar a la API para revalidar
    try {
      const response = await fetch(`/api/revalidate?tag=${tag}`);
      const data = await response.json();

      if (data.success) {
        setStatus('success');
        // No recargamos automáticamente para no interrumpir el panel de admin
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error al revalidar:', error);
      setStatus('error');
    } finally {
      setIsRefreshing(false);

      // Resetear el estado después de 3 segundos
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }
  };

  const getButtonText = () => {
    if (isRefreshing) return 'Actualizando...';
    if (status === 'success') return '✓ Actualizado';
    if (status === 'error') return '✗ Error';
    return label || `Actualizar ${getTagDisplayName(tag)}`;
  };

  const getTagDisplayName = (tag: string) => {
    const displayNames: Record<string, string> = {
      'products': 'Productos',
      'categories': 'Categorías',
      'orders': 'Pedidos',
      // Agrega más mapeos según necesites
    };

    return displayNames[tag] || tag;
  };

  const getButtonClass = () => {
    const baseClass = "px-4 py-2 rounded transition-colors font-medium ";

    if (isRefreshing) {
      return baseClass + "bg-gray-400 text-white cursor-wait";
    }

    switch (status) {
      case 'success':
        return baseClass + "bg-green-500 text-white";
      case 'error':
        return baseClass + "bg-red-500 text-white";
      default:
        return baseClass + "bg-nv-green-light hover:bg-nv-green-dark text-white";
    }
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className={getButtonClass()}
    >
      {getButtonText()}
    </button>
  );
}