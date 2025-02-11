export const initializeSeatsData = (setSeats: Function) => {
  const initialSeats = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    isOccupied: index < 10,
    occupiedBy: index < 10 ? '' : undefined
  }));
  setSeats(initialSeats);
  localStorage.setItem('occupiedSeats', JSON.stringify(initialSeats));
};

export const fetchOccupiedSeatsData = async (setOccupiedSeatsData: Function) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    
    const seatData = users.slice(0, 10).reduce((acc, user, index) => ({
      ...acc,
      [index + 1]: user.name
    }), {});
    
    setOccupiedSeatsData(seatData);
  } catch (error) {
    console.error('Koltuk verileri yüklenirken hata oluştu:', error);
  }
}; 