import convert from '@publiqbe/openapi2postman';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Alert } from './components/Alert';
import { Spinner } from './components/Spinner';

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 300px;
`;

const DownloadButton = styled.button`
  height: 50px;
`;

const Form = () => {
  const queryParams = new URLSearchParams(window.location.search);

  const [formData, setFormData] = useState({
    clientId: '',
    clientSecret: '',
    environment: '',
    apiType: queryParams.get('api') ?? '',
    otherUrl: '',
  });

  const DEFAULT_ERROR_TEXT = 'Something went wrong, please try again later';

  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorText, setErrorText] = useState(DEFAULT_ERROR_TEXT);

  const PUBLIQ_STOPLIGHT_SCHEME =
    'https://stoplight.io/api/v1/projects/publiq/';
  const UDB_ENTRY_SCHEME_URL = `${PUBLIQ_STOPLIGHT_SCHEME}uitdatabank/nodes/reference/entry.json?deref=optimizedBundle`;
  const UITPAS_API_SCHEME_URL = `${PUBLIQ_STOPLIGHT_SCHEME}uitpas/nodes/reference/UiTPAS.v2.json?deref=optimizedBundle`;

  const handleSubmit = async () => {
    if (
      formData.apiType === 'other' &&
      !formData.otherUrl.startsWith(PUBLIQ_STOPLIGHT_SCHEME)
    ) {
      setHasError(true);
      setErrorText(`API URL should start with ${PUBLIQ_STOPLIGHT_SCHEME}`);
      return;
    }

    if (formData.apiType === '') {
      setHasError(true);
      setErrorText(`Please select an API from the list`);
      return;
    }

    let scheme;
    switch (formData.apiType) {
      case 'udb-entry':
        scheme = UDB_ENTRY_SCHEME_URL;
        break;
      case 'uitpas-api':
        scheme = UITPAS_API_SCHEME_URL;
        break;
      case 'other':
        scheme = formData.otherUrl;
        break;
      default:
        scheme = UDB_ENTRY_SCHEME_URL;
    }
    const environment = 'test';
    const baseUrl = '';
    const auth = {
      tokenGrantType: 'client_credentials',
      clientId: formData.clientId,
      clientSecret: formData.clientSecret,
    };
    try {
      setLoading(true);
      const postmanCollectionJson = await convert(
        scheme,
        environment,
        baseUrl,
        auth,
      );
      const a = document.createElement('a');
      const file = new Blob([JSON.stringify(postmanCollectionJson)], {
        type: 'text/plain',
      });
      a.href = URL.createObjectURL(file);
      a.download =
        formData.apiType !== 'other'
          ? `${formData.apiType}.json`
          : 'postman-collection.json';
      a.click();
    } catch (err) {
      console.log(err);
      setHasError(true);
      setErrorText(DEFAULT_ERROR_TEXT);
    }
    setLoading(false);
  };

  const resetError = () => {
    setHasError(false);
    setErrorText('');
  };

  return (
    <>
      {hasError && <Alert text={errorText} />}
      {loading ? (
        <Spinner />
      ) : (
        <FormWrapper key="form-wrapper">
          <div>
            <label>API client credentials (test environment)</label>
            <input
              class="u-full-width"
              type="text"
              placeholder="client id"
              value={formData.clientId}
              onChange={(e) => {
                setFormData({ ...formData, clientId: e.target.value });
                resetError();
              }}
            />
          </div>
          <div>
            <input
              type="password"
              class="u-full-width"
              placeholder="client secret"
              value={formData.clientSecret}
              onChange={(e) => {
                setFormData({ ...formData, clientSecret: e.target.value });
                resetError();
              }}
            />
          </div>
          <div>
            <label for="apiType">API</label>
            <select
              class="u-full-width"
              value={formData.apiType}
              onChange={(e) => {
                setFormData({ ...formData, apiType: e.target.value });
                resetError();
              }}
              id="apiType"
            >
              <option value="" selected disabled>
                Select API
              </option>
              <option value="udb-entry">UiTdatabank Entry API</option>
              <option value="uitpas-api">UiTPAS API</option>
              <option value="other">Other...</option>
            </select>
          </div>
          {formData.apiType === 'other' && (
            <div>
              <input
                class="u-full-width"
                type="text"
                placeholder="url"
                value={formData.otherUrl}
                onChange={(e) => {
                  setFormData({ ...formData, otherUrl: e.target.value });
                  resetError();
                }}
              />
            </div>
          )}
          <DownloadButton onClick={handleSubmit} className="button-primary">
            Download
          </DownloadButton>
        </FormWrapper>
      )}
    </>
  );
};

export { Form };
