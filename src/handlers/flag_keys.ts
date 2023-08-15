// @ts-nocheck

/**
 * readRequestBody reads in the incoming request body
 * Use await readRequestBody(..) in an async function to get the string
 * @param {Request} request the incoming request to read from
 */
async function readRequestBody(request) {
  const contentType = request.headers.get("content-type");
  try {
    if (contentType) {
      if (contentType.includes("application/json")) {
        return await request.json();
        // return await request.json();
      } else if (contentType.includes("application/text")) {
        return request.text();
      } else if (contentType.includes("text/html")) {
        return request.text();
      } else if (contentType.includes("form")) {
        const formData = await request.formData();
        const body = {};
        for (const entry of formData.entries()) {
          body[entry[0]] = entry[1];
        }
        return JSON.stringify(body);
      } else {
        // Perhaps some other type of data was submitted in the form
        // like an image, or some other binary data.
        return "a file";
      }
    } else {
      return undefined;
    }
  } catch (error) {
    log("Unable to determine Content-Type: " + error.message);
    return undefined;
  }
}

function arrayIsValid(arrayObject) {
  return Array.isArray(arrayObject) && arrayObject.length !== 0;
}

 async function trimStringArray(stringArray) {
  try {
    if (!arrayIsValid(stringArray)) {
      return [];
    } else {
      let result = stringArray.map((str) => str.trim());
      return result;
    }
  } catch (error) {
    return [];
    // throw new Error(
    //   "Error while processing array of Flag Keys: " + error.message
    // );
  }
}

//optly_flagKeys
const Flag_Keys = async (request) => {
  
  // Ensure the request method is POST
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const requestBody = await readRequestBody(request);
    let arrayOfFlagKeys = requestBody.flagKeys;
    arrayOfFlagKeys = await trimStringArray(arrayOfFlagKeys);

    // Check if the provided property is an array
    if (!Array.isArray(arrayOfFlagKeys) && arrayOfFlagKeys.length === 0) {
      return new Response("Expected an array of Flag Keys", {
        status: 400,
      });
    }

    const combinedString = arrayOfFlagKeys.join(","); // Join the array into a single string

    // Store in KV
    await FX_HYBRID_DATA_KV.put("optly_flagKeys", combinedString);

    return new Response(
      "Flag Keys were stored successfully: " + combinedString,
      { status: 200 }
    );
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
};

export default Flag_Keys;
