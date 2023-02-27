import axios from 'axios'; 
import { handleResponse, handleError } from './Response'; 

const BASE_URL = 'http://localhost:8000'; 
const BRANDS_URL = 'vehicle/brand/'; 
const VEHICLE_URL = 'vehicle/vehicle/'; 

// Brands
export function getBrands(){ 
  return axios 
    .get(`${BASE_URL}/${BRANDS_URL}`) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

export function addBrand(brandName){ 
  return axios 
    .post(`${BASE_URL}/${BRANDS_URL}`, {brand_name: brandName}) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

export function updateBrand(id, brandName){ 
  return axios 
    .put(`${BASE_URL}/${BRANDS_URL}${id}/`, {brand_name: brandName}) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

export function deleteBrand(id){ 
  return axios 
    .delete(`${BASE_URL}/${BRANDS_URL}${id}/`) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

// Vehicles
export function getModels(){ 
  return axios 
    .get(`${BASE_URL}/${VEHICLE_URL}`) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

export function getVehicles(){ 
  return axios 
    .get(`${BASE_URL}/${VEHICLE_URL}`) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

export function addVehicle(vehicleName, brandName, overview, numberPlate, cost, sale, details){ 
  return axios 
    .post(`${BASE_URL}/${VEHICLE_URL}`, {
      vehicle: vehicleName, 
      vehicle_brand: brandName, 
      vehicle_overview: overview, 
      number_plate: numberPlate, 
      price_of_cost: cost, 
      price_of_sale: sale, 
      vehicle_details: details
    }) 
    .then(handleResponse) 
    .catch(handleError); 
}; 
