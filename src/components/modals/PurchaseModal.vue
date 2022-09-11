<template>
    <BaseModal
        center
        :id="config.id"
        @mousedown.self="closeModal"
    >
        <div
            class="
                mx-auto
                flex
                items-center
                justify-center
                h-12
                w-12
                rounded-full
            "
            :class="config.type === 'error' ? 'bg-red-50' : 'bg-green-100'"
        >
            <ExclamationIcon
                v-if="config.type === 'error'"
                class="h-6 w-6 text-red-600"
                aria-hidden="true"
            />
            <CheckIcon
                v-if="config.type === 'success'"
                class="h-6 w-6 text-green-600"
                aria-hidden="true"
            />
        </div>
        <div class="mt-3 text-center sm:mt-5">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ config.title }}
            </h3>
            <div class="mt-2">
                <p class="text-sm text-gray-500">
                    {{ config.subtitle }}
                </p>
            </div>
        </div>
        <div class="mt-5 sm:mt-6 flex sm:gap-3">
            <button
                v-if="config.confirm?.length > 0"
                type="button"
                class="
                    w-full
                    inline-flex
                    justify-center
                    rounded-md
                    border border-transparent
                    shadow-sm
                    px-4
                    py-2
                    bg-indigo-600
                    text-base
                    font-medium
                    focus:outline-none
                    text-white
                    focus:ring-2
                    hover:bg-indigo-700
                    focus:ring-offset-2
                    sm:col-start-2
                    focus:ring-indigo-500
                    sm:text-sm
                "
                @click="confirm"
            >
                {{ config.confirm }}
            </button>
            <button
                v-if="config.cancel?.length > 0"
                type="button"
                class="
                    mt-3
                    w-full
                    inline-flex
                    justify-center
                    rounded-md
                    border border-gray-300
                    shadow-sm
                    px-4
                    py-2
                    bg-white
                    text-base
                    font-medium
                    text-gray-700
                    focus:outline-none
                    hover:bg-gray-50
                    focus:ring-2
                    sm:mt-0
                    focus:ring-offset-2
                    sm:col-start-1
                    focus:ring-indigo-500
                    sm:text-sm
                "
                @click="cancel"
            >
                {{ config.cancel }}
            </button>
        </div>
    </BaseModal>
</template>

<script >

import BaseModal from './BaseModal.vue';

export default {
    components: {
        BaseModal,
    },
    props: {
        config: { type: Object },
    },
    cancel() {
        if (this.config?.hooks?.cancel) this.config.hooks.cancel();
        this.$root?.$el.dispatchEvent(new Event('hidePurchaseModal'));
    },
    confirm() {
        if (this.config?.hooks?.confirm) this.config.hooks.confirm();
        this.$root?.$el.dispatchEvent(new Event('hidePurchaseModal'));
    },
    closeModal() {
        if (this.config?.hooks?.close) this.config.hooks.close();
        this.$root?.$el.dispatchEvent(new Event('hidePurchaseModal'));
    },
}
</script>
