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
