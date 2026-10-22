import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductosView from '../views/ProductosView.vue'
import ProductosViewGroup from '../views/ProductosViewGroup.vue'
import ProductosViewGroupPage from '../views/ProductosViewGroupPage.vue'
import ProductosViewOne from '../views/ProductosViewOne.vue'
import Catalogo from '../views/Catalogo.vue'
import CatalogoModels from '../views/CatalogoModels.vue'
import Vehicles from '../views/Vehicles.vue'
import VehiclesArticles from '../views/VehiclesArticles.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/catalogo/page/results/:search/:type', name: 'products', component: ProductosView },
  { path: '/catalogo/page/group/results/:search/:text', name: 'products-group-page', component: ProductosViewGroupPage },
  { path: '/catalogo/group/results/:search', name: 'products-group', component: ProductosViewGroup },
  { path: '/product/:id', name: 'product-one', component: ProductosViewOne },
  { path: '/catalogo', name: 'catalogo', component: Catalogo },
  { path: '/catalogo/model/:brand/:id', name: 'catalogo-model', component: CatalogoModels },
  { path: '/vehicles/:brand/:idBrand/:model/:idModel', name: 'vehicles', component: Vehicles },
  { path: '/vehicles/:brand/:idBrand/:model/:idModel/articles/:car/:idCar', name: 'vehicles-articles', component: VehiclesArticles },
  { path: '/vehicles/search/:query/:brand/:idBrand/:model/:idModel/articles/:car/:idCar', name: 'vehicles-articles-query', component: VehiclesArticles },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router