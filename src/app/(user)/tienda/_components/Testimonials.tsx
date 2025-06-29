'use client'

import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { TESTIMONIALS } from '../_constants';
import { Avatar } from "@heroui/react";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        i < rating ? (
          <AiFillStar
            key={i}
            className="w-4 h-4 text-yellow-400"
          />
        ) : (
          <AiOutlineStar
            key={i}
            className="w-4 h-4 text-gray-300"
          />
        )
      ))}
    </div>
  );
};

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-nv-green-light mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Miles de personas han confiado en Natuvida para mejorar su bienestar y salud natural
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col justify-start"
            >
              <div className="flex items-center justify-between mb-4">
                <StarRating rating={testimonial.rating} />
                <span className="text-sm text-gray-500">
                  {testimonial.product}
                </span>
              </div>

              <blockquote className="text-gray-700 mb-4 italic flex-1">
                {testimonial.comment}
              </blockquote>

              <div className="flex items-center mt-auto pt-2">
                <Avatar name={testimonial.name.charAt(0)} className="w-10 h-10 text-base font-semibold mr-3 bg-gradient-to-r from-green-light to-nv-green-light text-white" />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-md">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-gradient-to-r from-green-light to-nv-green-light rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-nv-green-light">+2,500</span> clientes satisfechos
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}