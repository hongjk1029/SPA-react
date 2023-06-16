import axios from 'axios'; 
import { handleResponse, handleError, handleVehiclesResponse, handleVehicleByIdResponse } from './Response'; 

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const AUTH_URL = "api/token/"
const BRANDS_URL = 'vehicle/brand/'; 
const VEHICLE_URL = 'vehicle/vehicle/';

// Authentication

const login = async (username, password) => {
  const response = await axios.post(`${BASE_URL}/${AUTH_URL}`, { username, password });
  return response.data;
};

// Brands
export function getBrands(){ 
  return axios 
    .get(`${BASE_URL}/${BRANDS_URL}`) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

export function getBrandById(id){ 
  return axios 
    .get(`${BASE_URL}/${BRANDS_URL}${id}/`) 
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
    .then(handleVehiclesResponse) 
    .catch(handleError); 
}; 

export function getVehiclesById(id){ 
  return axios 
    .get(`${BASE_URL}/${VEHICLE_URL}${id}/`) 
    .then(handleVehicleByIdResponse) 
    .catch(handleError); 
}; 

export function addVehicle(fileData){ 
  return axios 
    .post(`${BASE_URL}/${VEHICLE_URL}`, fileData, {
      headers: {
          "Content-Type": "multipart/form-data"
      },
  })
    .then(handleResponse) 
    .catch(handleError); 
}; 

export function updateVehicleById(id, fileData){ 
  for (var pair of fileData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
  }
  return axios 
    .put(`${BASE_URL}/${VEHICLE_URL}${id}/`, fileData, {
      headers: {
          "Content-Type": "multipart/form-data"
      },
  })
    .then(handleResponse) 
    .catch(handleError); 
}; 

export function deleteVehicle(id){ 
  return axios 
    .delete(`${BASE_URL}/${VEHICLE_URL}${id}/`) 
    .then(handleResponse) 
    .catch(handleError); 
}; 

export default {
  login
}