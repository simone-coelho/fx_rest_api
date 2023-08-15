// @ts-nocheck
// const sdkURL = "https://unpkg.com/@optimizely/optimizely-sdk/dist/optimizely.browser.umd.min.js"


const SDK = async (request) => {
  let SDK_URL = request.params.sdk_url;
  console.log(SDK_URL);
  SDK_URL = decodeURIComponent(SDK_URL);

  async function processResponse(response) {
    const { headers } = response;
    const contentType = headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return JSON.stringify(await response.json());
    }
    return response.text();
  }

  const initSDK = {
    headers: { "content-type": "text/javascript;charset=UTF-8" },
  };

  const sdkResponse = await fetch(SDK_URL, initSDK);
  const sdkString = await processResponse(sdkResponse);
  await FX_HYBRID_DATA_KV.put("optly_js_sdk", sdkString);
  //const kv_SDK = await FX_HYBRID_DATA_KV.get("optly_js_sdk")
  console.log(sdkString);

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "text/javascript",
  };
  return new Response(
    `SDK updated to: ${SDK_URL}\n`,
    { headers }
  );
};

export default SDK;
