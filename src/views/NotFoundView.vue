<script setup></script>

<template>
  <div class="flex flex-col gap-8 items-center border-red-500 mt-64">
    <h1 class="text-8xl">404</h1>
    <p class="text-xl text-gray-500">
      <span>Page not found. Go back </span>
      <router-link :to="{ name: 'home' }" class="text-blue-500 duration-300 hover:text-blue-800"
        >Home</router-link
      >
    </p>
  </div>
</template>
