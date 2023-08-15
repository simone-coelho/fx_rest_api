// @ts-nocheck

const Datafiles_SDK_KEY = async (request) => {
  // This will be used soon to retrieve a datafile
  // 4sUYxwWFPQi3ACfgmyUtu
  const datafile_key = request.params.key;
  const datafile_url = `https://cdn.optimizely.com/datafiles/${datafile_key}.json`;

  async function processResponse(response) {
    const { headers } = datafileResponse;
    const contentType = headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return JSON.stringify(await response.json());
    }
    return response.text();
  }

  const initJSON = {
    headers: { "content-type": "application/json;charset=UTF-8" },
  };

  const datafileResponse = await fetch(datafile_url, initJSON);
  const jsonString = await processResponse(datafileResponse);
  await FX_HYBRID_DATA_KV.put(datafile_key, jsonString);
  const kv_datafile = await FX_HYBRID_DATA_KV.get(datafile_key);
  //console.log(kv_datafile);

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
  };
  return new Response(
    `Datafile updated to Key: ${datafile_key}\n\nDatafile JSON: ${kv_datafile}`,
    { headers }
  );
};

export default Datafiles_SDK_KEY;
