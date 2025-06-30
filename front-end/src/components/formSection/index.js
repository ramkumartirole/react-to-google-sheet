import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setModalValue } from '../../redux/slice/modalSlice';
import { UserCarDataPost } from '../../api/userCarData/userCarDataPost';
import SubmitButton from '../button/submitButton';
import InputText from '../inputFields/inputText';
import { handleChange } from '../../services/handleChange';

export default function FormSection() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('farariCar');
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting,setIsSubmitting]=useState(false)


  const SendValy = (val) => {
    setActiveTab(val);
    dispatch(setModalValue(val));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true)
      const res = await UserCarDataPost({userData:formData,carData:activeTab})

    } catch (error) {
console.log(error)
    }finally{
      setIsSubmitting(false)
    }

  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6 justify-center">
        <SubmitButton
          onClick={() => SendValy('nissanCar')}
          className={`px-6 py-2 rounded-lg text-white font-semibold transition-all ${
            activeTab === 'nissanCar' ? 'bg-blue-600' : 'bg-gray-400 hover:bg-blue-500'
          }`}
        >
          Nissan
        </SubmitButton>
        <SubmitButton
          onClick={() => SendValy('farariCar')}
          className={`px-6 py-2 rounded-lg text-white font-semibold transition-all ${
            activeTab === 'farariCar' ? 'bg-blue-600' : 'bg-gray-400 hover:bg-blue-500'
          }`}
        >
          Ferrari
        </SubmitButton>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
        
          <InputText type="text" placeholder="Name" name="name" value={formData?.name} onChange={(e) => handleChange("name", e.target.value, setFormData)} />
                <InputText type="email" placeholder="Email" name="email" value={formData?.email} onChange={(e) => handleChange("email", e.target.value, setFormData)} />
        </div>


        <SubmitButton type="submit" className="w-full mt-4">
                       {isSubmitting ? "Saving..." : "Submit"}
                     </SubmitButton>
      </form>
    </div>
  );
}
