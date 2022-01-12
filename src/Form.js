import convert  from '@publiqbe/openapi2postman'
import React, { useState } from 'react'
import { Alert } from './components/Alert';

const Form = () => {
  const queryParams = new URLSearchParams(window.location.search);

  const [formData, setFormData] = useState({
    clientId: "",
    clientSecret: "",
    environment: "",
    apiType: queryParams.get('api') ?? 'udb-entry',
    otherUrl: "",
  })

  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errorText, setErrorText] = useState('Something went wrong, please try again later')

  const PUBLIQ_STOPLIGHT_SCHEME = 'https://stoplight.io/api/v1/projects/publiq/'
  const UDB_ENTRY_SCHEME_URL = `${PUBLIQ_STOPLIGHT_SCHEME}uitdatabank/nodes/reference/entry.json?deref=optimizedBundle`
  const UITPAS_API_SCHEME_URL = `${PUBLIQ_STOPLIGHT_SCHEME}uitpas/nodes/reference/UiTPAS.v2.json?deref=optimizedBundle`

  const handleSubmit = async () => {

    if (formData.apiType === 'other' && !formData.otherUrl.startsWith(PUBLIQ_STOPLIGHT_SCHEME)) {
      setHasError(true)
      setErrorText(`API URL should start with ${PUBLIQ_STOPLIGHT_SCHEME}`)
      return
    }

    let scheme;
    switch (formData.apiType) {
      case 'udb-entry':
        scheme = UDB_ENTRY_SCHEME_URL
        break
      case 'uitpas-api':
        scheme =  UITPAS_API_SCHEME_URL
        break
      case 'other':
        scheme = formData.otherUrl
      default:
        scheme = UDB_ENTRY_SCHEME_URL
    }
    const environment = 'test'
    const baseUrl = ''
    const auth = {
      tokenGrantType: 'client_credentials',
      clientId: formData.clientId,
      clientSecret: formData.clientSecret
    }
    try {
      setLoading(true)
      const postmanCollectionJson = await convert(scheme, environment, baseUrl, auth)
      const a = document.createElement("a");
      const file = new Blob([JSON.stringify(postmanCollectionJson)], { type: "text/plain" });
      a.href = URL.createObjectURL(file);
      a.download = 'postman-collection.json';
      a.click();
    } catch(err) {
      console.log(err)
      setHasError(true)
    }
    setLoading(false)
  };


  return (
    <>
      {
        hasError && <Alert text={errorText} />
      }
      <div>
        <input type="text" placeholder="client id" value={formData.clientId} onChange={(e) => setFormData({...formData, clientId: e.target.value})} />
      </div>
      <div>
        <input type="password" placeholder="client secret" value={formData.clientSecret} onChange={(e) => setFormData({...formData, clientSecret: e.target.value})}/>
      </div>
      <div>
        <label for="apiType">API</label>
        <select value={formData.apiType} onChange={(e) => setFormData({...formData, apiType: e.target.value})} id="apiType">
          <option value="udb-entry">UiTdatabank Entry API</option>
          <option value="uitpas-api">UiTPAS API</option>
          <option value="other">Other...</option>
        </select>
      </div>
      { formData.apiType === 'other' &&
      <div>
        <input type="text" placeholder="url" value={formData.otherUrl} onChange={(e) => setFormData({...formData, otherUrl: e.target.value})} />
      </div>
      }

      <button onClick={handleSubmit} class="button-primary" disabled={loading}>Download</button>
    </>
  );
};

export { Form };
