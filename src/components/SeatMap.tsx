import { Tooltip } from 'react-tooltip';

interface SeatMapProps {
  seats: Array<{
    id: number;
    isOccupied: boolean;
    occupiedBy?: string;
  }>;
  selectedSeats: number[];
  occupiedSeatsData: {[key: number]: string};
  onSeatSelect: (seatId: number) => void;
}

export default function SeatMap({ seats, selectedSeats, occupiedSeatsData, onSeatSelect }: SeatMapProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl text-blue-500 font-bold mb-6">Uçak Yerleşim Planı</h2>
      <div className="relative">
        <div className="relative w-full max-w-2xl mx-auto">
          <img 
            src="/plane-layout.svg" 
            alt="Uçak Yerleşim Planı"
            className="w-full h-auto"
          />
          
          {/* Sol Koltuklar */}
          <div className="absolute top-[8%] left-[25%] w-[10%]">
            <div className="grid grid-cols-2 gap-x-2 gap-y-4">
              {seats.slice(0, 12).map((seat) => (
                <div key={seat.id} className="relative flex items-center justify-center">
                  <button
                    data-tooltip-id={`seat-${seat.id}`}
                    className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-medium
                      ${seat.isOccupied 
                        ? 'bg-gray-500 cursor-not-allowed text-white' 
                        : selectedSeats.includes(seat.id)
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
                      }`}
                    onClick={() => onSeatSelect(seat.id)}
                    disabled={seat.isOccupied}
                  >
                    {seat.id}
                  </button>
                  {seat.isOccupied && (
                    <Tooltip id={`seat-${seat.id}`}>
                      {occupiedSeatsData[seat.id]}
                    </Tooltip>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sağ Koltuklar */}
          <div className="absolute top-[8%] right-[25%] w-[10%]">
            <div className="grid grid-cols-2 gap-x-2 gap-y-4">
              {seats.slice(12, 24).map((seat) => (
                <div key={seat.id} className="relative flex items-center justify-center">
                  <button
                    data-tooltip-id={`seat-${seat.id}`}
                    className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-medium
                      ${seat.isOccupied 
                        ? 'bg-gray-500 cursor-not-allowed text-white' 
                        : selectedSeats.includes(seat.id)
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
                      }`}
                    onClick={() => onSeatSelect(seat.id)}
                    disabled={seat.isOccupied}
                  >
                    {seat.id}
                  </button>
                  {seat.isOccupied && (
                    <Tooltip id={`seat-${seat.id}`}>
                      {occupiedSeatsData[seat.id]}
                    </Tooltip>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Arka Koltuklar */}
          <div className="absolute bottom-[10%] left-[45%] w-[10%]">
            <div className="grid grid-cols-2 gap-x-2 gap-y-4">
              {seats.slice(24).map((seat) => (
                <div key={seat.id} className="relative flex items-center justify-center">
                  <button
                    data-tooltip-id={`seat-${seat.id}`}
                    className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-medium
                      ${seat.isOccupied 
                        ? 'bg-gray-500 cursor-not-allowed text-white' 
                        : selectedSeats.includes(seat.id)
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
                      }`}
                    onClick={() => onSeatSelect(seat.id)}
                    disabled={seat.isOccupied}
                  >
                    {seat.id}
                  </button>
                  {seat.isOccupied && (
                    <Tooltip id={`seat-${seat.id}`}>
                      {occupiedSeatsData[seat.id]}
                    </Tooltip>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lejant */}
        <div className="mt-6 flex justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-500 rounded"></div>
            <span style={{ color: 'black' }}>Dolu</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span style={{ color: 'black' }}>Seçili</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 rounded"></div>
            <span style={{ color: 'black' }}>Boş</span>
          </div>
        </div>
      </div>
    </div>
  );
} 