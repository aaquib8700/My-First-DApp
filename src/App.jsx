import { useState } from "react";
import { BrowserProvider, Contract } from "ethers";

const contractAddress = "0x1A50415567e567aE104E8cA22Cb4a6504D27cE69"; // replace kar
const contractABI = [ 
  {
    "inputs": [],
    "name": "get",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "x", "type": "uint256" }],
    "name": "set",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "storedData",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];

function App() {
  const [value, setValue] = useState("");
  const [storedValue, setStoredValue] = useState(null);

  const setContractValue = async () => {
    if (!window.ethereum) return alert("Install MetaMask");
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, contractABI, signer);
    const tx = await contract.set(parseInt(value));
    await tx.wait();
    alert("Value Set Successfully!");
  };

const getContractValue = async () => {
  if (!window.ethereum) return alert("Install MetaMask");
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner(); // ✅ signer is necessary
  const contract = new Contract(contractAddress, contractABI, signer);
  const val = await contract.get();
  setStoredValue(val.toString());
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-6">🚀 Simple Storage DApp</h1>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-xl w-80">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
          className="w-full p-2 rounded mb-4 text-black"
        />

        <button
          onClick={setContractValue}
          className="w-full bg-green-500 hover:bg-green-600 py-2 rounded mb-3"
        >
          Set Value
        </button>

        <button
          onClick={getContractValue}
          className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded"
        >
          Get Value
        </button>

{storedValue !== null && (
  <p className="mt-4 text-center text-lg bg-black text-white p-2 rounded">
    🔐 Stored Value: <span className="font-bold">{storedValue}</span>
  </p>
)}
      </div>
    </div>
  );
}

export default App;
