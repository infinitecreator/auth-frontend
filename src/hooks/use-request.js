import axios from 'axios';
import { useState } from 'react';

export default  function useRequest({ url, method, body, onSuccess }){
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body, { withCredentials: true, crossDomain: true }) ;
      

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      console.log(err) ;
      setErrors(
        <div className="alert alert-danger bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <h4>Ooops....</h4>
          
          <ul className="my-0">
          {/* <li>{err[0]}</li> */}
            {err.response.data.map(err => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return [doRequest, errors ];
};