import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// El home va en el paquete inicial (es la página de entrada); el resto de páginas se
// descarga solo cuando se visita
const ProductosView = () => import('../views/ProductosView.vue')
const ProductosViewGroup = () => import('../views/ProductosViewGroup.vue')
const ProductosViewGroupPage = () => import('../views/ProductosViewGroupPage.vue')
const ProductosViewOne = () => import('../views/ProductosViewOne.vue')
const Catalogo = () => import('../views/Catalogo.vue')
const CatalogoModels = () => import('../views/CatalogoModels.vue')
const Vehicles = () => import('../views/Vehicles.vue')
const VehiclesArticles = () => import('../views/VehiclesArticles.vue')
const LegalView = () => import('../views/LegalView.vue')
const ContactView = () => import('../views/ContactView.vue')
const ThanksView = () => import('../views/ThanksView.vue')
const AudienceView = () => import('../views/AudienceView.vue')

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
  { path: '/politica-de-privacidad', name: 'privacy-policy', component: LegalView, props: { policy: 'privacidad' } },
  { path: '/politica-de-cookies', name: 'cookies-policy', component: LegalView, props: { policy: 'cookies' } },
  { path: '/contacto', name: 'contact', component: ContactView },
  { path: '/gracias', name: 'thanks', component: ThanksView },
  { path: '/fabricantes', name: 'audience-manufacturers', component: AudienceView, props: { page: 'fabricantes', segment: 'fabricante' } },
  { path: '/distribuidores', name: 'audience-distributors', component: AudienceView, props: { page: 'distribuidores', segment: 'distribuidor' } },
  { path: '/talleres', name: 'audience-workshops', component: AudienceView, props: { page: 'talleres', segment: 'taller' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router