<?php

class WcaOauth
{
    CONST ACCESS_TOKEN_URI = "https://www.worldcubeassociation.org/oauth/token";
    CONST OAUTH_AUTHORIZE_URI = "https://www.worldcubeassociation.org/oauth/authorize";
    CONST USER_URI = "https://www.worldcubeassociation.org/api/v0/me";

    protected $applicationId;
    protected $applicationSecret;
    protected $redirectUri;
    protected $scope;

    protected static $requiredOptions = array(
        'applicationId',
        'applicationSecret',
        'redirectUri'
    );

    protected $accessToken;

    public function __construct($options)
    {
        $this->setOptions($options);
    }

    protected function checkRequiredOptionsSet()
    {
        foreach (self::$requiredOptions AS $value) {
            if (!isset($this->$value)) {
                throw new Exception("$value is a required option!");
            }
        }
    }

    protected function setOptions($options)
    {
        foreach ($options AS $key => $value) {
            $this->$key = $value;
        }

        $this->checkRequiredOptionsSet();
    }

    /**
     * Send request to WCA and return JSON.
     * @param  string $url        URL to send request
     * @param  array $postParams POST data to include in the request (optional)
     * @param  array $headers    Headers to set in the request (optional)
     * @return array             JSON decoded array
     */
    protected function curlJson($url, $postParams = null, $headers = null)
    {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        if ($postParams) {
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postParams);
        }

        if ($headers) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        }

        $result = curl_exec($ch);

        curl_close($ch);

        $jsonResult = json_decode($result);

        $this->throwIfError($jsonResult);

        return $jsonResult;
    }

    protected function throwIfError($jsonResult)
    {
        $error = "";

        if (isset($jsonResult->error)) {
            $error .= "Error: $jsonResult->error";
        }

        if (isset($jsonResult->error_description)) {
            $error .= " ($jsonResult->error_description)";
        }

        if ($error) {
            throw new WcaOauthException($error);
        }
    }

    public function generateOauthFlowUri()
    {
        $params = http_build_query([
            'client_id' => $this->applicationId,
            'redirect_uri' => $this->redirectUri,
            'response_type' => 'code',
            'scope' => implode(' ', $this->scope),
        ]);

        return sprintf("%s?%s", self::OAUTH_AUTHORIZE_URI, $params);
    }

    /**
     * Convert the code GET param to an OAuth Access Token and store it
     * @param  [type] $code [description]
     * @return [type]       [description]
     */
    public function fetchAccessToken($code)
    {
        $postParams = array(
            'code' => $code,
            'grant_type' => 'authorization_code',
            'client_id' => $this->applicationId,
            'client_secret' => $this->applicationSecret,
            'redirect_uri' => $this->redirectUri,
        );

        $jsonResult = $this->curlJson(self::ACCESS_TOKEN_URI, $postParams);

        $this->accessToken = $jsonResult->access_token;

        return $this;
    }

    public function getAccessToken()
    {
        return $this->accessToken;
    }

    public function getUser()
    {
        if (!$this->accessToken) {
            throw new WcaOauthException("You must call fetchAccessToken first.");
        }

        $headers = array(
          "Authorization: Bearer $this->accessToken",
        );

        return $this->curlJson(self::USER_URI, null, $headers)->me;
    }
}

class WcaOauthException extends Exception
{

}