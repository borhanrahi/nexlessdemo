"use client"
import { useState } from 'react';
import Marquee from '../ui/marquee';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  quote: string;
}

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    position: "CEO, TechCorp",
    quote: "This product has revolutionized our workflow. Highly recommended!"
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Marketing Director, InnovateCo",
    quote: "The best solution we've found for our marketing needs. Simply amazing!"
  },
  {
    id: 3,
    name: "Alex Johnson",
    position: "Freelance Designer",
    quote: "As a freelancer, this tool has saved me countless hours. It's a game-changer!"
  },
  {
    id: 4,
    name: "Emily Brown",
    position: "CTO, StartupX",
    quote: "The features and support are unparalleled. We couldn't be happier with our choice."
  },
  {
    id: 5,
    name: "Michael Lee",
    position: "Product Manager, GlobalTech",
    quote: "This solution has significantly improved our team's productivity. A must-have!"
  }
];

export default function Testimonial() {
  const [testimonials] = useState<Testimonial[]>(testimonialData);

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-[280px] md:w-[320px] select-none p-6 mx-2">
      <div className="mb-4 flex gap-4">
        <span className="relative flex shrink-0 overflow-hidden w-9 h-9 rounded-full ring-1 ring-input"></span>
        <div className="text-sm">
          <p className="font-medium">{testimonial.name}</p>
          <p className="text-gray-600">{testimonial.position}</p>
        </div>
      </div>
      <q className="text-sm">{testimonial.quote}</q>
    </div>
  );

  return (
    <section className="py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">Meet our happy clients</h2>
          <p className="text-gray-600 text-lg">All of our 50+ clients are happy</p>

        </div>
      </div>
      <div className="max-w-full">
        <Marquee className="py-4" pauseOnHover={true}>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </Marquee>
        <Marquee className="py-4" pauseOnHover={true} reverse={true}>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}