import Arweave from "arweave";
import { executeContract } from "@three-em/node";
import { REDSTONE_GATEWAY_URL } from "./constants/gateway.js";
import {
  LoggerFactory,
  SmartWeaveNodeFactory,
} from "redstone-smartweave";

export const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 100000,
  logging: false,
});


export async function readContract(contract_id) {

const sw = SmartWeaveNodeFactory.memCachedBased(arweave)
    .useRedStoneGateway()
    .build();

  const contract = sw.contract(contract_id).setEvaluationOptions({
      allowUnsafeClient: true,
      ignoreExceptions: true
    });

  const { state, validity } = await contract.readState();

  return state;

}
