'use client';
import { ReactNode, useState } from 'react';
import { Product } from '@/types/product.types';
import AddToCartBtn from '../cart/AddToCartButton';
import EditQuantityButton from '../cart/EditQuantityButton';
import { MobileGallery } from './MobileGallery';
import { DesktopGallery } from './DesktopGallery';
import { Tabs, Tab } from "@heroui/tabs";
import Price from '../utils/Price';
import { Card, CardBody } from '@heroui/react';

interface ProductDetailProps {
  product: Product;
}

const TABS = [
  { key: 'usageMode', label: 'Modo de uso' },
  { key: 'ingredients', label: 'Ingredientes' },
  { key: 'presentation', label: 'Presentación' },
  { key: 'benefits', label: 'Beneficios' },
  { key: 'contraindications', label: 'Contraindicaciones' },
];

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('usageMode');

  // Preparar imágenes para la galería
  const images = product.images && product.images.length > 0
    ? product.images.map(img => ({
      src: img.imageUrl,
      altText: img.altText || product.name
    }))
    : [{
      src: product.primaryImageUrl || '/images/placeholder.png',
      altText: product.name
    }];


  // Contenido de cada tab
  const tabContent: Record<string, ReactNode> = {
    usageMode: product.usageMode ? (
      <p className="text-gray-600">{product.usageMode}</p>
    ) : <p className="text-gray-400">No especificado.</p>,
    ingredients: product.ingredients && product.ingredients.length > 0 ? (
      <ul className="list-disc pl-5 space-y-1">
        {product.ingredients.map((ingredient, index) => (
          <li key={index} className="text-gray-600">{ingredient}</li>
        ))}
      </ul>
    ) : <p className="text-gray-400">No especificado.</p>,
    benefits: product.benefits && product.benefits.length > 0 ? (
      <ul className="list-disc pl-5 space-y-1">
        {product.benefits.map((benefit, index) => (
          <li key={index} className="text-gray-600">{benefit}</li>
        ))}
      </ul>
    ) : <p className="text-gray-400">No especificado.</p>,
    contraindications: product.contraindications && product.contraindications.length > 0 ? (
      <ul className="list-disc pl-5 space-y-1">
        {product.contraindications.map((contraindication, index) => (
          <li key={index} className="text-gray-600">{contraindication}</li>
        ))}
      </ul>
    ) : <p className="text-gray-400">No especificado.</p>,
    presentation: product.presentation ? (
      <p className="text-gray-600">{product.presentation}</p>
    ) : <p className="text-gray-400">No especificado.</p>,
  };

  return (
    <div className="container mx-auto px-6 md:px-12 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-[auto,1fr] md:gap-8">
        <div className="md:col-span-1">
          <div className="flex md:hidden">
            <MobileGallery images={images} />
          </div>
          <div className="hidden md:flex">
            <DesktopGallery images={images} />
          </div>
        </div>

        <div className="md:col-span-1">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <div className="mt-6">
            <p className="text-4xl font-bold text-gray-800">
              <Price value={product.price.unit} />
            </p>
          </div>

          <div className="mt-4 flex items-center py-4">
            <EditQuantityButton itemId={product.id} initialQuantity={quantity} setNewQuantity={setQuantity} className="mr-2" />
          </div>
          <AddToCartBtn product={product} prodQuantity={quantity} />
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Descripción</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
        </div>
        <div className="md:col-span-2 md:min-h-[500px] w-full mt-10 md:mt-0 md:px-20">
          <div className='overflow-x-auto'>
            <Tabs aria-label='Options'
              selectedKey={activeTab}
              onSelectionChange={(key) => setActiveTab(String(key))}
              className='bg-white flex flex-col md:flex-row'
            // classNames={{
            //   tabContent: 'shadow-none'
            // }}
            >
              {TABS.map(tab => (
                <Tab key={tab.key} title={tab.label} className=''
                >
                  <Card shadow='sm'>
                    <CardBody>
                      {tabContent[tab.key]}
                    </CardBody>

                  </Card>
                </Tab>
              )
              )}
            </Tabs>
          </div>

        </div>

      </div>
    </div >
  );
}