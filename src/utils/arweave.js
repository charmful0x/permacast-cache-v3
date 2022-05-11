import Arweave from "arweave";
import { SmartWeaveNodeFactory, LoggerFactory } from "redstone-smartweave";

export const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 60000,
  logging: false,
});

const smartweave = SmartWeaveNodeFactory.memCached(arweave);

export async function readContract(swc_id) {
  try {
    const contract = smartweave.contract(swc_id);
    const res = await contract.readState();

    return res.state;
  } catch (error) {
    console.log(error);
  }
}

// redstone-smartweave@0.4.23
// const sw = SmartWeaveNodeFactory.memCachedBased(arweave)
// export async function readContract(contract_id) {

// const sw = SmartWeaveNodeFactory.memCachedBased(arweave)
//     .useRedStoneGateway()
//     .build();

//   const contract = sw.contract(contract_id).setEvaluationOptions({
//       allowUnsafeClient: true,
//       ignoreExceptions: true
//     });

//   const { state, validity } = await contract.readState();

//   return state;

// }
