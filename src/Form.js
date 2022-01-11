import convert  from '@publiqbe/openapi2postman'
import React, { useState } from 'react'
import { Alert } from './components/Alert';

const Form = () => {
  const [formData, setFormData] = useState({
    clientId: "",
    clientSecret: "",
    environment: "",
  })

  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleSubmit = async () => {
    console.log("handleSubmit");
    const schema = 'https://stoplight.io/api/v1/projects/publiq/uitdatabank/nodes/reference/entry.json?deref=optimizedBundle'
    const environment = 'test'
    const baseUrl = ''
    const auth = {
      tokenGrantType: 'client_credentials',
      clientId: formData.clientId,
      clientSecret: formData.clientSecret
    }
    try {
      const postmanCollectionJson = await convert(schema, environment, baseUrl, auth)
      const a = document.createElement("a");
      const file = new Blob([JSON.stringify(postmanCollectionJson)], { type: "text/plain" });
      a.href = URL.createObjectURL(file);
      a.download = 'postman-collection.json';
      a.click();
    } catch(err) {
      console.log(err)
      setHasError(true)
    }
  };


  return (
    <>
      <Alert text="Er liep iets fout" />
      <div>
        <input type="text" placeholder="client id" value={formData.clientId} onChange={(e) => setFormData({...formData, clientId: e.target.value})} />
      </div>
      <div>
        <input type="password" placeholder="client secret" value={formData.clientSecret} onChange={(e) => setFormData({...formData, clientSecret: e.target.value})}/>
      </div>
      <button onClick={handleSubmit}>Download</button>
    </>
  );
};

export { Form };
