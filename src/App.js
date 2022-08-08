import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { usePrepareSendTransaction, useSendTransaction,useWaitForTransaction, } from 'wagmi'
import { ethers } from "ethers";

import React from 'react';

const test="0x38C308Ba1060fA502D0BDCE12D78D60Da690b0A5";
// const test="0xCaFBeC7CF5EC4762CD9A5d37853942C3F8554b0C";

function App() {

  useEffect(()=>{
    const wallet = ethers.Wallet.createRandom()

    console.log(wallet);

    console.log(ethers.utils.parseEther("0.5"))

  },[])

  const [to, setTo] = React.useState(test)
  const [debouncedTo] = useDebounce(to, 500)

  const [amount, setAmount]=useState(0)
  const [debouncedValue] = useDebounce(amount, 500)

  const { config } = usePrepareSendTransaction({
    request: {
      to: debouncedTo,
      value: debouncedValue ? ethers.utils.parseEther(debouncedValue) : undefined,
      
    },
  })
  const { data, sendTransaction } = useSendTransaction(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  
  const buyToken=()=>{
    alert("hello")
    sendTransaction?.()
   
  }
  return (
    <div className='flex flex-col w-full'>

      <div className="justify-end flex w-full mr-3 ">
      <ConnectButton  />
      </div>


      <div>
         Receiving Address: {test}
      </div>
     

      <div className='flex flex-row w-full'>
        <div className='mx-auto justify-center'>
         <div> 
         <div class="flex justify-center flex-col">
            {/* <div class="mb-3 xl:w-96">
              <label for="exampleFormControlInput1" class="form-label inline-block mb-2 text-gray-700"
                >Receiving Address </label>
              <input
                type="text"
                value={to}
                onChange={(e)=>setTo(e.target.value)}
                class="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                id="amount"
                placeholder="0xA0Cf…251e"
                readOnly
              />
            </div> */}
            <div class="mb-3 xl:w-96">
              <label for="exampleFormControlInput1" class="form-label inline-block mb-2 text-gray-700"
                >Amount to transfer </label>
              <input
                type="text"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
                class="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                id="amount"
                placeholder="Amount to transfer"
              />
            </div>
            <div>
            <div class="flex space-x-2 justify-center">

            {isLoading ? 
            <>
            <button type="button" class="bg-indigo-500 ..." disabled>
              <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
              
              </svg>
              Sending ...
            </button>
            </>
            :
            <button onClick={(e)=>sendTransaction?.()} disabled={!sendTransaction || !to || !amount} type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Buy Token</button>
            }
              
            </div>
            </div>
            {isSuccess && (
              <div>
                Successfully sent {amount} ether to {to}
                <div>
                  <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                </div>
              </div>
            )}
          </div>
         
         </div> 
        </div>

      </div>
     
       
    </div>
  );
}

export default App;
