import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Hero from '../../components/Hero/Hero'
import SectionHeader from '../../components/Common/SectionHeader'
import MenuCard from '../../components/MenuCard/MenuCard'
import { getFeaturedMenu, getPopularDishes } from '../../services/menuService'
import type { MenuItem } from '../../types'
import { Link } from 'react-router-dom'
import image1 from '../../assets/image1.jpg'
import image3 from '../../assets/image3.jpg'
import image5 from '../../assets/image5.avif'

const galleryPreviewItems = [
  {
    title: 'Luxury Dining Hall',
    image: image1,
    alt: 'Elegant dining hall with refined restaurant ambiance',
  },
  {
    title: 'Restaurant Interior',
    image: image3,
    alt: 'Sophisticated interior and warm lighting in the restaurant',
  },
  {
    title: 'Outdoor Seating',
    image: image5,
    alt: 'Stylish outdoor seating area designed for fine dining',
  },
]

const Home = () => {
  const [featured, setFeatured] = useState<MenuItem[]>([])
  const [popular, setPopular] = useState<MenuItem[]>([])

  useEffect(() => {
    getFeaturedMenu().then(setFeatured)
    getPopularDishes().then(setPopular)
  }, [])

  return (
    <div className="space-y-20">
      <Hero />

      <section id="featured">
        <SectionHeader title="Featured foods" subtitle="Signature dishes" />
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((item) => (
            <motion.div key={item.id} whileHover={{ y: -6 }} className="transition-transform duration-300">
              <MenuCard {...item} />
            </motion.div>
          ))}
        </div>
      </section>

      <section id="about-preview" className="rounded-[32px] border border-[#F1E2D1] bg-white p-10 shadow-xl shadow-[rgba(84,26,26,0.08)]">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_0.8fr] lg:items-center">
          <div>
            <SectionHeader title="About our kitchen" subtitle="Crafted with care" />
            <p className="max-w-2xl text-[#6E564D]">
              SmartTable blends modern presentation with warm hospitality. Every menu item is created from high-quality ingredients and a passion for thoughtful service.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/about"
                className="rounded-full border border-[#810B38] bg-white px-5 py-3 text-sm font-semibold text-[#810B38] transition duration-300 hover:bg-[#810B38] hover:text-white"
              >
                Learn more
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-[24px] border border-[#F1E2D1] bg-white p-6 shadow-lg shadow-[rgba(84,26,26,0.08)]">
              <p className="text-sm uppercase tracking-[0.35em] text-[#810B38]">Our Promise</p>
              <p className="mt-3 text-[#6E564D]">Fresh ingredients, unique flavors, and exceptional presentation tailored for every guest.</p>
            </div>
            <div className="rounded-[24px] border border-[#F1E2D1] bg-white p-6 shadow-lg shadow-[rgba(84,26,26,0.08)]">
              <p className="text-sm uppercase tracking-[0.35em] text-[#810B38]">Atmosphere</p>
              <p className="mt-3 text-[#6E564D]">A refined dining space with contemporary lighting, sophisticated textures, and calm service.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="popular">
        <SectionHeader title="Popular dishes" subtitle="Guest favorites" />
        <div className="grid gap-6 md:grid-cols-3">
          {popular.map((item) => (
            <MenuCard key={item.id} {...item} />
          ))}
        </div>
      </section>

      <section id="reviews" className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[28px] border border-[#F1E2D1] bg-white p-8 shadow-xl shadow-[rgba(84,26,26,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-[#810B38]">Customer review</p>
          <p className="mt-4 text-xl font-semibold text-[#541A1A]">"Best dining experience with unique dishes and attentive service."</p>
          <p className="mt-4 text-[#6E564D]">- Maya S.</p>
        </div>
        <div className="rounded-[28px] border border-[#F1E2D1] bg-white p-8 shadow-xl shadow-[rgba(84,26,26,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-[#810B38]">Customer review</p>
          <p className="mt-4 text-xl font-semibold text-[#541A1A]">"A perfect blend of modern design and culinary excellence."</p>
          <p className="mt-4 text-[#6E564D]">- Aaron K.</p>
        </div>
        <div className="rounded-[28px] border border-[#F1E2D1] bg-white p-8 shadow-xl shadow-[rgba(84,26,26,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-[#810B38]">Customer review</p>
          <p className="mt-4 text-xl font-semibold text-[#541A1A]">"The atmosphere makes every meal feel special."</p>
          <p className="mt-4 text-[#6E564D]">- Nina R.</p>
        </div>
      </section>

      <section id="gallery-preview" className="rounded-[32px] border border-[#F1E2D1] bg-white p-6 shadow-xl shadow-[rgba(84,26,26,0.08)]">
        <SectionHeader title="Gallery preview" subtitle="Atmosphere & plating" />
        <div className="grid gap-4 sm:grid-cols-3">
          {galleryPreviewItems.map((item) => (
            <div
              key={item.title}
              className="group relative aspect-[4/3] overflow-hidden rounded-[28px] border border-[#F1E2D1] bg-white shadow-lg shadow-[rgba(84,26,26,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_-20px_rgba(129,11,56,0.35)]"
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[rgba(129,11,56,0.4)] opacity-0 transition duration-300 group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-end p-4 opacity-0 transition duration-300 group-hover:opacity-100">
                <span className="text-sm font-semibold text-white drop-shadow-sm">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="reservation-cta" className="rounded-[32px] border border-[#F1E2D1] bg-white p-10 shadow-2xl shadow-[rgba(84,26,26,0.08)]">
        <div className="flex flex-col gap-6 rounded-[32px] border border-[#F1E2D1] bg-[#FFF8F3] p-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#810B38]">Reserve a table</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#541A1A]">Enjoy an elevated dining experience tonight.</h2>
          </div>
          <Link
            to="/reservation"
            className="inline-flex rounded-full bg-[#810B38] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#541A1A]"
          >
            Book now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
