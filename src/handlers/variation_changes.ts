// @ts-nocheck
// "https://api.optimizely.com/v2/experiments/23103450895"



const Variation_Changes = async (request) => {
    let API_URL = 'https://api.optimizely.com/v2/experiments/';

    let EXPERIMENT_ID = request.params.experiment_id;
    let BEARER_TOKEN = request.params.api_token;
    API_URL = API_URL + EXPERIMENT_ID; 
    let changes;
      
    async function processResponse(response) {
      const { headers } = response;
      const contentType = headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        let variation = await response.json();
        variation = variation.variations[1];
        changes = variation.actions[0].changes; 
        console.log(changes);
        return JSON.stringify(changes);
      }
      return response.text();
    }
  
    const initJSON = {
        headers: { "content-type": "application/json;charset=UTF-8",
                    "Authorization": "Bearer " + BEARER_TOKEN                
    },
      };
  
    const apiResponse = await fetch(API_URL, initJSON);
    const apiString = await processResponse(apiResponse);
    await FX_HYBRID_DATA_KV.put("optly_variation_changes", apiString);
    //console.log(apiString);
  
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json; charset=UTF-8",
    };
    return new Response(
      `Variation changes updated to:\n\n${apiString}`,
      { headers }
    );
  };
  
  export default Variation_Changes;
  