import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const Guest_FoodList_Navbar: React.FC = () => {
  const navigate = useNavigate()

  return (
    <nav className="bg-gray-50 px-4 py-3 flex items-center mt-13">
      {/* Back button */}
      <div
        className="flex items-center gap-2 cursor-pointer text-blue-600"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-semibold">Back</span>
      </div>
    </nav>
  )
}

export default Guest_FoodList_Navbar
