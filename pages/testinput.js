import { useRef, useState } from 'react';

export default function Page() {
  const [data, setData] = useState('');
  async function getAsByteArray(file) {
    return new Uint8Array(await readFile(file));
  }
  function readFile(file) {
    return new Promise((resolve, reject) => {
      // Create file reader
      let reader = new FileReader();

      // Register event listeners
      reader.addEventListener('loadend', (e) => resolve(e.target.result));
      reader.addEventListener('error', reject);

      // Read file
      reader.readAsArrayBuffer(file);
    });
  }
  const uploadFile = async (file) => {
    const tempData = await getAsByteArray(file);
    setData(tempData);
  };
  const update = async (file) => {
    console.log(data);
    const formData1 = new FormData();
    formData1.append('image', file);
    console.log(data);
    const res = await fetch(`/api/homepage-data`, {
      method: 'POST',
      body: formData1,
    });
  };
  return (
    <div>
      <input type='file' className='my-96' onChange={(e) => update(e.target.files[0])} />;
      <button onClick={update}>Uplaod</button>
    </div>
  );
}
