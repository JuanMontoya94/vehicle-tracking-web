<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">SSEV</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">Citas</a>
              </li>
              <li class="nav-item">
               <a class="nav-link active" aria-current="page"  href="/customer">Clientes</a>
              </li>
              <li class="nav-item">
               <a class="nav-link active" aria-current="page"  href="/entry">Ingresos</a>
              </li>
            </ul>
          </div>
        </div>


    </nav>
    <router-view/>
   <br />
   <br />
   <br />
  </div>
  
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

</style>
