import SectionHeader from '../../components/Common/SectionHeader'
import image1 from '../../assets/image1.jpg'
import image2 from '../../assets/image3.jpg'
import image3 from '../../assets/image2.jpg'
import image4 from '../../assets/image4.jpg'
import image5 from '../../assets/image5.avif'
import image6 from '../../assets/image6.avif'

const galleryItems = [
  {
    title: 'Luxury Dining Hall',
    image: image1,
    alt: 'Elegant fine-dining restaurant hall with warm lighting and refined decor',
  },
  {
    title: 'Private Dining',
    image: image3,
    alt: 'Stylish restaurant logo and intimate dining atmosphere',
  },
  {
    title: 'Restaurant Interior',
    image: image2,
    alt: 'Sophisticated restaurant interior featuring luxurious atmosphere',
  },
  {
    title: 'Chef\'s Kitchen',
    image: image4,
    alt: 'Chef preparation area with elegant restaurant presentation',
  },
  {
    title: 'Outdoor Seating',
    image: image5,
    alt: 'Elegant outdoor seating area designed for fine dining',
  },
  {
    title: 'Fine Dining Experience',
    image: image6,
    alt: 'Premium dining experience with refined ambiance and detail',
  },
]

const Gallery = () => (
  <div className="space-y-12">
    <SectionHeader title="Gallery" subtitle="Restaurant ambiance" />
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {galleryItems.map((item) => (
        <div
          key={item.title}
          className="group relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,_#FFFFFF,_#F1E2D1)] shadow-[0_20px_45px_-20px_rgba(84,26,26,0.24)] transition duration-300 hover:scale-[1.01] hover:shadow-[0_24px_55px_-20px_rgba(129,11,56,0.35)] cursor-pointer"
        >
          <img
            src={item.image}
            alt={item.alt}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[rgba(129,11,56,0.45)] opacity-0 transition duration-300 group-hover:opacity-100" />
          <div className="absolute inset-0 flex items-end p-5 opacity-0 transition duration-300 group-hover:opacity-100">
            <span className="text-lg font-semibold text-white drop-shadow-sm">{item.title}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default Gallery
