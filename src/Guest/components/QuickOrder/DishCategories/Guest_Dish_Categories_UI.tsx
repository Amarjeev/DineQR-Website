import { useNavigate } from 'react-router-dom'

// Define type for dish
type Dish = {
  name: string
  img: string
  type: 'Breakfast' | 'Main' | 'Side' | 'Dessert' | 'Drink'
}

// Dishes array with type
const dishes: Dish[] = [
  { name: 'Breads', img: '/Dishes/Breads.jpg', type: 'Main' },
  { name: 'Breakfast', img: '/Dishes/Breakfast.jpg', type: 'Breakfast' },
  { name: 'Burgers', img: '/Dishes/Burgers.jpg', type: 'Main' },
  { name: 'Biryani', img: '/Dishes/Biriyani.jpg', type: 'Main' },
  { name: 'Coffee', img: '/Dishes/Coffee.jpg', type: 'Main' },
  { name: 'Cold Drinks', img: '/Dishes/ColdDrinks.png', type: 'Main' },
  { name: 'Curries', img: '/Dishes/curry.jpg', type: 'Main' },
  { name: 'Desserts', img: '/Dishes/Desserts.jpg', type: 'Dessert' },
  { name: 'Fried Rice', img: '/Dishes/Fried Rice.jpg', type: 'Main' },
  { name: 'Grilled', img: '/Dishes/Grilled.png', type: 'Side' },
  { name: 'Ice Cream', img: '/Dishes/Ice Cream.png', type: 'Dessert' },
  { name: 'Juice', img: '/Dishes/Juice.jpg', type: 'Dessert' },
  { name: 'Mandi', img: '/Dishes/Mandi.jpg', type: 'Main' },
  { name: 'Meals', img: '/Dishes/Meal.jpg', type: 'Main' },
  { name: 'Naan', img: '/Dishes/Naan.jpg', type: 'Main' },
  { name: 'Noodles', img: '/Dishes/Noodles.jpg', type: 'Main' },
  { name: 'Paratha', img: '/Dishes/Paratha.jpg', type: 'Main' },
  { name: 'Pasta', img: '/Dishes/Pasta.jpg', type: 'Main' },
  { name: 'Pizza', img: '/Dishes/Pizza.jpg', type: 'Main' },
  { name: 'Rice', img: '/Dishes/rice.jpg', type: 'Main' },
  { name: 'Roti', img: '/Dishes/roti.jpg', type: 'Main' },
  { name: 'Salads', img: '/Dishes/Salads.png', type: 'Side' },
  { name: 'Sandwiches', img: '/Dishes/Sandwiches.jpg', type: 'Side' },
  { name: 'Seafood', img: '/Dishes/Seafood.jpg', type: 'Main' },
  { name: 'Shakes', img: '/Dishes/Shakes.jpg', type: 'Main' },
  { name: 'Snacks', img: '/Dishes/snaks.jpg', type: 'Side' },
  { name: 'Soups', img: '/Dishes/Soups.jpg', type: 'Side' },
  { name: 'Sweets', img: '/Dishes/Sweets.png', type: 'Dessert' },
  { name: 'Tandoori', img: '/Dishes/Tandoori.jpg', type: 'Side' },
  { name: 'Tea', img: '/Dishes/tea.png', type: 'Drink' },
  { name: 'Wraps', img: '/Dishes/Wraps.jpg', type: 'Drink' },
]

const Guest_Dish_Categories_UI: React.FC = () => {
  const navigate = useNavigate()
  const handleClick = (dishName: string) => {
    navigate(`/guest-dashboard/food/category/${dishName}`)
  }
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Cuisines and Dishes</h1>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
        {dishes.map((dish) => (
          <div
            key={dish.name}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
          >
            {/* Circle container */}
            <div
              className="w-20 h-20 rounded-full overflow-hidden shadow-md"
              onClick={() => handleClick(dish.name)}
            >
              <img
                src={dish.img}
                alt={dish.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Label */}
            <p className="text-sm mt-2 text-center">{dish.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Guest_Dish_Categories_UI
