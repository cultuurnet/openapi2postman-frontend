import convert from '@publiqbe/openapi2postman';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Alert } from './components/Alert';
import { HowTo } from './components/HowTo';
import { Spinner } from './components/Spinner';
import { Tooltip } from './components/Tooltip';

const ENVIRONMENTS = [
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

const AdvancedOptions = styled.div``;

const InfoBox = styled.div`
  background-color: #efefef;
  padding: 15px;
  border-radius: 5px;
`;

const Text = styled.p`
  font-size: ${(props) => (props.size === 'small' ? '1.20rem' : '1.5rem')};
  margin-bottom: 0;
`;

const Form = (props) => {
  const queryParams = new URLSearchParams(window.location.search);

  const [formData, setFormData] = useState({
    clientId: '',
    clientSecret: '',
    environment: 'test',
    apiType: queryParams.get('api') ?? '',
    otherUrl: '',
    authMethod: '',
    tokenGrantType: 'client_credentials',
    callbackUrl: '',
  });

  const DEFAULT_ERROR_TEXT = 'Something went wrong, please try again later';

  const [loading, setLoading] = useState(false);
  const [hasAdvancedSettings, setHasAdvancedSettings] = useState(false);
  const [hasDownloadStarted, setHasDownloadStarted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorText, setErrorText] = useState(DEFAULT_ERROR_TEXT);

  const PUBLIQ_STOPLIGHT_SCHEME =
    'https://stoplight.io/api/v1/projects/publiq/';
  const PUBLIQ_GITHUBUSERCONTENT_SCHEME =
    'https://raw.githubusercontent.com/cultuurnet/apidocs/';
  const UDB_ENTRY_SCHEME_URL = `${PUBLIQ_STOPLIGHT_SCHEME}uitdatabank/nodes/reference/entry.json?deref=optimizedBundle`;
  const UDB_SEARCH_SCHEME_URL = `${PUBLIQ_STOPLIGHT_SCHEME}uitdatabank/nodes/reference/search.json?deref=optimizedBundle`;
  const UDB_TAXONOMY_SCHEME_URL = `${PUBLIQ_STOPLIGHT_SCHEME}uitdatabank/nodes/reference/taxonomy.json?deref=optimizedBundle`;
  const UITPAS_API_SCHEME_URL = `${PUBLIQ_STOPLIGHT_SCHEME}uitpas/nodes/reference/uitpas.json?deref=optimizedBundle`;
  const MPM_PARTNER_API_SCHEME_URL = `${PUBLIQ_STOPLIGHT_SCHEME}museumpassmusees/nodes/reference/partner-api.json?deref=optimizedBundle`;

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

    let scheme;
    let authMethod;
    switch (formData.apiType) {
      case 'udb-entry':
        scheme = UDB_ENTRY_SCHEME_URL;
        authMethod = 'token';
        break;
      case 'udb-search':
        scheme = UDB_SEARCH_SCHEME_URL;
        authMethod = 'x-client-id';
        break;
      case 'udb-taxonomy':
        scheme = UDB_TAXONOMY_SCHEME_URL;
        authMethod = 'none';
        break;
      case 'uitpas-api':
        scheme = UITPAS_API_SCHEME_URL;
        authMethod = 'token';
        break;
      case 'mpm-partner-api':
        scheme = MPM_PARTNER_API_SCHEME_URL;
        authMethod = 'token';
        break;
      case 'other':
        scheme = formData.otherUrl;
        authMethod = formData.authMethod;
        break;
      default:
        scheme = UDB_ENTRY_SCHEME_URL;
    }
    const environment = formData.environment || 'test';
    const baseUrl = '';
    const auth = {
      authMethod: authMethod,
      tokenGrantType: formData.tokenGrantType || 'client_credentials',
      clientId: formData.clientId,
      clientSecret: formData.clientSecret,
      ...(formData.callbackUrl !== '' && { callbackUrl: formData.callbackUrl }),
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

  const toggleAdvancedOptions = () => {
    setHasAdvancedSettings(!hasAdvancedSettings);
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
                  <div>
                    <input
                      className="u-full-width"
                      type="text"
                      placeholder="openapi file url"
                      value={formData.otherUrl}
                      onChange={(e) => {
                        setFormData({ ...formData, otherUrl: e.target.value });
                        resetError();
                      }}
                    />
                  </div>
                  <div>
                    <select
                      className="u-full-width"
                      value={formData.authMethod}
                      onChange={(e) => {
                        setFormData({ ...formData, authMethod: e.target.value });
                        resetError();
                      }}
                      id="authMethod"
                    >
                      <option value="" disabled>
                        Select authentication method
                      </option>
                      <option value="none">No authentication</option>
                      <option value="token">Token</option>
                      <option value="x-client-id">Client identification (x-client-id header)</option>
                    </select>
                  </div>
                </div>
              )}
              {formData.authMethod !== 'none' && (
                <div>
                  <input
                    className="u-full-width"
                    type="text"
                    placeholder={`client id (${formData.environment} environment)`}
                    value={formData.clientId}
                    onChange={(e) => {
                      setFormData({ ...formData, clientId: e.target.value });
                      resetError();
                    }}
                  />
                </div>
              )}
              {formData.authMethod === 'token' && (
                <div style={{ position: 'relative' }}>
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
                  <Tooltip
                    text={
                      'Your client secret never leaves your browser. You can also leave this empty and enter it in Postman itself as the "oauth2ClientSecret" variable.'
                    }
                  />
                </div>
              )}
              {hasAdvancedSettings && (
                <AdvancedOptions>
                  <label htmlFor="environment">Environment</label>
                  <select
                    className="u-full-width"
                    value={formData.environment}
                    onChange={(e) => {
                      setFormData({ ...formData, environment: e.target.value });
                      resetError();
                    }}
                    id="environment"
                  >
                    {ENVIRONMENTS.map((environment) => (
                      <option value={environment.value}>
                        {environment.label}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="tokenGrantType">Token type </label>
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
                  {formData.tokenGrantType === 'authorization_code' && (
                    <div>
                      <input
                        className="u-full-width"
                        type="text"
                        placeholder="callback url*"
                        value={formData.callbackUrl}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            callbackUrl: e.target.value,
                          });
                          resetError();
                        }}
                      />
                      <InfoBox>
                        <Text size="small">
                          *URL to redirect back to after logging in. Postman
                          will not show the actual page, but it is still
                          required for a successful login flow. Has to be a URL
                          that is configured to be allowed for the given client
                          id. See the{' '}
                          <a
                            href="https://docs.publiq.be/docs/authentication/ZG9jOjExODE5NTM5-user-access-token#client-configuration"
                            target="_blank"
                            rel="noreferrer"
                          >
                            user access token documentation
                          </a>{' '}
                          for more information.
                        </Text>
                      </InfoBox>
                    </div>
                  )}
                </AdvancedOptions>
              )}
              <LinkButton onClick={toggleAdvancedOptions}>
                {hasAdvancedSettings ? 'Hide' : 'Show'} advanced options
              </LinkButton>
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
