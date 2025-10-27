import { Info } from 'lucide-react'
import { use_Table_Form } from '../logic/use_Table_Form'
import ServerError_UI from '../../../../../../ServerErrorUI/ServerError_UI'

const Mgr_Table_Form_UI: React.FC = () => {
  const {
    createdTableName,
    setCreatedTableName,
    handleSave,
    error,
    status,
    isUploading,
  } = use_Table_Form()

  if (status === 'error') {
    return <ServerError_UI />
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto my-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        {/* Heading */}
        <h2 className="text-xl font-bold text-gray-900 mb-5 text-center">
          🍽️ Add a New Table
        </h2>

        {/* Input + Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={createdTableName}
            onChange={(e) => setCreatedTableName(e.target.value)}
            placeholder="Enter table Name"
            title="Only letters and digits are allowed"
            maxLength={6}
            className={`w-full border rounded-xl px-4 py-2.5 text-gray-700 focus:ring-2 
      outline-none transition
      ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
          />
          <button
            onClick={() => handleSave('upload')}
            className={`w-full sm:w-auto px-6 py-2.5 text-white font-medium rounded-xl 
    transition-transform transform duration-200 ease-in-out
    ${isUploading ? 'bg-blue-500 cursor-not-allowed animate-pulse' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}
  `}
            disabled={isUploading || !createdTableName}
          >
            {isUploading ? 'Uploading...' : 'Save'}
          </button>
        </div>

        {error && <h1 className="ml-2 mt-2 text-red-600 text-sm">{error}</h1>}

        {/* Message Section */}
        <div className="mt-5">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 text-blue-800 text-sm border border-blue-200">
            <Info className="w-5 h-5 mt-0.5" />
            <span>Maximum 6 characters allowed. Only letters and digits.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mgr_Table_Form_UI
