export const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "instituteID",
        type: "string",
      },
      {
        internalType: "string",
        name: "userID",
        type: "string",
      },
      {
        internalType: "string",
        name: "certificateFormatID",
        type: "string",
      },
    ],
    name: "storeCertificate",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "hashValue",
        type: "bytes32",
      },
    ],
    name: "verifyHash",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
