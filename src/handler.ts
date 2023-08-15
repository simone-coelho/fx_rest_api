// @ts-nocheck
import { Router } from "itty-router";

import Datafiles from "./handlers/datafiles";
import Datafiles_SDK_KEY from "./handlers/datafiles_sdk_key";
import Flag_Keys from "./handlers/flag_keys";
import SDK from "./handlers/sdk";
import Variation_Changes from "./handlers/variation_changes";

const handleRequest = (request) => router.handle(request);

const router = Router();

// ToDo - Should I make this Dynamic?
router
  .get("/api/datafiles/:key", Datafiles)
  .post("/api/datafiles/:key", Datafiles)
  .post("/api/datafiles_sdk_key/:key", Datafiles_SDK_KEY)
  .post("/api/flag_keys", Flag_Keys)
  .get("/api/sdk/:sdk_url", SDK)
  .get("/api/variation_changes/:experiment_id/:api_token", Variation_Changes)
  .post("/api/variation_changes/:experiment_id/:api_token", Variation_Changes)
  .get("*", () => new Response("Not found", { status: 404 }));

export default handleRequest;
