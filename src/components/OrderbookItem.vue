<template>    
    <li class="flex justify-between items-center space-x-2 py-2 px-4 bg-gray-100 whitespace-nowrap rounded">
        <div class="flex-0">
          <div class="flex flex-row justify-start items-center space-x-2 bg-gray-100 whitespace-nowrap ">
            <svg height="40" width="40">
              <circle cx="20" cy="20" r="18" stroke="gray" stroke-width="2" fill="teal" />
            </svg>
            <div class="seller">
              {{ order.seller }}
            </div>
          </div>         
        </div>
        <div class="price">
          <span class="bid">
            {{ order.type }} :  {{ order.amount }}  {{ order.token }} 
          </span>
          <span class="ask">
            ➔  R$ {{ order.price }}
          </span>
        </div>
        <div class="expiration">
          <span>Time remaining</span>
          <span class="clock text-green">
            🕘
          </span>
          <span class="ask-price">
            

            {{ order.expiryDate }}
          </span>
        </div>

        <div class="actions ml-auto order--1">
          <button class="button-green" @click="confirmationWindow"> Comprar </button>
        
        </div>
      </li>
</template>


<script>
// import  from ''

export default {
    setup() {
        
    },
    data(){
        return {

        }
    },
    props:{ order: { type: Object } },
}
</script>
