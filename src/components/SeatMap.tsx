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
      <div className="grid grid-cols-6 gap-2">
        {seats.map((seat) => (
          <div key={seat.id}>
            <button
              data-tooltip-id={`seat-${seat.id}`}
              className={`p-2 rounded w-full ${
                seat.isOccupied 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : selectedSeats.includes(seat.id)
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-100 hover:bg-blue-200'
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
  );
} 