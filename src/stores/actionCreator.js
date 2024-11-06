import axios from "axios"
import { ADD_BANNER, ADD_CATEGORY_PRODUCT, ADD_CATEGORY_YESTECH, ADD_HISTORY, ADD_TYPE, ADD_YESTECH, DELETE_BANNER, DELETE_CASELIST, DELETE_CATEGORY_PRODUCT, DELETE_CATEGORY_YESTECH, DELETE_HISTORY, DELETE_NEWS, DELETE_PRODUCTS, DELETE_TYPE, DELETE_WAREHOUSE, DELETE_YESTECH_OWNER, LOGIN_ADMIN, POST_WAREHOUSES, READ_BANNER, READ_BANNER_BY_ID, READ_CASELIST, READ_CATEGORY_PRODUCT, READ_CATEGORY_YESTECH, READ_DETAIL_PRODUCT, READ_HISTORY, READ_NEWS, READ_PRODUCTS,  READ_TYPE, READ_WAREHOUSE, READ_YESTECH, UPDATE_BANNER, UPDATE_CATEGORY_PRODUCT, UPDATE_CATEGORY_YESTECH, UPDATE_HISTORY, UPDATE_TYPE } from "./actionTypes"
import { toast } from "react-toastify"

// const BASE_URL = 'http://localhost:3000'
const BASE_URL = 'https://api-v1.yestech.id'
export const actionGenerator = (type,payload) => {
    return {
        type,
        payload
    }
}
export const fetchBanner = () => {
    return async (dispatch) => {
      try {
        const response = await fetch(BASE_URL + "/banner", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
        });
        const responseJSON = await response.json();
        dispatch(actionGenerator(READ_BANNER, responseJSON));
        // console.log(response);
      } catch (error) {
        console.log(error, "<<<<<<<<<");
      }
    };
  };
  export const postBanner = (data) => {
    return async (dispatch) => {
        try {
            const response = await fetch(BASE_URL + "/banner", {
                method: "POST",
                headers: {
                    access_token: localStorage.getItem("access_token"),
                },
                body: data, // Directly pass the FormData object
            });

            if (!response.ok) {
                throw new Error('Failed to add banner');
            }

            // Assuming server returns JSON response with added banner data
            const responseData = await response.json();

            dispatch({
                type: ADD_BANNER,
                payload: responseData, // Adjust this based on what your server sends back
            });

            // Optionally fetch updated banner list after adding a new banner
            dispatch(fetchBanner()); // Make sure fetchBanner() is defined and dispatched correctly
        } catch (error) {
            console.error('Error adding banner:', error);
            throw error;
        }
    };
};
export const fetchBannerById = (bannerId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + `/banner/${bannerId}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const responseJSON = await response.json();
      dispatch(actionGenerator(READ_BANNER_BY_ID, responseJSON));
      // console.log(response);
    } catch (error) {
      console.log(error, "<<<<<<<<<");
    }
  };
}

export const fetchCategoryProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/categoryProducts", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const responseJSON = await response.json();
      dispatch(actionGenerator(READ_CATEGORY_PRODUCT, responseJSON));
      // console.log(response);
    } catch (error) {
      console.log(error, "<<<<<<<<<");
    }
  };
};
export const fetchTypes = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/type", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const responseJSON = await response.json();
      dispatch(actionGenerator(READ_TYPE, responseJSON));
      // console.log(response);
    } catch (error) {
      console.log(error, "<<<<<<<<<");
    }
  };
};
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/Products", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const responseJSON = await response.json();
      dispatch(actionGenerator(READ_PRODUCTS, responseJSON));
      // console.log(response);
    } catch (error) {
      console.log(error, "<<<<<<<<<");
    }
  };
};
export const fetchProductsByid = (id) => {
  console.log(id,'ni id');
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + `/productsAdmin/${id}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const responseJSON = await response.json();
      dispatch(actionGenerator(READ_DETAIL_PRODUCT, responseJSON));
      // console.log(response);
    } catch (error) {
      console.log(error, "<<<<<<<<<");
    }
  };
};
export const fetchNews = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/news", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const responseJSON = await response.json();
      dispatch(actionGenerator(READ_NEWS, responseJSON));
      // console.log(response);
    } catch (error) {
      console.log(error, "<<<<<<<<<");
    }
  };
};
export const fetchCaseList = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/caseList", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const responseJSON = await response.json();
      dispatch(actionGenerator(READ_CASELIST, responseJSON));
      // console.log(response);
    } catch (error) {
      console.log(error, "<<<<<<<<<");
    }
  };
};
export const fetchYestechOwner = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/yestechOwner", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const responseJSON = await response.json();
      dispatch(actionGenerator(READ_YESTECH, responseJSON));
      // console.log(response);
    } catch (error) {
      console.log(error, "<<<<<<<<<");
    }
  };
};
export const postYestechOwner = (formData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(BASE_URL + "/yestechOwner",formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          access_token: localStorage.getItem("access_token"),
        },
      });
      console.log(response);
      
      const responseJSON = await response.data;
      dispatch(fetchYestechOwner(),actionGenerator(ADD_YESTECH, responseJSON));
      // console.log(response);
    } catch (error) {
      console.log(error, "<<<<<<<<<");
    }
  };
};
export const fetchCategoryYestechOwner = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/categoryYestech", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const responseJSON = await response.json();
      dispatch(actionGenerator(READ_CATEGORY_YESTECH, responseJSON));
      // console.log(response);
    } catch (error) {
      console.log(error, "<<<<<<<<<");
    }
  };
};
export const postCategoryYestech = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/categoryYestech`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'access_token': localStorage.getItem("access_token"),
        },
        body: JSON.stringify(data), 
      });

      console.log(response);

      if (!response.ok) {
        throw new Error('Failed to add category');
      }

      const responseData = await response.json();
      console.log(responseData,'<<<<<<<<<');
      
      dispatch({
        type: ADD_CATEGORY_YESTECH,
        payload: responseData,
      });

      dispatch(fetchCategoryYestechOwner()); // Assuming this fetches updated data

    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  };
};
export const updateCategoryYestech = (formData,categoryId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/categoryYestech/${categoryId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'access_token': localStorage.getItem("access_token"),
        },
        body: JSON.stringify(formData), 
      });

      // console.log(response);

      if (!response.ok) {
        throw new Error('Failed to add category');
      }

      const responseData = await response.json();

      dispatch({
        type: UPDATE_CATEGORY_YESTECH,
        payload: responseData,
      });

      dispatch(fetchCategoryYestechOwner()); // Assuming this fetches updated data

    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  };
};
export const deleteCategoryYestech = (id) => {
  console.log(id);
  // console.log(form,'dawdawdawdwadawda');
  return async (dispact) => {
    try {
      const response = await fetch(BASE_URL + `/categoryYestech/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        // body: JSON.stringify(form),
      });

      dispact(fetchCategoryYestechOwner(), actionGenerator(DELETE_CATEGORY_YESTECH));
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteBanner = (id) => {
  console.log(id);
  // console.log(form,'dawdawdawdwadawda');
  return async (dispact) => {
    try {
      const response = await fetch(BASE_URL + `/banner/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // access_token: localStorage.getItem("access_token"),
        },
        // body: JSON.stringify(form),
      });

      dispact(fetchBanner(), actionGenerator(DELETE_BANNER));
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteNews = (id) => {
  // console.log(id,'id');
  return async (dispact) => {
    try {
      await fetch(BASE_URL + `/news/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),

        },
      });
      dispact(fetchNews(),actionGenerator(DELETE_NEWS));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
export const deleteYestechOwner = (id) => {
  // console.log(id,'id');
  return async (dispact) => {
    try {
      await fetch(BASE_URL + `/yestechOwner/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),

        },
      });
      dispact(fetchYestechOwner(),actionGenerator(DELETE_YESTECH_OWNER));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
export const deleteCaseList= (id) => {
  // console.log(id,'id');
  return async (dispact) => {
    try {
      await fetch(BASE_URL + `/caseList/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),

        },
      });
      dispact(fetchCaseList(),actionGenerator(DELETE_CASELIST));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
export const postCategoryProducts = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/categoryProducts`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'access_token': localStorage.getItem("access_token"),
        },
        body: JSON.stringify(data), 
      });

      console.log(response);

      if (!response.ok) {
        throw new Error('Failed to add category');
      }

      const responseData = await response.json();
      console.log(responseData,'<<<<<<<<<');
      
      dispatch({
        type: ADD_CATEGORY_PRODUCT,
        payload: responseData,
      });

      dispatch(fetchCategoryProducts()); 
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  };
};
export const updateCategoryProducts = (formData,categoryId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/categoryProducts/${categoryId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'access_token': localStorage.getItem("access_token"),
        },
        body: JSON.stringify(formData), 
      });

      // console.log(response);

      if (!response.ok) {
        throw new Error('Failed to add category');
      }

      const responseData = await response.json();

      dispatch({
        type: UPDATE_CATEGORY_PRODUCT,
        payload: responseData,
      });

      dispatch(fetchCategoryProducts()); // Assuming this fetches updated data

    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  };
};
export const deleteCategoryProducts = (id) => {
  console.log(id);
  // console.log(form,'dawdawdawdwadawda');
  return async (dispact) => {
    try {
      const response = await fetch(BASE_URL + `/categoryProducts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        // body: JSON.stringify(form),
      });

      dispact(fetchCategoryProducts(), actionGenerator(DELETE_CATEGORY_PRODUCT));
    } catch (error) {
      console.log(error);
    }
  };
};
export const postTypes = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/type`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'access_token': localStorage.getItem("access_token"),
        },
        body: JSON.stringify(data), 
      });

      console.log(response);

      if (!response.ok) {
        throw new Error('Failed to add category');
      }

      const responseData = await response.json();
      console.log(responseData,'<<<<<<<<<');
      
      dispatch({
        type: ADD_TYPE,
        payload: responseData,
      });

      dispatch(fetchTypes()); 
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  };
};
export const updateTypes = (formData,categoryId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/type/${categoryId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'access_token': localStorage.getItem("access_token"),
        },
        body: JSON.stringify(formData), 
      });

      // console.log(response);

      if (!response.ok) {
        throw new Error('Failed to add category');
      }
      toast.success('Updated Successfuly')
      const responseData = await response.json();

      dispatch({
        type: UPDATE_TYPE,
        payload: responseData,
      });

      dispatch(fetchTypes()); // Assuming this fetches updated data

    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  };
};
export const deleteTypes = (id) => {
  console.log(id);
  // console.log(form,'dawdawdawdwadawda');
  return async (dispact) => {
    try {
      const response = await fetch(BASE_URL + `/type/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        // body: JSON.stringify(form),
      });

      dispact(fetchTypes(), actionGenerator(DELETE_TYPE));
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteProducts = (id) => {
  console.log(id);
  // console.log(form,'dawdawdawdwadawda');
  return async (dispact) => {
    try {
      const response = await fetch(BASE_URL + `/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        // body: JSON.stringify(form),
      });

      dispact(fetchProducts(), actionGenerator(DELETE_PRODUCTS));
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchWarehouse = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/warehouse", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const responseJSON = await response.json();
      dispatch(actionGenerator(READ_WAREHOUSE, responseJSON));
      // console.log(response);
    } catch (error) {
      console.log(error, "<<<<<<<<<");
    }
  };
};
export const postWarehouse = (data) => {
  console.log(data,'ni data');
  
  return async (dispatch) => {
      try {
          const response = await fetch(BASE_URL + "/warehouse", {
              method: "POST",
              headers: {
                  access_token: localStorage.getItem("access_token"),
              },
              body: data, // Directly pass the FormData object
          });

          if (!response.ok) {
              throw new Error('Failed to add banner');
          }

          // Assuming server returns JSON response with added banner data
          const responseData = await response.json();

          dispatch({
              type: POST_WAREHOUSES,
              payload: responseData, // Adjust this based on what your server sends back
          });

     
          dispatch(fetchWarehouse()); // Make sure fetchBanner() is defined and dispatched correctly
      } catch (error) {
          console.error('Error adding banner:', error);
          throw error;
      }
  };
};
export const fetchHistory = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/histori", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const responseJSON = await response.json();
      dispatch(actionGenerator(READ_HISTORY, responseJSON));
      // console.log(response);
    } catch (error) {
      console.log(error, "<<<<<<<<<");
    }
  };
};
export const postHistory = (formData) => {
  console.log(formData);
  
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/histori", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json', // Important: tell server you're sending JSON
          access_token: localStorage.getItem("access_token"), // Ensure this is not null/undefined
        },
        body: JSON.stringify(formData), // Serialize formData to JSON
      });

      if (!response.ok) {
        throw new Error('Failed to add history');
      }

      // Assuming server returns JSON response with added history data
      const responseData = await response.json();

      dispatch({
        type: ADD_HISTORY,
        payload: responseData, // Adjust this based on what your server sends back
      });

      // Optionally, dispatch an action to refresh the list of histories
      dispatch(fetchHistory());
    } catch (error) {
      console.error('Error adding history:', error);
      throw error;
    }
  };
};
export const deleteHistory = (id) => {
  console.log(id);
  // console.log(form,'dawdawdawdwadawda');
  return async (dispact) => {
    try {
      const response = await fetch(BASE_URL + `/histori/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        // body: JSON.stringify(form),
      });

      dispact(fetchHistory(), actionGenerator(DELETE_HISTORY));
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteWarehouse = (id) => {
  console.log(id);
  // console.log(form,'dawdawdawdwadawda');
  return async (dispact) => {
    try {
      const response = await fetch(BASE_URL + `/warehouse/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        // body: JSON.stringify(form),
      });

      dispact(fetchWarehouse(), actionGenerator(DELETE_WAREHOUSE));
    } catch (error) {
      console.log(error);
    }
  };
};
export const updateHistoryYestech = (formData,id) => {
  console.log(id);
  console.log(formData);
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/histori/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'access_token': localStorage.getItem("access_token"),
        },
        body: JSON.stringify(formData), 
      });

      console.log(response);

      if (!response.ok) {
        throw new Error('Failed to add category');
      }

      const responseData = await response.json();

      dispatch({
        type: UPDATE_HISTORY,
        payload: responseData,
      });

      dispatch(fetchHistory()); // Assuming this fetches updated data

    } catch (error) {
      console.log(error,'<><,>><><');
      console.error('Error adding category:', error);
      throw error;
    }
  };
};   export const HandleLogin = (data) => {
  // console.log(data,'wguehu');
  return async (dispatch) => {
    // console.log('as');
    try {
      const response = await fetch(BASE_URL + "/adminLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseJSON = await response.json();
      if (!response.ok) {
        throw responseJSON;
      }
      const { access_token } = responseJSON;
      localStorage.setItem("access_token", access_token);
        dispatch(actionGenerator(LOGIN_ADMIN,responseJSON))
    } catch (error) {
      console.log(error, "ni");
      throw error;
    }
  };
};