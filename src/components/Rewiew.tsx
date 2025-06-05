import { useAppSelector } from "../app/hooks";
import { selectRewiewList } from "../features/market/marketSlice";
import { Review } from "../features/market/type";
import React from "react";

const ReviewComponent = () => {
  const reviews: Review[] = useAppSelector(selectRewiewList);

  // Функция для безопасного отображения HTML
  const createMarkup = (html: string) => {
    return { __html: html };
  };

  return (
    <section className="reviews-section my-5">
      <div className="container">
        <h2 className="text-center mb-4">Отзывы наших клиентов</h2>
        
        {reviews?.length ? (
          <div className="row justify-content-center">
            {reviews.map((review, index) => (
              <div 
                key={review.id || index} 
                className="col-md-8 mb-3"
              >
                <div 
                  className="card p-3 shadow-sm"
                  style={{ minHeight: '120px' }}
                >
                  <div 
                    className="review-text"
                    dangerouslySetInnerHTML={createMarkup(review.text)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p>Пока нет отзывов. Будьте первым!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewComponent;