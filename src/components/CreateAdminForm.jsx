// const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     city_id: '',
//     role_id: '2', // Admin role
//     name_ar: '',
//     name_en: '',
//     phone_number: '',
//     email: '',
//     gender: '',
//     birth_date: '',
//     clinic_id: '',
//     specialization_id: '',
//     description: ''
//   });

//   const [cities, setCities] = useState([]);
//   const [clinics, setClinics] = useState([]);
//   const [specializations, setSpecializations] = useState([]);

//   useEffect(() => {
//     // Fetch cities, clinics, and specializations
//     const fetchData = async () => {
//       try {
//         const [citiesRes, clinicsRes, specializationsRes] = await Promise.all([
//           fetch('https://medical-clinic.serv00.net/api/city'),
//           fetch('https://medical-clinic.serv00.net/api/clinic'),
//           fetch('https://medical-clinic.serv00.net/api/specialization')
//         ]);
//         const citiesData = await citiesRes.json();
//         const clinicsData = await clinicsRes.json();
//         const specializationsData = await specializationsRes.json();
        
//         setCities(citiesData.data);
//         setClinics(clinicsData.data);
//         setSpecializations(specializationsData.data);
//       } catch (error) {
//         message.error('Failed to fetch necessary data');
//       }
//     };
//     fetchData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({ ...prevData, [name]: value }));
//   };

//   const handleDateChange = (date, dateString) => {
//     setFormData(prevData => ({ ...prevData, birth_date: dateString }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('https://medical-clinic.serv00.net/api/actor', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(formData),
//       });
//       if (response.ok) {
//         message.success('Admin created successfully');
//         // Reset form or redirect
//       } else {
//         throw new Error('Failed to create admin');
//       }
//     } catch (error) {
//       message.error(error.message);
//     }
//   };
