import PassengerForm from './PassengerForm';

interface PassengerListProps {
  selectedSeats: number[];
  onPassengerSubmit: (index: number, data: any) => void;
  onFormSubmit: () => void;
  totalPrice: number;
}

export default function PassengerList({ 
  selectedSeats, 
  onPassengerSubmit, 
  onFormSubmit, 
  totalPrice 
}: PassengerListProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl text-blue-500 font-bold mb-6">Yolcu Bilgileri</h2>
      {selectedSeats.map((_, index) => (
        <PassengerForm
          key={index}
          index={index + 1}
          onSubmit={(data) => onPassengerSubmit(index, data)}
        />
      ))}
      {selectedSeats.length > 0 && (
        <button
          onClick={onFormSubmit}
          className="w-full bg-blue-500 text-white py-3 rounded-lg mt-4 hover:bg-blue-600"
        >
          İşlemleri Tamamla
        </button>
      )}
      <div className="mt-4">
        <p className="text-xl text-blue-500 font-semibold">Toplam Ücret: {totalPrice} TL</p>
      </div>
    </div>
  );
} 