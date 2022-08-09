import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { usePrepareSendTransaction, useSendTransaction,useWaitForTransaction, } from 'wagmi'
import { ethers } from "ethers";
import background from './images/bg.jpg'

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
    <div className='flex flex-col justify-between w-full h-screen  bg-cover bg-center'  style={{ backgroundImage: `url(${background})` }}>

      <div className='md:pt-20 pt-7'>
      
      <div className='flex flex-row w-full'>
        <div className='bg-orange-400 rounded-3xl md:ml-10 md:p-10 p-5 md:mx-0 mx-1 flex flex-col'>

          <div className='flex flex-row'>
            <div className='flex flex-col md:text-3xl font-black text-white'>
              <div>
                META OF CLASH
              </div>
              <div>
                PRESALE

              </div>

              
            </div>
            <div>
            <div className="justify-end flex w-full mr-3 ">
            <ConnectButton  />
            </div>

            </div>

          </div>

          <div className='flex md:flex-row flex-col'>
            <div className='font-black text-2xl text-cyan-500'>
              $ MOC 100.000
            </div>
            <div className='text-2xl font-black'>
              <span className='indigo-500'>1</span> <span className='text-yellow-500'>BNB</span> <span className='text-indigo-600'>= 3000</span> <span className='text-green-600'>$MOC</span>
            </div>

          </div>
          <div className='flex w-full flex-col'>
          <div class="flex justify-between mb-1">
            <span class="text-base font-medium text-white"></span>
            <span class="text-sm font-black text-indigo-700  ">11.5%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-10">
            <div class="bg-indigo-900 h-10 rounded-full" style={{width: "11.5%"}}></div>
          </div>

          </div>
          <div className='flex flex-row justify-between font-black text-white text-3xl bg-black p-3 rounded-full my-3'>
            <div>
              3000
            </div>
            <div>
              $MOC

            </div>

          </div>
          <div className='flex flex-row justify-between font-black text-white text-3xl bg-black p-3 rounded-full my-3'>
            <div>
            <input
                type="number"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
                class="

                  form-control
                  border-0
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-white
                  bg-black bg-clip-padding
                   focus:border-0
                   focus:bg-black
                   focus:outline-none
                  rounded
                  transition
                  ease-in-out
                  m-0
                  
                "
                id="amount"
                placeholder="Amount to transfer"
              />
            </div>
            <div>
              BNB

            </div>

          </div>
          <div>
            <div class="flex space-x-2 justify-center">

            {isLoading ? 
            <>
            <button type="button" class="bg-indigo-500" disabled>
              <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              
              </svg>
              Sending ...
            </button>
            </>
            :

            <div className='bg-white w-full py-2 rounded-full'>

             <center><button onClick={(e)=>sendTransaction?.()} disabled={!sendTransaction || !to || !amount} type="button" class="inline-block px-6 py-2.5  text-2xl font-extrabold leading-tight uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg  text-indigo-600   transition duration-150 ease-in-out">Buy</button></center> 
            </div>
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
        
         {/* <div>  */}
         {/* <div class="flex justify-center flex-col">
            
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
         
         </div>  */}
        </div>

      </div>
      </div>
      <div className='flex flex-row bg-black py-10 justify-between'>
        <div className='flex flex-col'>
          <div className='text-white md:text-5xl text-3xl font-black'>
            META OF CLASH
          </div>
          <div className='font-black text-yellow-500'>
            METERVARSE PROJECT
          </div>

        </div>
        <div>

        </div>
      </div>

      
     
       
    </div>
  );
}

export default App;
