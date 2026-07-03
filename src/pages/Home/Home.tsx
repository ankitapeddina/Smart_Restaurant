import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Hero from '../../components/Hero/Hero'
import SectionHeader from '../../components/Common/SectionHeader'
import MenuCard from '../../components/MenuCard/MenuCard'
import { getFeaturedMenu, getPopularDishes } from '../../services/menuService'
import type { MenuItem } from '../../types'
import { Link } from 'react-router-dom'

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
            <motion.div key={item.id} whileHover={{ y: -6 }}>
              <MenuCard {...item} />
            </motion.div>
          ))}
        </div>
      </section>

      <section id="about-preview" className="rounded-[32px] border border-slate-500/10 bg-slate-950/70 p-10 shadow-xl shadow-slate-950/20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_0.8fr] lg:items-center">
          <div>
            <SectionHeader title="About our kitchen" subtitle="Crafted with care" />
            <p className="max-w-2xl text-slate-300">
              SmartTable blends modern presentation with warm hospitality. Every menu item is created from high-quality ingredients and a passion for thoughtful service.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/about" className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/15">
                Learn more
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-[24px] bg-slate-900/80 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">Our Promise</p>
              <p className="mt-3 text-slate-300">Fresh ingredients, unique flavors, and exceptional presentation tailored for every guest.</p>
            </div>
            <div className="rounded-[24px] bg-slate-900/80 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">Atmosphere</p>
              <p className="mt-3 text-slate-300">A refined dining space with contemporary lighting, sophisticated textures, and calm service.</p>
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
        <div className="rounded-[28px] bg-slate-950/80 p-8 shadow-xl shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">Customer review</p>
          <p className="mt-4 text-xl font-semibold text-white">"Best dining experience with unique dishes and attentive service."</p>
          <p className="mt-4 text-slate-300">- Maya S.</p>
        </div>
        <div className="rounded-[28px] bg-slate-950/80 p-8 shadow-xl shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">Customer review</p>
          <p className="mt-4 text-xl font-semibold text-white">"A perfect blend of modern design and culinary excellence."</p>
          <p className="mt-4 text-slate-300">- Aaron K.</p>
        </div>
        <div className="rounded-[28px] bg-slate-950/80 p-8 shadow-xl shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">Customer review</p>
          <p className="mt-4 text-xl font-semibold text-white">"The atmosphere makes every meal feel special."</p>
          <p className="mt-4 text-slate-300">- Nina R.</p>
        </div>
      </section>

      <section id="gallery-preview" className="rounded-[32px] border border-slate-500/10 bg-slate-950/70 p-6 shadow-xl shadow-slate-950/20">
        <SectionHeader title="Gallery preview" subtitle="Atmosphere & plating" />
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="aspect-[4/3] rounded-[28px] bg-gradient-to-br from-emerald-500/15 to-slate-900/40" />
          <div className="aspect-[4/3] rounded-[28px] bg-gradient-to-br from-cyan-500/15 to-slate-900/40" />
          <div className="aspect-[4/3] rounded-[28px] bg-gradient-to-br from-violet-500/15 to-slate-900/40" />
        </div>
      </section>

      <section id="reservation-cta" className="rounded-[32px] bg-gradient-to-r from-slate-900/90 to-slate-800/90 p-10 shadow-2xl shadow-slate-950/30">
        <div className="flex flex-col gap-6 rounded-[32px] border border-emerald-400/10 bg-slate-950/70 p-10 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">Reserve a table</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Enjoy an elevated dining experience tonight.</h2>
          </div>
          <Link to="/reservation" className="inline-flex rounded-full bg-emerald-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
            Book now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
