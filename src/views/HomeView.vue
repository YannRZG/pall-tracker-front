<template>
  <div class="flex flex-col justify-center items-center min-h-[60vh] mx-auto px-6 py-20 w-full">
    <!-- HERO -->
    <section class="flex justify-center items-center min-h-[60vh] mx-auto px-6 py-20 w-full">
      <div class="grid gap-16 md:grid-cols-2 items-center">
        <!-- TEXT -->
        <div class="flex flex-col space-y-8">
          <span
            class="inline-flex w-fit items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700"
          >
            Gestion des palettes Europe
          </span>

          <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Bienvenue sur <span class="text-indigo-600">Pall Tracker</span>
          </h1>

          <p class="max-w-xl text-lg text-gray-600">
            Suivez, échangez et équilibrez vos palettes entre
            <strong>donneurs d’ordre</strong>, <strong>transporteurs</strong> et
            <strong>destinataires</strong>, en toute simplicité.
          </p>

          <!-- CTA -->
          <div class="flex flex-wrap gap-4 pt-2">
            <RouterLink
              to="/signup-request"
              class="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-700"
            >
              Créer un compte
            </RouterLink>

            <RouterLink
              to="/login"
              class="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-100"
            >
              Se connecter
            </RouterLink>
          </div>
        </div>

        <!-- VISUAL -->
        <div class="relative">
          <div class="absolute inset-0 rounded-2xl bg-indigo-600/10 blur-3xl"></div>
          <div class="relative rounded-2xl border border-indigo-200 bg-white p-8 shadow-lg shadow-indigo-600/20">
            <ul class="space-y-4">
              <li class="flex items-center gap-3">
                <span class="h-2 w-2 rounded-full bg-indigo-600"></span>
                Suivi des mouvements de palettes
              </li>
              <li class="flex items-center gap-3">
                <span class="h-2 w-2 rounded-full bg-indigo-600"></span>
                Calcul automatique des soldes
              </li>
              <li class="flex items-center gap-3">
                <span class="h-2 w-2 rounded-full bg-indigo-600"></span>
                Accès par rôle (shipper, carrier, recipient)
              </li>
              <li class="flex items-center gap-3">
                <span class="h-2 w-2 rounded-full bg-indigo-600"></span>
                Invitations d’utilisateurs par entreprise
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="py-20">
      <div class="flex flex-col items-center justify-center mx-auto max-w-7xl px-6 gap-4">
        <div class="text-center flex flex-col items-center gap-4">
          <h2 class="text-3xl font-bold text-indigo-600">Pourquoi Pall Tracker ?</h2>
          <p class="text-gray-600 text-lg">
            Pensé pour la logistique terrain et les équipes opérationnelles
          </p>
        </div>

        <div class="mt-16 grid gap-8 md:grid-cols-3">
          <div class="relative rounded-2xl border border-indigo-200 bg-white p-8 shadow-lg shadow-indigo-600/20">
            <h3 class="text-lg font-semibold text-gray-900">Simplicité</h3>
            <p class="mt-2 text-gray-600">
              Une interface claire pour enregistrer les mouvements en quelques secondes.
            </p>
          </div>

          <div class="relative rounded-2xl border border-indigo-200 bg-white p-8 shadow-lg shadow-indigo-600/20">
            <h3 class="text-lg font-semibold text-gray-900">Fiabilité</h3>
            <p class="mt-2 text-gray-600">
              Des soldes calculés automatiquement, sans Excel ni erreurs.
            </p>
          </div>

          <div class="relative rounded-2xl border border-indigo-200 bg-white p-8 shadow-lg shadow-indigo-600/20">
            <h3 class="text-lg font-semibold text-gray-900">Collaboration</h3>
            <p class="mt-2 text-gray-600">
              Donneurs d’ordre, transporteurs et destinataires sur une même plateforme.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
