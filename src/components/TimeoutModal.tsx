interface TimeoutModalProps {
  isOpen: boolean;
  onContinue: () => void;
  onCancel: () => void;
}

export default function TimeoutModal({ isOpen, onContinue, onCancel }: TimeoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg text-blue-500 font-bold mb-4">İşleme devam etmek istiyor musunuz?</h3>
        <div className="flex gap-4">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={onContinue}
          >
            Evet
          </button>
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onCancel}
          >
            Hayır
          </button>
        </div>
      </div>
    </div>
  );
} 