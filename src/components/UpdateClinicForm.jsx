// import React, { useState, useEffect } from 'react';
// import { Input, Button, Form, message } from '@/components/ui/form';

// const UpdateClinicForm = () => {
//   const [formData, setFormData] = useState({
//     name_ar: '',
//     name_en: '',
//     contactInfos: {
//       1: { value: '' },  // Assuming 1 is the ID for phone number
//       4: { value: '' },  // Assuming 4 is the ID for social media
//     }
//   });

//   useEffect(() => {
//     // Fetch current clinic data and set it to formData
//     // This is a placeholder and should be replaced with actual API call
//     const fetchClinicData = async () => {
//       try {
//         const response = await fetch('https://medical-clinic.serv00.net/api/clinic/1');
//         const data = await response.json();
//         setFormData({
//           name_ar: data.name_ar,
//           name_en: data.name_en,
//           contactInfos: {
//             1: { value: data.contactInfos.find(info => info.type_id === 1)?.value || '' },
//             4: { value: data.contactInfos.find(info => info.type_id === 4)?.value || '' },
//           }
//         });
//       } catch (error) {
//         message.error('Failed to fetch clinic data');
//       }
//     };
//     fetchClinicData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith('contactInfos')) {
//       const [_, id] = name.split('.');
//       setFormData(prevData => ({
//         ...prevData,
//         contactInfos: {
//           ...prevData.contactInfos,
//           [id]: { value }
//         }
//       }));
//     } else {
//       setFormData(prevData => ({ ...prevData, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('https://medical-clinic.serv00.net/api/clinic/1', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(formData),
//       });
//       if (response.ok) {
//         message.success('Clinic information updated successfully');
//       } else {
//         throw new Error('Failed to update clinic information');
//       }
//     } catch (error) {
//       message.error(error.message);
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit} className="space-y-4">
//       <Input
//         name="name_ar"
//         value={formData.name_ar}
//         onChange={handleInputChange}
//         placeholder="Arabic Name"
//         label="Arabic Name"
//       />
//       <Input
//         name="name_en"
//         value={formData.name_en}
//         onChange={handleInputChange}
//         placeholder="English Name"
//         label="English Name"
//       />
//       <Input
//         name="contactInfos.1"
//         value={formData.contactInfos[1].value}
//         onChange={handleInputChange}
//         placeholder="Phone Number"
//         label="Phone Number"
//       />
//       <Input
//         name="contactInfos.4"
//         value={formData.contactInfos[4].value}
//         onChange={handleInputChange}
//         placeholder="Social Media"
//         label="Social Media"
//       />
//       <Button type="submit">Update Clinic Information</Button>
//     </Form>
//   );
// };

// // export default UpdateClinicForm;






// // العيادة (Clinic). وفقًا للـ API المتاحة في الملف، يمكننا التركيز على تحديث معلومات العيادة. لنقم بإنشاء صفحة لتحديث معلومات العيادة باستخدام الـ endpoint الموجود:
// // Update Clinic FormClick to open component
// // هذا المكون React يقوم بإنشاء نموذج لتحديث معلومات العيادة. إليك شرح للوظائف الرئيسية:

// // يستخدم hooks مثل useState و useEffect لإدارة حالة النموذج وجلب البيانات الحالية للعيادة.
// // يتم استدعاء API لجلب معلومات العيادة الحالية عند تحميل المكون.
// // يوفر وظيفة handleInputChange للتعامل مع تغييرات الإدخال في النموذج.
// // يقوم بإرسال البيانات المحدثة إلى الخادم عند تقديم النموذج باستخدام وظيفة handleSubmit.
// // يستخدم مكونات UI مثل Input و Button و Form (يفترض أنها موجودة في مكتبة UI الخاصة بك).

// // لتكامل هذا المكون في تطبيقك:

// // قم بإنشاء صفحة جديدة لتحديث معلومات العيادة.
// // استورد هذا المكون وقم بعرضه في الصفحة.
// // تأكد من أن المستخدم لديه الصلاحيات المناسبة للوصول إلى هذه الصفحة.
// // قم بإضافة رابط لهذه الصفحة في القائمة الرئيسية أو لوحة التحكم.

// // مثال على كيفية استخدام هذا المكون في صفحة:
// // jsxCopyimport React from 'react';
// // import UpdateClinicForm from './UpdateClinicForm';

// // const UpdateClinicPage = () => {
// //   return (
// //     <div className="container mx-auto mt-8">
// //       <h1 className="text-2xl font-bold mb-4">Update Clinic Information</h1>
// //       <UpdateClinicForm />
// //     </div>
// //   );
// // };

// // export default UpdateClinicPage;
// // بعد إنشاء هذه الصفحة، يمكنك الانتقال إلى تطوير المزيد من وظائف إدارة العيادة أو التركيز على إدارة الموظفين والمستخدمين كخطوة تالية.