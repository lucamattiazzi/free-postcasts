/* eslint-disable react/prop-types */
import { X } from 'lucide-react';

export function Modal(props) {
  const { onClose } = props

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full m-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="pr-6">
          <h2 className="text-xl font-bold mb-4">Che roba è?</h2>
          <div className="space-y-4">
            <p>
              I podcast de Il Post gratuiti finchè lasciano i loro server come colabrodi.
            </p>
            <p>
              Il frontend fatto con React (un&apos;ora scarsa usando massicciamente Claude, visto che non avevo molta voglia), la ricerca delle vulnerabilità fatta da <a href="https://github.com/lucamattiazzi/free-postcasts" target="_blank" style={{color: "blue"}}>me</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
