import SectionHeader from '../../components/Common/SectionHeader'
import MenuCard from '../../components/MenuCard/MenuCard'
import { featuredMenu, popularDishes } from '../../constants/menu'

const Menu = () => (
  <div className="space-y-16">
    <section>
      <SectionHeader title="Full menu" subtitle="Discover every dish" />
      <div className="grid gap-6 md:grid-cols-3">
        {featuredMenu.map((item) => (
          <MenuCard key={item.id} {...item} />
        ))}
      </div>
    </section>

    <section>
      <SectionHeader title="More favorites" subtitle="Popular choices" />
      <div className="grid gap-6 md:grid-cols-3">
        {popularDishes.map((item) => (
          <MenuCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  </div>
)

export default Menu
