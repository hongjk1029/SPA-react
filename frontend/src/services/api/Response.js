const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function handleResponse(response) {
    if (response.results) {
        return response.results;
    }

    if (response.data) {
        return response.data;
    }

    return response;
}
  
export function handleError(error) {
    if (error.data) {
        return error.data;
    }
    return error;
}

export function handleVehiclesResponse(response) {
    if (response.results) {
        return response.results;
    }

    if (response.data) {
        response.data.forEach(vehicles => {
            vehicles.vehicle_images.forEach(vehicle_images => {
                vehicle_images.vehicle_image = BASE_URL + vehicle_images.vehicle_image;
            });
        });
        return response.data; 
    }

    return response;
}

export function handleVehicleByIdResponse(response) {
    if (response.results) {
        return response.results;
    }

    if (response.data) {
        response.data.vehicle_images.forEach(vehicle_images => {
            vehicle_images.vehicle_image = BASE_URL + vehicle_images.vehicle_image;
        });
        return response.data; 
    }

    return response;
}