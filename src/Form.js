import convert from '@publiqbe/openapi2postman';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Alert } from './components/Alert';
import { HowTo } from './components/HowTo';
import { Spinner } from './components/Spinner';
import { Tooltip } from './components/Tooltip';

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 300px;
`;

const LinkButton = styled.button`
  border: 0;
  height: auto;
  text-decoration: underline;
  text-transform: none;
  font-size: 1.5rem;
  padding: 0;
  letter-spacing: 0;
  color: ${(props) => props.color || 'darkgrey'};
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
    authMethod: '',
    tokenGrantType: 'client_credentials',
  });

  const DEFAULT_ERROR_TEXT = 'Something went wrong, please try again later';

  const [loading, setLoading] = useState(false);
  const [hasDownloadStarted, setHasDownloadStarted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorText, setErrorText] = useState(DEFAULT_ERROR_TEXT);

  const PUBLIQ_STOPLIGHT_SCHEME =
    'https://stoplight.io/api/v1/projects/publiq/';
  const PUBLIQ_GITHUBUSERCONTENT_SCHEME =
    'https://raw.githubusercontent.com/cultuurnet/apidocs/';

  const allEnvironments = [
    {
      label: 'Acceptance',
      value: 'acc',
    },
    {
      label: 'Testing',
      value: 'test',
    },
    {
      label: 'Production',
      value: 'prod',
    },
  ];

  const apiConfig = {
    none: {
      scheme: '',
      authMethod: 'none',
      environments: [],
      defaultEnvironment: '',
    },
    'udb-entry': {
      scheme: `${PUBLIQ_STOPLIGHT_SCHEME}uitdatabank/nodes/reference/entry.json?deref=optimizedBundle`,
      authMethod: 'token',
      environments: allEnvironments,
      defaultEnvironment: 'test',
    },
    'udb-search': {
      scheme: `${PUBLIQ_STOPLIGHT_SCHEME}uitdatabank/nodes/reference/search.json?deref=optimizedBundle`,
      authMethod: 'x-client-id',
      environments: allEnvironments,
      defaultEnvironment: 'test',
    },
    'udb-taxonomy': {
      scheme: `${PUBLIQ_STOPLIGHT_SCHEME}uitdatabank/nodes/reference/taxonomy.json?deref=optimizedBundle`,
      authMethod: 'none',
      environments: allEnvironments.filter(
        (environment) => environment.value === 'prod',
      ),
      defaultEnvironment: 'prod',
    },
    'uitpas-api': {
      scheme: `${PUBLIQ_STOPLIGHT_SCHEME}uitpas/nodes/reference/uitpas.json?deref=optimizedBundle`,
      authMethod: 'token',
      environments: allEnvironments,
      defaultEnvironment: 'test',
    },
    'mpm-partner-api': {
      scheme: `${PUBLIQ_STOPLIGHT_SCHEME}museumpassmusees/nodes/reference/partner-api.json?deref=optimizedBundle`,
      authMethod: 'token',
      environments: allEnvironments,
      defaultEnvironment: 'test',
    },
    other: {
      scheme: formData.otherUrl,
      authMethod: formData.authMethod,
      environments: allEnvironments,
      defaultEnvironment: 'test',
    },
  };

  const { scheme, authMethod, defaultEnvironment, environments } =
    apiConfig[formData.apiType || 'none'];
  const environment = formData.environment || defaultEnvironment;

  const handleSubmit = async () => {
    if (
      formData.apiType === 'other' &&
      !(
        formData.otherUrl.startsWith(PUBLIQ_STOPLIGHT_SCHEME) ||
        formData.otherUrl.startsWith(PUBLIQ_GITHUBUSERCONTENT_SCHEME)
      )
    ) {
      setHasError(true);
      setErrorText(
        `API URL should start with ${PUBLIQ_STOPLIGHT_SCHEME} or ${PUBLIQ_GITHUBUSERCONTENT_SCHEME}`,
      );
      return;
    }

    if (formData.apiType === '') {
      setHasError(true);
      setErrorText(`Please select an API from the list`);
      return;
    }

    const baseUrl = '';
    const auth = {
      authMethod: authMethod,
      tokenGrantType: formData.tokenGrantType || 'client_credentials',
      clientId: formData.clientId,
      clientSecret: formData.clientSecret,
      callbackUrl: 'https://oauth.pstmn.io/v1/callback',
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
              <LinkButton onClick={restartFlow} color="#00aae5">
                Download another collection
              </LinkButton>
            </>
          ) : (
            <FormWrapper key="form-wrapper">
              <div>
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
                  <option value="udb-search">UiTdatabank Search API</option>
                  <option value="udb-taxonomy">UiTdatabank Taxonomy API</option>
                  <option value="uitpas-api">UiTPAS API</option>
                  <option value="mpm-partner-api">
                    museumPASSmusées Partner API
                  </option>
                  <option value="other">Other API...</option>
                </select>
              </div>
              {formData.apiType === 'other' && (
                <div>
                  <input
                    className="u-full-width"
                    type="text"
                    placeholder="OpenAPI file url"
                    value={formData.otherUrl}
                    onChange={(e) => {
                      setFormData({ ...formData, otherUrl: e.target.value });
                      resetError();
                    }}
                  />
                </div>
              )}
              {formData.apiType !== '' && (
                <div>
                  <label htmlFor="environment">Environment</label>
                  <select
                    className="u-full-width"
                    value={environment}
                    onChange={(e) => {
                      setFormData({ ...formData, environment: e.target.value });
                      resetError();
                    }}
                    id="environment"
                  >
                    {environments.map((environment) => (
                      <option value={environment.value}>
                        {environment.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                {(authMethod !== 'none' || formData.apiType === 'other') && (
                  <label htmlFor="authMethod">Authentication</label>
                )}
                {formData.apiType === 'other' && (
                  <select
                    className="u-full-width"
                    value={formData.authMethod}
                    onChange={(e) => {
                      setFormData({ ...formData, authMethod: e.target.value });
                      resetError();
                    }}
                    id="authMethod"
                  >
                    <option value="none">None</option>
                    <option value="token">Token</option>
                    <option value="x-client-id">
                      Client identification (x-client-id header)
                    </option>
                  </select>
                )}
              </div>
              {(authMethod === 'token' || authMethod === 'x-client-id') && (
                <div>
                  <input
                    className="u-full-width"
                    type="text"
                    placeholder={`Client id (${environment} environment)`}
                    value={formData.clientId}
                    onChange={(e) => {
                      setFormData({ ...formData, clientId: e.target.value });
                      resetError();
                    }}
                  />
                </div>
              )}
              {authMethod === 'token' && (
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    className="u-full-width"
                    placeholder={`Client secret (${environment} environment)`}
                    value={formData.clientSecret}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        clientSecret: e.target.value,
                      });
                      resetError();
                    }}
                  />
                  <Tooltip
                    text={
                      'Your client secret never leaves your browser. You can also leave this empty and enter it in Postman itself as the "oauth2ClientSecret" variable.'
                    }
                  />
                </div>
              )}
              {authMethod === 'token' && (
                <div>
                  <label htmlFor="tokenGrantType">Token type</label>
                  <select
                    className="u-full-width"
                    value={formData.tokenGrantType}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        tokenGrantType: e.target.value,
                      });
                      resetError();
                    }}
                    id="tokenGrantType"
                  >
                    <option value="client_credentials">
                      Client access token
                    </option>
                    <option value="authorization_code">
                      User access token
                    </option>
                  </select>
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
