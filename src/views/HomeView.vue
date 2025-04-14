<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-10 text-center">
        <div class="hero-section mb-5">
          <h1 class="display-4 fw-bold mb-4">TrainMe</h1>
          <p class="lead mb-5">Profesjonalna aplikacja do zapisywania i analizowania treningów siłowych</p>
        </div>
        
        <div class="row mb-5">
          <div class="col-md-6 mb-4">
            <div class="card h-100 shadow-lg">
              <div class="card-body p-5">
                <div class="icon-wrapper mb-4">
                  <i class="bi bi-person-badge display-4 text-primary"></i>
                </div>
                <h3 class="card-title mb-3">Tryb trenera</h3>
                <p class="card-text mb-4">Monitoruj postępy swoich podopiecznych, analizuj ich treningi i pomagaj im osiągać lepsze wyniki.</p>
                <router-link to="/trainer" class="btn btn-primary btn-lg">
                  <i class="bi bi-arrow-right-circle me-2"></i> Przejdź do panelu trenera
                </router-link>
              </div>
            </div>
          </div>
          
          <div class="col-md-6 mb-4">
            <div class="card h-100 shadow-lg">
              <div class="card-body p-5">
                <div class="icon-wrapper mb-4">
                  <i class="bi bi-person-circle display-4 text-success"></i>
                </div>
                <h3 class="card-title mb-3">Tryb podopiecznego</h3>
                <p class="card-text mb-4">Zapisuj swoje treningi, śledź postępy i edytuj historyczne dane, aby mieć pełną kontrolę nad swoim rozwojem.</p>
                <router-link to="/client" class="btn btn-success btn-lg">
                  <i class="bi bi-arrow-right-circle me-2"></i> Przejdź do panelu podopiecznego
                </router-link>
              </div>
            </div>
          </div>
        </div>
        
        <div class="features-section">
          <div class="row g-4">
            <div class="col-md-4">
              <div class="feature-item">
                <i class="bi bi-calendar-check text-primary mb-3 fs-1"></i>
                <h4>Zapisuj treningi</h4>
                <p>Łatwe dodawanie i edytowanie treningów z intuicyjnym interfejsem</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="feature-item">
                <i class="bi bi-graph-up text-primary mb-3 fs-1"></i>
                <h4>Śledź postępy</h4>
                <p>Monitoruj swój rozwój i analizuj historyczne dane treningowe</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="feature-item">
                <i class="bi bi-people text-primary mb-3 fs-1"></i>
                <h4>Współpracuj</h4>
                <p>Efektywna komunikacja między trenerem a podopiecznym</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Komponent strony głównej z wyborem trybu
</script>

<style scoped>
.hero-section {
  padding: 3rem 0;
}

.icon-wrapper {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-item {
  padding: 1.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
}
</style>