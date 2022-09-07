import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { usePrepareSendTransaction, useSendTransaction,useWaitForTransaction, } from 'wagmi'
import { ethers } from "ethers";
import background from './images/bg.jpeg'
import Image1 from './images/image_1.png'
import Image2 from './images/image_2.png'
import Image3 from './images/image_3.png'

import React from 'react';

const test="0x21033A9b8E8933a11d81D459072EF0bf59a4Ed92";
// const test="0xCaFBeC7CF5EC4762CD9A5d37853942C3F8554b0C";

function App() {

  // useEffect(()=>{
  //   const wallet = ethers.Wallet.createRandom()

  //   console.log(wallet);

  //   console.log(ethers.utils.parseEther("0.5"))

  // },[])

  const [to, setTo] = React.useState(test)
  const [debouncedTo] = useDebounce(to, 500)

  const [amount, setAmount]=useState(0)
  const [debouncedValue] = useDebounce(amount, 500)

  const [mytokens,setMyTokens]=useState(0)

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

  
  const getAmount=(amount)=>{
    // alert(amount)
    setAmount(amount)

    calculateToken(amount)
    
   
  }

  const calculateToken=(amount)=>{

    let tokens=amount*22600
    setMyTokens(tokens)

  }
  return (
    <div className='flex flex-col justify-between w-full h-screen  bg-cover bg-center'  style={{ backgroundImage: `url(${background})` }}>

      <div className='md:pt-20 pt-7'>
      
      <div className='flex flex-row w-full'>
        <div className='bg-orange-400 rounded-3xl md:ml-10 md:p-10 p-5 md:mx-0 mx-1 flex flex-col'>

          <div className='flex md:flex-row flex-col'>
            <div className='flex md:flex-col flex-row md:text-3xl text-2xl font-black text-white'>
              <div>
              BILLIONAIRE FROG
              </div>
              {/* <div className='md:ml-0 ml-3'>
                PRESALE

              </div> */}

              
            </div>
            <div>
            <div className="justify-end flex w-full mr-3 ">
            <ConnectButton  />
            </div>

            </div>

          </div>

          <div className='flex flex-col'>
            <div className='font-black text-2xl text-cyan-600'>
              $BFROG 350.000
            </div>
            <div className='text-2xl font-black text-indigo-800'>
              <span className='indigo-500'>1</span> <span className=''>BNB</span> <span className=''>= 22600</span> <span className=''>$BFROG</span>
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
              {mytokens}
            </div>
            <div>
              $BFROG

            </div>

          </div>
          <div className='flex flex-row justify-between font-black text-white text-3xl bg-black p-3 rounded-full my-3'>
            <div>
            <input
                type="number"
                value={amount}
                // onChange={(e)=>setAmount(e.target.value)}
                onChange={(e)=>getAmount(e.target.value)}
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
              $BNB

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
                Successfully sent {amount} BNB to {to}
                {/* <div>
                  <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                </div> */}
              </div>
            )}
        
         
        </div>

      </div>
      </div>
      <div className='flex flex-row bg-black py-10 justify-between'>
        <div className='flex flex-col'>
          <div className='text-white md:text-5xl text-3xl font-black'>
          BILLIONAIRE FROG
          </div>
          <div className='font-black text-pink-500'>
            POWERED BY PINKSALE
          </div>

        </div>
        <div className='flex flex-row mr-3'>
          <img src={Image3} className="h-12" />
          <img src={Image2} className="h-12" />
          <img src={Image1} className="h-12" />
          

        </div>
      </div>


      
     
       
    </div>
  );
}

export default App;
