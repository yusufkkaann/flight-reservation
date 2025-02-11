import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface PassengerFormProps {
  index: number;
  onSubmit: (data: Passenger) => void;
}

interface Passenger {
  name: string;
  surname: string;
  phone: string;
  email: string;
  gender: string;
  birthDate: string;
}

export default function PassengerForm({ index, onSubmit }: PassengerFormProps) {
  const [formData, setFormData] = useState<Passenger>({
    name: '',
    surname: '',
    phone: '',
    email: '',
    gender: '',
    birthDate: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value = e.target.value;
    const fieldName = e.target.name;

    // Telefon numarası için özel işlem
    if (fieldName === 'phone') {
      // Tüm boşlukları kaldır
      value = value.replace(/\s/g, '');
      
      // Sadece rakam kontrolü
      if (!/^\d*$/.test(value)) {
        toast.warning('Telefon numarası sadece rakam içermelidir');
        return;
      }
    }

    // Email kontrolü
    if (fieldName === 'email' && value.trim() !== '') {
      if (!value.includes('@')) {
        toast.warning('Geçerli bir email adresi giriniz');
      }
    }

    const newFormData = {
      ...formData,
      [fieldName]: value
    };
    
    setFormData(newFormData);
    
    // Tüm alanların dolu olduğunu kontrol et
    const isComplete = Object.values(newFormData).every(val => val !== '');
    if (isComplete) {
      onSubmit(newFormData);
    }
  };

  return (
    <div className="mb-6 p-4 border rounded bg-white shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{index}. Yolcu</h3>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="İsim"
          className="border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="surname"
          value={formData.surname}
          placeholder="Soyisim"
          className="border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          required
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          placeholder="Telefon"
          className="border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="E-Posta"
          className="border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          required
          onChange={handleChange}
        />
        <select
          name="gender"
          value={formData.gender}
          className="border p-2 rounded bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          required
          onChange={handleChange}
        >
          <option value="">Cinsiyet</option>
          <option value="male">Erkek</option>
          <option value="female">Kadın</option>
        </select>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          className="border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          required
          onChange={handleChange}
        />
      </div>
    </div>
  );
} 
