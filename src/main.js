import './style.css'
import { UserApp } from './users/user-app'


document.querySelector('#app').innerHTML = `
<section id="center">
  <h2>Tabla Users </h2>
  <div class="card">
    
  </div>
</section>

`

const element = document.querySelector('.card');
UserApp(element);