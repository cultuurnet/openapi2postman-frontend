import convert from '@publiqbe/openapi2postman';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Alert } from './components/Alert';
import { HowTo } from './components/HowTo';
import { Spinner } from './components/Spinner';

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 300px;
`;

const LinkButton = styled.button`
  border: 0;
  text-decoration: underline;
  text-transform: none;
  font-size: 1.5rem;
  padding: 0;
  height: 0;
  letter-spacing: 0;
  color: #00aae5;
`;

const DownloadButton = styled.button`
  height: 50px;
`;

const Form = (props) => {
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
  const [hasDownloadStarted, setHasDownloadStarted] = useState(false);
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
      const apiName = postmanCollectionJson.info.name || 'postman-collection';
      const a = document.createElement('a');
      const file = new Blob([JSON.stringify(postmanCollectionJson)], {
        type: 'text/plain',
      });
      a.href = URL.createObjectURL(file);
      a.download = apiName + '.json';
      a.click();
      setHasDownloadStarted(true);
      props.onDownloadCompleted(true);
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

  const restartFlow = () => {
    setHasDownloadStarted(false);
    props.onDownloadCompleted(false);
  };

  return (
    <>
      {hasError && <Alert text={errorText} />}
      {loading ? (
        <Spinner />
      ) : (
        <>
          {hasDownloadStarted ? (
            <>
              <HowTo />
              <LinkButton onClick={restartFlow}>
                Download another collection
              </LinkButton>
            </>
          ) : (
            <FormWrapper key="form-wrapper">
              <div>
                <input
                  className="u-full-width"
                  type="text"
                  placeholder="client id (test environment)"
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
                  className="u-full-width"
                  placeholder="client secret"
                  value={formData.clientSecret}
                  onChange={(e) => {
                    setFormData({ ...formData, clientSecret: e.target.value });
                    resetError();
                  }}
                />
              </div>
              <div>
                <label htmlFor="apiType">API</label>
                <select
                  className="u-full-width"
                  value={formData.apiType}
                  onChange={(e) => {
                    setFormData({ ...formData, apiType: e.target.value });
                    resetError();
                  }}
                  id="apiType"
                >
                  <option value="" disabled>
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
                    className="u-full-width"
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
      )}
    </>
  );
};

export { Form };
