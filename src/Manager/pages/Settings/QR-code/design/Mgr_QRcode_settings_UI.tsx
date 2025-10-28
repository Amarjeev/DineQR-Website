import React, { useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { showError } from '../../../../utils/toast'

const Mgr_QRcode_settings_UI: React.FC = () => {
  const qrRef = useRef<HTMLCanvasElement>(null)

  let hotelKey = sessionStorage.getItem('manager-userId') || ''
  if (!hotelKey) {
    showError('Something went wrong, please try again')
  }

  const websiteURL: string = `https://dineqr.cfd/guest/login/${hotelKey}`

  const handleDownload = () => {
    const canvas = qrRef.current
    if (!canvas) {
      showError('QR Code not available for download')
      return
    }

    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')

    const downloadLink = document.createElement('a')
    downloadLink.href = pngUrl
    downloadLink.download = 'QRCode.png'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Website QR Code</h2>

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <QRCodeCanvas
          ref={qrRef}
          value={websiteURL}
          size={200}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
          includeMargin={true}
        />
      </div>

      <p className="mt-4 text-gray-700 text-center">
        Scan this QR to visit:
        <br />
        <span className="font-medium text-blue-600">{websiteURL}</span>
      </p>

      <button
        onClick={handleDownload}
        className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all"
      >
        Download QR Code
      </button>
    </div>
  )
}

export default Mgr_QRcode_settings_UI
