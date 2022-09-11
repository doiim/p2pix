<template>
    <div
        class="
            fixed
            flex
            inset-0
            w-full
            h-full
            z-10
            bg-gray-500 bg-opacity-75
            duration-300
            overflow-y-auto
        "
    >
        <div
            class="relative w-96 md:w-120 mx-2 sm:mx-auto my-3 opacity-100"
            :class="center ? 'place-self-center' : ''"
        >
            <div
                :class="[
                    'z-20',
                    'relative',
                    'bg-white',
                    'shadow-lg',
                    'rounded-md',
                    'font-medium',
                    loading ? 'text-gray-500' : 'text-gray-700',
                ]"
            >
                <div class="w-full bg-white p-6 rounded-lg lg:rounded-lg-none">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        loading: Boolean,
        center: Boolean,
    }
}
</script>
