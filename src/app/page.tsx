'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SeatMap from '@/components/SeatMap';
import PassengerList from '@/components/PassengerList';
import TimeoutModal from '@/components/TimeoutModal';
import { initializeSeatsData, fetchOccupiedSeatsData } from '@/utils/seatUtils';
import { handleSeatSelection, handleFormSubmission, handleTimeout } from '@/utils/reservationHandlers';

interface Seat {
  id: number;
  isOccupied: boolean;
  occupiedBy?: string;
}

interface Passenger {
  name: string;
  surname: string;
  phone: string;
  email: string;
  gender: string;
  birthDate: string;
}

export default function Home() {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [showTimeoutModal, setShowTimeoutModal] = useState<boolean>(false);
  const [occupiedSeatsData, setOccupiedSeatsData] = useState<{[key: number]: string}>({});

  const loadSavedState = () => {
    const saved = localStorage.getItem('flightReservation');
    if (saved) {
      const state = JSON.parse(saved);
      setSelectedSeats(state.selectedSeats);
      setPassengers(state.passengers);
      setTotalPrice(state.totalPrice);
    }
  };

  useEffect(() => {
    const savedSeats = localStorage.getItem('occupiedSeats');
    if (savedSeats) {
      setSeats(JSON.parse(savedSeats));
    } else {
      initializeSeatsData(setSeats);
    }
    loadSavedState();
    fetchOccupiedSeatsData(setOccupiedSeatsData);
  }, []);

  const handlePassengerSubmit = (index: number, data: Passenger) => {
    setPassengers(prev => {
      const newPassengers = [...prev];
      newPassengers[index] = {
        name: data.name,
        surname: data.surname,
        phone: data.phone,
        email: data.email,
        gender: data.gender,
        birthDate: data.birthDate
      };
      return newPassengers;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <SeatMap
          seats={seats}
          selectedSeats={selectedSeats}
          occupiedSeatsData={occupiedSeatsData}
          onSeatSelect={(seatId) => handleSeatSelection(
            seatId,
            seats,
            selectedSeats,
            setSelectedSeats,
            setTotalPrice,
            timer,
            setTimer,
            setShowTimeoutModal
          )}
        />
        
        <PassengerList
          selectedSeats={selectedSeats}
          onPassengerSubmit={handlePassengerSubmit}
          onFormSubmit={() => handleFormSubmission(
            passengers,
            selectedSeats,
            seats,
            setSeats,
            setSelectedSeats,
            setPassengers,
            setTotalPrice,
            occupiedSeatsData,
            setOccupiedSeatsData
          )}
          totalPrice={totalPrice}
        />
      </div>

      <TimeoutModal
        isOpen={showTimeoutModal}
        onContinue={() => setShowTimeoutModal(false)}
        onCancel={() => handleTimeout(
          setSelectedSeats,
          setPassengers,
          setTotalPrice,
          setShowTimeoutModal,
          setSeats
        )}
      />
    </div>
  );
}
