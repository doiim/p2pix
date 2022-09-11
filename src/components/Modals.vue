<template>
    <div class="bg-dark-blue">
        <!-- <OfferModal v-if="offerModal" /> -->
        <PurchaseModal v-if="purchaseModal"  />
    </div>
</template>

<script>
import OfferModal from './modals/OfferModal.vue'
import PurchaseModal from './modals/PurchaseModal.vue'

export default {
    components: {
        OfferModal,
        PurchaseModal
    },
    data(){
        return {
            purchaseModal: false,
            offerModal: false,
            messageModal: false,
        }
    },
    mounted() {

        // this.$root?.$el.addEventListener(
        //     'showMessageModal',
        //     (e) => {
        //         this.messageModal = true;
        //         this.mmConfig = e.detail;
        //     },
        // );

        
        this.$root?.$el.addEventListener('hideMessageModal', () => {
            this.messageModal = false;
        });


        this.$root?.$el.addEventListener('hidePurchaseModal', () => {
            this.purchaseModal = false;
        });
        this.$root?.$el.addEventListener('showPurchaseModal', () => {
            this.purchaseModal = true;
        });


        this.$root?.$el.addEventListener('hideOfferModal', () => {
            this.offerModal = false;
        });
        this.$root?.$el.addEventListener('showOfferModal', () => {
            this.offerModal = true;
        });
    }
}
</script>
