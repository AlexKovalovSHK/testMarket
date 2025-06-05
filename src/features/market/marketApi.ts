import axios, { AxiosError } from "axios"
import { URL } from "../../App"
import { Answer, GoodsList, NewOrder, Review } from "./type"

export async function fechGeneretOrder(dto: NewOrder): Promise<Answer> {
  try {
    const res = await axios.post(
      `${URL}/order`,
      {
        phone: dto.phone.replace(/\D/g, ''), // Удаляем все нецифровые символы
        cart: dto.carts.map(item => ({
          id: item.id,
          quantity: item.quantity
        }))
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    console.log("Response:", res.data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("Full error response:", axiosError.response);
      
      if (axiosError.response?.status === 422) {
        // Обработка ошибок валидации
        const responseData = axiosError.response.data as {
          errors?: Record<string, string[]>;
          message?: string;
        };
        
        if (responseData?.errors) {
          const firstError = Object.values(responseData.errors)[0]?.[0];
          throw new Error(firstError || "Validation error");
        } else if (responseData?.message) {
          throw new Error(responseData.message);
        }
      }
      
      throw new Error(axiosError.message || "Network error");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error occurred");
    }
  }
}

export async function fechAllReviews(): Promise<Review[]> {
  const res = await axios.get(`${URL}/reviews`)
  return res.data
}

export async function fetchGoodsList(): Promise<GoodsList> {
  const res = await axios.get(`${URL}/products?page=1&page_size=20`)
  return res.data
}
