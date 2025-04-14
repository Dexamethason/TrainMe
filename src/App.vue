<script setup>
// Główny komponent aplikacji
import { onMounted } from 'vue';

// Dodanie klasy do body przy montowaniu komponentu
onMounted(() => {
  document.body.classList.add('trainme-app');
});
</script>

<template>
  <div class="app-container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-gradient shadow-sm sticky-top">
      <div class="container">
        <router-link class="navbar-brand fw-bold" to="/">
          <i class="bi bi-activity me-2"></i>TrainMe
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/trainer">
                <i class="bi bi-person-badge me-1"></i> Tryb trenera
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/client">
                <i class="bi bi-person-circle me-1"></i> Tryb podopiecznego
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
    <main class="py-4">
      <router-view></router-view>
    </main>
    
    <footer class="mt-5 py-4 text-center text-white bg-dark">
      <div class="container">
        <p class="mb-1"><i class="bi bi-award me-2"></i>© 2024 TrainMe - Aplikacja do zapisywania treningów siłowych</p>
        <small class="text-muted">Profesjonalne narzędzie dla trenerów i podopiecznych</small>
      </div>
    </footer>
  </div>
</template>

<style>
body {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
