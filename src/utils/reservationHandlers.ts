import { toast } from 'react-toastify';

export const handleSeatSelection = (
  seatId: number,
  seats: any[],
  selectedSeats: number[],
  setSelectedSeats: Function,
  setTotalPrice: Function,
  timer: any,
  setTimer: Function,
  setShowTimeoutModal: Function
) => {
  if (seats.find(seat => seat.id === seatId)?.isOccupied) {
    toast.error('Bu koltuk dolu!');
    return;
  }

  if (!selectedSeats.includes(seatId) && selectedSeats.length >= 3) {
    toast.error('En fazla 3 koltuk seçebilirsiniz!');
    return;
  }

  if (selectedSeats.includes(seatId)) {
    setSelectedSeats(prev => prev.filter(id => id !== seatId));
    setTotalPrice(prev => prev - 1000);
  } else {
    setSelectedSeats(prev => [...prev, seatId]);
    setTotalPrice(prev => prev + 1000);
  }

  if (timer) clearTimeout(timer);
  const newTimer = setTimeout(() => {
    setShowTimeoutModal(true);
  }, 30000);
  setTimer(newTimer);
};

export const handleFormSubmission = (
  passengers: any[],
  selectedSeats: number[],
  seats: any[],
  setSeats: Function,
  setSelectedSeats: Function,
  setPassengers: Function,
  setTotalPrice: Function,
  occupiedSeatsData: any,
  setOccupiedSeatsData: Function
) => {
  if (!passengers || passengers.length < selectedSeats.length) {
    toast.error('Lütfen tüm yolcu bilgilerini eksiksiz doldurunuz!');
    return;
  }

  const validPassengers = passengers.filter(passenger => passenger !== null && passenger !== undefined);
  if (validPassengers.length !== selectedSeats.length) {
    toast.error('Lütfen tüm yolcu bilgilerini eksiksiz doldurunuz!');
    return;
  }

  const allFieldsFilled = validPassengers.every(passenger => {
    return passenger && 
           passenger.name && 
           passenger.surname && 
           passenger.phone && 
           passenger.email && 
           passenger.gender && 
           passenger.birthDate;
  });

  if (!allFieldsFilled) {
    toast.error('Lütfen tüm yolcu bilgilerini eksiksiz doldurunuz!');
    return;
  }

  const updatedSeats = seats.map(seat => {
    if (selectedSeats.includes(seat.id)) {
      const passengerIndex = selectedSeats.indexOf(seat.id);
      return {
        ...seat,
        isOccupied: true,
        occupiedBy: validPassengers[passengerIndex]?.name || ''
      };
    }
    return seat;
  });

  setSeats(updatedSeats);
  localStorage.setItem('occupiedSeats', JSON.stringify(updatedSeats));

  const newOccupiedSeatsData = { ...occupiedSeatsData };
  selectedSeats.forEach((seatId, index) => {
    newOccupiedSeatsData[seatId] = validPassengers[index]?.name || '';
  });
  setOccupiedSeatsData(newOccupiedSeatsData);

  toast.success('Rezervasyon işleminiz başarıyla tamamlandı!');
  
  setSelectedSeats([]);
  setPassengers([]);
  setTotalPrice(0);
  
  for (let i = 0; i < 3; i++) {
    localStorage.removeItem(`passenger-${i + 1}`);
  }
  localStorage.removeItem('flightReservation');
};

export const handleTimeout = (
  setSelectedSeats: Function,
  setPassengers: Function,
  setTotalPrice: Function,
  setShowTimeoutModal: Function,
  setSeats: Function
) => {
  localStorage.clear();
  setSelectedSeats([]);
  setPassengers([]);
  setTotalPrice(0);
  setShowTimeoutModal(false);
  window.location.reload();
};

// Diğer yardımcı fonksiyonlar da benzer şekilde bu dosyaya taşınabilir 