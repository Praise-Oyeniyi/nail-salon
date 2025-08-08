export const sendApi = async (data, endpoint) => {
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify(data)
        });
  
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const res = await response.text();
        const result = JSON.parse(res);
        
        return {
            success: true,
            data: result
        };
  
    } catch (error) {
        return {
            success: false,
            error: error
        };
    }
}

export const fetchApi = async (endpoint) => {
    try {
        const response = await fetch(endpoint, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
  
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const res = await response.text();
        const result = JSON.parse(res);

        // if (result.success === false && result.status === "unauthorized") {
        //     if (window.location.pathname !== "/auth") {
        //         window.location.href = "/auth?login=true";
        //         return {
        //             success: false,
        //             redirecting: true
        //         };
        //     }
        // }
        
        return {
            success: true,
            data: result
        };
  
    } catch (error) {
        return {
            success: false,
            error: error
        };
    }
}