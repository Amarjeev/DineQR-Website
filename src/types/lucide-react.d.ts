declare module 'lucide-react' {
  import { ComponentType, SVGProps } from 'react'

  type LucideProps = SVGProps<SVGSVGElement> & {
    size?: number | string
    color?: string
    strokeWidth?: number
  }

  // 🍴 Food / Restaurant Icons
  export const ChefHat: ComponentType<LucideProps>
  export const Utensils: ComponentType<LucideProps>
  export const Coffee: ComponentType<LucideProps>
  export const Package: ComponentType<LucideProps>
  export const PackageIcon: ComponentType<LucideProps>
  export const ShoppingBag: ComponentType<LucideProps>
  export const ShoppingCart: ComponentType<LucideProps>
  export const Truck: ComponentType<LucideProps>

  // ⭐ UI & General Icons
  export const Star: ComponentType<LucideProps>
  export const Stars: ComponentType<LucideProps>
  export const Clock: ComponentType<LucideProps>
  export const Calendar: ComponentType<LucideProps>
  export const Download: ComponentType<LucideProps>
  export const Printer: ComponentType<LucideProps>
  export const Menu: ComponentType<LucideProps>
  export const History: ComponentType<LucideProps>
  export const Info: ComponentType<LucideProps>
  export const HelpCircle: ComponentType<LucideProps>
  export const List: ComponentType<LucideProps>
  export const LayoutList: ComponentType<LucideProps>
  export const ArchiveRestore: ComponentType<LucideProps>
  export const Search: ComponentType<LucideProps>
  export const Eye: ComponentType<LucideProps>
  export const EyeOff: ComponentType<LucideProps>
  export const Target: ComponentType<LucideProps>
  export const LogOut: ComponentType<LucideProps>
  export const Globe: ComponentType<LucideProps>
  export const Lock: ComponentType<LucideProps>

  // 🧠 Creative / AI / Power Icons
  export const Sparkles: ComponentType<LucideProps>
  export const Brain: ComponentType<LucideProps>
  export const Rocket: ComponentType<LucideProps>
  export const Zap: ComponentType<LucideProps>
  export const FlaskConical: ComponentType<LucideProps>

  // 👤 User & Access
  export const User: ComponentType<LucideProps>
  export const Users: ComponentType<LucideProps>
  export const KeyRound: ComponentType<LucideProps>
  export const Hash: ComponentType<LucideProps>
  export const Settings: ComponentType<LucideProps>
  export const Phone: ComponentType<LucideProps>
  export const Mail: ComponentType<LucideProps>
  export const Smartphone: ComponentType<LucideProps>
  export const CreditCard: ComponentType<LucideProps>

  // ⚙️ Actions
  export const Plus: ComponentType<LucideProps>
  export const Minus: ComponentType<LucideProps>
  export const ArrowLeft: ComponentType<LucideProps>
  export const ChevronLeft: ComponentType<LucideProps>
  export const ChevronRight: ComponentType<LucideProps>
  export const RotateCcw: ComponentType<LucideProps>
  export const RefreshCw: ComponentType<LucideProps>
  export const Edit3: ComponentType<LucideProps>
  export const Trash2: ComponentType<LucideProps>
  export const X: ComponentType<LucideProps>
  export const XCircle: ComponentType<LucideProps>
  export const Loader: ComponentType<LucideProps>
  export const Loader2: ComponentType<LucideProps> // 🔥 added for loading spinner
  export const ChevronDown: ComponentType<LucideProps>
  export const ChevronUp: ComponentType<LucideProps>
  export const QrCode: ComponentType<LucideProps>

  // 📍 Location
  export const MapPin: ComponentType<LucideProps>

  // 🔔 Notifications / Status
  export const Bell: ComponentType<LucideProps>
  export const AlertCircle: ComponentType<LucideProps>
  export const AlertTriangle: ComponentType<LucideProps>
  export const CheckCircle: ComponentType<LucideProps>
  export const CheckCheck: ComponentType<LucideProps>
  export const Receipt: ComponentType<LucideProps>

  // 💬 Communication
  export const MessageSquare: ComponentType<LucideProps>
}
