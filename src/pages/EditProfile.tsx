import { useState, useEffect } from 'react';

const EditProfilePage = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    if (storedName) setName(storedName);
  }, []);

  const handleSave = () => {
    localStorage.setItem('username', name);
    alert('Profile updated!');
  };

  return (
    <div className="p-4 h-full min-h-[88.3vh] flex flex-col items-center">
      <h2 className="text-2xl mb-4 dark:text-white">Edit Profile</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="block w-full p-2 border rounded lg:w-2/3 md:w-2/3" />
      <button onClick={handleSave} className="w-16 md:w-20 sm:w-16 sm:h-12 md:h-12 mt-4 bg-sky-600 dark:bg-slate-600 dark:hover:bg-slate-900 hover:bg-sky-700 text-white p-2 rounded">Save</button>
    </div>
  );
};

export default EditProfilePage;
