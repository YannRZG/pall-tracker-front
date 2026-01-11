<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-3xl font-bold">Contact</h1>
    <p class="text-lg p-6">
      Si vous avez des questions ou des commentaires, n'hésitez pas à nous contacter.
    </p>
    <div class="flex flex-col gap-4 p-6">
      <input class="w-full border rounded  px-3 py-2" type="text" placeholder="Votre nom" />
      <input class="w-full border rounded  px-3 py-2" type="text" placeholder="Votre email" />
      <textarea class="w-full border rounded  px-3 py-2" placeholder="Votre message"></textarea>
    </div>
    <div class="flex justify-center items-center">
      <a href="mailto:yann.dev@gmail.com" class="text-blue-600 hover:underline">yann.dev@gmail.com</a>
    </div>
  </div>
</template>